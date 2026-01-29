import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { io } from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [data, setData] = useState<any[]>([]);
    const [latest, setLatest] = useState<any>(null);

    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        socket.on('telemetry', (newData) => {
            setLatest(newData);
            setData((prev) => {
                const updated = [...prev, {
                    ...newData,
                    time: new Date(newData.timestamp).toLocaleTimeString()
                }];
                // Keep last 20 points
                if (updated.length > 20) return updated.slice(updated.length - 20);
                return updated;
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>System Overview</Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                Latest Temperature
                            </Typography>
                            <Typography variant="h3">
                                {latest ? latest.temperature.toFixed(2) : '-'} °C
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                Latest Humidity
                            </Typography>
                            <Typography variant="h3">
                                {latest ? latest.humidity.toFixed(2) : '-'} %
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ height: 400, p: 2 }}>
                <Typography variant="h6" gutterBottom>Live Telemetry</Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature" />
                        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity" />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </Box>
    );
};

export default Dashboard;
