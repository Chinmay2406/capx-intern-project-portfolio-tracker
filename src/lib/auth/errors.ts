export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  WEAK_PASSWORD: 'Password should be at least 6 characters',
  EMAIL_IN_USE: 'Email already in use',
  DEFAULT: 'An error occurred during authentication',
} as const;

export function getAuthErrorMessage(error: any): string {
  if (!error) return '';
  
  switch (error.code) {
    case 'invalid_credentials':
      return AUTH_ERRORS.INVALID_CREDENTIALS;
    case '23505': // Unique violation
      return AUTH_ERRORS.EMAIL_IN_USE;
    default:
      return error.message || AUTH_ERRORS.DEFAULT;
  }
}