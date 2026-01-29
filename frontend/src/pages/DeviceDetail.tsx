import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Grid,
    Button,
    Chip,
    IconButton,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ContentCopy as CopyIcon,
    Refresh as RefreshIcon,
    Circle as CircleIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { useEffect } from 'react';
import axios from 'axios';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <div hidden={value !== index} {...other}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
};

const DeviceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [device, setDevice] = useState<{
        id: string;
        name: string;
        type: string;
        label: string;
        status: string;
        createdTime: number;
        lastActivityTime: number;
    } | null>(null);
    const [telemetryHistory, setTelemetryHistory] = useState<{ time: string; temperature: number; humidity: number }[]>([]);
    const [accessToken] = useState('demo_access_token_' + id);

    useEffect(() => {
        // Fetch device details
        const fetchDevice = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/devices/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDevice(response.data);
            } catch {
                // Mock device for demo
                setDevice({
                    id: id || '1',
                    name: 'Temperature Sensor',
                    type: 'sensor',
                    label: 'Living Room',
                    status: 'online',
                    createdTime: Date.now() - 86400000 * 30,
                    lastActivityTime: Date.now() - 60000,
                });
            }
        };
        fetchDevice();

        // Generate mock telemetry history
        const history = [];
        for (let i = 20; i >= 0; i--) {
            history.push({
                time: new Date(Date.now() - i * 60000).toLocaleTimeString(),
                temperature: 20 + Math.random() * 10,
                humidity: 40 + Math.random() * 20,
            });
        }
        setTelemetryHistory(history);
    }, [id]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    if (!device) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <IconButton onClick={() => navigate('/devices')}>
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {device.name}
                        </Typography>
                        <Chip
                            icon={<CircleIcon sx={{ fontSize: '10px !important' }} />}
                            label={device.status}
                            size="small"
                            sx={{
                                backgroundColor: device.status === 'online'
                                    ? 'rgba(76, 175, 80, 0.1)'
                                    : 'rgba(244, 67, 54, 0.1)',
                                color: device.status === 'online' ? '#4caf50' : '#f44336',
                                '& .MuiChip-icon': {
                                    color: device.status === 'online' ? '#4caf50' : '#f44336',
                                },
                            }}
                        />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {device.label} • {device.type}
                    </Typography>
                </Box>
                <Button variant="outlined" startIcon={<EditIcon />}>
                    Edit
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </Box>

            {/* Tabs */}
            <Card>
                <Tabs
                    value={tabValue}
                    onChange={(_, v) => setTabValue(v)}
                    sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
                >
                    <Tab label="Details" />
                    <Tab label="Telemetry" />
                    <Tab label="Attributes" />
                    <Tab label="Alarms" />
                    <Tab label="Relations" />
                </Tabs>

                {/* Details Tab */}
                <TabPanel value={tabValue} index={0}>
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                    Device Information
                                </Typography>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 500, color: 'text.secondary', border: 0, pl: 0 }}>
                                                Name
                                            </TableCell>
                                            <TableCell sx={{ border: 0 }}>{device.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 500, color: 'text.secondary', border: 0, pl: 0 }}>
                                                Type
                                            </TableCell>
                                            <TableCell sx={{ border: 0 }}>{device.type}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 500, color: 'text.secondary', border: 0, pl: 0 }}>
                                                Label
                                            </TableCell>
                                            <TableCell sx={{ border: 0 }}>{device.label}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 500, color: 'text.secondary', border: 0, pl: 0 }}>
                                                Created
                                            </TableCell>
                                            <TableCell sx={{ border: 0 }}>
                                                {new Date(device.createdTime).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 500, color: 'text.secondary', border: 0, pl: 0 }}>
                                                Last Activity
                                            </TableCell>
                                            <TableCell sx={{ border: 0 }}>
                                                {new Date(device.lastActivityTime).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                    Device Credentials
                                </Typography>
                                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Access Token
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TextField
                                            value={accessToken}
                                            size="small"
                                            fullWidth
                                            slotProps={{ input: { readOnly: true } }}
                                        />
                                        <Tooltip title="Copy">
                                            <IconButton onClick={() => copyToClipboard(accessToken)}>
                                                <CopyIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Regenerate">
                                            <IconButton>
                                                <RefreshIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </TabPanel>

                {/* Telemetry Tab */}
                <TabPanel value={tabValue} index={1}>
                    <CardContent>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                            Telemetry History
                        </Typography>
                        <Box sx={{ height: 400 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={telemetryHistory}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <ChartTooltip />
                                    <Line type="monotone" dataKey="temperature" stroke="#3f51b5" name="Temperature" />
                                    <Line type="monotone" dataKey="humidity" stroke="#4caf50" name="Humidity" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </TabPanel>

                {/* Other tabs - placeholder content */}
                <TabPanel value={tabValue} index={2}>
                    <CardContent>
                        <Typography color="text.secondary">No attributes configured</Typography>
                    </CardContent>
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    <CardContent>
                        <Typography color="text.secondary">No alarms for this device</Typography>
                    </CardContent>
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                    <CardContent>
                        <Typography color="text.secondary">No relations configured</Typography>
                    </CardContent>
                </TabPanel>
            </Card>
        </Box>
    );
};

export default DeviceDetail;
