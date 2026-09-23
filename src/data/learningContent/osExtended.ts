import { TopicLearningContent } from '../../types';

export const OS_EXTENDED_CONTENT: Record<string, TopicLearningContent> = {
  'os-ipc': {
    topicId: 'os-ipc',
    topicName: 'Inter-Process Communication (IPC)',
    subjectId: 'operating-systems',
    whatIsIt: 'Inter-Process Communication (IPC) is a set of OS mechanisms that allow cooperating processes to exchange data, notifications, and synchronize actions across separate address spaces.',
    simpleExplanation: 'Processes normally live in isolated soundproof rooms (memory spaces) so one crashing program cannot ruin others. When two processes need to work together (like a web browser passing video data to an audio player), they need a mailbox (Message Passing) or a shared white-board (Shared Memory) provided and guarded by the OS.',
    technicalExplanation: 'The OS provides two primary models for IPC: Shared Memory and Message Passing. In Shared Memory, a region of physical memory is mapped into the virtual address spaces of both processes. After setup, communication occurs at memory-bus speeds without kernel intervention, but requires synchronization (semaphores/mutexes) to prevent race conditions. In Message Passing, communication is mediated by the kernel using system calls like send() and receive(), facilitating distributed systems and avoiding memory corruption risks.',
    importantDefinitions: [
      { term: 'Ordinary Pipes', definition: 'Unidirectional IPC channels allowing parent-child processes to communicate via standard byte streams (anonymous pipes in UNIX).' },
      { term: 'Named Pipes (FIFOs)', definition: 'Bidirectional communication channels that persist in the file system, allowing unrelated processes on the same machine to communicate.' },
      { term: 'Shared Memory', definition: 'An IPC mechanism where multiple processes map the same physical memory frame into their virtual address spaces, achieving maximum transfer throughput.' },
      { term: 'Message Queue', definition: 'A linked list of discrete messages stored within kernel memory, allowing asynchronous message posting and retrieval by message type.' },
      { term: 'Socket', definition: 'An endpoint for bidirectional communication over a network identified by an IP address and Port number.' }
    ],
    keyConcepts: [
      'Shared Memory vs Message Passing: Shared memory is faster for large data; message passing is cleaner for small messages and distributed nodes.',
      'Synchronization Necessity: Shared memory requires semaphores or mutexes to prevent concurrent write collisions.',
      'Blocking vs Non-Blocking: Synchronous (blocking) send waits until the message is received; asynchronous (non-blocking) returns immediately.',
      'Buffer Capacity: Zero capacity (rendezvous), Bounded capacity (queue with limit), Unbounded capacity.'
    ],
    example: {
      type: 'code',
      title: 'UNIX Pipe Implementation in C',
      language: 'c',
      code: `#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main() {
    int fd[2]; // fd[0]: read end, fd[1]: write end
    char buffer[50];
    
    if (pipe(fd) == -1) return 1;
    
    pid_t pid = fork();
    if (pid > 0) { // Parent process (Writer)
        close(fd[0]); // Close unused read end
        char *msg = "Data from Parent via Pipe!";
        write(fd[1], msg, strlen(msg) + 1);
        close(fd[1]);
    } else { // Child process (Reader)
        close(fd[1]); // Close unused write end
        read(fd[0], buffer, sizeof(buffer));
        printf("Child received: %s\\n", buffer);
        close(fd[0]);
    }
    return 0;
}`,
      output: 'Child received: Data from Parent via Pipe!',
      explanation: 'Pipes use a 2-element file descriptor array. Data written to fd[1] is buffered by the OS kernel and read from fd[0].'
    },
    commonInterviewQuestions: [
      {
        question: 'Which IPC mechanism is faster: Shared Memory or Message Queues, and why?',
        answer: 'Shared Memory is significantly faster because once the shared memory region is mapped, read and write operations occur at CPU memory bus speeds with zero kernel context switches. Message Passing requires multiple system calls and data copies (User space -> Kernel space -> User space) for every transmission.',
        tips: 'Mention that while Shared Memory is faster, the programmer must explicitly handle mutual exclusion.'
      },
      {
        question: 'What is the key difference between an ordinary pipe and a named pipe (FIFO)?',
        answer: 'Ordinary pipes are anonymous, exist only as long as the creating process lives, and are restricted to related processes (parent-child). Named pipes exist as directory entries in the file system, persist after processes terminate, and enable communication between completely unrelated processes.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to close the unused pipe end in parent or child processes.',
        correction: 'Always close unused file descriptors (fd[0] or fd[1]) immediately after forking.',
        why: 'Leaving open write ends prevents the reader from ever receiving EOF (End of File), causing reader processes to hang indefinitely.'
      }
    ],
    quickRevision: [
      'Shared Memory: Fastest IPC, zero-copy after mapping, requires explicit synchronization.',
      'Message Passing: Safer, mediated by kernel, suitable for distributed systems.',
      'Anonymous Pipes: Unidirectional, parent-child only; FIFOs: Persistent in filesystem.',
      'Sockets: Universal IPC working both locally (UNIX domain) and over networks (TCP/UDP).'
    ],
    practiceQuestions: [
      {
        id: 'os-ipc-pq1',
        question: 'In UNIX, which system call creates an anonymous unidirectional data channel for IPC between related processes?',
        options: ['socket()', 'pipe()', 'shmget()', 'msgget()'],
        correctOptionIndex: 1,
        explanation: 'pipe() creates an anonymous unidirectional data channel returning two file descriptors for reading and writing.'
      },
      {
        id: 'os-ipc-pq2',
        question: 'Why does Shared Memory require synchronization primitives like semaphores?',
        options: [
          'Because the kernel deletes memory after one read',
          'Because multiple processes can write concurrently to the same addresses causing race conditions',
          'Because memory can only be allocated in kernel mode',
          'Because shared memory cannot store strings'
        ],
        correctOptionIndex: 1,
        explanation: 'Without synchronization, simultaneous writes to the shared memory region lead to unpredictable data corruption and race conditions.'
      }
    ]
  },

  'os-concurrency': {
    topicId: 'os-concurrency',
    topicName: 'Concurrency & Race Conditions',
    subjectId: 'operating-systems',
    whatIsIt: 'Concurrency is the ability of an operating system to execute multiple instruction streams in overlapping time intervals, creating potential race conditions when accessing shared mutable data.',
    simpleExplanation: 'Imagine two people sharing a bank account with $100. Both go to different ATMs at the exact same second to withdraw $80. If both ATMs read "Balance: $100" before either updates it, both will hand out $80 ($160 total!), leaving the bank in the red. Concurrency without synchronization creates this exact disaster.',
    technicalExplanation: 'A Race Condition occurs when the system output depends on the non-deterministic order of thread execution or CPU context switches. The Critical Section is the block of code accessing shared variables. Any valid solution to the Critical Section problem must satisfy three strict requirements: 1) Mutual Exclusion (at most one thread in the critical section), 2) Progress (if no thread is in the critical section, selection of the next cannot be postponed indefinitely), and 3) Bounded Waiting (there is a limit on the number of times other threads enter before a waiting thread enters).',
    importantDefinitions: [
      { term: 'Race Condition', definition: 'A flaw where the outcome of concurrent operations depends on the arbitrary interleaving or timing of execution threads.' },
      { term: 'Critical Section', definition: 'A piece of code that accesses shared resources (like shared memory or files) that must not be concurrently accessed by more than one thread.' },
      { term: 'Mutual Exclusion (Mutex)', definition: 'A property ensuring that if process Pi is executing in its critical section, no other processes can execute in theirs.' },
      { term: 'Atomic Operation', definition: 'An uninterrupted machine instruction sequence that completes in a single step with respect to all other threads (e.g., TestAndSet, CompareAndSwap).' }
    ],
    keyConcepts: [
      'Three Requirements for Critical Section: Mutual Exclusion, Progress, Bounded Waiting.',
      'Hardware Synchronization: CPU atomic instructions like Test-and-Set (TAS) and Compare-and-Swap (CAS) provide hardware-guaranteed atomicity.',
      'Peterson’s Algorithm: Classical software-based mutual exclusion solution for two processes using turn and flag variables.',
      'Spinlocks vs Blocking: Spinlocks busy-wait in a while loop (ideal for short lock holds on multi-core); blocking puts the thread into sleep state.'
    ],
    example: {
      type: 'diagram',
      title: 'Critical Section Execution Flow',
      explanation: 'Structure of any valid synchronization pattern',
      diagramAscii: `
+------------------------------------+
| Entry Section                      |  <-- Acquire Lock / Wait semaphore
|   (Acquires exclusive right)       |
+------------------------------------+
                 |
                 v
+------------------------------------+
| Critical Section                   |  <-- Access shared mutable variables
|   counter = counter + 1            |      (Strictly 1 thread permitted)
+------------------------------------+
                 |
                 v
+------------------------------------+
| Exit Section                       |  <-- Release Lock / Signal semaphore
|   (Signals waiting threads)        |
+------------------------------------+
                 |
                 v
+------------------------------------+
| Remainder Section                  |  <-- Independent non-shared code
+------------------------------------+
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What are the three criteria that every solution to the critical section problem must satisfy?',
        answer: '1. Mutual Exclusion: Only one process can execute in its critical section at any given time.\n2. Progress: If no process is in its critical section and some wish to enter, only those not in their remainder section can participate in the decision, and this selection cannot be postponed indefinitely.\n3. Bounded Waiting: A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter.'
      },
      {
        question: 'What is a Spinlock and when is it preferred over a blocking mutex?',
        answer: 'A spinlock is a lock where a thread continuously polls/loops ("spins") checking if the lock is free. It is preferred when lock contention duration is shorter than the context-switching overhead (common inside OS kernels on multiprocessor systems), avoiding costly thread sleep/wakeup cycles.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming `count++` in C/Java is an atomic operation.',
        correction: 'Recognize that `count++` compiles down to 3 distinct assembly instructions: LOAD, INCREMENT, and STORE.',
        why: 'A context switch between LOAD and STORE causes lost updates, which is the quintessential race condition.'
      }
    ],
    quickRevision: [
      'Race Condition: Non-deterministic bugs caused by unsynchronized concurrent access.',
      'Three Gold Criteria: Mutual Exclusion, Progress, Bounded Waiting.',
      'Hardware support: TestAndSet (TAS) and CompareAndSwap (CAS) prevent race conditions.',
      'Peterson’s solution satisfies all 3 criteria for 2-process synchronization.'
    ],
    practiceQuestions: [
      {
        id: 'os-conc-pq1',
        question: 'Which of the following is NOT one of the three mandatory criteria for solving the critical section problem?',
        options: ['Mutual Exclusion', 'Bounded Waiting', 'Starvation Maximization', 'Progress'],
        correctOptionIndex: 2,
        explanation: 'The three mandatory criteria are Mutual Exclusion, Progress, and Bounded Waiting. Starvation maximization is the exact opposite of what OS synchronization aims to achieve.'
      }
    ]
  },

  'os-io-resource-sched': {
    topicId: 'os-io-resource-sched',
    topicName: 'I/O Systems & Disk Scheduling',
    subjectId: 'operating-systems',
    whatIsIt: 'I/O Systems manage peripheral communication via device drivers, controllers, interrupts, and DMA, while Disk Scheduling optimizes the mechanical seek time of secondary storage access.',
    simpleExplanation: 'Moving an arm on a hard drive is like an elevator in a skyscraper. If an elevator served floors strictly in the order buttons were pressed (FCFS), it would constantly fly from floor 1 to floor 90 and back down to floor 2, wasting massive time. Elevator algorithms (SCAN/LOOK) move smoothly in one direction, picking up everyone along the way before reversing.',
    technicalExplanation: 'The OS bridges hardware devices using Memory-Mapped I/O or Port-Mapped I/O. Direct Memory Access (DMA) transfers high-speed data blocks directly between device controllers and main memory without continuous CPU intervention, raising an interrupt only on completion. Disk Scheduling algorithms sequence pending I/O requests to minimize total head movement (Seek Time): FCFS (simple, high seek time), SSTF (Shortest Seek Time First, vulnerable to starvation), SCAN (Elevator, sweeps back and forth to end of disk), C-SCAN (Circular SCAN, sweeps in one direction only then returns to beginning), and LOOK/C-LOOK (sweeps only as far as the last request).',
    importantDefinitions: [
      { term: 'Seek Time', definition: 'The time required for the disk read/write head arm to position itself over the desired cylinder track.' },
      { term: 'Rotational Latency', definition: 'The time taken for the desired disk sector to rotate beneath the read/write head.' },
      { term: 'Direct Memory Access (DMA)', definition: 'A specialized hardware controller that transfers blocks of data directly between I/O devices and main memory without continuous CPU intervention.' },
      { term: 'SCAN (Elevator Algorithm)', definition: 'Disk scheduling where the arm moves in one direction servicing requests until it reaches the disk boundary, then reverses direction.' },
      { term: 'C-LOOK Algorithm', definition: 'Arm moves in one direction only as far as the outermost request, then jumps back to the innermost request without traveling to the physical disk ends.' }
    ],
    keyConcepts: [
      'Disk Access Time Formula: Access Time = Seek Time + Rotational Latency + Transfer Time.',
      'Seek time dominates mechanical disk performance (~4-10ms vs sub-microsecond electronic operations).',
      'SSTF starvation: Outer tracks can starve if continuous requests arrive near the current head position.',
      'C-SCAN provides more uniform waiting time compared to bidirectional SCAN.'
    ],
    example: {
      type: 'text',
      title: 'Disk Scheduling Trace: SSTF vs SCAN vs C-LOOK',
      explanation: 'Head initially at track 50. Request queue: [82, 170, 43, 140, 24, 16, 190].',
      code: `
Initial head position: 50

1. FCFS:
   Sequence: 50 -> 82 -> 170 -> 43 -> 140 -> 24 -> 16 -> 190
   Total Head Movement: (32 + 88 + 127 + 97 + 116 + 8 + 174) = 642 tracks

2. SSTF (Shortest Seek First):
   Closest to 50 is 43 (dist 7), then 24 (dist 19), then 16 (dist 8),
   then 82 (dist 66), then 140 (dist 58), then 170 (dist 30), then 190 (dist 20).
   Total Head Movement: (7 + 19 + 8) + (82-16) + (140-82) + (170-140) + (190-170)
   = 34 + 66 + 58 + 30 + 20 = 208 tracks! (Much lower)

3. C-LOOK (Moving Upwards):
   Sequence: 50 -> 82 -> 140 -> 170 -> 190 -> (jump to lowest 16) -> 24 -> 43
   Avoids seeking to empty cylinder 0 or cylinder 199.
      `
    },
    commonInterviewQuestions: [
      {
        question: 'Why does C-SCAN provide a more uniform waiting time than standard SCAN?',
        answer: 'In standard SCAN, when the head reverses direction at the boundary, areas near the middle of the disk wait much longer between visits than the areas near the ends. In C-SCAN, the head treats the cylinders as a circular list, always servicing requests in one single direction, ensuring every sector experiences a predictable and uniform wait interval.'
      },
      {
        question: 'How does DMA benefit system performance compared to programmed I/O?',
        answer: 'Under programmed I/O or interrupt-driven I/O, the CPU must execute instructions to transfer every byte between memory and the controller. With DMA, the CPU delegates the block transfer to the DMA controller and continues executing other processes. The CPU is interrupted only once per completed multi-kilobyte block.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming LOOK and SCAN are identical.',
        correction: 'SCAN travels all the way to the absolute physical edge (track 0 or track MAX), whereas LOOK stops at the furthest pending request and reverses immediately.',
        why: 'LOOK saves unnecessary head movement to track 0 or track MAX when no requests exist there.'
      }
    ],
    quickRevision: [
      'Seek Time: Dominant component of disk latency.',
      'SSTF: Minimizes seek time locally, but can cause starvation for distant requests.',
      'SCAN / Elevator: Sweeps back and forth to disk boundaries.',
      'C-LOOK: Most efficient practical modern disk scheduling algorithm.',
      'DMA: Transfers entire data blocks to RAM without CPU byte-by-byte polling.'
    ],
    practiceQuestions: [
      {
        id: 'os-io-pq1',
        question: 'Which disk scheduling algorithm is most prone to starvation of distant requests?',
        options: ['FCFS', 'SSTF', 'SCAN', 'C-LOOK'],
        correctOptionIndex: 1,
        explanation: 'SSTF prioritizes requests closest to the current head position, causing requests on distant tracks to starve indefinitely if nearby requests keep arriving.'
      }
    ]
  },

  'os-file-systems': {
    topicId: 'os-file-systems',
    topicName: 'File Systems & Directory Structures',
    subjectId: 'operating-systems',
    whatIsIt: 'A File System provides the logical organization, storage, naming, access control, and physical disk allocation methods for non-volatile persistent files.',
    simpleExplanation: 'A hard disk or SSD is just billions of raw bytes. A file system is like the filing cabinet and catalog in a library: it gives files names, puts them in folders, keeps track of who is allowed to read them, and remembers exactly which disk sectors contain chapters of your favorite book.',
    technicalExplanation: 'The OS represents files using metadata control blocks (FCBs or Inodes in UNIX). An Inode stores file size, permissions, owner, timestamps, and data block pointers: direct pointers (pointing directly to data blocks), single indirect pointers (pointing to a block of pointers), double indirect, and triple indirect pointers. Physical allocation methods determine how blocks are assigned: 1) Contiguous allocation (fast sequential access, suffers from external fragmentation), 2) Linked allocation (linked list of blocks, no external fragmentation, but slow random access), and 3) Indexed allocation (index block stores all pointers, fast random access, used in modern systems).',
    importantDefinitions: [
      { term: 'Inode (Index Node)', definition: 'A data structure in UNIX file systems storing metadata about a file (size, owner, permissions) and pointers to its data blocks, excluding the filename.' },
      { term: 'Contiguous Allocation', definition: 'Each file occupies a set of consecutive blocks on disk; excellent read speed, but causes severe external fragmentation.' },
      { term: 'Linked Allocation', definition: 'Each file is a linked list of disk blocks with pointers inside blocks; eliminates external fragmentation but random access is O(N).' },
      { term: 'Indexed Allocation', definition: 'All disk block pointers for a file are gathered into an index block, supporting direct access without external fragmentation.' },
      { term: 'Superblock', definition: 'A critical file system metadata block containing global characteristics like total block count, free block count, and inode count.' }
    ],
    keyConcepts: [
      'UNIX Inode Structure: Contains ~12 Direct pointers, 1 Single Indirect pointer, 1 Double Indirect pointer, and 1 Triple Indirect pointer to support massive file sizes.',
      'Directory Implementation: A directory is essentially a special file containing pairs of (Filename, Inode Number).',
      'Hard Link vs Symbolic (Soft) Link: Hard links point directly to the Inode (file persists if original name deleted); Soft links point to another path string (breaks if target moves).',
      'Free Space Management: Bitmaps (bit vectors) and Free Linked Lists track available disk blocks.'
    ],
    example: {
      type: 'diagram',
      title: 'UNIX Inode Pointer Hierarchy',
      explanation: 'How UNIX Inodes scale from small files to multi-gigabyte files efficiently',
      diagramAscii: `
+------------------------------------+
| INODE METADATA                     |
| Size, Mode, Owner, Timestamps      |
+------------------------------------+
| Direct Ptr 0  ------> [Data Block] |
| Direct Ptr 1  ------> [Data Block] |
| ...           ------> [Data Block] |
| Direct Ptr 11 ------> [Data Block] |
+------------------------------------+
| Single Indirect Ptr                |
|   |---> [Block of Data Pointers]   |
|           |---> [Data Block]       |
+------------------------------------+
| Double Indirect Ptr                |
|   |---> [Block of Indirect Ptrs]   |
|           |---> [Block of Ptrs]    |
|                   |---> [Data Block]
+------------------------------------+
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What happens to a file and its data when you delete a hard link versus a soft link?',
        answer: 'Every Inode maintains a link count. When a hard link is removed, the link count is decremented by 1. The data blocks and inode are deleted ONLY when the link count reaches 0 and no processes have the file open. Removing a soft (symbolic) link merely deletes the shortcut file itself; the target inode and its data remain completely unaffected.'
      },
      {
        question: 'Why does UNIX separate the filename from the Inode metadata?',
        answer: 'Separating filenames into directory tables allows multiple filenames (hard links) across different directories to reference the exact same underlying file and data blocks without duplicating data on disk.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Believing hard links can span across different disk partitions or file systems.',
        correction: 'Hard links can ONLY exist within the same file system partition.',
        why: 'Inodes are only unique within a single file system. Across different partitions, identical Inode numbers point to completely different files.'
      }
    ],
    quickRevision: [
      'Contiguous: Fast sequential read, suffers from external fragmentation.',
      'Linked: No external fragmentation, but random access is sluggish O(n).',
      'Indexed (Inodes): Fast random access, standard in Linux/UNIX file systems.',
      'Hard link shares Inode number; Soft link stores path string.'
    ],
    practiceQuestions: [
      {
        id: 'os-fs-pq1',
        question: 'In a UNIX file system, where is the filename of a file stored?',
        options: ['Inside the Inode', 'In the Superblock', 'In the directory entry that contains the file', 'In the boot sector'],
        correctOptionIndex: 2,
        explanation: 'In UNIX, Inodes store metadata and block pointers, but NOT the filename. Filenames are stored as mapping entries inside directory files.'
      }
    ]
  },

  'os-dos-unix-win': {
    topicId: 'os-dos-unix-win',
    topicName: 'DOS, UNIX & Windows OS Architectures',
    subjectId: 'operating-systems',
    whatIsIt: 'A comparative architectural overview of classical and modern operating systems: single-tasking DOS, multi-user modular UNIX, and hybrid Windows NT architecture.',
    simpleExplanation: 'DOS was like a bicycle with one seat—simple, direct hardware access, single-user, single-tasking. UNIX is a sturdy industrial train with modular cars—everything is a file, multi-user, rock-solid security. Windows NT is a high-tech luxury bus—a hybrid kernel combining high performance with protected subsystem services.',
    technicalExplanation: 'MS-DOS featured a simple, monolithic, single-tasking architecture with no memory protection or dual-mode hardware enforcement, meaning application crashes halted the entire machine. UNIX introduced the monolithic kernel with high modularity, hierarchical file system, multi-user permissions, and the principle that "everything is a file" (devices, sockets, and pipes are file descriptors). Windows NT employs a Hybrid Kernel Architecture consisting of an unprivileged user-mode Executive/Subsystems layer and a privileged NTOS kernel, combining microkernel modularity with monolithic speed.',
    importantDefinitions: [
      { term: 'Monolithic Kernel', definition: 'An OS architecture where all core services (VFS, IPC, memory management, drivers) execute in kernel space within a single address space (e.g., Linux, UNIX).' },
      { term: 'Microkernel', definition: 'An architecture keeping only minimal mechanisms (IPC, basic scheduling, virtual memory) in kernel space, running drivers and file systems as user-space servers (e.g., Mach, QNX).' },
      { term: 'Hybrid Kernel', definition: 'A design combining microkernel modularity with monolithic execution performance by keeping core subsystems in kernel space (e.g., Windows NT kernel).' },
      { term: 'POSIX', definition: 'Portable Operating System Interface: IEEE standards defining API compatibility for UNIX-like systems.' }
    ],
    keyConcepts: [
      'DOS limitations: Real mode (1MB address space limit), no multitasking, no memory protection.',
      'UNIX Philosophy: Small programs that do one thing well, composable via pipes, text streams as universal interfaces.',
      'Windows NT Architecture: HAL (Hardware Abstraction Layer), Executive Services, NT Kernel, User-mode Subsystems (Win32, POSIX).',
      'Monolithic vs Microkernel Trade-off: Monolithic is faster (direct function calls); microkernel is more crash-resilient (driver crash does not crash kernel).'
    ],
    example: {
      type: 'diagram',
      title: 'Architectural Comparison: Monolithic vs Microkernel vs Hybrid',
      explanation: 'Visualizing where device drivers and file systems reside relative to the kernel boundary',
      diagramAscii: `
1. MONOLITHIC (UNIX/Linux):
+------------------------------------------------------+
| User Space: Applications & Libraries                 |
+======================================================+
| Kernel Space: [VFS] [Drivers] [Scheduler] [Memory]   |
+------------------------------------------------------+
| Hardware                                             |
+------------------------------------------------------+

2. MICROKERNEL (Mach/QNX):
+------------------------------------------------------+
| User Space: Applications | [File System] | [Drivers] |
+======================================================+
| Kernel Space: [IPC] [Basic Scheduling] [Virtual Mem] |
+------------------------------------------------------+
| Hardware                                             |
+------------------------------------------------------+

3. HYBRID (Windows NT):
+------------------------------------------------------+
| User Space: Subsystems (Win32) & User Applications   |
+======================================================+
| Kernel Space: Executive + Microkernel + Drivers + GDI|
+------------------------------------------------------+
| Hardware Abstraction Layer (HAL)                     |
+------------------------------------------------------+
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What is the primary architectural difference between Linux and Windows NT?',
        answer: 'Linux is a monolithic kernel where drivers and file systems execute in privileged kernel mode for maximum performance. Windows NT is a hybrid kernel that combines microkernel modularity (client-server user subsystems) with a kernel-space executive layer and a Hardware Abstraction Layer (HAL).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming MS-DOS supported virtual memory or multi-threading.',
        correction: 'MS-DOS operated in 16-bit real mode with no virtual memory, no paging, and no native multitasking.',
        why: 'DOS had no protection mechanisms; programs had direct hardware access to interrupts and video memory.'
      }
    ],
    quickRevision: [
      'DOS: Single-user, single-tasking, no memory protection.',
      'UNIX: Multi-user, multitasking, monolithic, everything is a file.',
      'Windows NT: Hybrid kernel with HAL and user-space Win32 subsystem.',
      'Microkernel: High stability and isolation; Monolithic: Highest throughput.'
    ],
    practiceQuestions: [
      {
        id: 'os-arch-pq1',
        question: 'Which OS architecture runs device drivers as isolated user-mode processes to prevent kernel crashes?',
        options: ['Monolithic Kernel', 'Microkernel', 'Real-time DOS', 'Batch OS'],
        correctOptionIndex: 1,
        explanation: 'In a microkernel, device drivers and file systems run as user-mode server processes; a crash in a driver will not crash the core kernel.'
      }
    ]
  }
};
