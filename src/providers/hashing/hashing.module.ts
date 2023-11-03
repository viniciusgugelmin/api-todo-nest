import {Module} from "@nestjs/common";

import {HashingService} from "./services";

@Module({
    providers: [HashingService],
    exports: [HashingService]
})
export class HashingModule {
}
