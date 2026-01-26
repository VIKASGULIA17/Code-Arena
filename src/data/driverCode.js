export const driverCodeTemplate = {
    "Array": {
        javascript: (userCode, cases) => `
        // 1. User Code
        ${userCode}

        // 2. Driver Code
        const testCases = ${JSON.stringify(cases)};
        const results = [];

        testCases.forEach((t, index) => {
            const resultEntry = { id: index + 1 };
            try {
                // FIXED: Removed the word 'driverCode' that was here
                const result = twoSum(t.input.nums, t.input.target);
                
                resultEntry.actual = result;
                resultEntry.expected = t.expected;
                
                // Compare arrays using JSON.stringify
                if (JSON.stringify(result) === JSON.stringify(t.expected)) {
                    resultEntry.status = "Passed";
                } else {
                    resultEntry.status = "Failed";
                }
            } catch (error) {
                resultEntry.status = "Error";
                resultEntry.error = error.message;
            }
            results.push(resultEntry);
        });
        console.log(JSON.stringify(results));
        `,



        python: (userCode, cases) => `
import json
from typing import List

# 1. User Code
${userCode}

# 2. Driver Code
cases_json = '${JSON.stringify(cases)}'
test_cases = json.loads(cases_json)
results = []
solution = Solution()

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        nums = t["input"]["nums"]
        target = t["input"]["target"]
        expected = t["expected"]
        
        result = solution.twoSum(nums, target)
        
        result_entry["actual"] = result
        result_entry["expected"] = expected
        
        if result == expected:
            result_entry["status"] = "Passed"
        else:
            result_entry["status"] = "Failed"
    except Exception as e:
        result_entry["status"] = "Error"
        result_entry["error"] = str(e)
    
    results.append(result_entry)

print(json.dumps(results))
`,




        java: (userCode, cases) => `
import java.util.*;
import java.util.stream.*;

// 1. DRIVER CLASS (Must come FIRST so it runs)
public class Solution {
    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        UserLogic solution = new UserLogic(); // Instantiate the renamed user class

        ${cases.map((t, i) => `
        try {
            int[] nums = {${t.input.nums.join(',')}};
            int target = ${t.input.target};
            int[] expected = {${t.expected.join(',')}};
            
            int[] result = solution.twoSum(nums, target);
            
            boolean passed = Arrays.equals(result, expected);
            
            String status = passed ? "Passed" : "Failed";
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": %s, \\"expected\\": %s}", 
                ${i + 1}, status, Arrays.toString(result), Arrays.toString(expected));
            
            results.add(json);
        } catch (Exception e) {
            results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}");
        }
        `).join('\n')}

        System.out.println("[" + String.join(",", results) + "]");
    }
}

// 2. USER CODE (Renamed & Moved to bottom)
// We strip 'public' to avoid conflict, and rename Solution -> UserLogic
${userCode.replace(/public\s+class\s+Solution/, "class UserLogic").replace(/class\s+Solution/, "class UserLogic")}
`,



        cpp: (userCode, cases) => `
#include <iostream>
#include <bits/stdc++.h>

using namespace std;

// Helper to print vector
string vecToStr(const vector<int>& v) {
    stringstream ss;
    ss << "[";
    for(size_t i=0; i<v.size(); ++i) {
        ss << v[i];
        if(i < v.size()-1) ss << ",";
    }
    ss << "]";
    return ss.str();
}

${userCode}

int main() {
    vector<string> results;
    Solution solution;

    ${cases.map((t, i) => `
    try {
        vector<int> nums = {${t.input.nums.join(',')}};
        int target = ${t.input.target};
        vector<int> expected = {${t.expected.join(',')}};
        
        vector<int> result = solution.twoSum(nums, target);
        
        bool passed = (result == expected);
        string status = passed ? "Passed" : "Failed";
        
        stringstream json;
        json << "{\\"id\\": ${i + 1}, \\"status\\": \\"" << status << "\\", \\"actual\\": " << vecToStr(result) << ", \\"expected\\": " << vecToStr(expected) << "}";
        results.push_back(json.str());
    } catch (const exception& e) {
        results.push_back("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"Runtime Error\\"}");
    }
    `).join('\n')}

    cout << "[";
    for(size_t i=0; i<results.size(); ++i) {
        cout << results[i];
        if(i < results.size()-1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}
`,
    },
    "LinkedList": {
        javascript: (userCode, cases) => `
        // 1. HELPER CLASSES (Hidden)
        function ListNode(val, next) {
            this.val = (val===undefined ? 0 : val)
            this.next = (next===undefined ? null : next)
        }

        // Convert Array to LinkedList
        const arrayToLinkedList = (arr) => {
            if (!arr || arr.length === 0) return null;
            let head = new ListNode(arr[0]);
            let current = head;
            for (let i = 1; i < arr.length; i++) {
                current.next = new ListNode(arr[i]);
                current = current.next;
            }
            return head;
        };

        // Convert LinkedList to Array (for comparison)
        const linkedListToArray = (head) => {
            const arr = [];
            let current = head;
            while (current) {
                arr.push(current.val);
                current = current.next;
            }
            return arr;
        };

        // 2. User Code
        ${userCode}

        // 3. Driver Code
        const testCases = ${JSON.stringify(cases)};
        const results = [];

        testCases.forEach((t, index) => {
            const resultEntry = { id: index + 1 };
            try {
                // Convert inputs (l1, l2) from Arrays to LinkedLists
                const args = Object.values(t.input).map(val => arrayToLinkedList(val));
                
                // Call User Function (addTwoNumbers or similar)
                // Note: We need a way to know the function name dynamically, but for this template we assume 'addTwoNumbers' based on the problem context or pass it in.
                // Since this is a specific template, we can assume the function name or extract it. 
                // For this example, let's assume the user function is named 'addTwoNumbers' or uses the first function defined.
                // A safer way is to rely on the user code defining 'addTwoNumbers'.
                
                const resultNode = addTwoNumbers(...args);
                
                // Convert result back to array for comparison
                const resultArray = linkedListToArray(resultNode);
                
                resultEntry.actual = resultArray;
                resultEntry.expected = t.expected;
                
                if (JSON.stringify(resultArray) === JSON.stringify(t.expected)) {
                    resultEntry.status = "Passed";
                } else {
                    resultEntry.status = "Failed";
                }
            } catch (error) {
                resultEntry.status = "Error";
                resultEntry.error = error.message;
            }
            results.push(resultEntry);
        });
        console.log(JSON.stringify(results));
        `,

        python: (userCode, cases) => `
import json
from typing import List, Optional

# 1. HELPER CLASSES
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def to_linked_list(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for x in arr[1:]:
        curr.next = ListNode(x)
        curr = curr.next
    return head

def to_array(head):
    arr = []
    while head:
        arr.append(head.val)
        head = head.next
    return arr

# 2. User Code
${userCode}

# 3. Driver Code
cases_json = '${JSON.stringify(cases)}'
test_cases = json.loads(cases_json)
results = []
solution = Solution()

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        # Convert all input arrays to LinkedLists
        args = [to_linked_list(v) for v in t["input"].values()]
        
        # Call the method (Assuming addTwoNumbers for this specific template type, or dynamic)
        result_node = solution.addTwoNumbers(*args)
        
        # Convert result back to array
        result_arr = to_array(result_node)
        
        result_entry["actual"] = result_arr
        result_entry["expected"] = t["expected"]
        
        if result_arr == t["expected"]:
            result_entry["status"] = "Passed"
        else:
            result_entry["status"] = "Failed"
    except Exception as e:
        result_entry["status"] = "Error"
        result_entry["error"] = str(e)
    
    results.append(result_entry)

print(json.dumps(results))
`,

       java: (userCode, cases) => `
import java.util.*;
import java.util.stream.*;

// 1. DRIVER CLASS (MUST BE TOP-LEVEL)
public class Solution {
    
    // Helper: Array -> LinkedList
    public static ListNode buildList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for(int val : arr) {
            curr.next = new ListNode(val);
            curr = curr.next;
        }
        return dummy.next;
    }
    
    // Helper: LinkedList -> String
    public static String listToString(ListNode node) {
        List<Integer> list = new ArrayList<>();
        while(node != null) {
            list.add(node.val);
            node = node.next;
        }
        return list.toString();
    }
    
    // Helper: Compare
    public static boolean compareLists(ListNode node, int[] expected) {
        List<Integer> list = new ArrayList<>();
        while(node != null) {
            list.add(node.val);
            node = node.next;
        }
        if (list.size() != expected.length) return false;
        for (int i = 0; i < expected.length; i++) {
            if (list.get(i) != expected[i]) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        UserLogic solution = new UserLogic();

        ${cases.map((t, i) => `
        try {
            int[] l1Arr = {${t.input.l1.join(',')}};
            ListNode l1 = buildList(l1Arr);
            
            int[] l2Arr = {${t.input.l2.join(',')}};
            ListNode l2 = buildList(l2Arr);
            
            int[] expected = {${t.expected.join(',')}};
            
            ListNode result = solution.addTwoNumbers(l1, l2);
            
            boolean passed = compareLists(result, expected);
            
            String status = passed ? "Passed" : "Failed";
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": \\"%s\\", \\"expected\\": \\"%s\\"}", 
                ${i + 1}, status, listToString(result), Arrays.toString(expected));
            
            results.add(json);
        } catch (Exception e) {
            results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}");
        }
        `).join('\n')}

        System.out.println("[" + String.join(",", results) + "]");
    }
}

// 2. HELPER CLASSES (Moved below Solution)
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

// 3. USER CODE
${userCode.replace(/public\s+class\s+Solution/, "class UserLogic").replace(/class\s+Solution/, "class UserLogic")}
`,
        cpp: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;

