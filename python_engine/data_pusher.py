import paho.mqtt.client as mqtt
import time
import random
import json

BROKER = 'localhost'
PORT = 1883
TOPIC = 'v1/devices/me/telemetry'
DEVICE_ID = 'device-mqtt-001'

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print("Failed to connect, return code %d\n", rc)

client = mqtt.Client(client_id=DEVICE_ID)
client.on_connect = on_connect

try:
    client.connect(BROKER, PORT, 60)
except Exception as e:
    print(f"Could not connect to MQTT Broker: {e}")
    exit(1)

client.loop_start()

try:
    while True:
        data = {
            'deviceId': DEVICE_ID,
            'temperature': random.uniform(20, 35),
            'humidity': random.uniform(30, 70),
            'timestamp': time.time() * 1000
        }
        payload = json.dumps(data)
        print(f"Publishing to {TOPIC}: {payload}")
        client.publish(TOPIC, payload)
        time.sleep(2)
except KeyboardInterrupt:
    print("Disconnecting...")
    client.loop_stop()
    client.disconnect()
