import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    Tooltip,
    Collapse,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Devices as DevicesIcon,
    AccountTree as AssetsIcon,
    Alarm as AlarmIcon,
    Dashboard as DashboardIcon,
    AccountCircle as ProfileIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
    Fullscreen as FullscreenIcon,
    ExpandLess,
    ExpandMore,
    DeviceHub as DeviceHubIcon,
    Rule as RuleIcon,
    ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const drawerWidth = 260;
const collapsedDrawerWidth = 72;

interface MenuItem {
    text: string;
    icon: React.ReactNode;
    path?: string;
    children?: MenuItem[];
}

const MainLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [entitiesOpen, setEntitiesOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const user = JSON.parse(localStorage.getItem('user') || '{"username": "Admin"}');

    const handleDrawerToggle = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        } else {
            setCollapsed(!collapsed);
        }
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems: MenuItem[] = [
        { text: 'Home', icon: <HomeIcon />, path: '/home' },
        { text: 'Alarms', icon: <AlarmIcon />, path: '/alarms' },
        { text: 'Dashboards', icon: <DashboardIcon />, path: '/dashboards' },
        {
            text: 'Entities',
            icon: <DeviceHubIcon />,
            children: [
                { text: 'Devices', icon: <DevicesIcon />, path: '/devices' },
                { text: 'Assets', icon: <AssetsIcon />, path: '/assets' },
            ],
        },
        { text: 'Profiles', icon: <ProfileIcon />, path: '/profiles' },
        { text: 'Rule Chains', icon: <RuleIcon />, path: '/rule-chains' },
    ];

    const bottomMenuItems: MenuItem[] = [
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    const isActive = (path?: string): boolean => !!path && location.pathname === path;
    const isParentActive = (children?: MenuItem[]) =>
        children?.some((child) => location.pathname === child.path);

    const currentWidth = collapsed && !isMobile ? collapsedDrawerWidth : drawerWidth;

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo Header */}
            <Toolbar
                sx={{
                    justifyContent: collapsed ? 'center' : 'space-between',
                    minHeight: '64px !important',
                    px: collapsed ? 1 : 2,
                }}
            >
                {!collapsed && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1,
                                backgroundColor: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                                S
                            </Typography>
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                letterSpacing: 0.5,
                            }}
                        >
                            SCADA IoT
                        </Typography>
                    </Box>
                )}
                {collapsed && (
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1,
                            backgroundColor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography sx={{ color: '#fff', fontWeight: 700 }}>S</Typography>
                    </Box>
                )}
            </Toolbar>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

            {/* Main Menu */}
            <List sx={{ flex: 1, py: 1 }}>
                {menuItems.map((item) => (
                    <React.Fragment key={item.text}>
                        {item.children ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => setEntitiesOpen(!entitiesOpen)}
                                        selected={isParentActive(item.children)}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: collapsed ? 'center' : 'initial',
                                            px: 2.5,
                                        }}
                                    >
                                        <Tooltip title={collapsed ? item.text : ''} placement="right">
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: collapsed ? 0 : 2,
                                                    justifyContent: 'center',
                                                    color: isParentActive(item.children)
                                                        ? 'primary.main'
                                                        : 'rgba(255, 255, 255, 0.7)',
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                        </Tooltip>
                                        {!collapsed && (
                                            <>
                                                <ListItemText
                                                    primary={item.text}
                                                    sx={{ color: 'rgba(255, 255, 255, 0.87)' }}
                                                />
                                                {entitiesOpen ? (
                                                    <ExpandLess sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                ) : (
                                                    <ExpandMore sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                )}
                                            </>
                                        )}
                                    </ListItemButton>
                                </ListItem>
                                {!collapsed && (
                                    <Collapse in={entitiesOpen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.children.map((child) => (
                                                <ListItem key={child.text} disablePadding>
                                                    <ListItemButton
                                                        onClick={() => {
                                                            navigate(child.path!);
                                                            if (isMobile) setMobileOpen(false);
                                                        }}
                                                        selected={isActive(child.path)}
                                                        sx={{ pl: 5 }}
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                color: isActive(child.path)
                                                                    ? 'primary.main'
                                                                    : 'rgba(255, 255, 255, 0.7)',
                                                            }}
                                                        >
                                                            {child.icon}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={child.text}
                                                            sx={{ color: 'rgba(255, 255, 255, 0.87)' }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </>
                        ) : (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(item.path!);
                                        if (isMobile) setMobileOpen(false);
                                    }}
                                    selected={isActive(item.path)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: collapsed ? 'center' : 'initial',
                                        px: 2.5,
                                    }}
                                >
                                    <Tooltip title={collapsed ? item.text : ''} placement="right">
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: collapsed ? 0 : 2,
                                                justifyContent: 'center',
                                                color: isActive(item.path)
                                                    ? 'primary.main'
                                                    : 'rgba(255, 255, 255, 0.7)',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                    </Tooltip>
                                    {!collapsed && (
                                        <ListItemText
                                            primary={item.text}
                                            sx={{ color: 'rgba(255, 255, 255, 0.87)' }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        )}
                    </React.Fragment>
                ))}
            </List>

            {/* Bottom Menu */}
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            <List sx={{ py: 1 }}>
                {bottomMenuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate(item.path!);
                                if (isMobile) setMobileOpen(false);
                            }}
                            selected={isActive(item.path)}
                            sx={{
                                minHeight: 48,
                                justifyContent: collapsed ? 'center' : 'initial',
                                px: 2.5,
                            }}
                        >
                            <Tooltip title={collapsed ? item.text : ''} placement="right">
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: collapsed ? 0 : 2,
                                        justifyContent: 'center',
                                        color: isActive(item.path)
                                            ? 'primary.main'
                                            : 'rgba(255, 255, 255, 0.7)',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                            </Tooltip>
                            {!collapsed && (
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: 'rgba(255, 255, 255, 0.87)' }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            minHeight: 48,
                            justifyContent: collapsed ? 'center' : 'initial',
                            px: 2.5,
                        }}
                    >
                        <Tooltip title={collapsed ? 'Logout' : ''} placement="right">
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: collapsed ? 0 : 2,
                                    justifyContent: 'center',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                <LogoutIcon />
                            </ListItemIcon>
                        </Tooltip>
                        {!collapsed && (
                            <ListItemText
                                primary="Logout"
                                sx={{ color: 'rgba(255, 255, 255, 0.87)' }}
                            />
                        )}
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/home') return 'Home';
        if (path === '/devices') return 'Devices';
        if (path.startsWith('/devices/')) return 'Device Details';
        if (path === '/assets') return 'Assets';
        if (path === '/alarms') return 'Alarms';
        if (path === '/dashboards') return 'Dashboards';
        if (path === '/profiles') return 'Profiles';
        if (path === '/rule-chains') return 'Rule Chains';
        if (path === '/settings') return 'Settings';
        return 'SCADA IoT';
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* App Bar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { md: `calc(100% - ${currentWidth}px)` },
                    ml: { md: `${currentWidth}px` },
                    backgroundColor: '#fff',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, color: 'text.primary' }}
                    >
                        {collapsed && !isMobile ? <MenuIcon /> : isMobile ? <MenuIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 500 }}
                    >
                        {getPageTitle()}
                    </Typography>

                    {/* Header Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Fullscreen">
                            <IconButton sx={{ color: 'text.secondary' }}>
                                <FullscreenIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notifications">
                            <IconButton sx={{ color: 'text.secondary' }}>
                                <Badge badgeContent={3} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 1 }}>
                            <Avatar
                                sx={{
                                    width: 36,
                                    height: 36,
                                    backgroundColor: 'primary.main',
                                    fontSize: '0.9rem',
                                }}
                            >
                                {user.username?.charAt(0).toUpperCase() || 'A'}
                            </Avatar>
                        </IconButton>
                    </Box>

                    {/* Profile Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        PaperProps={{
                            sx: { mt: 1, minWidth: 200 },
                        }}
                    >
                        <Box sx={{ px: 2, py: 1.5 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {user.username || 'Admin'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tenant Administrator
                            </Typography>
                        </Box>
                        <Divider />
                        <MenuItem onClick={() => { navigate('/profiles'); handleProfileMenuClose(); }}>
                            <ListItemIcon><ProfileIcon fontSize="small" /></ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/settings'); handleProfileMenuClose(); }}>
                            <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                            Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Box
                component="nav"
                sx={{
                    width: { md: currentWidth },
                    flexShrink: { md: 0 },
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: currentWidth,
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.leavingScreen,
                            }),
                            overflowX: 'hidden',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${currentWidth}px)` },
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
