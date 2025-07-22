# 🧠 AI Chatbot Assistant

Build a full-stack AI chatbot powered by OpenAI, using **React**, **Vite**, **Tailwind**, **TypeScript**, and an **Express backend**.

---

## ✅ Part 1: Set Up Your Development Environment

### 🛠️ Install Required Tools

Please ensure the following tools are installed on your system. Use the links or commands below if needed:

| Tool        | Installed? (Y/N) | How to Install                                                             |
| ----------- | ---------------- | -------------------------------------------------------------------------- |
| Node.js LTS |                  | [Node.js LTS](https://nodejs.org/en) or use `nvm`                          |
| Git         |                  | `sudo apt install git` or from [git-scm.com](https://git-scm.com/download) |
| VSCode      |                  | [Download VSCode](https://code.visualstudio.com/)                          |

To verify installation, run:

```bash
node -v && npm -v && git -v
```

You should see output similar to:

```bash
v22.17.0
10.9.2
git version 2.43.0
```

---

## 🏗️ Part 2: Project Scaffolding & Repository Setup

### 🔧 Step 1: Verify GitHub Configuration

Check your Git config:

```bash
git config --global user.name
git config --global user.email
```

If nothing is returned, set your Git identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 🔐 Step 2: Optional — Connect via SSH

To verify your SSH connection to GitHub:

```bash
ssh -T git@github.com
```

If successful, you'll see something like:

```
Hi your-username! You've successfully authenticated...
```

If not, follow [this guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) to set it up.

---

### 📦 Step 3: Fork & Clone the Repository

1. Fork the repo from [Oznerol92/AI-chatbot-assistant](https://github.com/Oznerol92/AI-chatbot-assistant) into your own GitHub account.

2. Clone **your forked repo**:

```bash
git clone https://github.com/your-username/AI-chatbot-assistant.git
cd AI-chatbot-assistant
```

---

### 📁 Step 4: Install Dependencies

At the project root:

```bash
npm install
```

This will install both frontend and backend dependencies using workspaces or custom scripts (depending on your setup).

---

### 🔑 Step 5: Set Up Your API Key

Create a `.env` file inside the `server` directory:

```
OPENAI_API_KEY=your_openai_key_here
```

Make sure your key has access to the model you're using (e.g., `gpt-4`, `gpt-3.5-turbo`, or `gpt-4o`).

---

### 🚀 Step 6: Start the Application

Start both the backend and frontend servers concurrently:

```bash
npm start
```

This will:

* Run the backend server on `http://localhost:3000`
* Start the Vite frontend on `http://localhost:5173`