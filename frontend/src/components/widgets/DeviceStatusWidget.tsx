import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import { Circle } from '@mui/icons-material';

interface DeviceStatus {
    online: number;
    offline: number;
    inactive: number;
    total: number;
}

interface DeviceStatusWidgetProps {
    status: DeviceStatus;
}

const DeviceStatusWidget: React.FC<DeviceStatusWidgetProps> = ({ status }) => {
    const onlinePercent = (status.online / status.total) * 100 || 0;
    const offlinePercent = (status.offline / status.total) * 100 || 0;

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Device Status
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 600, color: '#4caf50' }}>
                            {status.online}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <Circle sx={{ fontSize: 8, color: '#4caf50' }} />
                            <Typography variant="body2" color="text.secondary">
                                Online
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 600, color: '#f44336' }}>
                            {status.offline}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <Circle sx={{ fontSize: 8, color: '#f44336' }} />
                            <Typography variant="body2" color="text.secondary">
                                Offline
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 600, color: '#9e9e9e' }}>
                            {status.inactive}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <Circle sx={{ fontSize: 8, color: '#9e9e9e' }} />
                            <Typography variant="body2" color="text.secondary">
                                Inactive
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                            Online Rate
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            {onlinePercent.toFixed(1)}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={onlinePercent}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#4caf50',
                                borderRadius: 4,
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                            Offline Rate
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            {offlinePercent.toFixed(1)}%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={offlinePercent}
                        sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#f44336',
                                borderRadius: 4,
                            },
                        }}
                    />
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, textAlign: 'center' }}
                >
                    Total: {status.total} devices
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DeviceStatusWidget;
