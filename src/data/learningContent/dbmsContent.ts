import { TopicLearningContent } from '../../types';

export const DBMS_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  'dbms-keys': {
    topicId: 'dbms-keys',
    topicName: 'Relational Keys (Primary, Foreign, Candidate, Super)',
    subjectId: 'dbms',
    whatIsIt: 'In a Relational Database Management System (RDBMS), keys are attributes or sets of attributes used to uniquely identify tuples (rows) within a relation (table) and establish referential relationships between tables.',
    simpleExplanation: 'Think of students in a university. A student’s Aadhaar number + phone number + name together is a Super Key (identifies you uniquely, but has extra unnecessary details). The Aadhaar number alone is a Candidate Key (minimal, sufficient). The university picks Student_Roll_No as the official Primary Key. When the library issues a book, it records the Student_Roll_No in its checkout table as a Foreign Key to link to the student profile.',
    technicalExplanation: 'Super Key: Any superset of attributes that uniquely identifies a row. Candidate Key: A minimal super key (no proper subset is a super key). Primary Key: The single candidate key chosen by the database designer to uniquely index the table; strictly cannot accept NULL values. Alternate Key: Candidate keys not chosen as the primary key. Foreign Key: An attribute or collection of attributes in one relation that references the Primary Key (or unique candidate key) of another relation, enforcing Referential Integrity.',
    importantDefinitions: [
      { term: 'Candidate Key', definition: 'A minimal set of attributes that can uniquely identify a tuple in a relation without any redundant attributes.' },
      { term: 'Primary Key', definition: 'A selected candidate key that uniquely identifies each record in a table, requiring NOT NULL and UNIQUE constraints.' },
      { term: 'Foreign Key', definition: 'A column in a child table that refers to the primary key of a parent table, establishing a relationship.' },
      { term: 'Referential Integrity', definition: 'A relational rule stating that a foreign key value must either match an existing primary key value in the referenced table or be completely NULL.' },
    ],
    keyConcepts: [
      'Hierarchy of Keys: All Candidate Keys are Super Keys, but not all Super Keys are Candidate Keys.',
      'Primary Key properties: Must be UNIQUE and NOT NULL. Only one primary key allowed per table.',
      'Foreign Key properties: Can accept duplicate values and NULL values (unless explicitly marked NOT NULL).',
      'Foreign Key ON DELETE actions: CASCADE (deletes child records), SET NULL (sets child foreign key to null), RESTRICT / NO ACTION (rejects parent deletion if referenced).',
    ],
    example: {
      type: 'sql',
      title: 'Primary Key & Foreign Key Table Definition',
      language: 'sql',
      code: `-- Parent Table: Departments
CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

-- Child Table: Employees
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,        -- Alternate Candidate Key
    dept_id INT,
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) 
        REFERENCES Departments(dept_id)
        ON DELETE CASCADE
);`,
      explanation: 'dept_id in Employees is a Foreign Key referencing dept_id in Departments. ON DELETE CASCADE ensures if a department is deleted, all its employees are automatically cleaned up.',
    },
    commonInterviewQuestions: [
      {
        question: 'What is the difference between a Candidate Key and a Super Key?',
        answer: 'A Super Key is ANY set of attributes that uniquely identifies a tuple, which may contain redundant/extra attributes (e.g. {ID, Name}). A Candidate Key is a MINIMAL Super Key; if you remove any single attribute from a candidate key, it loses the ability to uniquely identify the tuple. All candidate keys are super keys, but not all super keys are candidate keys.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Believing a table can have multiple Primary Keys.',
        correction: 'A table can have only ONE Primary Key. However, that primary key can consist of multiple columns combined, which is called a Composite Primary Key.',
        why: 'Relational model specifies a single primary identifier per entity.',
      },
    ],
    quickRevision: [
      'Super Key = Unique identifier (can have extra attributes).',
      'Candidate Key = Minimal Super Key.',
      'Primary Key = Chosen Candidate Key (NOT NULL + UNIQUE).',
      'Foreign Key = References Primary Key in parent table.',
    ],
    practiceQuestions: [
      {
        id: 'db-key-q1',
        question: 'Can a Foreign Key column contain duplicate values and NULL values?',
        options: ['Neither duplicates nor NULLs are allowed', 'Duplicates are allowed, but NULL is never allowed', 'Both duplicates and NULL values are allowed (unless specified NOT NULL)', 'NULLs are allowed, but duplicates are never allowed'],
        correctOptionIndex: 2,
        explanation: 'A foreign key can contain duplicate values (many employees can belong to the same department) and can contain NULL values (an employee might not have been assigned a department yet), unless marked NOT NULL.',
      },
    ],
  },

  'dbms-normalization': {
    topicId: 'dbms-normalization',
    topicName: 'Normalization (1NF, 2NF, 3NF, BCNF)',
    subjectId: 'dbms',
    whatIsIt: 'Normalization is a systematic database design technique that organizes tables to minimize data redundancy and prevent insertion, update, and deletion anomalies without losing information.',
    simpleExplanation: 'Imagine an address book where you write a friend’s name, their home address, their office address, and all their 3 phone numbers in a single messy box. If they change their phone number, you have to update multiple lines, or if you delete a number, you accidentally erase their address. Normalization breaks that messy box into clean, separate, well-connected tables so data is stored in exactly one place.',
    technicalExplanation: 'Based on Functional Dependencies (X -> Y). 1NF: Relation contains atomic (indivisible) values; no multivalued or composite attributes; every column has a unique name. 2NF: In 1NF and NO Partial Dependency exists (no non-prime attribute depends on a proper subset of any candidate key). 3NF: In 2NF and NO Transitive Dependency exists (no non-prime attribute depends on another non-prime attribute; formally: for every X -> Y, X is a Super Key or Y is a Prime Attribute). BCNF (Boyce-Codd Normal Form): Strict 3NF where for EVERY functional dependency X -> Y, X MUST be a Super Key.',
    importantDefinitions: [
      { term: 'Prime Attribute', definition: 'An attribute that is part of ANY candidate key of the relation.' },
      { term: 'Partial Dependency', definition: 'Occurs when a non-prime attribute is functionally dependent on only part of a composite candidate key.' },
      { term: 'Transitive Dependency', definition: 'Occurs when non-prime attribute A determines non-prime attribute B via X -> A and A -> B.' },
      { term: 'BCNF', definition: 'A higher normal form where every determinant X in functional dependency X -> Y is strictly a super key.' },
    ],
    keyConcepts: [
      '1NF: Atomic values only (no comma-separated lists like Phone="98123, 98456").',
      '2NF: Eliminates Partial Dependency. Applies only when candidate key is composite.',
      '3NF: Eliminates Transitive Dependency. Rule for X -> Y: X is Superkey OR Y is Prime Attribute.',
      'BCNF: Eliminates all functional dependency anomalies: For EVERY X -> Y, X MUST be a Superkey.',
      'Decomposition properties: Must be Lossless-Join Decomposition and Dependency-Preserving.',
    ],
    example: {
      type: 'text',
      title: 'Normalization Progression Example',
      explanation: 'Tracing a relation through normal forms.',
      output: `Relation R(StudentID, CourseID, StudentName, CourseFee, Instructor, InstructorRoom)
Candidate Key: {StudentID, CourseID}

1. 1NF Violation: If Student phone numbers are stored as "91234, 98765" in one cell.
   Fix: Split into atomic single values.

2. 2NF Violation:
   StudentID -> StudentName  (Partial Dependency! StudentName depends only on StudentID, not full key).
   CourseID -> CourseFee     (Partial Dependency! CourseFee depends only on CourseID).
   Fix: Decompose into:
   - Student(StudentID, StudentName)
   - Course(CourseID, CourseFee)
   - StudentCourse(StudentID, CourseID)

3. 3NF Violation:
   CourseID -> Instructor, and Instructor -> InstructorRoom.
   (InstructorRoom is determined transitively by CourseID through non-prime attribute Instructor).
   Fix: Decompose into Course(CourseID, Instructor) and Instructor(Instructor, InstructorRoom).`,
    },
    commonInterviewQuestions: [
      {
        question: 'What is the key difference between 3NF and BCNF?',
        answer: 'In 3NF, for any functional dependency X -> Y, either X is a Super Key OR Y is a Prime Attribute (part of a candidate key). In BCNF, the condition is stricter: X MUST be a Super Key regardless of whether Y is prime or not. Therefore, BCNF does not allow a non-trivial dependency where a prime attribute is determined by a non-superkey.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Checking for 2NF violations when the table has a single-attribute candidate key.',
        correction: 'If a table has a single-column candidate key (e.g., StudentID), 2NF partial dependencies are IMPOSSIBLE, so the table is automatically in 2NF if it satisfies 1NF.',
        why: 'Partial dependency requires a proper subset of a composite key. A single-column key has no proper subset of attributes.',
      },
    ],
    quickRevision: [
      '1NF: Atomic attributes, no repeating groups.',
      '2NF: 1NF + No partial dependencies (non-prime -> proper subset of key).',
      '3NF: 2NF + No transitive dependencies (non-prime -> non-prime).',
      'BCNF: For every X -> Y, X must be a super key.',
    ],
    practiceQuestions: [
      {
        id: 'db-norm-q1',
        question: 'A table is in 1NF and its only candidate key is a single attribute (ID). Is it guaranteed to be in 2NF?',
        options: ['No, dependent on functional dependencies', 'Yes, because partial dependency requires a composite key', 'Only if it has no transitive dependencies', 'Only if it satisfies BCNF'],
        correctOptionIndex: 1,
        explanation: 'Partial dependency occurs when a non-prime attribute depends on a PROPER SUBSET of a candidate key. Since the key consists of a single attribute, no proper subset of attributes exists, so partial dependency is impossible.',
      },
    ],
  },

  'dbms-transactions-acid': {
    topicId: 'dbms-transactions-acid',
    topicName: 'Transactions & ACID Properties',
    subjectId: 'dbms',
    whatIsIt: 'A transaction is a single logical unit of work in a database consisting of one or more database operations (reads and writes) that must be executed in an all-or-nothing manner.',
    simpleExplanation: 'Transferring $500 from Account A to Account B requires two steps: 1. Deduct $500 from A. 2. Add $500 to B. If the server crashes or power fails right after step 1, the bank cannot leave $500 vanished in thin air. The transaction guarantees that either BOTH steps complete (Commit) or NEITHER step happens (Rollback).',
    technicalExplanation: 'ACID Properties: 1. Atomicity: "All or nothing" execution, maintained by the Recovery Manager using Write-Ahead Logging (WAL) and rollback mechanisms. 2. Consistency: Database transitions from one valid consistent state to another, preserving all integrity constraints. 3. Isolation: Concurrent transactions execute without interfering with one another; ensured by the Concurrency Control Manager (using 2-Phase Locking or Multi-Version Concurrency Control MVCC). 4. Durability: Once a transaction commits, its modifications are permanently recorded in non-volatile storage and survive even system crashes; ensured by Redo logging.',
    importantDefinitions: [
      { term: 'Atomicity', definition: 'Guarantees that all operations within a transaction succeed completely, or the transaction is entirely aborted with no changes applied.' },
      { term: 'Consistency', definition: 'Ensures that a transaction brings the database from one valid state to another according to all schema rules and constraints.' },
      { term: 'Isolation', definition: 'Ensures that concurrently running transactions do not view uncommitted intermediate states of other transactions.' },
      { term: 'Durability', definition: 'Guarantees that once a transaction commits, its changes persist permanently in non-volatile storage even across power failures.' },
    ],
    keyConcepts: [
      'Transaction States: Active → Partially Committed (after final statement executes) → Committed (after logs flushed) OR Failed → Aborted (after rollback completes).',
      'Isolation Levels (ANSI SQL): Read Uncommitted (allows dirty reads) → Read Committed (prevents dirty reads) → Repeatable Read (prevents non-repeatable reads) → Serializable (highest isolation, prevents phantom reads).',
      'Concurrency Anomalies: Dirty Read (reading uncommitted data), Non-repeatable Read (rereading same row yields different values), Phantom Read (rereading query returns newly inserted rows).',
    ],
    example: {
      type: 'sql',
      title: 'Banking Transaction with Commit and Rollback',
      language: 'sql',
      code: `BEGIN TRANSACTION;

-- Step 1: Deduct from Account A
UPDATE Accounts 
SET balance = balance - 500 
WHERE account_no = 101 AND balance >= 500;

-- Step 2: Add to Account B
UPDATE Accounts 
SET balance = balance + 500 
WHERE account_no = 102;

-- Check if deduction succeeded
IF @@ERROR = 0
    COMMIT;    -- Permanently save changes (Durability)
ELSE
    ROLLBACK;  -- Undo all changes back to initial state (Atomicity)`,
      explanation: 'Demonstrates programmatic transaction demarcation to ensure atomicity during a fund transfer.',
    },
    commonInterviewQuestions: [
      {
        question: 'Which component of the DBMS is responsible for ensuring Atomicity and Durability?',
        answer: 'The Recovery Management Subsystem (specifically using Write-Ahead Logging / WAL and checkpointing) is responsible for Atomicity (by executing UNDO on aborted transactions) and Durability (by executing REDO on committed transactions during crash recovery).',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming a transaction is committed as soon as the last SQL statement finishes executing in memory.',
        correction: 'After the last statement executes, the transaction enters the "Partially Committed" state. It becomes "Committed" ONLY after its transaction log records are successfully flushed to non-volatile disk.',
        why: 'If power fails while in the partially committed state before log flush, changes must be rolled back.',
      },
    ],
    quickRevision: [
      'ACID: Atomicity (All or None), Consistency (Rules valid), Isolation (Concurrency), Durability (Persistence).',
      'States: Active -> Partially Committed -> Committed, or Failed -> Aborted.',
      'Isolation levels: Read Uncommitted < Read Committed < Repeatable Read < Serializable.',
      'WAL (Write-Ahead Logging) enforces Durability.',
    ],
    practiceQuestions: [
      {
        id: 'db-acid-q1',
        question: 'Which ACID property is compromised if a transaction reads data that has been modified by another concurrent uncommitted transaction (Dirty Read)?',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctOptionIndex: 2,
        explanation: 'Isolation ensures that concurrent transactions execute independently without exposing uncommitted intermediate modifications to other transactions.',
      },
    ],
  },
};
