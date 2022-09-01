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
};