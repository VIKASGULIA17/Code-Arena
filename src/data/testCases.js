// Test cases for all 70 problems
// Each problem has visible (sample) and hidden test cases

export const testCases = {
  // Problem 1: Two Sum
  1: {
    visible: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        expected: [0, 1],
        explanation: "nums[0] + nums[1] == 9"
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        expected: [1, 2],
        explanation: "nums[1] + nums[2] == 6"
      },
      {
        input: { nums: [3, 3], target: 6 },
        expected: [0, 1],
        explanation: "nums[0] + nums[1] == 6"
      }
    ],
    hidden: [
      { input: { nums: [1, 5, 3, 7, 9], target: 10 }, expected: [1, 3] },
      { input: { nums: [-1, -2, -3, -4, -5], target: -8 }, expected: [2, 4] },
      { input: { nums: [0, 4, 3, 0], target: 0 }, expected: [0, 3] },
      { input: { nums: [1, 2, 3, 4, 5, 6], target: 11 }, expected: [4, 5] }
    ]
  },

  // Problem 2: Add Two Numbers
  2: {
    visible: [
      {
        input: { l1: [2, 4, 3], l2: [5, 6, 4] },
        expected: [7, 0, 8],
        explanation: "342 + 465 = 807"
      },
      {
        input: { l1: [0], l2: [0] },
        expected: [0],
        explanation: "0 + 0 = 0"
      },
      {
        input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] },
        expected: [8, 9, 9, 9, 0, 0, 0, 1],
        explanation: "9999999 + 9999 = 10009998"
      }
    ],
    hidden: [
      { input: { l1: [1, 2, 3], l2: [4, 5, 6] }, expected: [5, 7, 9] },
      { input: { l1: [5], l2: [5] }, expected: [0, 1] },
      { input: { l1: [1, 8], l2: [0] }, expected: [1, 8] },
      { input: { l1: [9, 9], l2: [1] }, expected: [0, 0, 1] }
    ]
  },

  // Problem 3: Longest Substring Without Repeating Characters
  3: {
    visible: [
      {
        input: { s: "abcabcbb" },
        expected: 3,
        explanation: "The answer is 'abc', with length 3"
      },
      {
        input: { s: "bbbbb" },
        expected: 1,
        explanation: "The answer is 'b', with length 1"
      },
      {
        input: { s: "pwwkew" },
        expected: 3,
        explanation: "The answer is 'wke', with length 3"
      }
    ],
    hidden: [
      { input: { s: "dvdf" }, expected: 3 },
      { input: { s: "" }, expected: 0 },
      { input: { s: "abcdefghijklmnopqrstuvwxyz" }, expected: 26 },
      { input: { s: "tmmzuxt" }, expected: 5 }
    ]
  },

  // Problem 4: Median of Two Sorted Arrays
  4: {
    visible: [
      {
        input: { nums1: [1, 3], nums2: [2] },
        expected: 2.0,
        explanation: "merged array = [1,2,3] and median is 2"
      },
      {
        input: { nums1: [1, 2], nums2: [3, 4] },
        expected: 2.5,
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5"
      }
    ],
    hidden: [
      { input: { nums1: [0, 0], nums2: [0, 0] }, expected: 0.0 },
      { input: { nums1: [], nums2: [1] }, expected: 1.0 },
      { input: { nums1: [2], nums2: [] }, expected: 2.0 },
      { input: { nums1: [1, 3, 5], nums2: [2, 4, 6] }, expected: 3.5 }
    ]
  },

  // Problem 5: Valid Parentheses
  5: {
    visible: [
      {
        input: { s: "()" },
        expected: true,
        explanation: "Valid parentheses"
      },
      {
        input: { s: "()[]{}" },
        expected: true,
        explanation: "All brackets are properly closed"
      },
      {
        input: { s: "(]" },
        expected: false,
        explanation: "Mismatched brackets"
      }
    ],
    hidden: [
      { input: { s: "([)]" }, expected: false },
      { input: { s: "{[]}" }, expected: true },
      { input: { s: "" }, expected: true },
      { input: { s: "(((" }, expected: false },
      { input: { s: ")))" }, expected: false }
    ]
  },

  // Problem 10: Palindrome Number
  10: {
    visible: [
      {
        input: { x: 121 },
        expected: true,
        explanation: "121 reads as 121 from left to right and from right to left"
      },
      {
        input: { x: -121 },
        expected: false,
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-"
      },
      {
        input: { x: 10 },
        expected: false,
        explanation: "Reads 01 from right to left"
      }
    ],
    hidden: [
      { input: { x: 0 }, expected: true },
      { input: { x: 12321 }, expected: true },
      { input: { x: 123 }, expected: false },
      { input: { x: 1 }, expected: true }
    ]
  },

  // Problem 12: Roman to Integer
  12: {
    visible: [
      {
        input: { s: "III" },
        expected: 3,
        explanation: "III = 3"
      },
      {
        input: { s: "LVIII" },
        expected: 58,
        explanation: "L = 50, V = 5, III = 3"
      },
      {
        input: { s: "MCMXCIV" },
        expected: 1994,
        explanation: "M = 1000, CM = 900, XC = 90 and IV = 4"
      }
    ],
    hidden: [
      { input: { s: "IX" }, expected: 9 },
      { input: { s: "IV" }, expected: 4 },
      { input: { s: "MMMCMXCIX" }, expected: 3999 },
      { input: { s: "DCXXI" }, expected: 621 }
    ]
  },

  // Problem 13: Longest Common Prefix
  13: {
    visible: [
      {
        input: { strs: ["flower", "flow", "flight"] },
        expected: "fl",
        explanation: "The longest common prefix is 'fl'"
      },
      {
        input: { strs: ["dog", "racecar", "car"] },
        expected: "",
        explanation: "There is no common prefix"
      }
    ],
    hidden: [
      { input: { strs: ["interspecies", "interstellar", "interstate"] }, expected: "inters" },
      { input: { strs: ["throne", "throne"] }, expected: "throne" },
      { input: { strs: ["a"] }, expected: "a" },
      { input: { strs: ["", "b"] }, expected: "" }
    ]
  },

  // Problem 21: Search in Rotated Sorted Array
  21: {
    visible: [
      {
        input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
        expected: 4,
        explanation: "0 is at index 4"
      },
      {
        input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 },
        expected: -1,
        explanation: "3 is not in array"
      },
      {
        input: { nums: [1], target: 0 },
        expected: -1,
        explanation: "0 is not in array"
      }
    ],
    hidden: [
      { input: { nums: [5, 1, 3], target: 5 }, expected: 0 },
      { input: { nums: [3, 1], target: 1 }, expected: 1 },
      { input: { nums: [1, 3, 5], target: 5 }, expected: 2 },
      { input: { nums: [7, 8, 1, 2, 3, 4, 5, 6], target: 2 }, expected: 3 }
    ]
  },

  // Problem 41: Maximum Subarray
  41: {
    visible: [
      {
        input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
        expected: 6,
        explanation: "[4,-1,2,1] has the largest sum = 6"
      },
      {
        input: { nums: [1] },
        expected: 1,
        explanation: "Single element"
      },
      {
        input: { nums: [5, 4, -1, 7, 8] },
        expected: 23,
        explanation: "All elements sum to 23"
      }
    ],
    hidden: [
      { input: { nums: [-1] }, expected: -1 },
      { input: { nums: [-2, -1] }, expected: -1 },
      { input: { nums: [1, 2, 3, 4, 5] }, expected: 15 },
      { input: { nums: [-1, -2, -3, -4] }, expected: -1 }
    ]
  },

  // Problem 58: Climbing Stairs
  58: {
    visible: [
      {
        input: { n: 2 },
        expected: 2,
        explanation: "1+1 or 2"
      },
      {
        input: { n: 3 },
        expected: 3,
        explanation: "1+1+1, 1+2, or 2+1"
      }
    ],
    hidden: [
      { input: { n: 1 }, expected: 1 },
      { input: { n: 4 }, expected: 5 },
      { input: { n: 5 }, expected: 8 },
      { input: { n: 10 }, expected: 89 }
    ]
  },

  // Problem 7: Best Time to Buy and Sell Stock
  7: {
    visible: [
      {
        input: { prices: [7, 1, 5, 3, 6, 4] },
        expected: 5,
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5"
      },
      {
        input: { prices: [7, 6, 4, 3, 1] },
        expected: 0,
        explanation: "No profit can be made"
      }
    ],
    hidden: [
      { input: { prices: [2, 4, 1] }, expected: 2 },
      { input: { prices: [1, 2] }, expected: 1 },
      { input: { prices: [3, 3, 5, 0, 0, 3, 1, 4] }, expected: 4 },
      { input: { prices: [1] }, expected: 0 }
    ]
  },

  // Problem 20: Reverse Nodes in k-Group
  20: {
    visible: [
      {
        input: { head: [1, 2, 3, 4, 5], k: 2 },
        expected: [2, 1, 4, 3, 5],
        explanation: "Reverse every 2 nodes"
      },
      {
        input: { head: [1, 2, 3, 4, 5], k: 3 },
        expected: [3, 2, 1, 4, 5],
        explanation: "Reverse every 3 nodes"
      }
    ],
    hidden: [
      { input: { head: [1, 2], k: 2 }, expected: [2, 1] },
      { input: { head: [1], k: 1 }, expected: [1] },
      { input: { head: [1, 2, 3], k: 1 }, expected: [1, 2, 3] }
    ]
  },

  // Problem 14: 3Sum
  14: {
    visible: [
      {
        input: { nums: [-1, 0, 1, 2, -1, -4] },
        expected: [[-1, -1, 2], [-1, 0, 1]],
        explanation: "Triplets that sum to 0"
      },
      {
        input: { nums: [0, 1, 1] },
        expected: [],
        explanation: "No valid triplets"
      },
      {
        input: { nums: [0, 0, 0] },
        expected: [[0, 0, 0]],
        explanation: "Single valid triplet"
      }
    ],
    hidden: [
      { input: { nums: [-2, 0, 0, 2, 2] }, expected: [[-2, 0, 2]] },
      { input: { nums: [1, 2, -2, -1] }, expected: [] },
      { input: { nums: [-4, -1, -1, 0, 1, 2] }, expected: [[-1, -1, 2], [-1, 0, 1]] }
    ]
  },

  // Problem 43: Jump Game
  43: {
    visible: [
      {
        input: { nums: [2, 3, 1, 1, 4] },
        expected: true,
        explanation: "Can reach the last index"
      },
      {
        input: { nums: [3, 2, 1, 0, 4] },
        expected: false,
        explanation: "Cannot reach the last index"
      }
    ],
    hidden: [
      { input: { nums: [0] }, expected: true },
      { input: { nums: [2, 0] }, expected: true },
      { input: { nums: [1, 1, 1, 1] }, expected: true },
      { input: { nums: [1, 0, 1, 0] }, expected: false }
    ]
  },
};

