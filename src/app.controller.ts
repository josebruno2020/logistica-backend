import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('HealthCheck')
export class AppController {
  constructor() {}

  @Get()
  @ApiOkResponse()
  getHello() {
    return { status: 'ok' };
  }
}
