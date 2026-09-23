import { TopicLearningContent } from '../../types';

export const DS_EXTENDED_CONTENT: Record<string, TopicLearningContent> = {
  'ds-sparse-matrix': {
    topicId: 'ds-sparse-matrix',
    topicName: 'Sparse Matrix Representation',
    subjectId: 'data-structures',
    whatIsIt: 'A Sparse Matrix is a matrix in which the vast majority of elements are zero. Storing all elements in standard 2D arrays wastes massive amounts of memory and CPU cycles.',
    simpleExplanation: 'Imagine a spreadsheet with 1,000,000 cells where only 50 cells have numbers written in them and the other 999,950 are blank. Instead of printing 1,000,000 blank cells, you write a neat list: "Row 5, Col 12 has 42; Row 99, Col 1 has 7". That compact list is a Sparse Matrix representation.',
    technicalExplanation: 'If a matrix has dimensions M x N and contains k non-zero elements where k << (M * N), storing it as a 2D array requires O(M * N) space. Specialized representations reduce space to O(k): 1) 3-Tuple (Triplet) Representation: A (k+1) x 3 table where row 0 stores [Rows, Columns, Total Non-Zeros], and subsequent rows store [row_index, col_index, value]; 2) Compressed Sparse Row (CSR): Uses three 1D arrays (values, column_indices, row_pointers); 3) Linked List representation: Uses orthogonal nodes with down and right pointers.',
    importantDefinitions: [
      { term: 'Sparsity', definition: 'The ratio of zero elements to the total number of elements in a matrix: Sparsity = (Zeros) / (M * N).' },
      { term: 'Triplet Representation', definition: 'A 2D array with 3 columns storing [Row, Col, Value] for each non-zero element, with header row [TotalRows, TotalCols, TotalNonZeros].' },
      { term: 'Compressed Sparse Row (CSR)', definition: 'An efficient storage format using 3 arrays: non-zero values, column indices, and row offset pointers.' },
      { term: 'Cross-Linked Representation', definition: 'An orthogonal linked list where each node has [row, col, value, next_row, next_col] pointers.' }
    ],
    keyConcepts: [
      'Space comparison: Triplet representation takes 3 * (k + 1) integer words instead of M * N.',
      'Sparsity threshold: Sparse storage is typically beneficial when k < (M * N) / 5.',
      'Operations: Transposition of sparse matrix (Fast Transpose takes O(Columns + k) time vs Simple Transpose O(Columns * k)).',
      'Applications: Graph adjacency matrices in large social networks, finite element analysis, scientific computing.'
    ],
    example: {
      type: 'code',
      title: 'Sparse Matrix 3-Tuple Representation in C/C++',
      language: 'cpp',
      code: `// Original 4x5 Matrix with only 3 non-zeros:
// [ 0, 0, 9, 0, 0 ]
// [ 0, 0, 0, 0, 0 ]
// [ 5, 0, 0, 0, 0 ]
// [ 0, 0, 0, 7, 0 ]

struct Element {
    int row;
    int col;
    int val;
};

// Triplet format array:
Element sparse[4] = {
    {4, 5, 3},  // Header: 4 rows, 5 cols, 3 non-zero elements
    {0, 2, 9},  // Row 0, Col 2 = 9
    {2, 0, 5},  // Row 2, Col 0 = 5
    {3, 3, 7}   // Row 3, Col 3 = 7
};`,
      explanation: 'Instead of allocating 20 cells, we only allocate 4 triplets (12 values), saving 40% memory even for this tiny matrix. For a 1000x1000 matrix with 500 values, savings exceed 99.8%.'
    },
    commonInterviewQuestions: [
      {
        question: 'What is the time complexity of the Fast Transpose algorithm on a sparse matrix with n non-zero elements and c columns?',
        answer: 'The Fast Transpose algorithm runs in O(c + n) time. It first computes the frequency of non-zero elements in each column in O(n), computes starting positions for each column in the transposed matrix in O(c), and then places each element directly in its final position in O(n).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to include the header row in 3-tuple representation.',
        correction: 'Row 0 must always store the dimensions (Total Rows, Total Columns, Total Non-Zero count).',
        why: 'Without the matrix dimensions, you cannot reconstruct the original matrix bounds or perform matrix multiplication.'
      }
    ],
    quickRevision: [
      'Sparse Matrix: Mostly zeroes; store only non-zero coordinates.',
      '3-Tuple: Array of (row, col, value) plus header row (M, N, k).',
      'Fast Transpose: Computes column counts and starting addresses in O(Columns + NonZeros).',
      'CSR format: Standard format in modern scientific computing libraries like SciPy.'
    ],
    practiceQuestions: [
      {
        id: 'ds-sparse-pq1',
        question: 'In the 3-tuple (triplet) representation of a 10x10 sparse matrix having 15 non-zero elements, how many rows are in the representation array?',
        options: ['10', '15', '16', '30'],
        correctOptionIndex: 2,
        explanation: 'The array requires 1 row for the header metadata [Rows, Cols, NonZeros] plus 15 rows for the non-zero elements, totaling 16 rows.'
      }
    ]
  },

  'ds-priority-queues': {
    topicId: 'ds-priority-queues',
    topicName: 'Priority Queues & Binary Heaps',
    subjectId: 'data-structures',
    whatIsIt: 'A Priority Queue is an abstract data type where each element has an associated priority, and elements are served such that highest (or lowest) priority is always dequeued first, commonly implemented using a Binary Heap.',
    simpleExplanation: 'Think of an emergency hospital triage room. Patients do not get treated strictly in the order they walked through the door (FIFO). A patient with a severe heart condition gets treated immediately ahead of someone with a minor finger sprain. A Priority Queue organizes items by urgency.',
    technicalExplanation: 'A Binary Heap is a complete binary tree satisfying the Heap Property. In a Max-Heap, parent key >= children keys; in a Min-Heap, parent key <= children keys. Because it is a complete tree, it can be compactly stored in a 1D array where for node at index i: Left Child = 2i + 1, Right Child = 2i + 2, and Parent = floor((i - 1) / 2). Insertion takes O(log N) via up-heap bubble; extraction of min/max takes O(log N) via down-heap sift; building a heap from an unordered array takes O(N) using bottom-up heapify.',
    importantDefinitions: [
      { term: 'Binary Heap', definition: 'A complete binary tree stored compactly in an array that satisfies either the min-heap or max-heap order property.' },
      { term: 'Heapify', definition: 'The operation that restores the heap property at a node given that both child subtrees already satisfy the heap property (takes O(log N)).' },
      { term: 'Complete Binary Tree', definition: 'A binary tree in which every level except possibly the last is completely filled, and all nodes in the last level are as far left as possible.' },
      { term: 'Priority Queue', definition: 'An abstract data type supporting insert(item, priority) and extract_highest_priority().' }
    ],
    keyConcepts: [
      'Array indexing (0-based): Parent(i) = (i-1)//2, Left(i) = 2i+1, Right(i) = 2i+2.',
      'Time Complexities: Find Min/Max = O(1), Insert = O(log N), Extract Min/Max = O(log N), Build Heap = O(N).',
      'Build Heap is O(N), NOT O(N log N), because most nodes reside near the leaves where heapify takes few steps (mathematical sum of h / 2^h).',
      'Applications: Dijkstra’s Shortest Path, Prim’s MST algorithm, Huffman Coding, OS CPU priority scheduling.'
    ],
    example: {
      type: 'code',
      title: 'Max-Heapify Implementation in Python',
      language: 'python',
      code: `def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    # Check if left child exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left

    # Check if right child exists and is greater than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right

    # Swap and continue heapifying if root is not largest
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Example Array to Max-Heap
arr = [4, 10, 3, 5, 1]
n = len(arr)
# Build heap: bottom-up from last non-leaf node
for i in range(n // 2 - 1, -1, -1):
    heapify(arr, n, i)

print("Max Heap Array:", arr)  # [10, 5, 3, 4, 1]`,
      output: 'Max Heap Array: [10, 5, 3, 4, 1]',
      explanation: 'Bottom-up heap construction starts at floor(n/2) - 1 and percolates downward, running in O(n) total operations.'
    },
    commonInterviewQuestions: [
      {
        question: 'Why is building a binary heap O(N) instead of O(N log N)?',
        answer: 'When building a heap bottom-up, half the nodes are leaves (height 0) taking 0 steps. A quarter of nodes have height 1 (1 step), an eighth have height 2, etc. The sum is N * sum(h / 2^h) for h=1 to log N. The series converges to 2, making the total work bounded by 2N = O(N).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Confusing a Binary Heap with a Binary Search Tree (BST).',
        correction: 'In a Min-Heap, the left child does not have to be smaller than the right child. The only guarantee is that the parent is smaller than both children.',
        why: 'Heaps enforce parent-child dominance only, with no horizontal ordering between siblings.'
      }
    ],
    quickRevision: [
      'Complete tree property enables zero-pointer array representation.',
      'Parent: (i-1)//2, Left child: 2i+1, Right child: 2i+2.',
      'Peek: O(1), Insert: O(log N), Extract: O(log N), Build Heap: O(N).',
      'Used in Dijkstra, Prim, Huffman, and HeapSort.'
    ],
    practiceQuestions: [
      {
        id: 'ds-pq-pq1',
        question: 'Given an array representation of a 0-indexed binary heap, what is the parent index of the node at index 6?',
        options: ['2', '3', '1', '0'],
        correctOptionIndex: 0,
        explanation: 'Parent index formula for 0-indexed heap is floor((i - 1) / 2). For i = 6: floor((6 - 1) / 2) = floor(5/2) = 2.'
      }
    ]
  },

  'ds-linked-lists': {
    topicId: 'ds-linked-lists',
    topicName: 'Singly, Doubly & Circular Linked Lists',
    subjectId: 'data-structures',
    whatIsIt: 'A Linked List is a linear dynamic data structure composed of self-referential nodes, where each node stores a data value and one or more reference pointers to neighboring nodes.',
    simpleExplanation: 'Unlike an array (which is like a rigid row of numbered lockers glued together), a linked list is like a treasure hunt. Locker 1 contains a key and a note saying "The next clue is in Locker 87". It can easily grow or shrink without requiring contiguous blocks of memory.',
    technicalExplanation: 'Singly Linked Lists have a single `next` pointer per node, allowing unidirectional forward traversal. Doubly Linked Lists (DLL) have `prev` and `next` pointers, supporting bidirectional traversal and O(1) node deletion given a pointer to the node. Circular Linked Lists connect the last node back to the head node (or last->next == head), ideal for round-robin scheduling. Time complexities: Insertion at head is O(1); Search is O(N); Access by index is O(N); Deletion with predecessor pointer is O(1).',
    importantDefinitions: [
      { term: 'Singly Linked List', definition: 'A chain of nodes where each node contains data and a pointer to the subsequent node; the final node points to NULL.' },
      { term: 'Doubly Linked List (DLL)', definition: 'A list where each node contains pointers to both its predecessor (`prev`) and successor (`next`).' },
      { term: 'Circular Linked List', definition: 'A linked list where the tail node’s next pointer points back to the head node, forming a closed ring.' },
      { term: "Floyd's Tortoise and Hare", definition: 'A two-pointer cycle detection algorithm using a slow pointer (1 step) and fast pointer (2 steps) running in O(N) time and O(1) space.' }
    ],
    keyConcepts: [
      'Array vs Linked List: Linked lists offer dynamic sizing and O(1) insertions/deletions without shifting, but lack random access and consume pointer overhead.',
      'Cycle Detection: Fast and slow pointers meet if and only if a loop exists in the linked list.',
      'Reversal: In-place reversal of singly linked list requires 3 pointers (prev, curr, next) in O(N) time.',
      'Doubly linked lists enable O(1) removal of an arbitrary node `curr`: `curr->prev->next = curr->next; curr->next->prev = curr->prev;`.'
    ],
    example: {
      type: 'code',
      title: 'In-Place Singly Linked List Reversal in C/C++',
      language: 'cpp',
      code: `struct Node {
    int data;
    Node* next;
};

Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;
    Node* nextNode = nullptr;

    while (curr != nullptr) {
        nextNode = curr->next;  // Store next node
        curr->next = prev;      // Reverse current pointer
        prev = curr;            // Advance prev to curr
        curr = nextNode;        // Advance curr to next
    }
    return prev; // New head of reversed list
}`,
      explanation: 'Iterates through the list using 3 pointers, reversing each node pointer in O(N) time and O(1) auxiliary space.'
    },
    commonInterviewQuestions: [
      {
        question: 'How do you find the middle node of a singly linked list in a single pass?',
        answer: 'Use two pointers: a slow pointer and a fast pointer, both starting at the head. Advance the slow pointer by 1 node and the fast pointer by 2 nodes in each iteration. When the fast pointer reaches the end (NULL or fast->next == NULL), the slow pointer will be positioned exactly at the middle node.'
      },
      {
        question: 'How do you detect and find the start of a cycle in a linked list?',
        answer: "Use Floyd's Cycle Detection. Move slow by 1 and fast by 2. If they meet, a cycle exists. To find the loop start, reset slow to head while keeping fast at the meeting point. Then move both pointers 1 step at a time. The node where they meet again is the exact entry point of the cycle."
      }
    ],
    commonMistakes: [
      {
        mistake: 'Losing reference to `curr->next` before reassigning `curr->next = prev`.',
        correction: 'Always save `curr->next` into a temporary pointer before overwriting it.',
        why: 'Overwriting the pointer first breaks the chain, causing memory leaks and losing the remaining list.'
      }
    ],
    quickRevision: [
      'Singly: One next pointer per node. Insert at head: O(1), Search: O(n).',
      'Doubly: Prev and next pointers. O(1) delete when node pointer is known.',
      'Circular: Tail points to head. Excellent for Round-Robin schedulers.',
      'Floyd’s algorithm detects loops in O(N) time and O(1) space.'
    ],
    practiceQuestions: [
      {
        id: 'ds-ll-pq1',
        question: 'What is the time complexity to insert a new node after a given node in a singly linked list?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctOptionIndex: 0,
        explanation: 'Given a pointer to the preceding node, insertion requires only updating two pointers (new_node->next = prev->next; prev->next = new_node), which takes O(1) constant time.'
      }
    ]
  },

  'ds-trees': {
    topicId: 'ds-trees',
    topicName: 'Trees & Forest Representation',
    subjectId: 'data-structures',
    whatIsIt: 'A Tree is a non-linear, hierarchical data structure consisting of nodes connected by directed edges, with a single designated root node and no cycles.',
    simpleExplanation: 'Unlike a line of people (linear), a tree is like a company organizational chart or a family tree. The CEO is at the top (Root), Vice Presidents report to the CEO (Children), and individual team contributors with no direct reports are the Leaves.',
    technicalExplanation: 'A general tree can have nodes with any arbitrary degree (number of children). A Forest is an ordered set of zero or more disjoint trees. Any arbitrary general tree or forest can be converted into an equivalent Binary Tree using the "Left-Child Right-Sibling" (LCRS) representation: for any node, its left pointer points to its first child, and its right pointer points to its next immediate sibling. Properties: A tree with N nodes always has exactly (N - 1) edges.',
    importantDefinitions: [
      { term: 'Root', definition: 'The topmost node of a tree with in-degree 0 (no parent).' },
      { term: 'Leaf (Terminal Node)', definition: 'A node with out-degree 0 (no children).' },
      { term: 'Height of Node', definition: 'The number of edges on the longest path from that node down to a leaf. (Height of tree = Height of root).' },
      { term: 'Depth of Node', definition: 'The number of edges on the path from the root node to that specific node.' },
      { term: 'Forest', definition: 'A collection of disjoint trees formed when the root of a tree is removed.' }
    ],
    keyConcepts: [
      'Edge count formula: A tree with N nodes always has exactly N - 1 edges.',
      'Left-Child Right-Sibling (LCRS): Converts any general tree with arbitrary child counts into a binary tree with degree 2.',
      'Forest to Binary Tree transformation: Roots of each tree become right siblings of each other.',
      'Properties: Height of complete tree with N nodes is floor(log2(N)).'
    ],
    example: {
      type: 'diagram',
      title: 'General Tree to Binary Tree (Left-Child Right-Sibling)',
      explanation: 'General tree with 3 children converted to binary tree format',
      diagramAscii: `
General Tree:
       A
     / | \\
    B  C  D

Converted Binary Tree (Left = First Child, Right = Next Sibling):
       A
      /
     B
      \\
       C
        \\
         D
      `
    },
    commonInterviewQuestions: [
      {
        question: 'If a tree has N nodes, how many edges does it contain?',
        answer: 'Exactly N - 1 edges. Every node in a tree except the root node has exactly one incoming edge from its parent.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Confusing Height and Depth of a node.',
        correction: 'Depth is measured downwards from the Root to the node; Height is measured upwards from the furthest Leaf to the node.',
        why: 'Root depth is 0; leaf height is 0.'
      }
    ],
    quickRevision: [
      'N nodes in a tree = N - 1 edges.',
      'Forest: Set of disjoint trees.',
      'LCRS: Left child = First Child, Right child = Next Sibling.',
      'Degree of node: Number of children it has.'
    ],
    practiceQuestions: [
      {
        id: 'ds-trees-pq1',
        question: 'How many edges are present in a tree having 25 vertices?',
        options: ['24', '25', '26', '50'],
        correctOptionIndex: 0,
        explanation: 'Any tree with N vertices has strictly N - 1 edges. For N = 25, the number of edges is 24.'
      }
    ]
  },

  'ds-threaded-bt': {
    topicId: 'ds-threaded-bt',
    topicName: 'Threaded Binary Trees',
    subjectId: 'data-structures',
    whatIsIt: 'A Threaded Binary Tree is a binary tree variant that replaces null child pointers with "threads" pointing to the in-order predecessor or successor, enabling stack-less in-order traversal.',
    simpleExplanation: 'In a normal binary tree, over half of all pointer fields are NULL (wasted space!). A threaded tree puts those empty pointers to work: instead of pointing to nowhere, a null right pointer is redirected to point to the next node in line (in-order successor), like following a guide rope through a maze without needing a backpack (call stack).',
    technicalExplanation: 'In an N-node binary tree, there are 2N pointers, of which (N + 1) are NULL. In a Single-Threaded Tree, null right pointers point to the in-order successor. In a Double-Threaded Tree, null left pointers point to in-order predecessors and null right pointers point to in-order successors. Two boolean tags (`leftThread`, `rightThread`) distinguish whether a pointer references an actual child or a thread.',
    importantDefinitions: [
      { term: 'Thread', definition: 'A repurposed null pointer pointing to the in-order predecessor or in-order successor of a node.' },
      { term: 'Right-Threaded Binary Tree', definition: 'A binary tree where every null right pointer points to the in-order successor.' },
      { term: 'Double-Threaded Binary Tree', definition: 'A tree where null left pointers point to in-order predecessors and null right pointers point to in-order successors.' }
    ],
    keyConcepts: [
      'Null pointer count theorem: Any binary tree with N nodes contains exactly N + 1 null pointers.',
      'Stackless Traversal: In-order traversal can be performed in O(N) time with O(1) auxiliary space (no recursion or explicit stack needed).',
      'Tags: Node requires 2 boolean flags (isLeftThread, isRightThread) to distinguish real child edges from threads.',
      'Finding In-order Successor: If rightThread is true, return right pointer; else, go to right child and then keep going left as far as possible.'
    ],
    example: {
      type: 'text',
      title: 'Finding Inorder Successor in Threaded Binary Tree',
      explanation: 'Algorithm to step through a right-threaded tree without recursion',
      code: `
Node* inorderSuccessor(Node* p) {
    // If right pointer is a thread, it directly points to successor!
    if (p->rightThread == true) {
        return p->right;
    }
    // Else, successor is the leftmost node in right subtree
    p = p->right;
    while (p != nullptr && p->leftThread == false) {
        p = p->left;
    }
    return p;
}
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What is the primary advantage of a Threaded Binary Tree over a standard Binary Tree?',
        answer: 'It enables in-order and pre-order traversals in O(N) time with strictly O(1) memory space, completely eliminating the recursion stack or explicit auxiliary stack overhead.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming threaded binary trees use more memory than regular trees.',
        correction: 'They utilize the existing null pointers that are already allocated; only two 1-bit boolean flags are added per node.',
        why: 'In standard binary trees, more than 50% of pointer space is wasted as NULL.'
      }
    ],
    quickRevision: [
      'N nodes = N + 1 null pointers put to productive use.',
      'Null right pointer -> Inorder successor.',
      'Null left pointer -> Inorder predecessor.',
      'Enables O(1) auxiliary space traversal without call stacks.'
    ],
    practiceQuestions: [
      {
        id: 'ds-tbt-pq1',
        question: 'In a binary tree with 20 nodes, how many null pointers exist that can potentially be threaded?',
        options: ['19', '20', '21', '40'],
        correctOptionIndex: 2,
        explanation: 'In any binary tree with N nodes, the total number of null pointers is strictly N + 1. For N = 20: 20 + 1 = 21 null pointers.'
      }
    ]
  },

  'ds-bst': {
    topicId: 'ds-bst',
    topicName: 'Binary Search Trees (BST)',
    subjectId: 'data-structures',
    whatIsIt: 'A Binary Search Tree (BST) is a node-based binary tree data structure where all keys in the left subtree are strictly less than the node’s key, and all keys in the right subtree are strictly greater.',
    simpleExplanation: 'Imagine a dictionary divided in half. If the word you are looking for comes alphabetically before the middle word, you completely ignore the right half and look only in the left half. A BST applies this divide-and-conquer logic at every branch.',
    technicalExplanation: 'BST Property: For any node X, for all nodes Y in left subtree of X: key(Y) < key(X), and for all nodes Z in right subtree of X: key(Z) > key(X). In-order traversal of a BST always yields keys in strictly ascending sorted order. Operations (Search, Insert, Delete) take O(h) time, where h is tree height. In a balanced BST, h = O(log N); in a degenerated (skewed) BST, h = O(N). Node deletion has 3 distinct cases: 1) Leaf node (delete directly), 2) Single child (replace with child), 3) Two children (replace with in-order successor or predecessor, then delete that successor).',
    importantDefinitions: [
      { term: 'BST Property', definition: 'Left subtree keys < Root key < Right subtree keys (applied recursively to every node).' },
      { term: 'In-order Successor', definition: 'The node with the smallest key in the right subtree (the next key in sorted sequence).' },
      { term: 'In-order Predecessor', definition: 'The node with the largest key in the left subtree (the previous key in sorted sequence).' },
      { term: 'Skewed BST', definition: 'A degenerate BST where every internal node has only one child, degenerating performance to that of a linked list (O(N)).' }
    ],
    keyConcepts: [
      'In-order traversal always produces sorted output in ascending order.',
      'Average Time Complexities: Search O(log N), Insert O(log N), Delete O(log N).',
      'Worst-case Time Complexity: O(N) when keys are inserted in already sorted order (skewed tree).',
      'Two-Child Deletion: Replace value with in-order successor, then recursively delete the in-order successor from right subtree.'
    ],
    example: {
      type: 'code',
      title: 'BST Deletion Implementation in C++',
      language: 'cpp',
      code: `Node* deleteNode(Node* root, int key) {
    if (!root) return root;

    if (key < root->data)
        root->left = deleteNode(root->left, key);
    else if (key > root->data)
        root->right = deleteNode(root->right, key);
    else {
        // Case 1 & 2: 0 or 1 child
        if (!root->left) {
            Node* temp = root->right;
            delete root;
            return temp;
        } else if (!root->right) {
            Node* temp = root->left;
            delete root;
            return temp;
        }
        // Case 3: 2 children - get inorder successor (min in right subtree)
        Node* succ = root->right;
        while (succ->left) succ = succ->left;
        
        root->data = succ->data;
        root->right = deleteNode(root->right, succ->data);
    }
    return root;
}`,
      explanation: 'Handles all three deletion scenarios gracefully while preserving BST invariants.'
    },
    commonInterviewQuestions: [
      {
        question: 'What is the worst-case time complexity of searching an element in a BST, and when does it occur?',
        answer: 'Worst-case time complexity is O(N). It occurs when elements are inserted in already sorted (ascending or descending) order, causing the tree to degenerate into a skewed linked list of height N.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Checking only that root->left < root and root->right > root to validate a BST.',
        correction: 'Every single node in the left subtree must be smaller than the root, not just the immediate child.',
        why: 'A tree where root=10, left=5, and left->right=12 satisfies local parent-child check but violates global BST property.'
      }
    ],
    quickRevision: [
      'Left < Root < Right.',
      'In-order traversal = Sorted output.',
      'Search/Insert/Delete: Average O(log N), Worst O(N).',
      'Deletion of node with 2 children: Swap with inorder successor.'
    ],
    practiceQuestions: [
      {
        id: 'ds-bst-pq1',
        question: 'Which tree traversal on a Binary Search Tree (BST) visits keys in ascending sorted order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctOptionIndex: 1,
        explanation: 'In-order traversal (Left, Root, Right) on a valid BST always visits all elements in non-decreasing sorted order.'
      }
    ]
  },

  'ds-sets': {
    topicId: 'ds-sets',
    topicName: 'Data Structures for Sets & Disjoint Sets',
    subjectId: 'data-structures',
    whatIsIt: 'Disjoint Set Union (DSU) or Union-Find is a specialized data structure that tracks a set of elements partitioned into non-overlapping subsets, supporting near-constant time union and find operations.',
    simpleExplanation: 'Imagine people forming clubs. Anyone in a club has one recognized Club President (the representative). When you ask two people "Are you in the same club?", they both name their president (Find). If Club A merges with Club B, Club A’s president acknowledges Club B’s president as boss (Union).',
    technicalExplanation: 'DSU supports two primary operations: 1) `find(x)`: Returns the representative identifier of the set containing element x, and 2) `union(x, y)`: Merges the sets containing x and y. When implemented with the two optimizations—Path Compression (flattening tree during find) and Union by Rank/Size (attaching smaller tree under taller tree)—the amortized time complexity per operation is O(alpha(N)), where alpha is the Inverse Ackermann function (effectively <= 4 for all practical universe values).',
    importantDefinitions: [
      { term: 'Disjoint Sets', definition: 'Sets whose intersection is empty (they share zero common elements).' },
      { term: 'Path Compression', definition: 'An optimization in find(x) that makes every visited node point directly to the root representative.' },
      { term: 'Union by Rank', definition: 'An optimization that always attaches the root of the tree with smaller depth under the root of the tree with larger depth.' },
      { term: 'Inverse Ackermann Function alpha(N)', definition: 'An extremely slow-growing mathematical function that is strictly less than 5 for any realistic input N <= 10^80.' }
    ],
    keyConcepts: [
      'Two Classic Optimizations: Path Compression + Union by Rank.',
      'Time Complexity: O(alpha(N)) amortized per operation, practically constant O(1).',
      'Cycle Detection in Undirected Graphs: If find(u) == find(v) for an edge (u, v), adding this edge creates a cycle!',
      'Kruskal’s Minimum Spanning Tree: Relies heavily on DSU to sort edges and reject cycle-forming edges.'
    ],
    example: {
      type: 'code',
      title: 'Disjoint Set Union with Path Compression & Union by Rank in C++',
      language: 'cpp',
      code: `class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) : parent(n), rank(n, 0) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int i) {
        if (parent[i] == i)
            return i;
        return parent[i] = find(parent[i]); // Path compression
    }

    void unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);
        if (root_i != root_j) {
            if (rank[root_i] < rank[root_j])
                parent[root_i] = root_j;
            else if (rank[root_i] > rank[root_j])
                parent[root_j] = root_i;
            else {
                parent[root_j] = root_i;
                rank[root_i]++;
            }
        }
    }
};`,
      explanation: 'Path compression flattens the tree during find calls; union by rank keeps tree height logarithmic.'
    },
    commonInterviewQuestions: [
      {
        question: 'What is the time complexity of DSU operations when both Path Compression and Union by Rank are used?',
        answer: 'The amortized time complexity per find or union operation is O(alpha(N)), where alpha is the Inverse Ackermann function. In practice, alpha(N) <= 4 for all practical inputs up to the number of atoms in the universe, making operations virtually O(1).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using DSU for cycle detection in directed graphs.',
        correction: 'DSU works for cycle detection in undirected graphs only. Directed graphs require DFS with recursion stacks (colored vertices).',
        why: 'In directed graphs, an edge to an already connected component does not necessarily constitute a directed cycle.'
      }
    ],
    quickRevision: [
      'Find: Finds set representative; Union: Merges two sets.',
      'Path Compression: Points nodes directly to root.',
      'Union by Rank: Attaches smaller tree to larger tree.',
      'Foundation of Kruskal’s Minimum Spanning Tree algorithm.'
    ],
    practiceQuestions: [
      {
        id: 'ds-sets-pq1',
        question: 'Which graph algorithm uses Disjoint Set Union (DSU) to efficiently detect cycles?',
        options: ["Kruskal's Algorithm", "Dijkstra's Algorithm", 'Floyd-Warshall', 'Bellman-Ford'],
        correctOptionIndex: 0,
        explanation: "Kruskal's Minimum Spanning Tree algorithm sorts all edges and uses DSU to include edges that do not connect already connected components."
      }
    ]
  },

  'ds-graphs': {
    topicId: 'ds-graphs',
    topicName: 'Graphs: Adjacency, BFS, DFS & Spanning Trees',
    subjectId: 'data-structures',
    whatIsIt: 'A Graph is a non-linear data structure G = (V, E) consisting of a set of vertices V and edges E connecting pairs of vertices, supporting fundamental traversals (BFS, DFS) and spanning tree algorithms.',
    simpleExplanation: 'Think of airline flights: cities are vertices and flight routes between them are edges. Breadth-First Search (BFS) explores outward in ripple waves (all direct 1-stop flights first, then 2-stop flights). Depth-First Search (DFS) explores as deep as possible down one flight path before backtracking.',
    technicalExplanation: 'Graph Representations: 1) Adjacency Matrix: V x V 2D matrix; O(1) edge check, but takes O(V^2) space (wasteful for sparse graphs); 2) Adjacency List: Array of linked lists; takes O(V + E) space. Traversals: BFS uses a Queue and visits level-by-level in O(V + E); DFS uses a Stack/recursion in O(V + E). A Spanning Tree of a connected graph G is a subgraph that is a tree and includes all vertices (has V-1 edges). Minimum Spanning Tree (MST) algorithms: Prim’s (greedy vertex addition O(E log V)) and Kruskal’s (greedy edge selection O(E log E)). Shortest Path: Dijkstra’s Algorithm O((V + E) log V) with non-negative edge weights.',
    importantDefinitions: [
      { term: 'Adjacency List', definition: 'An array of lists where array index i points to a list of all vertices adjacent to vertex i, taking O(V + E) memory.' },
      { term: 'Breadth-First Search (BFS)', definition: 'A graph traversal utilizing a FIFO queue that discovers vertices in order of increasing distance from source vertex.' },
      { term: 'Depth-First Search (DFS)', definition: 'A graph traversal utilizing a LIFO stack/recursion that plunges as deep as possible along each branch before backtracking.' },
      { term: 'Minimum Spanning Tree (MST)', definition: 'A spanning tree connecting all V vertices with exactly V - 1 edges having the minimal possible sum of edge weights.' }
    ],
    keyConcepts: [
      'Handshaking Lemma: In any undirected graph, the sum of degrees of all vertices is equal to twice the number of edges: sum(deg(v)) = 2 * |E|.',
      'Space: Adjacency Matrix = O(V^2); Adjacency List = O(V + E).',
      'BFS gives shortest path in unweighted graphs.',
      'Dijkstra’s algorithm fails on graphs with negative edge weights (requires Bellman-Ford).'
    ],
    example: {
      type: 'code',
      title: 'Breadth-First Search (BFS) in C++',
      language: 'cpp',
      code: `void BFS(int startVertex, const vector<vector<int>>& adj, int V) {
    vector<bool> visited(V, false);
    queue<int> q;

    visited[startVertex] = true;
    q.push(startVertex);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";

        for (int neighbor : adj[u]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
      explanation: 'Uses a queue to visit vertices level-by-level, ensuring O(V + E) time complexity.'
    },
    commonInterviewQuestions: [
      {
        question: 'What is the Handshaking Lemma and what does it imply about the number of odd-degree vertices in a graph?',
        answer: 'The Handshaking Lemma states that sum of degrees of all vertices = 2 * |E|. Because the sum of degrees is always an even number (2E), the number of vertices with odd degree in any undirected graph must always be EVEN.'
      },
      {
        question: 'Why does Dijkstra’s algorithm fail when negative edge weights are present?',
        answer: 'Dijkstra greedily assumes that once a vertex is marked visited (extracted from the priority queue), its shortest path distance is permanently finalized. A negative weight edge encountered later can produce a shorter path to an already finalized vertex, invalidating this greedy assumption.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using an Adjacency Matrix for a sparse graph with 100,000 vertices and 200,000 edges.',
        correction: 'Always use an Adjacency List for sparse graphs.',
        why: 'An adjacency matrix would require (100,000)^2 = 10 billion integers (~40 GB RAM!), whereas an adjacency list requires only ~1.2 MB.'
      }
    ],
    quickRevision: [
      'Adjacency List: O(V + E) space; Adjacency Matrix: O(V^2) space.',
      'BFS: Queue, finds shortest path in unweighted graphs.',
      'DFS: Stack / recursion, detects cycles and topological sorts.',
      'MST has V vertices and V - 1 edges (Kruskal, Prim).'
    ],
    practiceQuestions: [
      {
        id: 'ds-graph-pq1',
        question: 'In an undirected graph with 10 vertices and 15 edges, what is the sum of the degrees of all vertices?',
        options: ['15', '25', '30', '150'],
        correctOptionIndex: 2,
        explanation: 'According to the Handshaking Lemma, sum(degrees) = 2 * E = 2 * 15 = 30.'
      }
    ]
  },

  'ds-searching': {
    topicId: 'ds-searching',
    topicName: 'Searching Algorithms (Linear, Binary Search)',
    subjectId: 'data-structures',
    whatIsIt: 'Searching algorithms locate the position of a target key within a collection of elements, ranging from linear scan to logarithmic divide-and-conquer binary search.',
    simpleExplanation: 'Finding a name in an unsorted pile of papers requires looking through them one by one from front to back (Linear Search). Finding a word in a printed dictionary lets you open right to the middle: if your word starts with "M" and the page is on "T", you throw away the whole second half and repeat (Binary Search).',
    technicalExplanation: 'Linear Search sequentially checks each element in O(N) time with O(1) space, requiring no prior order. Binary Search requires a pre-sorted monotonic array. In each iteration, it compares the target with the middle element: if equal, index is found; if target < mid, search left sub-array; if target > mid, search right sub-array. Recurrence relation: T(N) = T(N/2) + O(1), yielding O(log2 N) time complexity. Interpolation Search improves to O(log log N) for uniformly distributed numerical data.',
    importantDefinitions: [
      { term: 'Linear Search', definition: 'A search method that inspects each element in sequence until a match is found or the end is reached (O(N)).' },
      { term: 'Binary Search', definition: 'A divide-and-conquer search algorithm operating on sorted arrays that halves the search space each step (O(log N)).' },
      { term: 'Integer Overflow in Mid Calculation', definition: 'The bug where (low + high) / 2 exceeds 32-bit signed integer limits (2^31 - 1), corrected by low + (high - low) / 2.' }
    ],
    keyConcepts: [
      'Binary Search Precondition: Array must be sorted in monotonic non-decreasing (or non-increasing) order.',
      'Comparison count: In an array of size N, Binary Search requires at most floor(log2 N) + 1 comparisons.',
      'Safe Mid formula: `mid = low + (high - low) / 2;` prevents signed 32-bit integer overflow.',
      'Lower Bound / Upper Bound: Variations finding first occurrence or first strictly greater element.'
    ],
    example: {
      type: 'code',
      title: 'Bug-Free Binary Search in C++',
      language: 'cpp',
      code: `int binarySearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;

    while (low <= high) {
        // Prevents overflow compared to (low + high) / 2
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
            return mid; // Target found
        else if (arr[mid] < target)
            low = mid + 1; // Search right half
        else
            high = mid - 1; // Search left half
    }
    return -1; // Target not found
}`,
      explanation: 'Guarantees O(log N) runtime and avoids integer overflow for large indices.'
    },
    commonInterviewQuestions: [
      {
        question: 'Why can Binary Search not be applied directly to a standard Singly Linked List in O(log N) time?',
        answer: 'Binary search requires random access in O(1) time to inspect the middle element. In a singly linked list, accessing the middle node requires traversing N/2 nodes sequentially (O(N) time), defeating the logarithmic efficiency.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Writing `int mid = (low + high) / 2;`.',
        correction: 'Write `int mid = low + (high - low) / 2;`.',
        why: 'If low + high exceeds 2,147,483,647 (the maximum 32-bit signed integer), it overflows to a negative number, crashing the array index.'
      }
    ],
    quickRevision: [
      'Linear Search: O(N) time, works on unsorted collections.',
      'Binary Search: O(log N) time, strictly requires sorted data.',
      'Maximum comparisons for N elements: floor(log2 N) + 1.',
      'Mid formula: low + (high - low) / 2.'
    ],
    practiceQuestions: [
      {
        id: 'ds-search-pq1',
        question: 'What is the maximum number of comparisons required to search for an element in a sorted array of 1024 elements using Binary Search?',
        options: ['10', '11', '512', '1024'],
        correctOptionIndex: 1,
        explanation: 'Maximum comparisons in binary search = floor(log2(1024)) + 1 = 10 + 1 = 11 comparisons.'
      }
    ]
  },

  'ds-hashing': {
    topicId: 'ds-hashing',
    topicName: 'Hashing, Hash Functions & Collision Resolution',
    subjectId: 'data-structures',
    whatIsIt: 'Hashing is a technique that maps large keys to small index values in a hash table using a hash function, providing average O(1) time complexity for search, insert, and delete operations.',
    simpleExplanation: 'Imagine an apartment building where your apartment number is computed directly from your national ID using a magic formula. Instead of searching floor by floor through hundreds of apartments, you compute the formula and walk straight to that exact door in one step.',
    technicalExplanation: 'A Hash Table is an array of size M. A Hash Function h(k) maps universe keys k to range [0, M-1]. Desirable hash function properties: Uniform distribution and fast O(1) computation. Common functions: Division method (h(k) = k mod M, where M is prime), Multiplication method, Mid-Square method. When two keys map to identical indices (h(k1) == h(k2)), a Collision occurs. Resolution techniques: 1) Open Hashing (Separate Chaining): Each bucket is a linked list; 2) Closed Hashing (Open Addressing): All elements stay inside table array; probes for empty slots via Linear Probing (h(k, i) = (h(k) + i) mod M), Quadratic Probing (h(k) + c1*i + c2*i^2), or Double Hashing (h1(k) + i*h2(k)).',
    importantDefinitions: [
      { term: 'Load Factor (alpha)', definition: 'The ratio of stored elements (N) to total table size (M): alpha = N / M.' },
      { term: 'Primary Clustering', definition: 'The phenomenon in linear probing where occupied slots form large contiguous blocks, increasing average probe lengths.' },
      { term: 'Secondary Clustering', definition: 'Keys that hash to the same initial slot follow the exact same probe sequence in quadratic probing.' },
      { term: 'Double Hashing', definition: 'An open addressing technique where the probe interval is determined by a second independent hash function: h(k, i) = (h1(k) + i * h2(k)) mod M.' }
    ],
    keyConcepts: [
      'Load factor threshold: Open addressing typically resizes when alpha > 0.7; Chaining can tolerate alpha > 1.',
      'Linear Probing problem: Suffers from severe primary clustering.',
      'Double Hashing requirement: h2(k) must never evaluate to 0, and h2(k) must be relatively prime to M.',
      'Average time complexity: O(1) for insert, search, delete; Worst-case: O(N) when all keys collide into one slot.'
    ],
    example: {
      type: 'text',
      title: 'Collision Resolution: Linear Probing vs Chaining',
      explanation: 'Table size M = 7. Hash function h(k) = k mod 7. Keys to insert: 14, 21, 8.',
      code: `
Keys: 14, 21, 8
h(14) = 14 mod 7 = 0
h(21) = 21 mod 7 = 0 (Collision!)
h(8)  = 8 mod 7  = 1

1. SEPARATE CHAINING:
   Bucket 0 -> [21] -> [14] -> NULL
   Bucket 1 -> [8]  -> NULL
   Bucket 2..6: NULL

2. LINEAR PROBING:
   Insert 14 at index 0.
   Insert 21: index 0 occupied -> probe (0+1)%7 = index 1 -> free! Insert 21 at 1.
   Insert 8:  index 1 occupied -> probe (1+1)%7 = index 2 -> free! Insert 8 at 2.
   Table contents: [0: 14, 1: 21, 2: 8, 3: empty, 4: empty, 5: empty, 6: empty]
      `
    },
    commonInterviewQuestions: [
      {
        question: 'Why should the table size M in the division method h(k) = k mod M be a prime number?',
        answer: 'Choosing a prime number not close to powers of 2 or 10 ensures that the hash values depend on all bits of the key rather than just the lowest-order bits, distributing keys uniformly across the table and minimizing collisions.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Simply setting a deleted slot to NULL/empty in open addressing linear probing.',
        correction: 'Use a special DELETED marker (tombstone) instead of NULL.',
        why: 'If you set it to NULL, subsequent searches for other elements that collided past this slot will prematurely terminate thinking the key does not exist.'
      }
    ],
    quickRevision: [
      'Hash table gives average O(1) search, insert, and delete.',
      'Load factor: alpha = N / M.',
      'Separate Chaining: Linked lists at buckets.',
      'Open Addressing: Linear, Quadratic, and Double Hashing.',
      'Linear probing suffers from primary clustering.'
    ],
    practiceQuestions: [
      {
        id: 'ds-hash-pq1',
        question: 'Which collision resolution technique is most vulnerable to primary clustering?',
        options: ['Separate Chaining', 'Linear Probing', 'Quadratic Probing', 'Double Hashing'],
        correctOptionIndex: 1,
        explanation: 'Linear probing checks contiguous sequential slots (index + 1), causing occupied blocks to merge and form clusters.'
      }
    ]
  },

  'ds-recursion-params': {
    topicId: 'ds-recursion-params',
    topicName: 'Functions, Recursion & Parameter Passing',
    subjectId: 'data-structures',
    whatIsIt: 'Recursion is a programming technique where a function solves a problem by calling copies of itself on smaller sub-problems, relying on the runtime Call Stack and formal parameter passing semantics.',
    simpleExplanation: 'Think of Russian nesting dolls (Matryoshka). You open the big doll to find a smaller doll, and open that to find an even smaller doll, until you reach the solid tiny doll at the center that cannot be opened (Base Case). Then you close them all back up in reverse order.',
    technicalExplanation: 'Every function invocation allocates an Activation Record (Stack Frame) on the runtime Call Stack containing local variables, parameters, return address, and saved registers. A recursive function must have: 1) A Base Case that terminates recursion without self-invoking, and 2) A Recursive Step moving toward the base case. Without a base case, unbounded recursive calls exhaust stack memory, causing a Stack Overflow. Parameter passing mechanisms include: Pass by Value (copy made; caller variable unchanged) and Pass by Reference (address/alias passed; modifications affect caller variable). Tail Recursion occurs when the recursive call is the absolute final action in the function, allowing compiler optimization (Tail Call Optimization) to reuse the stack frame in O(1) space.',
    importantDefinitions: [
      { term: 'Stack Frame (Activation Record)', definition: 'A memory block pushed onto the call stack during a function call storing parameters, local variables, and return address.' },
      { term: 'Base Case', definition: 'The terminating condition in a recursive function that returns a concrete result without making further recursive calls.' },
      { term: 'Tail Recursion', definition: 'A recursive call that is the final executable statement of the function, which compilers can optimize into an iterative loop.' },
      { term: 'Pass by Reference', definition: 'Parameter passing where the memory address of the actual argument is passed, allowing the function to modify the caller variable.' }
    ],
    keyConcepts: [
      'Two Essential Components: Base Case + Progress towards Base Case.',
      'Recursion Call Stack Memory: Consumes O(Depth of recursion) memory on the call stack.',
      'Pass by Value: Safe from side-effects, but copying large structs/objects incurs performance overhead.',
      'Tail Call Elimination: Tail recursive functions run in O(1) auxiliary space when optimized by the compiler.'
    ],
    example: {
      type: 'code',
      title: 'Standard Recursion vs Tail-Recursive Factorial in C',
      language: 'c',
      code: `// 1. Non-Tail Recursive (multiplication pending after return)
int fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // Not tail-recursive! Call stack grows to O(N)
}

// 2. Tail-Recursive (accumulator passes state forward)
int factTail(int n, int accumulator) {
    if (n <= 1) return accumulator;
    return factTail(n - 1, n * accumulator); // Tail-recursive! Stack can be O(1)
}`,
      explanation: 'In the tail-recursive version, no operations remain after the function call returns; compilers optimize this into a simple jump loop.'
    },
    commonInterviewQuestions: [
      {
        question: 'What is Tail Call Optimization (TCO) and why is it beneficial?',
        answer: 'Tail Call Optimization is a compiler feature where if a function call is the final operation in the executing function, the compiler reuses the current stack frame instead of pushing a new activation record. This reduces auxiliary stack space from O(N) to O(1), preventing stack overflow errors.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Believing that `return 1 + solve(n-1);` is tail-recursive.',
        correction: 'It is NOT tail-recursive because the addition operation (`1 + ...`) must wait for `solve(n-1)` to return.',
        why: 'The activation record must stay on the stack to perform the pending addition after the child call completes.'
      }
    ],
    quickRevision: [
      'Base Case stops infinite recursion and prevents Stack Overflow.',
      'Call Stack stores Activation Records (parameters, locals, return PC).',
      'Pass by value: Copies value; Pass by reference: Passes memory address.',
      'Tail recursion: Recursive call is the last executed statement.'
    ],
    practiceQuestions: [
      {
        id: 'ds-rec-pq1',
        question: 'What runtime error is triggered when a recursive function lacks a valid base case or fails to converge?',
        options: ['Segmentation fault', 'Stack Overflow', 'Deadlock', 'Buffer Overrun'],
        correctOptionIndex: 1,
        explanation: 'Infinite recursive calls continuously push activation records onto the call stack until all allocated thread stack memory is exhausted, throwing a Stack Overflow error.'
      }
    ]
  }
};