// Generate generic test cases for problems without specific test cases
const generateGenericTestCases = (problemId) => {
  return {
    visible: [
      {
        input: { input: "test1" },
        expected: "output1",
        explanation: "Sample test case 1"
      },
      {
        input: { input: "test2" },
        expected: "output2",
        explanation: "Sample test case 2"
      }
    ],
    hidden: [
      { input: { input: "hidden1" }, expected: "hiddenOutput1" },
      { input: { input: "hidden2" }, expected: "hiddenOutput2" },
      { input: { input: "hidden3" }, expected: "hiddenOutput3" }
    ]
  };
};

// Add test cases for remaining problems (6-70)
for (let i = 6; i <= 70; i++) {
  if (!testCases[i]) {
    testCases[i] = generateGenericTestCases(i);
  }
}

// Helper to get test cases
export const getTestCases = (problemId, includeHidden = false) => {
  const cases = testCases[problemId] || generateGenericTestCases(problemId);
  if (includeHidden) {
    return [...cases.visible, ...cases.hidden];
  }
  return cases.visible;
};

export const getAllTestCases = (problemId) => {
  const cases = testCases[problemId] || generateGenericTestCases(problemId);
  return {
    visible: cases.visible,
    hidden: cases.hidden,
    all: [...cases.visible, ...cases.hidden]
  };
};
