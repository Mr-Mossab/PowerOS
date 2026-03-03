// PowerOS Advanced OS Engine - Professional Windows-Style Implementation

class NotificationSystem {
    constructor() {
        this.notifications = [];
    }

    show(message, type = 'info', duration = 4000) {
        const container = document.getElementById('notifications');
        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.textContent = message;
        container.appendChild(notif);
        
        if (duration > 0) {
            setTimeout(() => {
                notif.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => notif.remove(), 300);
            }, duration);
        }
        
        this.notifications.push(notif);
    }

    error(msg) { this.show(msg, 'error'); }
    success(msg) { this.show(msg, 'success'); }
    info(msg) { this.show(msg, 'info'); }
}

class AdvancedWindowManager {
    constructor() {
        this.windows = {};
        this.windowCounter = 1;
        this.activeWindow = null;
        this.snapPoints = [
            { pos: 'left', x: 0, y: 0, w: 0.5, h: 1 },
            { pos: 'right', x: 0.5, y: 0, w: 0.5, h: 1 },
            { pos: 'max', x: 0, y: 0, w: 1, h: 1 }
        ];
    }

    createWindow(id, title, x, y, width, height, app = null) {
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
            <div class="window-title">
                <span>${title}</span>
            </div>
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

        // Setup window controls
        titlebar.querySelector('.minimize').addEventListener('click', () => {
            this.minimizeWindow(id);
        });
        titlebar.querySelector('.maximize').addEventListener('click', () => {
            this.maximizeWindow(id);
        });
        titlebar.querySelector('.close').addEventListener('click', () => {
            this.closeWindow(id);
        });

        // Window focus
        win.addEventListener('mousedown', () => this.setActive(id));

        // Setup dragging
        this.setupDrag(id, titlebar);

        document.getElementById('windows-container').appendChild(win);

        this.windows[id] = {
            id, title, app, win, minimized: false,
            x, y, width, height, maximized: false
        };

        this.setActive(id);
        return content;
    }

    setupDrag(id, titlebar) {
        let isDown = false;
        let offset = { x: 0, y: 0 };

        titlebar.addEventListener('mousedown', (e) => {
            isDown = true;
            const rect = this.windows[id].win.getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            const win = this.windows[id].win;
            let x = e.clientX - offset.x;
            let y = e.clientY - offset.y;
            
            // Snap to edges
            if (x < 10) x = 0;
            if (y < 10) y = 0;
            
            win.style.left = x + 'px';
            win.style.top = y + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDown = false;
        });
    }

    minimizeWindow(id) {
        const w = this.windows[id];
        if (w) {
            w.win.classList.add('minimized');
            w.minimized = true;
        }
    }

    maximizeWindow(id) {
        const w = this.windows[id];
        if (!w) return;

        if (w.maximized) {
            w.win.style.left = w.x + 'px';
            w.win.style.top = w.y + 'px';
            w.win.style.width = w.width + 'px';
            w.win.style.height = w.height + 'px';
            w.win.classList.remove('maximized');
            w.maximized = false;
        } else {
            w.x = w.win.offsetLeft;
            w.y = w.win.offsetTop;
            w.width = w.win.offsetWidth;
            w.height = w.win.offsetHeight;
            w.win.style.left = '0';
            w.win.style.top = '0';
            w.win.style.width = '100%';
            w.win.style.height = 'calc(100% - 60px)';
            w.win.classList.add('maximized');
            w.maximized = true;
        }
    }

    closeWindow(id) {
        const w = this.windows[id];
        if (w) {
            // Add closing animation
            w.win.classList.add('closing');
            
            // Remove after animation completes
            setTimeout(() => {
                w.win.remove();
                delete this.windows[id];
                if (this.activeWindow === id) this.activeWindow = null;
            }, 250);
        }
    }

