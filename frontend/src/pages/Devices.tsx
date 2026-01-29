import { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

interface Device {
    id: string;
    name: string;
    type: string;
    label: string;
    createdTime: number;
}

const Devices = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [open, setOpen] = useState(false);
    const [newDevice, setNewDevice] = useState({ name: '', type: '', label: '' });

    const fetchDevices = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/devices', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDevices(response.data);
        } catch (error) {
            console.error('Failed to fetch devices', error);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/devices', newDevice, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOpen(false);
            fetchDevices();
            setNewDevice({ name: '', type: '', label: '' });
        } catch (error) {
            console.error('Failed to create device', error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'label', headerName: 'Label', width: 200 },
        {
            field: 'createdTime',
            headerName: 'Created Time',
            width: 200,
            valueFormatter: (params) => new Date(params.value).toLocaleString()
        },
        {
            field: 'id',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    color="error"
                    onClick={async () => {
                        const token = localStorage.getItem('token');
                        await axios.delete(`http://localhost:3000/devices/${params.row.id}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        fetchDevices();
                    }}
                >
                    Delete
                </Button>
            )
        }
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Device Management</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                    Add Device
                </Button>
            </Box>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={devices}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Device</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="outlined"
                        value={newDevice.name}
                        onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Type"
                        fullWidth
                        variant="outlined"
                        value={newDevice.type}
                        onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
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
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreate}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Devices;
