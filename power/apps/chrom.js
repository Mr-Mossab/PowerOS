// PowerOS Browser Application

class BrowserApp {
    constructor() {
        this.history = [];
        this.currentUrl = 'about:home';
    }

    navigate(url) {
        // Simple URL normalization
        if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('about:')) {
            url = 'https://' + url;
        }
        this.currentUrl = url;
        this.history.push(url);
        return this.getPage(url);
    }

    getPage(url) {
        const pages = {
            'about:home': `
                <h1>PowerOS Browser</h1>
                <p>Welcome to the PowerOS browser. This is a simulated web experience.</p>
                <p>Try typing a URL in the address bar.</p>
            `,
            'about:blank': '',
            'https://google.com': `
                <h1>Google Search</h1>
                <input type="text" placeholder="Search the web...">
            `,
            'https://github.com': `
                <h1>GitHub</h1>
                <p>Build software better, together</p>
                <p>Welcome to GitHub, where the world builds software.</p>
            `,
            'https://wikipedia.org': `
                <h1>Wikipedia</h1>
                <p>The Free Encyclopedia</p>
                <p>Wikipedia is a free online encyclopedia, created and edited by volunteers around the world.</p>
            `
        };
        return pages[url] || `<h1>Page Not Found</h1><p>Could not load: ${url}</p>`;
    }

    goBack() {
        if (this.history.length > 1) {
            this.history.pop();
            this.currentUrl = this.history[this.history.length - 1];
            return this.getPage(this.currentUrl);
        }
    }

    reload() {
        return this.getPage(this.currentUrl);
    }
}

module.exports = BrowserApp;