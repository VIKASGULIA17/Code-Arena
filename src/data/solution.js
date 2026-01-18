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
  }
};