import { AuthModule } from '@app/auth/auth.module';
import { WinstonConfigFactory } from '@app/config';
import appConfig from '@app/config/app.config';
import { AppController, HealthController, IpfsController } from '@app/controllers';
import { IpfsService } from '@app/services';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { WinstonModule } from 'nest-winston';
import { ConsoleModule } from 'nestjs-console';

const controllers = [AppController, HealthController, IpfsController];
const queryHandlers = [];
const services = [IpfsService];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    ConsoleModule,
    CqrsModule,
    ServeStaticModule.forRoot({
      rootPath: __dirname + '/public',
    }),
    TerminusModule,
    WinstonModule.forRootAsync({
      useClass: WinstonConfigFactory,
    }),
    AuthModule,
  ],
  controllers: [...controllers],
  providers: [...queryHandlers, ...services],
  exports: [],
})
export class AppModule {}
