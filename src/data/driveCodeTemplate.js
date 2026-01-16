export const driverCode_Template = {
  // =========================================================
  // PROBLEM 1: TWO SUM
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
    
};`,
      driverCode: (userCode, cases) => `
// 1. User Code
${userCode}

// 2. Hidden Driver Code
const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const result = twoSum(t.input.nums, t.input.target);
        resultEntry.actual = result;
        resultEntry.expected = t.expected;
        
        // Compare arrays by stringifying them
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

// Print the final JSON array so frontend can parse it
console.log(JSON.stringify(results));
`,
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

# 2. Hidden Driver Code
cases_json = '${JSON.stringify(cases)}'
test_cases = json.loads(cases_json)
solution = Solution()
results = []

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

# Print the final JSON array
print(json.dumps(results))
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
function createLinkedList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    arr.forEach(val => {
        current.next = new ListNode(val);
        current = current.next;
    });
    return dummy.next;
}
function linkedListToArray(head) {
    let arr = [];
    let current = head;
    while (current) {
        arr.push(current.val);
        current = current.next;
    }
    return arr;
}

${userCode}

const testCases = ${JSON.stringify(cases)};
const results = [];

testCases.forEach((t, index) => {
    const resultEntry = { id: index + 1 };
    try {
        const l1 = createLinkedList(t.input.l1);
        const l2 = createLinkedList(t.input.l2);
        
        const resultHead = addTwoNumbers(l1, l2);
        const resultArray = linkedListToArray(resultHead);
        
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
def create_linked_list(arr):
    dummy = ListNode(0)
    current = dummy
    for val in arr:
        current.next = ListNode(val)
        current = current.next
    return dummy.next
def linked_list_to_array(head):
    arr = []
    current = head
    while current:
        arr.append(current.val)
        current = current.next
    return arr

${userCode}

cases_json = '${JSON.stringify(cases)}'
test_cases = json.loads(cases_json)
solution = Solution()
results = []

for i, t in enumerate(test_cases):
    result_entry = {"id": i + 1}
    try:
        l1 = create_linked_list(t["input"]["l1"])
        l2 = create_linked_list(t["input"]["l2"])
        
        result_head = solution.addTwoNumbers(l1, l2)
        result_array = linked_list_to_array(result_head)
        
        result_entry["actual"] = result_array
        result_entry["expected"] = t["expected"]
        
        if result_array == t["expected"]:
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
  },
};