// PowerOS Desktop Manager - Main FUI controller (same as ui.js)

class DesktopManager {
    constructor() {
        this.windows = {};
        this.windowCounter = 1;
        this.activeWindow = null;
        this.draggingWindow = null;
        this.dragOffset = { x: 0, y: 0 };
        this.apps = {
            filemanager: { name: 'File Manager', icon: '📁' },
            editor: { name: 'Text Editor', icon: '📝' },
            calculator: { name: 'Calculator', icon: '🧮' },
            browser: { name: 'Browser', icon: '🌐' },
            terminal: { name: 'Terminal', icon: '⌨️' },
            settings: { name: 'Settings', icon: '⚙️' }
        };
        this.windowPositions = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    setupEventListeners() {
        // Start menu
        document.getElementById('start-btn').addEventListener('click', () => {
            this.toggleStartMenu();
        });

        document.getElementById('start-menu').addEventListener('click', (e) => {
            if (e.target.classList.contains('menu-item')) {
                const appName = e.target.dataset.app;
                if (appName === 'shutdown') {
                    this.shutdown();
                } else {
                    this.launchApp(appName);
                }
                this.toggleStartMenu();
            }
        });

        // Close start menu on background click
        document.getElementById('background').addEventListener('click', () => {
            const menu = document.getElementById('start-menu');
            if (!menu.classList.contains('hidden')) {
                this.toggleStartMenu();
            }
        });
    }

    toggleStartMenu() {
        const menu = document.getElementById('start-menu');
        menu.classList.toggle('hidden');
    }

    launchApp(appName) {
        const app = this.apps[appName];
        if (!app) return;

        const windowId = `${appName}-${this.windowCounter++}`;
        const x = 100 + (Math.random() * 100);
        const y = 100 + (Math.random() * 100);

        const windowEl = this.createWindowElement(windowId, app.name, x, y, 600, 400);
        const container = document.getElementById('windows-container');
        container.appendChild(windowEl);

        this.windows[windowId] = {
            id: windowId,
            app: appName,
            element: windowEl,
            minimized: false,
            x, y
        };

        this.setActiveWindow(windowId);
        this.loadAppContent(windowId, appName);
        this.setupWindowDragging(windowId);
    }

    createWindowElement(id, title, x, y, width, height) {
        const win = document.createElement('div');
        win.id = id;
        win.className = 'window active';
        win.style.left = x + 'px';
        win.style.top = y + 'px';
        win.style.width = width + 'px';
        win.style.height = height + 'px';

        const titlebar = document.createElement('div');
        titlebar.className = 'window-titlebar';
        titlebar.innerHTML = `
            <span>${title}</span>
            <div class="window-controls">
                <button class="window-btn minimize" title="Minimize">−</button>
                <button class="window-btn maximize" title="Maximize">□</button>
                <button class="window-btn close" title="Close">✕</button>
            </div>
        `;

        const content = document.createElement('div');
        content.className = 'window-content';
        content.id = `content-${id}`;

        win.appendChild(titlebar);
        win.appendChild(content);

        // Window control buttons
        titlebar.querySelector('.minimize').addEventListener('click', () => {
            this.minimizeWindow(id);
        });
        titlebar.querySelector('.maximize').addEventListener('click', () => {
            this.maximizeWindow(id);
        });
        titlebar.querySelector('.close').addEventListener('click', () => {
            this.closeWindow(id);
        });

        // Click to focus
        win.addEventListener('click', () => {
            this.setActiveWindow(id);
        });

        return win;
    }

    setupWindowDragging(windowId) {
        const titlebar = document.getElementById(windowId).querySelector('.window-titlebar');
        let isDown = false;
        let offset = { x: 0, y: 0 };

        titlebar.addEventListener('mousedown', (e) => {
            isDown = true;
            const rect = document.getElementById(windowId).getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            const win = document.getElementById(windowId);
            win.style.left = (e.clientX - offset.x) + 'px';
            win.style.top = (e.clientY - offset.y) + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDown = false;
        });
    }

    loadAppContent(windowId, appName) {
        const content = document.getElementById(`content-${windowId}`);
        let html = '';

        switch (appName) {
            case 'filemanager':
                html = this.getFileManagerContent();
                break;
            case 'editor':
                html = this.getEditorContent();
                break;
            case 'calculator':
                html = this.getCalculatorContent();
                break;
            case 'browser':
                html = this.getBrowserContent();
                break;
            case 'terminal':
                html = this.getTerminalContent();
                break;
            case 'settings':
                html = this.getSettingsContent();
                break;
        }

        content.innerHTML = html;

        // Setup app-specific handlers
        if (appName === 'calculator') {
            this.setupCalculator();
        } else if (appName === 'terminal') {
            this.setupTerminal();
        } else if (appName === 'editor') {
            this.setupEditor();
        }
    }

    getFileManagerContent() {
        return `
            <h3>File Manager</h3>
            <div style="margin-bottom: 8px;">
                <input type="text" placeholder="Path: /" style="width: calc(100% - 16px);">
            </div>
            <div class="window-grid">
                <div class="file-item">
                    <div class="file-icon">📁</div>
                    <div class="file-name">Documents</div>
                </div>
                <div class="file-item">
                    <div class="file-icon">📁</div>
                    <div class="file-name">Downloads</div>
                </div>
                <div class="file-item">
                    <div class="file-icon">📄</div>
                    <div class="file-name">readme.txt</div>
                </div>
                <div class="file-item">
                    <div class="file-icon">📄</div>
                    <div class="file-name">config.json</div>
                </div>
            </div>
        `;
    }

    getEditorContent() {
        return `
            <h3>Text Editor</h3>
            <textarea class="text-input" placeholder="Start typing..."></textarea>
            <div style="margin-top: 8px;">
                <button style="padding: 6px 12px; margin-right: 4px;">Save</button>
                <button style="padding: 6px 12px; margin-right: 4px;">Open</button>
                <button style="padding: 6px 12px;">New</button>
            </div>
        `;
    }

    getCalculatorContent() {
        return `
            <h3 style="margin-bottom: 12px;">Calculator</h3>
            <input type="text" id="calc-display" readonly value="0">
            <div class="calc-grid">
                <button class="calc-btn" data-action="clear">C</button>
                <button class="calc-btn" data-action="delete">←</button>
                <button class="calc-btn operator" data-action="divide">÷</button>
                <button class="calc-btn operator" data-action="multiply">×</button>
                
                <button class="calc-btn" data-num="7">7</button>
                <button class="calc-btn" data-num="8">8</button>
                <button class="calc-btn" data-num="9">9</button>
                <button class="calc-btn operator" data-action="subtract">−</button>
                
                <button class="calc-btn" data-num="4">4</button>
                <button class="calc-btn" data-num="5">5</button>
                <button class="calc-btn" data-num="6">6</button>
                <button class="calc-btn operator" data-action="add">+</button>
                
                <button class="calc-btn" data-num="1">1</button>
                <button class="calc-btn" data-num="2">2</button>
                <button class="calc-btn" data-num="3">3</button>
                <button class="calc-btn operator" data-action="decimal">.</button>
                
                <button class="calc-btn" data-num="0" style="grid-column: span 2;">0</button>
                <button class="calc-btn operator" style="grid-column: span 2;" data-action="equals">=</button>
            </div>
        `;
    }

    getBrowserContent() {
        return `
            <h3>Browser</h3>
            <div style="margin-bottom: 8px; display: flex; gap: 4px;">
                <input type="text" placeholder="Enter URL..." style="flex: 1;">
                <button>Go</button>
            </div>
            <div style="background: #f9f9f9; padding: 16px; border-radius: 4px; text-align: center; color: #666;">
                <p>Welcome to PowerOS Browser</p>
                <p style="font-size: 12px; margin-top: 8px;">This is a simulation of a web browser</p>
            </div>
        `;
    }

    getTerminalContent() {
        return `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div id="terminal-output" style="flex: 1; overflow-y: auto;"></div>
                <div style="display: flex; gap: 4px;">
                    <span>PowerOS> </span>
                    <input type="text" id="terminal-input" style="flex: 1; border: none; padding: 4px; background: transparent; color: inherit;">
                </div>
            </div>
        `;
    }

    getSettingsContent() {
        return `
            <h3>System Settings</h3>
            <div style="padding: 12px 0;">
                <h4>Display Settings</h4>
                <div style="margin: 8px 0;">
                    <label>Resolution: <select style="margin-left: 8px;"><option>1920x1080</option><option>1280x720</option></select></label>
                </div>
                
                <h4 style="margin-top: 16px;">Sound Settings</h4>
                <div style="margin: 8px 0;">
                    <label>Volume: <input type="range" min="0" max="100" value="70" style="margin-left: 8px; width: 150px;"></label>
                </div>
                
                <h4 style="margin-top: 16px;">System Information</h4>
                <div style="margin: 8px 0; font-size: 12px; color: #666;">
                    <p>OS: PowerOS v1.0.0</p>
                    <p>Memory: 8192 MB</p>
                    <p>Processor: Virtual CPU</p>
                </div>
                
                <button style="margin-top: 16px; padding: 8px 16px; background: #0078d4; color: white; border: none; border-radius: 4px;">Apply</button>
            </div>
        `;
    }

    setupCalculator() {
        let display = document.getElementById('calc-display');
        let currentValue = '0';
        let previousValue = '';
        let operation = null;

        const buttons = document.querySelectorAll('.calc-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const num = btn.dataset.num;
                const action = btn.dataset.action;

                if (num !== undefined) {
                    currentValue = currentValue === '0' ? num : currentValue + num;
                    display.value = currentValue;
                } else if (action === 'clear') {
                    currentValue = '0';
                    previousValue = '';
                    operation = null;
                    display.value = '0';
                } else if (action === 'delete') {
                    currentValue = currentValue.slice(0, -1) || '0';
                    display.value = currentValue;
                } else if (action === 'decimal') {
                    if (!currentValue.includes('.')) {
                        currentValue += '.';
                        display.value = currentValue;
                    }
                } else if (['+', '-', '×', '÷'].includes(action) || action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                    const opMap = { 'add': '+', 'subtract': '-', 'multiply': '*', 'divide': '/' };
                    const op = opMap[action] || action;
                    if (operation && previousValue) {
                        currentValue = String(eval(previousValue + operation + currentValue));
                        display.value = currentValue;
                    }
                    previousValue = currentValue;
                    operation = op;
                    currentValue = '';
                } else if (action === 'equals') {
                    if (operation && previousValue) {
                        currentValue = String(eval(previousValue + operation + currentValue));
                        display.value = currentValue;
                        previousValue = '';
                        operation = null;
                    }
                }
            });
        });
    }

    setupTerminal() {
        const output = document.getElementById('terminal-output');
        const input = document.getElementById('terminal-input');

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value;
                output.textContent += `PowerOS> ${cmd}\n`;
                output.textContent += this.executeTerminalCommand(cmd) + '\n';
                output.scrollTop = output.scrollHeight;
                input.value = '';
            }
        });

        output.textContent = 'PowerOS Shell v1.0.0\nType "help" for available commands.\n\n';
    }

    executeTerminalCommand(cmd) {
        const parts = cmd.trim().split(/\s+/);
        const command = parts[0];
        const args = parts.slice(1);

        const commands = {
            'help': () => `Available commands:
  help      - Show this help
  ls        - List files
  echo      - Print text
  date      - Show date/time
  sysinfo   - System information
  clear     - Clear screen`,
            'ls': () => 'Documents/  Downloads/  readme.txt  config.json',
            'echo': () => args.join(' '),
            'date': () => new Date().toLocaleString(),
            'sysinfo': () => `PowerOS v1.0.0
Memory: 8192 MB
Uptime: 2h 15m
Processes: 6`,
            'clear': () => { document.getElementById('terminal-output').textContent = ''; return ''; }
        };

        return commands[command] ? commands[command]() : `Command not found: ${command}`;
    }

    setupEditor() {
        // Simple editor setup - content is already there
    }

    setActiveWindow(windowId) {
        // Deactivate previous
        if (this.activeWindow) {
            const prevWin = document.getElementById(this.activeWindow);
            if (prevWin) prevWin.classList.remove('active');
        }

        // Activate new
        const win = document.getElementById(windowId);
        if (win) {
            win.classList.add('active');
            win.style.zIndex = 1000 + this.windowCounter;
            this.activeWindow = windowId;

            // Update taskbar
            this.updateTaskbar();
        }
    }

    minimizeWindow(windowId) {
        const win = document.getElementById(windowId);
        if (win) {
            win.classList.add('minimized');
            this.windows[windowId].minimized = true;
            this.updateTaskbar();
        }
    }

    maximizeWindow(windowId) {
        const win = document.getElementById(windowId);
        if (win) {
            const isMaxed = win.hasAttribute('data-maximized');
            if (isMaxed) {
                win.removeAttribute('data-maximized');
                win.style.left = this.windows[windowId].x + 'px';
                win.style.top = this.windows[windowId].y + 'px';
                win.style.width = '600px';
                win.style.height = '400px';
            } else {
                win.setAttribute('data-maximized', 'true');
                this.windows[windowId].x = parseInt(win.style.left);
                this.windows[windowId].y = parseInt(win.style.top);
                win.style.left = '0';
                win.style.top = '0';
                win.style.width = '100%';
                win.style.height = 'calc(100% - 60px)';
            }
        }
    }

    closeWindow(windowId) {
        const win = document.getElementById(windowId);
        if (win) {
            win.remove();
            delete this.windows[windowId];
            if (this.activeWindow === windowId) {
                this.activeWindow = null;
            }
            this.updateTaskbar();
        }
    }

    updateTaskbar() {
        const taskbarApps = document.getElementById('taskbar-apps');
        taskbarApps.innerHTML = '';

        Object.keys(this.windows).forEach(winId => {
            const win = this.windows[winId];
            const btn = document.createElement('button');
            btn.className = 'task-item';
            if (win.id === this.activeWindow && !win.minimized) {
                btn.classList.add('active');
            }
            btn.textContent = this.apps[win.app].icon + ' ' + this.apps[win.app].name;
            btn.addEventListener('click', () => {
                if (win.minimized) {
                    win.minimized = false;
                    document.getElementById(winId).classList.remove('minimized');
                    this.setActiveWindow(winId);
                } else if (win.id === this.activeWindow) {
                    this.minimizeWindow(winId);
                } else {
                    this.setActiveWindow(winId);
                }
                this.updateTaskbar();
            });
            taskbarApps.appendChild(btn);
        });
    }

    updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}`;
    }

    shutdown() {
        alert('PowerOS shutting down...');
        // In a real OS, this would close all windows gracefully
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    window.desktop = new DesktopManager();
});
