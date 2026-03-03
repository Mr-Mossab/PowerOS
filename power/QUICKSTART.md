#!/usr/bin/env node

/**
 * PowerOS Quick Start Guide
 * 
 * This file serves as a reference for running PowerOS
 * Run: node quickstart.js
 */

console.log(`
╔══════════════════════════════════════════════════════╗
║                   PowerOS v1.0.0                     ║
║        Quick Start & Usage Guide                     ║
╚══════════════════════════════════════════════════════╝

🚀 GETTING STARTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Option 1: Run the CLI Shell (Text-based)
  $ npm install
  $ npm start
  
  This starts the PowerOS shell. Try these commands:
  - help
  - sysinfo
  - ls
  - echo "Hello PowerOS"
  - run calculator

Option 2: Run the GUI Server (Web-based)
  $ node server.js
  
  Then open: http://localhost:3000 in your browser


📱 GUI APPLICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Accessed through Start Menu (🔵 PowerOS):

  📁 File Manager
     - Browse filesystem
     - View directory structure
     - File operations

  📝 Text Editor
     - Create/edit files
     - Save and open functionality
     - Basic text formatting

  🧮 Calculator
     - Arithmetic operations (+, -, ×, ÷)
     - Decimal support
     - Clear/delete functions

  🌐 Browser
     - Navigate URLs
     - Mock web pages
     - Back/refresh navigation

  ⌨️  Terminal
     - In-GUI command execution
     - Multiple shell commands
     - Live command output

  ⚙️  Settings
     - Display configuration
     - Audio settings
     - Network information
     - System details


⌨️  TERMINAL COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File Operations:
  ls [path]           List directory contents
  cd <path>           Change directory
  pwd                 Print working directory
  mkdir <path>        Create directory
  cat <file>          Display file contents

Application Control:
  run <app>           Launch application
    Examples: run calculator, run filemanager, run editor
  ps                  List running processes
  kill <pid>          Terminate process

System Info:
  sysinfo             Display system information
  calc <expr>         Calculator (e.g., calc 2 + 2)

Utilities:
  echo <text>         Print text
  help                Show all commands
  exit                Exit shell


🖱️  GUI CONTROLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Window Management:
  Click & Drag        Move window (grab title bar)
  Minimize Button (−) Minimize window
  Maximize Button (□) Maximize/restore window  
  Close Button (✕)    Close application

Start Menu:
  Click "🔵 PowerOS"  Open start menu
  Click App Name      Launch application
  Click Shutdown      (System shutdown simulation)

Taskbar:
  Click App Button    Switch to app / minimize
  System Tray         Shows current time


📂 PROJECT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

power/
├── kernel/              # Core OS kernel
│   ├── kernel.js       # Main kernel (VirtualFilesystem, ProcessManager, etc.)
│   └── systemapi.js    # System API for apps
│
├── fui/                 # Graphical User Interface
│   ├── index.html      # Main desktop GUI
│   ├── desktop.js      # Desktop manager (main logic)
│   ├── style.css       # Styling (Windows-style)
│   ├── welcome.html    # Welcome/info page
│   └── windowmanager.js # Window management
│
├── shell/               # Command-line Interface
│   └── shell.js        # Shell implementation
│
├── apps/                # Built-in Applications
│   ├── calc.js         # Calculator
│   ├── chrom.js        # Browser
│   ├── editor.js       # Text editor
│   ├── filemanager.js  # File manager
│   ├── terminal.js     # Terminal
│   └── settings.js     # Settings
│
├── boot/                # System Boot
│   └── start.js        # Boot loader
│
├── server.js            # HTTP server for GUI
├── package.json         # Project config
├── README.md            # Full documentation
└── PROJECT_FILES.md     # File descriptions


🎮 EXAMPLE WORKFLOWS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Workflow 1: CLI Calculation
  $ npm start
  PowerOS> calc 15 * 8
  120
  PowerOS> exit

Workflow 2: Launch GUI Application from Shell
  $ npm start
  PowerOS> run calculator
  Started process: calculator (PID: 1000)

Workflow 3: File Operations
  PowerOS> ls /
  home/  bin/  etc/  tmp/  readme.txt  config.json
  
  PowerOS> cd /home
  PowerOS> pwd
  /home
  
  PowerOS> mkdir myfiles
  Directory created: myfiles

Workflow 4: GUI App Usage
  1. Run: node server.js
  2. Open: http://localhost:3000
  3. Click: 🔵 PowerOS (start menu)
  4. Select: 📝 Text Editor
  5. Type: Your content
  6. Click: Save button


🔧 SYSTEM SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Architecture: JavaScript/Node.js
  OS Version: PowerOS v1.0.0
  Kernel Version: Custom v1.0.0
  Memory: 8192 MB (virtual)
  CPU: Virtual multi-core
  Resolution: 1920x1080 (FUI)
  File System: Virtual (in-memory)
  Shell: PowerOS Shell v1.0.0
  
  Built-in Apps: 6 (Calculator, Browser, Editor, File Manager, Terminal, Settings)
  Shell Commands: 13 available


⚙️  CUSTOMIZATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add New Shell Command:
  Edit: shell/shell.js
  Add method: cmd_mycommand(args) { ... }
  Add to builtins: 'mycommand': this.cmd_mycommand.bind(this),

Add New GUI App:
  1. Create: apps/myapp.js
  2. Edit: fui/index.html and desktop.js
  3. Add app to apps registry
  4. Create content method in DesktopManager

Customize Look:
  Edit: fui/style.css
  Modify colors, fonts, spacing


📚 RESOURCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Full Documentation:     README.md
  File Descriptions:      PROJECT_FILES.md
  Kernel Code:            kernel/kernel.js
  FUI Code:               fui/desktop.js
  Shell Code:             shell/shell.js


❓ TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Shell won't start:
  ✓ Check Node.js is installed (v12+)
  ✓ Run: npm install
  ✓ Then: npm start

GUI not loading:
  ✓ Use: node server.js
  ✓ Open: http://localhost:3000
  ✓ Check browser console for errors

Apps not responding:
  ✓ Check taskbar for process
  ✓ Try launching from start menu again
  ✓ Click window to focus it


🎉 YOU'RE ALL SET!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Choose your starting method:

  For CLI:  npm start
  For GUI:  node server.js

Enjoy PowerOS! 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PowerOS v1.0.0 • Built with JavaScript • MIT License
`);
