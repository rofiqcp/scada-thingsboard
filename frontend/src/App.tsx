import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: '#f0f2f5',
    },
  },
});

// Placeholder Dashboard component
import MainLayout from './layout/MainLayout';
import { Typography } from '@mui/material';
import Devices from './pages/Devices';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/settings" element={<Typography variant="h4">Settings</Typography>} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
