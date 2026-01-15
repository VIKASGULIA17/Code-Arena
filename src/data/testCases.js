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

  // Problem 6: Merge k Sorted Lists
  6: {
    visible: [
      {
        input: { lists: [[1,4,5],[1,3,4],[2,6]] },
        expected: [1,1,2,3,4,4,5,6],
        explanation: "Merge all sorted linked lists"
      },
      {
        input: { lists: [] },
        expected: [],
        explanation: "Empty array of lists"
      },
      {
        input: { lists: [[]] },
        expected: [],
        explanation: "Array with one empty list"
      }
    ],
    hidden: [
      { input: { lists: [[1,2,3],[4,5,6]] }, expected: [1,2,3,4,5,6] },
      { input: { lists: [[1],[2],[3]] }, expected: [1,2,3] },
      { input: { lists: [[1,3,5],[2,4,6],[7,8,9]] }, expected: [1,2,3,4,5,6,7,8,9] }
    ]
  },

  // Problem 7: Best Time to Buy and Sell Stock
  7: {
    visible: [
      {
        input: { prices: [7,1,5,3,6,4] },
        expected: 5,
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 5"
      },
      {
        input: { prices: [7,6,4,3,1] },
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

  // Problem 8: Binary Tree Level Order Traversal
  8: {
    visible: [
      {
        input: { root: [3,9,20,null,null,15,7] },
        expected: [[3],[9,20],[15,7]],
        explanation: "Level order traversal"
      },
      {
        input: { root: [1] },
        expected: [[1]],
        explanation: "Single node tree"
      },
      {
        input: { root: [] },
        expected: [],
        explanation: "Empty tree"
      }
    ],
    hidden: [
      { input: { root: [1,2,3,4,5,null,6] }, expected: [[1],[2,3],[4,5,6]] },
      { input: { root: [1,2,null,3] }, expected: [[1],[2],[3]] }
    ]
  },

  // Problem 9: Next Permutation
  9: {
    visible: [
      {
        input: { nums: [1,2,3] },
        expected: [1,3,2],
        explanation: "Next lexicographic permutation"
      },
      {
        input: { nums: [3,2,1] },
        expected: [1,2,3],
        explanation: "Sorted in ascending order"
      },
      {
        input: { nums: [1,1,5] },
        expected: [1,5,1],
        explanation: "Next permutation exists"
      }
    ],
    hidden: [
      { input: { nums: [1,3,2] }, expected: [2,1,3] },
      { input: { nums: [2,3,1] }, expected: [3,1,2] },
      { input: { nums: [5,1,1] }, expected: [1,1,5] }
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

  // Problem 11: Container With Most Water
  11: {
    visible: [
      {
        input: { height: [1,8,6,2,5,4,8,3,7] },
        expected: 49,
        explanation: "Max area between lines at index 1 and 8"
      },
      {
        input: { height: [1,1] },
        expected: 1,
        explanation: "Simple case with two lines"
      }
    ],
    hidden: [
      { input: { height: [4,3,2,1,4] }, expected: 16 },
      { input: { height: [1,2,1] }, expected: 2 },
      { input: { height: [1,8,6,2,5,4,8,3,7,1] }, expected: 49 }
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

  // Problem 15: Letter Combinations of a Phone Number
  15: {
    visible: [
      {
        input: { digits: "23" },
        expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"],
        explanation: "All possible letter combinations"
      },
      {
        input: { digits: "" },
        expected: [],
        explanation: "Empty input"
      },
      {
        input: { digits: "2" },
        expected: ["a","b","c"],
        explanation: "Single digit"
      }
    ],
    hidden: [
      { input: { digits: "234" }, expected: ["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"] },
      { input: { digits: "7" }, expected: ["pqrs"] },
      { input: { digits: "9" }, expected: ["wxyz"] }
    ]
  },

  // Problem 16: Remove Nth Node From End of List
  16: {
    visible: [
      {
        input: { head: [1,2,3,4,5], n: 2 },
        expected: [1,2,3,5],
        explanation: "Remove 2nd node from end"
      },
      {
        input: { head: [1], n: 1 },
        expected: [],
        explanation: "Remove only node"
      },
      {
        input: { head: [1,2], n: 1 },
        expected: [1],
        explanation: "Remove last node"
      }
    ],
    hidden: [
      { input: { head: [1,2,3,4,5,6], n: 3 }, expected: [1,2,4,5,6] },
      { input: { head: [1,2,3], n: 3 }, expected: [2,3] },
      { input: { head: [1,2,3,4], n: 4 }, expected: [2,3,4] }
    ]
  },

  // Problem 17: Generate Parentheses
  17: {
    visible: [
      {
        input: { n: 3 },
        expected: ["((()))","(()())","(())()","()(())","()()()"],
        explanation: "All valid combinations of 3 pairs"
      },
      {
        input: { n: 1 },
        expected: ["()"],
        explanation: "Single pair"
      }
    ],
    hidden: [
      { input: { n: 2 }, expected: ["()()","(())"] },
      { input: { n: 4 }, expected: ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"] }
    ]
  },

  // Problem 18: Merge Two Sorted Lists
  18: {
    visible: [
      {
        input: { l1: [1,2,4], l2: [1,3,4] },
        expected: [1,1,2,3,4,4],
        explanation: "Merge two sorted lists"
      },
      {
        input: { l1: [], l2: [] },
        expected: [],
        explanation: "Both lists empty"
      },
      {
        input: { l1: [], l2: [0] },
        expected: [0],
        explanation: "One list empty"
      }
    ],
    hidden: [
      { input: { l1: [1,3,5], l2: [2,4,6] }, expected: [1,2,3,4,5,6] },
      { input: { l1: [1,2,3], l2: [] }, expected: [1,2,3] },
      { input: { l1: [1,1,1], l2: [1,1] }, expected: [1,1,1,1,1] }
    ]
  },

  // Problem 19: Swap Nodes in Pairs
  19: {
    visible: [
      {
        input: { head: [1,2,3,4] },
        expected: [2,1,4,3],
        explanation: "Swap every two adjacent nodes"
      },
      {
        input: { head: [] },
        expected: [],
        explanation: "Empty list"
      },
      {
        input: { head: [1] },
        expected: [1],
        explanation: "Single node"
      }
    ],
    hidden: [
      { input: { head: [1,2,3,4,5,6] }, expected: [2,1,4,3,6,5] },
      { input: { head: [1,2] }, expected: [2,1] },
      { input: { head: [1,2,3] }, expected: [2,1,3] }
    ]
  },

  // Problem 20: Reverse Nodes in k-Group
  20: {
    visible: [
      {
        input: { head: [1,2,3,4,5], k: 2 },
        expected: [2,1,4,3,5],
        explanation: "Reverse every 2 nodes"
      },
      {
        input: { head: [1,2,3,4,5], k: 3 },
        expected: [3,2,1,4,5],
        explanation: "Reverse every 3 nodes"
      }
    ],
    hidden: [
      { input: { head: [1,2], k: 2 }, expected: [2,1] },
      { input: { head: [1], k: 1 }, expected: [1] },
      { input: { head: [1,2,3], k: 1 }, expected: [1,2,3] }
    ]
  },

  // Problem 21: Search in Rotated Sorted Array
  21: {
    visible: [
      {
        input: { nums: [4,5,6,7,0,1,2], target: 0 },
        expected: 4,
        explanation: "0 is at index 4"
      },
      {
        input: { nums: [4,5,6,7,0,1,2], target: 3 },
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
      { input: { nums: [5,1,3], target: 5 }, expected: 0 },
      { input: { nums: [3,1], target: 1 }, expected: 1 },
      { input: { nums: [1,3,5], target: 5 }, expected: 2 },
      { input: { nums: [7,8,1,2,3,4,5,6], target: 2 }, expected: 3 }
    ]
  },

  // Problem 22: First and Last Position of Element
  22: {
    visible: [
      {
        input: { nums: [5,7,7,8,8,10], target: 8 },
        expected: [3,4],
        explanation: "Target 8 starts at index 3 and ends at index 4"
      },
      {
        input: { nums: [5,7,7,8,8,10], target: 6 },
        expected: [-1,-1],
        explanation: "Target 6 not found"
      }
    ],
    hidden: [
      { input: { nums: [1,2,3,4,5,5,5,6,7,8,9], target: 5 }, expected: [4,6] },
      { input: { nums: [1,1,1,1,1], target: 1 }, expected: [0,4] },
      { input: { nums: [1,2,3,4,5], target: 6 }, expected: [-1,-1] }
    ]
  },

  // Problem 23: Search Insert Position
  23: {
    visible: [
      {
        input: { nums: [1,3,5,6], target: 5 },
        expected: 2,
        explanation: "5 is found at index 2"
      },
      {
        input: { nums: [1,3,5,6], target: 2 },
        expected: 1,
        explanation: "2 would be inserted at index 1"
      },
      {
        input: { nums: [1,3,5,6], target: 7 },
        expected: 4,
        explanation: "7 would be inserted at index 4"
      }
    ],
    hidden: [
      { input: { nums: [1,3,5,6], target: 0 }, expected: 0 },
      { input: { nums: [1], target: 1 }, expected: 0 },
      { input: { nums: [1,3], target: 2 }, expected: 1 }
    ]
  },

  // Problem 24: Valid Sudoku
  24: {
    visible: [
      {
        input: { board: [
          ["5","3",".",".","7",".",".",".","."],
          ["6",".",".","1","9","5",".",".","."],
          [".","9","8",".",".",".",".","6","."],
          ["8",".",".",".","6",".",".",".","3"],
          ["4",".",".","8",".","3",".",".","1"],
          ["7",".",".",".","2",".",".",".","6"],
          [".","6",".",".",".",".","2","8","."],
          [".",".",".","4","1","9",".",".","5"],
          [".",".",".",".","8",".",".","7","9"]
        ] },
        expected: true,
        explanation: "Valid Sudoku"
      }
    ],
    hidden: [
      {
        input: { board: [
          ["8","3",".",".","7",".",".",".","."],
          ["6",".",".","1","9","5",".",".","."],
          [".","9","8",".",".",".",".","6","."],
          ["8",".",".",".","6",".",".",".","3"],
          ["4",".",".","8",".","3",".",".","1"],
          ["7",".",".",".","2",".",".",".","6"],
          [".","6",".",".",".",".","2","8","."],
          [".",".",".","4","1","9",".",".","5"],
          [".",".",".",".","8",".",".","7","9"]
        ] },
        expected: false,
        explanation: "Duplicate 8 in first row"
      }
    ]
  },

  // Problem 25: Sudoku Solver
  25: {
    visible: [
      {
        input: { board: [
          ["5","3",".",".","7",".",".",".","."],
          ["6",".",".","1","9","5",".",".","."],
          [".","9","8",".",".",".",".","6","."],
          ["8",".",".",".","6",".",".",".","3"],
          ["4",".",".","8",".","3",".",".","1"],
          ["7",".",".",".","2",".",".",".","6"],
          [".","6",".",".",".",".","2","8","."],
          [".",".",".","4","1","9",".",".","5"],
          [".",".",".",".","8",".",".","7","9"]
        ] },
        expected: [
          ["5","3","4","6","7","8","9","1","2"],
          ["6","7","2","1","9","5","3","4","8"],
          ["1","9","8","3","4","2","5","6","7"],
          ["8","5","9","7","6","1","4","2","3"],
          ["4","2","6","8","5","3","7","9","1"],
          ["7","1","3","9","2","4","8","5","6"],
          ["9","6","1","5","3","7","2","8","4"],
          ["2","8","7","4","1","9","6","3","5"],
          ["3","4","5","2","8","6","1","7","9"]
        ],
        explanation: "Solved Sudoku board"
      }
    ],
    hidden: [
      {
        input: { board: [
          [".",".",".","2",".",".",".",".","6"],
          [".",".",".",".",".",".","2","8","."],
          [".",".",".",".",".",".",".",".","."],
          [".",".",".",".",".",".",".",".","."],
          [".",".",".",".",".",".",".",".","."],
          ["3",".",".",".",".",".",".",".","."],
          [".",".",".","4","5","6",".",".","."],
          [".",".",".",".",".",".",".",".","."],
          [".",".",".",".",".","7",".",".","."]
        ] },
        expected: [
          ["1","4","3","2","7","5","8","9","6"],
          ["5","7","9","6","8","3","2","8","4"],
          ["2","8","6","9","1","4","3","7","5"],
          ["4","3","2","1","6","8","5","6","7"],
          ["6","1","8","3","9","2","7","4","1"],
          ["3","9","7","5","4","6","1","2","8"],
          ["9","2","1","4","5","6","7","3","2"],
          ["7","6","5","8","3","9","4","1","3"],
          ["8","4","3","7","2","1","6","5","9"]
        ],
        explanation: "Another solved Sudoku"
      }
    ]
  },

  // Problem 26: Count and Say
  26: {
    visible: [
      {
        input: { n: 1 },
        expected: "1",
        explanation: "First term is '1'"
      },
      {
        input: { n: 4 },
        expected: "1211",
        explanation: "countAndSay(1) = '1', countAndSay(2) = '11', countAndSay(3) = '21', countAndSay(4) = '1211'"
      }
    ],
    hidden: [
      { input: { n: 2 }, expected: "11" },
      { input: { n: 3 }, expected: "21" },
      { input: { n: 5 }, expected: "111221" },
      { input: { n: 6 }, expected: "312211" }
    ]
  },

  // Problem 27: Combination Sum
  27: {
    visible: [
      {
        input: { candidates: [2,3,6,7], target: 7 },
        expected: [[2,2,3],[7]],
        explanation: "2+2+3 = 7 and 7 = 7"
      },
      {
        input: { candidates: [2,3,5], target: 8 },
        expected: [[2,2,2,2],[2,3,3],[3,5]],
        explanation: "All unique combinations"
      }
    ],
    hidden: [
      { input: { candidates: [2], target: 1 }, expected: [] },
      { input: { candidates: [1], target: 1 }, expected: [[1]] },
      { input: { candidates: [1], target: 2 }, expected: [[1,1]] }
    ]
  },

  // Problem 28: Combination Sum II
  28: {
    visible: [
      {
        input: { candidates: [10,1,2,7,6,1,5], target: 8 },
        expected: [[1,1,6],[1,2,5],[1,7],[2,6]],
        explanation: "All unique combinations using each candidate at most once"
      }
    ],
    hidden: [
      { input: { candidates: [1,1,1,1,1,1,1,1,1,1], target: 5 }, expected: [[1,1,1,1,1]] },
      { input: { candidates: [2,5,2,1,2], target: 5 }, expected: [[1,2,2],[5]] },
      { input: { candidates: [5,3,2], target: 8 }, expected: [[3,5]] }
    ]
  },

  // Problem 29: First Missing Positive
  29: {
    visible: [
      {
        input: { nums: [1,2,0] },
        expected: 3,
        explanation: "1 and 2 are present, next positive is 3"
      },
      {
        input: { nums: [3,4,-1,1] },
        expected: 2,
        explanation: "1 is present, but 2 is missing"
      }
    ],
    hidden: [
      { input: { nums: [7,8,9,11,12] }, expected: 1 },
      { input: { nums: [1] }, expected: 2 },
      { input: { nums: [2,1] }, expected: 3 },
      { input: { nums: [-1] }, expected: 1 }
    ]
  },

  // Problem 30: Trapping Rain Water
  30: {
    visible: [
      {
        input: { height: [0,1,0,2,1,0,1,3,2,1,2,1] },
        expected: 6,
        explanation: "Total units of trapped water is 6"
      },
      {
        input: { height: [4,2,0,3,2,5] },
        expected: 9,
        explanation: "9 units of water trapped"
      }
    ],
    hidden: [
      { input: { height: [0,1,0,2,1,0,1,3,2,1,2,1,1,2,1] }, expected: 11 },
      { input: { height: [2,0,2] }, expected: 2 },
      { input: { height: [0,0,0] }, expected: 0 }
    ]
  },

  // Problem 31: Multiply Strings
  31: {
    visible: [
      {
        input: { num1: "2", num2: "3" },
        expected: "6",
        explanation: "Simple multiplication"
      },
      {
        input: { num1: "123", num2: "456" },
        expected: "56088",
        explanation: "123 × 456 = 56088"
      }
    ],
    hidden: [
      { input: { num1: "0", num2: "0" }, expected: "0" },
      { input: { num1: "999", num2: "999" }, expected: "998001" },
      { input: { num1: "123456789", num2: "987654321" }, expected: "121932631112635269" }
    ]
  },

  // Problem 32: Wildcard Matching
  32: {
    visible: [
      {
        input: { s: "aa", p: "a" },
        expected: false,
        explanation: "Pattern 'a' doesn't match 'aa'"
      },
      {
        input: { s: "aa", p: "*" },
        expected: true,
        explanation: "'*' matches any sequence"
      },
      {
        input: { s: "cb", p: "?a" },
        expected: false,
        explanation: "'?a' doesn't match 'cb'"
      }
    ],
    hidden: [
      { input: { s: "adceb", p: "*a*b" }, expected: true },
      { input: { s: "", p: "*" }, expected: true },
      { input: { s: "", p: "?" }, expected: false },
      { input: { s: "abc", p: "*" }, expected: true }
    ]
  },

  // Problem 33: Jump Game II
  33: {
    visible: [
      {
        input: { nums: [2,3,1,1,4] },
        expected: 2,
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index"
      },
      {
        input: { nums: [2,3,0,1,4] },
        expected: 2,
        explanation: "Same as above"
      }
    ],
    hidden: [
      { input: { nums: [1,2,1,1,1] }, expected: 3 },
      { input: { nums: [1,2] }, expected: 1 },
      { input: { nums: [1,2,3] }, expected: 2 },
      { input: { nums: [1] }, expected: 0 }
    ]
  },

  // Problem 34: Permutations
  34: {
    visible: [
      {
        input: { nums: [1,2,3] },
        expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],
        explanation: "All possible permutations"
      }
    ],
    hidden: [
      { input: { nums: [0,1] }, expected: [[0,1],[1,0]] },
      { input: { nums: [1] }, expected: [[1]] },
      { input: { nums: [1,2,3,4] }, expected: [[1,2,3,4],[1,2,4,3],[1,3,2,4],[1,3,4,2],[1,4,2,3],[1,4,3,2],[2,1,3,4],[2,1,4,3],[2,3,1,4],[2,3,4,1],[2,4,1,3],[2,4,3,1],[3,1,2,4],[3,1,4,2],[3,2,1,4],[3,2,4,1],[3,4,1,2],[3,4,2,1],[4,1,2,3],[4,1,3,2],[4,2,1,3],[4,2,3,1],[4,3,1,2],[4,3,2,1]] }
    ]
  },

  // Problem 35: Permutations II
  35: {
    visible: [
      {
        input: { nums: [1,1,2] },
        expected: [[1,1,2],[1,2,1],[2,1,1]],
        explanation: "Unique permutations of [1,1,2]"
      }
    ],
    hidden: [
      { input: { nums: [1,2,3,2] }, expected: [[1,2,2,3],[1,2,3,2],[1,3,2,2],[2,1,2,3],[2,1,3,2],[2,2,1,3],[2,2,3,1],[2,3,1,2],[2,3,2,1],[3,1,2,2],[3,2,1,2],[3,2,2,1]] },
      { input: { nums: [1,1] }, expected: [[1,1]] },
      { input: { nums: [1] }, expected: [[1]] }
    ]
  },

  // Problem 36: Rotate Image
  36: {
    visible: [
      {
        input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
        expected: [[7,4,1],[8,5,2],[9,6,3]],
        explanation: "Matrix rotated 90 degrees clockwise"
      },
      {
        input: { matrix: [[1,2],[3,4]] },
        expected: [[3,1],[4,2]],
        explanation: "2x2 matrix rotated"
      }
    ],
    hidden: [
      { input: { matrix: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]] }, expected: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]] }
    ]
  },

  // Problem 37: Group Anagrams
  37: {
    visible: [
      {
        input: { strs: ["eat","tea","tan","ate","nat","bat"] },
        expected: [["bat"],["nat","tan"],["ate","eat","tea"]],
        explanation: "Grouped anagrams"
      },
      {
        input: { strs: [""] },
        expected: [[""]],
        explanation: "Empty string"
      }
    ],
    hidden: [
      { input: { strs: ["a"] }, expected: [["a"]] },
      { input: { strs: ["abc","bca","cab","xyz"] }, expected: [["abc","bca","cab"],["xyz"]] },
      { input: { strs: [""] }, expected: [[""]] }
    ]
  },

  // Problem 38: Pow(x, n)
  38: {
    visible: [
      {
        input: { x: 2.00000, n: 10 },
        expected: 1024.00000,
        explanation: "2^10 = 1024"
      },
      {
        input: { x: 2.10000, n: 3 },
        expected: 9.26100,
        explanation: "2.1^3 = 9.261"
      }
    ],
    hidden: [
      { input: { x: 2.0, n: -2 }, expected: 0.25 },
      { input: { x: 2.0, n: 0 }, expected: 1.0 },
      { input: { x: 0.00001, n: 2147483647 }, expected: 0.0 },
      { input: { x: -1.0, n: 2147483647 }, expected: -1.0 }
    ]
  },

  // Problem 39: N-Queens
  39: {
    visible: [
      {
        input: { n: 4 },
        expected: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]],
        explanation: "Two distinct solutions for 4-queens"
      }
    ],
    hidden: [
      { input: { n: 1 }, expected: [["Q"]] },
      { input: { n: 2 }, expected: [] },
      { input: { n: 3 }, expected: [] },
      { input: { n: 5 }, expected: [[".Q...","...Q.","Q....",".Q..Q","..Q.."],["..Q..","Q....","...Q.",".Q...","....Q"]] }
    ]
  },

  // Problem 40: N-Queens II
  40: {
    visible: [
      {
        input: { n: 4 },
        expected: 2,
        explanation: "Two distinct solutions for 4-queens"
      }
    ],
    hidden: [
      { input: { n: 1 }, expected: 1 },
      { input: { n: 2 }, expected: 0 },
      { input: { n: 3 }, expected: 0 },
      { input: { n: 5 }, expected: 10 },
      { input: { n: 8 }, expected: 92 }
    ]
  },

  // Problem 41: Maximum Subarray
  41: {
    visible: [
      {
        input: { nums: [-2,1,-3,4,-1,2,1,-5,4] },
        expected: 6,
        explanation: "[4,-1,2,1] has the largest sum = 6"
      },
      {
        input: { nums: [1] },
        expected: 1,
        explanation: "Single element"
      },
      {
        input: { nums: [5,4,-1,7,8] },
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

  // Problem 42: Spiral Matrix
  42: {
    visible: [
      {
        input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
        expected: [1,2,3,6,9,8,7,4,5],
        explanation: "Spiral order traversal"
      },
      {
        input: { matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
        expected: [1,2,3,4,8,12,11,10,9,5,6,7],
        explanation: "Spiral order for 2x4 matrix"
      }
    ],
    hidden: [
      { input: { matrix: [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]] }, expected: [1,2,3,4,5,10,15,20,25,24,23,22,21,16,11,6,7,8,9,14,19,18,17,12,13] },
      { input: { matrix: [[1]] }, expected: [1] },
      { input: { matrix: [[1,2],[3,4]] }, expected: [1,2,4,3] }
    ]
  },

  // Problem 43: Jump Game
  43: {
    visible: [
      {
        input: { nums: [2,3,1,1,4] },
        expected: true,
        explanation: "Can reach the last index"
      },
      {
        input: { nums: [3,2,1,0,4] },
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

  // Problem 44: Merge Intervals
  44: {
    visible: [
      {
        input: { intervals: [[1,3],[2,6],[8,10],[15,18]] },
        expected: [[1,6],[8,10],[15,18]],
        explanation: "Merge overlapping intervals"
      },
      {
        input: { intervals: [[1,4],[4,5]] },
        expected: [[1,5]],
        explanation: "Adjacent intervals merged"
      }
    ],
    hidden: [
      { input: { intervals: [[1,4],[0,4]] }, expected: [[0,4]] },
      { input: { intervals: [[1,4],[2,3]] }, expected: [[1,4]] },
      { input: { intervals: [] }, expected: [] },
      { input: { intervals: [[1,4]] }, expected: [[1,4]] }
    ]
  },

  // Problem 45: Insert Interval
  45: {
    visible: [
      {
        input: { intervals: [[1,3],[6,9]], newInterval: [2,5] },
        expected: [[1,5],[6,9]],
        explanation: "New interval overlaps with existing"
      },
      {
        input: { intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval: [4,8] },
        expected: [[1,2],[3,10],[12,16]],
        explanation: "New interval merges multiple intervals"
      }
    ],
    hidden: [
      { input: { intervals: [[1,5]], newInterval: [6,8] }, expected: [[1,5],[6,8]] },
      { input: { intervals: [[6,8],[10,12]], newInterval: [4,5] }, expected: [[4,5],[6,8],[10,12]] },
      { input: { intervals: [], newInterval: [5,7] }, expected: [[5,7]] },
      { input: { intervals: [[1,5]], newInterval: [0,0] }, expected: [[0,0],[1,5]] }
    ]
  },

  // Problem 46: Length of Last Word
  46: {
    visible: [
      {
        input: { s: "Hello World" },
        expected: 5,
        explanation: "Last word is 'World'"
      },
      {
        input: { s: "   fly me   to   the moon  " },
        expected: 4,
        explanation: "Last word is 'moon'"
      }
    ],
    hidden: [
      { input: { s: "Hello" }, expected: 5 },
      { input: { s: "a " }, expected: 1 },
      { input: { s: "" }, expected: 0 },
      { input: { s: "   " }, expected: 0 }
    ]
  },

  // Problem 47: Spiral Matrix II
  47: {
    visible: [
      {
        input: { n: 3 },
        expected: [[1,2,3],[8,9,4],[7,6,5]],
        explanation: "3x3 spiral matrix"
      },
      {
        input: { n: 1 },
        expected: [[1]],
        explanation: "1x1 matrix"
      }
    ],
    hidden: [
      { input: { n: 2 }, expected: [[1,2],[4,3]] },
      { input: { n: 4 }, expected: [[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]] }
    ]
  },

  // Problem 48: Permutation Sequence
  48: {
    visible: [
      {
        input: { n: 3, k: 3 },
        expected: "213",
        explanation: "3rd permutation of [1,2,3]"
      }
    ],
    hidden: [
      { input: { n: 3, k: 1 }, expected: "123" },
      { input: { n: 3, k: 6 }, expected: "321" },
      { input: { n: 4, k: 9 }, expected: "2314" },
      { input: { n: 1, k: 1 }, expected: "1" }
    ]
  },

  // Problem 49: Rotate List
  49: {
    visible: [
      {
        input: { head: [1,2,3,4,5], k: 2 },
        expected: [4,5,1,2,3],
        explanation: "Rotate list by 2 positions to the right"
      }
    ],
    hidden: [
      { input: { head: [0,1,2], k: 4 }, expected: [2,0,1] },
      { input: { head: [1,2], k: 1 }, expected: [2,1] },
      { input: { head: [1], k: 0 }, expected: [1] },
      { input: { head: [], k: 1 }, expected: [] }
    ]
  },

  // Problem 50: Unique Paths
  50: {
    visible: [
      {
        input: { m: 3, n: 7 },
        expected: 28,
        explanation: "3x7 grid"
      },
      {
        input: { m: 3, n: 2 },
        expected: 3,
        explanation: "3x2 grid"
      }
    ],
    hidden: [
      { input: { m: 1, n: 1 }, expected: 1 },
      { input: { m: 2, n: 2 }, expected: 2 },
      { input: { m: 5, n: 5 }, expected: 70 },
      { input: { m: 10, n: 10 }, expected: 48620 }
    ]
  },

  // Problem 51: Unique Paths II
  51: {
    visible: [
      {
        input: { obstacleGrid: [[0,0,0],[0,1,0],[0,0,0]] },
        expected: 2,
        explanation: "2 unique paths around obstacle"
      },
      {
        input: { obstacleGrid: [[0,1],[0,0]] },
        expected: 1,
        explanation: "1 unique path"
      }
    ],
    hidden: [
      { input: { obstacleGrid: [[0,0],[1,1],[0,0]] }, expected: 0 },
      { input: { obstacleGrid: [[0]] }, expected: 1 },
      { input: { obstacleGrid: [[1]] }, expected: 0 },
      { input: { obstacleGrid: [[0,0,0],[0,0,0],[0,0,0]] }, expected: 6 }
    ]
  },

  // Problem 52: Minimum Path Sum
  52: {
    visible: [
      {
        input: { grid: [[1,3,1],[1,5,1],[4,2,1]] },
        expected: 7,
        explanation: "Path 1→3→1→1→1 = 7"
      },
      {
        input: { grid: [[1,2,3],[4,5,6]] },
        expected: 12,
        explanation: "Path 1→2→3→6 = 12"
      }
    ],
    hidden: [
      { input: { grid: [[1]] }, expected: 1 },
      { input: { grid: [[1,2],[1,1]] }, expected: 3 },
      { input: { grid: [[1,2,5],[3,2,1]] }, expected: 4 }
    ]
  },

  // Problem 53: Valid Number
  53: {
    visible: [
      {
        input: { s: "0" },
        expected: true,
        explanation: "Simple integer"
      },
      {
        input: { s: "e" },
        expected: false,
        explanation: "Incomplete number"
      },
      {
        input: { s: " -90e3   " },
        expected: true,
        explanation: "Valid scientific notation"
      }
    ],
    hidden: [
      { input: { s: "3." }, expected: true },
      { input: { s: ".3" }, expected: true },
      { input: { s: ".1e-30" }, expected: true },
      { input: { s: "6e6.5" }, expected: false },
      { input: { s: "+.8" }, expected: true }
    ]
  },

  // Problem 54: Plus One
  54: {
    visible: [
      {
        input: { digits: [1,2,3] },
        expected: [1,2,4],
        explanation: "123 + 1 = 124"
      },
      {
        input: { digits: [4,3,2,1] },
        expected: [4,3,2,2],
        explanation: "4321 + 1 = 4322"
      },
      {
        input: { digits: [9] },
        expected: [1,0],
        explanation: "9 + 1 = 10"
      }
    ],
    hidden: [
      { input: { digits: [9,9,9] }, expected: [1,0,0,0] },
      { input: { digits: [0] }, expected: [1] },
      { input: { digits: [1,0,9,9] }, expected: [1,1,0,0] },
      { input: { digits: [8,9,9,9] }, expected: [9,0,0,0] }
    ]
  },

  // Problem 55: Add Binary
  55: {
    visible: [
      {
        input: { a: "11", b: "1" },
        expected: "100",
        explanation: "3 + 1 = 4"
      },
      {
        input: { a: "1010", b: "1011" },
        expected: "10101",
        explanation: "10 + 11 = 10101"
      }
    ],
    hidden: [
      { input: { a: "0", b: "0" }, expected: "0" },
      { input: { a: "111", b: "1" }, expected: "1000" },
      { input: { a: "101010", b: "1010" }, expected: "110100" },
      { input: { a: "11111111", b: "1" }, expected: "100000000" }
    ]
  },

  // Problem 56: Text Justification
  56: {
    visible: [
      {
        input: { words: ["This", "is", "an", "example", "of", "text", "justification."], maxWidth: 16 },
        expected: ["This    is    an", "example  of text", "justification.  "],
        explanation: "Proper text justification"
      }
    ],
    hidden: [
      { input: { words: ["What","must","be","acknowledgment","shall","be"], maxWidth: 16 }, expected: ["What  must  be", "acknowledgment  ", "shall be        "] },
      { input: { words: ["Science","is","what","we","understand","well","enough","to","explain"], maxWidth: 20 }, expected: ["Science is what we", "understand      well", "enough to explain  ", "to a machine.    "] }
    ]
  },

  // Problem 57: Sqrt(x)
  57: {
    visible: [
      {
        input: { x: 4 },
        expected: 2,
        explanation: "Square root of 4 is 2"
      },
      {
        input: { x: 8 },
        expected: 2,
        explanation: "Square root of 8 is approximately 2.828, floor is 2"
      }
    ],
    hidden: [
      { input: { x: 0 }, expected: 0 },
      { input: { x: 1 }, expected: 1 },
      { input: { x: 2 }, expected: 1 },
      { input: { x: 2147395600 }, expected: 46340 },
      { input: { x: 2147483647 }, expected: 46340 }
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

  // Problem 59: Simplify Path
  59: {
    visible: [
      {
        input: { path: "/home/" },
        expected: "/home",
        explanation: "Simplified path"
      },
      {
        input: { path: "/../" },
        expected: "/",
        explanation: "Go up to root"
      },
      {
        input: { path: "/home//foo/" },
        expected: "/home/foo",
        explanation: "Remove double slashes"
      }
    ],
    hidden: [
      { input: { path: "/home/user/Documents/../Pictures" }, expected: "/home/user/Pictures" },
      { input: { path: "/a/./b/../../c/" }, expected: "/c" },
      { input: { path: "/a/..//b/" }, expected: "/b" },
      { input: { path: "/" }, expected: "/" }
    ]
  },

  // Problem 60: Edit Distance
  60: {
    visible: [
      {
        input: { word1: "horse", word2: "ros" },
        expected: 3,
        explanation: "horse -> rorse (replace 'h' with 'r'), rorse -> rose (remove 'r'), rose -> ros (remove 'e')"
      }
    ],
    hidden: [
      { input: { word1: "", word2: "" }, expected: 0 },
      { input: { word1: "", word2: "a" }, expected: 1 },
      { input: { word1: "a", word2: "" }, expected: 1 },
      { input: { word1: "intention", word2: "execution" }, expected: 5 }
    ]
  },

  // Problem 61: Set Matrix Zeroes
  61: {
    visible: [
      {
        input: { matrix: [[1,1,1],[1,0,1],[1,1,1]] },
        expected: [[1,0,1],[0,0,0],[1,0,1]],
        explanation: "Set entire row and column to zero when element is zero"
      }
    ],
    hidden: [
      { input: { matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]] }, expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]] },
      { input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] }, expected: [[1,2,3],[4,5,6],[7,8,9]] },
      { input: { matrix: [[0]] }, expected: [[0]] },
      { input: { matrix: [[1]] }, expected: [[1]] }
    ]
  },

  // Problem 62: Search a 2D Matrix
  62: {
    visible: [
      {
        input: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3 },
        expected: true,
        explanation: "3 is found in the matrix"
      }
    ],
    hidden: [
      { input: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 13 }, expected: false },
      { input: { matrix: [[1]], target: 1 }, expected: true },
      { input: { matrix: [[1]], target: 2 }, expected: false },
      { input: { matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], target: 16 }, expected: true }
    ]
  },

  // Problem 63: Sort Colors
  63: {
    visible: [
      {
        input: { nums: [2,0,2,1,1,0] },
        expected: [0,0,1,1,2,2],
        explanation: "Sort colors: red(0), white(1), blue(2)"
      }
    ],
    hidden: [
      { input: { nums: [2,0,1] }, expected: [0,1,2] },
      { input: { nums: [0] }, expected: [0] },
      { input: { nums: [1,0,2,1,1,2,0,0,2,1,0,2] }, expected: [0,0,0,0,0,1,1,1,2,2,2,2] },
      { input: { nums: [1,2,0] }, expected: [0,1,2] }
    ]
  },

  // Problem 64: Minimum Window Substring
  64: {
    visible: [
      {
        input: { s: "ADOBECODEBANC", t: "ABC" },
        expected: "BANC",
        explanation: "Minimum window containing A, B, C"
      }
    ],
    hidden: [
      { input: { s: "a", t: "a" }, expected: "a" },
      { input: { s: "a", t: "b" }, expected: "" },
      { input: { s: "ab", t: "a" }, expected: "a" },
      { input: { s: "ab", t: "b" }, expected: "b" }
    ]
  },

  // Problem 65: Combinations
  65: {
    visible: [
      {
        input: { n: 4, k: 2 },
        expected: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]],
        explanation: "All combinations of 4 choose 2"
      }
    ],
    hidden: [
      { input: { n: 1, k: 1 }, expected: [[1]] },
      { input: { n: 2, k: 1 }, expected: [[1],[2]] },
      { input: { n: 3, k: 3 }, expected: [[1,2,3]] },
      { input: { n: 4, k: 4 }, expected: [[1,2,3,4]] }
    ]
  },

  // Problem 66: Subsets
  66: {
    visible: [
      {
        input: { nums: [1,2,3] },
        expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]],
        explanation: "All possible subsets"
      }
    ],
    hidden: [
      { input: { nums: [0] }, expected: [[],[0]] },
      { input: { nums: [1] }, expected: [[],[1]] },
      { input: { nums: [1,2] }, expected: [[],[1],[2],[1,2]] },
      { input: { nums: [1,2,3,4] }, expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3],[4],[1,4],[2,4],[1,2,4],[3,4],[1,3,4],[2,3,4],[1,2,3,4]] }
    ]
  },

  // Problem 67: Word Search
  67: {
    visible: [
      {
        input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCCED" },
        expected: true,
        explanation: "Word found in the board"
      }
    ],
    hidden: [
      { input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "SEE" }, expected: true },
      { input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCB" }, expected: false },
      { input: { board: [["A"]], word: "A" }, expected: true },
      { input: { board: [["A"]], word: "B" }, expected: false }
    ]
  },

  // Problem 68: Remove Duplicates from Sorted Array II
  68: {
    visible: [
      {
        input: { nums: [1,1,1,2,2,3] },
        expected: 5,
        explanation: "Keep at most 2 duplicates, return length"
      }
    ],
    hidden: [
      { input: { nums: [1,1,1,2,2,2,3,3] }, expected: 6 },
      { input: { nums: [1] }, expected: 1 },
      { input: { nums: [1,1,2,2,2,3] }, expected: 6 },
      { input: { nums: [1,1,1,1,1] }, expected: 2 }
    ]
  },

  // Problem 69: Search in Rotated Sorted Array II
  69: {
    visible: [
      {
        input: { nums: [2,5,6,0,0,1,2], target: 0 },
        expected: true,
        explanation: "Target found"
      },
      {
        input: { nums: [2,5,6,0,0,1,2], target: 3 },
        expected: false,
        explanation: "Target not found"
      }
    ],
    hidden: [
      { input: { nums: [1,1,1,3,1], target: 3 }, expected: true },
      { input: { nums: [1,0,1,1,1], target: 0 }, expected: true },
      { input: { nums: [1,1,1,1,1,1,1], target: 1 }, expected: true },
      { input: { nums: [1,1,1,1,1,0,1,1], target: 0 }, expected: true }
    ]
  },

  // Problem 70: Remove Duplicates from Sorted List II
  70: {
    visible: [
      {
        input: { head: [1,2,3,3,4,4,5] },
        expected: [1,2,5],
        explanation: "Remove all nodes with duplicate values"
      }
    ],
    hidden: [
      { input: { head: [1,1,1,2,3] }, expected: [2,3] },
      { input: { head: [1,1,2,2,3,3,4] }, expected: [4] },
      { input: { head: [1,2,3,4,5] }, expected: [1,2,3,4,5] },
      { input: { head: [1,1,1,1,1] }, expected: [] },
      { input: { head: [1,2,3,3,4,4,5,5,5,6,7] }, expected: [1,2,6,7] }
    ]
  }
};

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

// Generate generic test cases for problems without specific test cases
const generateGenericTestCases = () => {
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
