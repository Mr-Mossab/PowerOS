// PowerOS Settings Application

class SettingsApp {
    constructor() {
        this.settings = {
            display: {
                resolution: '1920x1080',
                brightness: 70,
                theme: 'dark'
            },
            audio: {
                volume: 70,
                enabled: true
            },
            network: {
                hostname: 'poweros-pc',
                ip: '192.168.1.100',
                connected: true
            },
            system: {
                language: 'en-US',
                timezone: 'UTC'
            }
        };
    }

    getSetting(category, key) {
        return this.settings[category] ? this.settings[category][key] : null;
    }

    setSetting(category, key, value) {
        if (this.settings[category]) {
            this.settings[category][key] = value;
            return true;
        }
        return false;
    }

    getAllSettings() {
        return this.settings;
    }

    resetToDefaults() {
        this.settings = {
            display: {
                resolution: '1920x1080',
                brightness: 70,
                theme: 'dark'
            },
            audio: {
                volume: 70,
                enabled: true
            },
            network: {
                hostname: 'poweros-pc',
                ip: '192.168.1.100',
                connected: true
            },
            system: {
                language: 'en-US',
                timezone: 'UTC'
            }
        };
    }
}

module.exports = SettingsApp;
