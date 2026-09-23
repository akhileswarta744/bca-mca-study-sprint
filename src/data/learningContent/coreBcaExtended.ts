import { TopicLearningContent } from '../../types';

export const CORE_BCA_EXTENDED_CONTENT: Record<string, TopicLearningContent> = {
  // ===================== DBMS =====================
  'dbms-fundamentals': {
    topicId: 'dbms-fundamentals',
    topicName: 'Database Fundamentals & 3-Tier Architecture',
    subjectId: 'dbms',
    whatIsIt: 'Database Management Systems (DBMS) are software suites designed to store, retrieve, manage, and query structured data with integrity, security, and concurrent transaction support.',
    simpleExplanation: 'Using raw text files for banking data is dangerous: two people can overwrite the same file at once, there is no automatic backup, and finding one customer requires scanning every line. A DBMS is like a secure digital vault with a dedicated librarian that guarantees data safety and instant lookups.',
    technicalExplanation: 'The ANSI-SPARC 3-Tier Database Architecture decouples user views from physical storage through three distinct abstraction levels: 1) Physical (Internal) Level: Describes how data is physically stored on disk (block formats, B+ tree indexes, hashing); 2) Conceptual (Logical) Level: Describes what data is stored and the relationships between entities (tables, constraints, attributes); 3) External (View) Level: Describes user-specific customized views, hiding sensitive columns. Data Independence: Physical Data Independence allows changing storage structures without modifying conceptual schemas; Logical Data Independence allows modifying conceptual schemas without altering user views.',
    importantDefinitions: [
      { term: 'Physical Data Independence', definition: 'The capacity to alter the physical storage structure or access methods without altering the conceptual schema.' },
      { term: 'Logical Data Independence', definition: 'The capacity to alter the conceptual schema (adding columns/tables) without requiring changes to external views or application code.' },
      { term: 'Data Dictionary (Metadata)', definition: 'A repository of information describing the database design, constraints, users, and physical storage (data about data).' },
      { term: 'DBA (Database Administrator)', definition: 'The person or role responsible for schema definition, access authorization, performance tuning, and backup/recovery.' }
    ],
    keyConcepts: [
      '3 Abstraction Levels: External View (User) -> Conceptual (Tables/Constraints) -> Internal/Physical (Disk files/Blocks).',
      'DBMS vs File System: DBMS provides ACID transactions, concurrency control, crash recovery, and eliminates data redundancy.',
      'Data Independence is the primary design goal of the 3-schema architecture.',
      'DDL compiler compiles schema definitions into the system catalog.'
    ],
    example: {
      type: 'diagram',
      title: 'ANSI-SPARC 3-Level Architecture',
      explanation: 'Three levels of data abstraction and independence mapping',
      diagramAscii: `
+--------------------+   +--------------------+
| External View 1    |   | External View 2    |
| (Student Portal)   |   | (Admin Finance)    |
+---------+----------+   +---------+----------+
          \\                       /
   [Logical Data Independence Mapping]
            \\                   /
+------------+-----------------+--------------+
|             CONCEPTUAL LEVEL                |
|      (Tables, Relations, Constraints)       |
+---------------------+-----------------------+
                      |
   [Physical Data Independence Mapping]
                      |
+---------------------+-----------------------+
|             INTERNAL / PHYSICAL             |
|   (B+ Trees, Disk Blocks, Inodes, Indices)  |
+---------------------------------------------+
      `
    },
    commonInterviewQuestions: [
      {
        question: 'Which is harder to achieve: Physical Data Independence or Logical Data Independence, and why?',
        answer: 'Logical Data Independence is significantly harder to achieve because application programs are heavily dependent on the logical structure of the data they query (table names, column types, relationships). Modifying the conceptual schema often requires modifying user queries and application interfaces, whereas physical changes (adding an index) are completely transparent to applications.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Confusing Physical Data Independence with Logical Data Independence.',
        correction: 'Physical independence decouples physical disk storage from conceptual tables; Logical independence decouples conceptual tables from user views.',
        why: 'Adding an index is physical; adding a new column to a table is conceptual/logical.'
      }
    ],
    quickRevision: [
      '3 Levels: External (Views), Conceptual (Logical), Internal (Physical).',
      'Physical independence: Change disk structure without breaking tables.',
      'Logical independence: Change table structures without breaking apps.',
      'Metadata: Stored inside the Data Dictionary / System Catalog.'
    ],
    practiceQuestions: [
      {
        id: 'dbms-fund-pq1',
        question: 'The ability to modify the physical storage layout without affecting conceptual schemas is called:',
        options: ['Logical Data Independence', 'Physical Data Independence', 'Data Redundancy', 'Referential Integrity'],
        correctOptionIndex: 1,
        explanation: 'Physical Data Independence isolates physical storage modifications (like moving files or adding B-tree indexes) from conceptual schemas.'
      }
    ]
  },

  'dbms-er-model': {
    topicId: 'dbms-er-model',
    topicName: 'Entity-Relationship (ER) Modeling',
    subjectId: 'dbms',
    whatIsIt: 'Entity-Relationship (ER) Modeling is a high-level conceptual data model that visualizes data objects, their attributes, and relationships using standardized diagrammatic notations.',
    simpleExplanation: 'Before building a skyscraper, architects draw blueprints. Before creating database tables in SQL, database designers draw ER diagrams showing real-world things (Entities like Students and Courses) and how they connect (Enrollment).',
    technicalExplanation: 'ER Models represent real-world domains using: 1) Entities (Rectangles): Strong entity (has primary key) vs Weak entity (Double rectangle, lacks primary key, identified via identifying relationship with owner entity); 2) Attributes (Ellipses): Key attribute (underlined), Simple vs Composite (e.g., Name -> First, Last), Single-valued vs Multi-valued (Double ellipse, e.g., PhoneNumbers), Derived attribute (Dashed ellipse, e.g., Age derived from DOB); 3) Relationships (Diamonds): Cardinality ratios (1:1, 1:N, M:N); Participation constraints (Total/Double line vs Partial/Single line). Reduction to Relational Schemas: M:N relationships MUST be mapped into a separate junction table containing foreign keys of both entities.',
    importantDefinitions: [
      { term: 'Weak Entity Set', definition: 'An entity set that does not possess sufficient attributes to form a primary key on its own, relying on a foreign key from an identifying owner entity plus a discriminator (partial key).' },
      { term: 'Discriminator (Partial Key)', definition: 'The set of attributes that distinguishes weak entities belonging to the same owner entity (rendered with a dashed underline).' },
      { term: 'Total Participation', definition: 'Every entity in the entity set must participate in at least one relationship instance (represented by a double line).' },
      { term: 'Cardinality Ratio', definition: 'Specifies the maximum number of relationship instances that an entity can participate in (1:1, 1:N, M:N).' }
    ],
    keyConcepts: [
      'Weak Entity Primary Key: Formed by combining Owner Primary Key + Weak Entity Partial Key (Discriminator).',
      'Converting M:N to relational tables: Requires 3 tables (Table A, Table B, and Junction Table AB with composite PK).',
      'Converting 1:N to tables: Requires 2 tables (place PK of "1" side as FK in the "N" side table).',
      'Multi-valued attributes: Cannot stay in the parent table in 1NF; must be separated into a distinct table.'
    ],
    example: {
      type: 'text',
      title: 'ER to Relational Table Conversion Rules',
      explanation: 'Mapping Students, Courses, and M:N Enrollment into SQL tables',
      code: `
Entities:
- Student (StudentID, Name)
- Course (CourseID, Title)
- Enrolls (Relationship: M:N with attribute Grade)

Relational Schema Result (3 Tables):
1. Student_Table(StudentID [PK], Name)
2. Course_Table(CourseID [PK], Title)
3. Enrolls_Table(StudentID [FK], CourseID [FK], Grade,
                 PRIMARY KEY (StudentID, CourseID))
      `
    },
    commonInterviewQuestions: [
      {
        question: 'How do you determine the primary key of a weak entity set when converting it to a relational table?',
        answer: 'The primary key of a weak entity table is formed by concatenating the primary key of its identifying strong owner entity with the weak entity’s own partial key (discriminator).'
      },
      {
        question: 'Why do Many-to-Many (M:N) relationships require a separate table in relational databases?',
        answer: 'Relational tables cannot store multi-valued arrays directly in columns under 1NF. If you tried to store multiple courses in one student row, it would violate atomicity. A separate junction (bridge) table represents each pair as an individual row.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Putting foreign keys on the "1" side of a 1:N relationship.',
        correction: 'Always place the Foreign Key on the "Many" (N) side referencing the "One" (1) side.',
        why: 'Placing the FK on the 1 side would require multi-valued foreign keys, which violates 1NF.'
      }
    ],
    quickRevision: [
      'Weak entity: Double rectangle, partial key underlined with dashed line.',
      'Multi-valued attribute: Double ellipse, becomes a separate table.',
      'Derived attribute: Dashed ellipse (e.g., Age from DOB).',
      'M:N relationship: Requires 3 relational tables (bridge table).'
    ],
    practiceQuestions: [
      {
        id: 'dbms-er-pq1',
        question: 'When converting a Many-to-Many (M:N) relationship between two strong entities into relational tables, what is the minimum number of tables required?',
        options: ['1', '2', '3', '4'],
        correctOptionIndex: 2,
        explanation: 'Converting an M:N relationship requires 3 tables: 1 for each of the two entities, plus 1 bridge/junction table for the relationship.'
      }
    ]
  },

  'dbms-indexing': {
    topicId: 'dbms-indexing',
    topicName: 'Database Indexing & B-Trees in RDBMS',
    subjectId: 'dbms',
    whatIsIt: 'Database Indexing is a data structure technique (predominantly B-Trees and B+ Trees) that optimizes query retrieval speed by minimizing costly physical disk block I/O operations.',
    simpleExplanation: 'Without an index, finding an employee with ID 54,201 requires scanning every single disk block in the table from start to finish (Full Table Scan). An index is like the index at the back of a textbook: you look up the key alphabetically and jump straight to the exact page.',
    technicalExplanation: 'Indexes store search keys and block record pointers. Types: 1) Clustered (Primary) Index: Defines the physical order of data records on disk (only ONE clustered index per table); 2) Non-Clustered (Secondary) Index: Separate structure with pointers back to data rows or clustered key (multiple allowed); 3) Dense Index: An index record exists for every search key value in the file; 4) Sparse Index: An index record exists only for some values (usually one per disk block). B+ Tree Indexing is the industry standard for RDBMS because all data records reside strictly at leaf nodes connected in a doubly linked list, enabling both rapid O(log N) point queries and high-speed range scans.',
    importantDefinitions: [
      { term: 'Clustered Index', definition: 'An index that determines the physical storage order of rows in a table; a table can possess strictly ONE clustered index.' },
      { term: 'Non-Clustered Index', definition: 'An index structured as an auxiliary lookup table containing keys and row pointers (RID), with physical data order independent of index order.' },
      { term: 'B+ Tree', definition: 'A self-balancing search tree where internal nodes store routing keys only, and all data pointers reside in leaf nodes linked sequentially for range queries.' },
      { term: 'Dense vs Sparse Index', definition: 'A Dense index has an entry for every record; a Sparse index has entries only for block anchors.' }
    ],
    keyConcepts: [
      'Why B+ Trees over B-Trees: B+ trees store all data in leaf nodes; internal nodes store only keys, allowing higher branching factor (fan-out) and fewer disk I/Os.',
      'Leaf node chaining: B+ tree leaf nodes are linked via pointers, making range queries (BETWEEN 10 AND 50) extremely fast sequential scans.',
      'Indexing Trade-off: Speeds up SELECT queries significantly, but slows down INSERT, UPDATE, and DELETE because indexes must be updated.',
      'Composite Index: An index created on multiple columns (A, B); follows the Leftmost Prefix rule.'
    ],
    example: {
      type: 'diagram',
      title: 'B+ Tree Index Architecture in RDBMS',
      explanation: 'Internal routing nodes vs sequentially chained leaf data nodes',
      diagramAscii: `
                    [  50  |  100  ]              <-- Root Node (Keys only)
                   /       |        \\
                 v         v          v
          [ 20 | 35 ]   [ 65 | 80 ]  [ 120 | 150 ]  <-- Internal Nodes
          /    |    \\
         v     v     v
     [ 10,20 ]<--->[ 30,35 ]<--->[ 40,50 ]        <-- Leaf Nodes (Data/Pointers)
         |             |             |                (Linked list for range scans)
     [Disk Rows]   [Disk Rows]   [Disk Rows]
      `
    },
    commonInterviewQuestions: [
      {
        question: 'Why can a database table have only one clustered index, but multiple non-clustered indexes?',
        answer: 'A clustered index dictates the actual physical sorting order of rows on the disk storage medium. Because physical rows on disk can only be physically sorted in one single order at a time, there can only ever be one clustered index per table. Non-clustered indexes are independent lookup tables containing pointers, so many can coexist.'
      },
      {
        question: 'Why do databases prefer B+ Trees over Hash Indexes for general-purpose indexing?',
        answer: 'Hash indexes provide O(1) point lookups (WHERE id = 5), but completely fail for range queries (WHERE age BETWEEN 20 AND 30), ordering (ORDER BY), or prefix matching. B+ Trees support both logarithmic point lookups (O(log N)) and exceptionally fast sequential range scans due to leaf-node pointer chaining.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Creating indexes on every single column in a high-write transactional table.',
        correction: 'Index only columns frequently used in WHERE filters, JOIN predicates, and ORDER BY clauses.',
        why: 'Every INSERT and UPDATE must rewrite multiple B-Tree nodes, severely degrading write throughput.'
      }
    ],
    quickRevision: [
      'Clustered Index: Determines physical order on disk (Max 1 per table).',
      'Non-Clustered: Separate pointer structure (Multiple allowed).',
      'B+ Tree: All records in leaves; leaf nodes linked for range queries.',
      'Dense = Entry per record; Sparse = Entry per disk block.'
    ],
    practiceQuestions: [
      {
        id: 'dbms-idx-pq1',
        question: 'What is the maximum number of Clustered Indexes that can exist on a single relational database table?',
        options: ['1', '2', '16', 'Unlimited'],
        correctOptionIndex: 0,
        explanation: 'Because a clustered index defines the actual physical storage order of the rows on disk, only ONE clustered index can exist per table.'
      }
    ]
  },

  // ===================== SQL =====================
  'sql-dml-ddl-ops': {
    topicId: 'sql-dml-ddl-ops',
    topicName: 'INSERT, UPDATE, DELETE vs ALTER, DROP, TRUNCATE',
    subjectId: 'sql',
    whatIsIt: 'A rigorous distinction between data manipulation operations (DML: row-level modification) and data definition operations (DDL: schema structure definition), with emphasis on TRUNCATE vs DELETE.',
    simpleExplanation: 'DELETE is like taking an eraser and erasing student rows one by one—it takes time and you can hit "Undo" (Rollback). TRUNCATE is like dumping the paper in the shredder and grabbing a fresh blank sheet—instant, but no undo. DROP is tearing down the school building itself.',
    technicalExplanation: 'DML (Data Manipulation Language) commands operate on rows: INSERT, UPDATE, DELETE. They execute within transactional contexts and can be rolled back before COMMIT; DELETE logs every deleted row in the transaction log, maintaining triggers. DDL (Data Definition Language) commands operate on schema structures: CREATE, ALTER, DROP, TRUNCATE. DDL statements perform an implicit auto-commit. TRUNCATE TABLE is a DDL command that deallocates entire data pages directly rather than logging row deletions; it resets auto-increment identity counters, does not fire DELETE triggers, and is significantly faster than DELETE.',
    importantDefinitions: [
      { term: 'DELETE', definition: 'A DML statement that removes rows satisfying a WHERE clause, logging each row deletion individually in transaction logs.' },
      { term: 'TRUNCATE', definition: 'A DDL statement that removes all rows from a table by deallocating data pages, executing with minimal logging and resetting identity counters.' },
      { term: 'DROP', definition: 'A DDL statement that completely removes the table schema, constraints, indexes, and data permanently from the database catalog.' },
      { term: 'ALTER', definition: 'A DDL statement used to modify table structure (add, modify, or drop columns and constraints).' }
    ],
    keyConcepts: [
      'DELETE vs TRUNCATE: DELETE is DML, allows WHERE clause, slower, fires triggers, can be rolled back. TRUNCATE is DDL, no WHERE clause, lightning-fast page deallocation, cannot fire triggers.',
      'Identity reset: TRUNCATE resets auto-increment counter to seed; DELETE retains current counter position.',
      'Foreign Key constraint: TRUNCATE fails if the table is referenced by an active Foreign Key constraint, even if referencing table is empty.',
      'DROP removes table definition completely; TRUNCATE preserves empty table structure.'
    ],
    example: {
      type: 'sql',
      title: 'SQL Comparison: DELETE vs TRUNCATE vs DROP',
      explanation: 'Demonstrating operations and structural impact',
      code: `-- 1. DELETE (DML - Row level, filterable, logged)
DELETE FROM Students WHERE GraduationYear < 2020;
-- Table structure and remaining rows exist; can ROLLBACK if in transaction.

-- 2. TRUNCATE (DDL - Page level, ultra-fast, resets identity)
TRUNCATE TABLE TempLogins;
-- All rows gone instantly; table schema Students remains intact.

-- 3. DROP (DDL - Destroys schema completely)
DROP TABLE ArchivedCourses;
-- Table no longer exists in database catalog!`,
      output: 'Commands executed successfully.'
    },
    commonInterviewQuestions: [
      {
        question: 'What are the main differences between DELETE, TRUNCATE, and DROP?',
        answer: '1. DELETE is DML: removes specific rows via WHERE, logs every row, fires triggers, preserves identity counter, and can be rolled back.\n2. TRUNCATE is DDL: deallocates all pages, operates without WHERE, resets identity counters, does not fire delete triggers, and is orders of magnitude faster.\n3. DROP is DDL: completely destroys table definition, schema, indexes, and constraints from the database catalog.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trying to execute `TRUNCATE TABLE Employees WHERE Department = "HR";`.',
        correction: 'TRUNCATE cannot have a WHERE clause. Use `DELETE FROM Employees WHERE Department = "HR";`.',
        why: 'TRUNCATE operates on physical storage pages, not individual rows.'
      }
    ],
    quickRevision: [
      'DELETE: DML, row-by-row, WHERE allowed, rollback supported.',
      'TRUNCATE: DDL, page deallocation, fast, resets identity seed.',
      'DROP: DDL, deletes schema and table permanently.',
      'ALTER: DDL, modifies schema structure (columns, types).'
    ],
    practiceQuestions: [
      {
        id: 'sql-ops-pq1',
        question: 'Which SQL statement resets the table auto-increment identity seed and deallocates data pages directly without row logging?',
        options: ['DELETE TABLE', 'TRUNCATE TABLE', 'DROP TABLE', 'ALTER TABLE'],
        correctOptionIndex: 1,
        explanation: 'TRUNCATE TABLE is a DDL command that deallocates storage pages, resets identity seeds, and does not record individual row deletions.'
      }
    ]
  },

  'sql-subqueries-agg': {
    topicId: 'sql-subqueries-agg',
    topicName: 'Subqueries, Correlated Subqueries & Aggregations',
    subjectId: 'sql',
    whatIsIt: 'Advanced SQL query structures incorporating nested queries, correlated subqueries evaluated row-by-row, aggregate functions (COUNT, SUM, AVG), and existential operators (EXISTS, IN, ALL, ANY).',
    simpleExplanation: 'A nested subquery is like asking a question inside a question: "Who makes more than the average salary?" First, the inner query calculates the average ($50,000); then the outer query filters employees earning > $50,000. A Correlated subquery is like customized checking: "Does this employee earn more than the average salary of their specific department?".',
    technicalExplanation: 'A Non-Correlated Subquery evaluates once independently of the outer query, returning a scalar value or set passed to the outer query. A Correlated Subquery references columns from the outer query table, executing once for every candidate row evaluated by the outer query (O(N * M) worst-case performance). Existential test: `EXISTS` returns TRUE as soon as the inner query produces at least one row, short-circuiting immediately and ignoring NULLs. Aggregate functions (COUNT, SUM, AVG, MIN, MAX) compute single summary values over groups defined by GROUP BY; HAVING filters grouped results.',
    importantDefinitions: [
      { term: 'Correlated Subquery', definition: 'A nested subquery whose execution depends on values from the outer query row, evaluated repeatedly for every row processed by the outer query.' },
      { term: 'EXISTS Operator', definition: 'A boolean operator that tests for the presence of any rows in a subquery, short-circuiting to TRUE upon finding the first match.' },
      { term: 'Scalar Subquery', definition: 'A subquery that returns strictly a single row with a single column, usable anywhere an expression or scalar value is allowed.' },
      { term: 'HAVING Clause', definition: 'A post-grouping filter applied to aggregate calculations, distinct from WHERE which filters individual rows prior to grouping.' }
    ],
    keyConcepts: [
      'EXISTS vs IN: EXISTS short-circuits on first match and handles NULLs reliably; IN compares against a full materialized list and can fail with NULLs.',
      'WHERE vs HAVING: WHERE cannot contain aggregate functions (`WHERE AVG(salary) > 5000` is illegal); HAVING is designed specifically for aggregates.',
      'Second Highest Salary pattern: `SELECT MAX(Salary) FROM Employees WHERE Salary < (SELECT MAX(Salary) FROM Employees);`.',
      'Correlated Subquery rewrite: Often optimizable into an INNER JOIN for superior query plan execution.'
    ],
    example: {
      type: 'sql',
      title: 'Correlated Subquery: Employees Earning Above Department Average',
      code: `SELECT e1.emp_name, e1.dept_id, e1.salary
FROM Employees e1
WHERE e1.salary > (
    -- Correlated inner query: recalculates average for e1's specific department
    SELECT AVG(e2.salary)
    FROM Employees e2
    WHERE e2.dept_id = e1.dept_id
);`,
      explanation: 'For each employee in e1, the database runs the subquery to find their department’s average salary and performs the comparison.'
    },
    commonInterviewQuestions: [
      {
        question: 'Write a SQL query to find the Nth highest salary from an Employee table without using LIMIT/TOP.',
        answer: `SELECT DISTINCT e1.Salary
FROM Employee e1
WHERE (N - 1) = (
    SELECT COUNT(DISTINCT e2.Salary)
    FROM Employee e2
    WHERE e2.Salary > e1.Salary
);`
      },
      {
        question: 'Why is `WHERE Salary > AVG(Salary)` syntactically invalid in SQL?',
        answer: 'The WHERE clause executes before rows are grouped or aggregated by the query execution engine. Aggregate functions like AVG() compute values over groups of rows, which only exist after the GROUP BY phase. To filter by aggregates, the HAVING clause must be used.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `NOT IN` with a subquery that returns a `NULL` value.',
        correction: 'Use `NOT EXISTS` or add `WHERE column IS NOT NULL` inside the subquery.',
        why: 'In SQL three-valued logic, `x NOT IN (val, NULL)` always evaluates to UNKNOWN, returning zero rows.'
      }
    ],
    quickRevision: [
      'Non-correlated subquery: Runs once independently.',
      'Correlated subquery: Runs once per candidate outer row.',
      'EXISTS short-circuits on first row, handles NULLs safely.',
      'WHERE filters rows before aggregation; HAVING filters groups after.'
    ],
    practiceQuestions: [
      {
        id: 'sql-sub-pq1',
        question: 'Which SQL operator is best suited for testing whether a subquery returns at least one row, terminating evaluation immediately upon finding a match?',
        options: ['IN', 'EXISTS', 'LIKE', 'ALL'],
        correctOptionIndex: 1,
        explanation: 'EXISTS evaluates boolean existence and short-circuits immediately upon locating the first matching row.'
      }
    ]
  },

  // ===================== JAVA =====================
  'java-datatypes-operators': {
    topicId: 'java-datatypes-operators',
    topicName: 'Data Types, Type Casting & Operators',
    subjectId: 'java',
    whatIsIt: 'The foundational Java type system consisting of 8 primitive types, reference types, automatic widening and explicit narrowing type conversions, and operator precedence.',
    simpleExplanation: 'Think of data types as measuring cups. A `byte` is a tiny shot glass, an `int` is a coffee mug, and a `double` is a gallon jug. You can easily pour a shot glass into a gallon jug (Widening: automatic and safe), but pouring a gallon jug into a coffee mug spills coffee unless you explicitly force it with a funnel (Narrowing: potential data loss).',
    technicalExplanation: 'Java has exactly 8 primitive data types: byte (1 byte, -128..127), short (2 bytes), int (4 bytes, default integer literal), long (8 bytes, suffixed with L), float (4 bytes, IEEE 754, suffixed with f), double (8 bytes, default floating literal), char (2 bytes, 16-bit Unicode UTF-16, 0..65535), and boolean (true/false, JVM-dependent size). Type Casting: 1) Widening (Implicit): byte -> short -> int -> long -> float -> double (safe, no loss of magnitude); 2) Narrowing (Explicit): double -> float -> long -> int -> short -> byte (requires cast syntax `(int)d`, truncates bits). Operators include arithmetic, bitwise (&, |, ^, ~), shifts (<<, >>, >>> unsigned shift), and ternary `? :`.',
    importantDefinitions: [
      { term: 'Primitive Types', definition: 'The 8 basic value types stored directly on the stack containing raw binary values rather than heap references.' },
      { term: 'Widening Conversion', definition: 'Automatic conversion of a smaller numeric data type to a larger numeric data type without explicit syntax.' },
      { term: 'Narrowing Conversion', definition: 'Explicit type conversion from a larger data type to a smaller data type requiring a cast operator and risking data loss.' },
      { term: 'Unsigned Right Shift (>>>)', definition: 'A bitwise operator that shifts bits right and always fills the leftmost positions with zeroes regardless of sign.' }
    ],
    keyConcepts: [
      'Char in Java: 2 bytes (16 bits) because Java natively supports international Unicode characters (UTF-16), unlike C which is 1 byte ASCII.',
      'Integer literals default to `int`; Floating literals default to `double`.',
      'Short-circuit logical operators: `&&` and `||` evaluate right operand only if necessary; bitwise `&` and `|` always evaluate both sides.',
      'Signed shift `>>` preserves sign bit (arithmetic shift); Unsigned shift `>>>` shifts zeroes into MSB (logical shift).'
    ],
    example: {
      type: 'code',
      title: 'Java Type Casting & Truncation Demonstration',
      language: 'java',
      code: `public class TypeCastingDemo {
    public static void main(String[] args) {
        // Widening (Automatic)
        int num = 100;
        double d = num; // int to double: 100.0

        // Narrowing (Explicit - potential loss)
        double pi = 3.999;
        int truncated = (int) pi; // Truncates decimal: 3 (not rounded!)

        // Byte overflow wrap-around
        int bigVal = 130;
        byte b = (byte) bigVal; 
        // 130 in binary is 0000...10000010 -> byte interprets as -126
        System.out.println("Casting 130 to byte: " + b); // -126
    }
}`,
      output: 'Casting 130 to byte: -126',
      explanation: 'Narrowing discards the upper bits; casting 130 into an 8-bit signed byte overflows the positive boundary and wraps into negative values.'
    },
    commonInterviewQuestions: [
      {
        question: 'Why is char 2 bytes in Java whereas it is 1 byte in C/C++?',
        answer: 'C/C++ originally used 1-byte ASCII (256 characters) for English character sets. Java was designed from inception for internationalization and uses 2-byte Unicode (UTF-16) to represent characters from global alphabets (Chinese, Japanese, Devanagari, Arabic, etc.).'
      },
      {
        question: 'What is the difference between `>>` and `>>>` operators in Java?',
        answer: '`>>` is the signed (arithmetic) right shift operator, which preserves the original sign bit (copies 1 for negative numbers, 0 for positive). `>>>` is the unsigned (logical) right shift operator, which always shifts zeroes into the most significant bit regardless of whether the original number was positive or negative.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Writing `float f = 3.14;` without trailing `f`.',
        correction: 'Write `float f = 3.14f;` or `float f = (float) 3.14;`.',
        why: 'In Java, floating-point literals are treated as 64-bit `double` by default; assigning double to float is a narrowing conversion requiring explicit syntax.'
      }
    ],
    quickRevision: [
      '8 Primitives: byte(1), short(2), int(4), long(8), float(4), double(8), char(2), bool.',
      'Char is 2 bytes Unicode (0 to 65535).',
      'Widening is automatic; Narrowing requires explicit `(type)`.',
      '>>> is unsigned right shift (fills with zeroes).'
    ],
    practiceQuestions: [
      {
        id: 'java-dt-pq1',
        question: 'What is the size in bytes of the primitive `char` data type in Java?',
        options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
        correctOptionIndex: 1,
        explanation: 'In Java, char is 2 bytes (16 bits) to support the Unicode character encoding standard.'
      }
    ]
  },

  'java-control-flow': {
    topicId: 'java-control-flow',
    topicName: 'Control Flow, Loops & Arrays',
    subjectId: 'java',
    whatIsIt: 'Control flow structures directing the sequence of Java execution via conditional branching (if-else, switch), iterative loops (for, enhanced for-each, while, do-while), and 1D/2D array allocations.',
    simpleExplanation: 'Control flow is the steering wheel and pedals of your program: "If traffic light is red, stop; otherwise drive". Loops let you repeat work: "For every student on the roster, print their grade". Arrays are numbered egg cartons storing fixed amounts of items.',
    technicalExplanation: 'Branching: if-else statements require strict boolean expressions (integers like `if(1)` are compile-time errors in Java). Switch statements evaluate primitives (byte, short, int, char), Enums, and Strings (since Java 7); switch expressions (Java 14+) support arrow syntax (`->`) and `yield`. Loops: `for` loop, `enhanced for-each` (iterates over arrays/Iterables without index access), `while` (pre-test), and `do-while` (post-test: executes at least once). Jump statements: `break`, `continue`, and labeled break/continue. Arrays: Objects in Java allocated on the heap; indices are 0-based; accessing out-of-bounds indices throws runtime `ArrayIndexOutOfBoundsException`.',
    importantDefinitions: [
      { term: 'Enhanced For-Each Loop', definition: 'A concise loop syntax `for (Type var : collection)` that iterates sequentially through array/Iterable elements without explicit index manipulation.' },
      { term: 'Labeled Break / Continue', definition: 'A control jump statement targeting a specific outer labeled loop from within nested inner loops.' },
      { term: 'Jagged (Ragged) Array', definition: 'A multidimensional array where sub-arrays can possess differing lengths, supported natively in Java as arrays of arrays.' },
      { term: 'ArrayIndexOutOfBoundsException', definition: 'An unchecked runtime exception thrown when attempting to access an illegal array index (< 0 or >= array.length).' }
    ],
    keyConcepts: [
      'Strict Boolean Condition: In Java, `if (x = 5)` or `if (1)` will NOT compile; conditions must strictly evaluate to boolean `true` or `false`.',
      'Array length: `.length` is a final public field on arrays, NOT a method (unlike `String.length()`).',
      'Jagged Arrays: In Java, 2D arrays are arrays of array references; each row can have a completely different number of columns.',
      'Default Array Values: Numeric elements default to 0, booleans default to false, and object references default to null.'
    ],
    example: {
      type: 'code',
      title: 'Java Labeled Break & Jagged Array Demonstration',
      language: 'java',
      code: `public class ControlFlowDemo {
    public static void main(String[] args) {
        // Jagged Array
        int[][] jagged = new int[2][];
        jagged[0] = new int[]{1, 2};
        jagged[1] = new int[]{3, 4, 5, 6};

        // Labeled Break from nested loops
        searchLoop:
        for (int i = 0; i < jagged.length; i++) {
            for (int j = 0; j < jagged[i].length; j++) {
                if (jagged[i][j] == 4) {
                    System.out.println("Found 4 at row " + i + ", col " + j);
                    break searchLoop; // Breaks out of BOTH loops!
                }
            }
        }
    }
}`,
      output: 'Found 4 at row 1, col 1',
      explanation: 'Labeled break terminates the outer `searchLoop` directly from inside the nested loop upon locating the target.'
    },
    commonInterviewQuestions: [
      {
        question: 'What is the key difference between `while` and `do-while` loops in Java?',
        answer: 'A `while` loop tests the loop termination condition at the top before executing the body (pre-test); if the condition is initially false, the loop body never executes. A `do-while` loop evaluates the condition at the bottom after executing the body (post-test), guaranteeing the loop body executes at least once regardless of condition state.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `.length()` instead of `.length` on arrays.',
        correction: 'Use `arr.length` for arrays and `str.length()` for String objects.',
        why: 'In Java, `length` is an immutable field on array objects, whereas `length()` is a method in the `String` class.'
      }
    ],
    quickRevision: [
      'Conditionals in Java must strictly be boolean (no truthy integers).',
      'Enhanced for-each iterates cleanly over arrays and Iterables.',
      'Arrays are heap-allocated objects; default numeric values are 0.',
      'Jagged arrays: Arrays of arrays with differing row lengths.'
    ],
    practiceQuestions: [
      {
        id: 'java-cf-pq1',
        question: 'Which loop construct in Java is guaranteed to execute its code block at least once?',
        options: ['for loop', 'while loop', 'do-while loop', 'enhanced for-each loop'],
        correctOptionIndex: 2,
        explanation: 'A do-while loop evaluates its boolean test condition at the end of the iteration, guaranteeing at least one execution.'
      }
    ]
  },

  'java-constructors': {
    topicId: 'java-constructors',
    topicName: 'Constructors & Memory Allocation',
    subjectId: 'java',
    whatIsIt: 'Constructors are special member functions invoked automatically during object instantiation via the `new` operator to initialize object state and establish class invariants.',
    simpleExplanation: 'A class is a blueprint for a house; a constructor is the construction crew that actually pours the foundation and paints the walls when you order a new house built. If you don’t write any special instructions, Java provides a standard bare-bones crew for free (Default Constructor).',
    technicalExplanation: 'Constructors share the exact name of the class and have NO return type (not even `void`). If no constructor is declared, the Java compiler automatically synthesizes a no-argument Default Constructor that invokes `super()`. If ANY constructor is explicitly written, the compiler does NOT synthesize the default constructor. Constructor Chaining: 1) `this(...)` invokes an overloaded constructor in the same class; 2) `super(...)` invokes the parent class constructor. A call to `this()` or `super()` must strictly be the first executable statement in the constructor body. Memory allocation: The `new` keyword allocates raw object memory on the JVM Heap, initializes fields to default values (0, null, false), and then executes the constructor body.',
    importantDefinitions: [
      { term: 'Default Constructor', definition: 'A no-argument constructor inserted by the compiler only if no explicit constructors are defined in the class.' },
      { term: 'Constructor Overloading', definition: 'Defining multiple constructors within the same class with differing parameter lists (number, type, or order).' },
      { term: 'Constructor Chaining', definition: 'The technique of calling another constructor from within a constructor using this() or super().' },
      { term: 'Copy Constructor', definition: 'A constructor that initializes an object using the field values of another existing object of the same class.' }
    ],
    keyConcepts: [
      'No Return Type: Adding a return type (e.g., `void MyClass()`) turns it into an ordinary method, NOT a constructor.',
      'First Statement Constraint: `this()` or `super()` MUST be the first statement in a constructor; they cannot be used together in the same constructor.',
      'Heap vs Stack: Object reference is on the stack; actual instance fields and object header reside on the heap.',
      'Initialization order: Static blocks -> Instance init blocks -> Constructor body.'
    ],
    example: {
      type: 'code',
      title: 'Java Constructor Chaining with this() and super()',
      language: 'java',
      code: `class Vehicle {
    String brand;
    Vehicle(String brand) {
        this.brand = brand;
        System.out.println("Vehicle initialized: " + brand);
    }
}

class Car extends Vehicle {
    int doors;
    // Overloaded constructor 1
    Car(String brand) {
        this(brand, 4); // Chaining to overloaded constructor in same class
    }
    // Overloaded constructor 2
    Car(String brand, int doors) {
        super(brand); // Chaining to parent constructor (MUST be 1st statement)
        this.doors = doors;
        System.out.println("Car ready with " + doors + " doors.");
    }
}`,
      explanation: 'Demonstrates clean constructor reuse: `this(brand, 4)` delegates to the two-argument constructor, which invokes `super(brand)`.'
    },
    commonInterviewQuestions: [
      {
        question: 'Can a constructor be declared final, static, or abstract in Java?',
        answer: 'No. A constructor cannot be final (because constructors are not inherited and cannot be overridden), cannot be static (constructors belong to instance creation, not class level), and cannot be abstract (a constructor must initialize state and cannot have an empty implementation).'
      },
      {
        question: 'What happens if a parent class has only parameterized constructors and the child class does not call super(args)?',
        answer: 'A compile-time error occurs. The child class constructor automatically attempts to call the default no-arg constructor `super()`. Because the parent defined an explicit parameterized constructor, the default constructor no longer exists in the parent class.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Declaring `void ClassName()` thinking it is a constructor.',
        correction: 'Remove the return type `void`.',
        why: 'Giving it a return type makes it a standard method that will not be invoked by the `new` operator during object creation.'
      }
    ],
    quickRevision: [
      'Same name as class, NO return type (not even void).',
      'Compiler inserts default constructor ONLY if no constructors exist.',
      '`this()` or `super()` must be the very first statement.',
      'Cannot be static, final, or abstract.'
    ],
    practiceQuestions: [
      {
        id: 'java-const-pq1',
        question: 'Which of the following modifiers CAN be legally applied to a Java constructor?',
        options: ['static', 'final', 'public', 'abstract'],
        correctOptionIndex: 2,
        explanation: 'Constructors can take access modifiers (public, protected, private, package-private), but cannot be static, final, or abstract.'
      }
    ]
  },

  'java-oop-principles': {
    topicId: 'java-oop-principles',
    topicName: 'Core OOP: Encapsulation, Inheritance & Abstraction',
    subjectId: 'java',
    whatIsIt: 'The foundational pillars of Object-Oriented Programming (OOP) in Java: Encapsulation (data hiding), Inheritance (code reuse via `extends`), and Abstraction (hiding implementation complexity).',
    simpleExplanation: 'Encapsulation is like a medical capsule: medicine is sealed inside and accessible only as intended. Inheritance is passing genetic traits from parent to child: a SportsCar inherits wheels and engine from Car. Abstraction is a car’s dashboard: you press the accelerator pedal without needing to know the mechanical fuel injection physics under the hood.',
    technicalExplanation: '1) Encapsulation: Bundling data (fields) and methods operating on that data into a single unit, hiding internal state by declaring fields `private` and exposing public getter/setter methods with validation logic. 2) Inheritance: The mechanism where a child class (`subclass`) derives state and behaviors from a parent class (`superclass`) using the `extends` keyword. Java supports Single Class Inheritance and Multilevel Inheritance, but deliberately prohibits Multiple Inheritance of classes to prevent the Diamond Problem (resolved via Interfaces). 3) Abstraction: Focusing on what an object does rather than how it does it, implemented using Abstract Classes (`abstract` keyword) and Interfaces. Access modifiers control encapsulation: `private` (class only), default/package-private, `protected` (package + subclasses), and `public` (everywhere).',
    importantDefinitions: [
      { term: 'Encapsulation', definition: 'The OOP principle of wrapping data and code into a single unit and restricting direct access to internal components using access specifiers.' },
      { term: 'Inheritance', definition: 'A mechanism where a new class inherits properties and methods from an existing class, establishing an IS-A relationship.' },
      { term: 'Abstraction', definition: 'The process of exposing only essential features of an entity to the outside world while concealing background implementation details.' },
      { term: 'The Diamond Problem', definition: 'Ambiguity arising when a class inherits from two parent classes that implement the same method with different logic, eliminated in Java by disallowing multiple class inheritance.' }
    ],
    keyConcepts: [
      'Four Access Specifiers: private -> default (package) -> protected -> public.',
      'IS-A vs HAS-A: Inheritance represents IS-A (Dog IS-A Animal); Composition represents HAS-A (Car HAS-A Engine). Composition is generally preferred over inheritance.',
      'Java avoids Diamond Problem by restricting multiple inheritance to interfaces.',
      'Encapsulation benefits: Maintainability, flexibility to change internal implementation, and read-only/write-only data control.'
    ],
    example: {
      type: 'code',
      title: 'Encapsulation with Validation in Java',
      language: 'java',
      code: `public class BankAccount {
    // Encapsulated private state
    private double balance;

    // Public constructor
    public BankAccount(double initialBalance) {
        if (initialBalance >= 0) {
            this.balance = initialBalance;
        }
    }

    // Getter (Controlled read access)
    public double getBalance() {
        return balance;
    }

    // Setter with business logic validation (Controlled write access)
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
        } else {
            System.out.println("Invalid deposit amount!");
        }
    }
}`,
      explanation: 'Direct balance modification from outside is impossible (`account.balance = -999` fails to compile); changes must pass through the `deposit()` validation gate.'
    },
    commonInterviewQuestions: [
      {
        question: 'Why does Java not support multiple inheritance with classes?',
        answer: 'To prevent the Diamond Problem and architectural complexity. If Class D extended both Class B and Class C, and both B and C inherited and uniquely overridden method `foo()` from Class A, Class D would have no way of knowing which implementation to execute without ambiguous conflict resolution rules.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Making all instance variables `public` for convenience.',
        correction: 'Keep fields `private` and provide getters and setters.',
        why: 'Public fields violate encapsulation, allowing external classes to corrupt internal state with invalid values.'
      }
    ],
    quickRevision: [
      'Encapsulation: Private variables + public getters/setters.',
      'Inheritance: Code reuse via `extends` (IS-A relationship).',
      'Java supports single class inheritance, not multiple class inheritance.',
      'Protected: Accessible within same package and subclasses in other packages.'
    ],
    practiceQuestions: [
      {
        id: 'java-oop-pq1',
        question: 'Which access modifier allows access within the same package and by subclasses in different packages?',
        options: ['private', 'default (package-private)', 'protected', 'public'],
        correctOptionIndex: 2,
        explanation: 'The `protected` access modifier allows members to be accessed within the defining package and by any subclasses located in different packages.'
      }
    ]
  },

  'java-interfaces-abstract': {
    topicId: 'java-interfaces-abstract',
    topicName: 'Interfaces vs Abstract Classes',
    subjectId: 'java',
    whatIsIt: 'A rigorous comparative study of Java contract abstractions: Abstract Classes (partial implementations with state) versus Interfaces (pure protocol contracts supporting multiple inheritance and modern default/static methods).',
    simpleExplanation: 'An Abstract Class is a half-finished house: some walls and plumbing are already installed (shared code and state), and you finish the custom rooms. An Interface is an architectural blueprint: a contract that says "Any building here MUST have an emergency exit and smoke alarm", regardless of whether the building is a school, hospital, or factory.',
    technicalExplanation: 'Abstract Class: Declared with `abstract` keyword; can have instance state (fields), constructors, concrete methods, and abstract methods; cannot be instantiated directly with `new`; classes extend only one abstract class (`single inheritance`). Interface: Declared with `interface`; historically pure abstraction (only public static final constants and public abstract methods). In Java 8, interfaces gained `default methods` (providing concrete fallback implementations) and `static methods`. In Java 9, `private methods` were added for internal code reuse. A class can implement multiple interfaces (`class C implements A, B`), solving multiple inheritance of behavior.',
    importantDefinitions: [
      { term: 'Abstract Class', definition: 'A class declared with the abstract keyword that cannot be instantiated and may contain both abstract methods and implemented concrete methods with state.' },
      { term: 'Interface', definition: 'A reference type in Java defining a contract of abstract methods, default methods, static methods, and constant values.' },
      { term: 'Default Method', definition: 'A method within an interface that includes a default implementation using the default keyword, introduced in Java 8 for backward compatibility.' },
      { term: 'Marker Interface', definition: 'An interface with zero methods or fields used to tag classes for special JVM/framework handling (e.g., Serializable, Cloneable).' }
    ],
    keyConcepts: [
      'State difference: Abstract classes can have non-final instance fields; interfaces can ONLY have `public static final` constants.',
      'Multiple inheritance: A class can extend only ONE abstract class, but can implement UNLIMITED interfaces.',
      'Default method conflict rule: If class implements two interfaces with identical default method signatures, the class MUST explicitly override and resolve the conflict.',
      'Use Abstract Class when classes share common code and non-static state; use Interface to define a contract across completely unrelated classes.'
    ],
    example: {
      type: 'code',
      title: 'Java 8 Interface with Default & Static Methods',
      language: 'java',
      code: `interface PaymentGateway {
    // Abstract method (mandatory implementation)
    void processPayment(double amount);

    // Default method (optional override)
    default void generateReceipt(double amount) {
        System.out.println("Standard Receipt generated for: $" + amount);
    }

    // Static utility method
    static boolean isValidCurrency(String currency) {
        return "USD".equalsIgnoreCase(currency) || "EUR".equalsIgnoreCase(currency);
    }
}

class PayPalGateway implements PaymentGateway {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing PayPal payment: $" + amount);
    }
}`,
      explanation: 'PayPalGateway implements `processPayment()`, inherits `generateReceipt()` automatically, and can use `PaymentGateway.isValidCurrency()`.'
    },
    commonInterviewQuestions: [
      {
        question: 'When should you use an Abstract Class instead of an Interface in Java?',
        answer: 'Use an Abstract Class when closely related classes share common code, state (non-static instance variables), or require non-public access modifiers (protected/private). Use an Interface when defining a functional contract for unrelated classes, or when multiple inheritance is required.'
      },
      {
        question: 'What happens if a class implements two interfaces that declare the same default method signature?',
        answer: 'A compile-time error occurs due to the multiple inheritance conflict. The implementing class must explicitly override the colliding method and choose which implementation to invoke using `InterfaceName.super.methodName()` or provide its own new logic.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trying to declare instance variables (non-static fields) inside an interface.',
        correction: 'All variables in an interface are automatically and implicitly `public static final`.',
        why: 'Interfaces represent stateless contracts; they cannot hold mutable object instance state.'
      }
    ],
    quickRevision: [
      'Abstract class: Can have constructors, state, and single inheritance.',
      'Interface: Multiple inheritance allowed, no instance state.',
      'Interface fields: Implicitly `public static final`.',
      'Java 8 added `default` and `static` methods to interfaces.'
    ],
    practiceQuestions: [
      {
        id: 'java-iface-pq1',
        question: 'Variables declared inside a Java interface are implicitly:',
        options: [
          'private and final',
          'protected and static',
          'public, static, and final',
          'transient and volatile'
        ],
        correctOptionIndex: 2,
        explanation: 'All variables declared inside an interface are automatically public, static, and final constants.'
      }
    ]
  },

  'java-exceptions-collections': {
    topicId: 'java-exceptions-collections',
    topicName: 'Exception Handling & Collections Basics',
    subjectId: 'java',
    whatIsIt: 'A comprehensive study of Java error recovery using robust exception hierarchies (Checked vs Unchecked) and foundational Java Collections Framework interfaces (List, Set, Map).',
    simpleExplanation: 'Exception handling is a safety harness: if something falls (like a file not existing), instead of crashing to the floor, the program catches the fall gracefully. Collections are specialized containers: `ArrayList` is a flexible expandable shelf, `HashSet` is a bag where duplicate items are rejected, and `HashMap` is a dictionary where you look up values by a word.',
    technicalExplanation: 'Exceptions in Java inherit from `java.lang.Throwable`, divided into: 1) `Error` (serious system issues like OutOfMemoryError, not meant to be caught); 2) `Exception`: Checked Exceptions (subclasses of Exception excluding RuntimeException, checked at compile time, must be declared via `throws` or handled in `try-catch`) vs Unchecked Exceptions (subclasses of `RuntimeException`, e.g., NullPointerException, ArrayIndexOutOfBoundsException, caused by programming bugs). Finally block executes regardless of whether an exception was thrown. Collections Framework: 1) `List` (ordered, permits duplicates: ArrayList fast random access O(1), LinkedList fast node insertion O(1)); 2) `Set` (no duplicates: HashSet uses HashMap internally O(1), TreeSet sorted red-black tree O(log N)); 3) `Map` (Key-Value mappings: HashMap O(1) average, TreeMap O(log N)).',
    importantDefinitions: [
      { term: 'Checked Exception', definition: 'An exception checked at compile-time that a method must handle (try-catch) or declare (throws), e.g., IOException, SQLException.' },
      { term: 'Unchecked Exception', definition: 'A RuntimeException that is not checked at compile-time, typically indicating programming logic defects.' },
      { term: 'Try-with-Resources', definition: 'A Java 7 construct that automatically closes AutoCloseable resources at the end of the try block without explicit finally blocks.' },
      { term: 'HashMap', definition: 'A key-value hash table implementation using an array of buckets (linked lists transitioning to Red-Black trees when bucket size >= 8).' }
    ],
    keyConcepts: [
      'Checked vs Unchecked: Checked inherits from `Exception`; Unchecked inherits from `RuntimeException`.',
      'The finally block executes ALWAYS (even after a `return` statement), except if `System.exit(0)` is executed or JVM crashes.',
      'ArrayList vs Vector: ArrayList is non-synchronized and fast; Vector is legacy and thread-safe synchronized.',
      'HashMap internal collision: Uses bucket arrays. In Java 8, if a bucket chain exceeds TREEIFY_THRESHOLD (8 items), the linked list converts to a balanced Red-Black tree.'
    ],
    example: {
      type: 'code',
      title: 'Try-With-Resources & Collection Mapping in Java',
      language: 'java',
      code: `import java.util.*;
import java.io.*;

public class CollectionDemo {
    public static void main(String[] args) {
        // 1. Try-with-resources (Automatic resource cleanup)
        try (BufferedReader br = new BufferedReader(new StringReader("Java\\nSpring"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println("Read: " + line);
            }
        } catch (IOException e) {
            System.err.println("I/O error: " + e.getMessage());
        }

        // 2. HashMap Usage
        Map<String, Integer> wordCount = new HashMap<>();
        wordCount.put("BCA", 10);
        wordCount.put("MCA", 20);
        wordCount.put("BCA", 15); // Replaces old value 10!

        System.out.println("BCA count: " + wordCount.get("BCA")); // 15
    }
}`,
      output: 'Read: Java\nRead: Spring\nBCA count: 15',
      explanation: 'BufferedReader is automatically closed when exiting try block; HashMap replaces matching key values.'
    },
    commonInterviewQuestions: [
      {
        question: 'Does the finally block always execute in Java?',
        answer: 'Yes, the finally block will always execute even if a return statement exists inside the try or catch block. The only exceptions are: 1) Calling `System.exit(0)`, 2) Fatal JVM crash/power failure, or 3) The executing thread is killed.'
      },
      {
        question: 'How does HashMap handle collisions internally in Java 8+?',
        answer: 'HashMap uses separate chaining with an array of Node buckets. When collisions occur, elements are stored in a linked list. If the number of items in a single bucket reaches or exceeds 8 (TREEIFY_THRESHOLD) and total table capacity is at least 64, the linked list is converted into a balanced Red-Black Tree, improving lookup from O(N) to O(log N).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Catching generic `Exception` everywhere and leaving catch blocks empty.',
        correction: 'Catch specific exceptions and log or rethrow them appropriately.',
        why: 'Swallowing exceptions hides critical bugs and makes debugging impossible.'
      }
    ],
    quickRevision: [
      'Checked: Must handle/declare (IOException); Unchecked: RuntimeException.',
      'Finally executes even after return statements.',
      'Try-with-resources closes AutoCloseables automatically.',
      'HashMap converts long collision chains (>= 8) to Red-Black trees in Java 8.'
    ],
    practiceQuestions: [
      {
        id: 'java-exc-pq1',
        question: 'Which of the following is an Unchecked Exception in Java?',
        options: ['IOException', 'SQLException', 'ClassNotFoundException', 'NullPointerException'],
        correctOptionIndex: 3,
        explanation: 'NullPointerException is a subclass of RuntimeException, making it an Unchecked exception.'
      }
    ]
  },

  // ===================== PYTHON =====================
  'python-fundamentals': {
    topicId: 'python-fundamentals',
    topicName: 'Python Syntax, Dynamic Typing & Data Types',
    subjectId: 'python',
    whatIsIt: 'Core Python architecture: dynamically typed, interpreted execution model, garbage collection via reference counting, PEP 8 standards, and fundamental built-in data types.',
    simpleExplanation: 'In languages like Java or C, you must declare the type of container before using it (`int x = 5`). In Python, variables are simply named sticky notes that you can slap onto any object (`x = 5`, then `x = "hello"`). Python figures out the type automatically at runtime.',
    technicalExplanation: 'Python is an interpreted, strongly dynamically typed language. In Python, variables do not store values directly; they are references (pointers) to heap-allocated PyObject instances. Each PyObject contains a type pointer, value, and reference count. Built-in types: Numeric (int: arbitrary precision, float: 64-bit IEEE, complex), Sequence (str, list, tuple), Mapping (dict), Set (set, frozenset), and Boolean (bool: subclass of int). Mutability: Mutable objects (list, dict, set) can be altered in place; Immutable objects (int, float, str, tuple, frozenset) cannot be modified after creation—modifications create new objects in memory. Garbage Collection: Python uses Reference Counting supplemented by a generational cyclic garbage collector.',
    importantDefinitions: [
      { term: 'Dynamic Typing', definition: 'A type system where variable types are checked and bound at runtime rather than at compile time.' },
      { term: 'Strong Typing', definition: 'A type system that prevents implicit type coercion between incompatible types (e.g., `1 + "2"` raises TypeError in Python).' },
      { term: 'Immutable Object', definition: 'An object whose state and internal values cannot be modified after instantiation (int, float, str, tuple).' },
      { term: 'PEP 8', definition: 'Python Enhancement Proposal 8: The official style guide for writing readable Python code (4 spaces indentation, snake_case).' }
    ],
    keyConcepts: [
      'Strongly Typed: Python will NOT automatically cast `"5" + 2` (throws TypeError, unlike JavaScript).',
      'Arbitrary Precision Integers: Python 3 `int` has unlimited precision limited only by available machine RAM (no 32-bit/64-bit integer overflow!).',
      '`is` vs `==`: `==` checks value equality (calls `__eq__`); `is` checks memory identity (`id(a) == id(b)`).',
      'Small Integer Caching: Python pre-allocates and caches small integers between -5 and 256 for fast reuse.'
    ],
    example: {
      type: 'code',
      title: 'Python Mutability & Memory Identity Demo',
      language: 'python',
      code: `# 1. Immutable types (int, str, tuple)
a = 10
b = a
a += 1
print("a:", a, "b:", b) # a is 11, b remains 10!

# 2. Mutable types (list, dict)
list1 = [1, 2, 3]
list2 = list1 # Both point to the exact same heap list!
list2.append(4)
print("list1:", list1) # [1, 2, 3, 4] modified in place!

# 3. 'is' vs '=='
x = [1, 2]
y = [1, 2]
print("x == y:", x == y) # True (identical values)
print("x is y:", x is y) # False (distinct memory objects)`,
      output: 'a: 11 b: 10\nlist1: [1, 2, 3, 4]\nx == y: True\nx is y: False',
      explanation: 'Modifying a mutable object through one reference reflects across all aliases sharing that reference.'
    },
    commonInterviewQuestions: [
      {
        question: 'What is the difference between `==` and `is` in Python?',
        answer: '`==` checks for equality of contents/values by invoking the object’s `__eq__()` method. `is` checks for object identity, verifying whether both references point to the exact same physical memory address (`id(a) == id(b)`).'
      },
      {
        question: 'Why are tuples considered immutable while lists are mutable?',
        answer: 'A tuple’s length and element pointers are permanently fixed in memory at creation time, making them hashable (usable as dictionary keys) and memory-efficient. Lists have dynamic sizing and over-allocated memory arrays that support in-place resizing, appending, and item mutations.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using mutable default arguments in functions: `def append_to(item, target=[]):`.',
        correction: 'Use `def append_to(item, target=None): if target is None: target = []`.',
        why: 'Default arguments in Python are evaluated once when the function is defined, sharing the same list instance across all subsequent function calls.'
      }
    ],
    quickRevision: [
      'Dynamically typed + Strongly typed.',
      'Immutable: int, float, str, tuple, frozenset.',
      'Mutable: list, dict, set.',
      '== checks value; `is` checks memory address (`id`).'
    ],
    practiceQuestions: [
      {
        id: 'py-fund-pq1',
        question: 'Which of the following data types is IMMUTABLE in Python?',
        options: ['list', 'dict', 'set', 'tuple'],
        correctOptionIndex: 3,
        explanation: 'Tuples are immutable; once created, their elements and length cannot be modified in place.'
      }
    ]
  },

  'python-functions-lambda': {
    topicId: 'python-functions-lambda',
    topicName: 'Functions, *args, **kwargs & Lambdas',
    subjectId: 'python',
    whatIsIt: 'First-class function architecture in Python, supporting variable positional arguments (*args), keyword arguments (**kwargs), anonymous lambda expressions, and functional primitives (map, filter).',
    simpleExplanation: 'Functions in Python are treated like ordinary objects: you can store them in variables, pass them to other functions, or return them. `*args` lets a function accept any number of extra gifts in a bag (tuple); `**kwargs` lets it accept labeled gifts in a box (dictionary). A `lambda` is a quick one-liner function created on the fly.',
    technicalExplanation: 'Functions are first-class citizens in Python. Parameter unpacking: 1) `*args`: Collects extra positional arguments into an immutable `tuple`; 2) `**kwargs`: Collects extra keyword arguments into a mutable `dict`. Anonymous Functions (Lambdas): Synthesized using `lambda arguments: expression`; restricted strictly to a single inline expression with an implicit return. Higher-Order Functions: Functions that accept functions as arguments or return them (e.g., `map(func, iterable)`, `filter(predicate, iterable)`, `sorted(iterable, key=lambda...)`). Scope follows LEGB Rule: Local -> Enclosing -> Global -> Built-in.',
    importantDefinitions: [
      { term: '*args', definition: 'A parameter syntax that collects variable positional arguments into a tuple.' },
      { term: '**kwargs', definition: 'A parameter syntax that collects arbitrary keyword arguments into a dictionary.' },
      { term: 'Lambda Expression', definition: 'An anonymous, inline function definition limited to a single expression whose evaluated value is automatically returned.' },
      { term: 'LEGB Rule', definition: 'The name resolution lookup sequence in Python: Local, Enclosing, Global, and Built-in scopes.' }
    ],
    keyConcepts: [
      'First-Class Functions: Can be passed as arguments, assigned to variables, and returned from other functions.',
      'Parameter ordering: Normal positional -> `*args` -> Keyword-only -> `**kwargs`.',
      '`global` and `nonlocal` keywords: `global` allows modifying module-level variables; `nonlocal` allows modifying enclosing closure variables.',
      'Lambda limitation: Cannot contain statements (such as `return`, `pass`, `assert`, or assignments).'
    ],
    example: {
      type: 'code',
      title: 'Python *args, **kwargs & Lambda Sorting',
      language: 'python',
      code: `# 1. Arbitrary Arguments Function
def report_student(name, *scores, **metadata):
    avg_score = sum(scores) / len(scores) if scores else 0
    print(f"Student: {name}, Avg: {avg_score:.1f}")
    for k, v in metadata.items():
        print(f"  {k}: {v}")

report_student("Alice", 85, 90, 95, city="Mumbai", rank=1)

# 2. Lambda with custom sorting
students = [("Bob", 75), ("Charlie", 92), ("Alice", 88)]
# Sort by score descending using lambda
sorted_students = sorted(students, key=lambda s: s[1], reverse=True)
print("Rankings:", sorted_students)`,
      output: 'Student: Alice, Avg: 90.0\n  city: Mumbai\n  rank: 1\nRankings: [(\'Charlie\', 92), (\'Alice\', 88), (\'Bob\', 75)]',
      explanation: 'Scores are packed into a tuple, metadata into a dict, and lambda extracts score for sorting.'
    },
    commonInterviewQuestions: [
      {
        question: 'What is the LEGB rule for variable scope in Python?',
        answer: 'The LEGB rule defines the exact resolution sequence Python follows when searching for variable names:\n1. L (Local): Defined inside current function.\n2. E (Enclosing): In outer enclosing functions (closures).\n3. G (Global): At top-level module scope.\n4. B (Built-in): Built-in Python functions and constants (like len, print, range).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Putting `*args` after `**kwargs` in a function signature.',
        correction: 'Always place `*args` before `**kwargs`.',
        why: 'Python syntax requires all positional expansions to precede dictionary keyword expansions.'
      }
    ],
    quickRevision: [
      '*args: Packs positional arguments into a tuple.',
      '**kwargs: Packs keyword arguments into a dictionary.',
      'Lambda: Inline anonymous function with single expression.',
      'LEGB: Local, Enclosing, Global, Built-in scope resolution.'
    ],
    practiceQuestions: [
      {
        id: 'py-fn-pq1',
        question: 'What data structure is used by Python to store arguments received via `*args`?',
        options: ['list', 'tuple', 'dict', 'set'],
        correctOptionIndex: 1,
        explanation: 'In Python, `*args` collects positional arguments into an immutable `tuple`.'
      }
    ]
  },

  'python-oop-exceptions': {
    topicId: 'python-oop-exceptions',
    topicName: 'Python OOP Basics & Exception Handling',
    subjectId: 'python',
    whatIsIt: 'Object-Oriented Programming mechanisms in Python (classes, `__init__`, `self`, inheritance, dunder methods) and structured exception handling (`try-except-else-finally`).',
    simpleExplanation: 'In Python, `self` is like saying "me" or "myself": it refers to the specific instance running the method. Dunder methods (like `__str__`) are magic hooks that let your objects work with Python functions like `print()` and `len()`. Exception handling uses `try-except` to catch problems before they crash your script.',
    technicalExplanation: 'Classes in Python are created using the `class` keyword. The `__init__` method serves as the instance initializer; `self` represents the instance itself and MUST be explicitly passed as the first parameter to instance methods. Special (Dunder) Methods customize behavior: `__str__` (user-friendly string), `__repr__` (developer representation), `__len__`, `__add__`. Inheritance: Supports multiple inheritance resolved via the C3 Superclass Linearization algorithm, accessible via `Method Resolution Order (MRO)` (`ClassName.__mro__`). Exception Handling: `try` block wraps risky code; `except` catches specific exceptions; `else` executes only if NO exceptions were raised; `finally` executes unconditionally for cleanup.',
    importantDefinitions: [
      { term: 'self Parameter', definition: 'An explicit reference to the current instance of the class used to access instance variables and methods.' },
      { term: 'Dunder (Magic) Methods', definition: 'Methods prefixed and suffixed with double underscores (e.g., __init__, __str__) invoked implicitly by Python operators and built-ins.' },
      { term: 'Method Resolution Order (MRO)', definition: 'The order in which Python searches parent classes for attributes and methods in multiple inheritance hierarchies (using C3 linearization).' },
      { term: 'try-except-else-finally', definition: 'The complete exception handling construct in Python where `else` runs only on success and `finally` runs unconditionally.' }
    ],
    keyConcepts: [
      '`self` must be explicitly declared as the first parameter in instance methods, though it is passed implicitly when invoking `obj.method()`.',
      'The `else` block in exception handling: Runs ONLY if no exceptions were thrown in the `try` block (cleaner than putting non-risky code in try).',
      'Multiple Inheritance in Python: Fully supported; resolved via `super()` following the class MRO.',
      'Private attributes convention: Single underscore `_var` indicates internal convention; double underscore `__var` triggers name mangling (`_ClassName__var`).'
    ],
    example: {
      type: 'code',
      title: 'Python Class with Dunder Methods & try-except-else-finally',
      language: 'python',
      code: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"{self.name} ($ {self.price})"

    def apply_discount(self, percent):
        try:
            if percent < 0 or percent > 100:
                raise ValueError("Discount must be between 0 and 100")
            discount_amount = self.price * (percent / 100)
            self.price -= discount_amount
        except ValueError as err:
            print(f"Error: {err}")
        else:
            print(f"Discount applied! New price: $ {self.price}")
        finally:
            print("Operation completed.")

p = Product("Laptop", 1000)
p.apply_discount(15) # Valid
p.apply_discount(150) # Raises ValueError handled gracefully`,
      output: 'Discount applied! New price: $850.0\nOperation completed.\nError: Discount must be between 0 and 100\nOperation completed.',
      explanation: 'Demonstrates `__init__`, `__str__`, custom exception raising, `else` success handling, and `finally` cleanup.'
    },
    commonInterviewQuestions: [
      {
        question: 'What is the purpose of the `else` clause in a Python `try-except` block?',
        answer: 'The `else` block executes only if the code inside the `try` block completes successfully without raising any exceptions. It helps keep the `try` block minimal by separating the code being guarded for errors from code that should run only upon success.'
      },
      {
        question: 'What is Method Resolution Order (MRO) and how can you inspect it?',
        answer: 'Method Resolution Order (MRO) is the sequence in which Python searches base classes when executing a method or resolving an attribute in multiple inheritance. It uses the C3 Linearization algorithm to ensure monotonicity. You can inspect it using `Class.mro()` or `Class.__mro__`.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using a bare `except:` without specifying an exception class.',
        correction: 'Always catch specific exceptions: `except (KeyError, ValueError):` or at least `except Exception:`.',
        why: 'A bare `except:` catches `KeyboardInterrupt` and `SystemExit`, preventing the user from stopping the script with Ctrl+C.'
      }
    ],
    quickRevision: [
      '`self`: Explicit reference to current instance.',
      '`__init__`: Constructor/initializer hook.',
      '`try-except-else-finally`: `else` runs on success, `finally` runs always.',
      'MRO: C3 Linearization order for resolving multiple inheritance.'
    ],
    practiceQuestions: [
      {
        id: 'py-oop-pq1',
        question: 'In Python exception handling, when does the `else` block execute?',
        options: [
          'Whenever an exception is caught',
          'Only when NO exception is raised in the try block',
          'Unconditionally in all scenarios',
          'Only when the program runs out of memory'
        ],
        correctOptionIndex: 1,
        explanation: 'The `else` block executes if and only if the `try` block executes successfully without raising any exceptions.'
      }
    ]
  }
};
