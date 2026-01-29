import { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    IconButton,
    Chip,
    TextField,
    InputAdornment,
    Tooltip,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    AccountTree as TreeIcon,
} from '@mui/icons-material';

interface RuleChain {
    id: string;
    name: string;
    description: string;
    isRoot: boolean;
    active: boolean;
    createdTime: number;
}

const RuleChains = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [ruleChains] = useState<RuleChain[]>([
        { id: '1', name: 'Root Rule Chain', description: 'Main processing rule chain', isRoot: true, active: true, createdTime: Date.now() - 86400000 * 60 },
        { id: '2', name: 'Telemetry Processing', description: 'Process incoming telemetry data', isRoot: false, active: true, createdTime: Date.now() - 86400000 * 30 },
        { id: '3', name: 'Alarm Rules', description: 'Alarm creation and notification rules', isRoot: false, active: true, createdTime: Date.now() - 86400000 * 15 },
        { id: '4', name: 'Device Provisioning', description: 'Auto-provision new devices', isRoot: false, active: false, createdTime: Date.now() - 86400000 * 10 },
    ]);

    const filteredRuleChains = ruleChains.filter(
        (r) => r.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Rule Chains
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Configure data processing and automation rules
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Create Rule Chain
                </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <TextField
                    placeholder="Search rule chains..."
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
                {filteredRuleChains.map((ruleChain) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ruleChain.id}>
                        <Card
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                border: ruleChain.isRoot ? '2px solid' : '1px solid',
                                borderColor: ruleChain.isRoot ? 'primary.main' : 'divider',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                                },
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 2,
                                            backgroundColor: ruleChain.isRoot ? 'primary.main' : 'rgba(63, 81, 181, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <TreeIcon sx={{ color: ruleChain.isRoot ? '#fff' : 'primary.main' }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        {ruleChain.isRoot && (
                                            <Chip
                                                label="Root"
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'primary.main',
                                                    color: '#fff',
                                                    fontSize: '0.7rem',
                                                    height: 20,
                                                }}
                                            />
                                        )}
                                        <Chip
                                            label={ruleChain.active ? 'Active' : 'Inactive'}
                                            size="small"
                                            sx={{
                                                backgroundColor: ruleChain.active ? 'rgba(76, 175, 80, 0.1)' : 'rgba(158, 158, 158, 0.1)',
                                                color: ruleChain.active ? '#4caf50' : '#9e9e9e',
                                                fontSize: '0.7rem',
                                                height: 20,
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    {ruleChain.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {ruleChain.description}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="caption" color="text.secondary">
                                        Created {new Date(ruleChain.createdTime).toLocaleDateString()}
                                    </Typography>
                                    <Box>
                                        <Tooltip title="Open Editor">
                                            <IconButton size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" disabled={ruleChain.isRoot}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RuleChains;
