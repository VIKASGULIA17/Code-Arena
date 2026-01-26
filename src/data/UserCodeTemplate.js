// Driver code templates for all 70 problems across all languages
// This file contains boilerplate code and driver code functions for testing

export const userCode = {
  // =========================================================
  // PROBLEM 1: TWOSUM
  // =========================================================
 1: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
    // Write your code here
    
};`

    },

    

    python: {
      boilerplate: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass`,
      driverCode: (userCode, cases) => `
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
    },

    

    // --- COMPILED LANGUAGES (Using Code Injection instead of JSON) ---

   java: {
      boilerplate: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`,
      driverCode: (userCode, cases) => `
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
    },

    

    cpp: {
      boilerplate: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
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
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": " << vecToStr(result) << ", \\"expected\\": " << vecToStr(expected) << "}";
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
  },

  // =========================================================
  // PROBLEM 2: ADD TWO NUMBERS
  // =========================================================
  2: {
    javascript: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
};`,
      driverCode: (userCode, cases) => `
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
function createList(arr) {
    let dummy = new ListNode(0);
    let curr = dummy;
    for(let val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    return dummy.next;
}
function toArray(node) {
    let arr = [];
    while(node) {
        arr.push(node.val);
        node = node.next;
    }
    return arr;
}

${userCode}

const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const l1 = createList(t.input.l1);
        const l2 = createList(t.input.l2);
        
        const resNode = addTwoNumbers(l1, l2);
        const resArr = toArray(resNode);
        
        resultEntry.actual = resArr;
        resultEntry.expected = t.expected;

        if (JSON.stringify(resArr) === JSON.stringify(t.expected)) {
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
    },

    typescript: {
      boilerplate: `class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    // Write your code here
    return null;
}`,
      driverCode: (userCode, cases) => `
// We re-declare class inside driver for safety in case user deletes it
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function createList(arr: number[]): ListNode | null {
    let dummy = new ListNode(0);
    let curr = dummy;
    for(let val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next!;
    }
    return dummy.next;
}

function toArray(node: ListNode | null): number[] {
    let arr: number[] = [];
    while(node) {
        arr.push(node.val);
        node = node.next;
    }
    return arr;
}

// User Code injection
${userCode.replace(/class ListNode[\s\S]*?}/, "")} 

const testCases = ${JSON.stringify(cases)};
const results: any[] = [];

testCases.forEach((t: any, index: number) => {
    const resultEntry: any = { id: index + 1 };
    try {
        const l1 = createList(t.input.l1);
        const l2 = createList(t.input.l2);
        
        const resNode = addTwoNumbers(l1, l2);
        const resArr = toArray(resNode);
        
        resultEntry.actual = resArr;
        resultEntry.expected = t.expected;

        if (JSON.stringify(resArr) === JSON.stringify(t.expected)) {
            resultEntry.status = "Passed";
        } else {
            resultEntry.status = "Failed";
        }
    } catch (error: any) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});
console.log(JSON.stringify(results));
`,
    },

    python: {
      boilerplate: `
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        pass`,
      driverCode: (userCode, cases) => `
import json
from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def to_list(arr):
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

${userCode}

cases_json = '${JSON.stringify(cases)}'
test_cases = json.loads(cases_json)
results = []
solution = Solution()

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        l1 = to_list(t["input"]["l1"])
        l2 = to_list(t["input"]["l2"])
        
        res_node = solution.addTwoNumbers(l1, l2)
        res_arr = to_arr(res_node)
        
        result_entry["actual"] = res_arr
        result_entry["expected"] = t["expected"]
        
        if res_arr == t["expected"]:
            result_entry["status"] = "Passed"
        else:
            result_entry["status"] = "Failed"
    except Exception as e:
        result_entry["status"] = "Error"
        result_entry["error"] = str(e)
    
    results.append(result_entry)

print(json.dumps(results))
`,
    },

    php: {
      boilerplate: `
/**
 * Definition for a singly-linked list.
 * class ListNode {
 * public $val = 0;
 * public $next = null;
 * function __construct($val = 0, $next = null) {
 * $this->val = $val;
 * $this->next = $next;
 * }
 * }
 */
function addTwoNumbers($l1, $l2) {
    
}`,
      driverCode: (userCode, cases) => `
<?php
class ListNode {
    public $val = 0;
    public $next = null;
    function __construct($val = 0, $next = null) {
        $this->val = $val;
        $this->next = $next;
    }
}

