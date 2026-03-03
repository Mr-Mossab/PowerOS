// PowerOS Terminal Application

class TerminalApp {
    constructor() {
        this.output = '';
        this.currentPath = '/';
        this.commands = {
            'help': () => this.help(),
            'ls': () => this.ls(),
            'pwd': () => this.currentPath,
            'echo': (args) => args.join(' '),
            'clear': () => { this.output = ''; return ''; },
            'sysinfo': () => this.sysinfo(),
            'date': () => new Date().toLocaleString(),
            'whoami': () => 'user',
            'uptime': () => '2h 15m 30s'
        };
    }

    execute(command) {
        const parts = command.trim().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        if (this.commands[cmd]) {
            const result = typeof this.commands[cmd] === 'function'
                ? this.commands[cmd](args)
                : this.commands[cmd];
            this.output += `PowerOS> ${command}\n${result}\n`;
            return result;
        } else {
            this.output += `PowerOS> ${command}\nCommand not found: ${cmd}\n`;
            return `Command not found: ${cmd}`;
        }
    }

    help() {
        return `PowerOS Terminal - Available commands:
  help      - Show this help message
  ls        - List files
  pwd       - Print working directory
  echo      - Print text
  clear     - Clear screen
  sysinfo   - System information
  date      - Show current date/time
  whoami    - Show current user
  uptime    - Show system uptime`;
    }

    ls() {
        return 'Documents/  Downloads/  readme.txt  config.json  kernel.js';
    }

    sysinfo() {
        return `PowerOS v1.0.0
Architecture: JavaScript
Memory: 8192 MB
Uptime: 2h 15m
CPU: Virtual CPU x 4
Kernel: PowerOS Custom Kernel`;
    }

    getOutput() {
        return this.output;
    }

    clearOutput() {
        this.output = '';
    }
}

module.exports = TerminalApp;
