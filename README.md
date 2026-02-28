# ⚔️ Code Arena

Code Arena is a full-stack competitive programming and algorithm practice platform. Built with a modern tech stack, it allows users to solve coding challenges, execute code in multiple languages in real-time, and track their submission history—much like LeetCode.

## ✨ Key Features

* **Real-Time Code Execution:** Securely compile and run code in C++, Java, Python, and JavaScript using the Judge0 API.
* **Rich Code Editor:** Integrated Monaco Editor with syntax highlighting, auto-indentation, and a read-only mode for viewing past submissions.
* **User Authentication & Profiles:** JWT-based secure login, customizable user profiles, avatars (via DiceBear), and global ranking statistics.
* **Submission Tracking:** View detailed submission history including status (Accepted, Wrong Answer, TLE, Compilation Error), execution time (ms), and memory usage (MB).
* **Shareable Solutions:** Generate unique, read-only links to share specific code submissions with others.
* **Robust Data Handling:** Base64 encoding for code payloads to ensure safe UTF-8 transmission of complex symbols and formatting.

## 🛠️ Tech Stack

### Frontend

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Code Editor:** `@monaco-editor/react`
* **HTTP Client:** Axios
* **Icons:** Lucide React
* **Routing:** React Router DOM

### Backend

* **Framework:** Java Spring Boot
* **Security:** Spring Security with JWT Authentication
* **Database:** MongoDB (Spring Data MongoDB)
* **Code Execution Engine:** Judge0 CE (Dockerized)
* **JSON Serialization:** Jackson (with custom `ToStringSerializer` for MongoDB ObjectIds)

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* Java (JDK 17+)
* MongoDB (Local or Atlas)
* Judge0 API Access (Self-hosted via Docker or RapidAPI)

### 1. Backend Setup (Spring Boot)

1. Navigate to the backend directory.
2. Update your `application.properties` or `application.yml` with your MongoDB URI and JWT Secret:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/codearena
jwt.secret=your_super_secret_key_here

```


3. Run the Spring Boot application:
```bash
./mvnw spring-boot:run

```


*The backend will start on `http://localhost:8080`.*

### 2. Frontend Setup (React/Vite)

1. Navigate to the frontend directory.
2. Install the dependencies:
```bash
npm install

```


3. Create a `.env` file in the root of the frontend directory and configure your backend and execution engine URLs:
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_JUDGE0_URL=http://localhost:2358  # Or your hosted Judge0 URL

```


4. Start the development server:
```bash
npm run dev

```


*The frontend will start on `http://localhost:5173` (or 5174).*

---

## 📂 Architecture Highlights

* **CORS Configuration:** The backend is configured to allow cross-origin requests specifically from the Vite development ports to ensure smooth local development.
* **Submission Flow:** 1. User writes code in the Monaco Editor.
2. Code is Base64 encoded and sent to Judge0 with `?wait=true`.
3. The execution result (stdout, stderr, time, memory) is decoded and returned to the React frontend.
4. The frontend calculates the final status (e.g., Passed, Failed) and sends the payload to the Spring Boot backend to be saved in MongoDB.
* **Driver Code Injection:** Hidden boilerplate and driver code is appended to user submissions at runtime to test logic against hidden test cases without cluttering the user's editor.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the MIT License.
