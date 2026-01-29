import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Alarm, Dashboard, Devices, Rule } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface QuickLink {
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    color: string;
}

const QuickLinksWidget: React.FC = () => {
    const navigate = useNavigate();

    const links: QuickLink[] = [
        {
            title: 'Alarm List',
            description: 'View all alarms',
            icon: <Alarm />,
            path: '/alarms',
            color: '#f44336',
        },
        {
            title: 'Dashboards',
            description: 'View dashboards',
            icon: <Dashboard />,
            path: '/dashboards',
            color: '#3f51b5',
        },
        {
            title: 'Devices',
            description: 'Manage devices',
            icon: <Devices />,
            path: '/devices',
            color: '#4caf50',
        },
        {
            title: 'Rule Chains',
            description: 'Configure rules',
            icon: <Rule />,
            path: '/rule-chains',
            color: '#ff9800',
        },
    ];

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Quick Links
                </Typography>
                <Grid container spacing={2}>
                    {links.map((link) => (
                        <Grid size={6} key={link.title}>
                            <Button
                                fullWidth
                                onClick={() => navigate(link.path)}
                                sx={{
                                    flexDirection: 'column',
                                    p: 2,
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    backgroundColor: 'background.paper',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                        borderColor: link.color,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        backgroundColor: `${link.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 1,
                                    }}
                                >
                                    {React.cloneElement(link.icon as React.ReactElement<{ sx?: object }>, {
                                        sx: { color: link.color, fontSize: 24 },
                                    })}
                                </Box>
                                <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    sx={{ color: 'text.primary' }}
                                >
                                    {link.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {link.description}
                                </Typography>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default QuickLinksWidget;