    setActive(id) {
        if (this.activeWindow) {
            const prev = this.windows[this.activeWindow];
            if (prev) {
                prev.win.classList.remove('active');
                prev.win.classList.add('inactive');
            }
        }
        
        const w = this.windows[id];
        if (w) {
            w.win.classList.remove('inactive');
            w.win.classList.add('active');
            w.win.style.zIndex = 1000 + this.windowCounter++;
            this.activeWindow = id;
        }
    }

    restoreWindow(id) {
        const w = this.windows[id];
        if (w) {
            w.win.classList.remove('minimized');
            w.minimized = false;
            this.setActive(id);
        }
    }

    getWindow(id) {
        return this.windows[id]?.win || null;
    }

    listWindows() {
        return Object.values(this.windows).filter(w => !w.minimized);
    }
}

class AdvancedOS {
    constructor() {
        this.windowMgr = new AdvancedWindowManager();
        this.notifications = new NotificationSystem();
        this.apps = {
            filemanager: { name: 'File Manager', icon: '📁' },
            editor: { name: 'Text Editor', icon: '📝' },
            calculator: { name: 'Calculator', icon: '🧮' },
            browser: { name: 'Browser', icon: '🌐' },
            terminal: { name: 'Terminal', icon: '⌨️' },
            settings: { name: 'Settings', icon: '⚙️' },
            notepad: { name: 'Notepad', icon: '📄' }
        };
        this.openApps = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDesktopIcons();
        this.setupContextMenu();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        this.notifications.show('PowerOS started successfully', 'success', 3000);
    }

