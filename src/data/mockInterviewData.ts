import { MockInterviewItem } from '../types';

export const MOCK_INTERVIEW_DATA: MockInterviewItem[] = [
  // BCA FUNDAMENTALS
  {
    id: 'mi-bca-1',
    category: 'bca-fundamentals',
    categoryName: 'BCA Fundamentals',
    difficulty: 'Easy',
    type: 'Easy',
    question: 'How does an operating system execute multi-tasking on a computer that has only a single CPU core?',
    context: 'Foundational systems question checking if candidate understands CPU virtualization.',
    modelAnswer: 'On a single-core CPU, the operating system achieves multitasking through Time Slicing (Time-Sharing Concurrency). The CPU short-term scheduler allocates small, fixed time quantums (typically 10 to 50 milliseconds) to active processes in the Ready queue. A hardware timer interrupt periodically preempts the currently executing process, triggering a Context Switch where the OS saves the outgoing process PCB registers and loads the incoming process PCB registers. Because these context switches happen hundreds of times per second, human users perceive multiple applications running simultaneously, even though only one instruction executes at any physical instant.',
    keyPointsToMention: [
      'Time-slicing / Time-sharing vs true hardware parallelism',
      'Role of hardware timer interrupt',
      'Context switching overhead and Process Control Block (PCB)',
      'Difference between concurrency (interleaved) and parallelism (simultaneous multi-core)',
    ],
    followUpQuestion: 'What happens if the time quantum in Round Robin is made extremely small (e.g., 1 microsecond)?',
    followUpAnswer: 'If the quantum is too small, context-switch overhead dominates the CPU. The CPU spends more cycles saving and restoring registers and invalidating cache than executing application instructions, causing system throughput to plummet.',
  },
  {
    id: 'mi-bca-2',
    category: 'bca-fundamentals',
    categoryName: 'BCA Fundamentals',
    difficulty: 'Medium',
    type: 'Scenario-based',
    question: 'Suppose your application starts running out of memory (OutOfMemory / RAM exhaustion). As a software engineer, what diagnostic steps and architectural fixes would you investigate?',
    context: 'Assesses practical troubleshooting and understanding of virtual memory vs memory leaks.',
    modelAnswer: '1. Diagnostic Phase: Inspect memory profiles using heap profilers (e.g., VisualVM for Java, memory_profiler for Python) to distinguish between a genuine Memory Leak (unreferenced objects pinned by static collections, unclosed connection pools, or circular references) vs an undersized heap allocation. 2. Code-level Optimization: Review large data structures (avoid loading entire multi-gigabyte files or SQL result sets into memory at once; use streaming/pagination/generators). 3. Database Offloading: Shift heavy aggregation from in-memory processing to indexed SQL queries. 4. Caching & Eviction: Ensure in-memory caches have explicit TTL and LRU eviction limits. 5. Infrastructure: If memory usage is legitimately required for throughput, scale horizontally or tune JVM heap flags (-Xmx).',
    keyPointsToMention: [
      'Distinction between memory leak vs high legitimate workload',
      'Heap profiling and dump analysis',
      'Streaming vs loading full datasets into memory',
      'Cache eviction policies (LRU/TTL)',
    ],
  },

  // JAVA
  {
    id: 'mi-java-1',
    category: 'java',
    categoryName: 'Java',
    difficulty: 'Medium',
    type: 'Medium',
    question: 'Explain why the String class in Java is declared final and immutable, and how that impacts memory and security.',
    context: 'Classic MCA technical interview question testing deep language design knowledge.',
    modelAnswer: '1. Security: Strings are extensively used as parameters for network sockets, database connection URLs, file system paths, and authentication tokens. If String were mutable, a malicious background thread could alter a verified file path after security checks had passed (Time-of-Check to Time-of-Use vulnerability). 2. String Constant Pool (SCP): Java saves significant heap memory by storing a single copy of identical string literals in the SCP. This memory optimization is safe only because strings cannot be mutated by one reference to alter what another reference sees. 3. Thread Safety: Immutable objects are inherently thread-safe; multiple threads can read strings concurrently without locking or synchronization. 4. Hashcode Caching: Because the contents never change, the hashCode() of a String is computed once lazily and cached, providing fast lookups in HashMaps.',
    keyPointsToMention: [
      'Security parameters protection (TOCTOU)',
      'String Constant Pool memory conservation',
      'Inherent thread-safety without locks',
      'Caching of hashCode for HashMap efficiency',
    ],
    followUpQuestion: 'If Strings are immutable, how do you handle heavy string modifications in a loop?',
    followUpAnswer: 'Use StringBuilder for single-threaded loops or StringBuffer for multi-threaded thread-safe scenarios, which maintain a mutable internal char/byte array and avoid allocating garbage objects on every iteration.',
  },

  // PYTHON
  {
    id: 'mi-py-1',
    category: 'python',
    categoryName: 'Python',
    difficulty: 'Medium',
    type: 'Medium',
    question: 'What is the Global Interpreter Lock (GIL) in Python (CPython), and what are its implications for multithreading?',
    context: 'High-frequency Python concurrency interview question.',
    modelAnswer: 'The Global Interpreter Lock (GIL) is a mutual exclusion lock used by the CPython implementation to prevent multiple native threads from executing Python bytecode simultaneously. The GIL was implemented because CPython’s memory management is not thread-safe; it relies on reference counting, which would suffer race conditions without the GIL. Implications: In CPU-bound tasks (e.g. mathematical matrix multiplication), Python multithreading does NOT achieve true multi-core speedup; it can even be slower due to lock contention. However, for I/O-bound tasks (e.g. web requests, disk reads, database queries), the GIL is released while waiting for I/O, so multithreading remains very effective. For CPU-bound parallelism, Python uses the "multiprocessing" module, which spawns separate OS processes with independent GILs.',
    keyPointsToMention: [
      'CPython reference counting memory management safety',
      'CPU-bound vs I/O-bound behavior',
      'Multithreading vs Multiprocessing solution',
      'GIL release during I/O system calls',
    ],
  },

  // DBMS
  {
    id: 'mi-dbms-1',
    category: 'dbms',
    categoryName: 'DBMS',
    difficulty: 'Hard',
    type: 'Follow-up',
    question: 'Explain the 4 ANSI SQL Transaction Isolation Levels and the specific concurrency anomalies each level prevents.',
    context: 'Critical database systems question for senior admission & technical rounds.',
    modelAnswer: 'The four standard isolation levels from lowest to highest: 1. Read Uncommitted: Transactions can read changes made by uncommitted transactions. Suffers from Dirty Reads, Non-Repeatable Reads, and Phantom Reads. 2. Read Committed: Guarantees that any data read was committed at the moment of reading. Prevents Dirty Reads, but still allows Non-Repeatable Reads and Phantom Reads. 3. Repeatable Read: Guarantees that if a transaction reads a row twice, the values will be identical. Prevents Dirty Reads and Non-Repeatable Reads, but may still allow Phantom Reads (new rows inserted by another transaction). 4. Serializable: Complete isolation simulating serial execution via range locks or snapshot isolation. Prevents all three anomalies (Dirty Reads, Non-Repeatable Reads, Phantom Reads). Higher levels increase data integrity but reduce concurrency and throughput.',
    keyPointsToMention: [
      'Dirty Read: Reading uncommitted data that may roll back',
      'Non-Repeatable Read: Re-reading row returns modified column values',
      'Phantom Read: Re-running query returns newly inserted rows matching predicate',
      'Trade-off between isolation level and system concurrency throughput',
    ],
  },

  // SQL
  {
    id: 'mi-sql-1',
    category: 'sql',
    categoryName: 'SQL',
    difficulty: 'Medium',
    type: 'Scenario-based',
    question: 'Write an SQL query to retrieve the N-th highest salary from an Employee table without using vendor-specific LIMIT / TOP syntax.',
    context: 'Standard relational query interview test.',
    modelAnswer: 'Standard ANSI SQL query using correlated subquery:\n\nSELECT salary FROM Employee E1\nWHERE (N - 1) = (\n    SELECT COUNT(DISTINCT E2.salary)\n    FROM Employee E2\n    WHERE E2.salary > E1.salary\n);\n\nAlternatively, using the ANSI SQL DENSE_RANK() window function:\n\nWITH RankedSalaries AS (\n    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n    FROM Employee\n)\nSELECT DISTINCT salary FROM RankedSalaries WHERE rnk = N;\n\nDENSE_RANK is preferred because it handles duplicate salary values cleanly without skipping rank numbers.',
    keyPointsToMention: [
      'Correlated subquery logic (counting distinct salaries greater than current)',
      'Window functions: DENSE_RANK() vs RANK() vs ROW_NUMBER()',
      'Handling ties / duplicate salary figures',
    ],
  },

  // OPERATING SYSTEMS
  {
    id: 'mi-os-1',
    category: 'os',
    categoryName: 'Operating Systems',
    difficulty: 'Hard',
    type: 'Medium',
    question: 'How does an operating system resolve a Page Fault from the moment the MMU detects it to the moment the faulting instruction resumes?',
    context: 'Tests end-to-end understanding of virtual memory hardware-software coordination.',
    modelAnswer: '1. Hardware Trap: The Memory Management Unit (MMU) attempts to translate a virtual address, finds the valid-invalid bit in the Page Table is 0 (invalid), and raises a Page Fault interrupt to the CPU. 2. CPU Context Save: The CPU halts the faulting instruction, saves the program counter and registers on the kernel stack, switches to Kernel Mode, and invokes the OS page fault handler. 3. Validity Check: The OS inspects its internal memory map to check if the memory address was a legal virtual address or an illegal access (which causes a Segmentation Fault). 4. Frame Allocation: The OS searches for an empty physical memory frame in the free-frame list. If none are free, it executes a Page Replacement Algorithm (e.g. LRU) to select a victim frame (and writes it to swap if marked dirty). 5. Disk I/O: The OS issues a non-blocking disk read to fetch the missing page from backing store into the allocated frame. While waiting, the CPU context-switches to another ready process. 6. Page Table Update: Once disk I/O completes via interrupt, the OS updates the page table entry with the frame number, sets valid bit to 1. 7. Resume: The OS restores original process registers and re-executes the exact faulting instruction.',
    keyPointsToMention: [
      'MMU valid/invalid bit trap',
      'Segmentation fault vs valid demand page',
      'Free frame search and page replacement algorithm',
      'Asynchronous disk read and CPU context switch to other ready processes',
      'Instruction restart',
    ],
  },

  // DATA STRUCTURES
  {
    id: 'mi-ds-1',
    category: 'ds',
    categoryName: 'Data Structures',
    difficulty: 'Hard',
    type: 'Follow-up',
    question: 'What is the difference between a Binary Search Tree (BST) and an AVL Tree? In what real-world scenarios would you avoid an AVL tree?',
    context: 'Evaluates theoretical knowledge of balanced trees and practical engineering trade-offs.',
    modelAnswer: 'A standard Binary Search Tree enforces only the BST property (left < root < right). If elements are inserted in sorted order (e.g. 1, 2, 3, 4, 5), an unconstrained BST degenerates into a skewed linked list with O(n) height, degrading search, insertion, and deletion to O(n). An AVL Tree is a strictly self-balancing BST where the height difference (balance factor) between left and right subtrees is constrained to {-1, 0, +1}, guaranteeing worst-case O(log n) performance for all operations via rotations. When to avoid AVL: In write-heavy applications with frequent insertions and deletions, AVL trees incur significant overhead maintaining strict balance with rotations. In such scenarios, Red-Black trees (which allow slightly looser balance with at most 2 rotations on insert) or B-Trees (for disk/database systems) are preferred.',
    keyPointsToMention: [
      'Skewed tree degradation in standard BST: O(n)',
      'AVL balance factor constraint (-1, 0, 1)',
      'Rotations (LL, RR, LR, RL)',
      'Trade-off: AVL faster for read-heavy; Red-Black faster for write-heavy',
    ],
  },

  // COMPUTER NETWORKS
  {
    id: 'mi-cn-1',
    category: 'networks',
    categoryName: 'Computer Networks',
    difficulty: 'Medium',
    type: 'Scenario-based',
    question: 'Explain the complete step-by-step life of a network packet from the moment a user enters "https://example.com" until the HTML is displayed on screen.',
    context: 'The definitive networking systems interview question.',
    modelAnswer: '1. URL Parsing & Cache Check: The browser parses the protocol (HTTPS), hostname (example.com), and port (443). Checks browser cache, OS DNS cache, and hosts file. 2. DNS Resolution: If not cached, sends UDP query to local DNS resolver, which traverses Root server (.) -> TLD server (.com) -> Authoritative Nameserver to retrieve the destination IP address. 3. ARP Resolution (if local gateway MAC unknown): Resolves router IP to MAC address using Address Resolution Protocol. 4. TCP 3-Way Handshake: Client sends SYN, server returns SYN-ACK, client sends ACK to establish connection on port 443. 5. TLS/SSL Handshake: Client and server exchange ClientHello/ServerHello, server presents SSL certificate, client verifies certificate with Certificate Authority (CA), symmetric AES session keys are derived using asymmetric cryptography. 6. HTTP Request: Client transmits an encrypted HTTP GET / request over TLS. 7. Server Processing & Response: Web server processes request and returns HTTP 200 OK with HTML payload. 8. Browser Rendering: Browser engine parses HTML to build DOM, parses CSS to build CSSOM, combines them into Render Tree, computes layout, and paints pixels.',
    keyPointsToMention: [
      'DNS recursive and iterative lookup over UDP 53',
      'TCP 3-way handshake over port 443',
      'TLS certificate verification and session key negotiation',
      'HTTP GET request and 200 OK response',
      'DOM / CSSOM rendering pipeline',
    ],
  },

  // SOFTWARE ENGINEERING
  {
    id: 'mi-se-1',
    category: 'software-engineering',
    categoryName: 'Software Engineering',
    difficulty: 'Easy',
    type: 'Easy',
    question: 'What is the difference between Unit Testing, Integration Testing, and System Testing?',
    context: 'Fundamental software quality and testing question.',
    modelAnswer: '1. Unit Testing: Tests the smallest individual testable units of software (such as a single method, function, or class) in complete isolation from the rest of the application. External dependencies like databases or APIs are mocked or stubbed. Typically written by developers using frameworks like JUnit or PyTest. 2. Integration Testing: Verifies the interfaces and communication between two or more combined modules (e.g. testing whether the OrderService correctly interacts with the PaymentGateway and database). 3. System Testing: Validates the entire integrated, end-to-end software product against the initial Software Requirements Specification (SRS) in an environment mirroring production. Includes both functional testing and non-functional testing (performance, security, load).',
    keyPointsToMention: [
      'Testing pyramid hierarchy',
      'Unit testing mocks dependencies',
      'Integration testing verifies interfaces between components',
      'System testing evaluates end-to-end application against SRS',
    ],
  },

  // PROJECT QUESTIONS
  {
    id: 'mi-proj-1',
    category: 'project',
    categoryName: 'Project Questions',
    difficulty: 'Medium',
    type: 'Scenario-based',
    question: 'In your BCA final year project, what was the most difficult technical bug or architectural bottleneck you encountered, and how did you diagnose and solve it?',
    context: 'Assesses engineering problem-solving, debugging methodology, and depth of personal involvement.',
    modelAnswer: 'A model answer should follow the STAR method (Situation, Task, Action, Result): "In my final project (e.g. Student Academic Portal), our application suffered from severe page load latency (3-4 seconds) when listing students with their course registrations. Task: I was tasked with diagnosing the bottleneck and bringing response times under 300ms. Action: I used database query profiling and discovered an N+1 Query problem: the application executed 1 query to fetch 50 students, followed by 50 individual queries in a loop to fetch each student’s registered courses. I replaced the iterative queries with an optimized SQL INNER JOIN with GROUP BY, and created a composite index on (student_id, course_id). Result: Total database queries dropped from 51 queries to 1 query, and page latency decreased from 3.8 seconds to 120ms (over 95% performance improvement)."',
    keyPointsToMention: [
      'Use the STAR method: Situation, Task, Action, Result',
      'Provide specific technical details (e.g., N+1 query problem, indexing, memory leak, race condition)',
      'Highlight concrete diagnostic tools used (profilers, network tabs, explain plans)',
      'State measurable quantitative results (e.g. latency reduced from X to Y)',
    ],
  },
];
