export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthResponse {
  data: any;
  error: AuthError | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  error: AuthError | null;
}