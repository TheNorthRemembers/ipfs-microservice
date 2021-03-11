import { registerAs } from '@nestjs/config';
// @TODO Add audience when IDX is finished Auth0 integration
export default registerAs('auth', () => ({
  auth0: {
    domain: `${process.env.AUTH0_TENANT}.us.auth0.com`,
    claimNamespace: process.env.BASE_URL,
  },
}));
