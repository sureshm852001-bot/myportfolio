export interface ApiResponse<T = unknown> {
  status: string;
  message: string;
  timestamp: string;
  data: T;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ApiError {
  status: number;
  message: string;
  path?: string;
  timestamp?: string;
  errors?: Record<string, string>;
}
