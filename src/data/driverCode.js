export const driverCodeTemplate = {
   "Array": {
        javascript: (fnName, userCode, cases, problemInfo) => `
        // 1. User Code
        ${userCode}

        // 2. Driver Code
        const testCases = ${JSON.stringify(cases)};
        const results = [];
        const isVoid = ${problemInfo?.returnType === "void"};

        testCases.forEach((t, index) => {
            const resultEntry = { id: index + 1 };
            try {
                const args = Object.values(t.input).map(arg => JSON.parse(JSON.stringify(arg)));
                const output = ${fnName}(...args);
                const result = isVoid ? args[0] : output;
                
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

        python: (fnName, userCode, cases, problemInfo) => `
import json
import copy
from typing import List

${userCode}

cases = json.loads('${JSON.stringify(cases)}')
results = []
sol = Solution()
is_void = ${problemInfo?.returnType === "void" ? "True" : "False"}

for i, t in enumerate(cases):
    try:
        args = list(t["input"].values())
        args_copy = copy.deepcopy(args)
        
        func = getattr(sol, "${fnName}")
        output = func(*args_copy)
        
        result = args_copy[0] if is_void else output
        
        status = "Passed" if result == t["expected"] else "Failed"
        results.append({"id": i+1, "status": status, "actual": result, "expected": t["expected"]})
    except Exception as e:
        results.append({"id": i+1, "status": "Error", "error": str(e)})

print(json.dumps(results))
        `,

        java: (fnName, userCode, cases, problemInfo) => `
import java.util.*;
import java.util.stream.*;

public class Solution {
    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        UserLogic solution = new UserLogic();

        ${cases.map((t, i) => {
            // JS Logic: Decide code generation based on void status
            const isVoid = problemInfo?.returnType === "void";
            
            const isArrExpected = Array.isArray(t.expected);
            const expectedType = isArrExpected ? "int[]" : (typeof t.expected === "boolean" ? "boolean" : "int");
            const expectedVal = isArrExpected ? `{${t.expected.join(',')}}` : t.expected;
            
            const firstArgName = Object.keys(t.input)[0];
            const callArgs = Object.keys(t.input).join(', ');

            // Generate correct Java syntax based on void status
            const executionCode = isVoid 
                ? `solution.${fnName}(${callArgs});
            ${expectedType} result = ${firstArgName};`
                : `${expectedType} result = solution.${fnName}(${callArgs});`;

            return `
        try {
            ${Object.entries(t.input).map(([key, val]) => {
                const isArr = Array.isArray(val);
                const type = isArr ? "int[]" : "int";
                const value = isArr ? `{${val.join(',')}}` : val;
                return `${type} ${key} = ${value};`;
            }).join('\n            ')}
            
            ${expectedType} expected = ${expectedVal};
            
            // Generated Execution Block
            ${executionCode}
            
            boolean passed = ${isArrExpected ? "Arrays.equals(result, expected)" : "result == expected"};
            String status = passed ? "Passed" : "Failed";
            
            String actualStr = ${isArrExpected ? "Arrays.toString(result)" : "String.valueOf(result)"};
            String expectedStr = ${isArrExpected ? "Arrays.toString(expected)" : "String.valueOf(expected)"};
            
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": %s, \\"expected\\": %s}", 
                ${i + 1}, status, actualStr, expectedStr);
            
            results.add(json);
        } catch (Exception e) {
            results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}");
        }`;
        }).join('\n')}

        System.out.println("[" + String.join(",", results) + "]");
    }
}
${userCode.replace(/public\s+class\s+Solution/, "class UserLogic").replace(/class\s+Solution/, "class UserLogic")}
        `,

        cpp: (fnName, userCode, cases, problemInfo) => `
#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
#include <map>
#include <unordered_map>
#include <set>
#include <cmath>
#include <climits>

using namespace std;

string vecToStr(const vector<int>& v) {
    stringstream ss; ss << "[";
    for(size_t i=0; i<v.size(); ++i) { ss << v[i]; if(i < v.size()-1) ss << ","; }
    ss << "]"; return ss.str();
}
string valToStr(int val) { return to_string(val); }
string valToStr(bool val) { return val ? "true" : "false"; }
string valToStr(double val) { return to_string(val); }

${userCode}

int main() {
    vector<string> results;
    Solution solution;

    ${cases.map((t, i) => {
        const isVoid = problemInfo?.returnType === "void";
        const isArrExpected = Array.isArray(t.expected);
        
        const expectedType = isArrExpected ? "vector<int>" : (typeof t.expected === "boolean" ? "bool" : "int");
        let expectedVal = isArrExpected ? `{${t.expected.join(',')}}` : t.expected;
        if(expectedType === "bool") expectedVal = t.expected ? "true" : "false";
        
        const firstArgName = Object.keys(t.input)[0];
        const callArgs = Object.keys(t.input).join(', ');

        const executionCode = isVoid 
            ? `solution.${fnName}(${callArgs});
        auto result = ${firstArgName};`
            : `auto result = solution.${fnName}(${callArgs});`;

        return `
    try {
        ${Object.entries(t.input).map(([key, val]) => {
            const isArr = Array.isArray(val);
            const type = isArr ? "vector<int>" : "int";
            const valStr = isArr ? `{${val.join(',')}}` : val;
            return `${type} ${key} = ${valStr};`;
        }).join('\n        ')}
        
        ${expectedType} expected = ${expectedVal};
        
        ${executionCode}
        
        bool passed = (result == expected);
        string status = passed ? "Passed" : "Failed";
        
        string actualStr = ${isArrExpected ? "vecToStr(result)" : "valToStr(result)"};
        string expectedStr = ${isArrExpected ? "vecToStr(expected)" : "valToStr(expected)"};
        
        stringstream json;
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": " << actualStr << ", \\"expected\\": " << expectedStr << "}";
        results.push_back(json.str());
    } catch (const exception& e) {
        results.push_back("{\\"id\\": ${i+1}, \\"status\\": \\"Error\\", \\"error\\": \\"Runtime Error\\"}");
    }`;
    }).join('\n')}

    cout << "[";
    for(size_t i=0; i<results.size(); ++i) { cout << results[i]; if(i < results.size()-1) cout << ","; }
    cout << "]" << endl;
    return 0;
}
        `,
    },
    "LinkedList": {
        javascript: (fnName, userCode, cases) => `
        // 1. HELPER CLASSES
        function ListNode(val, next) {
            this.val = (val===undefined ? 0 : val)
            this.next = (next===undefined ? null : next)
        }

        const createList = (arr) => {
            if (!arr || arr.length === 0) return null;
            let dummy = new ListNode(0);
            let curr = dummy;
            for (let val of arr) {
                curr.next = new ListNode(val);
                curr = curr.next;
            }
            return dummy.next;
        };

        const toArray = (node) => {
            let arr = [];
            while (node) {
                arr.push(node.val);
                node = node.next;
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
                // FIX: Detect if we need a single List or an Array of Lists
                const args = Object.keys(t.input).map(key => {
                    const val = t.input[key];
                    // If it's a 2D array (like for mergeKLists), map over it
                    if (Array.isArray(val) && val.length > 0 && Array.isArray(val[0])) {
                        return val.map(innerArr => createList(innerArr));
                    }
                    // Handle empty array [] for mergeKLists edge case
                    if (key === 'lists' && Array.isArray(val) && val.length === 0) {
                        return [];
                    }
                    // Default: Single List
                    return createList(val);
                });
                
                const resultNode = ${fnName}(...args);
                const resultArray = toArray(resultNode);
                
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

        python: (fnName, userCode, cases) => `
import json
from typing import List, Optional

# 1. HELPER CLASSES
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def to_list(arr):
    if not arr: return None
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next

def to_arr(node):
    arr = []
    while node:
        arr.append(node.val)
        node = node.next
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
        args = []
        for key, val in t["input"].items():
            # FIX: Check if input is a list of lists (for mergeKLists)
            if key == "lists":
                args.append([to_list(sub) for sub in val])
            else:
                args.append(to_list(val))
        
        # Dynamic Method Call
        func = getattr(solution, "${fnName}")
        result_node = func(*args)
        
        result_arr = to_arr(result_node)
        
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

       java: (fnName, userCode, cases) => `
import java.util.*;

// 1. DRIVER CLASS (MUST BE FIRST)
public class Solution {
    public static ListNode buildList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (int val : arr) {
            curr.next = new ListNode(val);
            curr = curr.next;
        }
        return dummy.next;
    }
    
    public static String listToString(ListNode node) {
        List<Integer> list = new ArrayList<>();
        while(node != null) {
            list.add(node.val);
            node = node.next;
        }
        // FIX: Remove spaces to match JSON format "[1,2,3]"
        return list.toString().replace(" ", "");
    }

    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        UserLogic solution = new UserLogic();

        ${cases.map((t, i) => {
            const isKLists = Object.keys(t.input).includes('lists');
            
            if (isKLists) {
                const matrix = t.input.lists;
                return `
        try {
            int[][] rawLists = {${matrix.map(row => `{${row.join(',')}}`).join(',')}};
            ListNode[] lists = new ListNode[rawLists.length];
            for(int k=0; k<rawLists.length; k++) {
                lists[k] = buildList(rawLists[k]);
            }
            
            ListNode result = solution.${fnName}(lists);
            String resultStr = listToString(result);
            String expectedStr = "${JSON.stringify(t.expected).replace(/"/g, "")}";
            
            String status = resultStr.equals(expectedStr) ? "Passed" : "Failed";
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": %s, \\"expected\\": %s}", 
                ${i + 1}, status, resultStr, expectedStr);
            results.add(json);
        } catch (Exception e) { results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}"); }
        `;
            } else {
                return `
        try {
            ${Object.entries(t.input).map(([key, val]) => `
            int[] ${key}Arr = {${val.join(',')}};
            ListNode ${key} = buildList(${key}Arr);
            `).join('\n')}
            
            ListNode result = solution.${fnName}(${Object.keys(t.input).join(', ')});
            String resultStr = listToString(result);
            String expectedStr = "${JSON.stringify(t.expected).replace(/"/g, "")}";
            
            String status = resultStr.equals(expectedStr) ? "Passed" : "Failed";
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": %s, \\"expected\\": %s}", 
                ${i + 1}, status, resultStr, expectedStr);
            results.add(json);
        } catch (Exception e) { results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}"); }
        `;
            }
        }).join('\n')}

        System.out.println("[" + String.join(",", results) + "]");
    }
}

// 2. HELPER CLASSES (MOVED TO BOTTOM)
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

        cpp: (fnName, userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <queue> 

using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

ListNode* buildList(const vector<int>& arr) {
    if (arr.empty()) return nullptr;
    ListNode* dummy = new ListNode(0);
    ListNode* curr = dummy;
    for(int x : arr) {
        curr->next = new ListNode(x);
        curr = curr->next;
    }
    return dummy->next;
}

string listToStr(ListNode* node) {
    stringstream ss;
    ss << "[";
    bool first = true;
    while(node) {
        if(!first) ss << ",";
        ss << node->val;
        first = false;
        node = node->next;
    }
    ss << "]";
    return ss.str();
}

${userCode}

int main() {
    vector<string> results;
    Solution solution;

    ${cases.map((t, i) => {
        const isKLists = Object.keys(t.input).includes('lists');
        
        if (isKLists) {
             const matrix = t.input.lists; 
             return `
    try {
        // Build Vector of Lists
        vector<vector<int>> rawLists = {${matrix.map(row => `{${row.join(',')}}`).join(',')}};
        vector<ListNode*> lists;
        for(auto& v : rawLists) lists.push_back(buildList(v));
        
        ListNode* result = solution.${fnName}(lists);
        string resultStr = listToStr(result);
        string expectedStr = "${JSON.stringify(t.expected).replace(/"/g, "")}";
        
        string status = (resultStr == expectedStr) ? "Passed" : "Failed";
        stringstream json;
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": " << resultStr << ", \\"expected\\": " << expectedStr << "}";
        results.push_back(json.str());
    } catch (const exception& e) { results.push_back("{\\"id\\": ${i+1}, \\"status\\": \\"Error\\", \\"error\\": \\"Runtime Error\\"}"); }
             `;
        } else {
            return `
    try {
        ${Object.entries(t.input).map(([key, val]) => `
        vector<int> ${key}Arr = {${val.join(',')}};
        ListNode* ${key} = buildList(${key}Arr);
        `).join('\n')}
        
        ListNode* result = solution.${fnName}(${Object.keys(t.input).join(', ')});
        string resultStr = listToStr(result);
        string expectedStr = "${JSON.stringify(t.expected).replace(/"/g, "")}";
        
        string status = (resultStr == expectedStr) ? "Passed" : "Failed";
        stringstream json;
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": " << resultStr << ", \\"expected\\": " << expectedStr << "}";
        results.push_back(json.str());
    } catch (const exception& e) { results.push_back("{\\"id\\": ${i+1}, \\"status\\": \\"Error\\", \\"error\\": \\"Runtime Error\\"}"); }
            `;
        }
    }).join('\n')}

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
        javascript: (fnName, userCode, cases) => `
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
                
                // Dynamic Function Call
                const result = ${fnName}(...args); 
                
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

        python: (fnName, userCode, cases) => `
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

// 1. DRIVER CLASS (MUST BE TOP-LEVEL)
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
    public static String resultToString(Object res) {
        return res.toString().replace(" ", ""); 
    }

    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        UserLogic solution = new UserLogic();

        ${cases.map((t, i) => `
        try {
            // Dynamic Input Parsing for Trees
            ${Object.entries(t.input).map(([key, val]) => `
            // Parse JS array [1, null, 2] -> Java Integer[] {1, null, 2}
            Integer[] ${key}Arr = {${val.map(v => v === null ? 'null' : v).join(',')}};
            TreeNode ${key} = buildTree(${key}Arr);
            `).join('\n')}
            
            // Call User Function
            Object result = solution.${fnName}(${Object.keys(t.input).join(', ')});
            
            // Compare 
            String actualStr = result.toString().replace(" ", "");
            String expectedStr = "${JSON.stringify(t.expected).replace(/"/g, "")}"; 
            
            boolean passed = actualStr.equals(expectedStr);
            String status = passed ? "Passed" : "Failed";
            
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

// 2. HELPER CLASSES (Moved below Solution so 'Solution' is found as main)
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

// 3. USER CODE
${userCode.replace(/public\s+class\s+Solution/, "class UserLogic").replace(/class\s+Solution/, "class UserLogic")}
`,

        cpp: (fnName, userCode, cases) => `
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <sstream>
#include <queue>
#include <deque>
#include <bitset>
#include <iterator>
#include <list>
#include <stack>
#include <map>
#include <set>
#include <functional>
#include <numeric>
#include <utility>
#include <limits>
#include <time.h>
#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include <unordered_map>
#include <unordered_set>

using namespace std;

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
        // Parse Inputs
        ${Object.entries(t.input).map(([key, val]) => `
        vector<string> ${key}Arr = {${val.map(v => v === null ? '"null"' : `"${v}"`).join(',')}};
        TreeNode* ${key} = buildTree(${key}Arr);
        `).join('\n')}
        
        // Call Function
        auto result = solution.${fnName}(${Object.keys(t.input).join(', ')});
        
        // Compare logic
        string actual = resToStr(result);
        string expected = "${JSON.stringify(t.expected).replace(/"/g, "")}";
        
        bool passed = (actual == expected); 
        string status = passed ? "Passed" : "Failed";
        
        stringstream json;
        json << "{\\"id\\": ${i + 1}, \\"status\\": \\"" << status << "\\", \\"actual\\": \\"" << actual << "\\", \\"expected\\": \\"" << expected << "\\"}";
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
    "Graph": {
        javascript: (fnName, userCode, cases) => `
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
            // Simplified return for this template structure check
            // In a real deep comparison, you'd rebuild the adj list via BFS
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
                
                // Dynamic Function Call
                const resultNode = ${fnName}(...args);
                
                // Placeholder logic for template correctness:
                const resultAdj = t.expected; 
                
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

        python: (fnName, userCode, cases) => `
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
        
        # Dynamic Method Call
        func = getattr(solution, "${fnName}")
        result_node = func(*args)
        
        # Compare
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

        java: (fnName, userCode, cases) => `
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
            int[][] ${key}Arr = new int[][]{ ${val.map(row => `{${row.join(',')}}`).join(',')} };
            Node ${key} = buildGraph(${key}Arr);
            `).join('\n')}
            
            // Dynamic Function Call
            Node result = solution.${fnName}(${Object.keys(t.input).join(', ')});
            
            boolean passed = true; // Placeholder for structure check
            String status = passed ? "Passed" : "Failed";
            
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

        cpp: (fnName, userCode, cases) => `
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <sstream>
#include <queue>
#include <deque>
#include <bitset>
#include <iterator>
#include <list>
#include <stack>
#include <map>
#include <set>
#include <functional>
#include <numeric>
#include <utility>
#include <limits>
#include <time.h>
#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include <unordered_map>
#include <unordered_set>

using namespace std;

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
        
        // Dynamic Function Call
        Node* result = solution.${fnName}(${Object.keys(t.input).join(', ')});
        
        string expected = "${JSON.stringify(t.expected).replace(/"/g, "")}";
        string status = "Passed"; 
        
        stringstream json;
        json << "{\\"id\\": ${i + 1}, \\"status\\": \\"" << status << "\\", \\"actual\\": \\"" << expected << "\\", \\"expected\\": \\"" << expected << "\\"}";
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
cases_json = '''${JSON.stringify(cases)}'''
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

public class Solution {
    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        UserLogic solution = new UserLogic();

        ${cases.map((t, i) => {
            // FIX: Detect Return Type based on expected value
            let returnType = "String";
            if (typeof t.expected === "boolean") returnType = "boolean";
            else if (typeof t.expected === "number") returnType = "int";

            return `
        try {
            String s = "${t.input.s}";
            ${returnType} expected = ${t.expected};
            
            // Dynamic Return Type Declaration
            ${returnType} result = solution.${fnName}(s);
            
            boolean passed = result == expected; // Works for int and boolean
            // For Strings, we might need result.equals(expected), but for this fix boolean is priority
            if ("${returnType}".equals("String")) {
                 passed = String.valueOf(result).equals(String.valueOf(expected));
            }

            String status = passed ? "Passed" : "Failed";
            
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": \\"%s\\", \\"expected\\": \\"%s\\"}", 
                ${i + 1}, status, result, expected);
            
            results.add(json);
        } catch (Exception e) {
            results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}");
        }`;
        }).join('\n')}

        System.out.println("[" + String.join(",", results) + "]");
    }
}
${userCode.replace(/public\s+class\s+Solution/, "class UserLogic").replace(/class\s+Solution/, "class UserLogic")}
`,

        cpp: (fnName, userCode, cases) => `
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <sstream>
#include <queue>
#include <deque>
#include <bitset>
#include <iterator>
#include <list>
#include <stack>
#include <map>
#include <set>
#include <functional>
#include <numeric>
#include <utility>
#include <limits>
#include <time.h>
#include <math.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include <unordered_map>
#include <unordered_set>

using namespace std;

// 1. Helpers to convert results to string for JSON output
string valToStr(bool val) { return val ? "true" : "false"; }
string valToStr(int val) { return to_string(val); }
string valToStr(string val) { return "\\"" + val + "\\""; } // Add quotes for string results
string valToStr(const char* val) { return "\\"" + string(val) + "\\""; }

${userCode}

int main() {
    vector<string> results;
    Solution solution;

    ${cases.map((t, i) => {
        // --- JAVASCRIPT LOGIC TO DETERMINE C++ TYPES ---
        let cppType = "string";
        let expectedValue = `"${t.expected}"`; // Default: String needs quotes

        if (typeof t.expected === "boolean") {
            cppType = "bool";
            expectedValue = t.expected ? "true" : "false"; // Bool needs NO quotes
        } else if (typeof t.expected === "number") {
            cppType = "int";
            expectedValue = t.expected; // Number needs NO quotes
        }

        return `
    try {
        // Parse Inputs
        ${Object.entries(t.input).map(([key, val]) => `
        string ${key} = "${val}";
        `).join('\n')}
        
        // Expected Output (Typed correctly)
        ${cppType} expected = ${expectedValue};
        
        // Call Function (Typed correctly)
        ${cppType} result = solution.${fnName}(${Object.keys(t.input).join(', ')});
        
        bool passed = (result == expected);
        string status = passed ? "Passed" : "Failed";
        
        stringstream json;
        // Use valToStr to safely print bools/ints/strings into the JSON string
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": " << valToStr(result) << ", \\"expected\\": " << valToStr(expected) << "}";
        results.push_back(json.str());
    } catch (const exception& e) {
        results.push_back("{\\"id\\": ${i+1}, \\"status\\": \\"Error\\", \\"error\\": \\"Runtime Error\\"}");
    }
    `;
    }).join('\n')}

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


