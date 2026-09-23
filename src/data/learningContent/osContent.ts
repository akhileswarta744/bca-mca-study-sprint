import { TopicLearningContent } from '../../types';

export const OS_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  'os-functions': {
    topicId: 'os-functions',
    topicName: 'OS Functions & Dual-Mode Architecture',
    subjectId: 'operating-systems',
    whatIsIt: 'The Operating System (OS) is core system software that acts as an intermediary between computer hardware and user applications, abstracting hardware complexities and managing system resources.',
    simpleExplanation: 'Imagine the OS as the manager of a busy restaurant. The cooks, waiters, and kitchen equipment are the hardware; the customers ordering meals are the applications. The manager ensures no two customers fight over the same table (memory), orders are processed fairly (CPU scheduling), and customers cannot sneak into the kitchen to mess with raw ingredients (dual-mode security).',
    technicalExplanation: 'The OS executes in two distinct processor modes to maintain protection: User Mode (Mode bit = 1) and Kernel/Privileged Mode (Mode bit = 0). Privileged instructions—such as direct I/O manipulation, timer interrupt configuration, and memory management registers—can execute strictly in Kernel Mode. When a user process requires kernel intervention, it triggers a trap/system call (e.g., sys_read, fork), switching the CPU mode bit from 1 to 0 via an interrupt vector.',
    importantDefinitions: [
      { term: 'Kernel', definition: 'The central core component of an OS that remains permanently in RAM, having complete control over everything in the system.' },
      { term: 'System Call', definition: 'A programmatic request made by a user-space application to request a privileged service from the operating system kernel.' },
      { term: 'Dual-Mode Operation', definition: 'Hardware-enforced execution states (User Mode vs Kernel Mode) separating user application execution from privileged operating system routines.' },
      { term: 'Trap / Exception', definition: 'A software-generated interrupt caused either by an intentional system call or by an error condition (such as division by zero or invalid memory access).' },
    ],
    keyConcepts: [
      'Resource Abstraction: Provides uniform APIs (e.g., POSIX file operations) hiding diverse hardware architectures.',
      'Resource Management: Manages contention for CPU time, volatile memory (RAM), disk storage, and I/O peripherals.',
      'Protection & Isolation: Uses hardware timer interrupts to preempt rogue processes and prevent infinite loops in user space.',
      'System Call Transitions: User Space → Trap Instruction → Mode Bit flips to 0 → System Call Table Lookup → Kernel Service Handler → Mode Bit flips to 1 → Return to User Space.',
    ],
    example: {
      type: 'diagram',
      title: 'Dual-Mode Transition Architecture',
      explanation: 'Illustrates how an application safely transitions from unprivileged User Mode to privileged Kernel Mode via a System Call and returns.',
      diagramAscii: `
+-------------------------------------------------------------------+
| USER MODE (Mode Bit = 1)                                          |
|                                                                   |
|   +-------------------+                                           |
|   | User Application  |                                           |
|   |    read(fd, buf)  |  -- Calls API                             |
|   +---------+---------+                                           |
|             |                                                     |
|             v  (TRAP / Software Interrupt: switches Mode Bit to 0)|
+-------------|-----------------------------------------------------+
| KERNEL MODE (Mode Bit = 0)                                        |
|             |                                                     |
|             v                                                     |
|   +-------------------------+                                     |
|   | System Call Dispatcher  |                                     |
|   |   Maps to sys_read()    |                                     |
|   +-------------+-----------+                                     |
|                 v                                                 |
|   +-------------------------+                                     |
|   | Hardware Device Driver  |  --> Accesses Disk Blocks           |
|   +-------------+-----------+                                     |
|                 |                                                 |
|                 +-- Returns data & restores Mode Bit to 1         |
+-------------------------------------------------------------------+
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'Why does the CPU need hardware support for dual-mode execution?',
        answer: 'Without hardware-level dual mode (enforced by the CPU status register mode bit), user software could execute privileged instructions directly—such as modifying the interrupt vector table, disabling hardware interrupts, or accessing arbitrary physical memory pages—which would completely bypass OS security and crash the machine.',
        tips: 'Always highlight that dual-mode is a hardware feature utilized by the software kernel, not purely software emulation.',
      },
      {
        question: 'What is the exact sequence of events during a system call?',
        answer: '1. User application prepares parameters (in registers or on stack) and executes a trap instruction. 2. CPU switches from User Mode (bit 1) to Kernel Mode (bit 0). 3. CPU indexes into the Interrupt Vector Table to locate the OS system call dispatcher. 4. Kernel verifies parameters and runs the requested handler (e.g. sys_write). 5. Kernel saves return values, executes a return-from-trap instruction, flipping the mode bit back to 1 and resuming user execution.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming standard C library calls like printf() are directly system calls.',
        correction: 'printf() is a library function in libc; it formats text in user space and internally invokes the write() system call to request output from the kernel.',
        why: 'Library functions buffer data in user memory before making expensive system call transitions to kernel mode.',
      },
    ],
    quickRevision: [
      'Kernel is the core; shell and GUI are user-space interfaces.',
      'User Mode = Mode Bit 1; Kernel Mode = Mode Bit 0.',
      'Privileged instructions can ONLY execute in Kernel Mode.',
      'Hardware timer interrupt prevents infinite user loops by giving control back to OS scheduler periodically.',
    ],
    practiceQuestions: [
      {
        id: 'os-func-q1',
        question: 'Which of the following instructions can only be executed in Kernel Mode?',
        options: ['Read system time', 'Disable all hardware interrupts', 'Perform integer multiplication', 'Copy a string in memory'],
        correctOptionIndex: 1,
        explanation: 'Disabling hardware interrupts is a privileged instruction because doing so prevents the OS scheduler from preempting the running process, potentially halting the entire operating system.',
      },
      {
        id: 'os-func-q2',
        question: 'What hardware mechanism ensures that the operating system retains control over the CPU and prevents user processes from monopolizing it?',
        options: ['Virtual Memory Paging', 'Hardware Timer Interrupt', 'Direct Memory Access (DMA)', 'Translation Lookaside Buffer (TLB)'],
        correctOptionIndex: 1,
        explanation: 'The hardware timer interrupt periodically triggers an interrupt after a specified interval, transferring CPU control back to the OS scheduler regardless of what the user program is executing.',
      },
    ],
  },

  'os-processes': {
    topicId: 'os-processes',
    topicName: 'Processes & Process Control Block (PCB)',
    subjectId: 'operating-systems',
    whatIsIt: 'A process is a program in execution. It represents the unit of work and resource allocation in an operating system, encompassing program code, current state, memory segments, and open descriptors.',
    simpleExplanation: 'A recipe printed in a book is a program (passive entity on disk). A chef in the kitchen actively reading the recipe, mixing ingredients in bowls, and tracking cooking times on a timer is the process (active entity with memory, CPU registers, and state).',
    technicalExplanation: 'A process memory image consists of four logical segments: Text (compiled machine instructions), Data (initialized and uninitialized global/static variables), Heap (dynamically allocated memory via malloc/new growing upward), and Stack (local variables, return addresses, and activation records growing downward). The OS tracks each process using a Process Control Block (PCB), containing Process ID (PID), Process State, Program Counter (PC), CPU registers, memory limits, and open file tables.',
    importantDefinitions: [
      { term: 'Process Control Block (PCB)', definition: 'A critical kernel data structure that stores all metadata and hardware context needed to manage, pause, and resume a specific process.' },
      { term: 'Context Switch', definition: 'The state-saving and state-restoring mechanism that switches the CPU from one running process to another, introducing pure computational overhead.' },
      { term: 'Fork()', definition: 'A UNIX system call that creates an exact clone child process with its own duplicated address space, differing only in PID and fork return value (0 in child, child PID in parent).' },
    ],
    keyConcepts: [
      '5-State Process Model: New → Ready (in queue waiting for CPU) → Running (executing on core) → Waiting/Blocked (waiting for I/O or event) → Terminated.',
      'Context Switch Overhead: Saving registers, updating PCB, invalidating CPU caches (L1/L2) and TLB entries. No useful user work is done during context switching.',
      'Process vs Program: Program is passive executable code on disk; process is active execution instance in RAM with dedicated address space.',
      'Zombie vs Orphan: Zombie has terminated but parent has not called wait(); Orphan has an active process whose parent terminated (adopted by init/systemd PID 1).',
    ],
    example: {
      type: 'diagram',
      title: '5-State Process Transition Model',
      explanation: 'Shows state changes as processes move between queues managed by the short-term and long-term schedulers.',
      diagramAscii: `
          [ New ] 
             |
             | Admitted
             v
       +------------+     CPU Scheduler Dispatch     +-------------+
       |   READY    | -----------------------------> |   RUNNING   |
       +------------+                                +-------------+
             ^                                              |
             |           I/O or Event Completed             |
             +----------------------------------+           |
                                                |           | I/O or Event Wait
                                                v           v
                                         +---------------------+
                                         |   WAITING / BLOCKED |
                                         +---------------------+
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'What is the difference between a Zombie process and an Orphan process?',
        answer: 'A Zombie process has completed execution via exit(), but its entry remains in the process table because its parent has not yet read its exit status via wait(). It consumes an entry in the PID table. An Orphan process is a running or waiting process whose parent process terminated before it. In UNIX, orphan processes are immediately adopted by the root init/systemd process (PID 1), which automatically reaps their exit statuses.',
      },
      {
        question: 'Why is context switching considered an overhead for the CPU?',
        answer: 'Context switching requires saving all CPU registers and program counter to the outgoing PCB, loading the incoming PCB, and updating memory page tables. During this period, the CPU executes zero application code. Furthermore, modern CPU caches and TLBs are effectively invalidated or cold, causing subsequent memory access penalties.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Believing child processes created with fork() share the same variables as the parent.',
        correction: 'fork() creates a duplicate, independent address space (often optimized with Copy-On-Write). Modifying a variable in the child does NOT alter the variable in the parent.',
        why: 'Processes have completely isolated virtual memory spaces.',
      },
    ],
    quickRevision: [
      'Memory segments: Stack (grows down), Heap (grows up), Data, Text.',
      'Context Switch switches CPU from one PCB to another; pure overhead.',
      'Zombie = finished but uncollected exit code; Orphan = parent died, adopted by PID 1.',
      'fork() returns 0 to the child and Child PID to the parent.',
    ],
    practiceQuestions: [
      {
        id: 'os-proc-q1',
        question: 'In a 5-state process model, a transition directly from the Waiting/Blocked state to the Running state is:',
        options: ['Possible when high-priority I/O finishes', 'Never possible; it must first go to the Ready state', 'Occurs during a context switch', 'Triggered directly by a hardware timer interrupt'],
        correctOptionIndex: 1,
        explanation: 'A blocked process that finishes I/O is moved to the Ready queue. It must wait for the CPU scheduler to allocate CPU time before entering the Running state.',
      },
      {
        id: 'os-proc-q2',
        question: 'What does fork() return to the newly created child process upon success?',
        options: ['The Parent PID', 'The Child PID', '0', '-1'],
        correctOptionIndex: 2,
        explanation: 'fork() returns 0 to the child process, while returning the child PID to the parent process. A negative value indicates failure.',
      },
    ],
  },

  'os-threads': {
    topicId: 'os-threads',
    topicName: 'Threads & Multithreading Models',
    subjectId: 'operating-systems',
    whatIsIt: 'A thread, often called a lightweight process (LWP), is the smallest basic unit of CPU utilization. It comprises a Thread ID, a Program Counter, a register set, and a stack.',
    simpleExplanation: 'If a process is a company office, threads are the employees working inside that same office. They share the same desks, filing cabinets, and cafeteria (code, data, and open files), but each employee has their own notebook and train of thought (private stack and program counter).',
    technicalExplanation: 'Threads belonging to the same process share their Code segment, Data segment, and OS resources (such as open file descriptors). However, each thread retains an independent Program Counter, CPU registers, and private Call Stack to execute different functions concurrently. Thread switching is significantly faster than process switching because virtual memory page tables do not need to be flushed or reloaded.',
    importantDefinitions: [
      { term: 'User-Level Threads (ULT)', definition: 'Threads managed entirely by a user-space runtime library without kernel intervention or awareness; kernel treats the whole process as a single unit.' },
      { term: 'Kernel-Level Threads (KLT)', definition: 'Threads managed and scheduled directly by the OS kernel, allowing true parallel execution on multi-core architectures.' },
      { term: 'POSIX Pthreads', definition: 'The IEEE standard API definition (IEEE 1003.1c) for thread creation and synchronization in C/C++.' },
    ],
    keyConcepts: [
      'Shared vs Private Resources: Shared = Text segment, Data segment, Heap, Open files, Signals. Private = Thread ID, Program Counter, Registers, Stack.',
      'Multithreading Models: Many-to-One (all ULT mapped to 1 KLT; blocking call blocks all), One-to-One (each ULT maps to 1 KLT; true parallelism, Linux/Windows standard), Many-to-Many (multiplexes m user threads to n kernel threads).',
      'Benefits: High responsiveness (GUI thread remains active during background worker task), resource sharing economy, faster context switching.',
    ],
    example: {
      type: 'code',
      title: 'POSIX C Thread Creation Example',
      language: 'c',
      code: `#include <pthread.h>
#include <stdio.h>

void* worker(void* arg) {
    long id = (long)arg;
    printf("Thread %ld executing concurrently\\n", id);
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, worker, (void*)1);
    pthread_create(&t2, NULL, worker, (void*)2);
    
    // Wait for threads to finish
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Both threads finished execution.\\n");
    return 0;
}`,
      explanation: 'Demonstrates creating two worker threads sharing main memory space. pthread_join synchronizes parent thread with worker termination.',
      output: `Thread 1 executing concurrently
Thread 2 executing concurrently
Both threads finished execution.`,
    },
    commonInterviewQuestions: [
      {
        question: 'Why is thread context switching faster than process context switching?',
        answer: 'Because threads of the same process share the same virtual address space, switching between them does not require reloading page directory registers (CR3 in x86) or flushing the Translation Lookaside Buffer (TLB) and processor caches. Only the CPU registers, program counter, and stack pointer must be swapped.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming threads share their call stack.',
        correction: 'Each thread MUST have its own independent stack to track its own nested function calls and local variables.',
        why: 'Shared stacks would cause simultaneous function calls across threads to overwrite each other’s return addresses and local variables.',
      },
    ],
    quickRevision: [
      'Threads share Code, Data, Heap, and File Descriptors.',
      'Threads have private Thread ID, PC, Registers, and Stack.',
      'Many-to-One model blocks all threads if any single thread makes a blocking system call.',
      'One-to-One model is standard in modern OS (Linux, Windows) for multi-core parallelism.',
    ],
    practiceQuestions: [
      {
        id: 'os-th-q1',
        question: 'Which of the following is NOT shared among threads of the same process?',
        options: ['Global variables', 'Heap memory', 'CPU Registers and Stack', 'Open file descriptors'],
        correctOptionIndex: 2,
        explanation: 'Each thread has its own private CPU registers and call stack to maintain its execution state and local function variables.',
      },
    ],
  },

  'os-sync': {
    topicId: 'os-sync',
    topicName: 'Process Synchronization & Semaphores',
    subjectId: 'operating-systems',
    whatIsIt: 'Process synchronization is the coordination of concurrent execution of multiple processes or threads to ensure orderly execution and maintain data consistency when accessing shared resources.',
    simpleExplanation: 'Think of an airplane lavatory. When someone enters, they slide the latch to "OCCUPIED" (wait/P operation). Other passengers waiting outside see the red sign and pause. When the occupant leaves, they slide the latch to "VACANT" (signal/V operation), allowing the next passenger in.',
    technicalExplanation: 'The Critical Section is a segment of code where shared resources (e.g., shared variable, file, memory buffer) are accessed. Any correct solution to the Critical Section problem must satisfy three strict requirements: Mutual Exclusion (at most one process in critical section), Progress (processes waiting outside do not indefinitely delay others from entering), and Bounded Waiting (a limit on the number of times others can enter before a requesting process enters). Semaphores are integer synchronization variables accessed strictly via two atomic operations: wait() (also called P) and signal() (also called V).',
    importantDefinitions: [
      { term: 'Critical Section', definition: 'The code portion accessing shared variables where concurrent access leads to inconsistent race conditions.' },
      { term: 'Mutex (Mutual Exclusion Object)', definition: 'A binary locking mechanism with ownership semantics (only the thread that locked the mutex can unlock it).' },
      { term: 'Counting Semaphore', definition: 'A semaphore whose value can range over an unrestricted integer domain, representing the count of available identical resources.' },
      { term: 'Binary Semaphore', definition: 'A semaphore with integer values constrained to 0 and 1, functioning similarly to a lock without ownership enforcement.' },
    ],
    keyConcepts: [
      'Critical Section 3 Requirements: 1. Mutual Exclusion, 2. Progress, 3. Bounded Waiting.',
      'wait(S) / P(S): Decrements semaphore value. If S <= 0, process is blocked and added to waiting queue.',
      'signal(S) / V(S): Increments semaphore value. If processes are waiting, wakes up one blocked process.',
      'Classical Synchronization Problems: Bounded-Buffer (Producer-Consumer), Readers-Writers Problem, Dining Philosophers Problem.',
    ],
    example: {
      type: 'code',
      title: 'Producer-Consumer Synchronization with Semaphores',
      language: 'c',
      code: `// Shared synchronization variables
semaphore mutex = 1;  // Controls entry to critical section
semaphore empty = N;  // Counts empty buffer slots
semaphore full = 0;   // Counts filled buffer slots

void producer() {
    while (1) {
        item = produce_item();
        wait(empty);        // Wait if buffer is full (empty == 0)
        wait(mutex);        // Enter critical section
        insert_item(item);  // Add item to shared buffer
        signal(mutex);      // Exit critical section
        signal(full);       // Notify consumer that item is available
    }
}

void consumer() {
    while (1) {
        wait(full);         // Wait if buffer is empty (full == 0)
        wait(mutex);        // Enter critical section
        item = remove_item();// Remove item from shared buffer
        signal(mutex);      // Exit critical section
        signal(empty);      // Notify producer that slot is freed
        consume_item(item);
    }
}`,
      explanation: 'Shows atomic semaphore operations preventing buffer overflow and underflow while preserving mutual exclusion.',
    },
    commonInterviewQuestions: [
      {
        question: 'What is the key difference between a Mutex and a Binary Semaphore?',
        answer: 'A Mutex has an ownership concept: only the specific thread that acquired (locked) the mutex is permitted to release (unlock) it. A Binary Semaphore does not enforce ownership: any thread or interrupt service routine can signal (V) the semaphore to wake up another thread, making semaphores suitable for signaling and notifications as well as locking.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Swapping wait(empty) and wait(mutex) in the producer.',
        correction: 'Calling wait(mutex) BEFORE wait(empty) can cause immediate DEADLOCK if the buffer is full: producer holds the mutex and sleeps waiting for empty space, but consumer cannot enter to consume and free space because producer holds the mutex!',
        why: 'Always acquire resource-counting semaphores before acquiring the mutual exclusion lock.',
      },
    ],
    quickRevision: [
      'Critical section requires: Mutual Exclusion, Progress, Bounded Waiting.',
      'wait() / P() decrements; signal() / V() increments.',
      'Mutex has thread ownership; Semaphore has no ownership.',
      'Deadlock occurs if locks are acquired in inconsistent order.',
    ],
    practiceQuestions: [
      {
        id: 'os-sync-q1',
        question: 'A counting semaphore S is initialized to 10. Then, 12 wait() operations and 5 signal() operations are executed on S. What is the final value of S?',
        options: ['3', '5', '0', '-2 (with 2 blocked processes)'],
        correctOptionIndex: 0,
        explanation: 'Calculation: Initial (10) - 12 (waits) + 5 (signals) = 10 - 12 + 5 = 3.',
      },
    ],
  },

  'os-deadlock': {
    topicId: 'os-deadlock',
    topicName: 'Deadlock Conditions & Prevention',
    subjectId: 'operating-systems',
    whatIsIt: 'A deadlock is a permanent state where a set of processes are blocked because each process holds a resource and waits for another resource held by another process in the set.',
    simpleExplanation: 'Imagine four cars simultaneously arriving at a narrow 4-way intersection without traffic lights, each car turning left into the lane occupied by the car to its left. No car can move forward because each car blocks the path of another.',
    technicalExplanation: 'A deadlock can arise if and only if four Coffman conditions hold simultaneously in a system: 1. Mutual Exclusion (non-shareable resources), 2. Hold and Wait (processes hold allocated resources while waiting for additional ones), 3. No Preemption (resources cannot be forcibly taken from a process), 4. Circular Wait (a closed chain P0 waits for P1, P1 waits for P2... Pn waits for P0). Deadlock prevention strategies work by designing protocols that mathematically guarantee at least one of these four conditions can never hold.',
    importantDefinitions: [
      { term: 'Coffman Conditions', definition: 'The four necessary and sufficient conditions for deadlock: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.' },
      { term: 'Resource Allocation Graph (RAG)', definition: 'A directed graph consisting of Process nodes and Resource nodes. An edge from P to R is a Request edge; an edge from R to P is an Assignment edge.' },
      { term: 'Deadlock Prevention', definition: 'Eliminating the possibility of deadlock upfront by structurally invalidating at least one Coffman condition.' },
      { term: 'Deadlock Avoidance', definition: 'Dynamically inspecting resource requests at runtime (e.g., Bankers Algorithm) to ensure the system never enters an unsafe state.' },
    ],
    keyConcepts: [
      'Invalidating Hold & Wait: Require a process to request all needed resources at once before starting execution, or release all held resources before requesting new ones.',
      'Invalidating No Preemption: If a process holding resources requests a resource that cannot be immediately allocated, all its currently held resources are preempted.',
      'Invalidating Circular Wait: Impose a total global ordering on all resource types (e.g., F: R → N). Require that each process requests resources only in strictly increasing order of enumeration.',
      'RAG Rule: If a Resource Allocation Graph contains NO cycles, deadlock is impossible. If a cycle exists with SINGLE instances per resource type, deadlock is guaranteed.',
    ],
    example: {
      type: 'diagram',
      title: 'Circular Wait Resource Allocation Graph Cycle',
      explanation: 'Illustrates two processes and two single-instance resources trapped in a circular wait deadlock.',
      diagramAscii: `
      +---------------+              Assignment Edge             +---------------+
      |  Resource R1  | =======================================> |  Process P1   |
      +---------------+                                          +---------------+
              ^                                                          |
              |                                                          |
  Request Edge|                                                          | Request Edge
              |                                                          v
      +---------------+              Assignment Edge             +---------------+
      |  Process P2   | <======================================= |  Resource R2  |
      +---------------+                                          +---------------+
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'How does resource ordering eliminate Circular Wait?',
        answer: 'By assigning an integer identifier F(R) to every resource type, any process can request resource Ri only if F(Ri) > F(Rk) for all Rk it currently holds. Because indices must strictly increase, a cycle would require an impossible condition like F(R1) < F(R2) < ... < F(R1), making circular wait mathematically impossible.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming a cycle in a Resource Allocation Graph always means deadlock.',
        correction: 'A cycle guarantees deadlock ONLY if every resource in the cycle has a single instance. If resources have multiple instances, a cycle is a necessary condition, but NOT a sufficient condition.',
        why: 'Other processes outside the cycle holding instances of the same resource can finish and break the cycle.',
      },
    ],
    quickRevision: [
      '4 Coffman Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.',
      'All 4 must hold simultaneously for a deadlock to exist.',
      'Prevention invalidates 1 of 4 conditions; Avoidance uses Bankers Algorithm at runtime.',
      'Single instance RAG: Cycle <=> Deadlock. Multi instance RAG: Cycle is not always deadlock.',
    ],
    practiceQuestions: [
      {
        id: 'os-dl-q1',
        question: 'Which of the following is a technique used to invalidate the Circular Wait condition?',
        options: ['Preempt resources when a process blocks', 'Impose total ordering of all resource types', 'Allocate all resources before process execution begins', 'Convert all resources to shareable mode'],
        correctOptionIndex: 1,
        explanation: 'Imposing a strict numeric ordering on all resources and enforcing that processes request resources in strictly increasing order guarantees circular wait cannot form.',
      },
    ],
  },

  'os-bankers': {
    topicId: 'os-bankers',
    topicName: "Banker's Algorithm & Deadlock Avoidance",
    subjectId: 'operating-systems',
    whatIsIt: "The Banker's Algorithm is a classic deadlock avoidance algorithm developed by Edsger Dijkstra that tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources.",
    simpleExplanation: 'A small-town bank manager has a fixed total pool of cash ($100,000) and several business clients who have each been pre-approved for credit lines up to different limits. When a client asks for a loan installment, the banker checks: "If I give you this cash, will I still have enough reserve cash to satisfy at least one client’s full credit line, wait for them to pay it back, and then satisfy the rest?" If yes, it is a SAFE state and cash is granted.',
    technicalExplanation: "Let n = number of processes, m = number of resource types. Data structures: Available[m] (vector of free resources), Max[n][m] (maximum demand of each process), Allocation[n][m] (currently assigned resources), Need[n][m] = Max[n][m] - Allocation[n][m]. The Safety Algorithm iterates through processes to find one whose Need <= Work (where Work is initialized to Available). Once found, it simulates that process completing, returning its allocated resources: Work = Work + Allocation. If all processes complete (Finish[i] == true for all i), the system is in a Safe State and the execution sequence is a Safe Sequence.",
    importantDefinitions: [
      { term: 'Safe State', definition: 'A state from which the system can allocate resources to each process in some order up to its maximum and still avoid deadlock.' },
      { term: 'Unsafe State', definition: 'A state that is not deadlocked yet, but has no guarantee that deadlock can be avoided if processes request their maximum limits.' },
      { term: 'Need Matrix Formula', definition: 'Need[i][j] = Max[i][j] - Allocation[i][j], representing remaining resources process Pi may request.' },
    ],
    keyConcepts: [
      'Safe State vs Deadlock: Safe State is a subset of all states. Unsafe State is NOT necessarily a deadlock, but it CAN lead to deadlock.',
      'Resource-Request Algorithm: If Request_i <= Need_i and Request_i <= Available, pretend to allocate and test if new state is Safe. If safe, allocate; if unsafe, process Pi must wait.',
      'Banker’s algorithm overhead: Requires processes to declare maximum resource claims in advance, which is rarely realistic in general-purpose computing.',
    ],
    example: {
      type: 'text',
      title: "Banker's Safety Sequence Calculation Example",
      explanation: 'Step-by-step resolution of a 3-process, 1-resource problem.',
      output: `System State:
Total Units of Resource R = 12
Process   Allocation   Max Demand   Need (Max - Alloc)
P0            3            10               7
P1            2             5               3
P2            2             4               2

Total Allocated = 3 + 2 + 2 = 7 units.
Available = Total - Allocated = 12 - 7 = 5 units.

Step 1: Check P0: Need(7) <= Available(5)? No (False).
Step 2: Check P1: Need(3) <= Available(5)? Yes (True).
        P1 executes, finishes, releases allocation: Available = 5 + 2 = 7 units.
Step 3: Check P2: Need(2) <= Available(7)? Yes (True).
        P2 executes, finishes, releases allocation: Available = 7 + 2 = 9 units.
Step 4: Recheck P0: Need(7) <= Available(9)? Yes (True).
        P0 executes, finishes, releases allocation: Available = 9 + 3 = 12 units.

Safe Sequence Found: < P1, P2, P0 >
The system is in a SAFE STATE.`,
    },
    commonInterviewQuestions: [
      {
        question: 'Is an unsafe state always a deadlocked state?',
        answer: 'No. An unsafe state is not necessarily deadlocked. It simply means the OS cannot guarantee that a deadlock will not occur if all processes simultaneously demand their declared maximum resources. If processes do not request their full claims, the system may still complete safely.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Calculating Need as Allocation - Max instead of Max - Allocation.',
        correction: 'Need is always (Max - Allocation), representing what the process still needs to complete.',
        why: 'A process cannot need less than zero additional resources.',
      },
    ],
    quickRevision: [
      'Need = Max - Allocation.',
      'Safety test: Find process with Need <= Available; simulate completion and add its Allocation to Available.',
      'Safe state -> Deadlock impossible; Unsafe state -> Deadlock possible.',
      'Requires prior knowledge of maximum resource demands.',
    ],
    practiceQuestions: [
      {
        id: 'os-bnk-q1',
        question: 'If a system has 3 processes and 1 resource type with 10 total instances, and each process needs at most 4 instances, can deadlock ever occur?',
        options: ['Yes, if they all ask for 4 simultaneously', 'No, deadlock is mathematically impossible', 'Yes, during a context switch', 'Depends on CPU scheduling'],
        correctOptionIndex: 1,
        explanation: 'With 3 processes each needing max 4 units, minimum units to prevent deadlock is N * (M - 1) + 1 = 3 * (4 - 1) + 1 = 10 units. Since exactly 10 units are present, at least one process is guaranteed to get 4 units, complete, and release its resources.',
      },
    ],
  },

  'os-cpu-scheduling': {
    topicId: 'os-cpu-scheduling',
    topicName: 'CPU Scheduling Algorithms',
    subjectId: 'operating-systems',
    whatIsIt: 'CPU scheduling is the process of determining which process in the ready queue is allocated the CPU core for execution, optimizing turnaround time, waiting time, throughput, and CPU utilization.',
    simpleExplanation: 'Think of customers queuing at a bank counter. Does the teller serve whoever stood in line first (FCFS)? Or the person with the quickest 1-minute transaction first (SJF)? Or give everyone 2 minutes in rotation until everyone finishes (Round Robin)?',
    technicalExplanation: 'The short-term scheduler (CPU scheduler) selects from processes in ready memory. Algorithms are Preemptive (running process can be interrupted and moved to ready state) or Non-Preemptive (process holds CPU until it voluntarily terminates or yields for I/O). Metrics: Turnaround Time = Completion Time - Arrival Time; Waiting Time = Turnaround Time - Burst Time; Response Time = First CPU Allocation Time - Arrival Time.',
    importantDefinitions: [
      { term: 'FCFS (First-Come, First-Served)', definition: 'Non-preemptive algorithm that allocates the CPU in order of arrival; suffers from the Convoy Effect.' },
      { term: 'SJF / SRTF', definition: 'Shortest Job First (non-preemptive) and Shortest Remaining Time First (preemptive). Provably optimal for minimizing average waiting time.' },
      { term: 'Round Robin (RR)', definition: 'Preemptive algorithm designed for time-sharing systems where each process gets a small fixed slice of CPU time (time quantum).' },
      { term: 'Convoy Effect', definition: 'When a long CPU-bound process holds the CPU, forcing many short I/O-bound processes to wait behind it, degrading CPU and device utilization.' },
    ],
    keyConcepts: [
      'Gantt Chart: Visual time timeline representing the sequence of process execution on the CPU.',
      'SJF Minimizes Average Waiting Time: Moving short jobs ahead of long jobs reduces the wait of the short job far more than it increases the wait of the long job.',
      'Round Robin Quantum Trade-off: If quantum is too large, RR behaves like FCFS. If quantum is too small, context switch overhead dominates CPU execution.',
      'Priority Inversion: Low-priority process holds a lock needed by a high-priority process, while a medium-priority process preempts the low-priority process.',
    ],
    example: {
      type: 'text',
      title: 'FCFS vs SJF Comparison Example',
      explanation: 'Comparing average waiting times with processes arriving at Time 0.',
      output: `Processes: P1 (Burst: 24ms), P2 (Burst: 3ms), P3 (Burst: 3ms).

1. FCFS Order: P1 -> P2 -> P3
Gantt Chart: |---- P1 (24) ----|-- P2 (27) --|-- P3 (30) --|
Waiting Times: P1 = 0, P2 = 24, P3 = 27
Average Waiting Time = (0 + 24 + 27) / 3 = 17.0 ms (Convoy Effect!)

2. SJF Order: P2 -> P3 -> P1
Gantt Chart: |-- P2 (3) --|-- P3 (6) --|---- P1 (30) ----|
Waiting Times: P2 = 0, P3 = 3, P1 = 6
Average Waiting Time = (0 + 3 + 6) / 3 = 3.0 ms! (Over 5x faster!)`,
    },
    commonInterviewQuestions: [
      {
        question: 'Which CPU scheduling algorithm gives the minimum average waiting time for a given set of processes?',
        answer: 'Shortest Job First (SJF) for non-preemptive scheduling, or Shortest Remaining Time First (SRTF) for preemptive scheduling, is mathematically proven to give the minimum average waiting time.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Confusing Turnaround Time with Waiting Time.',
        correction: 'Turnaround Time is total elapsed time from arrival to completion (TAT = CT - AT). Waiting Time is time spent sitting in the ready queue (WT = TAT - BT).',
        why: 'Waiting time excludes the time during which the process was actually being served on the CPU.',
      },
    ],
    quickRevision: [
      'TAT = Completion Time - Arrival Time.',
      'WT = Turnaround Time - Burst Time.',
      'SJF/SRTF gives minimal average waiting time, but can cause starvation for long jobs.',
      'Round Robin prevents starvation with a cyclic time quantum (typically 10-100ms).',
    ],
    practiceQuestions: [
      {
        id: 'os-cpu-q1',
        question: 'What is the phenomenon called where small processes must wait a long time behind a large CPU-heavy process in FCFS scheduling?',
        options: ['Starvation', 'Convoy Effect', 'Thrashing', 'Priority Inversion'],
        correctOptionIndex: 1,
        explanation: 'The Convoy Effect occurs in FCFS when several short processes wait for one long process to release the CPU.',
      },
    ],
  },

  'os-memory-mgmt': {
    topicId: 'os-memory-mgmt',
    topicName: 'Memory Management & Paging',
    subjectId: 'operating-systems',
    whatIsIt: 'Memory management is the OS subsystem that manages physical RAM, allocates memory chunks to processes, and maps virtual address spaces to physical memory frames.',
    simpleExplanation: 'Imagine an encyclopedia published as loose unbound pages (virtual pages). Instead of needing a massive continuous shelf to fit the entire encyclopedia, the librarian puts individual pages into whatever random empty slots are open across the library shelves (physical frames). An index card at the front desk (Page Table) tells you where each page is stored.',
    technicalExplanation: 'Paging is a non-contiguous memory allocation scheme that eliminates external fragmentation. Logical address space is divided into fixed-size blocks called Pages; physical memory is divided into equal-sized blocks called Frames (typically 4 KB). Logical address generated by CPU is partitioned into a Page Number (p) and an Offset (d). The Page Table maps Page Number p to Frame Number f. Physical address = f * Frame_Size + d. The Translation Lookaside Buffer (TLB) is high-speed hardware associative cache that stores recent page-to-frame translations to accelerate lookups.',
    importantDefinitions: [
      { term: 'Page & Frame', definition: 'Page is a fixed-size block of virtual memory; Frame is an identically sized block of physical RAM.' },
      { term: 'Internal Fragmentation', definition: 'Wasted space within an allocated memory page because the requested memory is smaller than the fixed page boundary.' },
      { term: 'External Fragmentation', definition: 'Total free physical memory is sufficient to satisfy a request, but it is broken into non-contiguous scattered holes.' },
      { term: 'TLB (Translation Lookaside Buffer)', definition: 'High-speed hardware associative cache that holds recently accessed page table entries to avoid an extra RAM access per memory operation.' },
    ],
    keyConcepts: [
      'Paging eliminates External Fragmentation, but retains small Internal Fragmentation on the last allocated page.',
      'Segmentation: Divides memory into variable-sized logical segments reflecting user perspective (Code, Stack, Heap, Arrays). Suffers from External Fragmentation.',
      'Effective Memory Access Time (EMAT): EMAT = Hit_Rate * (TLB_Time + RAM_Time) + (1 - Hit_Rate) * (TLB_Time + 2 * RAM_Time).',
      'Multi-Level Paging: Used in 32/64-bit systems to avoid maintaining massive multi-megabyte contiguous page tables in RAM.',
    ],
    example: {
      type: 'text',
      title: 'Paging Address Calculation Example',
      explanation: 'Deriving physical address from logical address.',
      output: `Given:
Logical Address Space = 4 GB = 2^32 bytes -> 32-bit Logical Address
Page Size = 4 KB = 2^12 bytes -> Offset (d) = 12 bits
Page Number (p) = 32 - 12 = 20 bits (Up to 2^20 = 1,048,576 pages)

If CPU generates Logical Address: 0x00003024
- Page Number p = 0x00003 (Page 3)
- Offset d = 0x024 (Byte 36)

Page Table Lookup: Page 3 maps to Frame 7 (0x07)
Physical Address = (Frame 7 << 12) | Offset
Physical Address = 0x00007024 in physical RAM!`,
    },
    commonInterviewQuestions: [
      {
        question: 'Why does paging suffer from internal fragmentation instead of external fragmentation?',
        answer: 'Because physical memory is allocated in discrete, fixed-size frames, any free frame can be allocated to any process page regardless of its physical location, eliminating external fragmentation. However, if a process needs 5 KB and page size is 4 KB, it gets 2 frames (8 KB total), leaving 3 KB unused in the 2nd frame—which is internal fragmentation.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Thinking that TLB miss means a page fault.',
        correction: 'A TLB miss simply means the translation is not cached in the TLB hardware; the page may still be present in physical RAM. A Page Fault occurs only when the Valid-Invalid bit in the Page Table indicates the page is on disk and NOT in RAM.',
        why: 'TLB is a cache for the page table; the page table is the authority on RAM presence.',
      },
    ],
    quickRevision: [
      'Paging divides virtual memory into Pages and RAM into Frames (both same size).',
      'Paging solves External Fragmentation; leaves minor Internal Fragmentation.',
      'TLB is associative memory cache for rapid page translation.',
      'Effective Memory Access Time accounts for TLB hit ratio and memory access penalties.',
    ],
    practiceQuestions: [
      {
        id: 'os-mem-q1',
        question: 'In a paging system with 4 KB page size, how many bits are used for the page offset?',
        options: ['10 bits', '12 bits', '16 bits', '20 bits'],
        correctOptionIndex: 1,
        explanation: 'Page Size = 4 KB = 4 * 1024 bytes = 4096 bytes = 2^12 bytes. Therefore, 12 bits are required for the page offset.',
      },
    ],
  },

  'os-virtual-memory': {
    topicId: 'os-virtual-memory',
    topicName: 'Virtual Memory & Page Replacement',
    subjectId: 'operating-systems',
    whatIsIt: 'Virtual memory is a memory management capability of an OS that uses hardware and software to allow a computer to compensate for physical memory shortages by temporarily transferring data from RAM to disk storage.',
    simpleExplanation: 'Imagine an actor playing a play with 20 costume changes, but their dressing room only holds 3 costumes at a time. The backstage assistant (OS) brings the costume needed for the next scene into the room (Demand Paging) and sends the costume from the previous scene back into the warehouse trunk (Swap Space).',
    technicalExplanation: 'Demand Paging loads pages into physical memory only when requested during execution. When a process accesses a page marked invalid in the Page Table, hardware triggers a Page Fault trap to the OS kernel. The OS locates the page in backing store, finds a free frame (or evicts an existing victim frame using a Page Replacement Algorithm), reads the page into the frame, marks the page valid, and restarts the faulting instruction. If frames are insufficient, Thrashing occurs—where the OS spends more time paging data in and out than executing instructions.',
    importantDefinitions: [
      { term: 'Page Fault', definition: 'A hardware interrupt raised by the Memory Management Unit (MMU) when a program accesses a memory page that is currently not resident in RAM.' },
      { term: 'Thrashing', definition: 'A catastrophic condition where the CPU utilization drops to near zero because the system spends virtually all time swapping pages into and out of disk.' },
      { term: "Belady's Anomaly", definition: 'The counter-intuitive phenomenon where allocating MORE physical memory frames results in MORE page faults under FIFO page replacement.' },
      { term: 'LRU (Least Recently Used)', definition: 'An optimal-approximating page replacement algorithm that replaces the page that has not been used for the longest period of time.' },
    ],
    keyConcepts: [
      'Page Replacement Algorithms: FIFO (First In, First Out), LRU (Least Recently Used), Optimal (replaces page not used for longest time in future; theoretical benchmark).',
      "Belady's Anomaly occurs in FIFO, but NEVER in stack algorithms like LRU or Optimal.",
      'Working Set Model: The set of pages actively referenced by a process in a recent time window delta (Δ). If total working set size exceeds physical RAM, thrashing occurs.',
    ],
    example: {
      type: 'text',
      title: "LRU vs FIFO Page Replacement Trace",
      explanation: 'Reference string: 7, 0, 1, 2, 0, 3 with 3 available frames.',
      output: `Reference String: 7, 0, 1, 2, 0, 3 (3 Frames)

FIFO Algorithm:
Page 7: [7]       - Fault (1)
Page 0: [7, 0]    - Fault (2)
Page 1: [7, 0, 1] - Fault (3)
Page 2: [2, 0, 1] - Fault (4) (Evicts 7, oldest)
Page 0: [2, 0, 1] - Hit
Page 3: [2, 3, 1] - Fault (5) (Evicts 0, oldest)
Total FIFO Faults = 5

LRU Algorithm:
Page 7: [7]       - Fault (1)
Page 0: [7, 0]    - Fault (2)
Page 1: [7, 0, 1] - Fault (3)
Page 2: [2, 0, 1] - Fault (4) (Evicts 7, least recently used)
Page 0: [2, 0, 1] - Hit (Refreshes 0 to most recently used)
Page 3: [2, 0, 3] - Fault (5) (Evicts 1, since 0 was just used!)`,
    },
    commonInterviewQuestions: [
      {
        question: "What is Belady's Anomaly and which page replacement algorithms are susceptible to it?",
        answer: "Belady's Anomaly is the phenomenon where increasing the number of page frames causes an increase in the number of page faults for a given memory access pattern. It affects FIFO page replacement. It does NOT affect Stack Algorithms such as LRU, MRU, or Optimal, because the set of pages in an n-frame system is always a subset of pages in an (n+1)-frame system under stack algorithms.",
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming Optimal page replacement can be implemented in real operating systems.',
        correction: 'Optimal replacement requires perfect future knowledge of all upcoming memory accesses, which is impossible at runtime in general-purpose systems.',
        why: 'Optimal algorithm is strictly used as an offline theoretical ceiling to measure the efficiency of heuristic algorithms like LRU.',
      },
    ],
    quickRevision: [
      'Page Fault triggers OS to load missing page from disk swap space into RAM frame.',
      'FIFO can exhibit Belady’s anomaly; LRU and Optimal never do.',
      'Thrashing occurs when high degree of multiprogramming causes page fault frequency to explode.',
      'Working set model tracks active pages to prevent thrashing.',
    ],
    practiceQuestions: [
      {
        id: 'os-vm-q1',
        question: "Which of the following page replacement algorithms CANNOT suffer from Belady's Anomaly?",
        options: ['FIFO', 'Second-Chance', 'LRU (Least Recently Used)', 'Random Replacement'],
        correctOptionIndex: 2,
        explanation: 'LRU is a stack algorithm; the contents of n frames are guaranteed to be a subset of the contents of n+1 frames, completely precluding Beladys anomaly.',
      },
    ],
  },
};
