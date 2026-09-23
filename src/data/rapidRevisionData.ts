import { RapidRevisionData } from '../types';

export const RAPID_REVISION_DATA: Record<string, RapidRevisionData> = {
  'operating-systems': {
    subjectId: 'operating-systems',
    oneLineDefinitions: [
      { term: 'Kernel', definition: 'The core program of the OS in permanent resident RAM with complete hardware access.' },
      { term: 'Process', definition: 'A program in execution loaded with state, memory segments, and open descriptors.' },
      { term: 'Thread', definition: 'Lightweight unit of execution sharing memory space with peer threads in the same process.' },
      { term: 'PCB', definition: 'Process Control Block storing CPU registers, state, PID, and memory boundaries.' },
      { term: 'Deadlock', definition: 'Permanent circular blocking of processes where each holds a resource requested by another.' },
      { term: 'Paging', definition: 'Non-contiguous memory allocation dividing virtual memory into pages and RAM into frames.' },
      { term: 'Thrashing', definition: 'System spending virtually 100% of time swapping pages rather than executing application code.' },
    ],
    importantDifferences: [
      {
        conceptA: 'Process',
        conceptB: 'Thread',
        summary: 'Unit of resource allocation vs unit of CPU scheduling.',
        points: [
          { aspect: 'Address Space', a: 'Independent isolated virtual memory space', b: 'Shares address space, code, and data with peer threads' },
          { aspect: 'Creation Cost', a: 'Heavyweight (copies address space, file handles)', b: 'Lightweight (allocates only registers and stack)' },
          { aspect: 'Context Switch', a: 'Slow (requires TLB flushing and page table swaps)', b: 'Fast (swaps registers and stack pointer only)' },
          { aspect: 'Failure Impact', a: 'One crashed process does not crash other processes', b: 'One crashed thread can crash the entire host process' },
        ],
      },
      {
        conceptA: 'Preemptive Scheduling',
        conceptB: 'Non-Preemptive Scheduling',
        summary: 'Forcible CPU revocation vs voluntary CPU yield.',
        points: [
          { aspect: 'Interruption', a: 'OS can interrupt running process when higher priority arrives', b: 'Process runs until it completes or requests I/O' },
          { aspect: 'Examples', a: 'Round Robin, SRTF, Preemptive Priority', b: 'FCFS, Non-preemptive SJF' },
          { aspect: 'Responsiveness', a: 'High responsiveness, ideal for interactive time-sharing', b: 'Low responsiveness, can cause starvation/convoy effect' },
        ],
      },
      {
        conceptA: 'Internal Fragmentation',
        conceptB: 'External Fragmentation',
        summary: 'Wasted space inside allocation boundary vs wasted scattered holes outside.',
        points: [
          { aspect: 'Location', a: 'Inside the allocated block/page boundary', b: 'Outside between allocated variable memory chunks' },
          { aspect: 'Cause', a: 'Fixed-size allocation (e.g. 4KB pages when 1KB needed)', b: 'Variable-size allocation segments leaving non-contiguous gaps' },
          { aspect: 'Solution', a: 'Smaller page sizes (trade-off: larger page table)', b: 'Compaction or Paging' },
        ],
      },
    ],
    importantConcepts: [
      { title: 'Coffman 4 Conditions for Deadlock', points: ['Mutual Exclusion', 'Hold and Wait', 'No Preemption', 'Circular Wait (All 4 must hold simultaneously!)'] },
      { title: 'Critical Section 3 Requirements', points: ['Mutual Exclusion: At most 1 process inside', 'Progress: Waiting processes decide who enters next', 'Bounded Waiting: Finite limit on how many times others enter ahead'] },
      { title: 'Banker’s Safety Check', points: ['Work = Available', 'Find Pi such that Finish[i] == false and Need[i] <= Work', 'Work = Work + Allocation[i]; Finish[i] = true; repeat'] },
    ],
    commonInterviewQuestions: [
      { q: 'Why is context switching pure overhead?', a: 'Because the CPU does zero useful user execution while saving and restoring registers and flushing memory mappings.' },
      { q: 'What is Belady’s anomaly?', a: 'The phenomenon in FIFO page replacement where adding more page frames leads to more page faults.' },
    ],
    commonMistakes: [
      { trap: 'Believing child process shares parent variables after fork().', fix: 'Child gets a duplicate copy of memory space; modifications are independent.' },
      { trap: 'Calling wait(mutex) before wait(empty) in producer-consumer.', fix: 'Deadlock risk! Always wait on counting semaphore before the mutex.' },
    ],
  },

  'data-structures': {
    subjectId: 'data-structures',
    oneLineDefinitions: [
      { term: 'Array', definition: 'Contiguous linear collection with O(1) indexed random access.' },
      { term: 'Stack', definition: 'LIFO (Last In, First Out) linear structure with operations restricted to Top.' },
      { term: 'Queue', definition: 'FIFO (First In, First Out) linear structure with insert at rear and delete at front.' },
      { term: 'BST', definition: 'Binary Search Tree where left child < root < right child for all subtrees.' },
      { term: 'AVL Tree', definition: 'Self-balancing BST where height difference (balance factor) between subtrees is <= 1.' },
      { term: 'B+ Tree', definition: 'Multiway disk search tree where data records reside exclusively at linked leaf nodes.' },
      { term: 'Hash Table', definition: 'Key-value map computing array indices via hash function for average O(1) lookups.' },
    ],
    importantDifferences: [
      {
        conceptA: 'Array',
        conceptB: 'Linked List',
        summary: 'Contiguous fixed-size memory vs dynamic node-pointer chains.',
        points: [
          { aspect: 'Random Access', a: 'O(1) instant lookup by index A[i]', b: 'O(n) sequential traversal through node pointers' },
          { aspect: 'Insertion/Deletion', a: 'O(n) requires shifting elements', b: 'O(1) if pointer to node is already known' },
          { aspect: 'Memory Layout', a: 'Contiguous in RAM (great CPU cache locality)', b: 'Scattered in RAM with pointer overhead per node' },
        ],
      },
      {
        conceptA: 'B-Tree',
        conceptB: 'B+ Tree',
        summary: 'Data in all nodes vs data exclusively at leaves with chained linking.',
        points: [
          { aspect: 'Data Storage', a: 'Data records stored in internal nodes AND leaf nodes', b: 'Data stored STRICTLY in leaf nodes; internal nodes hold routing keys only' },
          { aspect: 'Range Queries', a: 'Requires in-order tree traversal up and down levels', b: 'Traverse sequential doubly-linked list connecting leaf nodes' },
          { aspect: 'Fan-out Capacity', a: 'Fewer keys per block because records take space', b: 'Higher fanout because internal nodes only store small keys' },
        ],
      },
    ],
    importantConcepts: [
      { title: 'Tree Traversal Rules', points: ['Inorder: Left -> Root -> Right (Yields sorted order in BST)', 'Preorder: Root -> Left -> Right', 'Postorder: Left -> Right -> Root'] },
      { title: 'Sorting Worst-Case Complexities', points: ['MergeSort: O(n log n) [Stable]', 'HeapSort: O(n log n) [In-place, Unstable]', 'QuickSort: O(n^2) [Average O(n log n), Unstable]'] },
    ],
    commonInterviewQuestions: [
      { q: 'How do you detect a loop in a linked list?', a: 'Floyd’s Cycle-Finding Algorithm (Slow and Fast Pointers): Slow moves 1 step, Fast moves 2 steps. If they meet, a cycle exists.' },
      { q: 'Why is QuickSort preferred over MergeSort for arrays?', a: 'QuickSort is in-place (no auxiliary array allocation) and has superior CPU cache locality.' },
    ],
    commonMistakes: [
      { trap: 'Evaluating postfix: subtracting in reverse order (op2 - op1).', fix: 'The first popped element is right operand (op2), second is left operand (op1). Correct: op1 - op2.' },
    ],
  },

  'digital-fundamentals': {
    subjectId: 'digital-fundamentals',
    oneLineDefinitions: [
      { term: "2's Complement", definition: "Bitwise inversion plus 1; the standard digital format for signed binary integers." },
      { term: 'Universal Gate', definition: 'A logic gate that can synthesize any Boolean function (NAND and NOR).' },
      { term: 'K-Map', definition: 'A Gray-code graphical matrix for minimizing Boolean algebra expressions into minimal SOP or POS.' },
      { term: 'Flip-Flop', definition: 'An edge-triggered sequential circuit component that stores 1 bit of memory.' },
      { term: 'Multiplexer (MUX)', definition: 'A combinational data selector that routes one of 2^n inputs to a single output line.' },
    ],
    importantDifferences: [
      {
        conceptA: 'Combinational Circuit',
        conceptB: 'Sequential Circuit',
        summary: 'Output depends only on present inputs vs output depends on present inputs and past history.',
        points: [
          { aspect: 'Memory', a: 'Contains NO memory elements', b: 'Contains memory elements (flip-flops, latches)' },
          { aspect: 'Clock Signal', a: 'Operates asynchronously without clock metronome', b: 'Requires clock pulses to synchronize state transitions' },
          { aspect: 'Examples', a: 'Adders, Decoders, Encoders, Multiplexers', b: 'Flip-Flops, Registers, Counters, RAM' },
        ],
      },
      {
        conceptA: 'SRAM',
        conceptB: 'DRAM',
        summary: 'Static flip-flop RAM vs dynamic capacitor RAM.',
        points: [
          { aspect: 'Storage Mechanism', a: 'Bistable cross-coupled flip-flop transistors (6 transistors per cell)', b: 'Single capacitor and transistor per cell' },
          { aspect: 'Refresh Needed', a: 'No refreshing required as long as power is on', b: 'Requires periodic charge refreshing because capacitors leak charge' },
          { aspect: 'Speed & Use', a: 'Very fast, expensive, used for CPU L1/L2/L3 Cache', b: 'Slower, dense, inexpensive, used for Main System RAM' },
        ],
      },
    ],
    importantConcepts: [
      { title: 'Boolean Algebra Laws', points: ["De Morgan: (A.B)' = A' + B', (A+B)' = A'.B'", "Absorption: A + AB = A, A(A + B) = A", "Consensus: AB + A'C + BC = AB + A'C"] },
      { title: 'Universal Gate Counts for XOR', points: ['4 NAND gates make 1 XOR gate', '5 NOR gates make 1 XOR gate'] },
    ],
    commonInterviewQuestions: [
      { q: 'What is the race-around condition in a JK flip-flop and how do you prevent it?', a: 'When J=1 and K=1, output toggles. If clock pulse duration > flip-flop propagation delay, output oscillates unpredictably. Prevented using Master-Slave JK or edge triggering.' },
    ],
    commonMistakes: [
      { trap: 'Writing 10 before 11 in K-Map column coordinates.', fix: 'K-Maps MUST use Gray code: 00, 01, 11, 10. 11 must precede 10!' },
    ],
  },

  'dbms': {
    subjectId: 'dbms',
    oneLineDefinitions: [
      { term: 'RDBMS', definition: 'Relational Database Management System storing data in structured tables linked by keys.' },
      { term: 'Primary Key', definition: 'Candidate key uniquely identifying each record in a table; strictly UNIQUE and NOT NULL.' },
      { term: 'Foreign Key', definition: 'Column in child table referencing primary key of parent table to enforce referential integrity.' },
      { term: 'Normalization', definition: 'Decomposing relations to eliminate data redundancy and insertion/update/deletion anomalies.' },
      { term: 'ACID', definition: 'Atomicity, Consistency, Isolation, Durability guarantees ensuring transaction reliability.' },
    ],
    importantDifferences: [
      {
        conceptA: 'DBMS',
        conceptB: 'RDBMS',
        summary: 'File/hierarchical data management vs tabular relational model.',
        points: [
          { aspect: 'Data Storage', a: 'Stores data as files or hierarchical navigational paths', b: 'Stores data in relational tables (rows and columns)' },
          { aspect: 'Keys & Constraints', a: 'No formal enforcement of foreign keys or referential integrity', b: 'Strict enforcement of primary, candidate, and foreign keys' },
          { aspect: 'Normalization', a: 'Not supported or enforced', b: 'Follows formal normal forms (1NF to BCNF)' },
        ],
      },
      {
        conceptA: 'Candidate Key',
        conceptB: 'Primary Key',
        summary: 'Eligible minimal identifier vs officially selected identifier.',
        points: [
          { aspect: 'Quantity', a: 'Can have multiple candidate keys in a table', b: 'Exactly ONE primary key selected per table' },
          { aspect: 'Nullability', a: 'Some candidate keys can theoretically accept NULL (unless constrained)', b: 'Primary key strictly CANNOT accept NULL values' },
        ],
      },
    ],
    importantConcepts: [
      { title: 'Normal Forms Summary', points: ['1NF: Atomic values only, no repeating groups', '2NF: 1NF + No partial dependencies on composite keys', '3NF: 2NF + No transitive dependencies (non-prime -> non-prime)', 'BCNF: For every X -> Y, X must be a super key'] },
      { title: 'ACID Guarantee Responsibilities', points: ['Atomicity: Recovery Manager (Rollback & Undo)', 'Consistency: Schema constraints and developer logic', 'Isolation: Concurrency Control (2-Phase Locking, MVCC)', 'Durability: Write-Ahead Logging (WAL & Redo logs)'] },
    ],
    commonInterviewQuestions: [
      { q: 'What is a transitive dependency in normalization?', a: 'When attribute A determines B, and B determines C (A -> B and B -> C), C transitively depends on A through intermediate non-prime attribute B.' },
    ],
    commonMistakes: [
      { trap: 'Assuming 2NF applies to tables with single-column primary keys.', fix: 'If the primary key is a single column, partial dependency is impossible, so it is automatically in 2NF if in 1NF.' },
    ],
  },

  'sql': {
    subjectId: 'sql',
    oneLineDefinitions: [
      { term: 'DDL', definition: 'Data Definition Language (CREATE, ALTER, DROP, TRUNCATE) defining schema; auto-committed.' },
      { term: 'DML', definition: 'Data Manipulation Language (INSERT, UPDATE, DELETE) modifying rows; can be rolled back.' },
      { term: 'DQL', definition: 'Data Query Language (SELECT) for retrieving tabular data projections.' },
      { term: 'TCL', definition: 'Transaction Control Language (COMMIT, ROLLBACK, SAVEPOINT) managing transaction boundaries.' },
    ],
    importantDifferences: [
      {
        conceptA: 'DELETE',
        conceptB: 'TRUNCATE',
        summary: 'DML row-by-row deletion vs DDL page deallocation.',
        points: [
          { aspect: 'Sublanguage', a: 'DML (Data Manipulation Language)', b: 'DDL (Data Definition Language)' },
          { aspect: 'WHERE Clause', a: 'Allowed (can delete targeted specific rows)', b: 'NOT allowed (always wipes entire table)' },
          { aspect: 'Speed & Logging', a: 'Slower; logs each deleted row individually; triggers fire', b: 'Much faster; deallocates entire pages; no row triggers' },
          { aspect: 'Rollback', a: 'Can be rolled back inside active transactions', b: 'Cannot be rolled back in most engines (auto-commits)' },
        ],
      },
      {
        conceptA: 'WHERE',
        conceptB: 'HAVING',
        summary: 'Row-level filtering before grouping vs aggregate-level filtering after grouping.',
        points: [
          { aspect: 'Execution Stage', a: 'Evaluated before GROUP BY aggregation occurs', b: 'Evaluated after GROUP BY aggregation is calculated' },
          { aspect: 'Aggregate Functions', a: 'CANNOT use aggregate functions (e.g. SUM, COUNT)', b: 'CAN evaluate aggregate conditions (e.g. HAVING COUNT(*) > 5)' },
        ],
      },
    ],
    importantConcepts: [
      { title: 'SQL Execution Order', points: ['1. FROM & JOINs', '2. WHERE', '3. GROUP BY', '4. HAVING', '5. SELECT', '6. DISTINCT', '7. ORDER BY', '8. LIMIT'] },
    ],
    commonInterviewQuestions: [
      { q: 'How do you find the 2nd highest salary in an Employee table?', a: 'SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee); Or using DENSE_RANK: SELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM Employee) t WHERE rnk = 2;' },
    ],
    commonMistakes: [
      { trap: 'Comparing with NULL using "= NULL" or "!= NULL".', fix: 'NULL is an unknown state. Always use "IS NULL" or "IS NOT NULL".' },
    ],
  },

  'java': {
    subjectId: 'java',
    oneLineDefinitions: [
      { term: 'JVM', definition: 'Java Virtual Machine executing bytecode across hardware platforms.' },
      { term: 'Bytecode', definition: 'Intermediate platform-independent instruction set stored in .class files.' },
      { term: 'String Constant Pool', definition: 'Memory area in JVM Heap that caches unique string literals to save memory.' },
      { term: 'Polymorphism', definition: 'Ability of an entity or method to take on multiple forms (overloading vs overriding).' },
    ],
    importantDifferences: [
      {
        conceptA: 'JVM vs JRE vs JDK',
        conceptB: 'Comparison',
        summary: 'Execution engine vs Runtime package vs Development kit.',
        points: [
          { aspect: 'JVM', a: 'Virtual machine that loads, verifies, and executes bytecode', b: 'Execution engine only; cannot compile' },
          { aspect: 'JRE', a: 'JVM + Core Class Libraries (rt.jar)', b: 'Everything needed to RUN compiled Java programs' },
          { aspect: 'JDK', a: 'JRE + Development Tools (javac, debugger, jar)', b: 'Everything needed to DEVELOP, compile, and run Java' },
        ],
      },
      {
        conceptA: 'Method Overloading',
        conceptB: 'Method Overriding',
        summary: 'Compile-time static binding vs runtime dynamic method dispatch.',
        points: [
          { aspect: 'Location', a: 'Within the same class', b: 'Between Superclass and Subclass (Inheritance)' },
          { aspect: 'Signature', a: 'Same method name, DIFFERENT parameter lists', b: 'Same method name, EXACT SAME parameter list' },
          { aspect: 'Resolution', a: 'Resolved at Compile-time (Static binding)', b: 'Resolved at Runtime (Dynamic method dispatch)' },
        ],
      },
    ],
    importantConcepts: [
      { title: 'OOP 4 Pillars', points: ['Encapsulation: Data hiding via private fields and public getters/setters', 'Inheritance: Code reusability via extends keyword', 'Polymorphism: Overloading (compile-time) and Overriding (runtime)', 'Abstraction: Hiding implementation details via interfaces and abstract classes'] },
    ],
    commonInterviewQuestions: [
      { q: 'Why are Strings immutable in Java?', a: 'For security (network URLs/credentials), thread-safety without synchronization, and safe caching in the String Constant Pool.' },
    ],
    commonMistakes: [
      { trap: 'Comparing String values using "==" instead of ".equals()".', fix: '"==" compares memory addresses; ".equals()" compares character contents.' },
    ],
  },

  'python': {
    subjectId: 'python',
    oneLineDefinitions: [
      { term: 'Interpreted', definition: 'Python executes code line-by-line via byte-compilation to Python virtual machine (PVM).' },
      { term: 'Dynamic Typing', definition: 'Variable types are bound at runtime based on the assigned object rather than declared upfront.' },
      { term: 'Lambda', definition: 'Anonymous inline single-expression function defined with the lambda keyword.' },
      { term: 'Slicing', definition: 'Extracting sub-sequences using seq[start:stop:step] syntax.' },
    ],
    importantDifferences: [
      {
        conceptA: 'List',
        conceptB: 'Tuple',
        summary: 'Mutable dynamic sequence vs immutable fixed sequence.',
        points: [
          { aspect: 'Mutability', a: 'Mutable (can append, modify, remove items)', b: 'Immutable (cannot modify items after creation)' },
          { aspect: 'Syntax', a: 'Defined with square brackets [ ]', b: 'Defined with parentheses ( )' },
          { aspect: 'Dict Keys', a: 'CANNOT be used as dictionary keys (unhashable)', b: 'CAN be used as dictionary keys if items are hashable' },
          { aspect: 'Performance', a: 'Slightly slower, higher memory overhead', b: 'Faster, lower memory consumption' },
        ],
      },
    ],
    importantConcepts: [
      { title: 'Slicing Mastery', points: ['s[::2] -> Every second element', 's[::-1] -> Reverse the sequence', 's[1:4] -> Elements at index 1, 2, 3 (4 is exclusive)'] },
      { title: 'Mutable vs Immutable Types', points: ['Mutable: list, dict, set, bytearray', 'Immutable: int, float, complex, str, tuple, frozenset, bool'] },
    ],
    commonInterviewQuestions: [
      { q: 'What is the difference between *args and **kwargs?', a: '*args accepts arbitrary positional arguments as a tuple; **kwargs accepts arbitrary keyword arguments as a dictionary.' },
    ],
    commonMistakes: [
      { trap: 'Using mutable default arguments like "def append_item(x, lst=[]):".', fix: 'Default arguments are evaluated once at function definition; all calls share the same list! Use "def append_item(x, lst=None): if lst is None: lst = []".' },
    ],
  },

  'computer-networks': {
    subjectId: 'computer-networks',
    oneLineDefinitions: [
      { term: 'OSI Model', definition: '7-layer conceptual framework standardizing network communication protocols.' },
      { term: 'TCP', definition: 'Connection-oriented, reliable transport protocol with guaranteed in-order delivery.' },
      { term: 'UDP', definition: 'Connectionless, lightweight, low-latency transport protocol without delivery receipts.' },
      { term: 'DNS', definition: 'Domain Name System translating human-readable hostnames to numerical IP addresses.' },
      { term: 'Subnetting', definition: 'Dividing a large IP network into smaller logical subnetworks to conserve IP space.' },
    ],
    importantDifferences: [
      {
        conceptA: 'TCP',
        conceptB: 'UDP',
        summary: 'Reliable byte-stream vs fast connectionless datagram.',
        points: [
          { aspect: 'Connection', a: 'Connection-oriented (Requires 3-Way Handshake)', b: 'Connectionless (Sends datagrams immediately)' },
          { aspect: 'Reliability', a: 'Guaranteed delivery with sequence numbers & ACKs', b: 'Best-effort delivery; packets can be lost or out of order' },
          { aspect: 'Header Size', a: '20 to 60 bytes', b: 'Fixed 8 bytes' },
          { aspect: 'Use Cases', a: 'HTTP/HTTPS, File Transfer (FTP), Email (SMTP)', b: 'Video streaming, VoIP, Gaming, DNS lookups' },
        ],
      },
      {
        conceptA: 'IPv4',
        conceptB: 'IPv6',
        summary: '32-bit dotted-decimal vs 128-bit hexadecimal addressing.',
        points: [
          { aspect: 'Address Size', a: '32 bits (4.3 billion addresses)', b: '128 bits (3.4 x 10^38 addresses)' },
          { aspect: 'Notation', a: 'Dotted decimal: 192.168.1.1', b: 'Colon hexadecimal: 2001:0db8:85a3::8a2e:0370:7334' },
          { aspect: 'Checksum Header', a: 'Includes header checksum (computed at every hop)', b: 'No header checksum (accelerates router forwarding)' },
        ],
      },
    ],
    importantConcepts: [
      { title: 'OSI 7 Layers & PDUs', points: ['Application (Data), Presentation (Data), Session (Data)', 'Transport (Segment - TCP/UDP)', 'Network (Packet - IP, Routing)', 'Data Link (Frame - MAC, Switches)', 'Physical (Bits - Cables, Hubs)'] },
    ],
    commonInterviewQuestions: [
      { q: 'What happens when you type https://www.google.com in your browser and press Enter?', a: '1. DNS lookup resolves domain to IP. 2. TCP 3-way handshake opens connection. 3. TLS handshake negotiates encryption keys. 4. Browser sends HTTP GET request. 5. Server responds with 200 OK HTML payload. 6. Browser renders DOM and styles.' },
    ],
    commonMistakes: [
      { trap: 'Believing UDP has zero error detection.', fix: 'UDP has a 16-bit checksum to detect corrupted bits; it simply drops corrupted packets without requesting retransmission.' },
    ],
  },

  'software-engineering': {
    subjectId: 'software-engineering',
    oneLineDefinitions: [
      { term: 'SDLC', definition: 'Software Development Life Cycle organizing stages from requirement to retirement.' },
      { term: 'Agile', definition: 'Iterative development methodology focusing on adaptability and rapid feedback.' },
      { term: 'Scrum', definition: 'Timeboxed Agile framework dividing work into 2-4 week Sprints.' },
      { term: 'Cohesion', definition: 'Degree to which elements inside a single module belong together (high is desirable).' },
      { term: 'Coupling', definition: 'Degree of interdependence between different modules (low is desirable).' },
    ],
    importantDifferences: [
      {
        conceptA: 'Waterfall Model',
        conceptB: 'Agile Methodology',
        summary: 'Sequential linear process vs iterative feedback-driven sprints.',
        points: [
          { aspect: 'Flexibility', a: 'Rigid; change requests are difficult and expensive', b: 'Highly adaptive; accommodates evolving user requirements' },
          { aspect: 'Delivery', a: 'Working software delivered at the very end of project', b: 'Working software increment delivered every 2 to 4 weeks' },
          { aspect: 'Customer Input', a: 'Customer involved primarily during initial requirements', b: 'Continuous customer collaboration throughout the lifecycle' },
        ],
      },
      {
        conceptA: 'Black-Box Testing',
        conceptB: 'White-Box Testing',
        summary: 'Behavioral testing without code visibility vs structural testing with internal logic inspection.',
        points: [
          { aspect: 'Code Visibility', a: 'Tester has zero knowledge of internal source code', b: 'Tester examines internal source code paths and branches' },
          { aspect: 'Techniques', a: 'Equivalence Partitioning, Boundary Value Analysis', b: 'Statement Coverage, Branch Coverage, Cyclomatic Complexity' },
        ],
      },
    ],
    importantConcepts: [
      { title: 'Testing Pyramid Levels', points: ['Unit Testing: Tests individual functions/classes in isolation', 'Integration Testing: Tests interactions between connected modules', 'System Testing: Validates the entire integrated system against SRS', 'Acceptance Testing: Validates business readiness with end-users (Alpha/Beta)'] },
      { title: 'Modular Architecture Rule', points: ['Aim for HIGH Cohesion and LOW Coupling!'] },
    ],
    commonInterviewQuestions: [
      { q: 'What is the difference between Verification and Validation?', a: 'Verification: "Are we building the product RIGHT?" (Static code reviews, inspections, checking against specs). Validation: "Are we building the RIGHT product?" (Dynamic testing, ensuring it meets customer needs).' },
    ],
    commonMistakes: [
      { trap: 'Believing Agile means zero documentation.', fix: 'Agile values working software OVER comprehensive documentation, but essential documentation is still maintained.' },
    ],
  },
};
