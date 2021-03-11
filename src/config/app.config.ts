import { registerAs } from '@nestjs/config';
import { hostname } from 'os';

export default registerAs('app', () => ({
  port: process.env.PORT ?? 3000,
  environment: process.env.NODE_ENV ?? 'development',
  name: process.env.APP_NAME ?? 'syndication',
  version: process.env.VERSION ?? '0.0.0',
  logLevel: process.env.LOG_LEVEL ?? 'warn',
  hostname: process.env.HOSTNAME ?? hostname(),
  graylog: {
    host: process.env.GRAYLOG_HOST,
    port: process.env.GRAYLOG_PORT ?? 12201,
  },
  sentryDsn: process.env.SENTRY_DSN,
  facebook: {
    version: 'v8.0',
    appId: process.env.FB_APP_ID,
    appSecret: process.env.FB_APP_SECRET,
  },
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  },
}));
