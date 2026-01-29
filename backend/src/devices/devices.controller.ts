import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('devices')
export class DevicesController {
    constructor(private readonly devicesService: DevicesService) { }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createDeviceDto: any) {
        return this.devicesService.create(createDeviceDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.devicesService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.devicesService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.devicesService.remove(id);
    }
}
