# CCNA Roadmap Webapp

A comprehensive web application designed to assist students and professionals in their preparation for the Cisco Certified Network Associate (CCNA) certification.

## Features

- **Interactive Roadmap**: A guided path to mastering CCNA topics.
- **Networking Glossary**: Common networking terms and definitions (e.g., ACL, DHCP, OSPF).
- **Command Cheatsheet**: Quick reference for essential Cisco IOS commands (Basic Config, Interface Config, VLANs, etc.).
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly interface.
- **Dark Mode**: Toggle between light and dark themes for comfortable reading.

## Tech Stack

- **HTML5**
- **Tailwind CSS** (via CDN)
- **React 18** (via CDN)
- **Babel Standalone** (for in-browser JSX compilation)
- **Lucide React** (for icons)

## How to Run

Because this project uses ES Modules (in `js/app.js`), browsers will block cross-origin requests if you try to open the `index.html` file directly from your file system (using the `file://` protocol).

**You must use a local development server.**

### Using VS Code (Recommended)
1. Install the **Live Server** extension by Ritwick Dey.
2. Right-click on `index.html` in the file explorer.
3. Select **"Open with Live Server"**.

### Using Python
If you have Python installed, you can run a simple HTTP server:

```bash
# Python 3
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.