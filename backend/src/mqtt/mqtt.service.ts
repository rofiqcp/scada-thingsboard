import { Injectable, OnModuleInit } from '@nestjs/common';
import Aedes from 'aedes';
import { createServer } from 'aedes-server-factory';
import { TelemetryGateway } from '../telemetry/telemetry.gateway';
import { TelemetryService } from '../telemetry/telemetry.service';
import { DevicesService } from '../devices/devices.service';

@Injectable()
export class MqttService implements OnModuleInit {
    private aedes: Aedes;
    private server: any;

    constructor(
        private telemetryGateway: TelemetryGateway,
        private telemetryService: TelemetryService,
        private devicesService: DevicesService,
    ) { }

    onModuleInit() {
        this.aedes = new Aedes();
        this.server = createServer(this.aedes);

        // Authentication Handler
        this.aedes.authenticate = async (client, username, password, callback) => {
            // ThingsBoard uses Access Token as Username
            if (!username) {
                const error = new Error('Access Token required');
                (error as any).returnCode = 4;
                return callback(error as any, null);
            }

            const device = await this.devicesService.findByAccessToken(username);
            if (device) {
                (client as any).device = device;
                callback(null, true);
            } else {
                const error = new Error('Invalid Access Token');
                (error as any).returnCode = 4;
                callback(error as any, false);
            }
        };

        const port = 1883;

        this.server.listen(port, () => {
            console.log('MQTT Broker started on port', port);
        });

        this.aedes.on('publish', async (packet, client) => {
            if (client && (client as any).device) {
                const device = (client as any).device;
                console.log(`Device ${device.name} published to ${packet.topic}`);

                if (packet.topic === 'v1/devices/me/telemetry') {
                    try {
                        const payloadStr = packet.payload.toString();
                        const data = JSON.parse(payloadStr);

                        // Save to Database
                        await this.telemetryService.saveTelemetry(device, data);

                        // Forward to WebSocket Gateway (enrich with deviceId)
                        this.telemetryGateway.server.emit('telemetry', {
                            deviceId: device.id,
                            data: data,
                            ts: Date.now()
                        });
                    } catch (e) {
                        console.error('Failed to parse/save MQTT message', e);
                    }
                }
            }
        });

        this.aedes.on('client', (client) => {
            console.log('Client Connected:', client ? client.id : 'unknown');
        });
    }
}
