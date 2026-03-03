// PowerOS Shell - Full implementation

const readline = require('readline');

class Shell {
    constructor(systemAPI) {
        this.systemAPI = systemAPI;
        this.currentDir = '/';
        this.history = [];
        this.builtins = {
            'help': this.cmd_help.bind(this),
            'ls': this.cmd_ls.bind(this),
            'cd': this.cmd_cd.bind(this),
            'pwd': this.cmd_pwd.bind(this),
            'mkdir': this.cmd_mkdir.bind(this),
            'echo': this.cmd_echo.bind(this),
            'run': this.cmd_run.bind(this),
            'ps': this.cmd_ps.bind(this),
            'kill': this.cmd_kill.bind(this),
            'sysinfo': this.cmd_sysinfo.bind(this),
            'calc': this.cmd_calc.bind(this),
            'cat': this.cmd_cat.bind(this),
            'exit': this.cmd_exit.bind(this)
        };
    }

    start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.setPrompt('PowerOS> ');
        rl.prompt();

        rl.on('line', (line) => {
            const trimmed = line.trim();
            if (trimmed) {
                this.execute(trimmed);
                this.history.push(trimmed);
            }
            rl.prompt();
        });

        rl.on('close', () => {
            console.log('\nShell terminated.');
            process.exit(0);
        });
    }

    execute(command) {
        const [cmd, ...args] = command.split(/\s+/);
        if (this.builtins[cmd]) {
            this.builtins[cmd](args);
        } else {
            console.log(`Command not found: ${cmd}`);
        }
    }

    cmd_help() {
        console.log(`
PowerOS Shell Commands:
  help          - Display this help message
  ls [path]     - List directory contents
  cd <path>     - Change directory
  pwd           - Print working directory
  mkdir <path>  - Create directory
  echo <text>   - Print text
  cat <file>    - Display file contents
  run <app>     - Run an application
  ps            - List running processes
  kill <pid>    - Terminate a process
  sysinfo       - Display system information
  calc <expr>   - Simple calculator
  exit          - Exit shell
        `);
    }

    cmd_ls(args) {
        const dir = args[0] || this.currentDir;
        try {
            const contents = this.systemAPI.fs.listDir(dir);
            console.log(`Contents of ${dir}:`);
            contents.forEach(item => console.log(`  ${item}`));
        } catch (e) {
            console.error(e.message);
        }
    }

    cmd_cd(args) {
        if (args.length === 0) {
            this.currentDir = '/home';
        } else {
            const path = args[0];
            try {
                if (this.systemAPI.fs.exists(path)) {
                    this.currentDir = path;
                } else {
                    console.error(`Directory not found: ${path}`);
                }
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    cmd_pwd() {
        console.log(this.currentDir);
    }

    cmd_mkdir(args) {
        if (args.length === 0) {
            console.error('mkdir: missing argument');
        } else {
            try {
                this.systemAPI.fs.mkDir(args[0]);
                console.log(`Directory created: ${args[0]}`);
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    cmd_echo(args) {
        console.log(args.join(' '));
    }

    cmd_run(args) {
        if (args.length === 0) {
            console.error('run: missing app name');
        } else {
            const pid = this.systemAPI.process.spawn(args[0], args.slice(1));
            console.log(`Started process: ${args[0]} (PID: ${pid})`);
        }
    }

    cmd_ps() {
        const processes = this.systemAPI.process.list();
        if (processes.length === 0) {
            console.log('No running processes');
        } else {
            console.log('PID\tApp\tMemory');
            processes.forEach(p => {
                console.log(`${p.pid}\t${p.appName}\t${Math.round(p.memory)} bytes`);
            });
        }
    }

    cmd_kill(args) {
        if (args.length === 0) {
            console.error('kill: missing PID');
        } else {
            const pid = parseInt(args[0]);
            if (this.systemAPI.process.kill(pid)) {
                console.log(`Killed process ${pid}`);
            } else {
                console.error(`Process ${pid} not found`);
            }
        }
    }

    cmd_sysinfo() {
        const info = this.systemAPI.system.getInfo();
        console.log(`
PowerOS System Information:
  Version: ${info.version}
  Uptime: ${info.uptime}s
  Memory: ${info.memory} bytes
  Processes: ${info.processes}
  Resolution: ${info.devices.display ? info.devices.display.resolution : 'N/A'}
        `);
    }

    cmd_calc(args) {
        const expr = args.join('');
        try {
            const result = eval(expr);
            console.log(`${result}`);
        } catch (e) {
            console.error('Calculation error');
        }
    }

    cmd_cat(args) {
        if (args.length === 0) {
            console.error('cat: missing file');
        } else {
            try {
                const content = this.systemAPI.fs.readFile(args[0]);
                console.log(content);
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    cmd_exit() {
        process.exit(0);
    }
}

module.exports = Shell;