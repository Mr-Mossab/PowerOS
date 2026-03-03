// PowerOS File Manager Application

class FileManagerApp {
    constructor() {
        this.currentPath = '/';
        this.files = {
            '/': { type: 'dir', name: '/', items: ['home', 'bin', 'etc', 'tmp', 'readme.txt', 'config.json'] },
            '/home': { type: 'dir', name: 'home', items: ['Documents', 'Downloads', 'Pictures'] },
            '/bin': { type: 'dir', name: 'bin', items: ['calc.js', 'chrom.js', 'editor.js'] },
            '/etc': { type: 'dir', name: 'etc', items: ['system.conf', 'users.conf'] },
            '/tmp': { type: 'dir', name: 'tmp', items: [] }
        };
    }

    navigate(path) {
        if (this.files[path]) {
            this.currentPath = path;
            return this.files[path];
        }
        return null;
    }

    getCurrentPath() {
        return this.currentPath;
    }

    listDirectory(path) {
        const dir = this.files[path];
        return dir ? dir.items : [];
    }

    getFileInfo(path) {
        return this.files[path] || null;
    }

    createFile(path, filename) {
        const dirPath = path.endsWith('/') ? path.slice(0, -1) : path;
        if (this.files[dirPath]) {
            this.files[dirPath].items.push(filename);
            return true;
        }
        return false;
    }

    deleteFile(path, filename) {
        const dirPath = path.endsWith('/') ? path.slice(0, -1) : path;
        if (this.files[dirPath]) {
            const idx = this.files[dirPath].items.indexOf(filename);
            if (idx !== -1) {
                this.files[dirPath].items.splice(idx, 1);
                return true;
            }
        }
        return false;
    }
}

module.exports = FileManagerApp;
