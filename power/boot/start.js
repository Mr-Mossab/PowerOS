// PowerOS Boot Starter - Complete system initialization

const Kernel = require('../kernel/kernel');
const SystemAPI = require('../kernel/systemapi');
const Shell = require('../shell/shell');
const path = require('path');

console.log(`
╔════════════════════════════════════════╗
║         PowerOS v1.0.0 Boot            ║
║    Custom Kernel & FUI Environment     ║
╚════════════════════════════════════════╝
`);

function bootPowerOS() {
    // Initialize kernel
    console.log('[KERNEL] Initializing PowerOS Kernel...');
    const kernel = new Kernel();
    kernel.boot();
    console.log('[KERNEL] Kernel boot successful');

    // Initialize system API
    console.log('[SYSTEM] Loading System API...');
    const systemAPI = new SystemAPI(kernel);
    console.log('[SYSTEM] System API loaded');

    // Initialize filesystem with some demo files
    console.log('[FILESYSTEM] Mounting filesystems...');
    try {
        systemAPI.fs.writeFile('/readme.txt', 'Welcome to PowerOS\n\nA JavaScript-based operating system with a custom kernel and GUI.');
        systemAPI.fs.writeFile('/etc/system.conf', 'PowerOS Configuration\nVersion=1.0.0\nKernel=Custom');
        console.log('[FILESYSTEM] Demo files created');
    } catch (e) {
        console.log('[FILESYSTEM] Note: File operations may be limited');
    }

    // Initialize shell
    console.log('[SHELL] Initializing PowerOS Shell...');
    const shell = new Shell(systemAPI);
    console.log('[SHELL] Shell ready');

    // Display system info
    const sysInfo = systemAPI.system.getInfo();
    console.log(`
[SYSTEM INFORMATION]
  Version: ${sysInfo.version}
  Memory: ${Math.round(sysInfo.memory / 1024 / 1024)}MB
  Devices: ${Object.keys(sysInfo.devices).length}
  
[GUI DEPLOYMENT]
  PowerOS FUI available at: ./fui/index.html
  Open in a modern web browser for the graphical interface.

[QUICK START]
  For CLI: Continue below in this shell
  For GUI: Open ./fui/index.html in your browser
  
Type 'help' in the shell for available commands.
Type 'exit' to quit.
`);

    // Start the shell
    console.log('[BOOT] Handing off to shell...\n');
    shell.start();
}

// Global error handler
process.on('uncaughtException', (err) => {
    console.error('[KERNEL PANIC]', err.message);
    process.exit(1);
});

// Start the system
bootPowerOS();