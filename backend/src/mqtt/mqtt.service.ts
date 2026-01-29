import { Injectable, OnModuleInit } from '@nestjs/common';
import Aedes from 'aedes';
import { createServer } from 'aedes-server-factory';
import { TelemetryGateway } from '../telemetry/telemetry.gateway';

@Injectable()
export class MqttService implements OnModuleInit {
    private aedes: Aedes;
    private server: any;

    constructor(private telemetryGateway: TelemetryGateway) { }

    onModuleInit() {
        this.aedes = new Aedes();
        this.server = createServer(this.aedes);

        const port = 1883;

        this.server.listen(port, () => {
            console.log('MQTT Broker started on port', port);
        });

        this.aedes.on('publish', (packet, client) => {
            if (client) {
                console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + this.aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic);

                if (packet.topic === 'v1/devices/me/telemetry') {
                    try {
                        const data = JSON.parse(packet.payload.toString());
                        // Forward to WebSocket Gateway
                        this.telemetryGateway.server.emit('telemetry', data);
                    } catch (e) {
                        console.error('Failed to parse MQTT message', e);
                    }
                }
            }
        });

        this.aedes.on('client', (client) => {
            console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', this.aedes.id);
        });
    }
}
