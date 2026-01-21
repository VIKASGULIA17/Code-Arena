# Database Schema Documentation

This document outlines the database schema based on the provided architecture diagram.

## 1. Table: `user`

Core table for storing user authentication and basic account information.

| Column Name | Data Type & Constraints | Description |
| :--- | :--- | :--- |
| `user_id` | `INT` PRIMARY KEY AUTO_INCREMENT | Unique identifier for the user. |
| `username` | `VARCHAR(100)` NOT NULL UNIQUE | Unique name used for login and display. |
| `user_email` | `VARCHAR(255)` NOT NULL UNIQUE | User's email address for notifications and login. |
| `user_password`| `VARCHAR(255)` NOT NULL | Hashed password for security. |
| `role` | `VARCHAR(50)` NOT NULL | Defines permissions (e.g., 'USER', 'ADMIN'). |
| `created_at` | `DATETIME` DEFAULT CURRENT_TIMESTAMP | Timestamp of when the account was created. |

---

## 2. Table: `Profile`

Stores extended user information. It has a one-to-one relationship with the `user` table.

| Column Name | Data Type & Constraints | Description |
| :--- | :--- | :--- |
| `user_id` | `INT` PRIMARY KEY, FOREIGN KEY REFERENCES `user`(`user_id`) | Links directly to the `user` table. Serves as both PK and FK. |
| `full_name` | `VARCHAR(100)` | The user's real name. |
| `bio` | `VARCHAR(500)` | A short biography or description. |
| `avatar_link` | `VARCHAR(255)` | URL to the profile picture image. |
| `school_name` | `VARCHAR(100)` | Name of the user's school or institution. |
| `country` | `VARCHAR(100)` | User's country of residence. |
| `website_link`| `VARCHAR(255)` | URL to personal website or portfolio. |
| `overall_rank`| `INT` DEFAULT 0 | Global rank of the user. |
| `contest_rank`| `INT` DEFAULT 0 | Rank based on contest performance. |
| `badges` | `JSON` | JSON array of badge identifiers (e.g., `['streak-30', 'winner']`). |

---

## 3. Table: `Problem_list`

Stores the main details of every coding problem.

| Column Name | Data Type & Constraints | Description |
| :--- | :--- | :--- |
| `problem_id` | `INT` PRIMARY KEY AUTO_INCREMENT | Unique identifier for the problem. |
| `problem_title`| `VARCHAR(255)` NOT NULL | The main header title of the problem. |
| `problem_slug` | `VARCHAR(255)` NOT NULL UNIQUE | URL-friendly version of the title (e.g., "two-sum"). |
| `problem_tags` | `VARCHAR(255)` | Comma-separated tags (e.g., "array, dp") or potentially JSON. |
| `problem_difficulty`| `VARCHAR(50)` NOT NULL | Difficulty enum (e.g., 'EASY', 'MEDIUM', 'HARD'). |
| `problem_acceptance_percentage`| `DECIMAL(5, 2)` DEFAULT 0.00 | Calculated stat: (accepted / total submissions) * 100. |
| `topic` | `VARCHAR(255)` NOT NULL | Main category area (e.g., "Data Structures & Algorithms"). |

---

## 4. Table: `testcases`

Stores inputs and expected outputs for judging submissions. It has a many-to-one relationship with `Problem_list`.

| Column Name | Data Type & Constraints | Description |
| :--- | :--- | :--- |
| `problem_id` | `INT` NOT NULL, FOREIGN KEY REFERENCES `Problem_list`(`problem_id`) | Links the test case to a specific problem. |
| `testcase_id` | `INT` NOT NULL | Sequential ID for cases within a problem (e.g., 1, 2, 3). |
| `input` | `TEXT` NOT NULL | The input data passed to the user's code. |
| `output` | `TEXT` NOT NULL | The expected output data to validate against. |
| `is_hidden` | `BOOLEAN` NOT NULL DEFAULT TRUE | `TRUE` for hidden judging cases, `FALSE` for visible example cases. |
| **PRIMARY KEY**| `(problem_id, testcase_id)` | Composite PK ensures unique test case IDs per problem. |

---

## 5. Table: `user Submission` (Alternatively: `submissions`)

A log of every attempt a user makes to solve a problem.

| Column Name | Data Type & Constraints | Description |
| :--- | :--- | :--- |
| `submission_id`| `INT` PRIMARY KEY AUTO_INCREMENT | Unique identifier for each specific submission. |
| `user_id` | `INT` NOT NULL, FOREIGN KEY REFERENCES `user`(`user_id`) | The user who submitted the code. |
| `problem_id` | `INT` NOT NULL, FOREIGN KEY REFERENCES `Problem_list`(`problem_id`) | The problem being attempted. |
| `code` | `TEXT` NOT NULL | The actual source code written by the user. |
| `language` | `VARCHAR(50)` NOT NULL | Programming language used (e.g., 'python3', 'cpp', 'java'). |
| `time` | `DATETIME` DEFAULT CURRENT_TIMESTAMP | When the submission occurred. |
| `status` | `VARCHAR(50)` NOT NULL | Verdict (e.g., 'ACCEPTED', 'WRONG_ANSWER', 'TLE', 'RTE'). |
| `runtime` | `INT` | Execution time in milliseconds (ms). |
| `memory` | `DECIMAL(10, 2)` | Memory usage in megabytes (MB). |

---

## 6. Table: `Solved problem count` (Alternatively: `user_solved_problems`)

An optimized tracking table used to quickly count user progress and show "green checks" on the UI without querying the massive submission log.

| Column Name | Data Type & Constraints | Description |
| :--- | :--- | :--- |
| `user_id` | `INT` NOT NULL, FOREIGN KEY REFERENCES `user`(`user_id`) | The user. |
| `problem_id` | `INT` NOT NULL, FOREIGN KEY REFERENCES `Problem_list`(`problem_id`)| The problem successfully solved. |
| `language` | `VARCHAR(50)` NOT NULL | The language used for the accepted solution. |
| **PRIMARY KEY**| `(user_id, problem_id, language)` | Composite PK prevents duplicate accepted records for the same language. |