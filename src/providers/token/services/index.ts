import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generate({ payload }: { payload: any }) {
    return this.jwtService.sign(payload);
  }

  async verify({ token }: { token: string }) {
    return this.jwtService.verify(token);
  }
}
