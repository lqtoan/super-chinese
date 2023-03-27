import config from '../../auth_config.json';

const { domain, clientId } = config as {
  domain: string;
  clientId: string;
};

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
  },
  authApi: 'https://hsk-1.us.auth0.com',
  api: 'https://super-chinese.cyclic.app/api/',
  webSocket: 'wss://super-chinese.cyclic.app:3000',
};