function to_list($arr) {
    $dummy = new ListNode(0);
    $curr = $dummy;
    foreach ($arr as $val) {
        $curr->next = new ListNode($val);
        $curr = $curr->next;
    }
    return $dummy->next;
}

function to_arr($node) {
    $arr = [];
    while ($node) {
        $arr[] = $node->val;
        $node = $node->next;
    }
    return $arr;
}

${userCode}

$cases_json = '${JSON.stringify(cases)}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $l1 = to_list($t['input']['l1']);
        $l2 = to_list($t['input']['l2']);

        $resNode = addTwoNumbers($l1, $l2);
        $resArr = to_arr($resNode);

        $result_entry['actual'] = $resArr;
        $result_entry['expected'] = $t['expected'];
        
        if ($resArr == $t['expected']) {
            $result_entry['status'] = 'Passed';
        } else {
            $result_entry['status'] = 'Failed';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}
echo json_encode($results);
?>
`,
    },

    java: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 * int val;
 * ListNode next;
 * ListNode() {}
 * ListNode(int val) { this.val = val; }
 * ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

// Helpers
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class Main {
    // Helper Methods
    static ListNode toList(int[] arr) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (int val : arr) {
            curr.next = new ListNode(val);
            curr = curr.next;
        }
        return dummy.next;
    }
    
    static String toArrStr(ListNode node) {
        List<Integer> list = new ArrayList<>();
        while(node != null) {
            list.add(node.val);
            node = node.next;
        }
        return list.toString(); // [7, 0, 8]
    }
    
    ${userCode}

    public static void main(String[] args) {
        List<String> results = new ArrayList<>();
        Solution solution = new Solution();

        ${cases.map((t, i) => `
        try {
            int[] arr1 = {${t.input.l1.join(',')}};
            int[] arr2 = {${t.input.l2.join(',')}};
            int[] expectedArr = {${t.expected.join(',')}};
            String expectedStr = Arrays.toString(expectedArr);
            
            ListNode l1 = toList(arr1);
            ListNode l2 = toList(arr2);
            
            ListNode resultNode = solution.addTwoNumbers(l1, l2);
            String resultStr = toArrStr(resultNode);
            
            boolean passed = resultStr.equals(expectedStr);
            String status = passed ? "Passed" : "Failed";
            
            String json = String.format("{\\"id\\": %d, \\"status\\": \\"%s\\", \\"actual\\": %s, \\"expected\\": %s}", 
                ${i + 1}, status, resultStr, expectedStr);
            results.add(json);
            
        } catch (Exception e) {
            results.add("{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"" + e.getMessage() + "\\"}");
        }
        `).join('\n')}

        System.out.println("[" + String.join(",", results) + "]");
    }
}
`,
    },

    csharp: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 * public int val;
 * public ListNode next;
 * public ListNode(int val=0, ListNode next=null) {
 * this.val = val;
 * this.next = next;
 * }
 * }
 */
public class Solution {
    public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;
using System.Collections.Generic;
using System.Linq;

public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int val=0, ListNode next=null) {
        this.val = val;
        this.next = next;
    }
}

