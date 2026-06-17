<div align="center">

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

Designed for **hackathons**, **team sprints**, and **rapid prototyping**, Synapse runs entirely on your local network and is accessible from any device [except mobiles ,mobile needs to be connected via ip address] via `synapse.local:4000`.

> No cloud. No accounts. No latency. Just your team and your code.

---

## ✨ Features

### 🧑‍💻 Collaborative Code Editor
Multi-user live coding powered by **Monaco Editor** (the same engine behind VS Code) and **Yjs CRDTs** for conflict-free real-time sync. Create, rename, and delete files and folders. Download the entire project as a `.zip` at any time. Supports JavaScript, TypeScript, Python, HTML, CSS, JSON, and Markdown.

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
JWT-protected admin panel at `/admin` for monitoring server uptime, CPU/memory usage, active rooms, and user counts. Force-delete rooms and inspect room metadata in real time.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or later recommended)
- A modern browser — Chrome or Edge recommended

### Windows

```bash
# Clone the repository
git clone https://github.com/Darshan2303/SYNAPSE.git
cd SYNAPSE

# Run the installer (handles dependencies + server start)
SYNAPSE Installer V3.bat
```

Or if already installed, simply double-click:

```
start.bat
```

### Linux / macOS

```bash
git clone https://github.com/Darshan2303/SYNAPSE.git
cd SYNAPSE
chmod +x start.sh
./start.sh
```

### Access

| Device | URL |
|--------|-----|
| Local machine | `http://localhost:4000` |
| LAN devices (mDNS) | `http://synapse.local:4000` |
| LAN devices (IP) | `http://<your-ip>:4000` |

> All users must be on the same **Wi-Fi or LAN** network. For remote access, use a tunnel like [ngrok](https://ngrok.com) or configure port forwarding.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Client (Browser)                   │
│  React + TypeScript + Monaco Editor + TailwindCSS   │
│  Yjs (CRDT)  ·  Web Crypto API  ·  FS Access API    │
└─────────────┬───────────────────────┬───────────────┘
              │ WebSockets (Socket.IO) │ WebSocket (/yjs)
              ▼                       ▼
┌─────────────────────────────────────────────────────┐
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
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS |
| **Code Editor** | Monaco Editor (VS Code engine) |
| **Real-Time Sync** | Socket.IO, Yjs CRDTs |
| **Backend** | Node.js, Express |
| **Persistence** | JSON flat-file DB (`synapse.db.json`) |
| **Encryption** | Web Crypto API — AES-GCM (client-side) |
| **Directory Sharing** | File System Access API |
| **AI Integration** | Google Gemini API |
| **Auth** | JWT (admin routes) |
| **Discovery** | mDNS (`synapse.local`) |

---

## 📁 Project Structure

```
SYNAPSE/
├── src/                    # React frontend source
├── server.ts               # Express + Socket.IO server
├── index.html              # App entry point
├── start.bat               # Windows launcher
├── start.sh                # Unix launcher
├── SYNAPSE_Installer.bat   # Auto-installer with backup support
├── SYNAPSE_Installer.sh    # Auto-installer for Linux with backup support
├── FEATURES.md             # Detailed feature documentation
├── User_Manual.md          # End-user guide
├── package.json
├── tsconfig.json
├── vite.config.js
└── tailwind.config.js
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [FEATURES.md](./FEATURES.md) | Deep-dive into every feature with implementation details |
| [User_Manual.md](./User_Manual.md) | Step-by-step guide for end users |

---

## 🔧 Auto-Installer

The `SYNAPSE Installer V3.bat` script handles the full lifecycle:

- ✅ First-time dependency installation
- ✅ Upgrading to a newer version
- ✅ Uninstalling — with automatic **database backup** preserved for future reinstalls

---

## 🔒 Security Notes

- All file transfers support **client-side AES-GCM encryption** — the server never sees plaintext
- Admin dashboard is protected via **JWT authentication**
- Synapse is designed for **trusted LAN environments**; for internet-facing deployment, add TLS and harden the server accordingly
- Default admin credentials are `admin1` / `admin1` — **change these before deploying**

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'Add your feature'`
4. Push and open a Pull Request

---

## ⭐ Support

If Synapse saves your team time, consider giving it a star — it helps a lot.

[![Star this repo](https://img.shields.io/github/stars/Darshan2303/SYNAPSE?style=for-the-badge&color=yellow)](https://github.com/Darshan2303/SYNAPSE/stargazers)

---

<div align="center">

Built with ⚡ by [Darshan](https://github.com/Darshan2303)

</div>
