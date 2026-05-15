# Code Arena

Code Arena is a React-based competitive programming and DSA learning platform. It provides a problem-solving workspace, multi-language code execution, submission tracking, contest flows, an algorithm visualizer, a DSA revision hub, user profiles, and an admin interface for managing platform content.

The repository currently contains the frontend application and related documentation. It is designed to integrate with a separate backend API for authentication, users, problems, contests, submissions, and profile data.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Application Routes](#application-routes)
- [Code Execution](#code-execution)
- [Backend Integration](#backend-integration)
- [Deployment](#deployment)
- [Additional Documentation](#additional-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

### Problem Solving

- Browse and filter coding problems by search text, difficulty, tags, and topics.
- Open detailed problem pages with description, examples, constraints, test cases, submissions, discussion, and solution sections.
- Run code against visible test cases before submitting.
- Submit code against hidden test cases and store verdicts through the backend API.
- View execution status, time, memory, and failed test case details where available.
- Share submissions through public submission routes.

### Code Editor and Execution

- Monaco Editor integration through `@monaco-editor/react`.
- Supported frontend language mappings include:
  - C++
  - Java
  - Python
  - JavaScript
- JDoodle-based execution is used by the active test runner.
- A separate Judge0 helper is also present for local Judge0 CE execution experiments.
- Driver-code templates wrap user functions and validate test cases consistently.

### Contests

- Contest listing page.
- Contest registration flow.
- Ongoing contest page.
- Contest ranking page.
- Admin contest management interface.

### DSA Revision Hub

- Structured DSA revision pages powered by local topic data.
- Category, topic, and subtopic routes.
- Theory and implementation-oriented learning content.
- Revision progress hook for tracking learning progress.

### Algorithm Visualizer

- Sorting visualizer.
- Graph visualizer.
- Tree visualizer.
- Recursion visualizer with call stack and state inspection.
- Shared metrics and complexity panels for visual learning.

### Authentication and Profiles

- Login and signup pages.
- JWT-based session handling through local storage.
- User profile page.
- Current-user and profile data fetched from the backend.
- Session-expired route.

### Admin Panel

- Admin dashboard.
- User management.
- Problem management.
- Contest management.
- Analysis and metrics views.

### AI Assistance

- Google GenAI integration is included in `AIService/gemini.js`.
- The current AI service is configured as a senior code-review assistant and uses `VITE_GEMINI_API_KEY`.

### UI and Experience

- React Router based single-page application.
- Tailwind CSS v4 styling.
- Dark and light theme context.
- Framer Motion transitions and animation support.
- Radix UI primitives and local reusable UI components.
- Recharts support for dashboard analytics.
- Vercel SPA rewrites included.

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 4
- Monaco Editor
- Framer Motion
- Radix UI
- HeroUI packages
- Lucide React and React Icons
- Recharts
- Formik and Yup
- Axios
- React Markdown

### External Services

- Backend REST API, configured with `VITE_BACKEND_URL`
- JDoodle code execution API, proxied through `/jdoodle-api`
- Google GenAI API
- Optional local Judge0 CE instance at `http://localhost:2358`

### Tooling

- ESLint 9
- Vite build and preview
- Vercel routing configuration

## Architecture

Code Arena follows a decoupled frontend architecture:

```text
Browser
  |
  | React UI, routes, editor, visualizers
  v
Frontend application
  |
  | REST requests with JWT
  v
Backend API
  |
  | users, profiles, problems, contests, submissions
  v
Database

Frontend application
  |
  | /jdoodle-api proxy
  v
JDoodle execution API
```

Important frontend responsibilities:

- Render the user-facing platform.
- Manage global authentication and platform state through React Context.
- Fetch platform data from the backend.
- Wrap user code with driver templates before execution.
- Compare execution output against visible or hidden test cases.
- Persist submissions through the backend.

## Project Structure

```text
Code-Arena/
|-- AIService/
|   |-- gemini.js                 # Google GenAI helper
|   `-- TestingPage.jsx           # AI testing component
|-- public/                       # Static assets
|-- src/
|   |-- api/
|   |   |-- api.js                # Active JDoodle execution client
|   |   `-- judge0_api_logic.js   # Local Judge0 execution helper
|   |-- components/
|   |   |-- Algovisualizer/       # Sorting, graph, tree, recursion visualizers
|   |   |-- Contest/              # Contest UI and registration flows
|   |   |-- DsaRevision/          # DSA hub and revision components
|   |   |-- admin/                # Admin layout and navigation
|   |   |-- code/                 # Code display components
|   |   |-- home/                 # Homepage sections
|   |   |-- layouts/              # Shared page layouts
|   |   |-- others/               # Shared utility UI components
|   |   |-- problem/              # Problem page, editor, test cases, results
|   |   |-- theory/               # Theory content components
|   |   |-- ui/                   # Reusable UI primitives
|   |   |-- Footer.jsx
|   |   |-- Navbar.jsx
|   |   |-- PageTransition.jsx
|   |   `-- SearchModal.jsx
|   |-- context/
|   |   |-- AppContext.jsx        # Global app/auth/platform state
|   |   `-- ThemeContext.jsx      # Theme state
|   |-- data/
|   |   |-- ContestData.js
|   |   |-- DsaTopics.js
|   |   |-- UserCodeTemplate.js
|   |   |-- driverCode.js
|   |   |-- dsaProblem.jsx
|   |   |-- problemTemplates.js
|   |   |-- solution.js
|   |   `-- testCases.js
|   |-- hooks/
|   |   |-- useRevisionProgress.js
|   |   |-- useTestRunner.js      # Run and submit problem code
|   |   `-- old_judge_0_controller.js
|   |-- lib/
|   |   `-- utils.ts
|   |-- Pages/
|   |   |-- Admin/                # Admin dashboard pages
|   |   |-- Authentication/       # Login and signup
|   |   |-- ContestPages/         # Contest rankings
|   |   |-- AlgoVisualizer.jsx
|   |   |-- Contest.jsx
|   |   |-- Home.jsx
|   |   |-- NotFound.jsx
|   |   |-- Problems.jsx
|   |   `-- Profile.jsx
|   |-- App.jsx                   # Application route definitions
|   |-- index.css                 # Tailwind imports, tokens, global styles
|   `-- main.jsx                  # React entry point
|-- DOCUMENTATION.md              # Technical documentation
|-- schema.md                     # Database schema notes
|-- components.json               # UI component configuration
|-- eslint.config.js              # ESLint configuration
|-- package.json
|-- tailwind.config.js
|-- tsconfig.json
|-- vercel.json                   # Vercel rewrites and JDoodle proxy
`-- vite.config.js                # Vite config, aliases, JDoodle dev proxy
```

## Getting Started

### Prerequisites

- Node.js 20 or newer is recommended.
- npm, included with Node.js.
- A running backend API compatible with the routes used by this frontend.
- JDoodle API credentials for code execution.
- Google GenAI API key if AI review features are used.
- Optional: local Judge0 CE instance if you want to use `src/api/judge0_api_logic.js`.

### Installation

```bash
git clone https://github.com/VIKASGULIA17/Code-Arena.git
cd Code-Arena
npm install
```

### Local Development

Create a `.env` file in the project root:

```env
VITE_BACKEND_URL=http://localhost:8080

VITE_JDOODLE_CLIENT_ID_1=your_primary_jdoodle_client_id
VITE_JDOODLE_CLIENT_SECRET_1=your_primary_jdoodle_client_secret
VITE_JDOODLE_CLIENT_ID_2=your_backup_jdoodle_client_id
VITE_JDOODLE_CLIENT_SECRET_2=your_backup_jdoodle_client_secret

VITE_GEMINI_API_KEY=your_gemini_api_key
```

Start the development server:

```bash
npm run dev
```

The application is served by Vite, usually at:

```text
http://localhost:5173
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_BACKEND_URL` | Yes | Base URL for the backend REST API. |
| `VITE_JDOODLE_CLIENT_ID_1` | Yes for execution | Primary JDoodle client ID. |
| `VITE_JDOODLE_CLIENT_SECRET_1` | Yes for execution | Primary JDoodle client secret. |
| `VITE_JDOODLE_CLIENT_ID_2` | Recommended | Backup JDoodle client ID used after rate-limit errors. |
| `VITE_JDOODLE_CLIENT_SECRET_2` | Recommended | Backup JDoodle client secret used after rate-limit errors. |
| `VITE_GEMINI_API_KEY` | Required for AI features | Google GenAI API key. |

Notes:

- Vite only exposes environment variables prefixed with `VITE_`.
- The frontend stores JWT tokens in `localStorage`.
- Some contest pages currently reference `http://localhost:8080` directly, so local backend compatibility should be maintained unless those calls are refactored to `VITE_BACKEND_URL`.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build in `dist/`.

```bash
npm run preview
```

Serves the production build locally for verification.

```bash
npm run lint
```

Runs ESLint across the project.

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/problem` | Problem list |
| `/problem/:id` | Problem details and coding workspace |
| `/submission/:slug` | Shared submission page |
| `/contest` | Contest list |
| `/contest/registration` | Contest registration |
| `/contest/:contestName` | Ongoing contest page |
| `/contestRankings/:slug` | Contest rankings |
| `/profile/:username` | User profile |
| `/login` | Login |
| `/signup` | Signup |
| `/algovisualizer` | Algorithm visualizer hub |
| `/revision` | DSA revision layout |
| `/revision/:categoryId/:topicId` | DSA topic route |
| `/revision/:categoryId/:topicId/:subtopicId` | DSA subtopic route |
| `/dsa-hub` | DSA hub |
| `/topic/:categoryId/:topicId` | Topic page |
| `/sessionExpired` | Expired session page |
| `/admin` | Admin dashboard |
| `/admin/users` | User management |
| `/admin/problems` | Problem management |
| `/admin/contests` | Contest management |
| `/admin/analysis` | Admin analysis page |
| `*` | Not found page |

## Code Execution

The active execution flow is implemented in:

- `src/hooks/useTestRunner.js`
- `src/api/api.js`
- `src/data/driverCode.js`

Flow:

1. The user writes code in the editor.
2. `useTestRunner` selects the relevant driver template for the current problem type and language.
3. The driver wraps the user function and test cases into executable source code.
4. `src/api/api.js` sends the source code to JDoodle through `/jdoodle-api`.
5. Vite proxies `/jdoodle-api` to `https://api.jdoodle.com/v1/execute` during local development.
6. Vercel rewrites `/jdoodle-api` to the same JDoodle endpoint in production.
7. The frontend parses the execution response and determines visible test results or submission verdicts.
8. Submissions are saved to the backend through `/submission/create`.

JDoodle language mapping:

| UI language | JDoodle language |
| --- | --- |
| `python` / `python3` | `python3` |
| `cpp` / `c++` | `cpp` |
| `java` | `java` |
| `javascript` / `js` | `nodejs` |

There is also a Judge0 helper in `src/api/judge0_api_logic.js`. It targets a local Judge0 service at `http://localhost:2358` and maps languages to Judge0 language IDs. This file is useful if the project is migrated back to Judge0 or if local sandbox execution is needed.

## Backend Integration

The frontend expects a backend API for persistence and protected platform operations. Common endpoint groups used in the codebase include:

| Endpoint group | Purpose |
| --- | --- |
| `/user/*` | Login, signup, and current-user operations |
| `/userProfile/*` | User profile data |
| `/public/*` | Public problem, contest, and ranking data |
| `/submission/*` | Submission creation, status, and history |
| `/admin/*` | Admin user, problem, contest, and dashboard operations |
| `/contest/*` | Contest creation and management operations |

Authentication:

- Protected requests send `Authorization: Bearer <jwtToken>`.
- The token is read from `localStorage`.
- Global auth state is managed in `src/context/AppContext.jsx`.

## Deployment

The repository includes Vercel configuration in `vercel.json`.

Production behavior:

- `/jdoodle-api` is rewritten to the JDoodle execution endpoint.
- All other routes are rewritten to `/index.html` so React Router can handle client-side navigation.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Required deployment environment variables:

- `VITE_BACKEND_URL`
- `VITE_JDOODLE_CLIENT_ID_1`
- `VITE_JDOODLE_CLIENT_SECRET_1`
- `VITE_JDOODLE_CLIENT_ID_2`
- `VITE_JDOODLE_CLIENT_SECRET_2`
- `VITE_GEMINI_API_KEY`, if AI features are enabled

## Additional Documentation

- `DOCUMENTATION.md` contains technical architecture notes, state management details, execution flow, security notes, and API references.
- `schema.md` contains database schema notes for users, profiles, problems, test cases, submissions, and solved-problem tracking.

## Contributing

1. Create a feature branch.
2. Keep changes focused and consistent with the existing folder structure.
3. Run linting before opening a pull request.
4. Document new environment variables, routes, or backend contracts.
5. Include screenshots or short recordings for UI-heavy changes when useful.

## License

