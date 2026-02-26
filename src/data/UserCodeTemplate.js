export const userCode = {
    '6999fc5f2cef23952fd2f00d': {
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

        },



        // --- COMPILED LANGUAGES (Using Code Injection instead of JSON) ---

        java: {
            boilerplate: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}`,

        },



        cpp: {
            boilerplate: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,

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
        json << "{\\"id\\": ${i + 1}, \\"status\\": \\"" << status << "\\", \\"actual\\": " << resultStr << ", \\"expected\\": " << expectedStr << "}";
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
        }
    },
    // =========================================================
    // PROBLEM 3: LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS
    // =========================================================
    3: {
        javascript: {
            boilerplate: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // Write your code here
    
};`
        },
        python: {
            boilerplate: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your code here
        pass`
        },
        java: {
            boilerplate: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }
}`
        },
        cpp: {
            boilerplate: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your code here
        
    }
};`
        }
    },

    // =========================================================
    // PROBLEM 4: MEDIAN OF TWO SORTED ARRAYS
    // =========================================================
    4: {
        javascript: {
            boilerplate: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // Write your code here
    
};`
        },
        python: {
            boilerplate: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Write your code here
        pass`
        },
        java: {
            boilerplate: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your code here
        return 0.0;
    }
}`
        },
        cpp: {
            boilerplate: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
        
    }
};`
        }
    },

    // =========================================================
    // PROBLEM 5: VALID PARENTHESES
    // =========================================================
    5: {
        javascript: {
            boilerplate: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Write your code here
    
};`
        },
        python: {
            boilerplate: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        pass`
        },
        java: {
            boilerplate: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }
}`
        },
        cpp: {
            boilerplate: `class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        
    }
};`
        }
    },

    // =========================================================
    // PROBLEM 6: MERGE K SORTED LISTS
    // =========================================================
    6: {
        javascript: {
            boilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    // Write your code here
    
};`
        },
        python: {
            boilerplate: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        # Write your code here
        pass`
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
    public ListNode mergeKLists(ListNode[] lists) {
        // Write your code here
        return null;
    }
}`
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
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // Write your code here
        
    }
};`
        }
    }
    ,// =========================================================
  // PROBLEM 7: BEST TIME TO BUY AND SELL STOCK
  // =========================================================
  7: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 8: BINARY TREE LEVEL ORDER TRAVERSAL
  // =========================================================
  8: {
    javascript: {
      boilerplate: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 * this.val = (val===undefined ? 0 : val)
 * this.left = (left===undefined ? null : left)
 * this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode() {}
 * TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) {
 * this.val = val;
 * this.left = left;
 * this.right = right;
 * }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 * int val;
 * TreeNode *left;
 * TreeNode *right;
 * TreeNode() : val(0), left(nullptr), right(nullptr) {}
 * TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 9: NEXT PERMUTATION
  // =========================================================
  9: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public void nextPermutation(int[] nums) {
        // Write your code here
        
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 10: PALINDROME NUMBER
  // =========================================================
  10: {
    javascript: {
      boilerplate: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your code here
        return false;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool isPalindrome(int x) {
        // Write your code here
        
    }
};`
    }
  },
  // =========================================================
  // PROBLEM 11: CONTAINER WITH MOST WATER
  // =========================================================
  11: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int maxArea(int[] height) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 12: ROMAN TO INTEGER
  // =========================================================
  12: {
    javascript: {
      boilerplate: `/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def romanToInt(self, s: str) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int romanToInt(String s) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int romanToInt(string s) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 13: LONGEST COMMON PREFIX
  // =========================================================
  13: {
    javascript: {
      boilerplate: `/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Write your code here
        return "";
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 14: 3SUM
  // =========================================================
  14: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 15: LETTER COMBINATIONS OF A PHONE NUMBER
  // =========================================================
  15: {
    javascript: {
      boilerplate: `/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<String> letterCombinations(String digits) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 16: REMOVE NTH NODE FROM END OF LIST
  // =========================================================
  16: {
    javascript: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        # Write your code here
        pass`
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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Write your code here
        return null;
    }
}`
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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 17: GENERATE PARENTHESES
  // =========================================================
  17: {
    javascript: {
      boilerplate: `/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<String> generateParenthesis(int n) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 18: MERGE TWO SORTED LISTS
  // =========================================================
  18: {
    javascript: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass`
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
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your code here
        return null;
    }
}`
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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your code here
        
    }
};`
    }
  },// =========================================================
  // PROBLEM 19: SWAP NODES IN PAIRS
  // =========================================================
  19: {
    javascript: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass`
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
    public ListNode swapPairs(ListNode head) {
        // Write your code here
        return null;
    }
}`
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
    ListNode* swapPairs(ListNode* head) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 20: REVERSE NODES IN K-GROUP
  // =========================================================
  20: {
    javascript: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        # Write your code here
        pass`
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
    public ListNode reverseKGroup(ListNode head, int k) {
        // Write your code here
        return null;
    }
}`
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
    ListNode* reverseKGroup(ListNode* head, int k) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 21: SEARCH IN ROTATED SORTED ARRAY
  // =========================================================
  21: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 22: FIRST AND LAST POSITION OF ELEMENT IN SORTED ARRAY
  // =========================================================
  22: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        // Write your code here
        return new int[]{-1, -1};
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 23: SEARCH INSERT POSITION
  // =========================================================
  23: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int searchInsert(int[] nums, int target) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 24: VALID SUDOKU
  // =========================================================
  24: {
    javascript: {
      boilerplate: `/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        // Write your code here
        return false;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 25: SUDOKU SOLVER
  // =========================================================
  25: {
    javascript: {
      boilerplate: `/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public void solveSudoku(char[][] board) {
        // Write your code here
        
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 26: COUNT AND SAY
  // =========================================================
  26: {
    javascript: {
      boilerplate: `/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def countAndSay(self, n: int) -> str:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public String countAndSay(int n) {
        // Write your code here
        return "";
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string countAndSay(int n) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 27: COMBINATION SUM
  // =========================================================
  27: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Write your code here
        
    }
};`
    }
  },// =========================================================
  // PROBLEM 28: COMBINATION SUM II
  // =========================================================
  28: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 29: FIRST MISSING POSITIVE
  // =========================================================
  29: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int firstMissingPositive(int[] nums) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 30: TRAPPING RAIN WATER
  // =========================================================
  30: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def trap(self, height: List[int]) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int trap(int[] height) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int trap(vector<int>& height) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 31: MULTIPLY STRINGS
  // =========================================================
  31: {
    javascript: {
      boilerplate: `/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public String multiply(String num1, String num2) {
        // Write your code here
        return "";
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string multiply(string num1, string num2) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 32: WILDCARD MATCHING
  // =========================================================
  32: {
    javascript: {
      boilerplate: `/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public boolean isMatch(String s, String p) {
        // Write your code here
        return false;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool isMatch(string s, string p) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 33: JUMP GAME II
  // =========================================================
  33: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def jump(self, nums: List[int]) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int jump(int[] nums) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int jump(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 34: PERMUTATIONS
  // =========================================================
  34: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 35: PERMUTATIONS II
  // =========================================================
  35: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 36: ROTATE IMAGE
  // =========================================================
  36: {
    javascript: {
      boilerplate: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public void rotate(int[][] matrix) {
        // Write your code here
        
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        // Write your code here
        
    }
};`
    }
  },
  // =========================================================
  // PROBLEM 37: GROUP ANAGRAMS
  // =========================================================
  37: {
    javascript: {
      boilerplate: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 38: POW(X, N)
  // =========================================================
  38: {
    javascript: {
      boilerplate: `/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public double myPow(double x, int n) {
        // Write your code here
        return 0.0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    double myPow(double x, int n) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 39: N-QUEENS
  // =========================================================
  39: {
    javascript: {
      boilerplate: `/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 40: N-QUEENS II
  // =========================================================
  40: {
    javascript: {
      boilerplate: `/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def totalNQueens(self, n: int) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int totalNQueens(int n) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int totalNQueens(int n) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 41: MAXIMUM SUBARRAY
  // =========================================================
  41: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 42: SPIRAL MATRIX
  // =========================================================
  42: {
    javascript: {
      boilerplate: `/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 43: JUMP GAME
  // =========================================================
  43: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def canJump(self, nums: List[int]) -> bool:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public boolean canJump(int[] nums) {
        // Write your code here
        return false;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 44: MERGE INTERVALS
  // =========================================================
  44: {
    javascript: {
      boilerplate: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your code here
        return new int[][]{};
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 45: INSERT INTERVAL
  // =========================================================
  45: {
    javascript: {
      boilerplate: `/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        // Write your code here
        return new int[][]{};
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 46: LENGTH OF LAST WORD
  // =========================================================
  46: {
    javascript: {
      boilerplate: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int lengthOfLastWord(String s) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int lengthOfLastWord(string s) {
        // Write your code here
        
    }
};`
    }
  },// =========================================================
  // PROBLEM 47: SPIRAL MATRIX II
  // =========================================================
  47: {
    javascript: {
      boilerplate: `/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int[][] generateMatrix(int n) {
        // Write your code here
        return new int[][]{};
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 48: PERMUTATION SEQUENCE
  // =========================================================
  48: {
    javascript: {
      boilerplate: `/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public String getPermutation(int n, int k) {
        // Write your code here
        return "";
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string getPermutation(int n, int k) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 49: ROTATE LIST
  // =========================================================
  49: {
    javascript: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        # Write your code here
        pass`
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
    public ListNode rotateRight(ListNode head, int k) {
        // Write your code here
        return null;
    }
}`
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
    ListNode* rotateRight(ListNode* head, int k) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 50: UNIQUE PATHS
  // =========================================================
  50: {
    javascript: {
      boilerplate: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int uniquePaths(int m, int n) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int uniquePaths(int m, int n) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 51: UNIQUE PATHS II
  // =========================================================
  51: {
    javascript: {
      boilerplate: `/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 52: MINIMUM PATH SUM
  // =========================================================
  52: {
    javascript: {
      boilerplate: `/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int minPathSum(int[][] grid) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 53: VALID NUMBER
  // =========================================================
  53: {
    javascript: {
      boilerplate: `/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def isNumber(self, s: str) -> bool:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public boolean isNumber(String s) {
        // Write your code here
        return false;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool isNumber(string s) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 54: PLUS ONE
  // =========================================================
  54: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int[] plusOne(int[] digits) {
        // Write your code here
        return new int[]{};
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 55: ADD BINARY
  // =========================================================
  55: {
    javascript: {
      boilerplate: `/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def addBinary(self, a: str, b: str) -> str:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public String addBinary(String a, String b) {
        // Write your code here
        return "";
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string addBinary(string a, string b) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 56: TEXT JUSTIFICATION
  // =========================================================
  56: {
    javascript: {
      boilerplate: `/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 57: SQRT(X)
  // =========================================================
  57: {
    javascript: {
      boilerplate: `/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def mySqrt(self, x: int) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int mySqrt(int x) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int mySqrt(int x) {
        // Write your code here
        
    }
};`
    }
  },// =========================================================
  // PROBLEM 58: CLIMBING STAIRS
  // =========================================================
  58: {
    javascript: {
      boilerplate: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int climbStairs(int n) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int climbStairs(int n) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 59: SIMPLIFY PATH
  // =========================================================
  59: {
    javascript: {
      boilerplate: `/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def simplifyPath(self, path: str) -> str:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public String simplifyPath(String path) {
        // Write your code here
        return "";
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string simplifyPath(string path) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 60: EDIT DISTANCE
  // =========================================================
  60: {
    javascript: {
      boilerplate: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int minDistance(String word1, String word2) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int minDistance(string word1, string word2) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 61: SET MATRIX ZEROES
  // =========================================================
  61: {
    javascript: {
      boilerplate: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public void setZeroes(int[][] matrix) {
        // Write your code here
        
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 62: SEARCH A 2D MATRIX
  // =========================================================
  62: {
    javascript: {
      boilerplate: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Write your code here
        return false;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 63: SORT COLORS
  // =========================================================
  63: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public void sortColors(int[] nums) {
        // Write your code here
        
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    void sortColors(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 64: MINIMUM WINDOW SUBSTRING
  // =========================================================
  64: {
    javascript: {
      boilerplate: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public String minWindow(String s, String t) {
        // Write your code here
        return "";
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    string minWindow(string s, string t) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 65: COMBINATIONS
  // =========================================================
  65: {
    javascript: {
      boilerplate: `/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> combine(int n, int k) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 66: SUBSETS
  // =========================================================
  66: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 67: WORD SEARCH
  // =========================================================
  67: {
    javascript: {
      boilerplate: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public boolean exist(char[][] board, String word) {
        // Write your code here
        return false;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 68: REMOVE DUPLICATES FROM SORTED ARRAY II
  // =========================================================
  68: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Write your code here
        return 0;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 69: SEARCH IN ROTATED SORTED ARRAY II
  // =========================================================
  69: {
    javascript: {
      boilerplate: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        # Write your code here
        pass`
    },
    java: {
      boilerplate: `class Solution {
    public boolean search(int[] nums, int target) {
        // Write your code here
        return false;
    }
}`
    },
    cpp: {
      boilerplate: `class Solution {
public:
    bool search(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`
    }
  },

  // =========================================================
  // PROBLEM 70: REMOVE DUPLICATES FROM SORTED LIST II
  // =========================================================
  70: {
    javascript: {
      boilerplate: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    // Write your code here
    
};`
    },
    python: {
      boilerplate: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass`
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
    public ListNode deleteDuplicates(ListNode head) {
        // Write your code here
        return null;
    }
}`
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
    ListNode* deleteDuplicates(ListNode* head) {
        // Write your code here
        
    }
};`
    }
  }
    
}