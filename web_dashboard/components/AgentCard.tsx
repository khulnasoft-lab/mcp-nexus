import React from 'react';
import { Agent } from '@/types/agent';
import clsx from 'clsx';

export default function AgentCard({ agent }: { agent: Agent }) {
  const formatLastSeen = (lastSeen: Date | undefined) => {
    if (!lastSeen) return 'Never';
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - lastSeen.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return lastSeen.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              'w-2 h-2 rounded-full',
              {
                'bg-green-500': agent.status === 'running',
                'bg-gray-400': agent.status === 'stopped',
                'bg-red-500': agent.status === 'error'
              }
            )}
          />
          <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
        </div>
        <span
          className={clsx(
            'px-2.5 py-0.5 rounded-full text-xs font-medium',
            {
              'bg-green-100 text-green-800': agent.status === 'running',
              'bg-gray-100 text-gray-800': agent.status === 'stopped',
              'bg-red-100 text-red-800': agent.status === 'error'
            }
          )}
        >
          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="font-medium">ID:</span>
          <span>{agent.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Last seen:</span>
          <span>{formatLastSeen(agent.lastSeen)}</span>
        </div>
        {agent.metadata?.version && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Version:</span>
            <span>{agent.metadata.version}</span>
          </div>
        )}
      </div>
    </div>
  );
}
