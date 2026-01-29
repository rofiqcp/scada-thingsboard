import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    Tabs,
    Tab,
    Chip,
    IconButton,
    Button,
    TextField,
    InputAdornment,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
} from '@mui/material';
import {
    Search as SearchIcon,
    Refresh as RefreshIcon,
    Check as CheckIcon,
    Clear as ClearIcon,
    Error as ErrorIcon,
    Warning as WarningIcon,
    Info as InfoIcon,
} from '@mui/icons-material';

interface Alarm {
    id: string;
    severity: 'critical' | 'major' | 'minor' | 'warning';
    type: string;
    originator: string;
    message: string;
    status: 'active' | 'acknowledged' | 'cleared';
    createdTime: number;
}

const Alarms = () => {
    const [tabValue, setTabValue] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [alarms] = useState<Alarm[]>([
        { id: '1', severity: 'critical', type: 'High Temperature', originator: 'Sensor-001', message: 'Temperature exceeded 50°C', status: 'active', createdTime: Date.now() - 120000 },
        { id: '2', severity: 'major', type: 'Connection Lost', originator: 'Gateway-002', message: 'Device disconnected', status: 'active', createdTime: Date.now() - 900000 },
        { id: '3', severity: 'warning', type: 'Low Battery', originator: 'Sensor-003', message: 'Battery level below 20%', status: 'acknowledged', createdTime: Date.now() - 3600000 },
        { id: '4', severity: 'minor', type: 'Data Delay', originator: 'Sensor-005', message: 'Telemetry delay detected', status: 'cleared', createdTime: Date.now() - 7200000 },
    ]);

    const severityConfig = {
        critical: { icon: <ErrorIcon />, color: '#f44336', bg: 'rgba(244, 67, 54, 0.1)' },
        major: { icon: <WarningIcon />, color: '#ff9800', bg: 'rgba(255, 152, 0, 0.1)' },
        minor: { icon: <InfoIcon />, color: '#2196f3', bg: 'rgba(33, 150, 243, 0.1)' },
        warning: { icon: <WarningIcon />, color: '#ffc107', bg: 'rgba(255, 193, 7, 0.1)' },
    };

    const statusConfig = {
        active: { label: 'Active', color: '#f44336' },
        acknowledged: { label: 'Acknowledged', color: '#ff9800' },
        cleared: { label: 'Cleared', color: '#4caf50' },
    };

    const filteredAlarms = alarms.filter((a) => {
        const matchesSearch =
            a.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.originator.toLowerCase().includes(searchQuery.toLowerCase());
        if (tabValue === 0) return matchesSearch;
        if (tabValue === 1) return matchesSearch && a.status === 'active';
        if (tabValue === 2) return matchesSearch && a.status === 'acknowledged';
        if (tabValue === 3) return matchesSearch && a.status === 'cleared';
        return matchesSearch;
    });

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Alarms
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Monitor and manage system alarms
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" startIcon={<CheckIcon />}>
                        Acknowledge All
                    </Button>
                    <Button variant="outlined" startIcon={<ClearIcon />}>
                        Clear All
                    </Button>
                </Box>
            </Box>

            <Card>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
                        <Tab label={`All (${alarms.length})`} />
                        <Tab label={`Active (${alarms.filter(a => a.status === 'active').length})`} />
                        <Tab label={`Acknowledged (${alarms.filter(a => a.status === 'acknowledged').length})`} />
                        <Tab label={`Cleared (${alarms.filter(a => a.status === 'cleared').length})`} />
                    </Tabs>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField
                        placeholder="Search alarms..."
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: 300 }}
                    />
                    <Tooltip title="Refresh">
                        <IconButton>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#fafafa' }}>
                                <TableCell>Severity</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Originator</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAlarms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((alarm) => {
                                const severity = severityConfig[alarm.severity];
                                const status = statusConfig[alarm.status];
                                return (
                                    <TableRow key={alarm.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: 1,
                                                        backgroundColor: severity.bg,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {React.cloneElement(severity.icon, { sx: { fontSize: 18, color: severity.color } })}
                                                </Box>
                                                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                    {alarm.severity}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{alarm.type}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {alarm.originator}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{alarm.message}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={status.label}
                                                size="small"
                                                sx={{
                                                    backgroundColor: `${status.color}15`,
                                                    color: status.color,
                                                    fontWeight: 500,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(alarm.createdTime).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Acknowledge">
                                                <IconButton size="small" disabled={alarm.status !== 'active'}>
                                                    <CheckIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Clear">
                                                <IconButton size="small" disabled={alarm.status === 'cleared'}>
                                                    <ClearIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredAlarms.length}
                    page={page}
                    onPageChange={(_, p) => setPage(p)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                    rowsPerPageOptions={[10, 25, 50]}
                />
            </Card>
        </Box>
    );
};

export default Alarms;
