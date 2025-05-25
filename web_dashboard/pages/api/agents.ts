import { NextApiRequest, NextApiResponse } from 'next';
import { Agent, ApiResponse } from '@/types/agent';
import limiter from '@/utils/rateLimiter';
import { withErrorHandling, validateRequest } from '@/utils/validation';
import { sendSuccess, sendError } from '@/utils/apiResponse';
import { LRUCache } from 'lru-cache';

// LRU cache instance for GET agent responses
const cache = new LRUCache<string, Agent[]>({
  max: 500,
  ttl: 60000,
});


const mockAgents: Agent[] = [
  {
    id: 'agent1',
    name: 'Agent One',
    status: 'running',
    lastSeen: new Date(),
    metadata: { version: '1.0.0' },
  },
  {
    id: 'agent2',
    name: 'Agent Two',
    status: 'stopped',
    lastSeen: new Date(Date.now() - 3600000),
    metadata: { version: '1.0.1' },
  },
];

const VALID_STATUSES = ['running', 'stopped', 'error'] as const;
type AgentStatus = typeof VALID_STATUSES[number];

const statusValidationRule = {
  field: 'status',
  type: 'string' as const,
  customValidator: (value: string) => {
    if (value && !VALID_STATUSES.includes(value as any)) {
      return {
        isValid: false,
        message: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
      };
    }
    return { isValid: true, message: '' };
  },
};

const getAgents = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Agent[]>>
) => {
  const ip = (req.headers['x-forwarded-for'] as string) || '127.0.0.1';
  try {
    await limiter.check(req, res, 100, ip);
  } catch {
    return;
  }

  const validationRules = [
    statusValidationRule,
    {
      field: 'limit',
      type: 'string' as const,
      customValidator: (value: string) => {
        if (value && isNaN(parseInt(value, 10))) {
          return { isValid: false, message: 'Limit must be a number' };
        }
        return { isValid: true, message: '' };
      },
    },
  ];

  if (!validateRequest(req, validationRules, res)) return;

  const { status, limit: limitStr } = req.query;
  const cacheKey = `agents:${status || 'all'}:${limitStr || 'all'}`;

  // ✅ Serve from cache if available
  if (cache.has(cacheKey)) {
    return sendSuccess(res, cache.get(cacheKey)!);
  }

  let agents = [...mockAgents];

  if (status) {
    agents = agents.filter((a) => a.status === status);
  }

  if (limitStr) {
    const limit = parseInt(limitStr as string, 10);
    agents = agents.slice(0, limit);
  }

  cache.set(cacheKey, agents); // ✅ Store result in cache

  return sendSuccess(res, agents);
};

const createAgent = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Agent>>
) => {
  const validationRules = [
    { field: 'name', required: true, type: 'string' as const, minLength: 1, maxLength: 100 },
    { ...statusValidationRule, required: false },
  ];

  if (!validateRequest(req, validationRules, res)) return;

  const { name, status = 'stopped' as AgentStatus } = req.body;

  const newAgent: Agent = {
    id: `agent${mockAgents.length + 1}`,
    name,
    status,
    lastSeen: new Date(),
    metadata: { version: '1.0.0' },
  };

  mockAgents.push(newAgent);

  cache.clear(); // ✅ Invalidate cache on data mutation

  return sendSuccess(res, newAgent, 201);
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) => {
  switch (req.method) {
    case 'GET':
      return getAgents(req, res);
    case 'POST':
      return createAgent(req, res);
    default:
      return sendError(res, 405, `Method ${req.method} not allowed`, 'METHOD_NOT_ALLOWED');
  }
};

export default withErrorHandling(handler, {
  allowedMethods: ['GET', 'POST'],
});
