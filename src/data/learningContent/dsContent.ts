import { TopicLearningContent } from '../../types';

export const DS_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  'ds-arrays': {
    topicId: 'ds-arrays',
    topicName: 'Arrays & Memory Mapping (Row/Col Major)',
    subjectId: 'data-structures',
    whatIsIt: 'An array is a linear data structure that stores a collection of elements of the same data type in contiguous memory locations, accessible in O(1) time using an integer index.',
    simpleExplanation: 'Imagine an egg carton where every egg compartment is identically sized and lined up sequentially. If you know the memory address of the first compartment (Base Address) and the size of each egg compartment, you can instantly find any egg compartment #i without checking the preceding ones.',
    technicalExplanation: 'In 2D arrays A[M][N] with lower bounds L1, L2 and upper bounds U1, U2: In Row-Major Order (standard in C/C++/Java), consecutive elements of each row are stored adjacent in RAM. Address(A[i][j]) = Base_Address + W * [(i - L1) * N + (j - L2)]. In Column-Major Order (Fortran, MATLAB), consecutive elements of each column are adjacent: Address(A[i][j]) = Base_Address + W * [(j - L2) * M + (i - L1)], where W is the size of each element in bytes.',
    importantDefinitions: [
      { term: 'Base Address (BA)', definition: 'The physical memory address of the very first element (A[0] or A[0][0]) in the array.' },
      { term: 'Row-Major Order', definition: 'Linearization of multi-dimensional arrays where elements of a row are stored together contiguously.' },
      { term: 'Column-Major Order', definition: 'Linearization of multi-dimensional arrays where elements of a column are stored together contiguously.' },
    ],
    keyConcepts: [
      'Contiguous Storage: Guarantees constant O(1) random access time via arithmetic offset calculation.',
      'Spatial Locality of Reference: Modern CPU caches preload contiguous lines of RAM, making row-major iteration through row-major arrays order-of-magnitude faster than jumping across columns.',
      'Row-Major formula (0-indexed): Address(A[i][j]) = BA + W * (i * Number_of_Columns + j).',
      'Column-Major formula (0-indexed): Address(A[i][j]) = BA + W * (j * Number_of_Rows + i).',
    ],
    example: {
      type: 'text',
      title: 'Row-Major Address Calculation Example',
      explanation: 'Calculate physical address of element A[3][4] in a 2D array A[5][6] stored in row-major order with base address 1000 and 4 bytes per element.',
      output: `Given:
Array dimensions: 5 rows (M=5), 6 columns (N=6)
Element size: W = 4 bytes
Base Address: BA = 1000
Target element: A[3][4] (i=3, j=4)

Row-Major Formula:
Address(A[i][j]) = BA + W * (i * N + j)
Address(A[3][4]) = 1000 + 4 * (3 * 6 + 4)
                 = 1000 + 4 * (18 + 4)
                 = 1000 + 4 * 22
                 = 1000 + 88 = 1088

The element A[3][4] is located at byte address 1088!`,
    },
    commonInterviewQuestions: [
      {
        question: 'Why does iterating through a 2D array row by row perform significantly faster than column by column in C/C++?',
        answer: 'C and C++ store 2D arrays in Row-Major Order. When you access A[i][j], the CPU cache controller loads an entire 64-byte Cache Line from RAM containing adjacent row elements (A[i][j+1], A[i][j+2], etc.). Accessing row by row exploits spatial locality and yields high Cache Hits. Iterating column by column jumps across row boundaries, leading to frequent CPU Cache Misses.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using Number of Rows in the Row-Major address calculation formula.',
        correction: 'Row-Major multiplies the row index by the Number of COLUMNS (the length of each row). Column-Major multiplies the column index by the Number of ROWS.',
        why: 'In Row-Major, to skip i complete rows, you must jump past (i * columns) elements.',
      },
    ],
    quickRevision: [
      'Array lookup is O(1) by address arithmetic.',
      'Row-Major: Address = BA + W * (i * Cols + j).',
      'Col-Major: Address = BA + W * (j * Rows + i).',
      'Exploits spatial locality in CPU cache.',
    ],
    practiceQuestions: [
      {
        id: 'ds-arr-q1',
        question: 'An array A[10][20] is stored in row-major order starting at base address 2000. Each element takes 2 bytes. What is the address of A[5][10] (assuming 0-based indexing)?',
        options: ['2110', '2220', '2240', '2190'],
        correctOptionIndex: 1,
        explanation: 'Address = 2000 + 2 * (5 * 20 + 10) = 2000 + 2 * (100 + 10) = 2000 + 2 * 110 = 2000 + 220 = 2220.',
      },
    ],
  },

  'ds-stacks': {
    topicId: 'ds-stacks',
    topicName: 'Stacks & Expression Conversion',
    subjectId: 'data-structures',
    whatIsIt: 'A Stack is a linear data structure that adheres to the LIFO (Last In, First Out) principle, where insertions and deletions happen strictly at one end called the Top.',
    simpleExplanation: 'Think of a spring-loaded stack of cafeteria trays. You can only place a clean tray onto the very top of the stack (Push), and you can only remove the tray currently sitting on top (Pop). The first tray placed at the bottom is the last one removed.',
    technicalExplanation: 'Stack operations Push(x), Pop(), and Peek() execute in O(1) time complexity. Stacks are fundamental for call stack management, bracket balancing, backtracking (DFS), and parsing arithmetic expressions: Infix (A + B), Prefix / Polish notation (+ A B), and Postfix / Reverse Polish notation (A B +). Converting Infix to Postfix uses a stack to hold operators until operands of higher or equal precedence are cleared.',
    importantDefinitions: [
      { term: 'LIFO', definition: 'Last In, First Out: The most recently inserted element is always the first to be retrieved or removed.' },
      { term: 'Stack Overflow', definition: 'Condition that occurs when attempting to Push an element onto a stack that has exceeded its allocated capacity.' },
      { term: 'Stack Underflow', definition: 'Condition that occurs when attempting to Pop an element from an already empty stack.' },
    ],
    keyConcepts: [
      'Operator Precedence: Parentheses () highest > Exponentiation (^) right-associative > Multiplication/Division (*, /) left-associative > Addition/Subtraction (+, -) left-associative.',
      'Infix to Postfix Algorithm: Operands go directly to output. Operators are pushed onto stack after popping any operators from the top that have greater or equal precedence (for left-associative). Parentheses handle grouping.',
      'Postfix Evaluation: Scan left to right. When operand encountered, push to stack. When operator encountered, pop two operands, apply operator (operand2 op operand1), and push result.',
    ],
    example: {
      type: 'text',
      title: 'Infix to Postfix Conversion Walkthrough',
      explanation: 'Convert infix expression: (A + B) * C - D / E',
      output: `Token   Stack       Postfix Output
(       (           
A       (           A
+       ( +         A
B       ( +         A B
)       [empty]     A B +
*       *           A B +
C       *           A B + C
-       -           A B + C *
D       -           A B + C * D
/       - /         A B + C * D
E       - /         A B + C * D E
End     [empty]     A B + C * D E / -

Final Postfix Expression: A B + C * D E / -`,
    },
    commonInterviewQuestions: [
      {
        question: 'How do you evaluate a Postfix expression using a stack?',
        answer: 'Scan the postfix expression from left to right: 1. If an operand is encountered, push it onto the stack. 2. If an operator is encountered, pop top two elements: op2 = pop(), op1 = pop(). 3. Compute (op1 operator op2) and push the result back onto the stack. 4. After scanning all tokens, the single element remaining on the stack is the final evaluated result.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Inverting operand order when evaluating non-commutative operators like division (/) or subtraction (-).',
        correction: 'Remember that the first popped value is op2 (right operand) and the second popped value is op1 (left operand). The calculation MUST be (op1 - op2) or (op1 / op2), NOT (op2 - op1).',
        why: 'In postfix AB-, B was pushed after A, so popping yields B first, then A.',
      },
    ],
    quickRevision: [
      'LIFO: Push, Pop, Peek are all O(1).',
      'Infix has operators between operands; Postfix has operators after operands.',
      'Postfix has no parentheses and unambiguous evaluation order.',
      'Used in recursion call stacks, undo mechanisms, and browser history.',
    ],
    practiceQuestions: [
      {
        id: 'ds-stk-q1',
        question: 'What is the postfix evaluation result of the expression: "6 3 2 + * 5 -"?',
        options: ['25', '20', '35', '18'],
        correctOptionIndex: 0,
        explanation: '1. Push 6, 3, 2. 2. "+": pop 2, 3 -> 3 + 2 = 5, push 5. 3. "*": pop 5, 6 -> 6 * 5 = 30, push 30. 4. Push 5. 5. "-": pop 5, 30 -> 30 - 5 = 25. Final result = 25.',
      },
    ],
  },

  'ds-queues': {
    topicId: 'ds-queues',
    topicName: 'Queues & Circular Queues',
    subjectId: 'data-structures',
    whatIsIt: 'A Queue is a linear data structure that operates under the FIFO (First In, First Out) principle, where insertion (enqueue) occurs at the Rear and deletion (dequeue) occurs at the Front.',
    simpleExplanation: 'A queue is identical to a line of people waiting at a movie ticket booth. The first person to arrive in line is served first and leaves from the front. Newcomers join at the rear end of the line.',
    technicalExplanation: 'In a linear array queue, dequeuing elements leaves unutilized space at the front of the array that cannot be reused without shifting elements, leading to false overflow. A Circular Queue connects the last position back to the first position using modulo arithmetic: next rear = (rear + 1) % Capacity. Circular queue is Full when: (rear + 1) % Capacity == front, and Empty when: front == -1.',
    importantDefinitions: [
      { term: 'FIFO', definition: 'First In, First Out: The first element added to the queue is always the first one to be removed.' },
      { term: 'Circular Queue', definition: 'A queue where array endpoints are conceptually linked in a ring, overcoming linear queue memory wastage.' },
      { term: 'Deque (Double-Ended Queue)', definition: 'A queue variant allowing insertion and deletion at both the front and the rear ends.' },
    ],
    keyConcepts: [
      'Circular Queue Full condition: (rear + 1) % Capacity == front.',
      'Circular Queue Empty condition: front == -1 (or front == rear in some implementations with count variable).',
      'Enqueue: rear = (rear + 1) % Capacity; queue[rear] = item.',
      'Dequeue: item = queue[front]; if (front == rear) { front = rear = -1; } else { front = (front + 1) % Capacity; }',
    ],
    example: {
      type: 'code',
      title: 'Circular Queue Array Implementation in C',
      language: 'c',
      code: `#define SIZE 5
int queue[SIZE];
int front = -1, rear = -1;

int isFull() {
    return (front == (rear + 1) % SIZE);
}

int isEmpty() {
    return (front == -1);
}

void enqueue(int val) {
    if (isFull()) {
        printf("Queue Overflow!\\n");
        return;
    }
    if (isEmpty()) front = 0;
    rear = (rear + 1) % SIZE;
    queue[rear] = val;
}

int dequeue() {
    if (isEmpty()) {
        printf("Queue Underflow!\\n");
        return -1;
    }
    int val = queue[front];
    if (front == rear) {
        front = rear = -1; // Reset when last item removed
    } else {
        front = (front + 1) % SIZE;
    }
    return val;
}`,
      explanation: 'Demonstrates modulo arithmetic to wrap rear and front pointers around the array boundaries.',
    },
    commonInterviewQuestions: [
      {
        question: 'Why do we prefer Circular Queues over Linear Array Queues?',
        answer: 'In a linear array queue, once elements are dequeued, the front pointer moves forward, leaving empty array slots at the front that cannot be used by new enqueue operations (since rear reaches MAX-1). A circular queue reuses these freed positions by wrapping around via modulo arithmetic ((rear + 1) % MAX).',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Checking queue full condition in circular queue as rear == SIZE - 1.',
        correction: 'In a circular queue, rear may wrap around to index 0, 1, etc. The correct full check is (rear + 1) % SIZE == front.',
        why: 'Rear can be numerically smaller than front when wrapped.',
      },
    ],
    quickRevision: [
      'FIFO: Enqueue at Rear, Dequeue at Front. Both O(1).',
      'Circular queue overcomes linear queue false overflow.',
      'Full: (rear + 1) % SIZE == front.',
      'Used in CPU scheduling (Round Robin), print spooling, and BFS traversal.',
    ],
    practiceQuestions: [
      {
        id: 'ds-q-q1',
        question: 'In a circular queue implemented using an array of size 6, if front = 2 and rear = 1, the queue is:',
        options: ['Empty', 'Full', 'Contains 2 elements', 'In an invalid state'],
        correctOptionIndex: 1,
        explanation: 'Check full condition: (rear + 1) % SIZE = (1 + 1) % 6 = 2 % 6 = 2. Since (rear + 1) % 6 equals front (2), the circular queue is completely FULL.',
      },
    ],
  },

  'ds-binary-tree': {
    topicId: 'ds-binary-tree',
    topicName: 'Binary Trees & Traversals (In/Pre/Post)',
    subjectId: 'data-structures',
    whatIsIt: 'A Binary Tree is a non-linear hierarchical data structure in which each parent node has at most two children, traditionally referred to as the left child and the right child.',
    simpleExplanation: 'Think of an inverted biological family tree where an ancestor branches out to at most two children. Each child can in turn be the root of their own two-child family tree.',
    technicalExplanation: 'Key binary tree properties for height h (root at level 0): Maximum nodes at level i = 2^i; Maximum total nodes for height h = 2^(h+1) - 1. Traversals systematically visit all N nodes: Depth-First Traversals: Inorder (Left, Root, Right), Preorder (Root, Left, Right), Postorder (Left, Right, Root). Breadth-First: Level-order traversal using a FIFO queue. For any Binary Search Tree, Inorder traversal ALWAYS yields nodes in strictly sorted ascending order.',
    importantDefinitions: [
      { term: 'Full Binary Tree', definition: 'A binary tree in which every node has either 0 or 2 children (no node has exactly 1 child).' },
      { term: 'Complete Binary Tree', definition: 'A binary tree in which all levels are completely filled except possibly the last level, where all keys are as far left as possible.' },
      { term: 'Perfect Binary Tree', definition: 'A binary tree where all internal nodes have two children and all leaf nodes reside at the exact same depth.' },
    ],
    keyConcepts: [
      'Inorder Traversal: Left Subtree → Root → Right Subtree.',
      'Preorder Traversal: Root → Left Subtree → Right Subtree.',
      'Postorder Traversal: Left Subtree → Right Subtree → Root.',
      'Tree Reconstruction: A binary tree can be uniquely reconstructed if given: (Inorder + Preorder) OR (Inorder + Postorder). Preorder + Postorder alone CANNOT uniquely determine a general binary tree.',
    ],
    example: {
      type: 'diagram',
      title: 'Binary Tree & Traversals Representation',
      explanation: 'Binary tree with nodes 1, 2, 3, 4, 5 and its traversal outputs.',
      diagramAscii: `
           1
         /   \\
        2     3
       / \\
      4   5

Inorder Traversal (L -> Root -> R):    4, 2, 5, 1, 3
Preorder Traversal (Root -> L -> R):   1, 2, 4, 5, 3
Postorder Traversal (L -> R -> Root):  4, 5, 2, 3, 1
Level-order Traversal (BFS):           1, 2, 3, 4, 5
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'Can you uniquely construct a binary tree given its Preorder and Postorder traversals?',
        answer: 'In general, NO. Preorder and Postorder traversals alone cannot distinguish whether a single child is a left child or a right child. For example, a tree with Root 1 and Left Child 2 has Preorder [1, 2] and Postorder [2, 1]. A tree with Root 1 and Right Child 2 also has Preorder [1, 2] and Postorder [2, 1]. However, if the tree is guaranteed to be a Strict/Full Binary Tree, it CAN be uniquely constructed.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Thinking Complete Binary Tree and Full Binary Tree mean the same thing.',
        correction: 'Full Binary Tree requires every node to have 0 or 2 children. Complete Binary Tree requires all levels to be filled except the last, filled from left to right.',
        why: 'A tree can be full without being complete, or complete without being full.',
      },
    ],
    quickRevision: [
      'Inorder: L-Root-R; Preorder: Root-L-R; Postorder: L-R-Root.',
      'BST Inorder is ALWAYS sorted in ascending order.',
      'Reconstruction needs Inorder + (Preorder or Postorder).',
      'Max nodes in binary tree of height h is 2^(h+1) - 1.',
    ],
    practiceQuestions: [
      {
        id: 'ds-bt-q1',
        question: 'If the Inorder traversal of a binary search tree is [3, 7, 9, 12, 15, 20], what can be said about the elements?',
        options: ['Root must be 12', 'Elements are automatically in ascending sorted order', 'The tree is definitely balanced', 'The height is at least 6'],
        correctOptionIndex: 1,
        explanation: 'Inorder traversal of ANY valid Binary Search Tree is always sorted in ascending order.',
      },
    ],
  },

  'ds-avl': {
    topicId: 'ds-avl',
    topicName: 'AVL Trees & Rotations (LL, RR, LR, RL)',
    subjectId: 'data-structures',
    whatIsIt: 'An AVL tree is a self-balancing binary search tree where the difference between heights of left and right subtrees (the Balance Factor) for every node is strictly -1, 0, or +1.',
    simpleExplanation: 'Imagine a playground see-saw. If too many children sit on the left side, the see-saw tips over. An AVL tree detects whenever one side becomes more than one step heavier than the other, and automatically performs a quick mechanical pivot (rotation) to restore balance so searching never becomes sluggish.',
    technicalExplanation: 'Balance Factor: BF(node) = Height(left_subtree) - Height(right_subtree). Allowed BF values: {-1, 0, +1}. When an insertion or deletion results in BF = ±2, the tree balances itself via one of 4 rotation cases: 1. LL Case: Right Rotation on node. 2. RR Case: Left Rotation on node. 3. LR Case: Left Rotation on left child, then Right Rotation on node. 4. RL Case: Right Rotation on right child, then Left Rotation on node. Guaranteed worst-case search, insertion, and deletion time is O(log n).',
    importantDefinitions: [
      { term: 'Balance Factor (BF)', definition: 'The height of the left subtree minus the height of the right subtree of a given node.' },
      { term: 'LL Rotation', definition: 'Single right rotation performed when a new node is inserted into the Left subtree of the Left child.' },
      { term: 'RR Rotation', definition: 'Single left rotation performed when a new node is inserted into the Right subtree of the Right child.' },
      { term: 'Double Rotation (LR / RL)', definition: 'Composite rotation involving two single rotations in opposite directions.' },
    ],
    keyConcepts: [
      'Maintains strictly O(log n) height in worst case, unlike unconstrained BST which can degrade into an O(n) skewed linked list.',
      'LL Imbalance -> Fix with Single Right Rotation.',
      'RR Imbalance -> Fix with Single Left Rotation.',
      'LR Imbalance -> Fix with Left-Right Double Rotation (Left on child, Right on root).',
      'RL Imbalance -> Fix with Right-Left Double Rotation (Right on child, Left on root).',
    ],
    example: {
      type: 'diagram',
      title: 'LL Rotation (Single Right Rotation)',
      explanation: 'Inserting 10 into [30 -> 20] creates an LL imbalance at node 30 (BF = +2). Single right rotation restores balance.',
      diagramAscii: `
      Before Rotation (Imbalanced at 30, BF = +2):
              30 (BF = +2)
             /
            20  (BF = +1)
           /
          10   (BF = 0)

      Apply Single RIGHT Rotation on 30:
              20 (BF = 0)
             /  \\
           10    30 (BF = 0)   --> Perfectly balanced AVL Tree!
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'Why choose a Red-Black Tree over an AVL Tree in practical libraries (like Java TreeMap, C++ std::map)?',
        answer: 'AVL trees are more strictly balanced than Red-Black trees (height bound ~1.44 log n vs ~2 log n). Therefore, AVL trees provide faster lookups. However, maintaining this strict balance requires more rotations during frequent insertions and deletions. Red-Black trees require at most 2 rotations on insertion and 3 on deletion, making them faster for write-heavy workloads.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Calculating Balance Factor as Right Height minus Left Height in some notes and Left minus Right in others.',
        correction: 'Either convention works as long as it is applied consistently, but the standard textbook formula is Height(Left) - Height(Right). Under this convention, positive means left-heavy, negative means right-heavy.',
        why: 'Inconsistency leads to picking the wrong rotation direction.',
      },
    ],
    quickRevision: [
      'AVL tree is height-balanced BST.',
      'Balance factor must be -1, 0, or +1.',
      '4 Rotations: LL (Right), RR (Left), LR (Left-Right), RL (Right-Left).',
      'Guarantees O(log n) search, insert, and delete.',
    ],
    practiceQuestions: [
      {
        id: 'ds-avl-q1',
        question: 'What is the maximum allowed difference between the heights of the left and right subtrees for any node in an AVL tree?',
        options: ['0', '1', '2', 'log n'],
        correctOptionIndex: 1,
        explanation: 'An AVL tree strictly restricts the height difference (balance factor) between left and right subtrees to at most 1 (i.e., -1, 0, or +1).',
      },
    ],
  },

  'ds-b-trees': {
    topicId: 'ds-b-trees',
    topicName: 'B-Tree, B+ Tree & B* Trees',
    subjectId: 'data-structures',
    whatIsIt: 'A B-Tree is a self-balancing m-way search tree specifically designed for disk storage systems, filesystems, and databases to minimize slow disk I/O operations.',
    simpleExplanation: 'Imagine a giant dictionary index. Instead of flipping one single page at a time (binary search tree), each page header contains 100 section tabs. In a single flip, you jump straight to the exact letter cluster, dramatically reducing the number of physical page turns (disk reads) needed to find a word.',
    technicalExplanation: 'In a B-Tree of order m: 1. Every internal node has at most m children. 2. Every internal node (except root) has at least ceil(m/2) children and ceil(m/2) - 1 keys. 3. All leaf nodes appear at the same depth. 4. In a standard B-Tree, keys and data pointers are stored in both internal and leaf nodes. In a B+ Tree, data pointers reside STRICTLY in leaf nodes, internal nodes store only router keys, and all leaf nodes are connected via a doubly linked list, enabling extremely efficient sequential range scans.',
    importantDefinitions: [
      { term: 'B-Tree Order (m)', definition: 'The maximum number of child pointers a node in the tree can possess.' },
      { term: 'B+ Tree', definition: 'A variant of B-Tree where keys and data pointers are stored exclusively at leaf level, and leaves are linked sequentially.' },
      { term: 'B* Tree', definition: 'A B-Tree variation where each internal node must be at least 2/3 full (rather than 1/2 full), delaying node splits by redistributing keys among siblings.' },
    ],
    keyConcepts: [
      'Disk Block Alignment: Node size is chosen to match the operating system disk block size (e.g., 4 KB or 8 KB), allowing a node containing hundreds of keys to be read in a single physical disk I/O.',
      'B-Tree vs B+ Tree: B+ tree leaves are linked, making range queries (SELECT WHERE age BETWEEN 20 AND 30) simple linked list traversals without backtracking.',
      'Splitting Rule: When an insertion overflows a node (> m-1 keys), the median key moves up to the parent node and the remaining keys split into two sibling nodes.',
    ],
    example: {
      type: 'diagram',
      title: 'B+ Tree Architecture with Leaf Chaining',
      explanation: 'Internal nodes act as indices; leaf nodes store records and link to each other for range scans.',
      diagramAscii: `
                    [ 50 ]                   <-- Root (Internal Router)
                   /      \\
             [ 25 ]        [ 75 ]            <-- Level 1 Internal Routers
            /      \\      /      \\
        [10, 20] -> [30, 40] -> [60, 70] -> [80, 90]  <-- Leaf Nodes (Contain Records + Doubly Linked!)
          ===========================================>
                   Fast Sequential Range Scan
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'Why do database systems like MySQL (InnoDB) and PostgreSQL use B+ Trees instead of standard B-Trees or Binary Search Trees?',
        answer: '1. Disk I/O efficiency: B+ trees have very high fanout (order m > 100), keeping tree height very low (3-4 levels for millions of records). 2. Range queries: Since all records reside in leaves connected by linked lists, range scans can traverse the leaves sequentially without traversing up and down the tree. 3. More keys per index block: Because internal nodes do not store actual data records, they hold far more routing keys per disk block.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming "B" in B-Tree stands for Binary.',
        correction: 'B stands for Balanced (or Bayer, Boeing). B-Trees are M-WAY search trees, NOT binary trees.',
        why: 'Nodes have up to m children, where m is typically 100+ in production databases.',
      },
    ],
    quickRevision: [
      'B-Tree is self-balancing multiway search tree for secondary storage.',
      'All leaf nodes are at the exact same depth.',
      'B+ Tree stores data only at leaves and links leaves for sequential scans.',
      'Minimizes disk read operations compared to binary trees.',
    ],
    practiceQuestions: [
      {
        id: 'ds-btree-q1',
        question: 'In a B-Tree of order 5, what is the maximum number of keys an internal node can hold?',
        options: ['5', '4', '3', '2'],
        correctOptionIndex: 1,
        explanation: 'For a B-tree of order m, the maximum number of children is m, and the maximum number of keys in any node is m - 1. Here, 5 - 1 = 4 keys.',
      },
    ],
  },

  'ds-sorting': {
    topicId: 'ds-sorting',
    topicName: 'Sorting Algorithms & Asymptotics',
    subjectId: 'data-structures',
    whatIsIt: 'Sorting algorithms arrange elements of a list in a systematic order (numerical or lexicographical), optimizing subsequent search and retrieval operations.',
    simpleExplanation: 'Organizing playing cards in your hand. You might scan for the smallest card and put it first (Selection Sort), or pick up each card one by one and insert it into its correct spot among the already ordered cards (Insertion Sort).',
    technicalExplanation: 'Sorting algorithms are evaluated by Time Complexity (Best, Average, Worst), Auxiliary Space Complexity, and Stability (preserving original relative order of equal keys). Comparison-based sorts have a proven lower bound of Omega(n log n). QuickSort uses Divide-and-Conquer with a pivot; MergeSort divides into halves and merges in linear time; HeapSort builds a binary max-heap and repeatedly extracts the root.',
    importantDefinitions: [
      { term: 'Stability', definition: 'A sorting algorithm is stable if two objects with equal keys appear in the same relative order in the sorted output as in the input.' },
      { term: 'In-Place Sorting', definition: 'An algorithm that sorts the input using only O(1) or O(log n) auxiliary memory beyond the original array.' },
      { term: 'Divide and Conquer', definition: 'Algorithmic paradigm that breaks a problem into smaller subproblems, solves them recursively, and combines the results (MergeSort, QuickSort).' },
    ],
    keyConcepts: [
      'MergeSort: Time = O(n log n) in all cases (Best, Avg, Worst). Space = O(n). Stable.',
      'QuickSort: Time = O(n log n) Best/Avg, O(n^2) Worst (when array is already sorted and first/last element picked as pivot). Space = O(log n) call stack. Unstable.',
      'HeapSort: Time = O(n log n) in all cases. Space = O(1) in-place. Unstable.',
      'InsertionSort: Time = O(n) Best (already sorted), O(n^2) Worst. Space = O(1). Stable. Excellent for small or nearly-sorted datasets.',
    ],
    example: {
      type: 'text',
      title: 'Master Sorting Complexity Reference Matrix',
      explanation: 'Comparison of all major sorting algorithms tested in MCA entrance exams.',
      output: `Algorithm      Best Time     Avg Time      Worst Time    Space     Stable?
-------------------------------------------------------------------------
Bubble Sort    O(n)          O(n^2)        O(n^2)        O(1)      Yes
Insertion Sort O(n)          O(n^2)        O(n^2)        O(1)      Yes
Selection Sort O(n^2)        O(n^2)        O(n^2)        O(1)      No
Merge Sort     O(n log n)    O(n log n)    O(n log n)    O(n)      Yes
Quick Sort     O(n log n)    O(n log n)    O(n^2)        O(log n)  No
Heap Sort      O(n log n)    O(n log n)    O(n log n)    O(1)      No`,
    },
    commonInterviewQuestions: [
      {
        question: 'Under what conditions does QuickSort degrade to O(n^2) time complexity, and how can this be prevented?',
        answer: 'QuickSort degrades to O(n^2) when the partitioning is maximally unbalanced at every recursive level (e.g. array is already sorted in ascending or descending order, and the first or last element is consistently chosen as the pivot). To prevent this, use Randomized Pivot Selection (Randomized QuickSort) or Median-of-Three pivot selection (median of first, middle, and last elements).',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Believing MergeSort is an in-place sort.',
        correction: 'Standard array-based MergeSort requires an auxiliary array of size O(n) to merge two sorted halves.',
        why: 'Merging two contiguous halves without extra memory requires shifting elements, which increases time complexity to O(n^2).',
      },
    ],
    quickRevision: [
      'MergeSort: Guaranteed O(n log n), O(n) space, stable.',
      'QuickSort: Fast in practice, O(n log n) avg, O(n^2) worst, unstable.',
      'HeapSort: O(n log n) all cases, in-place O(1) space, unstable.',
      'Comparison-based sorting lower bound is Omega(n log n).',
    ],
    practiceQuestions: [
      {
        id: 'ds-sort-q1',
        question: 'Which of the following sorting algorithms is guaranteed to run in O(n log n) time in the WORST case while using O(1) auxiliary space?',
        options: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Insertion Sort'],
        correctOptionIndex: 2,
        explanation: 'HeapSort runs in O(n log n) worst-case time by building a binary heap in-place within the array and repeatedly extracting the root, using only O(1) auxiliary memory.',
      },
    ],
  },
};
