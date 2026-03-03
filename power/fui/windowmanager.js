// PowerOS Window Manager

class Window {
    constructor(id, title, x, y, width, height) {
        this.id = id;
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.minimized = false;
        this.maximized = false;
        this.focused = false;
        this.app = null;
        this.content = '';
    }

    setContent(html) {
        this.content = html;
    }

    minimize() {
        this.minimized = true;
    }

    maximize() {
        this.maximized = true;
    }

    restore() {
        this.minimized = false;
        this.maximized = false;
    }

    focus() {
        this.focused = true;
    }

    unfocus() {
        this.focused = false;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }
}

class WindowManager {
    constructor() {
        this.windows = {};
        this.windowCounter = 1;
        this.activeWindow = null;
        this.zIndex = 1;
    }

    createWindow(title, x = 100, y = 100, width = 600, height = 400) {
        const id = `window-${this.windowCounter++}`;
        const win = new Window(id, title, x, y, width, height);
        this.windows[id] = win;
        this.setActive(id);
        return id;
    }

    closeWindow(id) {
        if (this.windows[id]) {
            delete this.windows[id];
            if (this.activeWindow === id) {
                this.activeWindow = null;
            }
        }
    }

    setActive(id) {
        if (this.activeWindow && this.windows[this.activeWindow]) {
            this.windows[this.activeWindow].unfocus();
        }
        if (this.windows[id]) {
            this.windows[id].focus();
            this.activeWindow = id;
        }
    }

    getWindow(id) {
        return this.windows[id];
    }

    listWindows() {
        return Object.values(this.windows);
    }

    minimizeWindow(id) {
        const win = this.windows[id];
        if (win) win.minimize();
    }

    maximizeWindow(id) {
        const win = this.windows[id];
        if (win) win.maximize();
    }

    restoreWindow(id) {
        const win = this.windows[id];
        if (win) win.restore();
    }
}

module.exports = WindowManager;
