import { AuthModule } from '@app/auth/auth.module';
import { WinstonConfigFactory } from '@app/config';
import appConfig from '@app/config/app.config';
import { AppController, HealthController, IpfsController } from '@app/controllers';
import { FileService } from '@app/services';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TerminusModule } from '@nestjs/terminus';
import { WinstonModule } from 'nest-winston';
import { ConsoleModule } from 'nestjs-console';
import { IpfsModule } from '@app/modules';

const controllers = [AppController, HealthController, IpfsController];
const queryHandlers = [];
const services = [FileService];

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
    IpfsModule.register({}, true),
  ],
  controllers: [...controllers],
  providers: [...queryHandlers, ...services],
})
export class AppModule {}
