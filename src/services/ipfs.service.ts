import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IpfsService {
  constructor(private configService: ConfigService) {}

  get(): string {
    return { test:'hi' };
  }
}
