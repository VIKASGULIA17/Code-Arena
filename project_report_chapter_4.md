# CHAPTER 4: TESTING AND IMPLEMENTATION

Testing is the phase wherein theoretical design is subjected to the rigid constraints of a production environment. For an application like **Code-Arena**, where algorithms must be verified logically and tree-nodes must trace mathematically without causing UI rendering stutter, the testing scope is incredibly varied.

## 4.1 Testing Methodology

The testing phase was intrinsically tied to the agile iteration cycles. 

### 4.1.1 Unit Testing
Unit tests verify the performance of the smallest logically isolated structures in the app. 
- *Implementation:* Jest was utilized heavily to test custom parser algorithms. By confirming this in a Node test environment, we eliminated math errors before testing the React components.

### 4.1.2 Module Testing
Once functions work, the overarching Module must perform its distinct objective. 
- *Implementation:* Testing the isolated `ExecutionControls.js` module. By feeding mock Play/Pause constraints, we tested if the component correctly fired the corresponding `onStep()` or `onPlay()` property.

### 4.1.3 Integration Testing
Integration testing observes what happens when isolated modules attempt to transfer data across boundaries.
- *Implementation:* The paramount integration test involved verifying the MERN boundary: Does pushing the "Submit Solution" React button successfully encode the code string into a REST Payload, cross the network, fetch MongoDB constraints, execute, and return a formatted Redux state payload?

### 4.1.4 System Testing
System Testing views the entire entity identically to a user manipulating the client.
- *Implementation:* Launching the local development server and actively browsing sections. Can a user log in, immediately solve the 'Two Sum' problem, navigate backwards, launch the DSA revision model, and check their profile?

### 4.1.5 White Box / Black Box Testing
**White Box Testing:** Carried out primarily by the developer checking if the precise architectural paths execute efficiently.
**Black Box Testing:** Evaluated without caring about the underlying code. The inputs are given, output is monitored. Typing syntax errors to see if the engine correctly returned a compilation crash message.

### 4.1.6 Acceptance Testing
Conducted towards the completion phase where target demographic candidates (computer science peers) utilized the application in a 'beta' test and provided feedback.

## 4.2 Test Data & Test Cases

Extensive matrices were created representing the inputs executed against the Test Runner architecture. 

***Table 4.1: Representative Test Case Matrices for Code-Arena Algorithmic Engine***

| Test Case ID | Module Targeted | Input Scenario | Expected Output Status | Actual Outcome | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC-01 | Auth Module | Invalid email pattern. | UI alert stating "Invalid format". | Handled via RegEx. | PASS |
| TC-02 | Visualizer | Setting large input node count. | Form prevents submission, alerts user. | Correctly prevents massive tree. | PASS |
| TC-03 | Visualizer | Toggling 'Play'/'Pause' rapidly. | Animation state pauses gracefully. | Handled perfectly. | PASS |
| TC-04 | Submit | Optimal algorithm matching expected output. | Engine validates array outputs. Result = `Accepted`. | Runtime metadata stored. | PASS |
| TC-05 | Submit | `while(true)` code snippet via editor. | Server force-kills child process. | Returns `Time Limit Exceeded`. | PASS |
| TC-06 | DB Render | Profile Page user has ZERO previous submissions. | Renders default empty state. | Prevents `.map()` crash. | PASS |

## 4.3 Test Reports and Debugging

A critical bug was discovered during Integration Testing (TC-05).
- **Incident Report:** When a user submitted recursive code lacking base cases, the Node.js sandbox child process executed it entirely. Node quickly flooded the internal memory stack causing a `RangeError`, terminating the Express Server thread.
- **Debugging Approach:** Checked PM2 logs tracing the panic condition back to the unsandboxed `eval()` / `spawn`.
- **Resolution:** Overhauled the test execution methodology to run child processes alongside strict `setTimeout` triggers forcibly terminating the execution thread if it breaches a 3-second runtime frame.

## 4.4 Implementation Manual

Deploying Code-Arena involves distinct CI/CD methodologies:

**Backend Deployment:**
1. Secure `.env` payloads comprising MongoDB URI clusters and JWT Encryption Secrets.
2. Initialize repository tracking using PM2.

**Frontend Deployment (Vercel):**
1. Associate GitHub repository with Vercel platform.
2. Configure build commands `npm run build` injecting backend API proxy endpoints.

## 4.5 Implementation

Upon implementation phase completion:
- The MongoDB Atlas Cluster initialized and hydrated with top 50 problem data lists.
- Visualizer nodes successfully handled complex DP grid rendering on live server environments validating logic integrity globally. 

## 4.6 Users' Training

Code-Arena adopts consumer-led 'self-evident' UI constraints designed actively to avoid manual read-states:
1. Form components rely on explicit placeholders text.
2. Hover-states utilizing Tailwind tooltips inherently explain complex buttons.
3. The DSA Revision modules themselves act structurally as tutorials explaining fundamentally how recursive call stacks generally visualize.

## 4.7 Post Implementation Maintenance

Maintenance relies heavily on analytical observability metrics. 
- Code execution sandbox tracking necessitates active logging identifying memory leaks.
- The MongoDB Cluster requires periodic threshold checks, applying pagination to avoid dumping memory.
