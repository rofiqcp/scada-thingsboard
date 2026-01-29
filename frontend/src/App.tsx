import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import DeviceDetail from './pages/DeviceDetail';
import Assets from './pages/Assets';
import Alarms from './pages/Alarms';
import Dashboards from './pages/Dashboards';
import Profiles from './pages/Profiles';
import RuleChains from './pages/RuleChains';
import Settings from './pages/Settings';

// ThingsBoard-inspired theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5', // Indigo
      light: '#757de8',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800', // Orange
      light: '#ffc947',
      dark: '#c66900',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#212529',
          color: '#ffffff',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            borderLeft: '3px solid #3f51b5',
            '&:hover': {
              backgroundColor: 'rgba(63, 81, 181, 0.25)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
          minWidth: 40,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/dashboard" element={<Navigate to="/home" replace />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devices/:id" element={<DeviceDetail />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/alarms" element={<Alarms />} />
            <Route path="/dashboards" element={<Dashboards />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/rule-chains" element={<RuleChains />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
