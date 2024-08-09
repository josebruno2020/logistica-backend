import { Controller, Get } from '@nestjs/common';

@Controller('healthcheck')
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'ok';
  }
}
