
export const featuresMd = `# 🚀 SYNAPSE – Feature Overview

SYNAPSE is a real-time collaboration platform designed for developers to code, organize tasks, and share files together inside secure collaborative rooms.

---

# 1. Real-Time Room System

### What it does

* **Instant Workspaces** – Create or join rooms instantly using a room name and password. No account required.
* **Host Authority** – The room creator becomes the Host and can manage users, change passwords, and control encryption.
* **Live Presence** – Displays all active users currently in the room.

### How it works

* **Socket.io** manages real-time communication between users.
* The server maintains a **Map of room states** including users, tasks, and settings.
* When a user joins, the server sends the current room state (\`auth:success\` event).
* Updates are synchronized through events like \`users:sync\`.
* Room state is stored in a local JSON database (\`synapse.db.json\`) to survive server restarts.

---

# 2. Collaborative Code Editor

### What it does

* **Multi-User Editing** – Multiple developers can edit files simultaneously.
* **File Management** – Create, rename, delete files and folders.
* **Syntax Highlighting** – Supports JavaScript, TypeScript, Python, HTML, CSS, JSON, and Markdown.
* **Project Download** – Entire project can be downloaded as a \`.zip\`.

### How it works

* **Yjs CRDTs** ensure conflict-free real-time collaboration.
* **Monaco Editor** powers the code editing interface (same engine as VS Code).
* A dedicated **WebSocket server (\`/yjs\`)** handles document updates.
* Files are synced and saved to disk in \`projects/{roomName}/\`.

---

# 3. Kanban Task Board

### What it does

* Drag-and-drop task board with columns:

  * **To Do**
  * **In Progress**
  * **Done**
* Tasks can be marked with **Low, Medium, or High priority**.
* Quick entry field allows rapid task creation.

### How it works

* The board state is stored as an array of \`Task\` objects.
* When a task changes, the client sends a \`task:update\` event.
* The server broadcasts the updated list via \`task:sync\`.
* Uses the **HTML5 Drag & Drop API** for interaction.

---

# 4. Secure File Sharing

### What it does

* **Encrypted File Uploads** – Files are encrypted before leaving the browser.
* **Drag & Drop Uploads** for quick sharing.
* **AI Analysis** for text files.

### How it works

* Uses the **Web Crypto API** (\`AES-GCM\`) for client-side encryption.
* Files are uploaded via \`XMLHttpRequest\` to the \`/upload\` endpoint.
* The server stores **encrypted blobs** in an \`uploads/\` directory.
* Files are decrypted locally in the browser when downloaded.

---

# 5. Snippet Vault

### What it does

* Store reusable **code snippets, configs, and notes**.
* Organize snippets with tags and sections.
* AI tools can categorize snippets or detect bugs.

### How it works

* Snippets sync using socket events (\`snippet:update\`).
* Optional **client-side encryption** for snippet content.
* **Gemini AI API** can analyze and categorize snippets.

---

# 6. Peer-to-Peer Directory Relay

### What it does

* Share a folder directly from your local computer.
* Files remain on the host machine — no permanent cloud storage.
* Other users can access files on demand.

### How it works

1. A requester asks the server for a file.
2. The server requests it from the host client via Socket.io.
3. The host streams the file to the server.
4. The server forwards the stream to the requester.

Uses the **File System Access API** (\`showDirectoryPicker()\`).

---

# 7. Encryption Toggle

### What it does

* Host can switch between **Security Mode** and **Performance Mode**.

**Encryption ON**

* Files, snippets, and messages are encrypted.
* Higher security.

**Encryption OFF**

* Plaintext transfers.
* Faster performance.

### How it works

* The server stores \`encryptionEnabled\` in room state.
* The client checks this flag before sending data.
* Encrypted items remain readable even if encryption is later disabled.

---

# 8. Pressure Meter & Timer

### What it does

* Shared countdown timer for deadlines.
* Visual pressure indicator showing progress vs time remaining.

### How it works

Each client calculates a **Pressure Score**:

Pressure Score =
(Time Elapsed % × 0.5) + (Unfinished Tasks % × 0.5)

The host can update timer values which are broadcast to all users.

---

# 9. Admin Dashboard

### What it does

* Monitor server uptime, CPU usage, memory usage.
* Track active rooms and users.
* Force delete rooms or inspect metadata.

### How it works

* **JWT authentication** protects admin routes.
* Admin logs in through \`/api/admin/login\`.
* Protected APIs like \`/api/stats\` require a valid token.
* Server metrics are gathered using Node.js \`os\` and \`process\` modules.

---

# 🧠 Summary

SYNAPSE combines:

* Real-time collaboration
* Live coding environments
* Secure encrypted file sharing
* Task management
* Peer-to-peer file relay
* AI-assisted development tools

All inside a single collaborative workspace.

`;
export const manualMd = `# 📘 Synapse User Manual

## Table of Contents

1. Introduction
2. Getting Started
3. Interface Overview
4. Core Features
5. Host Controls & Settings
6. Advanced Features
7. Troubleshooting

---

# 1. Introduction

**Synapse** is a real-time collaboration platform designed for developers, hackathon teams, and rapid prototyping.

It combines:

* Task management
* Collaborative coding
* Secure file sharing
* Live communication
* AI-powered tools

All inside a **single real-time workspace**.

---

# 2. Getting Started

## Creating a Room

1. Open Synapse in your browser.
2. Enter a **Username**.
3. Enter a **Room Name**.
4. Create a **Room Password**.
5. Click **Initialize Protocol / Join**.

If the room does not exist, you automatically become the **Host**.

---

## Joining a Room

1. Enter your **Username**.
2. Enter the **Room Name**.
3. Enter the **Room Password**.
4. Click **Join**.

You will join the workspace as a **Member**.

---

# 3. Interface Overview

### Top Bar

Displays:

* Room name
* User status
* Connection status
* Timer
* Theme toggle

### Main Workspace

The central working area where you switch between tools.

### Bottom Navigation

A dock-like navigation bar for switching between tools.

### Right Sidebar

Displays:

* Pressure Meter
* Chat
* Room diagnostics

---

# 4. Core Features

## Kanban Board (Task Management)

Track project progress using task cards.

### Add Task

Type in the task input bar and press **Enter**.

### Set Priority

Choose:

* Low
* Medium
* High

### Move Task

Drag tasks between:

* **To Do**
* **In Progress**
* **Done**

### Delete Task

Click **X** on a task card.

---

## Collaborative Code Editor

Edit code in real time with your team.

### File Management

* Create files or folders
* Rename items
* Delete items

### Editing

Click a file to open it.

Multiple users can **type simultaneously**.

### Save

Files are **auto-saved**.

Manual save shortcut:

\`\`\`
Ctrl + S
\`\`\`

### Download Project

Click **Download ZIP** to export the entire project.

---

## Snippet Vault

Store reusable code blocks.

### Create Snippet

1. Click **New Snippet**
2. Enter title
3. Select language
4. Paste code

### AI Analyze

Click the **✨ Sparkle icon** to analyze the snippet using AI.

### Copy

Click **Copy** to copy code to clipboard.

---

## File Browser

Secure file sharing inside the room.

### Upload

Drag and drop files or click to select.

### Download

Click the download icon.

### Delete

Host can delete files using the trash icon.

### Encryption

If enabled by the Host:

* Files are encrypted **before upload**
* Server never sees the plaintext file

---

## Directory Sharing (Live Sync)

Share folders directly from your computer.

### Share Folder

Click **Share Live Directory** and select a folder.

### Access

Other users can open files directly from your computer.

[don't share directories with huge structure might end up crashing the browser since there is no upper limit for uploads]

### Stop Sharing

Click **Clear All Shared**.

---

## Chat & Communication

### Send Message

Type in the chat box and press **Enter**.

### Encryption

Messages are encrypted when **Encryption Mode** is enabled.

---

# 5. Host Controls & Settings

Open **Settings (⚙ Gear icon)**.

---

## Managing Users

### Kick User

1. Open **Active Units**
2. Hover on user
3. Click **KICK**

---

## Room Security (Encryption)

### Update Password

Change the room password at any time.

Existing users stay connected.

### Encryption Mode

**ENABLED (Default)**

* Chat encrypted
* Snippets encrypted
* Files encrypted

Higher security but slower.

**DISABLED**

* Plain text transfer
* Faster file sharing

---

## Timer & Pressure Meter

### Set Timer

Configure:

* Start Time
* End Time

### Pressure Meter

Shows project progress.

| Color  | Meaning           |
| ------ | ----------------- |
| Green  | Healthy progress  |
| Yellow | Falling behind    |
| Red    | Critical pressure |

---

# 6. Advanced Features

## AI Integration (Gemini)

### Setup

1. Open **Settings**
2. Go to **AI Configuration**
3. Enter your **Gemini API Key**

### Usage

**Snippets**

Click **Sparkle icon** to analyze code.

**Files**

Click **Analyze** to summarize text files.

---

## Admin Dashboard

Used by the **server administrator**.

### Access

Navigate to:

\`\`\`
/admin
\`\`\`

### Features

* View CPU and memory usage
* Monitor active rooms
* Force delete rooms

---

# 7. Troubleshooting

### Connection Lost

Check internet connection. Synapse will try to reconnect automatically.

---

### Decryption Failed

Usually happens if the **Room Password changed**.

Solution:

* Refresh the page
* Rejoin using the new password

---

### File Upload Failed

Large files may take time to upload and download on slow connections.

Possible solutions:

* Disable encryption
* Upload smaller files

---

### Directory Sharing Not Working

Requirements:

* Chrome or Edge browser
* Desktop device (not mobile)
* Folder permissions granted
`;
export const readmeMd = `<div align="center">

# ⚡ SYNAPSE

### Real-Time Collaboration Platform for Developers

[![TypeScript](https://img.shields.io/badge/TypeScript-82.9%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/Darshan2303/SYNAPSE?style=flat-square&color=yellow)](https://github.com/Darshan2303/SYNAPSE/stargazers)

**A single collaborative workspace for teams to code, manage tasks, share files, and ship faster — all on your local network.**

[Features](#-features) · [Quick Start](#-quick-start) · [Architecture](#️-architecture) · [Tech Stack](#-tech-stack) · [Docs](#-documentation)

---

</div>

## 🧠 What is Synapse?

Synapse is a **self-hosted, LAN-first developer collaboration platform** that combines everything your team needs into one unified workspace — without the overhead of cloud subscriptions, account creation, or internet dependency.

Designed for **hackathons**, **team sprints**, and **rapid prototyping**, Synapse runs entirely on your local network and is accessible from any device [except mobiles ,mobile needs to be connected via ip address] via \`synapse.local:4000\`.

> No cloud. No accounts. No latency. Just your team and your code.

---

## ✨ Features

### 🧑‍💻 Collaborative Code Editor
Multi-user live coding powered by **Monaco Editor** (the same engine behind VS Code) and **Yjs CRDTs** for conflict-free real-time sync. Create, rename, and delete files and folders. Download the entire project as a \`.zip\` at any time. Supports JavaScript, TypeScript, Python, HTML, CSS, JSON, and Markdown.

### 📋 Kanban Task Board
Drag-and-drop task management with **To Do / In Progress / Done** columns and **Low / Medium / High** priority labels. Tasks sync in real time across all users in the room via Socket.IO events.

### 📁 Encrypted File Sharing
Files are encrypted **in the browser** using the **Web Crypto API (AES-GCM)** before they ever leave your machine. Upload via drag & drop, download with one click, and optionally run AI analysis on text files — all without touching plaintext on the wire.

### 🗂️ Peer-to-Peer Directory Relay
Share a local folder directly with your team using the **File System Access API**. Files stay on the host machine — no permanent server storage. Other users request files on demand; the server acts as a relay, not a repository.

### 🧩 Snippet Vault
Store reusable code snippets, configs, and notes with tag-based organization. Snippets support optional client-side encryption and Gemini AI integration for categorization and bug detection.

### 💬 Real-Time Chat
Built-in messaging inside every room. No setup, no integrations — just open and talk.

### ⏱️ Pressure Meter & Deadline Timer
A shared countdown timer paired with a visual **Pressure Score** — calculated from time elapsed and unfinished tasks — to keep your team focused during crunch time.

### 🔐 Encryption Toggle
Hosts can switch between **Security Mode** (AES-GCM encrypted transfers) and **Performance Mode** (plaintext, lower overhead) on the fly. Previously encrypted content remains readable either way.

### 🖥️ Admin Dashboard
JWT-protected admin panel at \`/admin\` for monitoring server uptime, CPU/memory usage, active rooms, and user counts. Force-delete rooms and inspect room metadata in real time.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or later recommended)
- A modern browser — Chrome or Edge recommended

### Windows

\`\`\`bash
# Clone the repository
git clone https://github.com/Darshan2303/SYNAPSE.git
cd SYNAPSE

# Run the installer (handles dependencies + server start)
SYNAPSE Installer V3.bat
\`\`\`

Or if already installed, simply double-click:

\`\`\`
start.bat
\`\`\`

### Linux / macOS

\`\`\`bash
git clone https://github.com/Darshan2303/SYNAPSE.git
cd SYNAPSE
chmod +x start.sh
./start.sh
\`\`\`

### Access

| Device | URL |
|--------|-----|
| Local machine | \`http://localhost:4000\` |
| LAN devices (mDNS) | \`http://synapse.local:4000\` |
| LAN devices (IP) | \`http://<your-ip>:4000\` |

> All users must be on the same **Wi-Fi or LAN** network. For remote access, use a tunnel like [ngrok](https://ngrok.com) or configure port forwarding.

---

## 🏗️ Architecture

\`\`\`
┌─────────────────────────────────────────────────────┐
│                  Client (Browser)                   │
│  React + TypeScript + Monaco Editor + TailwindCSS   │
│  Yjs (CRDT)  ·  Web Crypto API  ·  FS Access API    │
└─────────────┬───────────────────────┬───────────────┘
              │ WebSockets (Socket.IO) │ WebSocket (/yjs)
              ▼                       ▼
┌───────────────────────────────��─────────────────────┐
│             Node.js / Express Server                │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Room State  │  │  Task Sync   │  │  Snippet  │ │
│  │   Manager    │  │   Engine     │  │  Storage  │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  File Upload │  │  P2P Relay   │  │   Admin   │ │
│  │   System     │  │  (Dir Share) │  │ Dashboard │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                     │
│  Persistence: synapse.db.json · uploads/            │
└─────────────────────────────────────────────────────┘
              │
              ▼
     Google Gemini AI API
     (Snippet & file analysis)
\`\`\`

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS |
| **Code Editor** | Monaco Editor (VS Code engine) |
| **Real-Time Sync** | Socket.IO, Yjs CRDTs |
| **Backend** | Node.js, Express |
| **Persistence** | JSON flat-file DB (\`synapse.db.json\`) |
| **Encryption** | Web Crypto API — AES-GCM (client-side) |
| **Directory Sharing** | File System Access API |
| **AI Integration** | Google Gemini API |
| **Auth** | JWT (admin routes) |
| **Discovery** | mDNS (\`synapse.local\`) |

---

## 📁 Project Structure

\`\`\`
SYNAPSE/
├── src/                    # React frontend source
├── server.ts               # Express + Socket.IO server
├── index.html              # App entry point
├── start.bat               # Windows launcher
├── start.sh                # Unix launcher
├── SYNAPSE Installer V3.bat# Auto-installer with backup support
├── FEATURES.md             # Detailed feature documentation
├── User_Manual.md          # End-user guide
├── package.json
├── tsconfig.json
├── vite.config.js
└── tailwind.config.js
\`\`\`

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [FEATURES.md](./FEATURES.md) | Deep-dive into every feature with implementation details |
| [User_Manual.md](./User_Manual.md) | Step-by-step guide for end users |

---

## 🔧 Auto-Installer

The \`SYNAPSE Installer V3.bat\` script handles the full lifecycle:

- ✅ First-time dependency installation
- ✅ Upgrading to a newer version
- ✅ Uninstalling — with automatic **database backup** preserved for future reinstalls

---

## 🔒 Security Notes

- All file transfers support **client-side AES-GCM encryption** — the server never sees plaintext
- Admin dashboard is protected via **JWT authentication**
- Synapse is designed for **trusted LAN environments**; for internet-facing deployment, add TLS and harden the server accordingly
- Default admin credentials are \`admin1\` / \`admin1\` — **change these before deploying**

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create a feature branch — \`git checkout -b feature/your-feature\`
3. Commit your changes — \`git commit -m 'Add your feature'\`
4. Push and open a Pull Request

---

## ⭐ Support

If Synapse saves your team time, consider giving it a star — it helps a lot.

[![Star this repo](https://img.shields.io/github/stars/Darshan2303/SYNAPSE?style=for-the-badge&color=yellow)](https://github.com/Darshan2303/SYNAPSE/stargazers)

---

<div align="center">

Built with ⚡ by [Darshan](https://github.com/Darshan2303)

</div>
`;
