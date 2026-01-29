import { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Chip,
    TextField,
    InputAdornment,
    Tooltip,
    Avatar,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
} from '@mui/icons-material';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'USER' | 'CUSTOMER';
    status: 'active' | 'inactive';
    createdTime: number;
    lastLogin: number;
}

const Profiles = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users] = useState<User[]>([
        { id: '1', email: 'admin@scada.io', firstName: 'Admin', lastName: 'User', role: 'ADMIN', status: 'active', createdTime: Date.now() - 86400000 * 60, lastLogin: Date.now() - 3600000 },
        { id: '2', email: 'operator@scada.io', firstName: 'John', lastName: 'Operator', role: 'USER', status: 'active', createdTime: Date.now() - 86400000 * 30, lastLogin: Date.now() - 86400000 },
        { id: '3', email: 'customer@example.com', firstName: 'Jane', lastName: 'Customer', role: 'CUSTOMER', status: 'active', createdTime: Date.now() - 86400000 * 15, lastLogin: Date.now() - 86400000 * 5 },
        { id: '4', email: 'inactive@scada.io', firstName: 'Old', lastName: 'User', role: 'USER', status: 'inactive', createdTime: Date.now() - 86400000 * 90, lastLogin: Date.now() - 86400000 * 60 },
    ]);

    const roleColors = {
        ADMIN: { bg: 'rgba(244, 67, 54, 0.1)', color: '#f44336' },
        USER: { bg: 'rgba(63, 81, 181, 0.1)', color: '#3f51b5' },
        CUSTOMER: { bg: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' },
    };

    const filteredUsers = users.filter(
        (u) =>
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        User Profiles
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage user accounts and permissions
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Add User
                </Button>
            </Box>

            <Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField
                        placeholder="Search users..."
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
                                <TableCell>User</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Last Login</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user) => {
                                const roleStyle = roleColors[user.role];
                                return (
                                    <TableRow key={user.id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Avatar
                                                    sx={{
                                                        width: 36,
                                                        height: 36,
                                                        backgroundColor: 'primary.main',
                                                        fontSize: '0.9rem',
                                                    }}
                                                >
                                                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body2" fontWeight={500}>
                                                        {user.firstName} {user.lastName}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.role}
                                                size="small"
                                                sx={{
                                                    backgroundColor: roleStyle.bg,
                                                    color: roleStyle.color,
                                                    fontWeight: 500,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.status}
                                                size="small"
                                                sx={{
                                                    backgroundColor: user.status === 'active'
                                                        ? 'rgba(76, 175, 80, 0.1)'
                                                        : 'rgba(158, 158, 158, 0.1)',
                                                    color: user.status === 'active' ? '#4caf50' : '#9e9e9e',
                                                    textTransform: 'capitalize',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.lastLogin).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton size="small">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small">
                                                <MoreVertIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default Profiles;
