import React from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Chip, IconButton } from '@mui/material';
import { Warning, Error as ErrorIcon, Info, CheckCircle, MoreVert } from '@mui/icons-material';

interface Alarm {
    id: string;
    severity: 'critical' | 'major' | 'minor' | 'warning';
    message: string;
    device: string;
    time: string;
    acknowledged: boolean;
}

interface AlarmListWidgetProps {
    alarms: Alarm[];
    onViewAll?: () => void;
}

const severityConfig = {
    critical: { icon: <ErrorIcon />, color: '#f44336', bg: 'rgba(244, 67, 54, 0.1)' },
    major: { icon: <Warning />, color: '#ff9800', bg: 'rgba(255, 152, 0, 0.1)' },
    minor: { icon: <Info />, color: '#2196f3', bg: 'rgba(33, 150, 243, 0.1)' },
    warning: { icon: <Warning />, color: '#ffc107', bg: 'rgba(255, 193, 7, 0.1)' },
};

const AlarmListWidget: React.FC<AlarmListWidgetProps> = ({ alarms, onViewAll }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 2,
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Recent Alarms
                    </Typography>
                    <IconButton size="small" onClick={onViewAll}>
                        <MoreVert />
                    </IconButton>
                </Box>
                {alarms.length === 0 ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <CheckCircle sx={{ fontSize: 48, color: '#4caf50', mb: 1 }} />
                        <Typography color="text.secondary">No active alarms</Typography>
                    </Box>
                ) : (
                    <List sx={{ py: 0 }}>
                        {alarms.map((alarm, index) => {
                            const config = severityConfig[alarm.severity];
                            return (
                                <ListItem
                                    key={alarm.id}
                                    sx={{
                                        borderBottom: index < alarms.length - 1 ? '1px solid' : 'none',
                                        borderColor: 'divider',
                                        '&:hover': { backgroundColor: 'action.hover' },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 1,
                                            backgroundColor: config.bg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2,
                                        }}
                                    >
                                        {React.cloneElement(config.icon, {
                                            sx: { fontSize: 20, color: config.color },
                                        })}
                                    </Box>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" fontWeight={500}>
                                                    {alarm.message}
                                                </Typography>
                                                {!alarm.acknowledged && (
                                                    <Chip
                                                        label="New"
                                                        size="small"
                                                        sx={{
                                                            height: 20,
                                                            fontSize: '0.7rem',
                                                            backgroundColor: config.color,
                                                            color: '#fff',
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        }
                                        secondary={
                                            <Typography variant="caption" color="text.secondary">
                                                {alarm.device} • {alarm.time}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default AlarmListWidget;
