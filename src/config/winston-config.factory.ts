import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston';
import { format, transports as WinstonTransports } from 'winston';
import { consoleFormat } from 'winston-console-format';
import * as WinstonGraylog2 from 'winston-graylog2';
import * as WinstonSentry from 'winston-sentry-raven-transport';

@Injectable()
export class WinstonConfigFactory implements WinstonModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const transports = [];

    if (this.configService.get<string>('app.graylog.host')) {
      const graylogOptions = {
        name: 'graylog',
        level: this.configService.get<string>('app.logLevel'),
        silent: false,
        handleExceptions: true,
        exceptionsLevel: 'error',
        graylog: {
          servers: [
            {
              host: this.configService.get<string>('app.graylog.host'),
              port: this.configService.get<number>('app.graylog.port'),
            },
          ],
          hostname: this.configService.get<string>('app.hostname'),
          facility: this.configService.get<string>('app.name'),
        },
        staticMeta: {
          environment: this.configService.get<string>('app.environment'),
          version: this.configService.get<string>('app.version'),
        },
      };
      transports.push(new WinstonGraylog2(graylogOptions));
    }

    if (this.configService.get<string>('app.sentryDsn')) {
      const sentryOptions = {
        dsn: this.configService.get<string>('app.sentryDsn'),
        level: 'error',
        install: true,
        config: {
          captureUnhandledRejections: true,
        },
      };
      transports.push(new WinstonSentry(sentryOptions));
    }

    if (this.configService.get<string>('app.environment') === 'development') {
      const consoleOptions = {
        handleExceptions: true,
        format: format.combine(
          format.colorize({ all: true }),
          format.padLevels(),
          consoleFormat({
            showMeta: true,
            metaStrip: ['context', 'service', 'timestamp'],
            inspectOptions: {
              depth: Infinity,
              colors: true,
              maxArrayLength: Infinity,
              breakLength: 120,
              compact: Infinity,
            },
          }),
        ),
      };
      transports.push(new WinstonTransports.Console(consoleOptions));
    }

    return {
      format: format.combine(
        format.timestamp(),
        format.ms(),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
      ),
      exitOnError: false,
      transports,
    };
  }
}
