export const driverCode = {
  python: (userCode, cases) => `
import json
from typing import List

${userCode}

if __name__ == "__main__":
    test_cases = json.loads('${JSON.stringify(cases).replace(/'/g, "\\'")}')
    sol = Solution()
    for i, t in enumerate(test_cases):
        nums = t['input']['nums']
        target = t['input']['target']
        expected = t['expected']
        result = sol.twoSum(nums, target)
        if sorted(result) == sorted(expected):
            print(f"Case {i+1}: Passed")
        else:
            print(f"Case {i+1}: Failed")
`,
  java: (userCode, cases) => `
import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

${userCode}

public class Main {
    public static void main(String[] args) {
        int[][] l1_inputs = {${cases.map(c => "{" + c.input.l1.join(",") + "}").join(", ")}};
        int[][] l2_inputs = {${cases.map(c => "{" + c.input.l2.join(",") + "}").join(", ")}};
        int[][] expected_outputs = {${cases.map(c => "{" + c.expected.join(",") + "}").join(", ")}};

        Solution sol = new Solution();

        for (int i = 0; i < expected_outputs.length; i++) {
            ListNode l1 = arrayToLinkedList(l1_inputs[i]);
            ListNode l2 = arrayToLinkedList(l2_inputs[i]);
            
            ListNode result = sol.addTwoNumbers(l1, l2);
            
            if (compareLinkedListWithArray(result, expected_outputs[i])) {
                System.out.println("Case " + (i + 1) + ": Passed");
            } else {
                System.out.println("Case " + (i + 1) + ": Failed");
            }
        }
    }

    private static ListNode arrayToLinkedList(int[] arr) {
        if (arr == null || arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new ListNode(arr[i]);
            curr = curr.next;
        }
        return head;
    }

    private static boolean compareLinkedListWithArray(ListNode head, int[] expected) {
        ListNode curr = head;
        for (int val : expected) {
            if (curr == null || curr.val != val) return false;
            curr = curr.next;
        }
        return curr == null;
    }
}
`
};
