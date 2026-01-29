import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AlarmsService } from './alarms.service';

@Controller('alarms')
export class AlarmsController {
    constructor(private alarmsService: AlarmsService) { }

    @Get()
    findAll() {
        return this.alarmsService.findAll();
    }

    @Get('device/:deviceId')
    findByDevice(@Param('deviceId') deviceId: string) {
        return this.alarmsService.findByDevice(deviceId);
    }

    @Put(':id/clear')
    clear(@Param('id') id: string) {
        return this.alarmsService.clear(id);
    }

    @Put(':id/acknowledge')
    acknowledge(@Param('id') id: string) {
        return this.alarmsService.acknowledge(id);
    }
}
