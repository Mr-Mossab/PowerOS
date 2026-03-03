// PowerOS Text Editor Application

class TextEditorApp {
    constructor() {
        this.content = '';
        this.currentFile = 'untitled.txt';
        this.saved = true;
    }

    newFile() {
        this.content = '';
        this.currentFile = 'untitled.txt';
        this.saved = true;
        return this.content;
    }

    openFile(filename, content) {
        this.content = content || '';
        this.currentFile = filename;
        this.saved = true;
        return this.content;
    }

    saveFile(filename = null) {
        if (filename) {
            this.currentFile = filename;
        }
        this.saved = true;
        return { filename: this.currentFile, content: this.content };
    }

    setText(text) {
        this.content = text;
        this.saved = false;
    }

    getText() {
        return this.content;
    }
}

module.exports = TextEditorApp;
