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
  // api: 'https://super-chinese.cyclic.app/api/',
  api: 'https://silky-jamie-superchinese-188ed003.koyeb.app/api/',
  webSocket: 'wss://silky-jamie-superchinese-188ed003.koyeb.app/',
};