public class MainClass {
    static ListNode ToList(int[] arr) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        foreach (int val in arr) {
            curr.next = new ListNode(val);
            curr = curr.next;
        }
        return dummy.next;
    }
    
    static string ToArrStr(ListNode node) {
        List<int> list = new List<int>();
        while(node != null) {
            list.Add(node.val);
            node = node.next;
        }
        return "[" + string.Join(", ", list) + "]";
    }
    
    ${userCode}

    public static void Main(string[] args) {
        List<string> results = new List<string>();
        Solution solution = new Solution();

        ${cases.map((t, i) => `
        try {
            int[] arr1 = new int[] {${t.input.l1.join(',')}};
            int[] arr2 = new int[] {${t.input.l2.join(',')}};
            int[] expectedArr = new int[] {${t.expected.join(',')}};
            string expectedStr = "[" + string.Join(", ", expectedArr) + "]";
            
            ListNode l1 = ToList(arr1);
            ListNode l2 = ToList(arr2);
            
            ListNode resultNode = solution.AddTwoNumbers(l1, l2);
            string resultStr = ToArrStr(resultNode);
            
            bool passed = (resultStr == expectedStr);
            string status = passed ? "Passed" : "Failed";
            
            results.Add($"{{\\"id\\": ${i + 1}, \\"status\\": \\"{status}\\", \\"actual\\": {resultStr}, \\"expected\\": {expectedStr}}}");
        } catch (Exception e) {
             results.Add($"{{\\"id\\": ${i + 1}, \\"status\\": \\"Error\\", \\"error\\": \\"{e.Message}\\"}}");
        }
        `).join('\n')}

        Console.WriteLine("[" + string.Join(",", results) + "]");
    }
}
`,
    },

    cpp: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 * int val;
 * ListNode *next;
 * ListNode() : val(0), next(nullptr) {}
 * ListNode(int x) : val(x), next(nullptr) {}
 * ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>

using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

// Helper: Vector -> List
ListNode* toList(const vector<int>& nums) {
    ListNode* dummy = new ListNode(0);
    ListNode* curr = dummy;
    for(int x : nums) {
        curr->next = new ListNode(x);
        curr = curr->next;
    }
    return dummy->next;
}

// Helper: List -> String
string toArrStr(ListNode* node) {
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

    ${cases.map((t, i) => `
    try {
        vector<int> v1 = {${t.input.l1.join(',')}};
        vector<int> v2 = {${t.input.l2.join(',')}};
        vector<int> vexp = {${t.expected.join(',')}};
        
        ListNode* l1 = toList(v1);
        ListNode* l2 = toList(v2);
        
        // Manual expectation string building
        stringstream ssExp;
        ssExp << "[";
        for(size_t k=0; k<vexp.size(); ++k) {
            ssExp << vexp[k];
            if(k < vexp.size()-1) ssExp << ",";
        }
        ssExp << "]";
        string expectedStr = ssExp.str();
        
        ListNode* resNode = solution.addTwoNumbers(l1, l2);
        string resultStr = toArrStr(resNode);
        
        bool passed = (resultStr == expectedStr);
        string status = passed ? "Passed" : "Failed";
        
        stringstream json;
        json << "{\\"id\\": ${i+1}, \\"status\\": \\"" << status << "\\", \\"actual\\": " << resultStr << ", \\"expected\\": " << expectedStr << "}";
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
},

  // =========================================================
  // PROBLEM 3: LENGTHOFLONGESTSUBSTRING
  // =========================================================
  3: {
    javascript: {
      boilerplate: `function lengthOfLongestSubstring(s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def lengthOfLongestSubstring(s):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function lengthOfLongestSubstring(s: string): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int LengthOfLongestSubstring(string s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function lengthOfLongestSubstring($s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 4: FINDMEDIANSORTEDARRAYS
  // =========================================================
  4: {
    javascript: {
      boilerplate: `function findMedianSortedArrays(nums1, nums2) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def findMedianSortedArrays(nums1, nums2):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public double FindMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function findMedianSortedArrays($nums1, $nums2) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 5: ISVALID
  // =========================================================
  5: {
    javascript: {
      boilerplate: `function isValid(s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def isValid(s):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function isValid(s: string): boolean {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public bool IsValid(string s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function isValid($s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 6: MERGEKLISTS
  // =========================================================
  6: {
    javascript: {
      boilerplate: `function mergeKLists(lists) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def mergeKLists(lists):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public ListNode MergeKLists(ListNode[] lists) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function mergeKLists($lists) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 7: MAXPROFIT
  // =========================================================
  7: {
    javascript: {
      boilerplate: `function maxProfit(prices) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def maxProfit(prices):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function maxProfit(prices: number[]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int MaxProfit(int[] prices) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function maxProfit($prices) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 8: LEVELORDER
  // =========================================================
  8: {
    javascript: {
      boilerplate: `function levelOrder(root) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def levelOrder(root):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function levelOrder(root: TreeNode | null): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<int>> LevelOrder(TreeNode root) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function levelOrder($root) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 9: NEXTPERMUTATION
  // =========================================================
  9: {
    javascript: {
      boilerplate: `function nextPermutation(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def nextPermutation(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function nextPermutation(nums: number[]): void {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public void nextPermutation(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public void NextPermutation(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function nextPermutation($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 10: ISPALINDROME
  // =========================================================
  10: {
    javascript: {
      boilerplate: `function isPalindrome(x) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def isPalindrome(x):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function isPalindrome(x: number): boolean {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public bool IsPalindrome(int x) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function isPalindrome($x) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool isPalindrome(int x) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 11: MAXAREA
  // =========================================================
  11: {
    javascript: {
      boilerplate: `function maxArea(height) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def maxArea(height):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function maxArea(height: number[]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int maxArea(int[] height) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int MaxArea(int[] height) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function maxArea($height) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 12: ROMANTOINT
  // =========================================================
  12: {
    javascript: {
      boilerplate: `function romanToInt(s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def romanToInt(s):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function romanToInt(s: string): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int romanToInt(String s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int RomanToInt(string s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function romanToInt($s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int romanToInt(string s) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 13: LONGESTCOMMONPREFIX
  // =========================================================
  13: {
    javascript: {
      boilerplate: `function longestCommonPrefix(strs) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def longestCommonPrefix(strs):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function longestCommonPrefix(strs: string[]): string {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public string LongestCommonPrefix(string[] strs) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function longestCommonPrefix($strs) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 14: THREESUM
  // =========================================================
  14: {
    javascript: {
      boilerplate: `function threeSum(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def threeSum(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function threeSum(nums: number[]): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<int>> ThreeSum(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function threeSum($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 15: LETTERCOMBINATIONS
  // =========================================================
  15: {
    javascript: {
      boilerplate: `function letterCombinations(digits) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def letterCombinations(digits):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function letterCombinations(digits: string): string[] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<String> letterCombinations(String digits) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<string> LetterCombinations(string digits) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function letterCombinations($digits) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 16: REMOVENTHFROMEND
  // =========================================================
  16: {
    javascript: {
      boilerplate: `function removeNthFromEnd(head, n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def removeNthFromEnd(head, n):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public ListNode RemoveNthFromEnd(ListNode head, int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function removeNthFromEnd($head, $n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 17: GENERATEPARENTHESIS
  // =========================================================
  17: {
    javascript: {
      boilerplate: `function generateParenthesis(n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def generateParenthesis(n):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function generateParenthesis(n: number): string[] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<String> generateParenthesis(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<string> GenerateParenthesis(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function generateParenthesis($n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 18: MERGETWOLISTS
  // =========================================================
  18: {
    javascript: {
      boilerplate: `function mergeTwoLists(l1, l2) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def mergeTwoLists(l1, l2):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public ListNode MergeTwoLists(ListNode l1, ListNode l2) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function mergeTwoLists($l1, $l2) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 19: SWAPPAIRS
  // =========================================================
  19: {
    javascript: {
      boilerplate: `function swapPairs(head) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def swapPairs(head):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function swapPairs(head: ListNode | null): ListNode | null {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public ListNode swapPairs(ListNode head) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public ListNode SwapPairs(ListNode head) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function swapPairs($head) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 20: REVERSEKGROUP
  // =========================================================
  20: {
    javascript: {
      boilerplate: `function reverseKGroup(head, k) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def reverseKGroup(head, k):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public ListNode ReverseKGroup(ListNode head, int k) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function reverseKGroup($head, $k) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 21: SEARCH
  // =========================================================
  21: {
    javascript: {
      boilerplate: `function search(nums, target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def search(nums, target):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function search(nums: number[], target: number): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int Search(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function search($nums, $target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 22: SEARCHRANGE
  // =========================================================
  22: {
    javascript: {
      boilerplate: `function searchRange(nums, target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def searchRange(nums, target):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function searchRange(nums: number[], target: number): number[] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int[] SearchRange(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function searchRange($nums, $target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 23: SEARCHINSERT
  // =========================================================
  23: {
    javascript: {
      boilerplate: `function searchInsert(nums, target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def searchInsert(nums, target):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function searchInsert(nums: number[], target: number): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int searchInsert(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int SearchInsert(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function searchInsert($nums, $target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 24: ISVALIDSUDOKU
  // =========================================================
  24: {
    javascript: {
      boilerplate: `function isValidSudoku(board) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def isValidSudoku(board):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function isValidSudoku(board: string[][]): boolean {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public bool IsValidSudoku(char[][] board) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function isValidSudoku($board) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 25: SOLVESUDOKU
  // =========================================================
  25: {
    javascript: {
      boilerplate: `function solveSudoku(board) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def solveSudoku(board):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function solveSudoku(board: string[][]): void {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public void solveSudoku(char[][] board) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public void SolveSudoku(char[][] board) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function solveSudoku($board) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 26: COUNTANDSAY
  // =========================================================
  26: {
    javascript: {
      boilerplate: `function countAndSay(n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def countAndSay(n):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function countAndSay(n: number): string {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public String countAndSay(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public string CountAndSay(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function countAndSay($n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string countAndSay(int n) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 27: COMBINATIONSUM
  // =========================================================
  27: {
    javascript: {
      boilerplate: `function combinationSum(candidates, target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def combinationSum(candidates, target):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function combinationSum(candidates: number[], target: number): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<int>> CombinationSum(int[] candidates, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function combinationSum($candidates, $target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 28: COMBINATIONSUM2
  // =========================================================
  28: {
    javascript: {
      boilerplate: `function combinationSum2(candidates, target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def combinationSum2(candidates, target):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function combinationSum2(candidates: number[], target: number): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<int>> CombinationSum2(int[] candidates, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function combinationSum2($candidates, $target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 29: FIRSTMISSINGPOSITIVE
  // =========================================================
  29: {
    javascript: {
      boilerplate: `function firstMissingPositive(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def firstMissingPositive(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function firstMissingPositive(nums: number[]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int firstMissingPositive(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int FirstMissingPositive(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function firstMissingPositive($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 30: TRAP
  // =========================================================
  30: {
    javascript: {
      boilerplate: `function trap(height) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def trap(height):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function trap(height: number[]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int trap(int[] height) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int Trap(int[] height) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function trap($height) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int trap(vector<int>& height) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 31: MULTIPLY
  // =========================================================
  31: {
    javascript: {
      boilerplate: `function multiply(num1, num2) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def multiply(num1, num2):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function multiply(num1: string, num2: string): string {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public String multiply(String num1, String num2) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public string Multiply(string num1, string num2) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function multiply($num1, $num2) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string multiply(string num1, string num2) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 32: ISMATCH
  // =========================================================
  32: {
    javascript: {
      boilerplate: `function isMatch(s, p) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def isMatch(s, p):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function isMatch(s: string, p: string): boolean {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public boolean isMatch(String s, String p) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public bool IsMatch(string s, string p) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function isMatch($s, $p) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool isMatch(string s, string p) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 33: JUMP
  // =========================================================
  33: {
    javascript: {
      boilerplate: `function jump(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def jump(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function jump(nums: number[]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int jump(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int Jump(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function jump($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int jump(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 34: PERMUTE
  // =========================================================
  34: {
    javascript: {
      boilerplate: `function permute(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def permute(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function permute(nums: number[]): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<int>> Permute(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function permute($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 35: PERMUTEUNIQUE
  // =========================================================
  35: {
    javascript: {
      boilerplate: `function permuteUnique(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def permuteUnique(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function permuteUnique(nums: number[]): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<int>> PermuteUnique(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function permuteUnique($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 36: ROTATE
  // =========================================================
  36: {
    javascript: {
      boilerplate: `function rotate(matrix) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def rotate(matrix):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function rotate(matrix: number[][]): void {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public void rotate(int[][] matrix) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public void Rotate(int[][] matrix) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function rotate($matrix) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 37: GROUPANAGRAMS
  // =========================================================
  37: {
    javascript: {
      boilerplate: `function groupAnagrams(strs) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def groupAnagrams(strs):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function groupAnagrams(strs: string[]): string[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<string>> GroupAnagrams(string[] strs) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function groupAnagrams($strs) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 38: MYPOW
  // =========================================================
  38: {
    javascript: {
      boilerplate: `function myPow(x, n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def myPow(x, n):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function myPow(x: number, n: number): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public double myPow(double x, int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public double MyPow(double x, int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function myPow($x, $n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    double myPow(double x, int n) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 39: SOLVENQUEENS
  // =========================================================
  39: {
    javascript: {
      boilerplate: `function solveNQueens(n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def solveNQueens(n):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function solveNQueens(n: number): string[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<string>> SolveNQueens(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function solveNQueens($n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 40: TOTALNQUEENS
  // =========================================================
  40: {
    javascript: {
      boilerplate: `function totalNQueens(n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def totalNQueens(n):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function totalNQueens(n: number): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int totalNQueens(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int TotalNQueens(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function totalNQueens($n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int totalNQueens(int n) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 41: MAXSUBARRAY
  // =========================================================
  41: {
    javascript: {
      boilerplate: `function maxSubArray(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def maxSubArray(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function maxSubArray(nums: number[]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int MaxSubArray(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function maxSubArray($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 42: SPIRALORDER
  // =========================================================
  42: {
    javascript: {
      boilerplate: `function spiralOrder(matrix) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def spiralOrder(matrix):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function spiralOrder(matrix: number[][]): number[] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<int> SpiralOrder(int[][] matrix) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function spiralOrder($matrix) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 43: CANJUMP
  // =========================================================
  43: {
    javascript: {
      boilerplate: `function canJump(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def canJump(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function canJump(nums: number[]): boolean {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public boolean canJump(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public bool CanJump(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function canJump($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 44: MERGE
  // =========================================================
  44: {
    javascript: {
      boilerplate: `function merge(intervals) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def merge(intervals):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function merge(intervals: number[][]): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int[][] Merge(int[][] intervals) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function merge($intervals) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 45: INSERT
  // =========================================================
  45: {
    javascript: {
      boilerplate: `function insert(intervals, newInterval) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def insert(intervals, newInterval):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function insert(intervals: number[][], newInterval: number[]): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int[][] Insert(int[][] intervals, int[] newInterval) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function insert($intervals, $newInterval) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 46: LENGTHOFLASTWORD
  // =========================================================
  46: {
    javascript: {
      boilerplate: `function lengthOfLastWord(s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def lengthOfLastWord(s):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function lengthOfLastWord(s: string): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int lengthOfLastWord(String s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int LengthOfLastWord(string s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function lengthOfLastWord($s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int lengthOfLastWord(string s) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 47: GENERATEMATRIX
  // =========================================================
  47: {
    javascript: {
      boilerplate: `function generateMatrix(n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def generateMatrix(n):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function generateMatrix(n: number): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int[][] generateMatrix(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int[][] GenerateMatrix(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function generateMatrix($n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 48: GETPERMUTATION
  // =========================================================
  48: {
    javascript: {
      boilerplate: `function getPermutation(n, k) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def getPermutation(n, k):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function getPermutation(n: number, k: number): string {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public String getPermutation(int n, int k) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public string GetPermutation(int n, int k) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function getPermutation($n, $k) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string getPermutation(int n, int k) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 49: ROTATERIGHT
  // =========================================================
  49: {
    javascript: {
      boilerplate: `function rotateRight(head, k) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def rotateRight(head, k):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function rotateRight(head: ListNode | null, k: number): ListNode | null {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public ListNode RotateRight(ListNode head, int k) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function rotateRight($head, $k) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 50: UNIQUEPATHS
  // =========================================================
  50: {
    javascript: {
      boilerplate: `function uniquePaths(m, n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def uniquePaths(m, n):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function uniquePaths(m: number, n: number): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int uniquePaths(int m, int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int UniquePaths(int m, int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function uniquePaths($m, $n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int uniquePaths(int m, int n) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 51: UNIQUEPATHSWITHOBSTACLES
  // =========================================================
  51: {
    javascript: {
      boilerplate: `function uniquePathsWithObstacles(obstacleGrid) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def uniquePathsWithObstacles(obstacleGrid):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int UniquePathsWithObstacles(int[][] obstacleGrid) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function uniquePathsWithObstacles($obstacleGrid) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 52: MINPATHSUM
  // =========================================================
  52: {
    javascript: {
      boilerplate: `function minPathSum(grid) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def minPathSum(grid):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function minPathSum(grid: number[][]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int minPathSum(int[][] grid) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int MinPathSum(int[][] grid) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function minPathSum($grid) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 53: ISNUMBER
  // =========================================================
  53: {
    javascript: {
      boilerplate: `function isNumber(s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def isNumber(s):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function isNumber(s: string): boolean {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public boolean isNumber(String s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public bool IsNumber(string s) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function isNumber($s) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool isNumber(string s) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 54: PLUSONE
  // =========================================================
  54: {
    javascript: {
      boilerplate: `function plusOne(digits) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def plusOne(digits):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function plusOne(digits: number[]): number[] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int[] plusOne(int[] digits) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int[] PlusOne(int[] digits) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function plusOne($digits) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 55: ADDBINARY
  // =========================================================
  55: {
    javascript: {
      boilerplate: `function addBinary(a, b) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def addBinary(a, b):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function addBinary(a: string, b: string): string {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public String addBinary(String a, String b) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public string AddBinary(string a, string b) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function addBinary($a, $b) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string addBinary(string a, string b) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 56: FULLJUSTIFY
  // =========================================================
  56: {
    javascript: {
      boilerplate: `function fullJustify(words, maxWidth) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def fullJustify(words, maxWidth):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function fullJustify(words: string[], maxWidth: number): string[] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<string> FullJustify(string[] words, int maxWidth) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function fullJustify($words, $maxWidth) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 57: MYSQRT
  // =========================================================
  57: {
    javascript: {
      boilerplate: `function mySqrt(x) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def mySqrt(x):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function mySqrt(x: number): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int mySqrt(int x) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int MySqrt(int x) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function mySqrt($x) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int mySqrt(int x) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 58: CLIMBSTAIRS
  // =========================================================
  58: {
    javascript: {
      boilerplate: `function climbStairs(n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def climbStairs(n):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function climbStairs(n: number): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int climbStairs(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int ClimbStairs(int n) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function climbStairs($n) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int climbStairs(int n) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 59: SIMPLIFYPATH
  // =========================================================
  59: {
    javascript: {
      boilerplate: `function simplifyPath(path) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def simplifyPath(path):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function simplifyPath(path: string): string {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public String simplifyPath(String path) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public string SimplifyPath(string path) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function simplifyPath($path) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string simplifyPath(string path) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 60: MINDISTANCE
  // =========================================================
  60: {
    javascript: {
      boilerplate: `function minDistance(word1, word2) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def minDistance(word1, word2):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function minDistance(word1: string, word2: string): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int minDistance(String word1, String word2) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int MinDistance(string word1, string word2) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function minDistance($word1, $word2) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int minDistance(string word1, string word2) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 61: SETZEROES
  // =========================================================
  61: {
    javascript: {
      boilerplate: `function setZeroes(matrix) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def setZeroes(matrix):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function setZeroes(matrix: number[][]): void {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public void setZeroes(int[][] matrix) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public void SetZeroes(int[][] matrix) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function setZeroes($matrix) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 62: SEARCHMATRIX
  // =========================================================
  62: {
    javascript: {
      boilerplate: `function searchMatrix(matrix, target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def searchMatrix(matrix, target):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function searchMatrix(matrix: number[][], target: number): boolean {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public bool SearchMatrix(int[][] matrix, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function searchMatrix($matrix, $target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 63: SORTCOLORS
  // =========================================================
  63: {
    javascript: {
      boilerplate: `function sortColors(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def sortColors(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function sortColors(nums: number[]): void {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public void sortColors(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public void SortColors(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function sortColors($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void sortColors(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 64: MINWINDOW
  // =========================================================
  64: {
    javascript: {
      boilerplate: `function minWindow(s, t) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def minWindow(s, t):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function minWindow(s: string, t: string): string {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public String minWindow(String s, String t) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public string MinWindow(string s, string t) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function minWindow($s, $t) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string minWindow(string s, string t) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 65: COMBINE
  // =========================================================
  65: {
    javascript: {
      boilerplate: `function combine(n, k) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def combine(n, k):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function combine(n: number, k: number): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> combine(int n, int k) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<int>> Combine(int n, int k) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function combine($n, $k) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 66: SUBSETS
  // =========================================================
  66: {
    javascript: {
      boilerplate: `function subsets(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def subsets(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function subsets(nums: number[]): number[][] {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public IList<IList<int>> Subsets(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function subsets($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 67: EXIST
  // =========================================================
  67: {
    javascript: {
      boilerplate: `function exist(board, word) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def exist(board, word):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function exist(board: string[][], word: string): boolean {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public boolean exist(char[][] board, String word) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public bool Exist(char[][] board, string word) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function exist($board, $word) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 68: REMOVEDUPLICATES
  // =========================================================
  68: {
    javascript: {
      boilerplate: `function removeDuplicates(nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def removeDuplicates(nums):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function removeDuplicates(nums: number[]): number {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public int RemoveDuplicates(int[] nums) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function removeDuplicates($nums) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 69: SEARCH
  // =========================================================
  69: {
    javascript: {
      boilerplate: `function search(nums, target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def search(nums, target):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function search(nums: number[], target: number): boolean {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public boolean search(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public bool Search(int[] nums, int target) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function search($nums, $target) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool search(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

  // =========================================================
  // PROBLEM 70: DELETEDUPLICATES
  // =========================================================
  70: {
    javascript: {
      boilerplate: `function deleteDuplicates(head) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    python: {
      boilerplate: `def deleteDuplicates(head):
    # Write your code here
    pass`,
      driverCode: (userCode, cases) => `
import json
import re

# 1. User Code
${userCode}

# 2. Hidden Driver Code
cases_json = '''${JSON.stringify(cases)}'''
test_cases = json.loads(cases_json)
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        input_data = t["input"]
        expected = t["expected"]

        # Extract function name from user code
        func_match = re.search(r'def\\s+(\\w+)\\s*\\(', userCode)

        if "class Solution:" in userCode:
            solution = Solution()
            method_name = [name for name in dir(solution) if not name.startswith('_')][0]
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = getattr(solution, method_name)(*values)
        elif func_match:
            func_name = func_match.group(1)
            input_keys = list(input_data.keys())
            values = [repr(input_data[k]) for k in input_keys]
            result = locals()[func_name](*values)
        else:
            raise Exception("Could not find function or class")

        result_entry["actual"] = result
        result_entry["expected"] = expected

        # Compare results
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
    },
    typescript: {
      boilerplate: `function deleteDuplicates(head: ListNode | null): ListNode | null {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const input = t.input;
        const expected = t.expected;

        // Get function name from user code
        const funcMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
        let funcName = funcMatch ? funcMatch[1] : null;

        if (!funcName) {
            resultEntry.status = "Error";
            resultEntry.error = "Could not find function name";
        } else {
            // Build function call
            const inputKeys = Object.keys(input);
            const values = inputKeys.map(k => JSON.stringify(input[k]));
            const result = eval(\`\${funcName}(\${values.join(', ')})\`);

            resultEntry.actual = result;
            resultEntry.expected = expected;

            // Compare results
            const actualStr = typeof result === 'object' ? JSON.stringify(result) : String(result);
            const expectedStr = typeof expected === 'object' ? JSON.stringify(expected) : String(expected);
            resultEntry.status = actualStr === expectedStr ? "Passed" : "Failed";
        }
    } catch (error) {
        resultEntry.status = "Error";
        resultEntry.error = error.message;
    }
    results.push(resultEntry);
});

console.log(JSON.stringify(results));
`,
    },
    java: {
      boilerplate: `class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
import java.util.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Driver code for Java
            // ${JSON.stringify(cases)}
            System.out.println("[]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
    },
    csharp: {
      boilerplate: `public class Solution {
    public ListNode DeleteDuplicates(ListNode head) {
        // Write your code here
        
    }
}`,
      driverCode: (userCode, cases) => `
using System;

public class MainClass {
    public static void Main(string[] args) {
        try {
            // Driver code for C#
            // ${JSON.stringify(cases)}
            Console.WriteLine("[]");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }
}
`,
    },
    php: {
      boilerplate: `function deleteDuplicates($head) {
    // Write your code here
    
}`,
      driverCode: (userCode, cases) => `
<?php
// 1. User Code
${userCode}

// 2. Hidden Driver Code
$cases_json = '${JSON.stringify(JSON.stringify(cases))}';
$test_cases = json_decode($cases_json, true);
$results = [];

foreach ($test_cases as $index => $t) {
    $result_entry = ['id' => $index + 1];
    try {
        $input = $t['input'];
        $expected = $t['expected'];

        // Extract function name
        preg_match('/function\\s+(\\w+)\\s*\\(/', $userCode, $matches);
        if (isset($matches[1])) {
            $func_name = $matches[1];
            $values = array_values($input);
            $result = call_user_func_array($func_name, $values);

            $result_entry['actual'] = $result;
            $result_entry['expected'] = $expected;
            $result_entry['status'] = ($result == $expected) ? 'Passed' : 'Failed';
        } else {
            $result_entry['status'] = 'Error';
            $result_entry['error'] = 'Could not find function name';
        }
    } catch (Exception $e) {
        $result_entry['status'] = 'Error';
        $result_entry['error'] = $e->getMessage();
    }
    $results[] = $result_entry;
}

echo json_encode($results);
?>
`,
    },
    cpp: {
      boilerplate: `class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        // Write your code here
        
    }
};`,
      driverCode: (userCode, cases) => `
#include <iostream>
#include <vector>
#include <string>

int main() {
    try {
        // Driver code for C++
        // ${JSON.stringify(JSON.stringify(cases))}
        std::cout << "[]" << std::endl;
    } catch (const std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    return 0;
}
`,
    },
  },

};
