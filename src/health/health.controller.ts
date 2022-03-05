import { Controller, Get } from '@nestjs/common';

type Health = {
    status : string;
}

@Controller('health')
export class HealthController {
    @Get()
    getStatus(): Health {
        return ({status:'ok'});
    }
}