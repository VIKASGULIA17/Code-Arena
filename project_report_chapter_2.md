# CHAPTER 2: SYSTEM ANALYSIS

System analysis is a systematic approach to identifying problems, evaluating options, and designing solutions within software engineering. For the **Code-Arena** project, the analysis phase serves as the critical bridge separating the initial abstract concept from structural execution. This chapter assesses viability, methodological constraints, and foundational technology choices ensuring sustainable deployment.

## 2.1 Feasibility Study

A software project is only worth developing if the investment (time, effort, computation, API-costs) yields sufficient impact and utility. Feasibility studies establish these boundary conditions, aggressively analyzing potential failure vectors across multiple dimensions before any code is committed.

### 2.1.1 Technical Feasibility

Technical feasibility determines whether the necessary technologies exist, are accessible, and are capable of supporting the proposed architecture (e.g., Recursion parsing, real-time code execution). 

**Code-Arena relies on several advanced technical paradigms:**
1. **Dynamic Engine State Parsing:** The `useTreeEngine` must parse complex objects representing a recursive call stack in React state without causing DOM freezing. Using optimized React hooks (like `useMemo` and `useCallback`) alongside localized debouncing proves that parsing 100+ nodes under 500ms is mechanically possible.
2. **Real-time Compilation/Execution:** Using isolated Node.js child processes (`exec` or `spawn`) or integrating with secure API endpoints like Judge0 ensures that user-submitted code can be evaluated safely. 
3. **Database Concurrency:** MongoDB’s document model effortlessly supports dynamic unstructured inputs (like various test-case typings) more efficiently than rigid SQL columns. 

**Conclusion:** The project is highly technically feasible. Existing libraries (React, Express, Framer Motion) provide robust support for the ambitious logic engines visualized in this design.

### 2.1.2 Economical Feasibility

Economic feasibility determines the cost-benefit parameters of deploying and maintaining the application. As this project functions fundamentally as an educational portfolio and SaaS platform, minimizing server overhead is critical.

**Cost Breakdown Projection:**
- **Hosting / Staging:** Vercel (Frontend) and Render/Fly.io (Backend) offer generous free-tier mechanisms explicitly designed for developers. Cost: **$0.00/month**.
- **Database Storage:** MongoDB Atlas provides a 512 MB free tier cluster. Considering text-based problems and user data consume mere kilobytes, this cluster can support approximately ~10,000 active users before upgrades. Cost: **$0.00/month**.
- **Domain Name:** Acquiring a custom `.com` or `.in` domain requires basic capital outlay (approx. ~$12/year).
- **Execution Sandboxing Costs:** If third-party APIs (like Judge0 Pro) are used at scale, costs accumulate per request. A custom Node server proxy mitigates this until massive scaling is required.

***Table 2.1: Economic Viability Comparison***

| Component | Industry Cost Equivalent | Proposed Open-Source Strategy | Capital Output |
| :--- | :--- | :--- | :--- |
| UI Framerworks | Commercial App Builders | React.js / Tailwind (Open Source) | Free |
| Relational Hosting | SQL Azure/AWS RDS (~$20/m) | MongoDB Atlas Shared | Free |
| Cloud Load Balancer | AWS Elastic Load Balancer | Vercel Edge Networks | Free |

**Conclusion:** Utilizing cloud-native Serverless Architectures ensures Code-Arena maintains robust economic viability, keeping capital overhead functionally negligible during the prototype and testing phases.

### 2.1.3 Operational Feasibility

Operational feasibility judges the willingness and capability of end-users to adopt the system.
1. **Target Audience:** Computer Science students and tech-interview candidates.
2. **Current Workflow Resistance:** Candidates currently use disjointed platforms. Offering a modernized, "Dark Mode" all-in-one suite lowers the resistance to adoption because it visually appeals to developer demographics.
3. **Familiar Interface Guidelines:** By mimicking popular IDE layouts (VS Code) utilizing split-pane designs for the problem arena, users will require literally zero on-boarding or training to utilize the platform effectively. The operational cognitive friction is minimal.

**Conclusion:** Operationally, the application maps perfectly to established developer behavioral models, ensuring strong retention and seamless usability.

### 2.1.4 Other Feasibility Dimensions

