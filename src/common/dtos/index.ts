import { ApiProperty } from '@nestjs/swagger';

export namespace DTOS {
  export class AbstractDTO {
    @ApiProperty()
    readonly id: number;
  }
}
