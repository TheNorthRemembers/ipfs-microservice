import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

@Controller()
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}

  @Get('healthz')
  @HealthCheck()
  @ApiExcludeEndpoint()
  healthz(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
