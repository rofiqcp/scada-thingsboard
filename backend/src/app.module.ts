import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';
import { TelemetryModule } from './telemetry/telemetry.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [AuthModule, UsersModule, DevicesModule, TelemetryModule, MqttModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
