import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    IconButton,
    Chip,
    Menu,
    MenuItem,
    InputAdornment,
    Card,
    Tooltip,
} from '@mui/material';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import axios from 'axios';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    ContentCopy as CopyIcon,
    Circle as CircleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Device {
    id: string;
    name: string;
    type: string;
    label: string;
    createdTime: number;
    status?: 'online' | 'offline' | 'inactive';
}

const Devices = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [newDevice, setNewDevice] = useState({ name: '', type: 'default', label: '' });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const navigate = useNavigate();

    const fetchDevices = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/devices', {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Add mock status for demo
            const devicesWithStatus = response.data.map((d: Device, i: number) => ({
                ...d,
                status: i % 3 === 0 ? 'offline' : i % 5 === 0 ? 'inactive' : 'online',
            }));
            setDevices(devicesWithStatus);
        } catch (error) {
            console.error('Failed to fetch devices', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/devices', newDevice, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOpen(false);
            fetchDevices();
            setNewDevice({ name: '', type: 'default', label: '' });
        } catch (error) {
            console.error('Failed to create device', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/devices/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchDevices();
        } catch (error) {
            console.error('Failed to delete device', error);
        }
        setAnchorEl(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, device: Device) => {
        setAnchorEl(event.currentTarget);
        setSelectedDevice(device);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedDevice(null);
    };

    const statusColors = {
        online: { color: '#4caf50', label: 'Online' },
        offline: { color: '#f44336', label: 'Offline' },
        inactive: { color: '#9e9e9e', label: 'Inactive' },
    };

    const filteredDevices = devices.filter(
        (d) =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns: GridColDef[] = [
        {
            field: 'status',
            headerName: '',
            width: 50,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const status = params.value as keyof typeof statusColors || 'inactive';
                return (
                    <Tooltip title={statusColors[status].label}>
                        <CircleIcon sx={{ fontSize: 12, color: statusColors[status].color }} />
                    </Tooltip>
                );
            },
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 180,
            renderCell: (params: GridRenderCellParams) => (
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 500,
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main' },
                    }}
                    onClick={() => navigate(`/devices/${params.row.id}`)}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        backgroundColor: 'rgba(63, 81, 181, 0.1)',
                        color: 'primary.main',
                        fontWeight: 500,
                    }}
                />
            ),
        },
        { field: 'label', headerName: 'Label', flex: 1, minWidth: 150 },
        {
            field: 'createdTime',
            headerName: 'Created',
            width: 180,
            valueFormatter: (value: number) => new Date(value).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, params.row)}
                >
                    <MoreVertIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Devices
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your IoT devices
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                    sx={{
                        backgroundColor: 'primary.main',
                        '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                >
                    Add Device
                </Button>
            </Box>

            {/* Table Card */}
            <Card>
                {/* Toolbar */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <TextField
                        placeholder="Search devices..."
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
                        <IconButton onClick={fetchDevices}>
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Data Grid */}
                <Box sx={{ height: 500 }}>
                    <DataGrid
                        rows={filteredDevices}
                        columns={columns}
                        loading={loading}
                        pageSizeOptions={[10, 25, 50]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        checkboxSelection
                        disableRowSelectionOnClick
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-cell:focus': { outline: 'none' },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#fafafa',
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            },
                        }}
                    />
                </Box>
            </Card>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{ sx: { minWidth: 180 } }}
            >
                <MenuItem onClick={() => { navigate(`/devices/${selectedDevice?.id}`); handleMenuClose(); }}>
                    <ViewIcon sx={{ mr: 1.5, fontSize: 20 }} /> View Details
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <EditIcon sx={{ mr: 1.5, fontSize: 20 }} /> Edit
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <CopyIcon sx={{ mr: 1.5, fontSize: 20 }} /> Copy Access Token
                </MenuItem>
                <MenuItem
                    onClick={() => selectedDevice && handleDelete(selectedDevice.id)}
                    sx={{ color: 'error.main' }}
                >
                    <DeleteIcon sx={{ mr: 1.5, fontSize: 20 }} /> Delete
                </MenuItem>
            </Menu>

            {/* Create Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 600 }}>Add New Device</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Device Name"
                        fullWidth
                        variant="outlined"
                        value={newDevice.name}
                        onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Device Type"
                        fullWidth
                        variant="outlined"
                        value={newDevice.type}
                        onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Label"
                        fullWidth
                        variant="outlined"
                        value={newDevice.label}
                        onChange={(e) => setNewDevice({ ...newDevice, label: e.target.value })}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreate}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Devices;
