// PowerOS System API - Bridge for apps to access kernel services

class SystemAPI {
    constructor(kernel) {
        this.kernel = kernel;
    }

    // Filesystem operations
    fs = {
        readFile: (path) => this.kernel.fs.readFile(path),
        writeFile: (path, content) => this.kernel.fs.writeFile(path, content),
        listDir: (path) => this.kernel.fs.listDir(path),
        exists: (path) => this.kernel.fs.exists(path),
        mkDir: (path) => this.kernel.fs.mkDir(path)
    };

    // Process management
    process = {
        spawn: (appName, args) => this.kernel.processManager.spawn(appName, args),
        kill: (pid) => this.kernel.processManager.kill(pid),
        list: () => this.kernel.processManager.list(),
        getInfo: (pid) => this.kernel.processManager.getInfo(pid)
    };

    // Device management
    device = {
        getDevice: (name) => this.kernel.deviceManager.getDevice(name),
        listDevices: () => this.kernel.deviceManager.listDevices()
    };

    // System info
    system = {
        getInfo: () => this.kernel.getSystemInfo(),
        setSetting: (key, value) => this.kernel.setSetting(key, value),
        getSetting: (key) => this.kernel.getSetting(key)
    };

    // Event handling
    on(event, callback) {
        this.kernel.on(event, callback);
    }

    emit(event, ...args) {
        this.kernel.emit(event, ...args);
    }
}

module.exports = SystemAPI;
