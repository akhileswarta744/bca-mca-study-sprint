import { Subject, TopicMeta } from '../types';

export const SUBJECTS: Subject[] = [
  // 1. CORE COMPUTER (From Computer section of syllabus)
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    category: 'core-computer',
    categoryLabel: 'CORE COMPUTER',
    description: 'System software managing hardware, concurrency, processes, memory virtualization, CPU scheduling, deadlocks, and file systems.',
    icon: 'Cpu',
    badgeColor: 'indigo',
    syllabusNote: 'Part of Core Computer section from CUET PG Syllabus',
    isFromCuetSyllabus: true,
    topicCount: 17,
  },
  {
    id: 'data-structures',
    name: 'Data Structures & Algorithms',
    category: 'core-computer',
    categoryLabel: 'CORE COMPUTER',
    description: 'Linear and non-linear memory organizations, trees, balanced search trees, graph algorithms, asymptotic complexity, hashing, and recursion.',
    icon: 'Binary',
    badgeColor: 'sky',
    syllabusNote: 'Part of Core Computer section from CUET PG Syllabus',
    isFromCuetSyllabus: true,
    topicCount: 23,
  },
  {
    id: 'digital-fundamentals',
    name: 'Digital Fundamentals',
    category: 'core-computer',
    categoryLabel: 'CORE COMPUTER',
    description: 'Number representations, binary arithmetic, Boolean algebra, K-map minimization, combinational logic, flip-flops, registers, and memory units.',
    icon: 'Zap',
    badgeColor: 'amber',
    syllabusNote: 'Part of Core Computer section from CUET PG Syllabus',
    isFromCuetSyllabus: true,
    topicCount: 25,
  },

  // 2. ADDITIONAL BCA CORE REVISION
  {
    id: 'dbms',
    name: 'DBMS',
    category: 'additional-bca-core',
    categoryLabel: 'ADDITIONAL BCA CORE REVISION',
    description: 'Relational database architecture, ER modeling, functional dependencies, 1NF to BCNF normalization, ACID transactions, and indexing structures.',
    icon: 'Database',
    badgeColor: 'emerald',
    syllabusNote: 'Additional BCA Core Revision — Essential for MCA Entrance & Technical Interviews (Not part of supplied CUET PG syllabus)',
    isFromCuetSyllabus: false,
    topicCount: 18,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'additional-bca-core',
    categoryLabel: 'ADDITIONAL BCA CORE REVISION',
    description: 'Structured Query Language: DDL, DML, DQL, TCL commands, complex multi-table joins, subqueries, grouping, aggregate operations, and constraints.',
    icon: 'FileCode2',
    badgeColor: 'teal',
    syllabusNote: 'Additional BCA Core Revision — Essential for MCA Entrance & Technical Interviews (Not part of supplied CUET PG syllabus)',
    isFromCuetSyllabus: false,
    topicCount: 17,
  },
  {
    id: 'java',
    name: 'Java (Core & OOP)',
    category: 'additional-bca-core',
    categoryLabel: 'ADDITIONAL BCA CORE REVISION',
    description: 'JVM architecture, bytecode, type system, robust OOP (encapsulation, inheritance, polymorphism, abstraction), interfaces, exception handling, and collections.',
    icon: 'Coffee',
    badgeColor: 'orange',
    syllabusNote: 'Additional BCA Core Revision — Essential for MCA Entrance & Technical Interviews (Not part of supplied CUET PG syllabus)',
    isFromCuetSyllabus: false,
    topicCount: 22,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'additional-bca-core',
    categoryLabel: 'ADDITIONAL BCA CORE REVISION',
    description: 'Python syntax, dynamic typing, list/dict/set comprehensions, slicing, lambda functions, modular programming, exception handling, and OOP paradigms.',
    icon: 'Terminal',
    badgeColor: 'yellow',
    syllabusNote: 'Additional BCA Core Revision — Essential for MCA Entrance & Technical Interviews (Not part of supplied CUET PG syllabus)',
    isFromCuetSyllabus: false,
    topicCount: 16,
  },
  {
    id: 'computer-networks',
    name: 'Computer Networks',
    category: 'additional-bca-core',
    categoryLabel: 'ADDITIONAL BCA CORE REVISION',
    description: 'OSI 7-layer and TCP/IP models, packet routing, IP addressing (IPv4/IPv6, subnetting), transport protocols (TCP/UDP), DNS, HTTP/HTTPS, and network security.',
    icon: 'Network',
    badgeColor: 'violet',
    syllabusNote: 'Additional BCA Core Revision — Essential for MCA Entrance & Technical Interviews (Not part of supplied CUET PG syllabus)',
    isFromCuetSyllabus: false,
    topicCount: 20,
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    category: 'additional-bca-core',
    categoryLabel: 'ADDITIONAL BCA CORE REVISION',
    description: 'Software development life cycles (SDLC), Waterfall, Agile, Scrum ceremonies, requirements engineering, testing pyramids, maintenance, and git version control.',
    icon: 'Layers',
    badgeColor: 'rose',
    syllabusNote: 'Additional BCA Core Revision — Essential for MCA Entrance & Technical Interviews (Not part of supplied CUET PG syllabus)',
    isFromCuetSyllabus: false,
    topicCount: 16,
  },
];

