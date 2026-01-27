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
  },
  7: {
    id: 7,
    title: "Best Time to Buy and Sell Stock: Single Pass",
    description: "The brute force approach would be to calculate the profit for every pair of buy/sell days, taking O(n²). However, we can solve this in a single pass. We keep track of the minimum price encountered so far. For each day, we calculate the profit if we sold on that day (current price - min price). We then update the maximum profit seen so far.",
    algorithm: [
      "Initialize `min_price` to infinity and `max_profit` to 0.",
      "Iterate through the `prices` array.",
      "For each price, update `min_price`: `min_price = min(min_price, price)`.",
      "Calculate the potential profit for the current day: `profit = price - min_price`.",
      "Update `max_profit`: `max_profit = max(max_profit, profit)`.",
      "After the loop ends, return `max_profit`."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We traverse the prices array exactly once."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use two variables to store the minimum price and maximum profit."
    }
  },

  8: {
    id: 8,
    title: "Binary Tree Level Order Traversal: Breadth-First Search (BFS)",
    description: "To traverse a tree level by level, we use a Queue data structure (FIFO). We start by pushing the root into the queue. Then, we process the queue level by level. For each level, we extract all nodes currently in the queue, record their values, and push their children (left and right) back into the queue for the next iteration.",
    algorithm: [
      "If the root is null, return an empty list.",
      "Initialize a `queue` and add the `root` to it.",
      "Initialize a `result` list to store the levels.",
      "Loop while the `queue` is not empty:",
      "  - Determine the `level_size` (number of nodes in the current level).",
      "  - Create a `current_level` list.",
      "  - Loop `level_size` times:",
      "    - Dequeue a node, add its value to `current_level`.",
      "    - If the node has a left child, enqueue it.",
      "    - If the node has a right child, enqueue it.",
      "  - Add `current_level` to `result`.",
      "Return `result`."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We visit each node in the tree exactly once."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "In the worst case (a balanced tree), the queue will store roughly n/2 nodes at the last level."
    }
  },

  9: {
    id: 9,
    title: "Next Permutation: Single Pass Algorithm",
    description: "To find the next lexicographically greater permutation, we need to find the first pair of adjacent elements from the right that satisfies `nums[i] < nums[i+1]`. This marks the pivot where the order can be increased. We then swap `nums[i]` with the smallest number greater than `nums[i]` to its right, and reverse the sequence after index `i` to make it the smallest possible suffix.",
    algorithm: [
      "Iterate from right to left to find the first index `i` such that `nums[i] < nums[i+1]`.",
      "If no such index exists, the array is in descending order. Reverse the whole array and return.",
      "If such an index `i` is found, iterate from right to left again to find the first index `j` where `nums[j] > nums[i]`.",
      "Swap `nums[i]` and `nums[j]`.",
      "Reverse the sub-array from index `i + 1` to the end to get the lexicographically smallest suffix.",
      "The array is now modified in-place to the next permutation."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "In the worst case, we scan the array twice and reverse a portion of it, all of which are linear operations."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "The operations are performed in-place with constant extra memory."
    }
  },

  10: {
    id: 10,
    title: "Palindrome Number: Revert Half of the Number",
    description: "Converting the integer to a string requires extra space. Instead, we can mathematically reverse the last half of the number and compare it with the first half. If they are equal, the number is a palindrome. We handle edge cases like negative numbers (never palindromes) and numbers ending in 0.",
    algorithm: [
      "If `x < 0` or `(x % 10 == 0 && x != 0)`, return `false`.",
      "Initialize `revertedNumber = 0`.",
      "Loop while `x > revertedNumber`:",
      "  - Extract the last digit: `x % 10`.",
      "  - Append it to `revertedNumber`: `revertedNumber = revertedNumber * 10 + (x % 10)`.",
      "  - Remove the last digit from `x`: `x = floor(x / 10)`.",
      "After the loop, check if `x == revertedNumber` (even length) or `x == floor(revertedNumber / 10)` (odd length).",
      "Return the result of the check."
    ],
    timeComplexity: {
      value: "O(log n)",
      explanation: "We process approximately half the digits of the input number n."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use a few variables for integer arithmetic."
    }
  },

  11: {
    id: 11,
    title: "Container With Most Water: Two Pointer Approach",
    description: "To maximize the area, we want to maximize both the width and the height of the container. We start with the widest possible container (pointers at both ends). At each step, we calculate the area and then move the pointer pointing to the shorter line inward, hoping to find a taller line that compensates for the reduced width.",
    algorithm: [
      "Initialize two pointers, `left` at the start (0) and `right` at the end (n-1) of the array.",
      "Initialize `max_area` to 0.",
      "Loop while `left < right`:",
      "  - Calculate the current height: `h = min(height[left], height[right])`.",
      "  - Calculate the width: `w = right - left`.",
      "  - Update `max_area = max(max_area, h * w)`.",
      "  - If `height[left] < height[right]`, move the `left` pointer forward (`left++`).",
      "  - Otherwise, move the `right` pointer backward (`right--`).",
      "Return `max_area`."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We traverse the array once with two pointers moving towards each other."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for pointers and variables."
    }
  },
    12: {
    id: 12,
    title: "Roman to Integer: Hash Map Approach",
    description: "Roman numerals are converted to integers by summing their values, with a special rule: if a smaller value appears before a larger value, we subtract the smaller value instead of adding it (e.g., IV = 4, IX = 9). We iterate through the string and compare each character with the next one to determine whether to add or subtract.",
    algorithm: [
      "Create a hash map to store the value of each Roman numeral symbol:",
      "  - I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000",
      "Initialize `result` to 0.",
      "Loop through the string from index 0 to n-2:",
      "  - Get the current value: `current = map[s[i]]`.",
      "  - Get the next value: `next = map[s[i+1]]`.",
      "  - If `current < next`, subtract current from result (subtraction case).",
      "  - Otherwise, add current to result.",
      "Add the last character's value to result (it's never subtracted).",
      "Return `result`."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We iterate through the string once, where n is the length of the string."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "The hash map has a fixed size of 7 entries, regardless of input size."
    }
  },

  13: {
    id: 13,
    title: "Longest Common Prefix: Vertical Scanning",
    description: "To find the longest common prefix among an array of strings, we can compare characters at the same position across all strings. We scan vertically (column by column) from the first character to the last, stopping when we find a mismatch or reach the end of any string.",
    algorithm: [
      "If the array is empty, return empty string.",
      "Loop through each character position `i` from 0 to length of first string:",
      "  - Get the character at position `i` in the first string: `char = strs[0][i]`.",
      "  - Loop through all strings from index 1 to n-1:",
      "    - If we've reached the end of any string (`i >= strs[j].length`), return the prefix up to position i.",
      "    - If the character at position `i` doesn't match (`strs[j][i] != char`), return the prefix up to position i.",
      "If we complete the loop, return the entire first string (all strings are identical up to its length)."
    ],
    timeComplexity: {
      value: "O(S)",
      explanation: "Where S is the sum of all characters in all strings. In the worst case, we compare all characters."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for variables and the result string."
    }
  },

  14: {
    id: 14,
    title: "3Sum: Two Pointer with Sorting",
    description: "To find all unique triplets that sum to zero, we first sort the array. Then for each element, we use two pointers to find pairs that sum to the negative of that element. Sorting helps us skip duplicates and use the two-pointer technique efficiently.",
    algorithm: [
      "Sort the array in ascending order.",
      "Initialize an empty result array.",
      "Loop through the array with index `i` from 0 to n-3:",
      "  - Skip duplicate values: if `i > 0 && nums[i] == nums[i-1]`, continue.",
      "  - Set `target = -nums[i]` (we need to find two numbers that sum to target).",
      "  - Initialize two pointers: `left = i + 1`, `right = n - 1`.",
      "  - While `left < right`:",
      "    - Calculate `sum = nums[left] + nums[right]`.",
      "    - If `sum == target`, we found a triplet:",
      "      - Add `[nums[i], nums[left], nums[right]]` to result.",
      "      - Skip duplicates: increment `left` while `nums[left] == nums[left+1]`.",
      "      - Skip duplicates: decrement `right` while `nums[right] == nums[right-1]`.",
      "      - Move both pointers: `left++`, `right--`.",
      "    - Else if `sum < target`, move `left` pointer forward.",
      "    - Else, move `right` pointer backward.",
      "Return the result array."
    ],
    timeComplexity: {
      value: "O(n²)",
      explanation: "Sorting takes O(n log n), and the two-pointer search for each element takes O(n²) total."
    },
    spaceComplexity: {
      value: "O(1) or O(n)",
      explanation: "O(1) extra space if we don't count the output array. O(n) if we count the space for sorting."
    }
  },

  15: {
    id: 15,
    title: "Letter Combinations of a Phone Number: Backtracking",
    description: "Each digit maps to a set of letters (like on a phone keypad). We use backtracking to explore all possible combinations by choosing one letter for each digit, building up the combination character by character.",
    algorithm: [
      "If the input string is empty, return an empty array.",
      "Create a mapping from digits to letters:",
      "  - '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',",
      "  - '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'",
      "Initialize an empty result array and an empty current combination string.",
      "Define a backtracking function with parameters (index, current_combination):",
      "  - Base case: if `index == digits.length`, add current_combination to result and return.",
      "  - Get the letters corresponding to `digits[index]`.",
      "  - Loop through each letter:",
      "    - Add the letter to current_combination.",
      "    - Recursively call backtrack with `index + 1`.",
      "    - Remove the letter (backtrack).",
      "Call the backtracking function starting at index 0.",
      "Return the result array."
    ],
    timeComplexity: {
      value: "O(4ⁿ)",
      explanation: "Where n is the length of the input string. Each digit can map to up to 4 letters (7 and 9), so we generate up to 4ⁿ combinations."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "The recursion depth is n, and we store the current combination of length n."
    }
  },

  16: {
    id: 16,
    title: "Remove Nth Node From End of List: Two Pointer (Fast and Slow)",
    description: "To remove the nth node from the end in one pass, we use two pointers separated by n nodes. When the fast pointer reaches the end, the slow pointer will be at the node before the one to be removed.",
    algorithm: [
      "Create a dummy node pointing to head (handles edge case of removing the head).",
      "Initialize two pointers: `fast = dummy` and `slow = dummy`.",
      "Move `fast` pointer n+1 steps forward (to create a gap of n nodes).",
      "Move both pointers forward until `fast` reaches the end:",
      "  - `fast = fast.next`",
      "  - `slow = slow.next`",
      "Now `slow` is at the node before the one to remove.",
      "Remove the node: `slow.next = slow.next.next`.",
      "Return `dummy.next` (the new head)."
    ],
    timeComplexity: {
      value: "O(L)",
      explanation: "Where L is the length of the linked list. We traverse the list once."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for the pointers."
    }
  },

  17: {
    id: 17,
    title: "Generate Parentheses: Backtracking with Balance Tracking",
    description: "To generate all valid combinations of n pairs of parentheses, we use backtracking while maintaining the balance: we can only add an opening parenthesis if we haven't used all n, and we can only add a closing parenthesis if it doesn't exceed the number of opening ones.",
    algorithm: [
      "Initialize an empty result array.",
      "Define a backtracking function with parameters (current_string, open_count, close_count):",
      "  - Base case: if `current_string.length == 2 * n`:",
      "    - Add current_string to result and return.",
      "  - If `open_count < n` (we can still add opening parentheses):",
      "    - Add '(' to current_string and recurse with `open_count + 1`.",
      "  - If `close_count < open_count` (we can add closing parenthesis):",
      "    - Add ')' to current_string and recurse with `close_count + 1`.",
      "Call the backtracking function starting with empty string, 0 opens, 0 closes.",
      "Return the result array."
    ],
    timeComplexity: {
      value: "O(4ⁿ / √n)",
      explanation: "This is the nth Catalan number, which approximates to 4ⁿ / (n√n)."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "The recursion depth is 2n (maximum length of a valid combination)."
    }
  },

  18: {
    id: 18,
    title: "Merge Two Sorted Lists: Iterative Approach",
    description: "To merge two sorted linked lists, we use a dummy node and build the merged list by always choosing the smaller node from the two lists. We iterate until one list is exhausted, then append the remaining nodes from the other list.",
    algorithm: [
      "Create a dummy node to serve as the starting point.",
      "Initialize a `current` pointer to the dummy node.",
      "While both `list1` and `list2` are not null:",
      "  - Compare `list1.val` and `list2.val`.",
      "  - If `list1.val <= list2.val`:",
      "    - Attach list1 to current: `current.next = list1`.",
      "    - Move list1 forward: `list1 = list1.next`.",
      "  - Else:",
      "    - Attach list2 to current: `current.next = list2`.",
      "    - Move list2 forward: `list2 = list2.next`.",
      "  - Move current forward: `current = current.next`.",
      "Attach the remaining nodes (either list1 or list2, whichever is not null):",
      "  - `current.next = list1 != null ? list1 : list2`.",
      "Return `dummy.next` (the head of the merged list)."
    ],
    timeComplexity: {
      value: "O(m + n)",
      explanation: "Where m and n are the lengths of the two lists. We visit each node once."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for pointers."
    }
  },

  19: {
    id: 19,
    title: "Swap Nodes in Pairs: Iterative Pointer Manipulation",
    description: "To swap adjacent nodes in pairs, we iterate through the list and carefully update the pointers to reverse each pair. We use a dummy node to handle the head swap cleanly.",
    algorithm: [
      "Create a dummy node pointing to head.",
      "Initialize `prev = dummy`.",
      "While there are at least two more nodes to swap:",
      "  - Identify the nodes: `first = prev.next`, `second = first.next`.",
      "  - Perform the swap:",
      "    - `prev.next = second` (prev now points to second).",
      "    - `first.next = second.next` (first points to the node after second).",
      "    - `second.next = first` (second points back to first).",
      "  - Move prev forward by 2: `prev = first` (first is now the last node of the swapped pair).",
      "Return `dummy.next` (the new head)."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We traverse the list once, visiting each node."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for pointers."
    }
  },

  20: {
    id: 20,
    title: "Reverse Nodes in k-Group: Iterative Reversal with Grouping",
    description: "To reverse nodes in groups of k, we first check if there are at least k nodes remaining. If yes, we reverse that group and connect it properly. We repeat this process for each group of k nodes.",
    algorithm: [
      "Create a dummy node pointing to head.",
      "Initialize `prev_group_end = dummy`.",
      "While there are nodes remaining:",
      "  - Check if there are k nodes left:",
      "    - Use a pointer to count k nodes ahead.",
      "    - If we can't reach k nodes, break (leave remaining nodes as-is).",
      "  - Reverse the next k nodes:",
      "    - Keep track of: `group_start`, `group_end`, `next_group_start`.",
      "    - Use standard linked list reversal for k nodes.",
      "  - Connect the reversed group:",
      "    - `prev_group_end.next = group_end` (new start of reversed group).",
      "    - `group_start.next = next_group_start` (end of reversed group points to next).",
      "  - Update `prev_group_end = group_start` (for next iteration).",
      "Return `dummy.next` (the new head)."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We visit each node a constant number of times (counting and reversing)."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for pointers."
    }
  },

  21: {
    id: 21,
    title: "Search in Rotated Sorted Array: Modified Binary Search",
    description: "A rotated sorted array has two sorted portions. At any midpoint, at least one half is guaranteed to be sorted. We determine which half is sorted, then check if the target lies in that sorted range. If yes, search that half; otherwise, search the other half.",
    algorithm: [
      "Initialize `left = 0`, `right = n - 1`.",
      "While `left <= right`:",
      "  - Calculate `mid = (left + right) / 2`.",
      "  - If `nums[mid] == target`, return mid.",
      "  - Determine which half is sorted:",
      "    - If `nums[left] <= nums[mid]` (left half is sorted):",
      "      - If `nums[left] <= target < nums[mid]`, search left: `right = mid - 1`.",
      "      - Else, search right: `left = mid + 1`.",
      "    - Else (right half is sorted):",
      "      - If `nums[mid] < target <= nums[right]`, search right: `left = mid + 1`.",
      "      - Else, search left: `right = mid - 1`.",
      "If we exit the loop, target not found: return -1."
    ],
    timeComplexity: {
      value: "O(log n)",
      explanation: "Binary search reduces the search space by half each iteration."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for pointers."
    }
  },

  22: {
    id: 22,
    title: "First and Last Position of Element: Two Binary Searches",
    description: "To find the first and last position of a target in a sorted array, we perform two separate binary searches: one to find the leftmost (first) occurrence and another to find the rightmost (last) occurrence.",
    algorithm: [
      "Define a helper function `findPosition(nums, target, findFirst)`:",
      "  - Initialize `left = 0`, `right = n - 1`, `result = -1`.",
      "  - While `left <= right`:",
      "    - Calculate `mid = (left + right) / 2`.",
      "    - If `nums[mid] == target`:",
      "      - Set `result = mid`.",
      "      - If `findFirst`, search left: `right = mid - 1`.",
      "      - Else, search right: `left = mid + 1`.",
      "    - Else if `nums[mid] < target`, search right: `left = mid + 1`.",
      "    - Else, search left: `right = mid - 1`.",
      "  - Return result.",
      "Call `findPosition` twice:",
      "  - First position: `first = findPosition(nums, target, true)`.",
      "  - Last position: `last = findPosition(nums, target, false)`.",
      "Return `[first, last]`."
    ],
    timeComplexity: {
      value: "O(log n)",
      explanation: "We perform two binary searches, each taking O(log n) time."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for variables."
    }
  },
    23: {
    id: 23,
    title: "Search Insert Position: Binary Search",
    description: "To find the position where a target should be inserted in a sorted array, we use binary search. If the target is found, we return its index. If not found, the binary search naturally converges to the position where the target should be inserted to maintain sorted order.",
    algorithm: [
      "Initialize `left = 0`, `right = n - 1`.",
      "While `left <= right`:",
      "  - Calculate `mid = (left + right) / 2`.",
      "  - If `nums[mid] == target`, return mid (target found).",
      "  - If `nums[mid] < target`, search right half: `left = mid + 1`.",
      "  - Else, search left half: `right = mid - 1`.",
      "When loop exits, `left` points to the insertion position.",
      "Return `left`."
    ],
    timeComplexity: {
      value: "O(log n)",
      explanation: "Binary search halves the search space in each iteration."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for pointers."
    }
  },

  24: {
    id: 24,
    title: "Valid Sudoku: Hash Set Validation",
    description: "To validate a Sudoku board, we need to check three constraints: each row, each column, and each 3×3 sub-box must contain unique digits (1-9). We use hash sets to track seen digits in each row, column, and box as we iterate through the board.",
    algorithm: [
      "Create three types of hash sets:",
      "  - `rows[9]`: one set for each row",
      "  - `cols[9]`: one set for each column",
      "  - `boxes[9]`: one set for each 3×3 sub-box",
      "Iterate through each cell (i, j) in the 9×9 board:",
      "  - If the cell is empty ('.'), skip it.",
      "  - Get the value: `val = board[i][j]`.",
      "  - Calculate box index: `boxIndex = (i / 3) * 3 + (j / 3)`.",
      "  - Check if val already exists in:",
      "    - `rows[i]`: if yes, return false.",
      "    - `cols[j]`: if yes, return false.",
      "    - `boxes[boxIndex]`: if yes, return false.",
      "  - Add val to all three sets: `rows[i]`, `cols[j]`, `boxes[boxIndex]`.",
      "If we complete iteration without conflicts, return true."
    ],
    timeComplexity: {
      value: "O(1)",
      explanation: "We always process exactly 81 cells (9×9), which is constant."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We use 27 hash sets with at most 9 elements each, which is constant space."
    }
  },

  25: {
    id: 25,
    title: "Sudoku Solver: Backtracking with Constraint Validation",
    description: "To solve a Sudoku puzzle, we use backtracking: try placing digits 1-9 in empty cells, check if the placement is valid (doesn't violate row, column, or box constraints), and recursively continue. If we reach a dead end, backtrack and try a different digit.",
    algorithm: [
      "Define a helper function `isValid(board, row, col, num)` that checks if placing `num` at (row, col) is valid:",
      "  - Check if `num` exists in the same row.",
      "  - Check if `num` exists in the same column.",
      "  - Check if `num` exists in the same 3×3 box.",
      "  - Return true only if all checks pass.",
      "Define a backtracking function `solve(board)`:",
      "  - Find the next empty cell (marked with '.'):",
      "    - If no empty cell found, puzzle is solved: return true.",
      "  - For each digit from '1' to '9':",
      "    - If `isValid(board, row, col, digit)`:",
      "      - Place the digit: `board[row][col] = digit`.",
      "      - Recursively solve the rest: `if solve(board) returns true`, return true.",
      "      - If recursion fails, backtrack: `board[row][col] = '.'`.",
      "  - If no digit works, return false (backtrack).",
      "Call `solve(board)` to solve the puzzle in-place."
    ],
    timeComplexity: {
      value: "O(9^m)",
      explanation: "Where m is the number of empty cells. In worst case, we try 9 possibilities for each empty cell."
    },
    spaceComplexity: {
      value: "O(m)",
      explanation: "Recursion stack depth equals the number of empty cells."
    }
  },

  26: {
    id: 26,
    title: "Count and Say: Recursive String Generation",
    description: "The count-and-say sequence is generated recursively: for each term, we read the previous term and describe it by counting consecutive identical digits. We use run-length encoding to convert the previous term into the next term.",
    algorithm: [
      "Base case: if `n == 1`, return '1'.",
      "Recursively get the previous term: `prev = countAndSay(n - 1)`.",
      "Initialize `result` as empty string.",
      "Initialize `count = 1` to track consecutive digits.",
      "Iterate through `prev` from index 0 to length-1:",
      "  - If `prev[i] == prev[i + 1]` (same digit continues):",
      "    - Increment `count`.",
      "  - Else (digit changes or end of string):",
      "    - Append `count` and `prev[i]` to result.",
      "    - Reset `count = 1`.",
      "Return `result`."
    ],
    timeComplexity: {
      value: "O(2^n)",
      explanation: "The length of the sequence can grow exponentially with n."
    },
    spaceComplexity: {
      value: "O(2^n)",
      explanation: "Space for storing the result string and recursion stack."
    }
  },

  27: {
    id: 27,
    title: "Combination Sum: Backtracking with Repetition Allowed",
    description: "To find all unique combinations that sum to a target, we use backtracking. Since we can reuse the same number multiple times, after choosing a number, we recursively explore using it again (same index) or moving to the next number.",
    algorithm: [
      "Initialize an empty result array.",
      "Define a backtracking function `backtrack(start, target, path)`:",
      "  - Base case: if `target == 0`:",
      "    - Add a copy of `path` to result and return.",
      "  - If `target < 0`, return (exceeded target).",
      "  - Loop from `start` to end of candidates array:",
      "    - Add `candidates[i]` to path.",
      "    - Recursively call `backtrack(i, target - candidates[i], path)`.",
      "      - Note: we use `i` (not `i+1`) to allow reusing the same element.",
      "    - Remove last element from path (backtrack).",
      "Call `backtrack(0, target, [])`.",
      "Return result array."
    ],
    timeComplexity: {
      value: "O(n^(T/M))",
      explanation: "Where n is the number of candidates, T is the target value, and M is the minimal value among candidates."
    },
    spaceComplexity: {
      value: "O(T/M)",
      explanation: "The maximum depth of recursion is T/M."
    }
  },

  28: {
    id: 28,
    title: "Combination Sum II: Backtracking with Duplicate Handling",
    description: "Similar to Combination Sum, but each number can only be used once, and we must avoid duplicate combinations. We sort the array first, then skip duplicate elements at the same recursion level to ensure unique combinations.",
    algorithm: [
      "Sort the candidates array in ascending order.",
      "Initialize an empty result array.",
      "Define a backtracking function `backtrack(start, target, path)`:",
      "  - Base case: if `target == 0`:",
      "    - Add a copy of `path` to result and return.",
      "  - If `target < 0`, return (exceeded target).",
      "  - Loop from `start` to end of candidates array:",
      "    - Skip duplicates at the same level: if `i > start && candidates[i] == candidates[i-1]`, continue.",
      "    - Add `candidates[i]` to path.",
      "    - Recursively call `backtrack(i + 1, target - candidates[i], path)`.",
      "      - Note: we use `i+1` (not `i`) since each element can only be used once.",
      "    - Remove last element from path (backtrack).",
      "Call `backtrack(0, target, [])`.",
      "Return result array."
    ],
    timeComplexity: {
      value: "O(2^n)",
      explanation: "In worst case, we explore all possible subsets of the candidates array."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "The recursion depth is at most n (length of candidates array)."
    }
  },

  29: {
    id: 29,
    title: "First Missing Positive: Cyclic Sort in-place",
    description: "To find the smallest missing positive integer in O(n) time and O(1) space, we use the array itself as a hash table. We place each number at its correct index (number k goes to index k-1). After rearrangement, we scan for the first index where the value doesn't match the expected value.",
    algorithm: [
      "Iterate through the array with index i:",
      "  - While `0 < nums[i] <= n` and `nums[nums[i] - 1] != nums[i]`:",
      "    - Swap `nums[i]` with `nums[nums[i] - 1]` (place nums[i] at its correct position).",
      "    - This continues until nums[i] is in the correct place or out of range.",
      "After rearrangement, iterate through the array:",
      "  - If `nums[i] != i + 1`, return `i + 1` (this is the missing positive).",
      "If all positions match, return `n + 1` (all numbers 1 to n are present)."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "Each element is swapped at most once, so total swaps are O(n)."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We modify the array in-place without using extra space."
    }
  },

  30: {
    id: 30,
    title: "Trapping Rain Water: Two Pointer Approach",
    description: "To calculate trapped water, we need to know the maximum height to the left and right of each position. Using two pointers from both ends, we track the maximum heights seen so far and calculate water trapped based on the shorter maximum (the limiting factor).",
    algorithm: [
      "Initialize `left = 0`, `right = n - 1`.",
      "Initialize `leftMax = 0`, `rightMax = 0` (track max heights).",
      "Initialize `water = 0` (accumulate trapped water).",
      "While `left < right`:",
      "  - If `height[left] < height[right]`:",
      "    - If `height[left] >= leftMax`, update `leftMax = height[left]`.",
      "    - Else, water can be trapped: `water += leftMax - height[left]`.",
      "    - Move left pointer: `left++`.",
      "  - Else:",
      "    - If `height[right] >= rightMax`, update `rightMax = height[right]`.",
      "    - Else, water can be trapped: `water += rightMax - height[right]`.",
      "    - Move right pointer: `right--`.",
      "Return `water`."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We traverse the array once with two pointers meeting in the middle."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for pointers and variables."
    }
  },

  31: {
    id: 31,
    title: "Multiply Strings: Digit-by-Digit Multiplication",
    description: "To multiply two numbers represented as strings without converting them to integers, we simulate manual multiplication. Each digit of num1 is multiplied by each digit of num2, and results are accumulated at the appropriate position in a result array.",
    algorithm: [
      "Handle edge case: if either string is '0', return '0'.",
      "Initialize result array of size `m + n` filled with zeros.",
      "Iterate through num1 from right to left (index i):",
      "  - Iterate through num2 from right to left (index j):",
      "    - Calculate product: `mul = num1[i] * num2[j]`.",
      "    - Calculate positions: `p1 = i + j`, `p2 = i + j + 1`.",
      "    - Add mul to existing value at p2: `sum = mul + result[p2]`.",
      "    - Store the ones digit: `result[p2] = sum % 10`.",
      "    - Add carry to p1: `result[p1] += sum / 10`.",
      "Convert result array to string, skipping leading zeros.",
      "Return the result string."
    ],
    timeComplexity: {
      value: "O(m × n)",
      explanation: "We perform m × n digit multiplications, where m and n are the lengths of the two strings."
    },
    spaceComplexity: {
      value: "O(m + n)",
      explanation: "We store the result in an array of size m + n."
    }
  },

  32: {
    id: 32,
    title: "Wildcard Matching: Dynamic Programming",
    description: "To match a string against a pattern with wildcards ('?' matches any single character, '*' matches any sequence), we use dynamic programming. We build a table where dp[i][j] indicates whether the first i characters of the string match the first j characters of the pattern.",
    algorithm: [
      "Create a DP table `dp[m+1][n+1]` where m = s.length, n = p.length.",
      "Initialize `dp[0][0] = true` (empty string matches empty pattern).",
      "Handle patterns starting with '*': set `dp[0][j] = true` if all characters up to j are '*'.",
      "Fill the DP table:",
      "  - For each position (i, j) from (1, 1) to (m, n):",
      "    - If `p[j-1] == '*'`:",
      "      - `dp[i][j] = dp[i][j-1] || dp[i-1][j]`",
      "      - (match zero characters OR match one or more characters).",
      "    - Else if `p[j-1] == '?' || s[i-1] == p[j-1]`:",
      "      - `dp[i][j] = dp[i-1][j-1]` (characters match).",
      "    - Else: `dp[i][j] = false` (characters don't match).",
      "Return `dp[m][n]`."
    ],
    timeComplexity: {
      value: "O(m × n)",
      explanation: "We fill an m × n DP table, where m and n are the lengths of s and p."
    },
    spaceComplexity: {
      value: "O(m × n)",
      explanation: "We use an m × n DP table for storing intermediate results."
    }
  },

  33: {
    id: 33,
    title: "Jump Game II: Greedy Approach with Jump Range",
    description: "To find the minimum number of jumps to reach the last index, we use a greedy approach. We track the farthest position reachable and the end of the current jump range. When we reach the end of the current range, we increment the jump count and update the range to the farthest position reached.",
    algorithm: [
      "Initialize `jumps = 0`, `currentEnd = 0`, `farthest = 0`.",
      "Iterate through the array from index 0 to n-2:",
      "  - Update the farthest reachable position: `farthest = max(farthest, i + nums[i])`.",
      "  - If we've reached the end of the current jump range (`i == currentEnd`):",
      "    - We need to make another jump: `jumps++`.",
      "    - Update the jump range: `currentEnd = farthest`.",
      "Return `jumps`."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We traverse the array once, updating the farthest position and jump count."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for variables."
    }
  },

  34: {
    id: 34,
    title: "Permutations: Backtracking with Used Array",
    description: "To generate all permutations of distinct numbers, we use backtracking. We build permutations by choosing one unused number at a time, marking it as used, recursively building the rest, then unmarking it (backtracking) to try other possibilities.",
    algorithm: [
      "Initialize an empty result array.",
      "Create a `used` boolean array of size n, initialized to false.",
      "Define a backtracking function `backtrack(path, used)`:",
      "  - Base case: if `path.length == n`:",
      "    - Add a copy of `path` to result and return.",
      "  - Loop through all indices i from 0 to n-1:",
      "    - If `used[i]` is true, skip (already used in current permutation).",
      "    - Mark as used: `used[i] = true`.",
      "    - Add to path: `path.push(nums[i])`.",
      "    - Recursively build rest: `backtrack(path, used)`.",
      "    - Backtrack: remove from path and mark as unused.",
      "Call `backtrack([], used)`.",
      "Return result array."
    ],
    timeComplexity: {
      value: "O(n!)",
      explanation: "There are n! permutations, and we generate each one."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "The recursion depth is n, and we use O(n) space for the used array and current path."
    }
  },

  35: {
    id: 35,
    title: "Permutations II: Backtracking with Duplicate Handling",
    description: "To generate unique permutations when the input contains duplicates, we sort the array first and skip duplicates at the same recursion level. We use a used array to track which elements are currently in the permutation and ensure we don't create duplicate permutations.",
    algorithm: [
      "Sort the array in ascending order (groups duplicates together).",
      "Initialize an empty result array.",
      "Create a `used` boolean array of size n, initialized to false.",
      "Define a backtracking function `backtrack(path, used)`:",
      "  - Base case: if `path.length == n`:",
      "    - Add a copy of `path` to result and return.",
      "  - Loop through all indices i from 0 to n-1:",
      "    - If `used[i]` is true, skip.",
      "    - Skip duplicates at same level: if `i > 0 && nums[i] == nums[i-1] && !used[i-1]`, skip.",
      "    - Mark as used: `used[i] = true`.",
      "    - Add to path: `path.push(nums[i])`.",
      "    - Recursively build rest: `backtrack(path, used)`.",
      "    - Backtrack: remove from path and mark as unused.",
      "Call `backtrack([], used)`.",
      "Return result array."
    ],
    timeComplexity: {
      value: "O(n!)",
      explanation: "In worst case (all unique), we generate n! permutations. With duplicates, it's fewer but still factorial."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "The recursion depth is n, and we use O(n) space for the used array and current path."
    }
  },  36: {
    id: 36,
    title: "Rotate Image: Transpose and Reverse",
    description: "To rotate a matrix 90 degrees clockwise in-place, we can break it down into two simple operations: first transpose the matrix (swap elements across the diagonal), then reverse each row. This achieves the rotation without using extra space.",
    algorithm: [
      "Transpose the matrix:",
      "  - Iterate through rows i from 0 to n-1:",
      "    - Iterate through columns j from i+1 to n-1:",
      "      - Swap `matrix[i][j]` with `matrix[j][i]`.",
      "Reverse each row:",
      "  - Iterate through each row i from 0 to n-1:",
      "    - Reverse the entire row using two pointers:",
      "      - `left = 0`, `right = n-1`.",
      "      - While `left < right`:",
      "        - Swap `matrix[i][left]` with `matrix[i][right]`.",
      "        - Move pointers: `left++`, `right--`."
    ],
    timeComplexity: {
      value: "O(n²)",
      explanation: "We visit each element twice: once during transpose and once during row reversal."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We modify the matrix in-place without using extra space."
    }
  },

  37: {
    id: 37,
    title: "Group Anagrams: Hash Map with Sorted Key",
    description: "Anagrams are words with the same characters in different orders. By sorting the characters of each word, anagrams will produce the same sorted string. We use this sorted string as a key in a hash map to group anagrams together.",
    algorithm: [
      "Create an empty hash map (key: sorted string, value: list of anagrams).",
      "Iterate through each string in the input array:",
      "  - Sort the characters of the current string to create a key.",
      "  - If the key doesn't exist in the map, create an empty list for it.",
      "  - Add the original string to the list corresponding to this key.",
      "Extract all values from the hash map (each value is a group of anagrams).",
      "Return the list of groups."
    ],
    timeComplexity: {
      value: "O(n × k log k)",
      explanation: "Where n is the number of strings and k is the maximum length of a string. We sort each string which takes O(k log k)."
    },
    spaceComplexity: {
      value: "O(n × k)",
      explanation: "We store all strings in the hash map, which requires O(n × k) space."
    }
  },

  38: {
    id: 38,
    title: "Pow(x, n): Fast Exponentiation (Binary Exponentiation)",
    description: "To compute x^n efficiently, we use the property that x^n = (x^(n/2))^2. This allows us to compute the result in logarithmic time by recursively halving the exponent. For negative exponents, we compute the reciprocal.",
    algorithm: [
      "Handle base cases:",
      "  - If `n == 0`, return 1.",
      "  - If `n < 0`, set `x = 1/x` and `n = -n` (convert to positive exponent).",
      "Define a recursive helper function `power(base, exp)`:",
      "  - Base cases:",
      "    - If `exp == 0`, return 1.",
      "    - If `exp == 1`, return base.",
      "  - Calculate half power: `half = power(base, exp / 2)`.",
      "  - If exp is even: return `half * half`.",
      "  - If exp is odd: return `half * half * base`.",
      "Return `power(x, n)`."
    ],
    timeComplexity: {
      value: "O(log n)",
      explanation: "We halve the exponent at each recursion step, resulting in logarithmic time."
    },
    spaceComplexity: {
      value: "O(log n)",
      explanation: "The recursion stack depth is proportional to log n."
    }
  },

  39: {
    id: 39,
    title: "N-Queens: Backtracking with Constraint Sets",
    description: "To solve the N-Queens puzzle, we place queens row by row using backtracking. We use three sets to track attacked columns, positive diagonals, and negative diagonals. This allows us to quickly check if a position is safe without iterating through previous queens.",
    algorithm: [
      "Initialize result array and empty board (n×n grid of '.').",
      "Create three sets: `cols`, `diag1` (row - col), `diag2` (row + col).",
      "Define a backtracking function `backtrack(row)`:",
      "  - Base case: if `row == n`:",
      "    - Add current board configuration to result and return.",
      "  - For each column from 0 to n-1:",
      "    - Check if position is safe:",
      "      - If `col in cols` OR `(row - col) in diag1` OR `(row + col) in diag2`, skip.",
      "    - Place queen: `board[row][col] = 'Q'`.",
      "    - Mark as attacked: add `col` to cols, `row-col` to diag1, `row+col` to diag2.",
      "    - Recursively place queens in next row: `backtrack(row + 1)`.",
      "    - Backtrack: remove queen and unmark the sets.",
      "Call `backtrack(0)` to start from the first row.",
      "Return result array."
    ],
    timeComplexity: {
      value: "O(n!)",
      explanation: "In the worst case, we explore n choices in the first row, n-1 in the second, and so on."
    },
    spaceComplexity: {
      value: "O(n²)",
      explanation: "Space for the board, recursion stack, and the three constraint sets."
    }
  },

  40: {
    id: 40,
    title: "N-Queens II: Backtracking with Count Only",
    description: "Similar to N-Queens, but instead of storing all solutions, we only count them. We use the same backtracking approach with constraint sets, but increment a counter when we find a valid configuration instead of storing the board.",
    algorithm: [
      "Initialize `count = 0`.",
      "Create three sets: `cols`, `diag1` (row - col), `diag2` (row + col).",
      "Define a backtracking function `backtrack(row)`:",
      "  - Base case: if `row == n`:",
      "    - Increment count and return.",
      "  - For each column from 0 to n-1:",
      "    - Check if position is safe:",
      "      - If `col in cols` OR `(row - col) in diag1` OR `(row + col) in diag2`, skip.",
      "    - Mark as attacked: add `col` to cols, `row-col` to diag1, `row+col` to diag2.",
      "    - Recursively place queens in next row: `backtrack(row + 1)`.",
      "    - Backtrack: unmark the sets (remove from cols, diag1, diag2).",
      "Call `backtrack(0)` to start from the first row.",
      "Return `count`."
    ],
    timeComplexity: {
      value: "O(n!)",
      explanation: "Same as N-Queens - we explore the same search space."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "Only need space for recursion stack and the three constraint sets (no board storage)."
    }
  },

  41: {
    id: 41,
    title: "Maximum Subarray: Kadane's Algorithm",
    description: "To find the maximum sum of a contiguous subarray, we use Kadane's algorithm. The key insight is: at each position, we decide whether to extend the current subarray or start a new one. We keep the choice that gives the maximum sum.",
    algorithm: [
      "Initialize `maxSum = nums[0]` (track global maximum).",
      "Initialize `currentSum = nums[0]` (track current subarray sum).",
      "Iterate through the array from index 1 to n-1:",
      "  - Update current sum: `currentSum = max(nums[i], currentSum + nums[i])`.",
      "    - This decides: start new subarray at nums[i] OR extend current subarray.",
      "  - Update global maximum: `maxSum = max(maxSum, currentSum)`.",
      "Return `maxSum`."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We traverse the array once, performing constant work at each step."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for variables."
    }
  },

  42: {
    id: 42,
    title: "Spiral Matrix: Layer-by-Layer Traversal",
    description: "To traverse a matrix in spiral order, we process it layer by layer from outside to inside. For each layer, we traverse right, down, left, and up, adjusting the boundaries after each direction. We continue until all elements are visited.",
    algorithm: [
      "Initialize boundaries: `top = 0`, `bottom = m-1`, `left = 0`, `right = n-1`.",
      "Initialize empty result array.",
      "While `top <= bottom` AND `left <= right`:",
      "  - Traverse right: add elements from `matrix[top][left...right]` to result.",
      "  - Increment `top` (we've processed this row).",
      "  - Traverse down: add elements from `matrix[top...bottom][right]` to result.",
      "  - Decrement `right` (we've processed this column).",
      "  - If `top <= bottom` (check we still have rows to process):",
      "    - Traverse left: add elements from `matrix[bottom][right...left]` to result.",
      "    - Decrement `bottom`.",
      "  - If `left <= right` (check we still have columns to process):",
      "    - Traverse up: add elements from `matrix[bottom...top][left]` to result.",
      "    - Increment `left`.",
      "Return result array."
    ],
    timeComplexity: {
      value: "O(m × n)",
      explanation: "We visit each element exactly once."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space (not counting the output array)."
    }
  },

  43: {
    id: 43,
    title: "Jump Game: Greedy Approach with Max Reach",
    description: "To determine if we can reach the last index, we track the farthest position reachable at any point. We iterate through the array, updating the max reach. If we ever encounter a position beyond our reach, it's impossible to reach the end.",
    algorithm: [
      "Initialize `maxReach = 0` (farthest index we can reach).",
      "Iterate through the array from index 0 to n-1:",
      "  - If `i > maxReach`, return false (we can't reach this position).",
      "  - Update max reach: `maxReach = max(maxReach, i + nums[i])`.",
      "  - If `maxReach >= n-1`, return true (we can reach the end).",
      "Return true (if loop completes, we can reach the end)."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We traverse the array once, updating the max reach at each step."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for variables."
    }
  },

  44: {
    id: 44,
    title: "Merge Intervals: Sort and Merge",
    description: "To merge overlapping intervals, we first sort them by start time. Then we iterate through the sorted intervals, merging each one with the previous if they overlap. An interval overlaps with the previous if its start is less than or equal to the previous interval's end.",
    algorithm: [
      "If there are 0 or 1 intervals, return as-is (no merging needed).",
      "Sort intervals by start time (ascending order).",
      "Initialize result with the first interval: `merged = [intervals[0]]`.",
      "Iterate through remaining intervals from index 1 to n-1:",
      "  - Get the last interval in merged: `last = merged[merged.length - 1]`.",
      "  - Get current interval: `current = intervals[i]`.",
      "  - If intervals overlap (`current.start <= last.end`):",
      "    - Merge them: `last.end = max(last.end, current.end)`.",
      "  - Else (no overlap):",
      "    - Add current interval to merged.",
      "Return merged array."
    ],
    timeComplexity: {
      value: "O(n log n)",
      explanation: "Sorting takes O(n log n), and the merge pass takes O(n)."
    },
    spaceComplexity: {
      value: "O(n) or O(log n)",
      explanation: "O(n) for the output array, O(log n) for the sorting algorithm's stack space."
    }
  },

  45: {
    id: 45,
    title: "Insert Interval: Three-Phase Merge",
    description: "To insert a new interval into a sorted list of non-overlapping intervals, we process in three phases: add all intervals before the new one, merge overlapping intervals with the new one, and add all intervals after. This maintains the sorted, non-overlapping property.",
    algorithm: [
      "Initialize empty result array.",
      "Initialize index `i = 0`.",
      "Phase 1 - Add all intervals that end before newInterval starts:",
      "  - While `i < n` AND `intervals[i].end < newInterval.start`:",
      "    - Add `intervals[i]` to result.",
      "    - Increment `i`.",
      "Phase 2 - Merge all overlapping intervals with newInterval:",
      "  - While `i < n` AND `intervals[i].start <= newInterval.end`:",
      "    - Merge: `newInterval.start = min(newInterval.start, intervals[i].start)`.",
      "    - Merge: `newInterval.end = max(newInterval.end, intervals[i].end)`.",
      "    - Increment `i`.",
      "  - Add merged newInterval to result.",
      "Phase 3 - Add remaining intervals:",
      "  - While `i < n`:",
      "    - Add `intervals[i]` to result.",
      "    - Increment `i`.",
      "Return result array."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We traverse the intervals array once in a single pass."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "We store the result in a new array of size O(n)."
    }
  },

  46: {
    id: 46,
    title: "Length of Last Word: Reverse Traversal",
    description: "To find the length of the last word in a string, we traverse from the end backwards. First, we skip any trailing spaces, then count characters until we hit a space or the beginning of the string.",
    algorithm: [
      "Initialize `length = 0` and `i = s.length - 1`.",
      "Skip trailing spaces:",
      "  - While `i >= 0` AND `s[i] == ' '`:",
      "    - Decrement `i`.",
      "Count characters of the last word:",
      "  - While `i >= 0` AND `s[i] != ' '`:",
      "    - Increment `length`.",
      "    - Decrement `i`.",
      "Return `length`."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "In worst case, we traverse the entire string (if it's one word)."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for variables."
    }
  },

  47: {
    id: 47,
    title: "Spiral Matrix II: Layer-by-Layer Generation",
    description: "To generate an n×n matrix filled with numbers 1 to n² in spiral order, we fill the matrix layer by layer from outside to inside. For each layer, we fill right, down, left, and up, incrementing the number after each placement.",
    algorithm: [
      "Create an n×n matrix filled with zeros.",
      "Initialize boundaries: `top = 0`, `bottom = n-1`, `left = 0`, `right = n-1`.",
      "Initialize `num = 1` (current number to place).",
      "While `top <= bottom` AND `left <= right`:",
      "  - Fill right: place num in `matrix[top][left...right]`, increment num after each.",
      "  - Increment `top`.",
      "  - Fill down: place num in `matrix[top...bottom][right]`, increment num after each.",
      "  - Decrement `right`.",
      "  - If `top <= bottom`:",
      "    - Fill left: place num in `matrix[bottom][right...left]`, increment num after each.",
      "    - Decrement `bottom`.",
      "  - If `left <= right`:",
      "    - Fill up: place num in `matrix[bottom...top][left]`, increment num after each.",
      "    - Increment `left`.",
      "Return the filled matrix."
    ],
    timeComplexity: {
      value: "O(n²)",
      explanation: "We fill each of the n² cells exactly once."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space (not counting the output matrix)."
    }
  },

  48: {
    id: 48,
    title: "Permutation Sequence: Factorial Number System",
    description: "To find the kth permutation of numbers 1 to n, we use the factorial number system. Each digit position in the permutation can be determined by dividing k by the appropriate factorial. This allows us to build the permutation directly without generating all permutations.",
    algorithm: [
      "Create a list of available numbers: `[1, 2, 3, ..., n]`.",
      "Calculate factorials: `factorial[i] = i!` for i from 0 to n.",
      "Convert k to 0-indexed: `k = k - 1`.",
      "Initialize empty result string.",
      "For i from n down to 1:",
      "  - Calculate index: `index = k / factorial[i-1]`.",
      "  - Add the number at this index to result: `result += numbers[index]`.",
      "  - Remove the used number from the list: `numbers.remove(index)`.",
      "  - Update k: `k = k % factorial[i-1]`.",
      "Return result string."
    ],
    timeComplexity: {
      value: "O(n²)",
      explanation: "For each of n positions, we remove an element from the list which takes O(n)."
    },
    spaceComplexity: {
      value: "O(n)",
      explanation: "We store the factorial array and the numbers list."
    }
  },

  49: {
    id: 49,
    title: "Rotate List: Find Length and New Head",
    description: "To rotate a linked list to the right by k places, we first find the length of the list and connect it into a circle. Then we calculate the effective rotation (k % length), find the new tail, break the circle, and return the new head.",
    algorithm: [
      "Handle edge cases: if list is empty, has one node, or k is 0, return head.",
      "Find length and tail:",
      "  - Initialize `length = 1`, `tail = head`.",
      "  - Traverse to the end: while `tail.next != null`, increment length and move tail.",
      "Calculate effective rotations: `k = k % length`.",
      "If `k == 0`, return head (no rotation needed).",
      "Find the new tail (at position `length - k - 1`):",
      "  - Start from head and move `length - k - 1` steps.",
      "Set new head and break the list:",
      "  - `newHead = newTail.next`.",
      "  - `newTail.next = null`.",
      "  - `tail.next = head` (connect old tail to old head).",
      "Return `newHead`."
    ],
    timeComplexity: {
      value: "O(n)",
      explanation: "We traverse the list twice: once to find length, once to find the new tail."
    },
    spaceComplexity: {
      value: "O(1)",
      explanation: "We only use constant extra space for pointers."
    }
  },

  50: {
    id: 50,
    title: "Unique Paths: Dynamic Programming Grid",
    description: "To find the number of unique paths in an m×n grid (moving only right or down), we use dynamic programming. The number of ways to reach any cell is the sum of ways to reach the cell above it and the cell to its left.",
    algorithm: [
      "Create a DP table `dp[m][n]`.",
      "Initialize first row: `dp[0][j] = 1` for all j (only one way: keep moving right).",
      "Initialize first column: `dp[i][0] = 1` for all i (only one way: keep moving down).",
      "Fill the DP table:",
      "  - For each cell (i, j) from (1, 1) to (m-1, n-1):",
      "    - `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.",
      "    - (ways from top + ways from left).",
      "Return `dp[m-1][n-1]` (number of ways to reach bottom-right)."
    ],
    timeComplexity: {
      value: "O(m × n)",
      explanation: "We fill each cell in the m×n DP table once."
    },
    spaceComplexity: {
      value: "O(m × n)",
      explanation: "We use an m×n DP table. Can be optimized to O(n) by using only one row."
    }
  },

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
  },
  3: {
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
  },
  // =========================================================
  // PROBLEM 7: BEST TIME TO BUY AND SELL STOCK
  // =========================================================
  7: {
    javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    return maxProfit;
};`,

    python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
                
        return max_profit`,

    cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        
        for(int price : prices) {
            if(price < minPrice) {
                minPrice = price;
            } else if(price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
};`,

    java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`
  },

  // =========================================================
  // PROBLEM 8: BINARY TREE LEVEL ORDER TRAVERSAL
  // =========================================================
  8: {
    javascript: `/**
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
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();
            currentLevel.push(currentNode.val);
            
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
        result.push(currentLevel);
    }
    return result;
};`,

    python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        
        result = []
        queue = [root]
        
        while queue:
            level_size = len(queue)
            current_level = []
            
            for _ in range(level_size):
                node = queue.pop(0)
                current_level.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(current_level)
            
        return result`,

    cpp: `/**
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
        vector<vector<int>> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> currentLevel;
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                currentLevel.push_back(node->val);
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(currentLevel);
        }
        return result;
    }
};`,

    java: `/**
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
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`
  },

  // =========================================================
  // PROBLEM 9: NEXT PERMUTATION
  // =========================================================
  9: {
    javascript: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }
    
    if (i >= 0) {
        let j = nums.length - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    
    // Reverse the sub-array after index i
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
};`,

    python: `class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        i = len(nums) - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
            
        if i >= 0:
            j = len(nums) - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        
        # Reverse the sub-array
        left, right = i + 1, len(nums) - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1`,

    cpp: `class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int i = nums.size() - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        
        if (i >= 0) {
            int j = nums.size() - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }
        
        reverse(nums.begin() + i + 1, nums.end());
    }
};`,

    java: `class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        
        if (i >= 0) {
            int j = nums.length - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }
        
        reverse(nums, i + 1);
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    
    private void reverse(int[] nums, int start) {
        int end = nums.length - 1;
        while (start < end) {
            swap(nums, start, end);
            start++;
            end--;
        }
    }
}`
  },

  // =========================================================
  // PROBLEM 10: PALINDROME NUMBER
  // =========================================================
  10: {
    javascript: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }
    
    let revertedNumber = 0;
    while (x > revertedNumber) {
        revertedNumber = revertedNumber * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    
    return x === revertedNumber || x === Math.floor(revertedNumber / 10);
};`,

    python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0 or (x % 10 == 0 and x != 0):
            return False
            
        reverted_number = 0
        while x > reverted_number:
            reverted_number = reverted_number * 10 + x % 10
            x //= 10
            
        return x == reverted_number or x == reverted_number // 10`,

    cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) {
            return false;
        }
        
        int revertedNumber = 0;
        while (x > revertedNumber) {
            revertedNumber = revertedNumber * 10 + x % 10;
            x /= 10;
        }
        
        return x == revertedNumber || x == revertedNumber / 10;
    }
};`,

    java: `class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) {
            return false;
        }
        
        int revertedNumber = 0;
        while (x > revertedNumber) {
            revertedNumber = revertedNumber * 10 + x % 10;
            x /= 10;
        }
        
        return x == revertedNumber || x == revertedNumber / 10;
    }
}`
  },

  // =========================================================
  // PROBLEM 11: CONTAINER WITH MOST WATER
  // =========================================================
  11: {
    javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let maxArea = 0;
    let left = 0;
    let right = height.length - 1;
    
    while (left < right) {
        const currentHeight = Math.min(height[left], height[right]);
        const currentWidth = right - left;
        maxArea = Math.max(maxArea, currentHeight * currentWidth);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
};`,

    python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        max_area = 0
        left = 0
        right = len(height) - 1
        
        while left < right:
            current_height = min(height[left], height[right])
            current_width = right - left
            max_area = max(max_area, current_height * current_width)
            
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
                
        return max_area`,

    cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int maxArea = 0;
        int left = 0;
        int right = height.size() - 1;
        
        while (left < right) {
            int currentHeight = min(height[left], height[right]);
            int currentWidth = right - left;
            maxArea = max(maxArea, currentHeight * currentWidth);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
};`,

    java: `class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        int left = 0;
        int right = height.length - 1;
        
        while (left < right) {
            int currentHeight = Math.min(height[left], height[right]);
            int currentWidth = right - left;
            maxArea = Math.max(maxArea, currentHeight * currentWidth);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
}`
  },
  // =========================================================
  // PROBLEM 12: ROMAN TO INTEGER
  // =========================================================
  12: {
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const map = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    };
    
    let result = 0;
    
    for (let i = 0; i < s.length; i++) {
        const curr = map[s[i]];
        const next = map[s[i + 1]];
        
        if (next && curr < next) {
            result -= curr;
        } else {
            result += curr;
        }
    }
    
    return result;
};`,

    python: `class Solution:
    def romanToInt(self, s: str) -> int:
        roman = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50,
            'C': 100, 'D': 500, 'M': 1000
        }
        
        result = 0
        
        for i in range(len(s)):
            if i + 1 < len(s) and roman[s[i]] < roman[s[i+1]]:
                result -= roman[s[i]]
            else:
                result += roman[s[i]]
                
        return result`,

    cpp: `class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char, int> m = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
            {'C', 100}, {'D', 500}, {'M', 1000}
        };
        
        int ans = 0;
        
        for(int i = 0; i < s.length(); i++) {
            if(i < s.length() - 1 && m[s[i]] < m[s[i+1]]) {
                ans -= m[s[i]];
            } else {
                ans += m[s[i]];
            }
        }
        
        return ans;
    }
};`,

    java: `class Solution {
    public int romanToInt(String s) {
        Map<Character, Integer> map = new HashMap<>();
        map.put('I', 1); map.put('V', 5); map.put('X', 10);
        map.put('L', 50); map.put('C', 100); map.put('D', 500);
        map.put('M', 1000);
        
        int result = 0;
        
        for (int i = 0; i < s.length(); i++) {
            int curr = map.get(s.charAt(i));
            
            if (i < s.length() - 1 && curr < map.get(s.charAt(i + 1))) {
                result -= curr;
            } else {
                result += curr;
            }
        }
        
        return result;
    }
}`
  },

  // =========================================================
  // PROBLEM 13: LONGEST COMMON PREFIX
  // =========================================================
  13: {
    javascript: `/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (!strs.length) return "";
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
};`,

    python: `class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if not strs: return ""
        
        prefix = strs[0]
        
        for s in strs[1:]:
            while not s.startswith(prefix):
                prefix = prefix[:-1]
                if not prefix: return ""
        
        return prefix`,

    cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if(strs.empty()) return "";
        
        string prefix = strs[0];
        
        for(int i = 1; i < strs.size(); i++) {
            while(strs[i].find(prefix) != 0) {
                prefix = prefix.substr(0, prefix.length() - 1);
                if(prefix.empty()) return "";
            }
        }
        
        return prefix;
    }
};`,

    java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        
        String prefix = strs[0];
        
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        
        return prefix;
    }
}`
  },

  // =========================================================
  // PROBLEM 14: 3SUM
  // =========================================================
  14: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const res = [];
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let j = i + 1;
        let k = nums.length - 1;
        
        while (j < k) {
            const sum = nums[i] + nums[j] + nums[k];
            
            if (sum === 0) {
                res.push([nums[i], nums[j], nums[k]]);
                while (j < k && nums[j] === nums[j + 1]) j++;
                while (j < k && nums[k] === nums[k - 1]) k--;
                j++;
                k--;
            } else if (sum < 0) {
                j++;
            } else {
                k--;
            }
        }
    }
    
    return res;
};`,

    python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums.sort()
        
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i-1]:
                continue
                
            l, r = i + 1, len(nums) - 1
            
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                
                if s == 0:
                    res.append([nums[i], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l+1]:
                        l += 1
                    while l < r and nums[r] == nums[r-1]:
                        r -= 1
                    l += 1
                    r -= 1
                elif s < 0:
                    l += 1
                else:
                    r -= 1
                    
        return res`,

    cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        
        for (int i = 0; i < nums.size(); i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            
            int j = i + 1, k = nums.size() - 1;
            
            while (j < k) {
                int sum = nums[i] + nums[j] + nums[k];
                
                if (sum == 0) {
                    res.push_back({nums[i], nums[j], nums[k]});
                    while (j < k && nums[j] == nums[j+1]) j++;
                    while (j < k && nums[k] == nums[k-1]) k--;
                    j++; k--;
                } else if (sum < 0) {
                    j++;
                } else {
                    k--;
                }
            }
        }
        return res;
    }
};`,

    java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            
            int j = i + 1, k = nums.length - 1;
            
            while (j < k) {
                int sum = nums[i] + nums[j] + nums[k];
                
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[j], nums[k]));
                    while (j < k && nums[j] == nums[j+1]) j++;
                    while (j < k && nums[k] == nums[k-1]) k--;
                    j++; k--;
                } else if (sum < 0) {
                    j++;
                } else {
                    k--;
                }
            }
        }
        return res;
    }
}`
  },

  // =========================================================
  // PROBLEM 15: LETTER COMBINATIONS OF A PHONE NUMBER
  // =========================================================
  15: {
    javascript: `/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits.length) return [];
    
    const map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const res = [];
    
    function backtrack(index, path) {
        if (index === digits.length) {
            res.push(path);
            return;
        }
        
        const letters = map[digits[index]];
        for (let char of letters) {
            backtrack(index + 1, path + char);
        }
    }
    
    backtrack(0, "");
    return res;
};`,

    python: `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits: return []
        
        phone = {
            "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
        }
        
        res = []
        
        def backtrack(combination, next_digits):
            if len(next_digits) == 0:
                res.append(combination)
            else:
                for letter in phone[next_digits[0]]:
                    backtrack(combination + letter, next_digits[1:])
                    
        backtrack("", digits)
        return res`,

    cpp: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if(digits.empty()) return {};
        
        vector<string> map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        vector<string> res;
        
        backtrack(res, digits, "", 0, map);
        return res;
    }
    
    void backtrack(vector<string>& res, string& digits, string current, int index, vector<string>& map) {
        if(index == digits.length()) {
            res.push_back(current);
            return;
        }
        
        string letters = map[digits[index] - '0'];
        for(char c : letters) {
            backtrack(res, digits, current + c, index + 1, map);
        }
    }
};`,

    java: `class Solution {
    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits.length() == 0) return res;
        
        String[] map = new String[] {
            "0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
        };
        
        backtrack(res, digits, "", 0, map);
        return res;
    }
    
    private void backtrack(List<String> res, String digits, String current, int index, String[] map) {
        if (index == digits.length()) {
            res.add(current);
            return;
        }
        
        String letters = map[digits.charAt(index) - '0'];
        for (int i = 0; i < letters.length(); i++) {
            backtrack(res, digits, current + letters.charAt(i), index + 1, map);
        }
    }
}`
  },

  // =========================================================
  // PROBLEM 16: REMOVE NTH NODE FROM END OF LIST
  // =========================================================
  16: {
    javascript: `/**
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
    let dummy = new ListNode(0);
    dummy.next = head;
    let fast = dummy;
    let slow = dummy;
    
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }
    
    slow.next = slow.next.next;
    
    return dummy.next;
};`,

    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        fast = dummy
        slow = dummy
        
        for _ in range(n + 1):
            fast = fast.next
            
        while fast:
            fast = fast.next
            slow = slow.next
            
        slow.next = slow.next.next
        
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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* fast = dummy;
        ListNode* slow = dummy;
        
        for(int i=0; i<=n; i++) {
            fast = fast->next;
        }
        
        while(fast != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }
        
        slow->next = slow->next->next;
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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy;
        ListNode slow = dummy;
        
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }
        
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        
        slow.next = slow.next.next;
        
        return dummy.next;
    }
}`
  },

  // =========================================================
  // PROBLEM 17: GENERATE PARENTHESES
  // =========================================================
  17: {
    javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];
    
    function backtrack(s, open, close) {
        if (s.length === 2 * n) {
            res.push(s);
            return;
        }
        
        if (open < n) {
            backtrack(s + "(", open + 1, close);
        }
        if (close < open) {
            backtrack(s + ")", open, close + 1);
        }
    }
    
    backtrack("", 0, 0);
    return res;
};`,

    python: `class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        
        def backtrack(s, open_count, close_count):
            if len(s) == 2 * n:
                res.append(s)
                return
            
            if open_count < n:
                backtrack(s + "(", open_count + 1, close_count)
            
            if close_count < open_count:
                backtrack(s + ")", open_count, close_count + 1)
                
        backtrack("", 0, 0)
        return res`,

    cpp: `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        backtrack(res, "", 0, 0, n);
        return res;
    }
    
    void backtrack(vector<string>& res, string s, int open, int close, int n) {
        if (s.length() == 2 * n) {
            res.push_back(s);
            return;
        }
        
        if (open < n) {
            backtrack(res, s + "(", open + 1, close, n);
        }
        if (close < open) {
            backtrack(res, s + ")", open, close + 1, n);
        }
    }
};`,

    java: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(res, "", 0, 0, n);
        return res;
    }
    
    private void backtrack(List<String> res, String s, int open, int close, int n) {
        if (s.length() == 2 * n) {
            res.add(s);
            return;
        }
        
        if (open < n) {
            backtrack(res, s + "(", open + 1, close, n);
        }
        if (close < open) {
            backtrack(res, s + ")", open, close + 1, n);
        }
    }
}`
  },

  // =========================================================
  // PROBLEM 18: MERGE TWO SORTED LISTS
  // =========================================================
  18: {
    javascript: `/**
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
    if (!list1) return list2;
    if (!list2) return list1;
    
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};`,

    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        if not list1: return list2
        if not list2: return list1
        
        if list1.val < list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists(list1, list2.next)
            return list2`,

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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        if(!list1) return list2;
        if(!list2) return list1;
        
        if(list1->val < list2->val) {
            list1->next = mergeTwoLists(list1->next, list2);
            return list1;
        } else {
            list2->next = mergeTwoLists(list1, list2->next);
            return list2;
        }
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
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        if(list1 == null) return list2;
        if(list2 == null) return list1;
        
        if(list1.val < list2.val) {
            list1.next = mergeTwoLists(list1.next, list2);
            return list1;
        } else {
            list2.next = mergeTwoLists(list1, list2.next);
            return list2;
        }
    }
}`
  },

  // =========================================================
  // PROBLEM 19: SWAP NODES IN PAIRS
  // =========================================================
  19: {
    javascript: `/**
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
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    while (head && head.next) {
        let first = head;
        let second = head.next;
        
        prev.next = second;
        first.next = second.next;
        second.next = first;
        
        prev = first;
        head = first.next;
    }
    
    return dummy.next;
};`,

    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        prev = dummy
        
        while head and head.next:
            first = head
            second = head.next
            
            prev.next = second
            first.next = second.next
            second.next = first
            
            prev = first
            head = first.next
            
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
    ListNode* swapPairs(ListNode* head) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* prev = dummy;
        
        while(head && head->next) {
            ListNode* first = head;
            ListNode* second = head->next;
            
            prev->next = second;
            first->next = second->next;
            second->next = first;
            
            prev = first;
            head = first->next;
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
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        
        while(head != null && head.next != null) {
            ListNode first = head;
            ListNode second = head.next;
            
            prev.next = second;
            first.next = second.next;
            second.next = first;
            
            prev = first;
            head = first.next;
        }
        
        return dummy.next;
    }
}`
  },

  // =========================================================
  // PROBLEM 20: REVERSE NODES IN K-GROUP
  // =========================================================
  20: {
    javascript: `/**
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
    if (!head || k === 1) return head;
    
    let dummy = new ListNode(0);
    dummy.next = head;
    let curr = dummy, nex = dummy, pre = dummy;
    let count = 0;
    
    while (curr.next) {
        curr = curr.next;
        count++;
    }
    
    while (count >= k) {
        curr = pre.next;
        nex = curr.next;
        for (let i = 1; i < k; i++) {
            curr.next = nex.next;
            nex.next = pre.next;
            pre.next = nex;
            nex = curr.next;
        }
        pre = curr;
        count -= k;
    }
    
    return dummy.next;
};`,

    python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or k == 1: return head
        
        dummy = ListNode(0)
        dummy.next = head
        curr, nex, pre = dummy, dummy, dummy
        count = 0
        
        while curr.next:
            curr = curr.next
            count += 1
            
        while count >= k:
            curr = pre.next
            nex = curr.next
            for _ in range(k-1):
                curr.next = nex.next
                nex.next = pre.next
                pre.next = nex
                nex = curr.next
            pre = curr
            count -= k
            
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
    ListNode* reverseKGroup(ListNode* head, int k) {
        if(!head || k == 1) return head;
        
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode *curr = dummy, *nex = dummy, *pre = dummy;
        int count = 0;
        
        while(curr->next) {
            curr = curr->next;
            count++;
        }
        
        while(count >= k) {
            curr = pre->next;
            nex = curr->next;
            for(int i = 1; i < k; i++) {
                curr->next = nex->next;
                nex->next = pre->next;
                pre->next = nex;
                nex = curr->next;
            }
            pre = curr;
            count -= k;
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
    public ListNode reverseKGroup(ListNode head, int k) {
        if(head == null || k == 1) return head;
        
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode curr = dummy, nex = dummy, pre = dummy;
        int count = 0;
        
        while(curr.next != null) {
            curr = curr.next;
            count++;
        }
        
        while(count >= k) {
            curr = pre.next;
            nex = curr.next;
            for(int i = 1; i < k; i++) {
                curr.next = nex.next;
                nex.next = pre.next;
                pre.next = nex;
                nex = curr.next;
            }
            pre = curr;
            count -= k;
        }
        
        return dummy.next;
    }
}`
  },
  // =========================================================
  // PROBLEM 21: SEARCH IN ROTATED SORTED ARRAY
  // =========================================================
  21: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) return mid;
        
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
};`,

    python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        
        while left <= right:
            mid = (left + right) // 2
            
            if nums[mid] == target:
                return mid
                
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
                    
        return -1`,

    cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        
        while(left <= right) {
            int mid = left + (right - left) / 2;
            
            if(nums[mid] == target) return mid;
            
            if(nums[left] <= nums[mid]) {
                if(target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if(target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
};`,

    java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) return mid;
            
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`
  },

  // =========================================================
  // PROBLEM 22: FIRST AND LAST POSITION OF ELEMENT
  // =========================================================
  22: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    const findBound = (isFirst) => {
        let l = 0, r = nums.length - 1, idx = -1;
        while (l <= r) {
            let mid = Math.floor((l + r) / 2);
            if (nums[mid] === target) {
                idx = mid;
                if (isFirst) r = mid - 1;
                else l = mid + 1;
            } else if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return idx;
    };
    
    return [findBound(true), findBound(false)];
};`,

    python: `class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def findBound(isFirst):
            l, r = 0, len(nums) - 1
            idx = -1
            while l <= r:
                mid = (l + r) // 2
                if nums[mid] == target:
                    idx = mid
                    if isFirst: r = mid - 1
                    else: l = mid + 1
                elif nums[mid] < target:
                    l = mid + 1
                else:
                    r = mid - 1
            return idx
            
        return [findBound(True), findBound(False)]`,

    cpp: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return {-1, -1};
        int last = findBound(nums, target, false);
        return {first, last};
    }
    
    int findBound(vector<int>& nums, int target, bool isFirst) {
        int l = 0, r = nums.size() - 1, idx = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) {
                idx = mid;
                if (isFirst) r = mid - 1;
                else l = mid + 1;
            } else if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return idx;
    }
};`,

    java: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return new int[]{-1, -1};
        int last = findBound(nums, target, false);
        return new int[]{first, last};
    }
    
    private int findBound(int[] nums, int target, boolean isFirst) {
        int l = 0, r = nums.length - 1, idx = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) {
                idx = mid;
                if (isFirst) r = mid - 1;
                else l = mid + 1;
            } else if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return idx;
    }
}`
  },

  // =========================================================
  // PROBLEM 23: SEARCH INSERT POSITION
  // =========================================================
  23: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return left;
};`,

    python: `class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return left`,

    cpp: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while(left <= right) {
            int mid = left + (right - left) / 2;
            if(nums[mid] == target) return mid;
            else if(nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
};`,

    java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while(left <= right) {
            int mid = left + (right - left) / 2;
            if(nums[mid] == target) return mid;
            else if(nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
}`
  },

  // =========================================================
  // PROBLEM 24: VALID SUDOKU
  // =========================================================
  24: {
    javascript: `/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const rows = new Set();
    const cols = new Set();
    const boxes = new Set();
    
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const val = board[r][c];
            if (val === '.') continue;
            
            const rowKey = \`\${r}-\${val}\`;
            const colKey = \`\${c}-\${val}\`;
            const boxKey = \`\${Math.floor(r/3)}-\${Math.floor(c/3)}-\${val}\`;
            
            if (rows.has(rowKey) || cols.has(colKey) || boxes.has(boxKey)) {
                return false;
            }
            
            rows.add(rowKey);
            cols.add(colKey);
            boxes.add(boxKey);
        }
    }
    return true;
};`,

    python: `class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        
        for r in range(9):
            for c in range(9):
                val = board[r][c]
                if val == ".": continue
                
                box_idx = (r // 3) * 3 + (c // 3)
                
                if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                    return False
                    
                rows[r].add(val)
                cols[c].add(val)
                boxes[box_idx].add(val)
                
        return True`,

    cpp: `class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        int rows[9][9] = {0}, cols[9][9] = {0}, boxes[9][9] = {0};
        
        for(int r=0; r<9; r++) {
            for(int c=0; c<9; c++) {
                if(board[r][c] != '.') {
                    int num = board[r][c] - '1';
                    int k = (r/3)*3 + (c/3);
                    
                    if(rows[r][num] || cols[c][num] || boxes[k][num])
                        return false;
                        
                    rows[r][num] = cols[c][num] = boxes[k][num] = 1;
                }
            }
        }
        return true;
    }
};`,

    java: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set<String> seen = new HashSet<>();
        
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char number = board[i][j];
                if (number != '.') {
                    if (!seen.add(number + " in row " + i) ||
                        !seen.add(number + " in column " + j) ||
                        !seen.add(number + " in block " + i/3 + "-" + j/3))
                        return false;
                }
            }
        }
        return true;
    }
}`
  },

  // =========================================================
  // PROBLEM 25: SUDOKU SOLVER
  // =========================================================
  25: {
    javascript: `/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    const solve = (board) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (let c = 1; c <= 9; c++) {
                        const char = c.toString();
                        if (isValid(board, i, j, char)) {
                            board[i][j] = char;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };
    
    const isValid = (board, row, col, c) => {
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === c) return false;
            if (board[row][i] === c) return false;
            if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === c) return false;
        }
        return true;
    };
    
    solve(board);
};`,

    python: `class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def isValid(r, c, k):
            for i in range(9):
                if board[i][c] == k: return False
                if board[r][i] == k: return False
                if board[3*(r//3) + i//3][3*(c//3) + i%3] == k: return False
            return True
            
        def solve():
            for r in range(9):
                for c in range(9):
                    if board[r][c] == ".":
                        for k in map(str, range(1, 10)):
                            if isValid(r, c, k):
                                board[r][c] = k
                                if solve(): return True
                                board[r][c] = "."
                        return False
            return True
            
        solve()`,

    cpp: `class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
    
    bool solve(vector<vector<char>>& board) {
        for(int i = 0; i < board.size(); i++) {
            for(int j = 0; j < board[0].size(); j++) {
                if(board[i][j] == '.') {
                    for(char c = '1'; c <= '9'; c++) {
                        if(isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if(solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    bool isValid(vector<vector<char>>& board, int row, int col, char c) {
        for(int i = 0; i < 9; i++) {
            if(board[i][col] == c) return false;
            if(board[row][i] == c) return false;
            if(board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }
};`,

    java: `class Solution {
    public void solveSudoku(char[][] board) {
        solve(board);
    }
    
    private boolean solve(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    private boolean isValid(char[][] board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == c) return false;
            if (board[row][i] == c) return false;
            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }
}`
  },

  // =========================================================
  // PROBLEM 26: COUNT AND SAY
  // =========================================================
  26: {
    javascript: `/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    if (n === 1) return "1";
    const prev = countAndSay(n - 1);
    let result = "";
    let count = 1;
    
    for (let i = 0; i < prev.length; i++) {
        if (prev[i] === prev[i + 1]) {
            count++;
        } else {
            result += count + prev[i];
            count = 1;
        }
    }
    return result;
};`,

    python: `class Solution:
    def countAndSay(self, n: int) -> str:
        if n == 1: return "1"
        prev = self.countAndSay(n-1)
        res = ""
        count = 1
        
        for i in range(len(prev)):
            if i + 1 < len(prev) and prev[i] == prev[i+1]:
                count += 1
            else:
                res += str(count) + prev[i]
                count = 1
                
        return res`,

    cpp: `class Solution {
public:
    string countAndSay(int n) {
        if (n == 1) return "1";
        string prev = countAndSay(n - 1);
        string res = "";
        int count = 1;
        
        for (int i = 0; i < prev.length(); i++) {
            if (i + 1 < prev.length() && prev[i] == prev[i + 1]) {
                count++;
            } else {
                res += to_string(count) + prev[i];
                count = 1;
            }
        }
        return res;
    }
};`,

    java: `class Solution {
    public String countAndSay(int n) {
        if (n == 1) return "1";
        String prev = countAndSay(n - 1);
        StringBuilder res = new StringBuilder();
        int count = 1;
        
        for (int i = 0; i < prev.length(); i++) {
            if (i + 1 < prev.length() && prev.charAt(i) == prev.charAt(i + 1)) {
                count++;
            } else {
                res.append(count).append(prev.charAt(i));
                count = 1;
            }
        }
        return res.toString();
    }
}`
  },
  27: {
    javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const result = [];
    
    function backtrack(start, target, path) {
        if (target === 0) {
            result.push([...path]);
            return;
        }
        if (target < 0) return;
        
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(i, target - candidates[i], path);
            path.pop();
        }
    }
    
    backtrack(0, target, []);
    return result;
};`,

    python: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        result = []
        
        def backtrack(start: int, target: int, path: List[int]):
            if target == 0:
                result.append(path[:])
                return
            if target < 0:
                return
            
            for i in range(start, len(candidates)):
                path.append(candidates[i])
                backtrack(i, target - candidates[i], path)
                path.pop()
        
        backtrack(0, target, [])
        return result`,

    cpp: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> path;
        backtrack(candidates, target, 0, path, result);
        return result;
    }
    
private:
    void backtrack(vector<int>& candidates, int target, int start, 
                   vector<int>& path, vector<vector<int>>& result) {
        if (target == 0) {
            result.push_back(path);
            return;
        }
        if (target < 0) return;
        
        for (int i = start; i < candidates.size(); i++) {
            path.push_back(candidates[i]);
            backtrack(candidates, target - candidates[i], i, path, result);
            path.pop_back();
        }
    }
};`,

    java: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    
    private void backtrack(int[] candidates, int target, int start,
                          List<Integer> path, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(path));
            return;
        }
        if (target < 0) return;
        
        for (int i = start; i < candidates.length; i++) {
            path.add(candidates[i]);
            backtrack(candidates, target - candidates[i], i, path, result);
            path.remove(path.size() - 1);
        }
    }
}`
  },

  28: {
    javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const result = [];
    
    function backtrack(start, target, path) {
        if (target === 0) {
            result.push([...path]);
            return;
        }
        if (target < 0) return;
        
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            path.push(candidates[i]);
            backtrack(i + 1, target - candidates[i], path);
            path.pop();
        }
    }
    
    backtrack(0, target, []);
    return result;
};`,

    python: `class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        result = []
        
        def backtrack(start: int, target: int, path: List[int]):
            if target == 0:
                result.append(path[:])
                return
            if target < 0:
                return
            
            for i in range(start, len(candidates)):
                if i > start and candidates[i] == candidates[i-1]:
                    continue
                path.append(candidates[i])
                backtrack(i + 1, target - candidates[i], path)
                path.pop()
        
        backtrack(0, target, [])
        return result`,

    cpp: `class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> result;
        vector<int> path;
        backtrack(candidates, target, 0, path, result);
        return result;
    }
    
private:
    void backtrack(vector<int>& candidates, int target, int start,
                   vector<int>& path, vector<vector<int>>& result) {
        if (target == 0) {
            result.push_back(path);
            return;
        }
        if (target < 0) return;
        
        for (int i = start; i < candidates.size(); i++) {
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            path.push_back(candidates[i]);
            backtrack(candidates, target - candidates[i], i + 1, path, result);
            path.pop_back();
        }
    }
};`,

    java: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> result = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    
    private void backtrack(int[] candidates, int target, int start,
                          List<Integer> path, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(path));
            return;
        }
        if (target < 0) return;
        
        for (int i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            path.add(candidates[i]);
            backtrack(candidates, target - candidates[i], i + 1, path, result);
            path.remove(path.size() - 1);
        }
    }
}`
  },

  29: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    const n = nums.length;
    
    // Place each number in its correct position
    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const correctIdx = nums[i] - 1;
            [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
        }
    }
    
    // Find first missing positive
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    
    return n + 1;
};`,

    python: `class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        
        # Place each number in its correct position
        for i in range(n):
            while 0 < nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                correct_idx = nums[i] - 1
                nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        
        # Find first missing positive
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        
        return n + 1`,

    cpp: `class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        
        // Place each number in its correct position
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int correctIdx = nums[i] - 1;
                swap(nums[i], nums[correctIdx]);
            }
        }
        
        // Find first missing positive
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        
        return n + 1;
    }
};`,

    java: `class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        
        // Place each number in its correct position
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int correctIdx = nums[i] - 1;
                int temp = nums[i];
                nums[i] = nums[correctIdx];
                nums[correctIdx] = temp;
            }
        }
        
        // Find first missing positive
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        
        return n + 1;
    }
}`
  },

  30: {
    javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    if (height.length === 0) return 0;
    
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
};`,

    python: `class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0
        
        left, right = 0, len(height) - 1
        left_max, right_max = 0, 0
        water = 0
        
        while left < right:
            if height[left] < height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    water += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    water += right_max - height[right]
                right -= 1
        
        return water`,

    cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        if (height.empty()) return 0;
        
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        
        return water;
    }
};`,

    java: `class Solution {
    public int trap(int[] height) {
        if (height.length == 0) return 0;
        
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        
        return water;
    }
}`
  },

  31: {
    javascript: `/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";
    
    const m = num1.length, n = num2.length;
    const result = new Array(m + n).fill(0);
    
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const mul = (num1[i] - '0') * (num2[j] - '0');
            const p1 = i + j, p2 = i + j + 1;
            const sum = mul + result[p2];
            
            result[p2] = sum % 10;
            result[p1] += Math.floor(sum / 10);
        }
    }
    
    let str = result.join('');
    return str[0] === '0' ? str.substring(1) : str;
};`,

    python: `class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0":
            return "0"
        
        m, n = len(num1), len(num2)
        result = [0] * (m + n)
        
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                mul = int(num1[i]) * int(num2[j])
                p1, p2 = i + j, i + j + 1
                total = mul + result[p2]
                
                result[p2] = total % 10
                result[p1] += total // 10
        
        result_str = ''.join(map(str, result))
        return result_str.lstrip('0') or '0'`,

    cpp: `class Solution {
public:
    string multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") return "0";
        
        int m = num1.length(), n = num2.length();
        vector<int> result(m + n, 0);
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int p1 = i + j, p2 = i + j + 1;
                int sum = mul + result[p2];
                
                result[p2] = sum % 10;
                result[p1] += sum / 10;
            }
        }
        
        string str;
        for (int num : result) {
            if (!(str.empty() && num == 0)) {
                str += to_string(num);
            }
        }
        
        return str.empty() ? "0" : str;
    }
};`,

    java: `class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0";
        
        int m = num1.length(), n = num2.length();
        int[] result = new int[m + n];
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
                int p1 = i + j, p2 = i + j + 1;
                int sum = mul + result[p2];
                
                result[p2] = sum % 10;
                result[p1] += sum / 10;
            }
        }
        
        StringBuilder sb = new StringBuilder();
        for (int num : result) {
            if (!(sb.length() == 0 && num == 0)) {
                sb.append(num);
            }
        }
        
        return sb.length() == 0 ? "0" : sb.toString();
    }
}`
  },

  32: {
    javascript: `/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const m = s.length, n = p.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));
    
    dp[0][0] = true;
    
    // Handle patterns with '*' at the beginning
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            } else if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    
    return dp[m][n];
};`,

    python: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        
        dp[0][0] = True
        
        # Handle patterns with '*' at the beginning
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                dp[0][j] = dp[0][j - 1]
        
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if p[j - 1] == '*':
                    dp[i][j] = dp[i][j - 1] or dp[i - 1][j]
                elif p[j - 1] == '?' or s[i - 1] == p[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
        
        return dp[m][n]`,

    cpp: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        
        dp[0][0] = true;
        
        // Handle patterns with '*' at the beginning
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[0][j] = dp[0][j - 1];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else if (p[j - 1] == '?' || s[i - 1] == p[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        
        return dp[m][n];
    }
};`,

    java: `class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        
        dp[0][0] = true;
        
        // Handle patterns with '*' at the beginning
        for (int j = 1; j <= n; j++) {
            if (p.charAt(j - 1) == '*') {
                dp[0][j] = dp[0][j - 1];
            }
        }
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p.charAt(j - 1) == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                } else if (p.charAt(j - 1) == '?' || s.charAt(i - 1) == p.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        
        return dp[m][n];
    }
}`
  },

  33: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;
    
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    
    return jumps;
};`,

    python: `class Solution:
    def jump(self, nums: List[int]) -> int:
        jumps = 0
        current_end = 0
        farthest = 0
        
        for i in range(len(nums) - 1):
            farthest = max(farthest, i + nums[i])
            
            if i == current_end:
                jumps += 1
                current_end = farthest
        
        return jumps`,

    cpp: `class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0;
        int currentEnd = 0;
        int farthest = 0;
        
        for (int i = 0; i < nums.size() - 1; i++) {
            farthest = max(farthest, i + nums[i]);
            
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
            }
        }
        
        return jumps;
    }
};`,

    java: `class Solution {
    public int jump(int[] nums) {
        int jumps = 0;
        int currentEnd = 0;
        int farthest = 0;
        
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
            }
        }
        
        return jumps;
    }
}`
  },34: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const result = [];
    
    function backtrack(path, used) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            path.push(nums[i]);
            used[i] = true;
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }
    
    backtrack([], Array(nums.length).fill(false));
    return result;
};`,

    python: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []
        
        def backtrack(path: List[int], used: List[bool]):
            if len(path) == len(nums):
                result.append(path[:])
                return
            
            for i in range(len(nums)):
                if used[i]:
                    continue
                
                path.append(nums[i])
                used[i] = True
                backtrack(path, used)
                path.pop()
                used[i] = False
        
        backtrack([], [False] * len(nums))
        return result`,

    cpp: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        backtrack(nums, path, used, result);
        return result;
    }
    
private:
    void backtrack(vector<int>& nums, vector<int>& path, 
                   vector<bool>& used, vector<vector<int>>& result) {
        if (path.size() == nums.size()) {
            result.push_back(path);
            return;
        }
        
        for (int i = 0; i < nums.size(); i++) {
            if (used[i]) continue;
            
            path.push_back(nums[i]);
            used[i] = true;
            backtrack(nums, path, used, result);
            path.pop_back();
            used[i] = false;
        }
    }
};`,

    java: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
        return result;
    }
    
    private void backtrack(int[] nums, List<Integer> path, 
                          boolean[] used, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            path.add(nums[i]);
            used[i] = true;
            backtrack(nums, path, used, result);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}`
  },

  35: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    function backtrack(path, used) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
            
            path.push(nums[i]);
            used[i] = true;
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }
    
    backtrack([], Array(nums.length).fill(false));
    return result;
};`,

    python: `class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        result = []
        
        def backtrack(path: List[int], used: List[bool]):
            if len(path) == len(nums):
                result.append(path[:])
                return
            
            for i in range(len(nums)):
                if used[i]:
                    continue
                if i > 0 and nums[i] == nums[i-1] and not used[i-1]:
                    continue
                
                path.append(nums[i])
                used[i] = True
                backtrack(path, used)
                path.pop()
                used[i] = False
        
        backtrack([], [False] * len(nums))
        return result`,

    cpp: `class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> result;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        backtrack(nums, path, used, result);
        return result;
    }
    
private:
    void backtrack(vector<int>& nums, vector<int>& path,
                   vector<bool>& used, vector<vector<int>>& result) {
        if (path.size() == nums.size()) {
            result.push_back(path);
            return;
        }
        
        for (int i = 0; i < nums.size(); i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
            
            path.push_back(nums[i]);
            used[i] = true;
            backtrack(nums, path, used, result);
            path.pop_back();
            used[i] = false;
        }
    }
};`,

    java: `class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
        return result;
    }
    
    private void backtrack(int[] nums, List<Integer> path,
                          boolean[] used, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
            
            path.add(nums[i]);
            used[i] = true;
            backtrack(nums, path, used, result);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}`
  },

  36: {
    javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    const n = matrix.length;
    
    // Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
};`,

    python: `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        n = len(matrix)
        
        # Transpose the matrix
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        
        # Reverse each row
        for i in range(n):
            matrix[i].reverse()`,

    cpp: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        
        // Transpose the matrix
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        
        // Reverse each row
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};`,

    java: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        
        // Transpose the matrix
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        
        // Reverse each row
        for (int i = 0; i < n; i++) {
            int left = 0, right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }
}`
  },

  37: {
    javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    
    for (const str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map.has(sorted)) {
            map.set(sorted, []);
        }
        map.get(sorted).push(str);
    }
    
    return Array.from(map.values());
};`,

    python: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        anagram_map = {}
        
        for s in strs:
            sorted_str = ''.join(sorted(s))
            if sorted_str not in anagram_map:
                anagram_map[sorted_str] = []
            anagram_map[sorted_str].append(s)
        
        return list(anagram_map.values())`,

    cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> anagramMap;
        
        for (const string& str : strs) {
            string sorted = str;
            sort(sorted.begin(), sorted.end());
            anagramMap[sorted].push_back(str);
        }
        
        vector<vector<string>> result;
        for (auto& pair : anagramMap) {
            result.push_back(pair.second);
        }
        
        return result;
    }
};`,

    java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> anagramMap = new HashMap<>();
        
        for (String str : strs) {
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String sorted = new String(chars);
            
            if (!anagramMap.containsKey(sorted)) {
                anagramMap.put(sorted, new ArrayList<>());
            }
            anagramMap.get(sorted).add(str);
        }
        
        return new ArrayList<>(anagramMap.values());
    }
}`
  },

  38: {
    javascript: `/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n === 0) return 1;
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    
    function power(base, exp) {
        if (exp === 0) return 1;
        if (exp === 1) return base;
        
        const half = power(base, Math.floor(exp / 2));
        if (exp % 2 === 0) {
            return half * half;
        } else {
            return half * half * base;
        }
    }
    
    return power(x, n);
};`,

    python: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n == 0:
            return 1
        if n < 0:
            x = 1 / x
            n = -n
        
        def power(base: float, exp: int) -> float:
            if exp == 0:
                return 1
            if exp == 1:
                return base
            
            half = power(base, exp // 2)
            if exp % 2 == 0:
                return half * half
            else:
                return half * half * base
        
        return power(x, n)`,

    cpp: `class Solution {
public:
    double myPow(double x, int n) {
        if (n == 0) return 1;
        long long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        
        return power(x, N);
    }
    
private:
    double power(double base, long long exp) {
        if (exp == 0) return 1;
        if (exp == 1) return base;
        
        double half = power(base, exp / 2);
        if (exp % 2 == 0) {
            return half * half;
        } else {
            return half * half * base;
        }
    }
};`,

    java: `class Solution {
    public double myPow(double x, int n) {
        if (n == 0) return 1;
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        
        return power(x, N);
    }
    
    private double power(double base, long exp) {
        if (exp == 0) return 1;
        if (exp == 1) return base;
        
        double half = power(base, exp / 2);
        if (exp % 2 == 0) {
            return half * half;
        } else {
            return half * half * base;
        }
    }
}`
  },

  39: {
    javascript: `/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const result = [];
    const board = Array(n).fill(null).map(() => Array(n).fill('.'));
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }
            
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            backtrack(row + 1);
            
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }
    
    backtrack(0);
    return result;
};`,

    python: `class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        result = []
        board = [['.' for _ in range(n)] for _ in range(n)]
        cols = set()
        diag1 = set()
        diag2 = set()
        
        def backtrack(row: int):
            if row == n:
                result.append([''.join(r) for r in board])
                return
            
            for col in range(n):
                if col in cols or (row - col) in diag1 or (row + col) in diag2:
                    continue
                
                board[row][col] = 'Q'
                cols.add(col)
                diag1.add(row - col)
                diag2.add(row + col)
                
                backtrack(row + 1)
                
                board[row][col] = '.'
                cols.remove(col)
                diag1.remove(row - col)
                diag2.remove(row + col)
        
        backtrack(0)
        return result`,

    cpp: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> result;
        vector<string> board(n, string(n, '.'));
        unordered_set<int> cols, diag1, diag2;
        backtrack(0, n, board, cols, diag1, diag2, result);
        return result;
    }
    
private:
    void backtrack(int row, int n, vector<string>& board,
                   unordered_set<int>& cols, unordered_set<int>& diag1,
                   unordered_set<int>& diag2, vector<vector<string>>& result) {
        if (row == n) {
            result.push_back(board);
            return;
        }
        
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row - col) || diag2.count(row + col)) {
                continue;
            }
            
            board[row][col] = 'Q';
            cols.insert(col);
            diag1.insert(row - col);
            diag2.insert(row + col);
            
            backtrack(row + 1, n, board, cols, diag1, diag2, result);
            
            board[row][col] = '.';
            cols.erase(col);
            diag1.erase(row - col);
            diag2.erase(row + col);
        }
    }
};`,

    java: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(board[i], '.');
        }
        
        Set<Integer> cols = new HashSet<>();
        Set<Integer> diag1 = new HashSet<>();
        Set<Integer> diag2 = new HashSet<>();
        
        backtrack(0, n, board, cols, diag1, diag2, result);
        return result;
    }
    
    private void backtrack(int row, int n, char[][] board,
                          Set<Integer> cols, Set<Integer> diag1,
                          Set<Integer> diag2, List<List<String>> result) {
        if (row == n) {
            List<String> solution = new ArrayList<>();
            for (char[] r : board) {
                solution.add(new String(r));
            }
            result.add(solution);
            return;
        }
        
        for (int col = 0; col < n; col++) {
            if (cols.contains(col) || diag1.contains(row - col) || diag2.contains(row + col)) {
                continue;
            }
            
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            backtrack(row + 1, n, board, cols, diag1, diag2, result);
            
            board[row][col] = '.';
            cols.remove(col);
            diag1.remove(row - col);
            diag2.remove(row + col);
        }
    }
}`
  },

  40: {
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
    let count = 0;
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();
    
    function backtrack(row) {
        if (row === n) {
            count++;
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }
            
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            backtrack(row + 1);
            
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }
    
    backtrack(0);
    return count;
};`,

    python: `class Solution:
    def totalNQueens(self, n: int) -> int:
        count = 0
        cols = set()
        diag1 = set()
        diag2 = set()
        
        def backtrack(row: int):
            nonlocal count
            if row == n:
                count += 1
                return
            
            for col in range(n):
                if col in cols or (row - col) in diag1 or (row + col) in diag2:
                    continue
                
                cols.add(col)
                diag1.add(row - col)
                diag2.add(row + col)
                
                backtrack(row + 1)
                
                cols.remove(col)
                diag1.remove(row - col)
                diag2.remove(row + col)
        
        backtrack(0)
        return count`,

    cpp: `class Solution {
public:
    int totalNQueens(int n) {
        int count = 0;
        unordered_set<int> cols, diag1, diag2;
        backtrack(0, n, cols, diag1, diag2, count);
        return count;
    }
    
private:
    void backtrack(int row, int n, unordered_set<int>& cols,
                   unordered_set<int>& diag1, unordered_set<int>& diag2,
                   int& count) {
        if (row == n) {
            count++;
            return;
        }
        
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row - col) || diag2.count(row + col)) {
                continue;
            }
            
            cols.insert(col);
            diag1.insert(row - col);
            diag2.insert(row + col);
            
            backtrack(row + 1, n, cols, diag1, diag2, count);
            
            cols.erase(col);
            diag1.erase(row - col);
            diag2.erase(row + col);
        }
    }
};`,

    java: `class Solution {
    private int count = 0;
    
    public int totalNQueens(int n) {
        Set<Integer> cols = new HashSet<>();
        Set<Integer> diag1 = new HashSet<>();
        Set<Integer> diag2 = new HashSet<>();
        
        backtrack(0, n, cols, diag1, diag2);
        return count;
    }
    
    private void backtrack(int row, int n, Set<Integer> cols,
                          Set<Integer> diag1, Set<Integer> diag2) {
        if (row == n) {
            count++;
            return;
        }
        
        for (int col = 0; col < n; col++) {
            if (cols.contains(col) || diag1.contains(row - col) || diag2.contains(row + col)) {
                continue;
            }
            
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            backtrack(row + 1, n, cols, diag1, diag2);
            
            cols.remove(col);
            diag1.remove(row - col);
            diag2.remove(row + col);
        }
    }
}`
  },

  41: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
};`,

    python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = nums[0]
        current_sum = nums[0]
        
        for i in range(1, len(nums)):
            current_sum = max(nums[i], current_sum + nums[i])
            max_sum = max(max_sum, current_sum)
        
        return max_sum`,

    cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        
        return maxSum;
    }
};`,

    java: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
}`
  },

  42: {
    javascript: `/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    const result = [];
    if (matrix.length === 0) return result;
    
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (let col = left; col <= right; col++) {
            result.push(matrix[top][col]);
        }
        top++;
        
        // Traverse down
        for (let row = top; row <= bottom; row++) {
            result.push(matrix[row][right]);
        }
        right--;
        
        // Traverse left
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                result.push(matrix[bottom][col]);
            }
            bottom--;
        }
        
        // Traverse up
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                result.push(matrix[row][left]);
            }
            left++;
        }
    }
    
    return result;
};`,

    python: `class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        result = []
        if not matrix:
            return result
        
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1
        
        while top <= bottom and left <= right:
            # Traverse right
            for col in range(left, right + 1):
                result.append(matrix[top][col])
            top += 1
            
            # Traverse down
            for row in range(top, bottom + 1):
                result.append(matrix[row][right])
            right -= 1
            
            # Traverse left
            if top <= bottom:
                for col in range(right, left - 1, -1):
                    result.append(matrix[bottom][col])
                bottom -= 1
            
            # Traverse up
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    result.append(matrix[row][left])
                left += 1
        
        return result`,

    cpp: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> result;
        if (matrix.empty()) return result;
        
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;
        
        while (top <= bottom && left <= right) {
            // Traverse right
            for (int col = left; col <= right; col++) {
                result.push_back(matrix[top][col]);
            }
            top++;
            
            // Traverse down
            for (int row = top; row <= bottom; row++) {
                result.push_back(matrix[row][right]);
            }
            right--;
            
            // Traverse left
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    result.push_back(matrix[bottom][col]);
                }
                bottom--;
            }
            
            // Traverse up
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    result.push_back(matrix[row][left]);
                }
                left++;
            }
        }
        
        return result;
    }
};`,

    java: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix.length == 0) return result;
        
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        
        while (top <= bottom && left <= right) {
            // Traverse right
            for (int col = left; col <= right; col++) {
                result.add(matrix[top][col]);
            }
            top++;
            
            // Traverse down
            for (int row = top; row <= bottom; row++) {
                result.add(matrix[row][right]);
            }
            right--;
            
            // Traverse left
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    result.add(matrix[bottom][col]);
                }
                bottom--;
            }
            
            // Traverse up
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    result.add(matrix[row][left]);
                }
                left++;
            }
        }
        
        return result;
    }
}`
  },
    43: {
    javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    
    return true;
};`,

    python: `class Solution:
    def canJump(self, nums: List[int]) -> bool:
        max_reach = 0
        
        for i in range(len(nums)):
            if i > max_reach:
                return False
            max_reach = max(max_reach, i + nums[i])
            if max_reach >= len(nums) - 1:
                return True
        
        return True`,

    cpp: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        int maxReach = 0;
        
        for (int i = 0; i < nums.size(); i++) {
            if (i > maxReach) return false;
            maxReach = max(maxReach, i + nums[i]);
            if (maxReach >= nums.size() - 1) return true;
        }
        
        return true;
    }
};`,

    java: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        
        return true;
    }
}`
  },

  44: {
    javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length <= 1) return intervals;
    
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = merged[merged.length - 1];
        
        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            merged.push(current);
        }
    }
    
    return merged;
};`,

    python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if len(intervals) <= 1:
            return intervals
        
        intervals.sort(key=lambda x: x[0])
        merged = [intervals[0]]
        
        for i in range(1, len(intervals)):
            current = intervals[i]
            last = merged[-1]
            
            if current[0] <= last[1]:
                last[1] = max(last[1], current[1])
            else:
                merged.append(current)
        
        return merged`,

    cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.size() <= 1) return intervals;
        
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged = {intervals[0]};
        
        for (int i = 1; i < intervals.size(); i++) {
            vector<int>& current = intervals[i];
            vector<int>& last = merged.back();
            
            if (current[0] <= last[1]) {
                last[1] = max(last[1], current[1]);
            } else {
                merged.push_back(current);
            }
        }
        
        return merged;
    }
};`,

    java: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        merged.add(intervals[0]);
        
        for (int i = 1; i < intervals.length; i++) {
            int[] current = intervals[i];
            int[] last = merged.get(merged.size() - 1);
            
            if (current[0] <= last[1]) {
                last[1] = Math.max(last[1], current[1]);
            } else {
                merged.add(current);
            }
        }
        
        return merged.toArray(new int[merged.size()][]);
    }
}`
  },

  45: {
    javascript: `/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    const result = [];
    let i = 0;
    
    // Add all intervals before newInterval
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    
    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
};`,

    python: `class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        result = []
        i = 0
        
        # Add all intervals before newInterval
        while i < len(intervals) and intervals[i][1] < newInterval[0]:
            result.append(intervals[i])
            i += 1
        
        # Merge overlapping intervals
        while i < len(intervals) and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        result.append(newInterval)
        
        # Add remaining intervals
        while i < len(intervals):
            result.append(intervals[i])
            i += 1
        
        return result`,

    cpp: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int i = 0;
        
        // Add all intervals before newInterval
        while (i < intervals.size() && intervals[i][1] < newInterval[0]) {
            result.push_back(intervals[i]);
            i++;
        }
        
        // Merge overlapping intervals
        while (i < intervals.size() && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push_back(newInterval);
        
        // Add remaining intervals
        while (i < intervals.size()) {
            result.push_back(intervals[i]);
            i++;
        }
        
        return result;
    }
};`,

    java: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        
        // Add all intervals before newInterval
        while (i < intervals.length && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }
        
        // Merge overlapping intervals
        while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);
        
        // Add remaining intervals
        while (i < intervals.length) {
            result.add(intervals[i]);
            i++;
        }
        
        return result.toArray(new int[result.size()][]);
    }
}`
  },

  46: {
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    let length = 0;
    let i = s.length - 1;
    
    // Skip trailing spaces
    while (i >= 0 && s[i] === ' ') {
        i--;
    }
    
    // Count the last word
    while (i >= 0 && s[i] !== ' ') {
        length++;
        i--;
    }
    
    return length;
};`,

    python: `class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        length = 0
        i = len(s) - 1
        
        # Skip trailing spaces
        while i >= 0 and s[i] == ' ':
            i -= 1
        
        # Count the last word
        while i >= 0 and s[i] != ' ':
            length += 1
            i -= 1
        
        return length`,

    cpp: `class Solution {
public:
    int lengthOfLastWord(string s) {
        int length = 0;
        int i = s.length() - 1;
        
        // Skip trailing spaces
        while (i >= 0 && s[i] == ' ') {
            i--;
        }
        
        // Count the last word
        while (i >= 0 && s[i] != ' ') {
            length++;
            i--;
        }
        
        return length;
    }
};`,

    java: `class Solution {
    public int lengthOfLastWord(String s) {
        int length = 0;
        int i = s.length() - 1;
        
        // Skip trailing spaces
        while (i >= 0 && s.charAt(i) == ' ') {
            i--;
        }
        
        // Count the last word
        while (i >= 0 && s.charAt(i) != ' ') {
            length++;
            i--;
        }
        
        return length;
    }
}`
  },

  47: {
    javascript: `/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    const matrix = Array(n).fill(null).map(() => Array(n).fill(0));
    let top = 0, bottom = n - 1;
    let left = 0, right = n - 1;
    let num = 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (let col = left; col <= right; col++) {
            matrix[top][col] = num++;
        }
        top++;
        
        // Traverse down
        for (let row = top; row <= bottom; row++) {
            matrix[row][right] = num++;
        }
        right--;
        
        // Traverse left
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                matrix[bottom][col] = num++;
            }
            bottom--;
        }
        
        // Traverse up
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                matrix[row][left] = num++;
            }
            left++;
        }
    }
    
    return matrix;
};`,

    python: `class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        matrix = [[0] * n for _ in range(n)]
        top, bottom = 0, n - 1
        left, right = 0, n - 1
        num = 1
        
        while top <= bottom and left <= right:
            # Traverse right
            for col in range(left, right + 1):
                matrix[top][col] = num
                num += 1
            top += 1
            
            # Traverse down
            for row in range(top, bottom + 1):
                matrix[row][right] = num
                num += 1
            right -= 1
            
            # Traverse left
            if top <= bottom:
                for col in range(right, left - 1, -1):
                    matrix[bottom][col] = num
                    num += 1
                bottom -= 1
            
            # Traverse up
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    matrix[row][left] = num
                    num += 1
                left += 1
        
        return matrix`,

    cpp: `class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> matrix(n, vector<int>(n, 0));
        int top = 0, bottom = n - 1;
        int left = 0, right = n - 1;
        int num = 1;
        
        while (top <= bottom && left <= right) {
            // Traverse right
            for (int col = left; col <= right; col++) {
                matrix[top][col] = num++;
            }
            top++;
            
            // Traverse down
            for (int row = top; row <= bottom; row++) {
                matrix[row][right] = num++;
            }
            right--;
            
            // Traverse left
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    matrix[bottom][col] = num++;
                }
                bottom--;
            }
            
            // Traverse up
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    matrix[row][left] = num++;
                }
                left++;
            }
        }
        
        return matrix;
    }
};`,

    java: `class Solution {
    public int[][] generateMatrix(int n) {
        int[][] matrix = new int[n][n];
        int top = 0, bottom = n - 1;
        int left = 0, right = n - 1;
        int num = 1;
        
        while (top <= bottom && left <= right) {
            // Traverse right
            for (int col = left; col <= right; col++) {
                matrix[top][col] = num++;
            }
            top++;
            
            // Traverse down
            for (int row = top; row <= bottom; row++) {
                matrix[row][right] = num++;
            }
            right--;
            
            // Traverse left
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    matrix[bottom][col] = num++;
                }
                bottom--;
            }
            
            // Traverse up
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    matrix[row][left] = num++;
                }
                left++;
            }
        }
        
        return matrix;
    }
}`
  },

  48: {
    javascript: `/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    const factorial = [1];
    const numbers = [];
    
    // Calculate factorials and build numbers array
    for (let i = 1; i <= n; i++) {
        factorial[i] = factorial[i - 1] * i;
        numbers.push(i);
    }
    
    k--; // Convert to 0-indexed
    let result = '';
    
    for (let i = n; i > 0; i--) {
        const index = Math.floor(k / factorial[i - 1]);
        result += numbers[index];
        numbers.splice(index, 1);
        k %= factorial[i - 1];
    }
    
    return result;
};`,

    python: `class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        factorial = [1]
        numbers = []
        
        # Calculate factorials and build numbers array
        for i in range(1, n + 1):
            factorial.append(factorial[-1] * i)
            numbers.append(i)
        
        k -= 1  # Convert to 0-indexed
        result = ''
        
        for i in range(n, 0, -1):
            index = k // factorial[i - 1]
            result += str(numbers[index])
            numbers.pop(index)
            k %= factorial[i - 1]
        
        return result`,

    cpp: `class Solution {
public:
    string getPermutation(int n, int k) {
        vector<int> factorial(n + 1, 1);
        vector<int> numbers;
        
        // Calculate factorials and build numbers array
        for (int i = 1; i <= n; i++) {
            factorial[i] = factorial[i - 1] * i;
            numbers.push_back(i);
        }
        
        k--; // Convert to 0-indexed
        string result = "";
        
        for (int i = n; i > 0; i--) {
            int index = k / factorial[i - 1];
            result += to_string(numbers[index]);
            numbers.erase(numbers.begin() + index);
            k %= factorial[i - 1];
        }
        
        return result;
    }
};`,

    java: `class Solution {
    public String getPermutation(int n, int k) {
        int[] factorial = new int[n + 1];
        List<Integer> numbers = new ArrayList<>();
        factorial[0] = 1;
        
        // Calculate factorials and build numbers array
        for (int i = 1; i <= n; i++) {
            factorial[i] = factorial[i - 1] * i;
            numbers.add(i);
        }
        
        k--; // Convert to 0-indexed
        StringBuilder result = new StringBuilder();
        
        for (int i = n; i > 0; i--) {
            int index = k / factorial[i - 1];
            result.append(numbers.get(index));
            numbers.remove(index);
            k %= factorial[i - 1];
        }
        
        return result.toString();
    }
}`
  },

  49: {
    javascript: `/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    // Calculate length and find tail
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    // Calculate effective rotations
    k = k % length;
    if (k === 0) return head;
    
    // Find new tail (length - k - 1)th node
    let newTail = head;
    for (let i = 0; i < length - k - 1; i++) {
        newTail = newTail.next;
    }
    
    // Rotate
    const newHead = newTail.next;
    newTail.next = null;
    tail.next = head;
    
    return newHead;
};`,

    python: `class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or not head.next or k == 0:
            return head
        
        # Calculate length and find tail
        length = 1
        tail = head
        while tail.next:
            tail = tail.next
            length += 1
        
        # Calculate effective rotations
        k = k % length
        if k == 0:
            return head
        
        # Find new tail (length - k - 1)th node
        new_tail = head
        for _ in range(length - k - 1):
            new_tail = new_tail.next
        
        # Rotate
        new_head = new_tail.next
        new_tail.next = None
        tail.next = head
        
        return new_head`,

    cpp: `class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        
        // Calculate length and find tail
        int length = 1;
        ListNode* tail = head;
        while (tail->next) {
            tail = tail->next;
            length++;
        }
        
        // Calculate effective rotations
        k = k % length;
        if (k == 0) return head;
        
        // Find new tail (length - k - 1)th node
        ListNode* newTail = head;
        for (int i = 0; i < length - k - 1; i++) {
            newTail = newTail->next;
        }
        
        // Rotate
        ListNode* newHead = newTail->next;
        newTail->next = nullptr;
        tail->next = head;
        
        return newHead;
    }
};`,

    java: `class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;
        
        // Calculate length and find tail
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }
        
        // Calculate effective rotations
        k = k % length;
        if (k == 0) return head;
        
        // Find new tail (length - k - 1)th node
        ListNode newTail = head;
        for (int i = 0; i < length - k - 1; i++) {
            newTail = newTail.next;
        }
        
        // Rotate
        ListNode newHead = newTail.next;
        newTail.next = null;
        tail.next = head;
        
        return newHead;
    }
}`
  },

  50: {
    javascript: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const dp = Array(m).fill(null).map(() => Array(n).fill(1));
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
};`,

    python: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[1] * n for _ in range(m)]
        
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        
        return dp[m - 1][n - 1]`,

    cpp: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, 1));
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        
        return dp[m - 1][n - 1];
    }
};`,

    java: `class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 || j == 0) {
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
        }
        
        return dp[m - 1][n - 1];
    }
}`
  },

  51: {
    javascript: `/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
        return 0;
    }
    
    const dp = Array(m).fill(null).map(() => Array(n).fill(0));
    dp[0][0] = 1;
    
    // Initialize first column
    for (let i = 1; i < m; i++) {
        dp[i][0] = (obstacleGrid[i][0] === 0 && dp[i - 1][0] === 1) ? 1 : 0;
    }
    
    // Initialize first row
    for (let j = 1; j < n; j++) {
        dp[0][j] = (obstacleGrid[0][j] === 0 && dp[0][j - 1] === 1) ? 1 : 0;
    }
    
    // Fill the dp table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }
    
    return dp[m - 1][n - 1];
};`,

    python: `class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        
        if obstacleGrid[0][0] == 1 or obstacleGrid[m - 1][n - 1] == 1:
            return 0
        
        dp = [[0] * n for _ in range(m)]
        dp[0][0] = 1
        
        # Initialize first column
        for i in range(1, m):
            dp[i][0] = 1 if obstacleGrid[i][0] == 0 and dp[i - 1][0] == 1 else 0
        
        # Initialize first row
        for j in range(1, n):
            dp[0][j] = 1 if obstacleGrid[0][j] == 0 and dp[0][j - 1] == 1 else 0
        
        # Fill the dp table
        for i in range(1, m):
            for j in range(1, n):
                if obstacleGrid[i][j] == 0:
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        
        return dp[m - 1][n - 1]`,

    cpp: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        
        if (obstacleGrid[0][0] == 1 || obstacleGrid[m - 1][n - 1] == 1) {
            return 0;
        }
        
        vector<vector<int>> dp(m, vector<int>(n, 0));
        dp[0][0] = 1;
        
        // Initialize first column
        for (int i = 1; i < m; i++) {
            dp[i][0] = (obstacleGrid[i][0] == 0 && dp[i - 1][0] == 1) ? 1 : 0;
        }
        
        // Initialize first row
        for (int j = 1; j < n; j++) {
            dp[0][j] = (obstacleGrid[0][j] == 0 && dp[0][j - 1] == 1) ? 1 : 0;
        }
        
        // Fill the dp table
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (obstacleGrid[i][j] == 0) {
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
        }
        
        return dp[m - 1][n - 1];
    }
};`,

    java: `class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int m = obstacleGrid.length;
        int n = obstacleGrid[0].length;
        
        if (obstacleGrid[0][0] == 1 || obstacleGrid[m - 1][n - 1] == 1) {
            return 0;
        }
        
        int[][] dp = new int[m][n];
        dp[0][0] = 1;
        
        // Initialize first column
        for (int i = 1; i < m; i++) {
            dp[i][0] = (obstacleGrid[i][0] == 0 && dp[i - 1][0] == 1) ? 1 : 0;
        }
        
        // Initialize first row
        for (int j = 1; j < n; j++) {
            dp[0][j] = (obstacleGrid[0][j] == 0 && dp[0][j - 1] == 1) ? 1 : 0;
        }
        
        // Fill the dp table
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (obstacleGrid[i][j] == 0) {
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
        }
        
        return dp[m - 1][n - 1];
    }
}`
  },

  52: {
    javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = Array(m).fill(null).map(() => Array(n).fill(0));
    
    dp[0][0] = grid[0][0];
    
    // Initialize first column
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    
    // Initialize first row
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    
    // Fill the dp table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }
    
    return dp[m - 1][n - 1];
};`,

    python: `class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp = [[0] * n for _ in range(m)]
        
        dp[0][0] = grid[0][0]
        
        # Initialize first column
        for i in range(1, m):
            dp[i][0] = dp[i - 1][0] + grid[i][0]
        
        # Initialize first row
        for j in range(1, n):
            dp[0][j] = dp[0][j - 1] + grid[0][j]
        
        # Fill the dp table
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        
        return dp[m - 1][n - 1]`,

    cpp: `class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        
        dp[0][0] = grid[0][0];
        
        // Initialize first column
        for (int i = 1; i < m; i++) {
            dp[i][0] = dp[i - 1][0] + grid[i][0];
        }
        
        // Initialize first row
        for (int j = 1; j < n; j++) {
            dp[0][j] = dp[0][j - 1] + grid[0][j];
        }
        
        // Fill the dp table
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }
        
        return dp[m - 1][n - 1];
    }
};`,

    java: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[][] dp = new int[m][n];
        
        dp[0][0] = grid[0][0];
        
        // Initialize first column
        for (int i = 1; i < m; i++) {
            dp[i][0] = dp[i - 1][0] + grid[i][0];
        }
        
        // Initialize first row
        for (int j = 1; j < n; j++) {
            dp[0][j] = dp[0][j - 1] + grid[0][j];
        }
        
        // Fill the dp table
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }
        
        return dp[m - 1][n - 1];
    }
}`
  },

  53: {
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    s = s.trim();
    let seenDigit = false;
    let seenExponent = false;
    let seenDot = false;
    
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        
        if (c >= '0' && c <= '9') {
            seenDigit = true;
        } else if (c === '+' || c === '-') {
            if (i > 0 && s[i - 1] !== 'e' && s[i - 1] !== 'E') {
                return false;
            }
        } else if (c === 'e' || c === 'E') {
            if (seenExponent || !seenDigit) {
                return false;
            }
            seenExponent = true;
            seenDigit = false; // Must have digit after exponent
        } else if (c === '.') {
            if (seenDot || seenExponent) {
                return false;
            }
            seenDot = true;
        } else {
            return false;
        }
    }
    
    return seenDigit;
};`,

    python: `class Solution:
    def isNumber(self, s: str) -> bool:
        s = s.strip()
        seen_digit = False
        seen_exponent = False
        seen_dot = False
        
        for i, c in enumerate(s):
            if c.isdigit():
                seen_digit = True
            elif c in ['+', '-']:
                if i > 0 and s[i - 1] not in ['e', 'E']:
                    return False
            elif c in ['e', 'E']:
                if seen_exponent or not seen_digit:
                    return False
                seen_exponent = True
                seen_digit = False  # Must have digit after exponent
            elif c == '.':
                if seen_dot or seen_exponent:
                    return False
                seen_dot = True
            else:
                return False
        
        return seen_digit`,

    cpp: `class Solution {
public:
    bool isNumber(string s) {
        int i = 0, n = s.length();
        
        // Skip leading whitespace
        while (i < n && s[i] == ' ') i++;
        
        // Check for sign
        if (i < n && (s[i] == '+' || s[i] == '-')) i++;
        
        bool seenDigit = false;
        bool seenDot = false;
        
        // Check for digits and decimal point
        while (i < n && (isdigit(s[i]) || s[i] == '.')) {
            if (s[i] == '.') {
                if (seenDot) return false;
                seenDot = true;
            } else {
                seenDigit = true;
            }
            i++;
        }
        
        if (!seenDigit) return false;
        
        // Check for exponent
        if (i < n && (s[i] == 'e' || s[i] == 'E')) {
            i++;
            if (i < n && (s[i] == '+' || s[i] == '-')) i++;
            
            bool seenExpDigit = false;
            while (i < n && isdigit(s[i])) {
                seenExpDigit = true;
                i++;
            }
            
            if (!seenExpDigit) return false;
        }
        
        // Skip trailing whitespace
        while (i < n && s[i] == ' ') i++;
        
        return i == n;
    }
};`,

    java: `class Solution {
    public boolean isNumber(String s) {
        s = s.trim();
        boolean seenDigit = false;
        boolean seenExponent = false;
        boolean seenDot = false;
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            
            if (Character.isDigit(c)) {
                seenDigit = true;
            } else if (c == '+' || c == '-') {
                if (i > 0 && s.charAt(i - 1) != 'e' && s.charAt(i - 1) != 'E') {
                    return false;
                }
            } else if (c == 'e' || c == 'E') {
                if (seenExponent || !seenDigit) {
                    return false;
                }
                seenExponent = true;
                seenDigit = false; // Must have digit after exponent
            } else if (c == '.') {
                if (seenDot || seenExponent) {
                    return false;
                }
                seenDot = true;
            } else {
                return false;
            }
        }
        
        return seenDigit;
    }
}`
  },
    54: {
    javascript: `/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    
    // If we're here, all digits were 9
    return [1, ...digits];
};`,

    python: `class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        
        # If we're here, all digits were 9
        return [1] + digits`,

    cpp: `class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        
        // If we're here, all digits were 9
        digits.insert(digits.begin(), 1);
        return digits;
    }
};`,

    java: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        
        // If we're here, all digits were 9
        int[] result = new int[digits.length + 1];
        result[0] = 1;
        return result;
    }
}`
  },

  55: {
    javascript: `/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let result = '';
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;
    
    while (i >= 0 || j >= 0 || carry > 0) {
        const digitA = i >= 0 ? parseInt(a[i]) : 0;
        const digitB = j >= 0 ? parseInt(b[j]) : 0;
        
        const sum = digitA + digitB + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
        
        i--;
        j--;
    }
    
    return result;
};`,

    python: `class Solution:
    def addBinary(self, a: str, b: str) -> str:
        result = ''
        carry = 0
        i, j = len(a) - 1, len(b) - 1
        
        while i >= 0 or j >= 0 or carry > 0:
            digit_a = int(a[i]) if i >= 0 else 0
            digit_b = int(b[j]) if j >= 0 else 0
            
            total = digit_a + digit_b + carry
            result = str(total % 2) + result
            carry = total // 2
            
            i -= 1
            j -= 1
        
        return result`,

    cpp: `class Solution {
public:
    string addBinary(string a, string b) {
        string result = "";
        int carry = 0;
        int i = a.length() - 1;
        int j = b.length() - 1;
        
        while (i >= 0 || j >= 0 || carry > 0) {
            int digitA = i >= 0 ? a[i] - '0' : 0;
            int digitB = j >= 0 ? b[j] - '0' : 0;
            
            int sum = digitA + digitB + carry;
            result = to_string(sum % 2) + result;
            carry = sum / 2;
            
            i--;
            j--;
        }
        
        return result;
    }
};`,

    java: `class Solution {
    public String addBinary(String a, String b) {
        StringBuilder result = new StringBuilder();
        int carry = 0;
        int i = a.length() - 1;
        int j = b.length() - 1;
        
        while (i >= 0 || j >= 0 || carry > 0) {
            int digitA = i >= 0 ? a.charAt(i) - '0' : 0;
            int digitB = j >= 0 ? b.charAt(j) - '0' : 0;
            
            int sum = digitA + digitB + carry;
            result.insert(0, sum % 2);
            carry = sum / 2;
            
            i--;
            j--;
        }
        
        return result.toString();
    }
}`
  },

  56: {
    javascript: `/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
    const result = [];
    let i = 0;
    
    while (i < words.length) {
        let lineLength = words[i].length;
        let j = i + 1;
        
        // Find words that fit in current line
        while (j < words.length && lineLength + 1 + words[j].length <= maxWidth) {
            lineLength += 1 + words[j].length;
            j++;
        }
        
        const numWords = j - i;
        const line = [];
        
        // Last line or line with single word - left justify
        if (j === words.length || numWords === 1) {
            line.push(words.slice(i, j).join(' '));
            line.push(' '.repeat(maxWidth - line.join('').length));
        } else {
            // Middle lines - fully justify
            const totalSpaces = maxWidth - words.slice(i, j).reduce((sum, w) => sum + w.length, 0);
            const spaceBetween = Math.floor(totalSpaces / (numWords - 1));
            const extraSpaces = totalSpaces % (numWords - 1);
            
            for (let k = i; k < j; k++) {
                line.push(words[k]);
                if (k < j - 1) {
                    line.push(' '.repeat(spaceBetween + (k - i < extraSpaces ? 1 : 0)));
                }
            }
        }
        
        result.push(line.join(''));
        i = j;
    }
    
    return result;
};`,

    python: `class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        result = []
        i = 0
        
        while i < len(words):
            line_length = len(words[i])
            j = i + 1
            
            # Find words that fit in current line
            while j < len(words) and line_length + 1 + len(words[j]) <= maxWidth:
                line_length += 1 + len(words[j])
                j += 1
            
            num_words = j - i
            line = []
            
            # Last line or line with single word - left justify
            if j == len(words) or num_words == 1:
                line_str = ' '.join(words[i:j])
                line_str += ' ' * (maxWidth - len(line_str))
                result.append(line_str)
            else:
                # Middle lines - fully justify
                total_chars = sum(len(words[k]) for k in range(i, j))
                total_spaces = maxWidth - total_chars
                space_between = total_spaces // (num_words - 1)
                extra_spaces = total_spaces % (num_words - 1)
                
                for k in range(i, j):
                    line.append(words[k])
                    if k < j - 1:
                        spaces = space_between + (1 if k - i < extra_spaces else 0)
                        line.append(' ' * spaces)
                
                result.append(''.join(line))
            
            i = j
        
        return result`,

    cpp: `class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> result;
        int i = 0;
        
        while (i < words.size()) {
            int lineLength = words[i].length();
            int j = i + 1;
            
            // Find words that fit in current line
            while (j < words.size() && lineLength + 1 + words[j].length() <= maxWidth) {
                lineLength += 1 + words[j].length();
                j++;
            }
            
            int numWords = j - i;
            string line = "";
            
            // Last line or line with single word - left justify
            if (j == words.size() || numWords == 1) {
                for (int k = i; k < j; k++) {
                    line += words[k];
                    if (k < j - 1) line += " ";
                }
                line += string(maxWidth - line.length(), ' ');
            } else {
                // Middle lines - fully justify
                int totalChars = 0;
                for (int k = i; k < j; k++) {
                    totalChars += words[k].length();
                }
                int totalSpaces = maxWidth - totalChars;
                int spaceBetween = totalSpaces / (numWords - 1);
                int extraSpaces = totalSpaces % (numWords - 1);
                
                for (int k = i; k < j; k++) {
                    line += words[k];
                    if (k < j - 1) {
                        int spaces = spaceBetween + (k - i < extraSpaces ? 1 : 0);
                        line += string(spaces, ' ');
                    }
                }
            }
            
            result.push_back(line);
            i = j;
        }
        
        return result;
    }
};`,

    java: `class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> result = new ArrayList<>();
        int i = 0;
        
        while (i < words.length) {
            int lineLength = words[i].length();
            int j = i + 1;
            
            // Find words that fit in current line
            while (j < words.length && lineLength + 1 + words[j].length() <= maxWidth) {
                lineLength += 1 + words[j].length();
                j++;
            }
            
            int numWords = j - i;
            StringBuilder line = new StringBuilder();
            
            // Last line or line with single word - left justify
            if (j == words.length || numWords == 1) {
                for (int k = i; k < j; k++) {
                    line.append(words[k]);
                    if (k < j - 1) line.append(" ");
                }
                while (line.length() < maxWidth) {
                    line.append(" ");
                }
            } else {
                // Middle lines - fully justify
                int totalChars = 0;
                for (int k = i; k < j; k++) {
                    totalChars += words[k].length();
                }
                int totalSpaces = maxWidth - totalChars;
                int spaceBetween = totalSpaces / (numWords - 1);
                int extraSpaces = totalSpaces % (numWords - 1);
                
                for (int k = i; k < j; k++) {
                    line.append(words[k]);
                    if (k < j - 1) {
                        int spaces = spaceBetween + (k - i < extraSpaces ? 1 : 0);
                        for (int s = 0; s < spaces; s++) {
                            line.append(" ");
                        }
                    }
                }
            }
            
            result.add(line.toString());
            i = j;
        }
        
        return result;
    }
}`
  },

  57: {
    javascript: `/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x === 0 || x === 1) return x;
    
    let left = 1, right = x;
    let result = 0;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (mid <= x / mid) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
};`,

    python: `class Solution:
    def mySqrt(self, x: int) -> int:
        if x == 0 or x == 1:
            return x
        
        left, right = 1, x
        result = 0
        
        while left <= right:
            mid = (left + right) // 2
            
            if mid <= x // mid:
                result = mid
                left = mid + 1
            else:
                right = mid - 1
        
        return result`,

    cpp: `class Solution {
public:
    int mySqrt(int x) {
        if (x == 0 || x == 1) return x;
        
        long left = 1, right = x;
        long result = 0;
        
        while (left <= right) {
            long mid = left + (right - left) / 2;
            
            if (mid <= x / mid) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
};`,

    java: `class Solution {
    public int mySqrt(int x) {
        if (x == 0 || x == 1) return x;
        
        long left = 1, right = x;
        long result = 0;
        
        while (left <= right) {
            long mid = left + (right - left) / 2;
            
            if (mid <= x / mid) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return (int) result;
    }
}`
  },

  58: {
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n <= 2) return n;
    
    let prev2 = 1;
    let prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
};`,

    python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        
        prev2 = 1
        prev1 = 2
        
        for i in range(3, n + 1):
            current = prev1 + prev2
            prev2 = prev1
            prev1 = current
        
        return prev1`,

    cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        
        int prev2 = 1;
        int prev1 = 2;
        
        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
};`,

    java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        
        int prev2 = 1;
        int prev1 = 2;
        
        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
}`
  },

  59: {
    javascript: `/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    const stack = [];
    const parts = path.split('/');
    
    for (const part of parts) {
        if (part === '' || part === '.') {
            continue;
        } else if (part === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            stack.push(part);
        }
    }
    
    return '/' + stack.join('/');
};`,

    python: `class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        parts = path.split('/')
        
        for part in parts:
            if part == '' or part == '.':
                continue
            elif part == '..':
                if stack:
                    stack.pop()
            else:
                stack.append(part)
        
        return '/' + '/'.join(stack)`,

    cpp: `class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        stringstream ss(path);
        string part;
        
        while (getline(ss, part, '/')) {
            if (part == "" || part == ".") {
                continue;
            } else if (part == "..") {
                if (!stack.empty()) {
                    stack.pop_back();
                }
            } else {
                stack.push_back(part);
            }
        }
        
        string result = "/";
        for (int i = 0; i < stack.size(); i++) {
            result += stack[i];
            if (i < stack.size() - 1) {
                result += "/";
            }
        }
        
        return result;
    }
};`,

    java: `class Solution {
    public String simplifyPath(String path) {
        Stack<String> stack = new Stack<>();
        String[] parts = path.split("/");
        
        for (String part : parts) {
            if (part.equals("") || part.equals(".")) {
                continue;
            } else if (part.equals("..")) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else {
                stack.push(part);
            }
        }
        
        StringBuilder result = new StringBuilder();
        for (String dir : stack) {
            result.append("/").append(dir);
        }
        
        return result.length() > 0 ? result.toString() : "/";
    }
}`
  },

  60: {
    javascript: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    
    // Fill the dp table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // delete
                    dp[i][j - 1],     // insert
                    dp[i - 1][j - 1]  // replace
                );
            }
        }
    }
    
    return dp[m][n];
};`,

    python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        # Initialize base cases
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        
        # Fill the dp table
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(
                        dp[i - 1][j],      # delete
                        dp[i][j - 1],      # insert
                        dp[i - 1][j - 1]   # replace
                    )
        
        return dp[m][n]`,

    cpp: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.length();
        int n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        // Initialize base cases
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
        }
        
        // Fill the dp table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min({
                        dp[i - 1][j],      // delete
                        dp[i][j - 1],      // insert
                        dp[i - 1][j - 1]   // replace
                    });
                }
            }
        }
        
        return dp[m][n];
    }
};`,

    java: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        // Initialize base cases
        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
        }
        
        // Fill the dp table
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        Math.min(dp[i - 1][j], dp[i][j - 1]),     // delete or insert
                        dp[i - 1][j - 1]                           // replace
                    );
                }
            }
        }
        
        return dp[m][n];
    }
}`
  },

  61: {
    javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let firstRowZero = false;
    let firstColZero = false;
    
    // Check if first row has zero
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowZero = true;
            break;
        }
    }
    
    // Check if first column has zero
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColZero = true;
            break;
        }
    }
    
    // Use first row and column as markers
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    // Set zeros based on markers
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // Handle first row
    if (firstRowZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    
    // Handle first column
    if (firstColZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
};`,

    python: `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        m, n = len(matrix), len(matrix[0])
        first_row_zero = False
        first_col_zero = False
        
        # Check if first row has zero
        for j in range(n):
            if matrix[0][j] == 0:
                first_row_zero = True
                break
        
        # Check if first column has zero
        for i in range(m):
            if matrix[i][0] == 0:
                first_col_zero = True
                break
        
        # Use first row and column as markers
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0
        
        # Set zeros based on markers
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0
        
        # Handle first row
        if first_row_zero:
            for j in range(n):
                matrix[0][j] = 0
        
        # Handle first column
        if first_col_zero:
            for i in range(m):
                matrix[i][0] = 0`,

    cpp: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size();
        int n = matrix[0].size();
        bool firstRowZero = false;
        bool firstColZero = false;
        
        // Check if first row has zero
        for (int j = 0; j < n; j++) {
            if (matrix[0][j] == 0) {
                firstRowZero = true;
                break;
            }
        }
        
        // Check if first column has zero
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) {
                firstColZero = true;
                break;
            }
        }
        
        // Use first row and column as markers
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        
        // Set zeros based on markers
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        
        // Handle first row
        if (firstRowZero) {
            for (int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }
        
        // Handle first column
        if (firstColZero) {
            for (int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
};`,

    java: `class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        boolean firstRowZero = false;
        boolean firstColZero = false;
        
        // Check if first row has zero
        for (int j = 0; j < n; j++) {
            if (matrix[0][j] == 0) {
                firstRowZero = true;
                break;
            }
        }
        
        // Check if first column has zero
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) {
                firstColZero = true;
                break;
            }
        }
        
        // Use first row and column as markers
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        
        // Set zeros based on markers
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        
        // Handle first row
        if (firstRowZero) {
            for (int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }
        
        // Handle first column
        if (firstColZero) {
            for (int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
}`
  },

  62: {
    javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    if (matrix.length === 0 || matrix[0].length === 0) return false;
    
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        const midValue = matrix[row][col];
        
        if (midValue === target) {
            return true;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
};`,

    python: `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False
        
        m, n = len(matrix), len(matrix[0])
        left, right = 0, m * n - 1
        
        while left <= right:
            mid = (left + right) // 2
            row = mid // n
            col = mid % n
            mid_value = matrix[row][col]
            
            if mid_value == target:
                return True
            elif mid_value < target:
                left = mid + 1
            else:
                right = mid - 1
        
        return False`,

    cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        
        int m = matrix.size();
        int n = matrix[0].size();
        int left = 0;
        int right = m * n - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int row = mid / n;
            int col = mid % n;
            int midValue = matrix[row][col];
            
            if (midValue == target) {
                return true;
            } else if (midValue < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return false;
    }
};`,

    java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix.length == 0 || matrix[0].length == 0) return false;
        
        int m = matrix.length;
        int n = matrix[0].length;
        int left = 0;
        int right = m * n - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int row = mid / n;
            int col = mid % n;
            int midValue = matrix[row][col];
            
            if (midValue == target) {
                return true;
            } else if (midValue < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return false;
    }
}`
  },  63: {
    javascript: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
};`,

    python: `class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        low, mid, high = 0, 0, len(nums) - 1
        
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1`,

    cpp: `class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low], nums[mid]);
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high]);
                high--;
            }
        }
    }
};`,

    java: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        
        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = temp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
            }
        }
    }
}`
  },

  64: {
    javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (s.length === 0 || t.length === 0) return "";
    
    const tCount = new Map();
    for (const char of t) {
        tCount.set(char, (tCount.get(char) || 0) + 1);
    }
    
    let required = tCount.size;
    let formed = 0;
    const windowCounts = new Map();
    
    let left = 0, right = 0;
    let minLen = Infinity, minLeft = 0;
    
    while (right < s.length) {
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);
        
        if (tCount.has(char) && windowCounts.get(char) === tCount.get(char)) {
            formed++;
        }
        
        while (left <= right && formed === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }
            
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
            if (tCount.has(leftChar) && windowCounts.get(leftChar) < tCount.get(leftChar)) {
                formed--;
            }
            left++;
        }
        
        right++;
    }
    
    return minLen === Infinity ? "" : s.substring(minLeft, minLeft + minLen);
};`,

    python: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not s or not t:
            return ""
        
        t_count = {}
        for char in t:
            t_count[char] = t_count.get(char, 0) + 1
        
        required = len(t_count)
        formed = 0
        window_counts = {}
        
        left, right = 0, 0
        min_len = float('inf')
        min_left = 0
        
        while right < len(s):
            char = s[right]
            window_counts[char] = window_counts.get(char, 0) + 1
            
            if char in t_count and window_counts[char] == t_count[char]:
                formed += 1
            
            while left <= right and formed == required:
                if right - left + 1 < min_len:
                    min_len = right - left + 1
                    min_left = left
                
                left_char = s[left]
                window_counts[left_char] -= 1
                if left_char in t_count and window_counts[left_char] < t_count[left_char]:
                    formed -= 1
                left += 1
            
            right += 1
        
        return "" if min_len == float('inf') else s[min_left:min_left + min_len]`,

    cpp: `class Solution {
public:
    string minWindow(string s, string t) {
        if (s.empty() || t.empty()) return "";
        
        unordered_map<char, int> tCount;
        for (char c : t) {
            tCount[c]++;
        }
        
        int required = tCount.size();
        int formed = 0;
        unordered_map<char, int> windowCounts;
        
        int left = 0, right = 0;
        int minLen = INT_MAX, minLeft = 0;
        
        while (right < s.length()) {
            char c = s[right];
            windowCounts[c]++;
            
            if (tCount.count(c) && windowCounts[c] == tCount[c]) {
                formed++;
            }
            
            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minLeft = left;
                }
                
                char leftChar = s[left];
                windowCounts[leftChar]--;
                if (tCount.count(leftChar) && windowCounts[leftChar] < tCount[leftChar]) {
                    formed--;
                }
                left++;
            }
            
            right++;
        }
        
        return minLen == INT_MAX ? "" : s.substr(minLeft, minLen);
    }
};`,

    java: `class Solution {
    public String minWindow(String s, String t) {
        if (s.length() == 0 || t.length() == 0) return "";
        
        Map<Character, Integer> tCount = new HashMap<>();
        for (char c : t.toCharArray()) {
            tCount.put(c, tCount.getOrDefault(c, 0) + 1);
        }
        
        int required = tCount.size();
        int formed = 0;
        Map<Character, Integer> windowCounts = new HashMap<>();
        
        int left = 0, right = 0;
        int minLen = Integer.MAX_VALUE, minLeft = 0;
        
        while (right < s.length()) {
            char c = s.charAt(right);
            windowCounts.put(c, windowCounts.getOrDefault(c, 0) + 1);
            
            if (tCount.containsKey(c) && windowCounts.get(c).intValue() == tCount.get(c).intValue()) {
                formed++;
            }
            
            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minLeft = left;
                }
                
                char leftChar = s.charAt(left);
                windowCounts.put(leftChar, windowCounts.get(leftChar) - 1);
                if (tCount.containsKey(leftChar) && windowCounts.get(leftChar) < tCount.get(leftChar)) {
                    formed--;
                }
                left++;
            }
            
            right++;
        }
        
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minLeft, minLeft + minLen);
    }
}`
  },

  65: {
    javascript: `/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const result = [];
    
    function backtrack(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }
        
        for (let i = start; i <= n; i++) {
            path.push(i);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    
    backtrack(1, []);
    return result;
};`,

    python: `class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        result = []
        
        def backtrack(start: int, path: List[int]):
            if len(path) == k:
                result.append(path[:])
                return
            
            for i in range(start, n + 1):
                path.append(i)
                backtrack(i + 1, path)
                path.pop()
        
        backtrack(1, [])
        return result`,

    cpp: `class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> result;
        vector<int> path;
        backtrack(n, k, 1, path, result);
        return result;
    }
    
private:
    void backtrack(int n, int k, int start, vector<int>& path, vector<vector<int>>& result) {
        if (path.size() == k) {
            result.push_back(path);
            return;
        }
        
        for (int i = start; i <= n; i++) {
            path.push_back(i);
            backtrack(n, k, i + 1, path, result);
            path.pop_back();
        }
    }
};`,

    java: `class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(n, k, 1, new ArrayList<>(), result);
        return result;
    }
    
    private void backtrack(int n, int k, int start, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == k) {
            result.add(new ArrayList<>(path));
            return;
        }
        
        for (int i = start; i <= n; i++) {
            path.add(i);
            backtrack(n, k, i + 1, path, result);
            path.remove(path.size() - 1);
        }
    }
}`
  },

  66: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const result = [];
    
    function backtrack(start, path) {
        result.push([...path]);
        
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    
    backtrack(0, []);
    return result;
};`,

    python: `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        result = []
        
        def backtrack(start: int, path: List[int]):
            result.append(path[:])
            
            for i in range(start, len(nums)):
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()
        
        backtrack(0, [])
        return result`,

    cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> path;
        backtrack(nums, 0, path, result);
        return result;
    }
    
private:
    void backtrack(vector<int>& nums, int start, vector<int>& path, vector<vector<int>>& result) {
        result.push_back(path);
        
        for (int i = start; i < nums.size(); i++) {
            path.push_back(nums[i]);
            backtrack(nums, i + 1, path, result);
            path.pop_back();
        }
    }
};`,

    java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }
    
    private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(new ArrayList<>(path));
        
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            backtrack(nums, i + 1, path, result);
            path.remove(path.size() - 1);
        }
    }
}`
  },

  67: {
    javascript: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const m = board.length;
    const n = board[0].length;
    
    function backtrack(row, col, index) {
        if (index === word.length) return true;
        
        if (row < 0 || row >= m || col < 0 || col >= n || 
            board[row][col] !== word[index]) {
            return false;
        }
        
        const temp = board[row][col];
        board[row][col] = '#'; // Mark as visited
        
        const found = backtrack(row + 1, col, index + 1) ||
                      backtrack(row - 1, col, index + 1) ||
                      backtrack(row, col + 1, index + 1) ||
                      backtrack(row, col - 1, index + 1);
        
        board[row][col] = temp; // Restore
        return found;
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (backtrack(i, j, 0)) {
                return true;
            }
        }
    }
    
    return false;
};`,

    python: `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        
        def backtrack(row: int, col: int, index: int) -> bool:
            if index == len(word):
                return True
            
            if (row < 0 or row >= m or col < 0 or col >= n or 
                board[row][col] != word[index]):
                return False
            
            temp = board[row][col]
            board[row][col] = '#'  # Mark as visited
            
            found = (backtrack(row + 1, col, index + 1) or
                    backtrack(row - 1, col, index + 1) or
                    backtrack(row, col + 1, index + 1) or
                    backtrack(row, col - 1, index + 1))
            
            board[row][col] = temp  # Restore
            return found
        
        for i in range(m):
            for j in range(n):
                if backtrack(i, j, 0):
                    return True
        
        return False`,

    cpp: `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size();
        int n = board[0].size();
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (backtrack(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
private:
    bool backtrack(vector<vector<char>>& board, string& word, int row, int col, int index) {
        if (index == word.length()) return true;
        
        if (row < 0 || row >= board.size() || col < 0 || col >= board[0].size() ||
            board[row][col] != word[index]) {
            return false;
        }
        
        char temp = board[row][col];
        board[row][col] = '#'; // Mark as visited
        
        bool found = backtrack(board, word, row + 1, col, index + 1) ||
                     backtrack(board, word, row - 1, col, index + 1) ||
                     backtrack(board, word, row, col + 1, index + 1) ||
                     backtrack(board, word, row, col - 1, index + 1);
        
        board[row][col] = temp; // Restore
        return found;
    }
};`,

    java: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length;
        int n = board[0].length;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (backtrack(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private boolean backtrack(char[][] board, String word, int row, int col, int index) {
        if (index == word.length()) return true;
        
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length ||
            board[row][col] != word.charAt(index)) {
            return false;
        }
        
        char temp = board[row][col];
        board[row][col] = '#'; // Mark as visited
        
        boolean found = backtrack(board, word, row + 1, col, index + 1) ||
                        backtrack(board, word, row - 1, col, index + 1) ||
                        backtrack(board, word, row, col + 1, index + 1) ||
                        backtrack(board, word, row, col - 1, index + 1);
        
        board[row][col] = temp; // Restore
        return found;
    }
}`
  },

  68: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length <= 2) return nums.length;
    
    let k = 2; // Position to place next valid element
    
    for (let i = 2; i < nums.length; i++) {
        if (nums[i] !== nums[k - 2]) {
            nums[k] = nums[i];
            k++;
        }
    }
    
    return k;
};`,

    python: `class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if len(nums) <= 2:
            return len(nums)
        
        k = 2  # Position to place next valid element
        
        for i in range(2, len(nums)):
            if nums[i] != nums[k - 2]:
                nums[k] = nums[i]
                k += 1
        
        return k`,

    cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.size() <= 2) return nums.size();
        
        int k = 2; // Position to place next valid element
        
        for (int i = 2; i < nums.size(); i++) {
            if (nums[i] != nums[k - 2]) {
                nums[k] = nums[i];
                k++;
            }
        }
        
        return k;
    }
};`,

    java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length <= 2) return nums.length;
        
        int k = 2; // Position to place next valid element
        
        for (int i = 2; i < nums.length; i++) {
            if (nums[i] != nums[k - 2]) {
                nums[k] = nums[i];
                k++;
            }
        }
        
        return k;
    }
}`
  },

  69: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return true;
        }
        
        // Handle duplicates
        if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
            left++;
            right--;
        } else if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return false;
};`,

    python: `class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        left, right = 0, len(nums) - 1
        
        while left <= right:
            mid = (left + right) // 2
            
            if nums[mid] == target:
                return True
            
            # Handle duplicates
            if nums[left] == nums[mid] == nums[right]:
                left += 1
                right -= 1
            elif nums[left] <= nums[mid]:
                # Left half is sorted
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                # Right half is sorted
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        
        return False`,

    cpp: `class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return true;
            }
            
            // Handle duplicates
            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                left++;
                right--;
            } else if (nums[left] <= nums[mid]) {
                // Left half is sorted
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return false;
    }
};`,

    java: `class Solution {
    public boolean search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return true;
            }
            
            // Handle duplicates
            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                left++;
                right--;
            } else if (nums[left] <= nums[mid]) {
                // Left half is sorted
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return false;
    }
}`
  },

  70: {
    javascript: `/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    while (head) {
        // If current node has duplicates
        if (head.next && head.val === head.next.val) {
            // Skip all nodes with the same value
            while (head.next && head.val === head.next.val) {
                head = head.next;
            }
            prev.next = head.next;
        } else {
            prev = prev.next;
        }
        head = head.next;
    }
    
    return dummy.next;
};`,

    python: `class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        prev = dummy
        
        while head:
            # If current node has duplicates
            if head.next and head.val == head.next.val:
                # Skip all nodes with the same value
                while head.next and head.val == head.next.val:
                    head = head.next
                prev.next = head.next
            else:
                prev = prev.next
            head = head.next
        
        return dummy.next`,

    cpp: `class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* prev = dummy;
        
        while (head) {
            // If current node has duplicates
            if (head->next && head->val == head->next->val) {
                // Skip all nodes with the same value
                while (head->next && head->val == head->next->val) {
                    head = head->next;
                }
                prev->next = head->next;
            } else {
                prev = prev->next;
            }
            head = head->next;
        }
        
        return dummy->next;
    }
};`,

    java: `class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        
        while (head != null) {
            // If current node has duplicates
            if (head.next != null && head.val == head.next.val) {
                // Skip all nodes with the same value
                while (head.next != null && head.val == head.next.val) {
                    head = head.next;
                }
                prev.next = head.next;
            } else {
                prev = prev.next;
            }
            head = head.next;
        }
        
        return dummy.next;
    }
}`
  }

};