    setupEventListeners() {
        // Start button
        document.getElementById('start-btn').addEventListener('click', () => {
            this.toggleStartMenu();
        });

        // Start menu app selection
        document.getElementById('start-menu').addEventListener('click', (e) => {
            const item = e.target.closest('[data-app]');
            if (item) {
                const app = item.dataset.app;
                this.launchApp(app);
                this.toggleStartMenu();
            }
            
            if (e.target.id === 'menu-shutdown') {
                this.shutdown();
            }
        });

        // Close start menu on background click
        document.getElementById('background').addEventListener('click', () => {
            const menu = document.getElementById('start-menu');
            if (!menu.classList.contains('hidden')) {
                this.toggleStartMenu();
            }
        });

        // Desktop context menu
        document.getElementById('background').addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.clientX, e.clientY);
        });

        // Hide context menu on click
        document.addEventListener('click', () => {
            const ctx = document.getElementById('context-menu');
            if (!ctx.classList.contains('hidden')) {
                ctx.classList.add('hidden');
            }
        });
    }

    setupDesktopIcons() {
        const container = document.getElementById('desktop-icons');
        container.addEventListener('click', (e) => {
            const icon = e.target.closest('.desktop-icon');
            if (icon) {
                const app = icon.dataset.app;
                this.launchApp(app);
            }
        });

        // Double-click support
        container.addEventListener('dblclick', (e) => {
            const icon = e.target.closest('.desktop-icon');
            if (icon) {
                const app = icon.dataset.app;
                this.launchApp(app);
            }
        });
    }

    setupContextMenu() {
        const ctx = document.getElementById('context-menu');
        ctx.addEventListener('click', (e) => {
            const item = e.target.closest('[data-action]');
            if (item) {
                const action = item.dataset.action;
                this.handleContextAction(action);
                ctx.classList.add('hidden');
            }
        });
    }

    showContextMenu(x, y) {
        const ctx = document.getElementById('context-menu');
        ctx.style.left = x + 'px';
        ctx.style.top = y + 'px';
        ctx.classList.remove('hidden');
    }

    handleContextAction(action) {
        switch(action) {
            case 'refresh':
                this.notifications.info('Desktop refreshed');
                break;
            case 'create-folder':
                this.notifications.success('New folder created');
                break;
            case 'paste':
                this.notifications.info('Pasted from clipboard');
                break;
            case 'properties':
                this.launchApp('settings');
                break;
        }
    }

    toggleStartMenu() {
        const menu = document.getElementById('start-menu');
        menu.classList.toggle('hidden');
        
        if (!menu.classList.contains('hidden')) {
            const search = document.getElementById('app-search');
            search?.focus();
        }
    }

    launchApp(appName) {
        if (!this.apps[appName]) return;

        const app = this.apps[appName];
        const windowId = `${appName}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Prevent multiple instances of some apps
        const existingWindow = Object.values(this.windowMgr.windows).find(w => w.app === appName);
        if (appName === 'settings' && existingWindow) {
            this.windowMgr.setActive(existingWindow.id);
            return;
        }

        const x = 80 + (Math.random() * 40);
        const y = 80 + (Math.random() * 40);
        
        // Custom window sizes for specific apps
        let width = 700;
        let height = 500;
        if (appName === 'terminal') {
            width = 1000;
            height = 650;
        } else if (appName === 'browser') {
            width = 1100;
            height = 700;
        } else if (appName === 'filemanager') {
            width = 900;
            height = 600;
        }
        
        const content = this.windowMgr.createWindow(windowId, app.name, x, y, width, height, appName);

        this.loadAppUI(content, appName, windowId);
        this.updateTaskbar();
        this.notifications.show(`${app.name} opened`, 'info', 2000);
    }

    loadAppUI(container, appName, windowId) {
        container.innerHTML = '';

        switch(appName) {
            case 'filemanager':
                this.createFileManager(container);
                break;
            case 'terminal':
                this.createTerminal(container, windowId);
                break;
            case 'calculator':
                this.createCalculator(container, windowId);
                break;
            case 'editor':
                this.createEditor(container);
                break;
            case 'browser':
                this.createBrowser(container);
                break;
            case 'settings':
                this.createSettings(container);
                break;
            case 'notepad':
                this.createNotepad(container);
                break;
        }
    }

    createFileManager(container) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
                <div class="address-bar">
                    <button style="padding: 6px 10px;">←</button>
                    <button style="padding: 6px 10px;">→</button>
                    <input type="text" placeholder="C:\\PowerOS" style="flex: 1;">
                    <button style="padding: 6px 10px;">↺</button>
                </div>
                <div class="menu-bar">
                    <div class="menu-bar-item">File</div>
                    <div class="menu-bar-item">Edit</div>
                    <div class="menu-bar-item">View</div>
                    <div class="menu-bar-item">Help</div>
                </div>
                <div class="toolbar">
                    <button class="toolbar-btn">📁 New Folder</button>
                    <button class="toolbar-btn">⬆️ Up</button>
                    <button class="toolbar-btn">🔄 Refresh</button>
                    <button class="toolbar-btn">⚙️ Options</button>
                </div>
                <div class="window-grid" style="flex: 1; overflow: auto; padding: 8px;">
                    <div class="file-item"><div class="file-icon">📁</div><div class="file-name">Documents</div></div>
                    <div class="file-item"><div class="file-icon">📁</div><div class="file-name">Pictures</div></div>
                    <div class="file-item"><div class="file-icon">📁</div><div class="file-name">Desktop</div></div>
                    <div class="file-item"><div class="file-icon">📁</div><div class="file-name">Downloads</div></div>
                    <div class="file-item"><div class="file-icon">📄</div><div class="file-name">readme.txt</div></div>
                    <div class="file-item"><div class="file-icon">⚙️</div><div class="file-name">config.json</div></div>
                </div>
            </div>
        `;
    }

    createCalculator(container, windowId) {
        container.innerHTML = `
            <div style="padding: 12px; display: flex; flex-direction: column; gap: 12px;">
                <input type="text" id="calc-display" readonly value="0">
                <div class="calc-grid">
                    <button class="calc-btn" data-action="clear">CE</button>
                    <button class="calc-btn" data-action="delete">⌫</button>
                    <button class="calc-btn" data-action="percent">%</button>
                    <button class="calc-btn operator" data-action="divide">÷</button>
                    
                    <button class="calc-btn" data-num="7">7</button>
                    <button class="calc-btn" data-num="8">8</button>
                    <button class="calc-btn" data-num="9">9</button>
                    <button class="calc-btn operator" data-action="multiply">×</button>
                    
                    <button class="calc-btn" data-num="4">4</button>
                    <button class="calc-btn" data-num="5">5</button>
                    <button class="calc-btn" data-num="6">6</button>
                    <button class="calc-btn operator" data-action="subtract">−</button>
                    
                    <button class="calc-btn" data-num="1">1</button>
                    <button class="calc-btn" data-num="2">2</button>
                    <button class="calc-btn" data-num="3">3</button>
                    <button class="calc-btn operator" data-action="add">+</button>
                    
                    <button class="calc-btn" data-num="0" style="grid-column: span 2;">0</button>
                    <button class="calc-btn" data-action="decimal">.</button>
                    <button class="calc-btn operator" data-action="equals" style="grid-column: span 1;">=</button>
                </div>
            </div>
        `;

        this.setupCalculator(windowId);
    }

    setupCalculator(windowId) {
        const display = document.getElementById('calc-display');
        let current = '0';
        let previous = '';
        let operation = null;

        const updateDisplay = () => {
            display.value = current === '' ? '0' : current;
        };

        document.querySelectorAll(`#content-${windowId} .calc-btn`).forEach(btn => {
            btn.addEventListener('click', () => {
                const num = btn.dataset.num;
                const action = btn.dataset.action;

                if (num) {
                    current = current === '0' ? num : current + num;
                } else if (action === 'clear') {
                    current = '0';
                    previous = '';
                    operation = null;
                } else if (action === 'delete') {
                    current = current.slice(0, -1) || '0';
                } else if (action === 'decimal') {
                    if (!current.includes('.')) current += '.';
                } else if (action === 'equals') {
                    if (operation && previous) {
                        current = String(eval(previous + operation + current));
                        previous = '';
                        operation = null;
                    }
                } else if (['+', '-', '×', '÷'].includes(action) || ['add', 'subtract', 'multiply', 'divide'].includes(action)) {
                    const opMap = { add: '+', subtract: '-', multiply: '*', divide: '/', '×': '*', '÷': '/', '+': '+', '-': '-' };
                    if (operation && previous) {
                        current = String(eval(previous + operation + current));
                    }
                    previous = current;
                    operation = opMap[action] || action;
                    current = '';
                }

                updateDisplay();
            });
        });
    }

    createTerminal(container, windowId) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%; background: #000;">
                <div style="padding: 12px; background: #0a0; color: #000; font-weight: bold; font-size: 14px;">
                    PowerOS Terminal v1.0.0
                </div>
                <div id="terminal-output-${windowId}" style="flex: 1; overflow-y: auto; padding: 16px; background: #000; color: #0a0; font-family: 'Courier New', 'Courier', monospace; font-size: 15px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;"></div>
                <div style="display: flex; gap: 8px; padding: 12px; background: #111; color: #0a0; border-top: 2px solid #0a0;">
                    <span style="font-family: 'Courier New', monospace; font-size: 15px; font-weight: bold;">C:\\PowerOS&gt; </span>
                    <input type="text" id="terminal-input-${windowId}" style="flex: 1; border: none; padding: 4px 8px; background: transparent; color: #0a0; font-family: 'Courier New', monospace; font-size: 15px; outline: none;">
                </div>
            </div>
        `;

        const output = document.getElementById(`terminal-output-${windowId}`);
        const input = document.getElementById(`terminal-input-${windowId}`);

        output.innerHTML = '<span style="color: #0a0;">Microsoft PowerOS System\n(c) 2026 PowerOS Corp. All rights reserved.\n\nType "help" for available commands.\n\n</span>';

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value;
                output.innerHTML += `<span style="color: #0a0;">C:\\PowerOS&gt; ${cmd}\n</span>`;
                const result = this.executeCommand(cmd);
                output.innerHTML += `<span style="color: #0a0;">${result}\n\n</span>`;
                output.scrollTop = output.scrollHeight;
                input.value = '';
            }
        });

        input.focus();
    }

    executeCommand(cmd) {
        const parts = cmd.trim().split(/\s+/);
        const command = parts[0];
        const args = parts.slice(1);

        const commands = {
            help: () => 'ls, cd, pwd, echo, calc, date, sysinfo, clear, help',
            ls: () => 'Documents/  Downloads/  readme.txt  config.json',
            pwd: () => 'C:\\PowerOS',
            echo: () => args.join(' '),
            date: () => new Date().toString(),
            sysinfo: () => 'PowerOS v1.0.0 | Memory: 8GB | CPU: Virtual',
            clear: () => { document.getElementById('terminal-output').innerHTML = ''; return ''; }
        };

        return commands[command] ? commands[command]() : `'${command}' is not recognized`;
    }

    createEditor(container) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
                <div class="toolbar">
                    <button class="toolbar-btn">📄 New</button>
                    <button class="toolbar-btn">📂 Open</button>
                    <button class="toolbar-btn">💾 Save</button>
                    <button class="toolbar-btn">🖨️ Print</button>
                </div>
                <textarea class="text-input" placeholder="Type your document here..."></textarea>
                <div style="padding: 4px; background: #f0f0f0; font-size: 12px; border-top: 1px solid #ddd;">
                    <span>Ln 1, Col 1 | UTF-8 | 0 words | 0 characters</span>
                </div>
            </div>
        `;
    }

    createBrowser(container) {
        const browserHTML = `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="address-bar">
                    <button class="browser-nav-btn" title="Back">←</button>
                    <button class="browser-nav-btn" title="Forward">→</button>
                    <button class="browser-nav-btn" title="Reload">🔄</button>
                    <input type="text" class="browser-url-input" placeholder="https://example.com" value="https://poweros.local">
                    <button class="browser-go-btn">Go</button>
                </div>
                
                <div class="browser-tabs" style="display: flex; gap: 2px; background: #e8e8e8; padding: 4px; border-bottom: 1px solid #ddd; overflow-x: auto;">
                    <div class="browser-tab active" data-page="home">
                        <span>🏠 Home</span>
                        <button class="browser-tab-close">✕</button>
                    </div>
                </div>
                
                <div class="browser-content" style="flex: 1; overflow: auto; background: white;">
                    <div class="browser-page" data-page="home">
                        <h1>Welcome to PowerOS Browser</h1>
                        <h2>Browse the Web</h2>
                        <p>This is a simulated web browser built into PowerOS. Click the links below to explore:</p>
                        <p>
                            <a class="browser-page-link" data-navigate="google">Visit Google</a> | 
                            <a class="browser-page-link" data-navigate="github">Visit GitHub</a> | 
                            <a class="browser-page-link" data-navigate="stackoverflow">Visit Stack Overflow</a> | 
                            <a class="browser-page-link" data-navigate="wikipedia">Visit Wikipedia</a>
                        </p>
                    </div>
                    
                    <div class="browser-page" data-page="google" style="display: none;">
                        <h1>Google</h1>
                        <h2>Search the Web</h2>
                        <p>Google is the world's most popular search engine. It provides instant access to billions of web pages and billions of images.</p>
                        <p><strong>Key Features:</strong></p>
                        <ul style="margin-left: 20px;">
                            <li>Fast and accurate search results</li>
                            <li>Advanced search filters</li>
                            <li>Personalized recommendations</li>
                            <li>Integration with other Google services</li>
                        </ul>
                        <p style="margin-top: 20px;">
                            <a class="browser-page-link" data-navigate="home">Back to Home</a>
                        </p>
                    </div>
                    
                    <div class="browser-page" data-page="github" style="display: none;">
                        <h1>GitHub</h1>
                        <h2>Where the world builds software</h2>
                        <p>GitHub is where over 100 million developers shape the future of software, together. Discover, contribute, and collaborate on open source, business, and private projects.</p>
                        <p><strong>Popular Features:</strong></p>
                        <ul style="margin-left: 20px;">
                            <li>Version control with Git</li>
                            <li>Collaborative development</li>
                            <li>Built-in code review tools</li>
                            <li>CI/CD integration</li>
                            <li>GitHub Actions automation</li>
                        </ul>
                        <p style="margin-top: 20px;">
                            <a class="browser-page-link" data-navigate="home">Back to Home</a>
                        </p>
                    </div>
                    
                    <div class="browser-page" data-page="stackoverflow" style="display: none;">
                        <h1>Stack Overflow</h1>
                        <h2>Q&A for Professional Developers</h2>
                        <p>Stack Overflow is the largest online community for programmers. It's a platform for asking and answering programming questions.</p>
                        <p><strong>Topics Covered:</strong></p>
                        <ul style="margin-left: 20px;">
                            <li>Web development (HTML, CSS, JavaScript)</li>
                            <li>Backend development (Node.js, Python, Java)</li>
                            <li>Mobile development (React Native, Swift)</li>
                            <li>Database design and optimization</li>
                            <li>DevOps and cloud technologies</li>
                        </ul>
                        <p style="margin-top: 20px;">
                            <a class="browser-page-link" data-navigate="home">Back to Home</a>
                        </p>
                    </div>
                    
                    <div class="browser-page" data-page="wikipedia" style="display: none;">
                        <h1>Wikipedia</h1>
                        <h2>The Free Encyclopedia</h2>
                        <p>Wikipedia is a free online encyclopedia, created and written collaboratively by volunteers from all over the world. Anyone can edit almost any article and improve the knowledge base.</p>
                        <p><strong>Statistics:</strong></p>
                        <ul style="margin-left: 20px;">
                            <li>Over 60 million articles</li>
                            <li>Available in over 300 languages</li>
                            <li>Millions of contributors worldwide</li>
                            <li>Completely free to use</li>
                        </ul>
                        <p style="margin-top: 20px;">
                            <a class="browser-page-link" data-navigate="home">Back to Home</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = browserHTML;
        
        // Setup browser functionality
        const urlInput = container.querySelector('.browser-url-input');
        const goBtn = container.querySelector('.browser-go-btn');
        const backBtn = container.querySelector('.browser-nav-btn:nth-child(1)');
        const forwardBtn = container.querySelector('.browser-nav-btn:nth-child(2)');
        const reloadBtn = container.querySelector('.browser-nav-btn:nth-child(3)');
        const browserTabs = container.querySelector('.browser-tabs');
        const browserContent = container.querySelector('.browser-content');
        
        let currentPage = 'home';
        let history = ['home'];
        let historyIndex = 0;
        
        const navigateToPage = (page) => {
            // Hide all pages
            container.querySelectorAll('.browser-page').forEach(p => p.style.display = 'none');
            
            // Show selected page
            const pageEl = container.querySelector(`[data-page="${page}"]`);
            if (pageEl) {
                pageEl.style.display = 'block';
                browserContent.scrollTop = 0;
                currentPage = page;
                
                // Update URL
                const pageUrls = {
                    home: 'https://poweros.local',
                    google: 'https://google.com',
                    github: 'https://github.com',
                    stackoverflow: 'https://stackoverflow.com',
                    wikipedia: 'https://wikipedia.org'
                };
                urlInput.value = pageUrls[page] || 'https://poweros.local';
            }
        };
        
        // Setup page links
        container.querySelectorAll('.browser-page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.navigate;
                if (page) {
                    navigateToPage(page);
                    
                    // Add to history
                    history = history.slice(0, historyIndex + 1);
                    history.push(page);
                    historyIndex = history.length - 1;
                }
            });
        });
        
        goBtn.addEventListener('click', () => {
            const url = urlInput.value.toLowerCase();
            let page = 'home';
            
            if (url.includes('google')) page = 'google';
            else if (url.includes('github')) page = 'github';
            else if (url.includes('stackoverflow')) page = 'stackoverflow';
            else if (url.includes('wikipedia')) page = 'wikipedia';
            
            navigateToPage(page);
            history = history.slice(0, historyIndex + 1);
            history.push(page);
            historyIndex = history.length - 1;
        });
        
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') goBtn.click();
        });
        
        backBtn.addEventListener('click', () => {
            if (historyIndex > 0) {
                historyIndex--;
                navigateToPage(history[historyIndex]);
            }
        });
        
        forwardBtn.addEventListener('click', () => {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                navigateToPage(history[historyIndex]);
            }
        });
        
        reloadBtn.addEventListener('click', () => {
            navigateToPage(currentPage);
        });
    }

    createSettings(container) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%; gap: 16px; padding: 16px; overflow-y: auto;">
                <div>
                    <h3 style="margin-bottom: 8px;">Display</h3>
                    <div style="margin: 8px 0;">
                        <label>Resolution: <select><option>1920x1080</option><option>1280x720</option></select></label>
                    </div>
                    <div style="margin: 8px 0;">
                        <label>Brightness: <input type="range" min="0" max="100" value="100"></label>
                    </div>
                </div>
                
                <div>
                    <h3 style="margin-bottom: 8px;">Sound</h3>
                    <div style="margin: 8px 0;">
                        <label>Volume: <input type="range" min="0" max="100" value="70"></label>
                    </div>
                </div>
                
                <div>
                    <h3 style="margin-bottom: 8px;">System Information</h3>
                    <div style="font-size: 13px; color: #666;">
                        <p>OS: PowerOS v1.0.0</p>
                        <p>Memory: 8192 MB</p>
                        <p>CPU: Virtual Processor</p>
                        <p>Resolution: 1920x1080</p>
                    </div>
                </div>
                
                <button class="btn btn-primary" style="margin-top: auto;">Apply Changes</button>
            </div>
        `;
    }

    createNotepad(container) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%; gap: 8px;">
                <div class="toolbar">
                    <button class="toolbar-btn">File</button>
                    <button class="toolbar-btn">Edit</button>
                    <button class="toolbar-btn">Format</button>
                    <button class="toolbar-btn">View</button>
                </div>
                <textarea class="text-input" placeholder="Untitled - Notepad"></textarea>
            </div>
        `;
    }

    updateTaskbar() {
        const taskbar = document.getElementById('taskbar-apps');
        taskbar.innerHTML = '';

        Object.values(this.windowMgr.windows).forEach(winData => {
            const app = this.apps[winData.app];
            if (!app) return;

            const btn = document.createElement('button');
            btn.className = 'task-item' + (winData.id === this.windowMgr.activeWindow && !winData.minimized ? ' active' : '');
            btn.textContent = app.icon + ' ' + app.name;

            btn.addEventListener('click', () => {
                if (winData.minimized) {
                    this.windowMgr.restoreWindow(winData.id);
                } else if (winData.id === this.windowMgr.activeWindow) {
                    this.windowMgr.minimizeWindow(winData.id);
                } else {
                    this.windowMgr.setActive(winData.id);
                }
                this.updateTaskbar();
            });

            taskbar.appendChild(btn);
        });
    }

    updateClock() {
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        document.getElementById('clock').textContent = time;
    }

    shutdown() {
        this.notifications.show('PowerOS shutting down...', 'info');
        setTimeout(() => {
            document.body.innerHTML = '<div style="width: 100%; height: 100%; background: black; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">PowerOS Shutting Down...</div>';
        }, 2000);
    }
}

// Initialize OS
window.addEventListener('DOMContentLoaded', () => {
    window.os = new AdvancedOS();
});