export const TOPICS_META: TopicMeta[] = [
  // DAY 1: Operating Systems — Fundamentals
  { id: 'os-functions', subjectId: 'operating-systems', name: 'OS Functions & Architecture', dayNumber: 1, difficulty: 'Easy', estimatedMinutes: 30, keywords: ['kernel', 'system calls', 'dual-mode', 'user mode', 'kernel mode'] },
  { id: 'os-processes', subjectId: 'operating-systems', name: 'Processes & Process Control Block (PCB)', dayNumber: 1, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['process states', 'pcb', 'context switch', 'fork'] },
  { id: 'os-threads', subjectId: 'operating-systems', name: 'Threads & Multithreading Models', dayNumber: 1, difficulty: 'Medium', estimatedMinutes: 35, keywords: ['user threads', 'kernel threads', 'multithreading', 'hyperthreading'] },
  { id: 'os-ipc', subjectId: 'operating-systems', name: 'Inter-Process Communication (IPC)', dayNumber: 1, difficulty: 'Medium', estimatedMinutes: 35, keywords: ['shared memory', 'message queues', 'pipes', 'sockets'] },
  { id: 'os-concurrency', subjectId: 'operating-systems', name: 'Concurrency & Race Conditions', dayNumber: 1, difficulty: 'Hard', estimatedMinutes: 40, keywords: ['race condition', 'critical section', 'mutual exclusion', 'atomic operations'] },

  // DAY 2: Operating Systems — Advanced
  { id: 'os-sync', subjectId: 'operating-systems', name: 'Process Synchronization & Semaphores', dayNumber: 2, difficulty: 'Hard', estimatedMinutes: 45, keywords: ['semaphores', 'mutex', 'monitors', 'peterson algorithm', 'producers consumers'] },
  { id: 'os-deadlock', subjectId: 'operating-systems', name: 'Deadlock Conditions & Prevention', dayNumber: 2, difficulty: 'Hard', estimatedMinutes: 40, keywords: ['coffman conditions', 'mutual exclusion', 'hold and wait', 'no preemption', 'circular wait'] },
  { id: 'os-bankers', subjectId: 'operating-systems', name: "Banker's Algorithm & Deadlock Avoidance", dayNumber: 2, difficulty: 'Hard', estimatedMinutes: 45, keywords: ['safe state', 'allocation matrix', 'need matrix', 'available vector'] },
  { id: 'os-cpu-scheduling', subjectId: 'operating-systems', name: 'CPU Scheduling Algorithms', dayNumber: 2, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['FCFS', 'SJF', 'SRTF', 'Round Robin', 'Priority Scheduling', 'turnaround time'] },
  { id: 'os-io-resource-sched', subjectId: 'operating-systems', name: 'I/O & Resource Scheduling', dayNumber: 2, difficulty: 'Medium', estimatedMinutes: 30, keywords: ['disk scheduling', 'SCAN', 'C-SCAN', 'SSTF', 'LOOK', 'device controller'] },
  { id: 'os-memory-mgmt', subjectId: 'operating-systems', name: 'Memory Management & Paging', dayNumber: 2, difficulty: 'Hard', estimatedMinutes: 45, keywords: ['paging', 'page table', 'TLB', 'segmentation', 'internal fragmentation', 'external fragmentation'] },
  { id: 'os-virtual-memory', subjectId: 'operating-systems', name: 'Virtual Memory & Page Replacement', dayNumber: 2, difficulty: 'Hard', estimatedMinutes: 45, keywords: ['demand paging', 'FIFO', 'LRU', 'Optimal', "Belady's anomaly", 'thrashing'] },
  { id: 'os-file-systems', subjectId: 'operating-systems', name: 'File Systems & Directory Structures', dayNumber: 2, difficulty: 'Medium', estimatedMinutes: 35, keywords: ['inodes', 'allocation methods', 'contiguous', 'linked', 'indexed'] },
  { id: 'os-dos-unix-win', subjectId: 'operating-systems', name: 'DOS, UNIX & Windows OS Architectures', dayNumber: 2, difficulty: 'Easy', estimatedMinutes: 30, keywords: ['DOS', 'UNIX kernel', 'monolithic vs microkernel', 'Windows NT architecture'] },

  // DAY 3: Data Structures — Basics
  { id: 'ds-arrays', subjectId: 'data-structures', name: 'Arrays & Memory Mapping (Row/Col Major)', dayNumber: 3, difficulty: 'Easy', estimatedMinutes: 35, keywords: ['1D array', '2D array', 'row-major', 'col-major formula', 'address calculation'] },
  { id: 'ds-sparse-matrix', subjectId: 'data-structures', name: 'Sparse Matrix Representation', dayNumber: 3, difficulty: 'Medium', estimatedMinutes: 30, keywords: ['3-tuple format', 'triplet representation', 'CSR', 'linked list sparse'] },
  { id: 'ds-stacks', subjectId: 'data-structures', name: 'Stacks & Expression Conversion', dayNumber: 3, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['LIFO', 'push', 'pop', 'infix to postfix', 'postfix evaluation', 'stack overflow'] },
  { id: 'ds-queues', subjectId: 'data-structures', name: 'Queues & Circular Queues', dayNumber: 3, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['FIFO', 'front', 'rear', 'circular queue formula', 'deque', 'modulo arithmetic'] },
  { id: 'ds-priority-queues', subjectId: 'data-structures', name: 'Priority Queues & Binary Heaps', dayNumber: 3, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['min-heap', 'max-heap', 'heapify', 'priority queue', 'extract-min'] },
  { id: 'ds-linked-lists', subjectId: 'data-structures', name: 'Singly, Doubly & Circular Linked Lists', dayNumber: 3, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['nodes', 'pointer manipulation', 'doubly linked list', 'cycle detection', 'Floyd algorithm'] },

  // DAY 4: Data Structures — Trees & Graphs
  { id: 'ds-trees', subjectId: 'data-structures', name: 'Trees & Forest Representation', dayNumber: 4, difficulty: 'Medium', estimatedMinutes: 35, keywords: ['root', 'height', 'depth', 'degree', 'forest to binary tree conversion'] },
  { id: 'ds-binary-tree', subjectId: 'data-structures', name: 'Binary Trees & Traversals (In/Pre/Post)', dayNumber: 4, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['inorder', 'preorder', 'postorder', 'level-order', 'complete binary tree', 'full binary tree'] },
  { id: 'ds-threaded-bt', subjectId: 'data-structures', name: 'Threaded Binary Trees', dayNumber: 4, difficulty: 'Hard', estimatedMinutes: 35, keywords: ['null pointers to inorder predecessors/successors', 'single threaded', 'double threaded'] },
  { id: 'ds-bst', subjectId: 'data-structures', name: 'Binary Search Trees (BST)', dayNumber: 4, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['BST property', 'insertion', 'deletion cases', 'inorder successor', 'search complexity'] },
  { id: 'ds-avl', subjectId: 'data-structures', name: 'AVL Trees & Rotations (LL, RR, LR, RL)', dayNumber: 4, difficulty: 'Hard', estimatedMinutes: 50, keywords: ['balance factor', 'height balanced', 'LL rotation', 'RR rotation', 'LR rotation', 'RL rotation'] },
  { id: 'ds-b-trees', subjectId: 'data-structures', name: 'B-Tree, B+ Tree & B* Trees', dayNumber: 4, difficulty: 'Hard', estimatedMinutes: 50, keywords: ['multiway search tree', 'm-way tree', 'disk storage', 'leaf node chaining', 'B+ tree index'] },
  { id: 'ds-sets', subjectId: 'data-structures', name: 'Data Structures for Sets & Disjoint Sets', dayNumber: 4, difficulty: 'Medium', estimatedMinutes: 35, keywords: ['disjoint set union', 'find with path compression', 'union by rank'] },
  { id: 'ds-graphs', subjectId: 'data-structures', name: 'Graphs: Adjacency, BFS, DFS & Spanning Trees', dayNumber: 4, difficulty: 'Hard', estimatedMinutes: 55, keywords: ['adjacency matrix', 'adjacency list', 'BFS queue', 'DFS recursion', 'Kruskal', 'Prim', 'Dijkstra'] },

  // DAY 5: Data Structures — Algorithms
  { id: 'ds-sorting', subjectId: 'data-structures', name: 'Sorting Algorithms & Asymptotics', dayNumber: 5, difficulty: 'Medium', estimatedMinutes: 50, keywords: ['Bubble', 'Insertion', 'Selection', 'MergeSort', 'QuickSort', 'HeapSort', 'Time complexity O(nlogn)'] },
  { id: 'ds-searching', subjectId: 'data-structures', name: 'Searching Algorithms (Linear, Binary Search)', dayNumber: 5, difficulty: 'Easy', estimatedMinutes: 30, keywords: ['linear search O(n)', 'binary search O(log n)', 'sorted prerequisite'] },
  { id: 'ds-hashing', subjectId: 'data-structures', name: 'Hashing, Hash Functions & Collision Resolution', dayNumber: 5, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['hash table', 'direct addressing', 'chaining', 'linear probing', 'quadratic probing', 'double hashing'] },
  { id: 'ds-recursion-params', subjectId: 'data-structures', name: 'Functions, Recursion & Parameter Passing', dayNumber: 5, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['call stack', 'activation record', 'pass-by-value', 'pass-by-reference', 'tail recursion'] },

  // DAY 6: Digital Fundamentals — Number Systems & Arithmetic
  { id: 'df-data-types', subjectId: 'digital-fundamentals', name: 'Data Types & Number Systems', dayNumber: 6, difficulty: 'Easy', estimatedMinutes: 35, keywords: ['binary', 'octal', 'decimal', 'hexadecimal', 'radix base'] },
  { id: 'df-conversions', subjectId: 'digital-fundamentals', name: 'Number System Conversions', dayNumber: 6, difficulty: 'Easy', estimatedMinutes: 40, keywords: ['base 10 to base 2/8/16', 'fractional conversion', 'successive division', 'grouping 3 and 4 bits'] },
  { id: 'df-complements', subjectId: 'digital-fundamentals', name: "1's, 2's, 9's & 10's Complements", dayNumber: 6, difficulty: 'Medium', estimatedMinutes: 40, keywords: ["r's complement", "(r-1)'s complement", "subtraction using 2's complement", "overflow flag"] },
  { id: 'df-fixed-floating', subjectId: 'digital-fundamentals', name: 'Fixed-Point & Floating-Point Representation', dayNumber: 6, difficulty: 'Hard', estimatedMinutes: 45, keywords: ['IEEE 754 standard', 'single precision 32-bit', 'double precision 64-bit', 'sign bit', 'exponent bias 127', 'mantissa'] },
  { id: 'df-error-codes', subjectId: 'digital-fundamentals', name: 'Error Detection & Correction Codes (Parity, Hamming)', dayNumber: 6, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['parity bit', 'even/odd parity', 'Hamming code 7-4', 'Hamming distance', 'CRC'] },
  { id: 'df-computer-arithmetic', subjectId: 'digital-fundamentals', name: 'Computer Arithmetic & Booths Algorithm', dayNumber: 6, difficulty: 'Hard', estimatedMinutes: 45, keywords: ["binary addition", "overflow detection", "Booth's multiplication algorithm", "restoring division"] },

  // DAY 7: Digital Fundamentals — Logic & Circuits
  { id: 'df-logic-gates', subjectId: 'digital-fundamentals', name: 'Logic Gates & Universal Gates (NAND, NOR)', dayNumber: 7, difficulty: 'Easy', estimatedMinutes: 35, keywords: ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR', 'universal gates implementation'] },
  { id: 'df-boolean-algebra', subjectId: 'digital-fundamentals', name: 'Boolean Algebra Laws & De Morgans Theorems', dayNumber: 7, difficulty: 'Medium', estimatedMinutes: 40, keywords: ["De Morgan's laws", "idempotent", "distributive", "consensus theorem", "duality principle"] },
  { id: 'df-k-maps', subjectId: 'digital-fundamentals', name: 'K-Map Simplification (2, 3, 4 Variables & Don’t Cares)', dayNumber: 7, difficulty: 'Hard', estimatedMinutes: 50, keywords: ['SOP', 'POS', 'Gray code ordering', 'minterms', 'maxterms', 'don’t care conditions X', 'quads', 'octets'] },
  { id: 'df-combinational', subjectId: 'digital-fundamentals', name: 'Combinational Circuits: Adders & Subtractors', dayNumber: 7, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['half adder', 'full adder', 'half subtractor', 'full subtractor', 'ripple carry adder'] },
  { id: 'df-decoders-mux', subjectId: 'digital-fundamentals', name: 'Decoders, Encoders, Multiplexers (MUX) & Demux', dayNumber: 7, difficulty: 'Hard', estimatedMinutes: 45, keywords: ['2-to-4 decoder', '3-to-8 decoder with enable', 'priority encoder', '4-to-1 MUX', 'implementing logic with MUX'] },
  { id: 'df-flip-flops', subjectId: 'digital-fundamentals', name: 'Flip-Flops (SR, JK, D, T & Master-Slave)', dayNumber: 7, difficulty: 'Hard', estimatedMinutes: 50, keywords: ['latches vs flip-flops', 'SR flip flop', 'JK race around condition', 'Master-Slave JK', 'D flip flop', 'T flip flop'] },
  { id: 'df-registers-counters', subjectId: 'digital-fundamentals', name: 'Registers & Counters (Synchronous vs Asynchronous)', dayNumber: 7, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['SISO', 'SIPO', 'PIPO', 'shift registers', 'ripple counter', 'synchronous counter', 'MOD-N counter', 'ring counter'] },
  { id: 'df-memory-unit', subjectId: 'digital-fundamentals', name: 'Memory Units (RAM, ROM, SRAM, DRAM)', dayNumber: 7, difficulty: 'Medium', estimatedMinutes: 35, keywords: ['SRAM flip-flop based', 'DRAM capacitor refresh', 'ROM', 'PROM', 'EPROM', 'EEPROM', 'Flash'] },

  // DAY 8: DBMS
  { id: 'dbms-fundamentals', subjectId: 'dbms', name: 'Database Fundamentals & 3-Tier Architecture', dayNumber: 8, difficulty: 'Easy', estimatedMinutes: 35, keywords: ['ANSI-SPARC 3-tier architecture', 'physical level', 'conceptual level', 'external level', 'data independence'] },
  { id: 'dbms-keys', subjectId: 'dbms', name: 'Relational Keys (Primary, Foreign, Candidate, Super)', dayNumber: 8, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['super key', 'candidate key', 'primary key', 'alternate key', 'foreign key', 'referential integrity'] },
  { id: 'dbms-er-model', subjectId: 'dbms', name: 'Entity-Relationship (ER) Modeling', dayNumber: 8, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['entity set', 'strong vs weak entity', 'attributes: composite/multivalued/derived', 'cardinality ratios 1:1, 1:N, M:N'] },
  { id: 'dbms-normalization', subjectId: 'dbms', name: 'Normalization (1NF, 2NF, 3NF, BCNF)', dayNumber: 8, difficulty: 'Hard', estimatedMinutes: 55, keywords: ['functional dependency', 'partial dependency', 'transitive dependency', '1NF atomic', '2NF no partial', '3NF non-prime not depending on non-prime', 'BCNF superkey'] },
  { id: 'dbms-transactions-acid', subjectId: 'dbms', name: 'Transactions & ACID Properties', dayNumber: 8, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'commit', 'rollback', 'transaction states'] },
  { id: 'dbms-indexing', subjectId: 'dbms', name: 'Database Indexing & B-Trees in RDBMS', dayNumber: 8, difficulty: 'Hard', estimatedMinutes: 45, keywords: ['clustered index', 'non-clustered index', 'B+ tree indexing', 'dense index', 'sparse index', 'hashing index'] },

  // DAY 9: SQL
  { id: 'sql-sublanguages', subjectId: 'sql', name: 'SQL Sublanguages (DDL, DML, DQL, DCL, TCL)', dayNumber: 9, difficulty: 'Easy', estimatedMinutes: 35, keywords: ['DDL CREATE/ALTER/DROP', 'DML INSERT/UPDATE/DELETE', 'DQL SELECT', 'DCL GRANT/REVOKE', 'TCL COMMIT/ROLLBACK'] },
  { id: 'sql-queries-filtering', subjectId: 'sql', name: 'SELECT, WHERE, ORDER BY, GROUP BY & HAVING', dayNumber: 9, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['SELECT DISTINCT', 'WHERE conditions', 'LIKE wildcards', 'ORDER BY ASC/DESC', 'GROUP BY aggregate', 'HAVING vs WHERE filter'] },
  { id: 'sql-dml-ddl-ops', subjectId: 'sql', name: 'INSERT, UPDATE, DELETE vs ALTER, DROP, TRUNCATE', dayNumber: 9, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['DELETE row by row with rollback', 'TRUNCATE deallocates pages fast', 'DROP destroys schema', 'ALTER table modify columns'] },
  { id: 'sql-joins', subjectId: 'sql', name: 'SQL Joins (INNER, LEFT, RIGHT, FULL, CROSS, SELF)', dayNumber: 9, difficulty: 'Hard', estimatedMinutes: 50, keywords: ['INNER JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'FULL OUTER JOIN', 'CROSS JOIN cartesian', 'SELF JOIN employee manager'] },
  { id: 'sql-subqueries-agg', subjectId: 'sql', name: 'Subqueries, Correlated Subqueries & Aggregations', dayNumber: 9, difficulty: 'Hard', estimatedMinutes: 45, keywords: ['COUNT, SUM, AVG, MIN, MAX', 'nested subquery', 'correlated subquery EXISTS', 'IN, ANY, ALL clauses'] },

  // DAY 10: Java — Core
  { id: 'java-fundamentals-jvm', subjectId: 'java', name: 'Java Architecture: JVM, JRE, JDK & Bytecode', dayNumber: 10, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['WORA Write Once Run Anywhere', 'bytecode .class', 'JVM memory structure', 'JIT compiler', 'garbage collection'] },
  { id: 'java-datatypes-operators', subjectId: 'java', name: 'Data Types, Type Casting & Operators', dayNumber: 10, difficulty: 'Easy', estimatedMinutes: 30, keywords: ['primitive types byte, short, int, long, float, double, char, boolean', 'widening vs narrowing casting', 'operators'] },
  { id: 'java-control-flow', subjectId: 'java', name: 'Control Flow, Loops & Arrays', dayNumber: 10, difficulty: 'Easy', estimatedMinutes: 35, keywords: ['if-else', 'switch-case', 'for, while, do-while', 'enhanced for-each', '1D and 2D arrays'] },
  { id: 'java-strings-methods', subjectId: 'java', name: 'Strings (String vs StringBuilder vs StringBuffer) & Methods', dayNumber: 10, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['String immutability', 'String Constant Pool SCP', 'StringBuilder non-sync fast', 'StringBuffer thread-safe', 'equals vs =='] },
  { id: 'java-constructors', subjectId: 'java', name: 'Constructors & Memory Allocation', dayNumber: 10, difficulty: 'Medium', estimatedMinutes: 35, keywords: ['default constructor', 'parameterized constructor', 'constructor chaining with this() and super()', 'new keyword heap'] },

  // DAY 11: Java — OOP
  { id: 'java-oop-principles', subjectId: 'java', name: 'Core OOP: Encapsulation, Inheritance & Abstraction', dayNumber: 11, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['data hiding getters/setters', 'extends keyword', 'single vs multilevel inheritance', 'no multiple inheritance with classes'] },
  { id: 'java-polymorphism', subjectId: 'java', name: 'Polymorphism: Overloading vs Overriding', dayNumber: 11, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['compile-time static polymorphism', 'method signature', 'runtime dynamic method dispatch', '@Override', 'virtual method table'] },
  { id: 'java-interfaces-abstract', subjectId: 'java', name: 'Interfaces vs Abstract Classes', dayNumber: 11, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['implements keyword', 'multiple interfaces', 'default and static methods in Java 8', 'abstract keyword', 'cannot instantiate'] },
  { id: 'java-exceptions-collections', subjectId: 'java', name: 'Exception Handling & Collections Basics', dayNumber: 11, difficulty: 'Hard', estimatedMinutes: 50, keywords: ['try-catch-finally', 'throw vs throws', 'checked vs unchecked exceptions', 'ArrayList, LinkedList, HashMap, HashSet'] },

  // DAY 12: Python
  { id: 'python-fundamentals', subjectId: 'python', name: 'Python Syntax, Dynamic Typing & Data Types', dayNumber: 12, difficulty: 'Easy', estimatedMinutes: 35, keywords: ['interpreted language', 'dynamic typing', 'PEP 8 indentation', 'type() and id()', 'int, float, complex, bool, str'] },
  { id: 'python-collections', subjectId: 'python', name: 'Lists, Tuples, Sets & Dictionaries', dayNumber: 12, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['list mutable []', 'tuple immutable ()', 'set unique unordered {}', 'dict key-value {}', 'hashable keys requirement'] },
  { id: 'python-slicing-comprehensions', subjectId: 'python', name: 'Slicing & Comprehensions', dayNumber: 12, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['seq[start:stop:step]', 'negative indices', 'list comprehension [x**2 for x in nums]', 'dict comprehension'] },
  { id: 'python-functions-lambda', subjectId: 'python', name: 'Functions, *args, **kwargs & Lambdas', dayNumber: 12, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['def keyword', 'positional vs keyword arguments', '*args tuple', '**kwargs dict', 'anonymous lambda functions', 'map, filter'] },
  { id: 'python-oop-exceptions', subjectId: 'python', name: 'Python OOP Basics & Exception Handling', dayNumber: 12, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['class, __init__, self parameter', 'dunder methods', 'try-except-else-finally', 'raise Exception', 'inheritance super()'] },

  // DAY 13: Computer Networks
  { id: 'cn-models', subjectId: 'computer-networks', name: 'Network Models: OSI 7-Layer vs TCP/IP 4-Layer', dayNumber: 13, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['Physical, Data Link, Network, Transport, Session, Presentation, Application', 'PDU names bits, frames, packets, segments, data', 'encapsulation'] },
  { id: 'cn-ip-addressing', subjectId: 'computer-networks', name: 'IP Addressing: IPv4 Classes, CIDR Subnetting & IPv6', dayNumber: 13, difficulty: 'Hard', estimatedMinutes: 50, keywords: ['Class A, B, C, D, E', 'subnet mask', 'CIDR notation /24', 'usable hosts formula 2^h - 2', 'IPv4 32-bit vs IPv6 128-bit hex'] },
  { id: 'cn-tcp-udp', subjectId: 'computer-networks', name: 'Transport Layer: TCP (3-Way Handshake) vs UDP', dayNumber: 13, difficulty: 'Hard', estimatedMinutes: 45, keywords: ['connection-oriented vs connectionless', 'SYN, SYN-ACK, ACK', 'flow control sliding window', 'congestion control', 'checksum', 'TCP vs UDP ports'] },
  { id: 'cn-application-protocols', subjectId: 'computer-networks', name: 'Application Protocols: HTTP, HTTPS, DNS & DHCP', dayNumber: 13, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['HTTP methods GET/POST', 'HTTPS TLS/SSL port 443', 'DNS hierarchical lookup port 53', 'DHCP DORA process port 67/68'] },
  { id: 'cn-devices-security', subjectId: 'computer-networks', name: 'Routing, Switching, Ports, Firewalls & Security', dayNumber: 13, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['Router layer 3 IP', 'Switch layer 2 MAC', 'Hub layer 1', 'port numbers 80, 443, 22, 21, 25', 'stateful firewalls', 'symmetric vs asymmetric cryptography'] },

  // DAY 14: Software Engineering
  { id: 'se-sdlc-models', subjectId: 'software-engineering', name: 'SDLC Phases, Waterfall Model & Spiral Model', dayNumber: 14, difficulty: 'Easy', estimatedMinutes: 35, keywords: ['Requirements, Design, Coding, Testing, Deployment, Maintenance', 'Waterfall sequential drawbacks', 'Spiral risk-driven iterations'] },
  { id: 'se-agile-scrum', subjectId: 'software-engineering', name: 'Agile Methodology & Scrum Framework', dayNumber: 14, difficulty: 'Medium', estimatedMinutes: 35, keywords: ['Agile manifesto', 'Sprints 2-4 weeks', 'Product Owner, Scrum Master, Team', 'daily standup, sprint review, retrospective', 'user stories'] },
  { id: 'se-requirements-design', subjectId: 'software-engineering', name: 'Requirements Engineering & Software Design Principles', dayNumber: 14, difficulty: 'Medium', estimatedMinutes: 40, keywords: ['functional vs non-functional requirements SRS', 'cohesion (high desirable)', 'coupling (low desirable)', 'SOLID principles basics'] },
  { id: 'se-testing-pyramid', subjectId: 'software-engineering', name: 'Software Testing: Unit, Integration, System & Quality', dayNumber: 14, difficulty: 'Medium', estimatedMinutes: 45, keywords: ['Black-box vs White-box testing', 'Unit testing', 'Integration testing', 'System testing', 'Regression testing', 'Acceptance testing', 'Alpha/Beta', 'Git version control basics'] },

  // DAY 15: Full BCA Revision (Cross-subject synthesis)
  { id: 'rev-all-synthesis', subjectId: 'operating-systems', name: 'Comprehensive Cross-Subject Core Revision', dayNumber: 15, difficulty: 'Hard', estimatedMinutes: 90, keywords: ['full syllabus synthesis', 'formulas', 'asymptotics table', 'difference matrices', 'cross-subject practice'] },

  // DAY 16: Final Revision & Mock Test
  { id: 'rev-final-mock', subjectId: 'data-structures', name: 'High-Yield Mock Examination & Weak-Spot Eradication', dayNumber: 16, difficulty: 'Hard', estimatedMinutes: 90, keywords: ['mock test', 'interview preparation', 'rapid review', 'final assessment'] },
];
