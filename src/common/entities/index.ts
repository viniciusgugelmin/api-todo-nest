import { ApiProperty } from '@nestjs/swagger';

export namespace Entities {
  export class ValidatonError {
    @ApiProperty()
    message: string[];

    @ApiProperty()
    error: 'Bad Request';

    @ApiProperty()
    statusCode: 400;
  }
}
