import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import type { SvgIconProps } from '@mui/material';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactElement<SvgIconProps>;
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    trend?: {
        value: number;
        label: string;
    };
}

const colorMap = {
    primary: {
        bg: 'rgba(63, 81, 181, 0.1)',
        color: '#3f51b5',
    },
    success: {
        bg: 'rgba(76, 175, 80, 0.1)',
        color: '#4caf50',
    },
    warning: {
        bg: 'rgba(255, 152, 0, 0.1)',
        color: '#ff9800',
    },
    error: {
        bg: 'rgba(244, 67, 54, 0.1)',
        color: '#f44336',
    },
    info: {
        bg: 'rgba(33, 150, 243, 0.1)',
        color: '#2196f3',
    },
};

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    subtitle,
    icon,
    color = 'primary',
    trend,
}) => {
    const colors = colorMap[color];

    return (
        <Card
            sx={{
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: colors.color,
                    borderRadius: '12px 12px 0 0',
                }}
            />
            <CardContent sx={{ pt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1, fontWeight: 500, textTransform: 'uppercase', fontSize: '0.75rem' }}
                        >
                            {title}
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" color="text.secondary">
                                {subtitle}
                            </Typography>
                        )}
                        {trend && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: trend.value >= 0 ? '#4caf50' : '#f44336',
                                        fontWeight: 500,
                                    }}
                                >
                                    {trend.value >= 0 ? '+' : ''}{trend.value}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                    {trend.label}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            backgroundColor: colors.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {React.cloneElement(icon, {
                            sx: { fontSize: 28, color: colors.color },
                        })}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatCard;
