import { UserNote } from '../types';

export const INITIAL_NOTES: UserNote[] = [
  {
    id: 'note-1',
    subjectId: 'operating-systems',
    topicId: 'os-sync',
    title: 'Critical Section & Semaphore Rules',
    content: `# Critical Section 3 Requirements:
1. Mutual Exclusion: At most 1 process inside CS at any time.
2. Progress: If no process is in CS, only processes waiting to enter can participate in deciding who enters next.
3. Bounded Waiting: A bound exists on number of times other processes can enter before a request is granted.

# Semaphore Operations:
- wait(S) / P(S): Decrements S. If S <= 0, block.
- signal(S) / V(S): Increments S. Wakes up waiting process.
- Producer-Consumer: wait(empty) -> wait(mutex) -> [add] -> signal(mutex) -> signal(full).`,
    isPinned: true,
    createdAt: '2026-09-20T10:00:00.000Z',
    updatedAt: '2026-09-20T10:00:00.000Z',
    tags: ['Semaphores', 'Deadlock', 'Concurrency'],
  },
  {
    id: 'note-2',
    subjectId: 'sql',
    topicId: 'sql-sublanguages',
    title: 'DELETE vs TRUNCATE vs DROP Quick Summary',
    content: `| Feature | DELETE | TRUNCATE | DROP |
|---|---|---|---|
| Language | DML | DDL | DDL |
| Scope | Row by row | Whole table data pages | Table + Schema destroyed |
| WHERE Clause | Allowed | NOT allowed | NOT allowed |
| Speed | Slower (logged per row) | Fast (page deallocation) | Instant |
| Rollback | Yes (in transaction) | No / Rarely | No |
| Triggers | Fires DELETE triggers | Does NOT fire triggers | Does NOT fire triggers |`,
    isPinned: true,
    createdAt: '2026-09-21T14:30:00.000Z',
    updatedAt: '2026-09-21T14:30:00.000Z',
    tags: ['SQL', 'DDL', 'DML'],
  },
  {
    id: 'note-3',
    subjectId: 'data-structures',
    topicId: 'ds-sorting',
    title: 'Sorting Asymptotics & Stability Cheatsheet',
    content: `- MergeSort: O(n log n) Best, Avg, Worst. Space O(n). STABLE.
- QuickSort: O(n log n) Best, Avg. O(n^2) Worst. Space O(log n). UNSTABLE.
- HeapSort: O(n log n) in all cases. Space O(1). UNSTABLE.
- InsertionSort: O(n) Best (nearly sorted), O(n^2) Worst. Space O(1). STABLE.
- CountingSort / RadixSort: Non-comparison O(n + k), breaks Omega(n log n) lower bound.`,
    isPinned: false,
    createdAt: '2026-09-22T08:15:00.000Z',
    updatedAt: '2026-09-22T08:15:00.000Z',
    tags: ['Sorting', 'Complexity', 'Big-O'],
  },
  {
    id: 'note-4',
    subjectId: 'java',
    topicId: 'java-strings-methods',
    title: 'Java String Immutability & SCP',
    content: `- String literals ("abc") reside in the String Constant Pool (SCP) in the Heap.
- "new String("abc")" creates an object in normal heap memory.
- "==" compares memory references.
- ".equals()" compares character contents.
- StringBuilder: mutable, unsynchronized, fast.
- StringBuffer: mutable, synchronized, thread-safe.`,
    isPinned: false,
    createdAt: '2026-09-22T16:00:00.000Z',
    updatedAt: '2026-09-22T16:00:00.000Z',
    tags: ['Java', 'Strings', 'JVM'],
  },
];
