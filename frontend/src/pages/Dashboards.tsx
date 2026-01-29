import { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    Chip,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    MoreVert as MoreVertIcon,
    Dashboard as DashboardIcon,
} from '@mui/icons-material';

interface DashboardItem {
    id: string;
    title: string;
    description: string;
    starred: boolean;
    createdTime: number;
    publicLink?: boolean;
}

const Dashboards = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dashboards, setDashboards] = useState<DashboardItem[]>([
        { id: '1', title: 'Environmental Monitoring', description: 'Temperature and humidity sensors overview', starred: true, createdTime: Date.now() - 86400000 * 5, publicLink: true },
        { id: '2', title: 'Energy Consumption', description: 'Power usage analytics', starred: true, createdTime: Date.now() - 86400000 * 10 },
        { id: '3', title: 'Device Status', description: 'All devices status overview', starred: false, createdTime: Date.now() - 86400000 * 15 },
        { id: '4', title: 'Alarm Summary', description: 'Active alarms dashboard', starred: false, createdTime: Date.now() - 86400000 * 20, publicLink: true },
    ]);

    const toggleStar = (id: string) => {
        setDashboards(dashboards.map(d => d.id === id ? { ...d, starred: !d.starred } : d));
    };

    const filteredDashboards = dashboards.filter(
        (d) => d.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Dashboards
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Create and manage your visualization dashboards
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Create Dashboard
                </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <TextField
                    placeholder="Search dashboards..."
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

            <Grid container spacing={3}>
                {filteredDashboards.map((dashboard) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={dashboard.id}>
                        <Card
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    height: 120,
                                    backgroundColor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <DashboardIcon sx={{ fontSize: 48, color: 'primary.main', opacity: 0.5 }} />
                            </Box>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {dashboard.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {dashboard.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            {dashboard.publicLink && (
                                                <Chip label="Public" size="small" sx={{ fontSize: '0.7rem', height: 20 }} />
                                            )}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <IconButton size="small" onClick={() => toggleStar(dashboard.id)}>
                                            {dashboard.starred ? (
                                                <StarIcon sx={{ color: '#ffc107' }} />
                                            ) : (
                                                <StarBorderIcon sx={{ color: 'text.secondary' }} />
                                            )}
                                        </IconButton>
                                        <IconButton size="small">
                                            <MoreVertIcon sx={{ color: 'text.secondary' }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                    Created {new Date(dashboard.createdTime).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboards;
