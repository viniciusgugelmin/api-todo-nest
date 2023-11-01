import { Controller, Get } from '@nestjs/common';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from '../services';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    description: 'Get health',
    type: String,
  })
  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }
}
