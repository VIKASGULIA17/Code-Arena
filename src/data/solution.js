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
  },3: {
    id: 3,
    title: "Longest Substring Without Repeating Characters: Sliding Window",
    description: "To find the longest substring without repeating characters efficiently, we use the Sliding Window technique. We maintain a window defined by two pointers (left and right) and a Hash Map (or Set) to track characters currently in the window. As we expand the window to the right, if we encounter a duplicate character, we shrink the window from the left until the duplicate is removed.",
    algorithm: [
      "Initialize a Hash Map (or integer array for ASCII) `map` to store the last seen index of each character.",
      "Initialize two pointers, `left` = 0 and `right` = 0, and a variable `maxLen` = 0.",
      "Iterate `right` from 0 to the end of the string.",
      "If `s[right]` is already in the map and its index is greater than or equal to `left`, update `left` to `map[s[right]] + 1` (jump directly past the previous occurrence).",
      "Update the map with the current character's new index: `map[s[right]] = right`.",
      "Calculate the current window length (`right - left + 1`) and update `maxLen` if it's larger.",
      "Return `maxLen` after the loop finishes."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "Where n is the length of the string. We traverse the string exactly once."
    },
    spaceComplexity: {
      value: "O(min(m, n))",
      explanation: "Where m is the size of the charset (e.g., 128 for ASCII) and n is the string length. The map stores at most unique characters."
    }
  },

  4: {
    id: 4,
    title: "Median of Two Sorted Arrays: Binary Search on Partition",
    description: "The brute force approach of merging arrays takes O(m+n), but the requirement O(log(m+n)) suggests Binary Search. We perform a binary search on the smaller array to find a partition point such that all elements on the left side (from both arrays) are smaller than all elements on the right side. The median can then be calculated from the boundary elements.",
    algorithm: [
      "Ensure `nums1` is the smaller array to minimize the binary search range. If not, swap them.",
      "Set `low = 0` and `high = nums1.length`.",
      "Loop while `low <= high`. Calculate partition `partitionX` for `nums1` and `partitionY` for `nums2`.",
      "Find the four critical values around the partitions: `maxLeftX`, `minRightX`, `maxLeftY`, `minRightY`.",
      "Check if the partition is valid: `maxLeftX <= minRightY` and `maxLeftY <= minRightX`.",
      "If valid: Calculate median. If total length is even, avg of `max(maxLeftX, maxLeftY)` and `min(minRightX, minRightY)`. If odd, `max(maxLeftX, maxLeftY)`.",
      "If not valid: Adjust `low` or `high` to shift the partition and try again."
    ],
    timeComplexity: {
      value: "O(log(min(m, n)))",
      explanation: "We perform a binary search only on the smaller of the two arrays."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only store a few pointers and variables, regardless of input size."
    }
  },

  5: {
    id: 5,
    title: "Valid Parentheses: Stack Data Structure",
    description: "This problem is a classic application of the Stack data structure (LIFO). We traverse the string and push opening brackets onto the stack. When we encounter a closing bracket, we check if it matches the top element of the stack. If it matches, we pop the top; otherwise, the string is invalid.",
    algorithm: [
      "Initialize an empty stack.",
      "Create a mapping for brackets: `)` -> `(`, `}` -> `{`, `]` -> `[`.",
      "Iterate through each character `c` in the string.",
      "If `c` is an opening bracket, push it onto the stack.",
      "If `c` is a closing bracket, check if the stack is empty. If it is, return `false`.",
      "If the stack is not empty, pop the top element. If the popped element does not match the mapping for `c`, return `false`.",
      "After the loop, return `true` only if the stack is empty (meaning all brackets were closed)."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "Where n is the length of the string. We traverse the string once, and push/pop operations take O(1)."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "In the worst case (e.g., '((((('), the stack will grow to size n."
    }
  },

  6: {
    id: 6,
    title: "Merge k Sorted Lists: Min-Heap (Priority Queue)",
    description: "A naive approach compares the heads of all k lists at every step, taking O(k * N). We can optimize this using a Min-Heap. We insert the first node of every list into the heap. Then, we repeatedly extract the minimum node (top of heap), add it to our result list, and push the next node from that specific linked list back into the heap.",
    algorithm: [
      "Initialize a Min-Heap (Priority Queue).",
      "Iterate through the `lists` array and push the head of each non-null list into the heap.",
      "Initialize a `dummy` node and a `tail` pointer to build the result list.",
      "Loop while the heap is not empty:",
      "  - Pop the smallest node `minNode` from the heap.",
      "  - Attach `minNode` to `tail.next` and move `tail` forward.",
      "  - If `minNode.next` exists, push it into the heap.",
      "Return `dummy.next`."
    ],
    timeComplexity: {
      value: "O(N log k)",
      explanation: "Where N is the total number of nodes across all lists, and k is the number of linked lists. Heap insertion/removal takes O(log k)."
    },
    spaceComplexity: {
      value: "O(k)",
      explanation: "The heap stores at most k nodes at any one time."
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
  },3: {
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let map = new Map();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right])) {
            left = Math.max(left, map.get(s[right]) + 1);
        }
        map.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};`,

    python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        left = 0
        max_len = 0
        
        for right, char in enumerate(s):
            if char in char_map and char_map[char] >= left:
                left = char_map[char] + 1
            char_map[char] = right
            max_len = max(max_len, right - left + 1)
            
        return max_len`,

    cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> dict(256, -1);
        int maxLen = 0, start = -1;
        
        for (int i = 0; i < s.length(); i++) {
            if (dict[s[i]] > start)
                start = dict[s[i]];
            dict[s[i]] = i;
            maxLen = max(maxLen, i - start);
        }
        
        return maxLen;
    }
};`,

    java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] map = new int[128];
        int left = 0, maxLen = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            left = Math.max(left, map[c]);
            maxLen = Math.max(maxLen, right - left + 1);
            map[c] = right + 1;
        }
        
        return maxLen;
    }
}`
  },

  4: {
    javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    
    let x = nums1.length;
    let y = nums2.length;
    let low = 0, high = x;
    
    while (low <= high) {
        let partitionX = Math.floor((low + high) / 2);
        let partitionY = Math.floor((x + y + 1) / 2) - partitionX;
        
        let maxX = (partitionX === 0) ? Number.NEGATIVE_INFINITY : nums1[partitionX - 1];
        let maxY = (partitionY === 0) ? Number.NEGATIVE_INFINITY : nums2[partitionY - 1];
        
        let minX = (partitionX === x) ? Number.POSITIVE_INFINITY : nums1[partitionX];
        let minY = (partitionY === y) ? Number.POSITIVE_INFINITY : nums2[partitionY];
        
        if (maxX <= minY && maxY <= minX) {
            if ((x + y) % 2 === 0) {
                return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
            } else {
                return Math.max(maxX, maxY);
            }
        } else if (maxX > minY) {
            high = partitionX - 1;
        } else {
            low = partitionX + 1;
        }
    }
    return 0;
};`,

    python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
            
        x, y = len(nums1), len(nums2)
        low, high = 0, x
        
        while low <= high:
            partitionX = (low + high) // 2
            partitionY = (x + y + 1) // 2 - partitionX
            
            maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
            maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
            minX = float('inf') if partitionX == x else nums1[partitionX]
            minY = float('inf') if partitionY == y else nums2[partitionY]
            
            if maxX <= minY and maxY <= minX:
                if (x + y) % 2 == 0:
                    return (max(maxX, maxY) + min(minX, minY)) / 2
                else:
                    return max(maxX, maxY)
            elif maxX > minY:
                high = partitionX - 1
            else:
                low = partitionX + 1`,

    cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        
        int x = nums1.size();
        int y = nums2.size();
        int low = 0, high = x;
        
        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (x + y + 1) / 2 - partitionX;
            
            int maxX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
            int maxY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
            
            int minX = (partitionX == x) ? INT_MAX : nums1[partitionX];
            int minY = (partitionY == y) ? INT_MAX : nums2[partitionY];
            
            if (maxX <= minY && maxY <= minX) {
                if ((x + y) % 2 == 0) {
                    return (double)(max(maxX, maxY) + min(minX, minY)) / 2;
                } else {
                    return (double)max(maxX, maxY);
                }
            } else if (maxX > minY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }
        return 0.0;
    }
};`,

    java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        
        int x = nums1.length;
        int y = nums2.length;
        int low = 0, high = x;
        
        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (x + y + 1) / 2 - partitionX;
            
            int maxX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int maxY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            
            int minX = (partitionX == x) ? Integer.MAX_VALUE : nums1[partitionX];
            int minY = (partitionY == y) ? Integer.MAX_VALUE : nums2[partitionY];
            
            if (maxX <= minY && maxY <= minX) {
                if ((x + y) % 2 == 0) {
                    return ((double)Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
                } else {
                    return (double)Math.max(maxX, maxY);
                }
            } else if (maxX > minY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }
        return 0.0;
    }
}`
  },

  5: {
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (map[char]) {
            stack.push(char);
        } else {
            const top = stack.pop();
            if (map[top] !== char) return false;
        }
    }
    
    return stack.length === 0;
};`,

    python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
                
        return not stack`,

    cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> stack;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.empty()) return false;
                char top = stack.top();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) {
                    return false;
                }
                stack.pop();
            }
        }
        return stack.empty();
    }
};`,

    java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}`
  },

  6: {
    javascript: `/**
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
    if (lists.length === 0) return null;
    
    while (lists.length > 1) {
        let a = lists.shift();
        let b = lists.shift();
        lists.push(merge(a, b));
    }
    return lists[0];
};

function merge(a, b) {
    let dummy = new ListNode(0);
    let current = dummy;
    
    while (a && b) {
        if (a.val < b.val) {
            current.next = a;
            a = a.next;
        } else {
            current.next = b;
            b = b.next;
        }
        current = current.next;
    }
    
    if (a) current.next = a;
    if (b) current.next = b;
    
    return dummy.next;
};`,

    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
import heapq

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        min_heap = []
        
        # Add first node of each list to heap
        # Note: id(node) is used to handle comparison if vals are equal
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(min_heap, (node.val, i, node))
                
        dummy = ListNode(0)
        curr = dummy
        
        while min_heap:
            val, i, node = heapq.heappop(min_heap)
            curr.next = node
            curr = curr.next
            
            if node.next:
                heapq.heappush(min_heap, (node.next.val, i, node.next))
                
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
    struct CompareNode {
        bool operator()(ListNode* const& p1, ListNode* const& p2) {
            return p1->val > p2->val;
        }
    };

    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, CompareNode> pq;
        
        for (auto l : lists) {
            if (l) pq.push(l);
        }
        
        ListNode* dummy = new ListNode(0);
        ListNode* tail = dummy;
        
        while (!pq.empty()) {
            ListNode* temp = pq.top();
            pq.pop();
            
            tail->next = temp;
            tail = tail->next;
            
            if (temp->next) pq.push(temp->next);
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
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        
        PriorityQueue<ListNode> queue = new PriorityQueue<>((a, b) -> a.val - b.val);
        
        for (ListNode node : lists) {
            if (node != null) queue.add(node);
        }
        
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        
        while (!queue.isEmpty()) {
            ListNode node = queue.poll();
            tail.next = node;
            tail = tail.next;
            
            if (node.next != null) {
                queue.add(node.next);
            }
        }
        
        return dummy.next;
    }
}`
  }
};