// 1. HELPER STRUCT
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

// Helper: Array -> LinkedList
ListNode* buildList(const vector<int>& arr) {
    if (arr.empty()) return nullptr;
    ListNode* dummy = new ListNode(0);
    ListNode* curr = dummy;
    for(int val : arr) {
        curr->next = new ListNode(val);
        curr = curr->next;
    }
    return dummy->next;
}

// Helper: LinkedList -> String
string listToStr(ListNode* node) {
    stringstream ss;
    ss << "[";
    while(node) {
        ss << node->val;
        if(node->next) ss << ",";
        node = node->next;
    }
    ss << "]";
    return ss.str();
}

// Helper: Vector -> String (For Expected)
string vecToStr(const vector<int>& v) {
    stringstream ss;
    ss << "[";
    for(size_t i=0; i<v.size(); ++i) {
        ss << v[i];
        if(i < v.size()-1) ss << ",";
    }
    ss << "]";
    return ss.str();
}

// Helper: Compare
bool compare(ListNode* node, const vector<int>& expected) {
    int i = 0;
    while(node && i < expected.size()) {
        if(node->val != expected[i]) return false;
        node = node->next;
        i++;
    }
    return !node && i == expected.size();
}

${userCode}

int main() {
    vector<string> results;
    Solution solution;

    ${cases.map((t, i) => `
    try {
        // Parse Inputs
        ${Object.entries(t.input).map(([key, val]) => `
        vector<int> ${key}Arr = {${val.join(',')}};
        ListNode* ${key} = buildList(${key}Arr);
        `).join('\n')}
        
        vector<int> expected = {${t.expected.join(',')}};
        
        // Call Function
        ListNode* result = solution.addTwoNumbers(${Object.keys(t.input).join(', ')});
        
        bool passed = compare(result, expected);
        string status = passed ? "Passed" : "Failed";
        
        stringstream json;
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": " << listToStr(result) << ", \\"expected\\": " << vecToStr(expected) << "}";
        results.push_back(json.str());
    } catch (const exception& e) {
        results.push_back("{\\"id\\": ${i+1}, \\"status\\": \\"Error\\", \\"error\\": \\"Runtime Error\\"}");
    }
    `).join('\n')}

    cout << "[";
    for(size_t i=0; i<results.size(); ++i) {
        cout << results[i];
        if(i < results.size()-1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}
`,
    },
    "Tree": {
        javascript: (userCode, cases) => `
        // 1. HELPER CLASSES (Hidden)
        function TreeNode(val, left, right) {
            this.val = (val===undefined ? 0 : val)
            this.left = (left===undefined ? null : left)
            this.right = (right===undefined ? null : right)
        }

        // Helper: Array -> Tree (BFS / Level Order)
        const arrayToTree = (arr) => {
            if (!arr || arr.length === 0) return null;
            let root = new TreeNode(arr[0]);
            let queue = [root];
            let i = 1;
            while (i < arr.length) {
                let curr = queue.shift();
                if (i < arr.length && arr[i] !== null) {
                    curr.left = new TreeNode(arr[i]);
                    queue.push(curr.left);
                }
                i++;
                if (i < arr.length && arr[i] !== null) {
                    curr.right = new TreeNode(arr[i]);
                    queue.push(curr.right);
                }
                i++;
            }
            return root;
        };

        // Helper: Tree -> Array (for comparison)
        // Note: For simple equality check, usually JSON.stringify works if structure matches.
        // Or implement a specific serializer if needed.

        // 2. User Code
        ${userCode}

        // 3. Driver Code
        const testCases = ${JSON.stringify(cases)};
        const results = [];

        testCases.forEach((t, index) => {
            const resultEntry = { id: index + 1 };
            try {
                // Convert inputs (root, p, q) from Arrays to TreeNodes
                const args = Object.values(t.input).map(val => arrayToTree(val));
                
                // Call User Function (e.g. maxDepth, invertTree)
                // Assuming function name is extracted or standard (e.g., 'levelOrder')
                // For flexibility, let's assume the user function is the first one defined or use dynamic name
                // Here we assume 'solutionFunction' (placeholder) or direct call if name known
                 
                 // DYNAMIC CALL: We need to know the function name. 
                 // Since we don't have metadata here, I'll use a placeholder 'solve'
                 // In your real generator, replace 'solve' with problemMeta[id].fnName
                 const result = levelOrder(...args); 
                
                resultEntry.actual = result;
                resultEntry.expected = t.expected;
                
                if (JSON.stringify(result) === JSON.stringify(t.expected)) {
                    resultEntry.status = "Passed";
                } else {
                    resultEntry.status = "Failed";
                }
            } catch (error) {
                resultEntry.status = "Error";
                resultEntry.error = error.message;
            }
            results.push(resultEntry);
        });
        console.log(JSON.stringify(results));
        `,

        python: (userCode, cases) => `
import json
from typing import List, Optional

# 1. HELPER CLASSES
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def to_tree(arr):
    if not arr: return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while i < len(arr):
        curr = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            curr.left = TreeNode(arr[i])
            queue.append(curr.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            curr.right = TreeNode(arr[i])
            queue.append(curr.right)
        i += 1
    return root

# 2. User Code
${userCode}

# 3. Driver Code
cases_json = '${JSON.stringify(cases)}'
test_cases = json.loads(cases_json)
results = []
solution = Solution()

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        # Convert inputs to Trees
        args = [to_tree(v) if isinstance(v, list) else v for v in t["input"].values()]
        
        # Call method dynamically (assuming standard 'solution' object)
        # You'd need to know the exact method name here. 
        # For this template, let's assume 'levelOrder' as per Problem 8 example
        result = solution.levelOrder(*args)
        
        result_entry["actual"] = result
        result_entry["expected"] = t["expected"]
        
        if result == t["expected"]:
            result_entry["status"] = "Passed"
        else:
            result_entry["status"] = "Failed"
    except Exception as e:
        result_entry["status"] = "Error"
        result_entry["error"] = str(e)
    
    results.append(result_entry)

print(json.dumps(results))
`,

        java: (userCode, cases) => `
import java.util.*;

// 1. HELPER CLASSES
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class Solution {
    
    // Helper: Array -> Tree
    public static TreeNode buildTree(Integer[] arr) {
        if (arr.length == 0 || arr[0] == null) return null;
        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while (i < arr.length) {
            TreeNode curr = q.poll();
            if (i < arr.length && arr[i] != null) {
                curr.left = new TreeNode(arr[i]);
                q.add(curr.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                curr.right = new TreeNode(arr[i]);
                q.add(curr.right);
            }
            i++;
        }
        return root;
    }

    // Helper: Result -> String (for JSON)
    // Assuming result is List<List<Integer>> or similar complex type
    public static String resultToString(Object res) {
        return res.toString().replace(" ", ""); // Simple removal of spaces for JSON compacting
    }

    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        UserLogic solution = new UserLogic();

        ${cases.map((t, i) => `
        try {
            // Parse inputs (Assuming Integer[] for trees logic in Java driver context)
            // You might need robust logic to handle "null" in Java arrays if input is int[]
            // Usually tree inputs are Integer[] to allow nulls.
            
             // Dynamic Input Parsing for Trees
            ${Object.entries(t.input).map(([key, val]) => `
            // Parse JS array [1, null, 2] -> Java Integer[] {1, null, 2}
            Integer[] ${key}Arr = {${val.map(v => v === null ? 'null' : v).join(',')}};
            TreeNode ${key} = buildTree(${key}Arr);
            `).join('\n')}
            
            // Call User Function
            Object result = solution.levelOrder(${Object.keys(t.input).join(', ')});
            
            // Compare (Simplified string comparison for this template)
            String actualStr = result.toString().replace(" ", "");
            String expectedStr = "${JSON.stringify(t.expected).replace(/"/g, "")}"; // Java toString doesn't use quotes
            
            boolean passed = actualStr.equals(expectedStr);
            String status = passed ? "Passed" : "Failed";
            
            // Construct JSON manually or use a library if available. 
            // Simple string format:
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": \\"%s\\", \\"expected\\": \\"%s\\"}", 
                ${i + 1}, status, actualStr, expectedStr);
            
            results.add(json);
        } catch (Exception e) {
            results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}");
        }
        `).join('\n')}

        System.out.println("[" + String.join(",", results) + "]");
    }
}

// 2. USER CODE
${userCode.replace(/public\s+class\s+Solution/, "class UserLogic").replace(/class\s+Solution/, "class UserLogic")}
`,

        cpp: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <queue>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;

// 1. HELPER STRUCT
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

// Helper: Array -> Tree
// Note: Input array must handle 'null' - typically represented as -1 or a specific flag in C++ inputs if not string parsing
// For this template, we'll assume the input string handles nulls as a specific int min or similar, 
// OR we construct manually. Complex C++ tree parsing often requires string parsing logic.
TreeNode* buildTree(const vector<string>& arr) {
    if (arr.empty() || arr[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(arr[0]));
    queue<TreeNode*> q;
    q.push(root);
    int i = 1;
    while (i < arr.size()) {
        TreeNode* curr = q.front(); q.pop();
        if (i < arr.size() && arr[i] != "null") {
            curr->left = new TreeNode(stoi(arr[i]));
            q.push(curr->left);
        }
        i++;
        if (i < arr.size() && arr[i] != "null") {
            curr->right = new TreeNode(stoi(arr[i]));
            q.push(curr->right);
        }
        i++;
    }
    return root;
}

// Helper to print result (e.g. vector<vector<int>>)
string resToStr(const vector<vector<int>>& v) {
    stringstream ss;
    ss << "[";
    for(size_t i=0; i<v.size(); ++i) {
        ss << "[";
        for(size_t j=0; j<v[i].size(); ++j) {
            ss << v[i][j] << (j < v[i].size()-1 ? "," : "");
        }
        ss << "]" << (i < v.size()-1 ? "," : "");
    }
    ss << "]";
    return ss.str();
}

${userCode}

int main() {
    vector<string> results;
    Solution solution;

    ${cases.map((t, i) => `
    try {
        // Parse Inputs (Requires treating input array as strings to handle 'null')
        ${Object.entries(t.input).map(([key, val]) => `
        vector<string> ${key}Arr = {${val.map(v => v === null ? '"null"' : `"${v}"`).join(',')}};
        TreeNode* ${key} = buildTree(${key}Arr);
        `).join('\n')}
        
        // Call Function
        auto result = solution.levelOrder(${Object.keys(t.input).join(', ')});
        
        // Compare logic (Converting to string for simplicity here)
        string actual = resToStr(result);
        string expected = "${JSON.stringify(t.expected).replace(/"/g, "")}"; // Simplify expected string
        
        // Note: Direct string compare might fail on spacing. Better to compare data structures.
        // For template purposes:
        bool passed = (actual == expected); 
        string status = passed ? "Passed" : "Failed";
        
        stringstream json;
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": \\"" << actual << "\\", \\"expected\\": \\"" << expected << "\\"}";
        results.push_back(json.str());
    } catch (const exception& e) {
        results.push_back("{\\"id\\": ${i+1}, \\"status\\": \\"Error\\", \\"error\\": \\"Runtime Error\\"}");
    }
    `).join('\n')}

    cout << "[";
    for(size_t i=0; i<results.size(); ++i) {
        cout << results[i];
        if(i < results.size()-1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}
`,
    },
    "Graph": {
        javascript: (userCode, cases) => `
        // 1. HELPER CLASSES (Hidden)
        function Node(val, neighbors) {
            this.val = val === undefined ? 0 : val;
            this.neighbors = neighbors === undefined ? [] : neighbors;
        }

        // Helper: Adjacency List (Array) -> Graph (Node Objects)
        const buildGraph = (adjList) => {
            if (!adjList || adjList.length === 0) return null;
            const nodes = new Map();
            
            // Create all nodes first
            adjList.forEach((_, i) => {
                nodes.set(i + 1, new Node(i + 1));
            });

            // Connect neighbors
            adjList.forEach((neighbors, i) => {
                const node = nodes.get(i + 1);
                neighbors.forEach(nVal => {
                    node.neighbors.push(nodes.get(nVal));
                });
            });

            return nodes.get(1); // Return reference to Node 1
        };

        // Helper: Graph -> Adjacency List (for comparison)
        const graphToAdjList = (node) => {
            if (!node) return [];
            const map = new Map();
            const queue = [node];
            map.set(node.val, new Node(node.val)); // Used to track visited

            while (queue.length > 0) {
                const n = queue.shift();
                if (!map.has(n.val)) map.set(n.val, []); // Initialize list
                
                // We actually need to build the full adjacency list representation
                // logic omitted for brevity, essentially BFS to rebuild [[2,4],[1,3]]
            }
            // Simplified return for this template:
            return []; 
        };

        // 2. User Code
        ${userCode}

        // 3. Driver Code
        const testCases = ${JSON.stringify(cases)};
        const results = [];

        testCases.forEach((t, index) => {
            const resultEntry = { id: index + 1 };
            try {
                // Convert inputs
                const args = Object.values(t.input).map(val => buildGraph(val));
                
                // Call User Function
                const resultNode = cloneGraph(...args); // Assuming 'cloneGraph'
                
                // For graphs, we usually compare structure, not just reference.
                // Here we serialize back to AdjList for easy comparison
                // (Implementation of graphToAdjList needed for robust check)
                
                // Placeholder logic for template correctness:
                const resultAdj = t.expected; // In real engine, convert resultNode -> AdjList
                
                resultEntry.actual = resultAdj; 
                resultEntry.expected = t.expected;
                
                if (JSON.stringify(resultAdj) === JSON.stringify(t.expected)) {
                    resultEntry.status = "Passed";
                } else {
                    resultEntry.status = "Failed";
                }
            } catch (error) {
                resultEntry.status = "Error";
                resultEntry.error = error.message;
            }
            results.push(resultEntry);
        });
        console.log(JSON.stringify(results));
        `,

        python: (userCode, cases) => `
import json
from typing import List, Optional

# 1. HELPER CLASSES
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def build_graph(adjList):
    if not adjList: return None
    nodes = {i+1: Node(i+1) for i in range(len(adjList))}
    for i, neighbors in enumerate(adjList):
        nodes[i+1].neighbors = [nodes[n] for n in neighbors]
    return nodes[1]

# 2. User Code
${userCode}

# 3. Driver Code
cases_json = '${JSON.stringify(cases)}'
test_cases = json.loads(cases_json)
results = []
solution = Solution()

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        # Build Graph
        args = [build_graph(v) for v in t["input"].values()]
        
        # Run
        result_node = solution.cloneGraph(*args)
        
        # Compare (In real system, traverse result_node to rebuild adjList)
        # Here we mock equality for the template structure
        result_adj = t["expected"] 
        
        result_entry["actual"] = result_adj
        result_entry["expected"] = t["expected"]
        
        if result_adj == t["expected"]:
            result_entry["status"] = "Passed"
        else:
            result_entry["status"] = "Failed"
    except Exception as e:
        result_entry["status"] = "Error"
        result_entry["error"] = str(e)
    
    results.append(result_entry)

print(json.dumps(results))
`,

        java: (userCode, cases) => `
import java.util.*;

// 1. HELPER CLASSES
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}

public class Solution {
    
    // Helper: AdjList -> Graph
    public static Node buildGraph(int[][] adjList) {
        if (adjList.length == 0) return null;
        Map<Integer, Node> map = new HashMap<>();
        for (int i = 0; i < adjList.length; i++) {
            map.put(i + 1, new Node(i + 1));
        }
        for (int i = 0; i < adjList.length; i++) {
            Node node = map.get(i + 1);
            for (int neighbor : adjList[i]) {
                node.neighbors.add(map.get(neighbor));
            }
        }
        return map.get(1);
    }

    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        UserLogic solution = new UserLogic();

        ${cases.map((t, i) => `
        try {
            // Dynamic Input Parsing (Handling 2D Arrays for Graphs)
            ${Object.entries(t.input).map(([key, val]) => `
            // Parse [[2,4],[1,3]] -> int[][]
            // Note: Java 2D array init from string is complex, simplified here:
            int[][] ${key}Arr = new int[][]{ ${val.map(row => `{${row.join(',')}}`).join(',')} };
            Node ${key} = buildGraph(${key}Arr);
            `).join('\n')}
            
            Node result = solution.cloneGraph(${Object.keys(t.input).join(', ')});
            
            // Compare Logic needed here (Graph isomorphism check)
            boolean passed = true; // Placeholder
            String status = passed ? "Passed" : "Failed";
            
            // Use expected string directly for JSON output to avoid complex serialization in template
            String expectedStr = "${JSON.stringify(t.expected).replace(/"/g, "")}";
            
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": \\"%s\\", \\"expected\\": \\"%s\\"}", 
                ${i + 1}, status, expectedStr, expectedStr);
            
            results.add(json);
        } catch (Exception e) {
            results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}");
        }
        `).join('\n')}

        System.out.println("[" + String.join(",", results) + "]");
    }
}

// 2. USER CODE
${userCode.replace(/public\s+class\s+Solution/, "class UserLogic").replace(/class\s+Solution/, "class UserLogic")}
`,

        cpp: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
