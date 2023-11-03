import {Inject, Injectable} from '@nestjs/common';

import * as bcrypt from 'bcrypt';


@Injectable()
export class HashingService {
    private readonly SALT: number = +process.env.PASSWORD_SALT;

    async hash({value}: { value: string }) {
        return bcrypt.hash(value, this.SALT);
    }

    async compare({value, hash}: { value: string; hash: string }) {
        return bcrypt.compare(value, hash);
    }
}
