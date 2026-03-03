# PowerOS v1.0.0

A complete, feature-rich operating system built entirely in JavaScript with a custom kernel, modern FUI (Front-end User Interface), command-line shell, and multiple built-in applications.

## Features

### 🔧 Core System
- **Custom Kernel**: Full kernel implementation with process management, virtual filesystem, device drivers, and event bus
- **System API**: Complete bridge for applications to access kernel services
- **Process Manager**: Process spawning, termination, and monitoring
- **Virtual Filesystem**: In-memory filesystem with support for files and directories

### 🖥️ User Interface
- **Modern FUI**: Windows-style desktop environment with:
  - Drag-and-drop window management
  - Start menu with application launcher
  - Taskbar with running applications
  - System tray with clock
  - Window controls (minimize, maximize, close)

### ⌨️ Shell & CLI
- **Full Command Shell** with built-in commands:
  - File operations: `ls`, `cd`, `mkdir`, `cat`
  - Process management: `ps`, `kill`, `run`
  - System info: `sysinfo`, `help`
  - Calculator: `calc`
  - And more!

### 📦 Built-in Applications
1. **File Manager** (📁)
   - Navigate directory structure
   - View files and folders
   - File operations

2. **Text Editor** (📝)
   - Create and edit text files
   - Save/open functionality
   - Basic formatting

3. **Calculator** (🧮)
   - Full calculator with operations
   - Support for decimal numbers
   - Clear and delete functions

4. **Browser** (🌐)
   - Simulated web browsing
   - URL navigation
   - Mock web pages

5. **Terminal** (⌨️)
   - In-window command interface
   - Execute shell commands
   - Command history

6. **Settings** (⚙️)
   - Display configuration
   - Audio settings
   - Network information
   - System information

## Project Structure

```
PowerOS/
├── kernel/
│   ├── kernel.js          # Core kernel with process/file/device management
│   └── systemapi.js       # System API for application access
├── fui/                   # Front-end User Interface
│   ├── index.html         # Main GUI page
│   ├── desktop.js         # Desktop manager & window system
│   ├── style.css          # Complete styling
│   ├── ui.js              # Alternative UI file
│   └── windowmanager.js   # Window management system
├── shell/
│   └── shell.js           # Full command-line shell
├── apps/                  # Built-in applications
│   ├── calc.js            # Calculator app
│   ├── chrom.js           # Browser app
│   ├── editor.js          # Text editor app
│   ├── filemanager.js     # File manager app
│   ├── terminal.js        # Terminal app
│   └── settings.js        # Settings app
├── boot/
│   └── start.js           # Boot loader & system startup
├── server.js              # HTTP server for FUI
├── package.json           # Project metadata
└── README.md              # This file
```

## Getting Started

### Running the CLI Shell

```bash
npm install
npm start
```

This will boot PowerOS and drop you into the command-line shell. Try these commands:
- `help` - Show available commands
- `sysinfo` - Display system information
- `ls` - List files
- `echo "Hello PowerOS"` - Print text
- `run calculator` - Launch an app from CLI
- `ps` - List running processes

### Running the GUI

**Option 1: Use the included HTTP server**

```bash
node server.js
```

Then open your browser to: `http://localhost:3000`

**Option 2: Open directly in browser**

Open the file `fui/index.html` directly in your web browser (may have limitations depending on browser security).

## Usage Guide

### GUI Navigation

1. **Start Menu**: Click the "🔵 PowerOS" button in the taskbar
2. **Launch Apps**: Click any application in the start menu
3. **Manage Windows**: Use minimize/maximize/close buttons
4. **Drag Windows**: Click and drag the titlebar to move windows
5. **Switch Apps**: Click app buttons in the taskbar
6. **Close**: Click the X button or shutdown from start menu

### Shell Commands

```bash
# Navigation
ls [path]              # List directory contents
cd <path>              # Change directory
pwd                    # Print working directory
mkdir <path>           # Create directory

# Files
cat <file>             # Display file contents
echo <text>            # Print text

# Process management
run <app>              # Run application
ps                     # List processes
kill <pid>             # Terminate process

# System
sysinfo                # System information
help                   # Show help
calc <expression>      # Simple calculator
exit                   # Exit shell
```

## Application Details

### Calculator
- Full arithmetic operations (+, -, ×, ÷)
- Decimal support
- Clear and delete functions

### Terminal
- In-GUI command execution
- Multiple available commands
- Real-time output

### File Manager
- View directory structure
- File listing with icons
- Drag-and-drop ready (in FUI)

### Text Editor
- Create new files
- Edit existing files
- Save/open functionality

### Browser
- Navigate to URLs
- Mock web pages
- Back/refresh navigation

### Settings
- Display options (resolution, brightness, theme)
- Audio configuration (volume, on/off)
- Network settings (hostname, IP)
- System information view

## System Specifications

- **Architecture**: JavaScript/Node.js
- **Memory**: 8192 MB (virtual)
- **CPU**: Virtual multi-core
- **Resolution**: 1920x1080 (FUI)
- **Kernel**: Custom PowerOS Kernel v1.0.0
- **License**: MIT

## Development

### Adding New Apps

1. Create a new file in `apps/` directory
2. Export an app class with appropriate methods
3. Update the `desktop.js` apps registry
4. Add UI content method to DesktopManager
5. Add app to start menu in `index.html`

### Extending the Kernel

The kernel is modular and can be extended:
- Add new modules to `ProcessManager`
- Expand `VirtualFilesystem` with more operations
- Add devices to `DeviceManager`
- Create custom System API methods

### Custom Shell Commands

Edit `shell/shell.js` and add methods to the `builtins` object:

```javascript
cmd_mycmd(args) {
    console.log('My custom command:', args.join(' '));
}
```

## Future Enhancements

Possible additions:
- Multi-user support with authentication
- Persistent filesystem with local storage
- Network simulation/APIs
- Graphics/drawing applications
- Game applications
- Plugin/extension system
- Virtual memory simulation
- Advanced shell scripting
- Package manager
- System themes

## Technical Notes

- **No external dependencies**: Uses only Node.js built-ins for the kernel and shell
- **Browser-based FUI**: Pure HTML5, CSS3, and JavaScript
- **Modular design**: Each component is self-contained and testable
- **Extensible**: Easy to add new apps, commands, and kernel features
- **Educational**: Great for learning OS concepts and JavaScript architecture

## Browser Compatibility

The FUI works best in modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Troubleshooting

**Shell won't start?**
- Ensure Node.js 12+ is installed
- Run `npm install` first

**FUI not loading?**
- Use `node server.js` for proper HTTP serving
- Check browser console for errors
- Ensure all CSS and JS files are in the fui/ directory

**Apps not working in CLI?**
- Use the `run <app>` command to spawn processes
- Check `ps` to see running processes
- Use `kill <pid>` to terminate apps

## License

MIT License - Feel free to use, modify, and distribute

---

**PowerOS v1.0.0** - Built with ❤️ in JavaScript