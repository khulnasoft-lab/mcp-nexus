export interface Agent {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  lastSeen?: Date;
  metadata?: Record<string, any>;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  timestamp: string;
}
