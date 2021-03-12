import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHomepage(): string {
    return 'OK';
  }
}
