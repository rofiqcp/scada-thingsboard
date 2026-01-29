import { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import {
    Devices as DevicesIcon,
    Alarm as AlarmIcon,
    Speed as SpeedIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { io } from 'socket.io-client';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';
import { StatCard, AlarmListWidget, DeviceStatusWidget, QuickLinksWidget } from '../components/widgets';
import { useNavigate } from 'react-router-dom';

interface TelemetryData {
    temperature: number;
    humidity: number;
    timestamp: string;
    time?: string;
}

const Dashboard = () => {
    const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
    const [latestData, setLatestData] = useState<TelemetryData | null>(null);
    const [deviceStatus] = useState({ online: 8, offline: 2, inactive: 2, total: 12 });
    const [alarms] = useState([
        { id: '1', severity: 'critical' as const, message: 'High temperature detected', device: 'Sensor-001', time: '2 min ago', acknowledged: false },
        { id: '2', severity: 'warning' as const, message: 'Low battery warning', device: 'Sensor-003', time: '15 min ago', acknowledged: false },
        { id: '3', severity: 'minor' as const, message: 'Device offline', device: 'Gateway-002', time: '1 hour ago', acknowledged: true },
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io('http://localhost:3000');

        socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        socket.on('telemetry', (newData: TelemetryData) => {
            setLatestData(newData);
            setTelemetryData((prev) => {
                const updated = [
                    ...prev,
                    {
                        ...newData,
                        time: new Date(newData.timestamp).toLocaleTimeString(),
                    },
                ];
                if (updated.length > 20) return updated.slice(updated.length - 20);
                return updated;
            });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Box sx={{ animation: 'fadeIn 0.3s ease-out' }}>
            {/* Welcome Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Welcome back!
                </Typography>
                <Typography color="text.secondary">
                    Here's what's happening with your IoT devices today.
                </Typography>
            </Box>

            {/* Stats Row */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Total Devices"
                        value={deviceStatus.total}
                        subtitle={`${deviceStatus.online} online`}
                        icon={<DevicesIcon />}
                        color="primary"
                        trend={{ value: 12, label: 'vs last month' }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Active Alarms"
                        value={alarms.filter(a => !a.acknowledged).length}
                        subtitle={`${alarms.filter(a => a.severity === 'critical').length} critical`}
                        icon={<AlarmIcon />}
                        color="error"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Temperature"
                        value={latestData ? `${latestData.temperature.toFixed(1)}°C` : '--°C'}
                        subtitle="Current reading"
                        icon={<SpeedIcon />}
                        color="warning"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <StatCard
                        title="Humidity"
                        value={latestData ? `${latestData.humidity.toFixed(1)}%` : '--%'}
                        subtitle="Current reading"
                        icon={<TrendingUpIcon />}
                        color="info"
                    />
                </Grid>
            </Grid>

            {/* Charts Row */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Card sx={{ height: 400 }}>
                        <CardContent sx={{ height: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Live Telemetry
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Box sx={{ width: 12, height: 12, borderRadius: 1, backgroundColor: '#3f51b5' }} />
                                        <Typography variant="body2" color="text.secondary">Temperature</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Box sx={{ width: 12, height: 12, borderRadius: 1, backgroundColor: '#4caf50' }} />
                                        <Typography variant="body2" color="text.secondary">Humidity</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <ResponsiveContainer width="100%" height="85%">
                                <AreaChart data={telemetryData}>
                                    <defs>
                                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3f51b5" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#3f51b5" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4caf50" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9e9e9e" />
                                    <YAxis tick={{ fontSize: 12 }} stroke="#9e9e9e" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            borderRadius: 8,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            border: 'none',
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="temperature"
                                        stroke="#3f51b5"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorTemp)"
                                        name="Temperature (°C)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="humidity"
                                        stroke="#4caf50"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorHumidity)"
                                        name="Humidity (%)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, lg: 4 }}>
                    <DeviceStatusWidget status={deviceStatus} />
                </Grid>
            </Grid>

            {/* Bottom Row */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <AlarmListWidget alarms={alarms} onViewAll={() => navigate('/alarms')} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <QuickLinksWidget />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
