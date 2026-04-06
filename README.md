# Mono — Portfolio
>
> One problem at a time.

A minimalist, data-driven portfolio designed for speed and simplicity. This project uses a "Headless HTML" approach where all content is managed via a single JavaScript object, separating your data from your markup.

## 🛠 Tech Stack

* **Structure:** Vanilla HTML5
* **Design:** CSS3 (Custom Properties & Grid)
* **Engine:** Vanilla JavaScript (ES6)
* **Typography:** DM Serif Display, Outfit, DM Mono

## 📁 Project Structure

```text
├── index.html        # The skeleton (structure only)
├── css/
│   └── style.css     # Design system, themes, and animations
├── js/
│   ├── data.js       # THE CONTENT (Edit this file to update the site)
│   ├── render.js     # The Engine (Maps data.js to the DOM)
│   ├── main.js       # UI Logic (Theme toggle, Nav, Observers)
│   └── particles.js  # Hero background word-merge logic
└── assets/           # PDF Resume and static media
```

## 🚀 Quick Start

1. **Clone** the repository.
2. **Open** `js/data.js` and update the `DATA` object with your own information.
3. **Launch** `index.html` using a local server (like VS Code Live Server) to see your changes.

## ⚙️ How to Update

You do not need to edit `index.html` to change your bio, projects, or links. All updates happen in `js/data.js`:

```javascript
// Example: Adding a project
projects: [
  {
    title: 'New Project',
    description: 'A brief overview...',
    tags: ['web', 'ai'],
    stack: ['React', 'Node.js'],
    liveUrl: 'https://...',
    repoUrl: 'https://...',
    featured: true,
  }
]
```

## 📝 License

Personal Use. Feel free to fork and adapt for your own portfolio.