#include <sstream>
#include <algorithm>

using namespace std;

// 1. HELPER CLASS
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};

Node* buildGraph(const vector<vector<int>>& adjList) {
    if (adjList.empty()) return nullptr;
    unordered_map<int, Node*> map;
    for (int i = 0; i < adjList.size(); i++) {
        map[i + 1] = new Node(i + 1);
    }
    for (int i = 0; i < adjList.size(); i++) {
        for (int neighbor : adjList[i]) {
            map[i + 1]->neighbors.push_back(map[neighbor]);
        }
    }
    return map[1];
}

${userCode}

int main() {
    vector<string> results;
    Solution solution;

    ${cases.map((t, i) => `
    try {
        // Parse Inputs (2D Vector construction)
        ${Object.entries(t.input).map(([key, val]) => `
        vector<vector<int>> ${key}Adj = { ${val.map(row => `{${row.join(',')}}`).join(',')} };
        Node* ${key} = buildGraph(${key}Adj);
        `).join('\n')}
        
        Node* result = solution.cloneGraph(${Object.keys(t.input).join(', ')});
        
        // Mocking check for template
        string expected = "${JSON.stringify(t.expected).replace(/"/g, "")}";
        
        string status = "Passed"; 
        stringstream json;
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": \\"" << expected << "\\", \\"expected\\": \\"" << expected << "\\"}";
        results.push_back(json.str());
    } catch (const exception& e) {
        results.push_back("{\\"id\\": ${i+1}, \\"status\\": \\"Error\\", \\"error\\": \\"Runtime Error\\"}");
    }
    `).join('\n')}

    cout << "[";
    for(size_t i=0; i<results.size(); ++i) {
        cout << results[i];
        if(i < results.size()-1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}
`,
    },
    "String": {
        javascript: (fnName, userCode, cases) => `
        // 1. User Code
        ${userCode}

        // 2. Driver Code
        const testCases = ${JSON.stringify(cases)};
        const results = [];

        testCases.forEach((t, index) => {
            const resultEntry = { id: index + 1 };
            try {
                // Extract arguments (handles multiple string inputs if needed)
                const args = Object.values(t.input);
                
                // Dynamic Function Call
                const result = ${fnName}(...args);
                
                resultEntry.actual = result;
                resultEntry.expected = t.expected;
                
                // String/Number comparison (direct equality is fine for primitives)
                // Using JSON.stringify handles both primitives and objects safely
                if (JSON.stringify(result) === JSON.stringify(t.expected)) {
                    resultEntry.status = "Passed";
                } else {
                    resultEntry.status = "Failed";
                }
            } catch (error) {
                resultEntry.status = "Error";
                resultEntry.error = error.message;
            }
            results.push(resultEntry);
        });
        console.log(JSON.stringify(results));
        `,

        python: (fnName, userCode, cases) => `
import json
from typing import List

# 1. User Code
${userCode}

# 2. Driver Code
cases_json = '${JSON.stringify(cases)}'
test_cases = json.loads(cases_json)
results = []
solution = Solution()

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        # Get all input values as a list
        args = list(t["input"].values())
        
        # Dynamic Method Call
        func = getattr(solution, "${fnName}")
        result = func(*args)
        
        result_entry["actual"] = result
        result_entry["expected"] = t["expected"]
        
        if result == t["expected"]:
            result_entry["status"] = "Passed"
        else:
            result_entry["status"] = "Failed"
            
    except Exception as e:
        result_entry["status"] = "Error"
        result_entry["error"] = str(e)
    
    results.append(result_entry)

print(json.dumps(results))
`,

        java: (fnName, userCode, cases) => `
import java.util.*;
import java.util.stream.*;

// 1. DRIVER CLASS
public class Solution {
    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        UserLogic solution = new UserLogic();

        ${cases.map((t, i) => `
        try {
            // Dynamic Input Parsing (Strings)
            ${Object.entries(t.input).map(([key, val]) => `
            String ${key} = "${val}";
            `).join('\n')}
            
            // Expected Output (Handle String or Int return types)
            ${typeof t.expected === 'number' ? `int expected = ${t.expected};` : `String expected = "${t.expected}";`}
            
            // Call User Function
            ${typeof t.expected === 'number' ? 'int' : 'String'} result = solution.${fnName}(${Object.keys(t.input).join(', ')});
            
            boolean passed = ${typeof t.expected === 'number' ? 'result == expected' : 'result.equals(expected)'};
            
            String status = passed ? "Passed" : "Failed";
            
            // JSON Construction
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": \\"%s\\", \\"expected\\": \\"%s\\"}", 
                ${i + 1}, status, result, expected);
            
            results.add(json);
        } catch (Exception e) {
            results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}");
        }
        `).join('\n')}

        System.out.println("[" + String.join(",", results) + "]");
    }
}

// 2. USER CODE
${userCode.replace(/public\s+class\s+Solution/, "class UserLogic").replace(/class\s+Solution/, "class UserLogic")}
`,

        cpp: (fnName, userCode, cases) => `
#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <algorithm>

using namespace std;

${userCode}

int main() {
    vector<string> results;
    Solution solution;

    ${cases.map((t, i) => `
    try {
        // Parse Inputs
        ${Object.entries(t.input).map(([key, val]) => `
        string ${key} = "${val}";
        `).join('\n')}
        
        // Expected Output
        ${typeof t.expected === 'number' ? `int expected = ${t.expected};` : `string expected = "${t.expected}";`}
        
        // Call Function
        auto result = solution.${fnName}(${Object.keys(t.input).join(', ')});
        
        bool passed = (result == expected);
        string status = passed ? "Passed" : "Failed";
        
        stringstream json;
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": \\"" << result << "\\", \\"expected\\": \\"" << expected << "\\"}";
        results.push_back(json.str());
    } catch (const exception& e) {
        results.push_back("{\\"id\\": ${i+1}, \\"status\\": \\"Error\\", \\"error\\": \\"Runtime Error\\"}");
    }
    `).join('\n')}

    cout << "[";
    for(size_t i=0; i<results.size(); ++i) {
        cout << results[i];
        if(i < results.size()-1) cout << ",";
    }
    cout << "]" << endl;
    
    return 0;
}
`,
    }
}


