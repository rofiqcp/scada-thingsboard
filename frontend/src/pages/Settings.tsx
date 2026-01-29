import { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    Divider,
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const Settings = () => {
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        siteTitle: 'SCADA IoT Platform',
        email: 'admin@scada.io',
        timezone: 'Asia/Jakarta',
        dateFormat: 'DD/MM/YYYY',
        darkMode: false,
        emailNotifications: true,
        alarmNotifications: true,
        deviceInactivityTimeout: 60,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Settings
            </Typography>

            {saved && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Settings saved successfully!
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* General Settings */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                General
                            </Typography>
                            <TextField
                                fullWidth
                                label="Site Title"
                                value={settings.siteTitle}
                                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Admin Email"
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Timezone</InputLabel>
                                <Select
                                    value={settings.timezone}
                                    label="Timezone"
                                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                                >
                                    <MenuItem value="Asia/Jakarta">Asia/Jakarta (UTC+7)</MenuItem>
                                    <MenuItem value="Asia/Singapore">Asia/Singapore (UTC+8)</MenuItem>
                                    <MenuItem value="UTC">UTC</MenuItem>
                                    <MenuItem value="America/New_York">America/New_York (UTC-5)</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Date Format</InputLabel>
                                <Select
                                    value={settings.dateFormat}
                                    label="Date Format"
                                    onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                                >
                                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Appearance */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Appearance
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.darkMode}
                                        onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                                    />
                                }
                                label="Dark Mode"
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Enable dark mode for the interface (coming soon)
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" color="text.secondary">
                                More appearance settings will be available in future updates.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Notifications */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Notifications
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.emailNotifications}
                                        onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                    />
                                }
                                label="Email Notifications"
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Receive email notifications for important events
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.alarmNotifications}
                                        onChange={(e) => setSettings({ ...settings, alarmNotifications: e.target.checked })}
                                    />
                                }
                                label="Alarm Notifications"
                            />
                            <Typography variant="body2" color="text.secondary">
                                Receive real-time alarm notifications
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Device Settings */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Device Settings
                            </Typography>
                            <TextField
                                fullWidth
                                label="Device Inactivity Timeout (minutes)"
                                type="number"
                                value={settings.deviceInactivityTimeout}
                                onChange={(e) => setSettings({ ...settings, deviceInactivityTimeout: parseInt(e.target.value) })}
                                helperText="Mark device as inactive after this duration without telemetry"
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    size="large"
                >
                    Save Settings
                </Button>
            </Box>
        </Box>
    );
};

export default Settings;
