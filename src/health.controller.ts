import { Controller, Get } from '@nestjs/common';

type Healt = {
    status : string;
}

@Controller('health')
export class HealthController {
    @Get()
    getStatus(): Healt {
        return ({status:'ok'});
    }
}