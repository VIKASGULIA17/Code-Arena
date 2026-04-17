<div align="center">
  <h1>⚔️ Code Arena</h1>
  <p><strong>A Premium, Full-Stack Competitive Programming and Algorithm Practice Platform</strong></p>
  
  [![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
</div>

<br />

**Code Arena** provides a seamless environment for users to solve coding challenges, dynamically visualize algorithms, and master Data Structures and Algorithms (DSA) through a dedicated, interactive learning hub. Emulating top-tier CP platforms, it offers real-time code execution, AI-driven insights, smooth micro-animations, and an advanced administrative suite.

![Code Arena Banner](https://raw.githubusercontent.com/VIKASGULIA17/Code-Arena/main/public/banner.png) *(Note: Replace with actual banner if necessary)*

## 🚀 Key Features

### 💻 Core Platform
- **Real-Time Code Execution:** Securely compile and run code in **C++, Java, Python, and JavaScript** powered by Judge0 CE API.
- **Advanced Code Editor:** Integrated high-performance Monaco Editor featuring syntax highlighting, auto-completion, and developer-friendly dark themes.
- **Analytics & Tracking:** Detailed recording of execution time, memory usage, and result statuses (Accepted, WA, TLE, CE).
- **Shareable Submissions:** Generate unique links to collaborate or showcase your algorithmic solutions seamlessly.

### 🎓 Learning & DSA Revision Hub
- **Interactive Theory Hub:** Comprehensive categorized library for Data Structures and Algorithms with in-depth theory, complexity analysis, and multi-language code templates.
- **Premium Algorithm Visualizer:** Dynamic, Framer Motion-powered 1D and 2D visualizations natively integrated for:
  - Recursive Flow, Call Stack Analysis, and Backtracking.
  - Sorting Algorithms and Graph Traversals (BFS, DFS).
  - Tree Structures & Dynamic Programming states.

### ⚡ AI Integration
- **Google GenAI Support:** Platform implements seamless AI integrations via `@google/genai` to assist developers with hints, optimal code approaches, or problem explanations.

### 🛡️ Administrative Suite
- **Unified Dashboard:** Real-time metrics on user growth, problem activity, submissions, and platform health.
- **Complete Content Management:** Robust CRUD operations for coding problems (descriptions, constraints, hidden test cases) and scheduling live **Contests**.
- **User Activity Audit:** Perform moderation, access control, and user performance analysis effortlessly.

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework:** React 19 + Vite 
- **Styling:** Tailwind CSS v4, HeroUI (`@heroui/system`), Radix UI primitives.
- **Animations:** Framer Motion for sleek state transitions and visualizer tracking.
- **Capabilities:** 
  - Monaco Editor (`@monaco-editor/react`) for coding functionality.
  - Recharts for analytical metrics on the dashboard.
  - Formik & Yup for schema validation and forms payload handling.
  - Google Recaptcha UI for security/bot mitigation.

### Backend & Infrastructure
- **API Engine:** Java Spring Boot & Spring Security 
- **Database:** MongoDB 
- **Authentication:** JWT (JSON Web Tokens)
- **Execution Environment:** Judge0 CE (API / Docker setup)

---

## 📂 Project Structure

```text
Code-Arena/
├── src/
│   ├── api/             # API services and Axios interceptors
│   ├── components/      # Modular UI & Feature-specific components
│   │   ├── admin/       # Dashboard and management UI
│   │   ├── Algovisualizer/ # Animation/Visualization logic
│   │   ├── Contest/     # Live contest architecture
│   │   └── DsaRevision/ # DSA theoretical modules
│   ├── context/         # React Context API global state management
│   ├── data/            # Static constants and mock fallbacks
│   ├── Pages/           # Application views/routes
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility and helper functions
├── public/              # Static assets, banners, and icons
└── ...configs           # Vite, Tailwind (v4), ESLint, JS config
```

---

## 🏁 Getting Started

### Prerequisites
Ensure your local environment includes:
- **Node.js** (v20+ recommended)
- **Java Development Kit (JDK)** (17+)
- **MongoDB** (Running locally or via MongoDB Atlas)
- **Judge0 Execution API** (via RapidAPI or a local Docker cluster)

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/VIKASGULIA17/Code-Arena.git

# Navigate to the project directory
cd Code-Arena

# Install NPM dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory and configure the variables required for Judge0 and the Backend connection:

```env
VITE_BACKEND_URL=http://localhost:8080
VITE_JUDGE0_URL=https://judge0-ce.p.rapidapi.com
VITE_JUDGE0_HOST=judge0-ce.p.rapidapi.com
VITE_JUDGE0_KEY=your_rapidapi_key
```

### 3. Run Development Build

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to experience the application locally.

---

## 📄 Documentation Structure

For a deep dive into the software architecture, RESTful API endpoints, and internal visualization logic, please refer to our full documentation in [DOCUMENTATION.md](./DOCUMENTATION.md).

## 🤝 Contributing & Support
We welcome pull requests! For major changes, please open an issue first to ensure we align effectively on the technical approach before you spend significant time writing code.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.