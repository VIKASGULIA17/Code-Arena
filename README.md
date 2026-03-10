# ⚔️ Code Arena

**Code Arena** is a premium, full-stack competitive programming and algorithm practice platform. It provides a seamless environment for users to solve coding challenges, visualize algorithms, and master Data Structures and Algorithms (DSA) through a dedicated learning hub.

![Code Arena Banner](https://raw.githubusercontent.com/VIKASGULIA17/Code-Arena/main/public/banner.png) *(Note: Replace with actual banner if available)*

## 🚀 Overview

Code Arena is designed to emulate the experience of top-tier platforms like LeetCode and Codeforces, featuring real-time code execution, an integrated learning management system, and an advanced administrative suite for content management.

---

## ✨ Key Features

### 💻 Core Platform
*   **Real-Time Code Execution:** Securely compile and run code in **C++, Java, Python, and JavaScript** using the Judge0 CE API.
*   **Monaco Code Editor:** A high-performance editor with syntax highlighting, auto-completion, and custom themes.
*   **Submissions & Analytics:** Detailed tracking of execution time, memory usage, and status (Accepted, WA, TLE, CE).
*   **Shared Submissions:** Generate unique, shareable links for your solutions to collaborate or showcase work.

### 🎓 Learning & Revision
*   **DSA Learning Hub:** A comprehensive categorized library of Data Structures and Algorithms with:
    *   In-depth theory and complexity analysis.
    *   Code templates in multiple languages.
    *   Difficulty-based progression (Beginner to Advanced).
*   **Algorithm Visualizer:** Interactive 1D and 2D visualizations for:
    *   Sorting Algorithms (Bubble, Merge, Quick, etc.)
    *   Graph Traversals (BFS, DFS)
    *   Tree Structures
    *   Recursion Depth and Flow

### 🛡️ Admin Suite
*   **Unified Dashboard:** Real-time stats on user growth, problem activity, and system health.
*   **Content Management:** Full CRUD operations for:
    *   **Problems:** Manage descriptions, constraints, and test cases.
    *   **Contests:** Schedule and monitor live coding competitions.
*   **User Management:** Overview of active participants and their performance metrics.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Framer Motion, Lucide Icons |
| **State Management** | React Context API (`AppContext`) |
| **Editor** | `@monaco-editor/react` |
| **Backend** | Java Spring Boot, Spring Security |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Tokens) |
| **Execution** | Judge0 CE (API / Docker) |

---

## 📂 Project Structure

```text
Code-Arena/
├── src/
│   ├── api/             # API service configurations
│   ├── components/      # Reusable UI & Feature-specific components
│   │   ├── admin/       # Admin-only components
│   │   ├── Algovisualizer/ # Visualization logic
│   │   ├── Contest/     # Contest-related logic
│   │   └── DsaRevision/ # DSA Hub components
│   ├── context/         # AppContext for global state
│   ├── data/            # Static data, templates, and constants
│   ├── Pages/           # Main route pages (Home, Problems, etc.)
│   └── hooks/           # Custom React hooks
├── public/              # Static assets
└── ...configs           # Vite, Tailwind, ESLint, PostCSS
```

---

## 🏁 Getting Started

### Prerequisites
*   **Node.js** (v18+)
*   **JDK** (17+)
*   **MongoDB** (Local or Atlas)
*   **Judge0 API Key** (RapidAPI) or a local Docker instance.

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/VIKASGULIA17/Code-Arena.git
cd Code-Arena

# Install dependencies
npm install
```

### 2. Environment Variables
Create a `.env` file in the root:
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_JUDGE0_URL=https://judge0-ce.p.rapidapi.com # Or local URL
VITE_JUDGE0_HOST=judge0-ce.p.rapidapi.com
VITE_JUDGE0_KEY=your_rapidapi_key
```

### 3. Run Development Server
```bash
npm run dev
```

---

## 📄 Documentation

For a deep dive into the architecture, API endpoints, and internal logic, please refer to the [DOCUMENTATION.md](./DOCUMENTATION.md) file.

## 🤝 Contributing
Feel free to fork the project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
