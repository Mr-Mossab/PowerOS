// PowerOS Kernel - Full implementation

const EventEmitter = require('events').EventEmitter;

class VirtualFilesystem {
    constructor() {
        this.files = {};
        this.directories = {
            '/': { type: 'dir', children: ['home', 'bin', 'etc', 'tmp'] },
            '/home': { type: 'dir', children: [] },
            '/bin': { type: 'dir', children: [] },
            '/etc': { type: 'dir', children: [] },
            '/tmp': { type: 'dir', children: [] }
        };
    }

    writeFile(path, content) {
        this.files[path] = { type: 'file', content, created: Date.now() };
        return true;
    }

    readFile(path) {
        if (this.files[path]) return this.files[path].content;
        throw new Error(`File not found: ${path}`);
    }

    mkDir(path) {
        this.directories[path] = { type: 'dir', children: [] };
        return true;
    }

    listDir(path) {
        const dir = this.directories[path];
        if (!dir) throw new Error(`Directory not found: ${path}`);
        return Object.keys(this.files)
            .filter(f => f.startsWith(path))
            .concat(dir.children || []);
    }

    exists(path) {
        return !!(this.files[path] || this.directories[path]);
    }
}

class ProcessManager {
    constructor() {
        this.processes = {};
        this.pidCounter = 1000;
    }

    spawn(appName, args = []) {
        const pid = this.pidCounter++;
        this.processes[pid] = {
            pid,
            appName,
            args,
            status: 'running',
            startTime: Date.now(),
            memory: Math.random() * 50000
        };
        return pid;
    }

    kill(pid) {
        if (this.processes[pid]) {
            this.processes[pid].status = 'terminated';
            delete this.processes[pid];
            return true;
        }
        return false;
    }

    list() {
        return Object.values(this.processes);
    }

    getInfo(pid) {
        return this.processes[pid] || null;
    }
}

class DeviceManager {
    constructor() {
        this.devices = {
            display: { name: 'Display', status: 'active', resolution: '1920x1080' },
            keyboard: { name: 'Keyboard', status: 'active' },
            mouse: { name: 'Mouse', status: 'active' },
            network: { name: 'Network', status: 'connected', ip: '192.168.1.100' }
        };
    }

    getDevice(name) {
        return this.devices[name] || null;
    }

    listDevices() {
        return this.devices;
    }
}

class Kernel extends EventEmitter {
    constructor() {
        super();
        this.fs = new VirtualFilesystem();
        this.processManager = new ProcessManager();
        this.deviceManager = new DeviceManager();
        this.memory = 8 * 1024 * 1024; // 8MB
        this.uptime = 0;
        this.systemRegistry = {};
        console.log('PowerOS Kernel initialized');
    }

    boot() {
        console.log('Booting PowerOS...');
        this.uptime = 0;
        this.startUptimeCounter();
        this.emit('boot');
    }

    startUptimeCounter() {
        setInterval(() => {
            this.uptime++;
        }, 1000);
    }

    getSystemInfo() {
        return {
            version: '1.0.0',
            uptime: this.uptime,
            memory: this.memory,
            processes: this.processManager.list().length,
            devices: this.deviceManager.listDevices()
        };
    }

    setSetting(key, value) {
        this.systemRegistry[key] = value;
    }

    getSetting(key) {
        return this.systemRegistry[key];
    }
}

module.exports = Kernel;