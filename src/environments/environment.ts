export const environment = {
  production: false,
  environmentName: 'development',

  apiUrl: 'https://api.escuelajs.co',
  apiTimeout: 30000,

  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    userKey: 'user_info',
    tokenExpirationKey: 'token_expiration'
  },

  features: {
    enableAnalytics: false,
    enableLogging: true,
    enableDebugMode: true,
    enableMockData: false
  },

  app: {
    name: 'Fiore',
    version: '1.0.0',
    defaultLanguage: 'es',
    itemsPerPage: 10
  },

  retry: {
    maxRetries: 1,
    retryDelay: 500
  }
};
