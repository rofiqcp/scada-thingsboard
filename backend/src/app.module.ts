import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';
import { TelemetryModule } from './telemetry/telemetry.module';
import { MqttModule } from './mqtt/mqtt.module';
import { DbModule } from './db/db.module';
import { AlarmsModule } from './alarms/alarms.module';

@Module({
  imports: [DbModule, AuthModule, UsersModule, DevicesModule, TelemetryModule, MqttModule, AlarmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
