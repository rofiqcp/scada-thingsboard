import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Card,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
} from '@mui/material';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    MoreVert as MoreVertIcon,
    AccountTree as AssetIcon,
} from '@mui/icons-material';

interface Asset {
    id: string;
    name: string;
    type: string;
    label: string;
    createdTime: number;
}

const Assets = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [assets] = useState<Asset[]>([
        { id: '1', name: 'Building A', type: 'building', label: 'Main Office', createdTime: Date.now() - 86400000 * 30 },
        { id: '2', name: 'Floor 1', type: 'floor', label: 'First Floor', createdTime: Date.now() - 86400000 * 25 },
        { id: '3', name: 'Room 101', type: 'room', label: 'Conference Room', createdTime: Date.now() - 86400000 * 20 },
        { id: '4', name: 'HVAC System', type: 'equipment', label: 'Central AC', createdTime: Date.now() - 86400000 * 15 },
    ]);

    const columns: GridColDef<Asset>[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams<Asset>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AssetIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={500}>
                        {params.value}
                    </Typography>
                </Box>
            ),
        },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'label', headerName: 'Label', flex: 1, minWidth: 150 },
        {
            field: 'createdTime',
            headerName: 'Created',
            width: 180,
            valueFormatter: (value: number) => new Date(value).toLocaleDateString(),
        },
        {
            field: 'actions',
            headerName: '',
            width: 60,
            sortable: false,
            renderCell: () => (
                <IconButton size="small">
                    <MoreVertIcon />
                </IconButton>
            ),
        },
    ];

    const filteredAssets = assets.filter(
        (a) =>
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Assets
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage your asset hierarchy
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Add Asset
                </Button>
            </Box>

            <Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField
                        placeholder="Search assets..."
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

                <Box sx={{ height: 500 }}>
                    <DataGrid
                        rows={filteredAssets}
                        columns={columns}
                        pageSizeOptions={[10, 25]}
                        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                        checkboxSelection
                        disableRowSelectionOnClick
                        sx={{ border: 'none' }}
                    />
                </Box>
            </Card>
        </Box>
    );
};

export default Assets;
