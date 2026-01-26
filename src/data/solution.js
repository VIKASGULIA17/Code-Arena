export const problemApproaches = {
  1: {
    id: 1,
    title: "Two Sum Solution: Optimal Approach using Hash Map",
    description: "This approach utilizes a Hash Map to store previously visited numbers and their indices, allowing us to find the target pair in a single pass. Instead of checking every combination with nested loops, we calculate the required 'complement' (target - current) for each number. If this complement exists in our map, we have found the solution instantly.",
    algorithm: [
      "Initialize an empty Hash Map (or Dictionary) to map numbers to their indices.",
      "Iterate through the input array `nums` one element at a time.",
      "For the current element `nums[i]`, calculate the `complement` needed: `complement = target - nums[i]`.",
      "Check if the `complement` already exists in the Hash Map.",
      "If it exists, return the index stored in the map and the current index `i`.",
      "If it does not exist, add the current element `nums[i]` as the key and index `i` as the value to the map.",
      "Continue until a solution is found (guaranteed by problem constraints)."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "Where n is the number of elements in the array. We traverse the list containing n elements exactly once, and each look up in the table costs only O(1) time."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "Where n is the number of elements in the array. The extra space required depends on the number of items stored in the hash table, which stores at most n elements."
    }
  },
  2: {
    id: 2,
    title: "Add Two Numbers Solution: Elementary Math with Carry",
    description: "This approach simulates the addition of two numbers exactly as we do on paper, digit by digit, starting from the least significant digit (which is conveniently at the head of the lists). We traverse both linked lists simultaneously, maintaining a 'carry' variable to handle sums greater than 9, and build a new result list node by node.",
    algorithm: [
      "Initialize a dummy head node to simplify the construction of the result list, and a `current` pointer to track the tail.",
      "Initialize a variable `carry` to 0.",
      "Loop while either linked list `l1` or `l2` is not null, or while `carry` is greater than 0.",
      "Inside the loop, retrieve the values from `l1` and `l2`. If a node is null, assume its value is 0.",
      "Calculate the `sum` of the two values plus the `carry`.",
      "Update `carry` for the next iteration: `carry = floor(sum / 10)`.",
      "Create a new node with the digit `sum % 10` and attach it to `current.next`.",
      "Move the `current`, `l1`, and `l2` pointers forward (if they are not null).",
      "Once the loop finishes, return `dummy.next` as the head of the result list."
    ],
    timeComplexity: {
      value: "O(max(m, n))",
      explanation: "Where m and n are the lengths of the two linked lists. We iterate at most the length of the longer list plus one extra iteration if there is a carry at the end."
    },
    spaceComplexity: {
      value: "O(max(m, n))",
      explanation: "The length of the new list is at most `max(m, n) + 1`. This is the space required to store the output."
    }
  }

};

export const problemSolutions = {
  1: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
};`,

    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashmap = {}
        
        for i, num in enumerate(nums):
            complement = target - num
            if complement in hashmap:
                return [hashmap[complement], i]
            hashmap[num] = i
            
        return []`,

    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            
            map[nums[i]] = i;
        }
        
        return {};
    }
};`,

    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        return new int[] {};
    }
}`
  },
  2: {
    javascript: `/**
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
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 !== null || l2 !== null || carry > 0) {
        let val1 = (l1 !== null) ? l1.val : 0;
        let val2 = (l2 !== null) ? l2.val : 0;
        
        let sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }
    
    return dummy.next;
};`,

    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        current = dummy
        carry = 0
        
        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            
            total = val1 + val2 + carry
            carry = total // 10
            
            current.next = ListNode(total % 10)
            current = current.next
            
            if l1: l1 = l1.next
            if l2: l2 = l2.next
            
        return dummy.next`,

    cpp: `/**
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
        ListNode* dummy = new ListNode(0);
        ListNode* current = dummy;
        int carry = 0;
        
        while (l1 != nullptr || l2 != nullptr || carry != 0) {
            int val1 = (l1 != nullptr) ? l1->val : 0;
            int val2 = (l2 != nullptr) ? l2->val : 0;
            
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            
            current->next = new ListNode(sum % 10);
            current = current->next;
            
            if (l1 != nullptr) l1 = l1->next;
            if (l2 != nullptr) l2 = l2->next;
        }
        
        return dummy->next;
    }
};`,

    java: `/**
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
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        int carry = 0;
        
        while (l1 != null || l2 != null || carry > 0) {
            int val1 = (l1 != null) ? l1.val : 0;
            int val2 = (l2 != null) ? l2.val : 0;
            
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            
            current.next = new ListNode(sum % 10);
            current = current.next;
            
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        
        return dummy.next;
    }
}`
  }
};