**Legal Feasibility:**
The project depends inherently on writing custom problems or mimicking generic classic algorithms (like Fibonacci, Knapsack, Dijkstra's). As pure mathematical algorithms cannot be rigidly copyrighted in this context, compiling a list of revision materials poses no intellectual property infringements. Furthermore, utilizing MIT-licensed libraries ensures full legal compliance.

**Schedule Feasibility:**
MERN stack decoupling allows rapid concurrent development. While the backend routes construct the authentication models, the frontend can simultaneously mock data to build the `Algovisualizer`. The 3-month project lifecycle stipulated by the BCA criteria is generous for this scope, making it heavily feasible.

## 2.2 Analysis Methodology

The core Analysis Methodology adopted for mapping requirements was the **Iterative Model coupled with Rapid Application Development (RAD)**. Rather than relying on a strict Waterfall methodology where requirements are locked arbitrarily for months, RAD allowed for a flexible specification constraint.

***Table 2.2: Analysis Approach Breakdown***

| Phase | Methodology Action | Outcome / Deliverable |
| :--- | :--- | :--- |
| **Information Gathering** | Interviewing peers regarding their struggles with visualizing graph traversals. | Discovered a dire need for a `RecursionVisualizer`. |
| **Constraint Setting** | Bounding the project scope strictly to Data Structures. | Eliminated scope-creep (e.g. avoiding integrating generic Web-Dev courses). |
| **Logic Prototyping** | Utilizing CodePen and local scripts to test if complex SVGs can be drawn sequentially. | Proved the viability of the `useTreeEngine` backend. |

## 2.3 Choice of the Platforms

In modern web development, selecting the specific stack determines the architectural fate and maintenance debt of the application. The **MERN** stack (MongoDB, Express, React, Node.js) was explicitly selected over Django/Python or Spring/Java due to its ubiquitous asynchronous handling via JavaScript.

### 2.3.1 Software Used (S/W)

1. **Frontend Architecture: React.js (v18.x)**
   - *Reasoning:* Component-based morphology is strictly required. The `DsaRevision` pages share overlapping sidebar mechanics. React's Virtual DOM ensures that when the Recursion Visualizer updates 50 nodes per second, the browser repaints only the modified SVG attributes, rather than flushing the entire document, which is critical for performance.

2. **Styling Framework: Tailwind CSS**
   - *Reasoning:* Utility-first CSS eliminates thousands of lines of bloated `.css` files. It creates an extremely consistent design system (colors, padding, flex-boxes) allowing the creation of highly beautiful, custom, developer-centric UI elements without fighting bootstrap over-rides.

3. **Animation Engine: Framer Motion**
   - *Reasoning:* Essential for the visualizer. Framer motion allows interpolating states automatically. When a recursion tree branch collapses, Framer Motion ensures a smooth spring-based collapse rather than a stark, instant disappearance.

4. **Backend Server: Node.js & Express.js**
   - *Reasoning:* Operating on the V8 engine, Node.js excels at asynchronous I/O boundaries. Handling multiple concurrent users fetching problem definitions and posting submission buffers is heavily optimized via the Event-Loop.

5. **Database Engine: MongoDB**
   - *Reasoning:* NoSQL JSON-like documents map natively to JavaScript objects. The `DsaProblem` schemas can feature varying depths of arrays (Hints, Test Cases, Constraints) without requiring highly normalized relational tables.

6. **Version Control:** Git & GitHub for repository history management and automated deployment pipelines to Vercel.

### 2.3.2 Hardware Used (H/W)

For optimal development and subsequent staging server deployment, the following hardware thresholds were defined.

**Development Environment Specification:**
- **CPU:** 4 Cores / 8 Threads (Intel Core i5 9th Gen or superior) required for rapid `npm` building and running concurrent frontend and backend local instances.
- **RAM:** Minimum 8.0 GB. (Running Chrome with 10+ tabs of API documentations, a React Dev server, NodeJS watcher, and MongoDB compass routinely consumes upwards of 6 GB of active memory).
- **Storage:** 256 GB NVMe SSD for high-bandwidth read/write speeds during heavy `node_modules` installations.

**Minimum End-User Hardware:**
- As the entire application logic is fundamentally processed centrally and the UI is rendered via generic browser engines, the end-user requires minimal hardware. Any device capable of running a modern Chromium/Gecko based browser with a minimum of 2 GB RAM resolves the constraints natively.

*(The fusion of these targeted feasibility bounds methodologies directly feeds into the intricate design strategies described in Chapter 3).*
