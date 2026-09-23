import { TopicLearningContent } from '../../types';

export const SQL_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  'sql-sublanguages': {
    topicId: 'sql-sublanguages',
    topicName: 'SQL Sublanguages (DDL, DML, DQL, DCL, TCL)',
    subjectId: 'sql',
    whatIsIt: 'SQL commands are categorized into five sublanguages based on their operational scope: DDL (structure), DML (data manipulation), DQL (data retrieval), DCL (permissions), and TCL (transaction boundaries).',
    simpleExplanation: 'Think of a notebook: DDL is manufacturing the blank notebook with labeled columns (Schema). DML is writing or erasing journal entries with a pencil (Data). DQL is reading the entries with a bookmark (Query). DCL is deciding who is allowed to open the notebook (Access control). TCL is deciding whether to make your pencil notes permanent with ink or rub them all out (Transactions).',
    technicalExplanation: '1. DDL (Data Definition Language): Defines and modifies database schema objects. Operations are auto-committed. Commands: CREATE, ALTER, DROP, TRUNCATE, RENAME. 2. DML (Data Manipulation Language): Modifies instance records; not auto-committed. Commands: INSERT, UPDATE, DELETE. 3. DQL (Data Query Language): Retrieves data. Command: SELECT. 4. DCL (Data Control Language): Manages privileges and security. Commands: GRANT, REVOKE. 5. TCL (Transaction Control Language): Manages transactions. Commands: COMMIT, ROLLBACK, SAVEPOINT.',
    importantDefinitions: [
      { term: 'DDL (Data Definition Language)', definition: 'Commands that define the schema, tables, views, and indexes. Auto-committed and irreversible via ROLLBACK.' },
      { term: 'DML (Data Manipulation Language)', definition: 'Commands that modify table records without altering the underlying table structure. Reversible within transactions.' },
      { term: 'TCL (Transaction Control Language)', definition: 'Commands controlling transaction persistence (COMMIT), reversal (ROLLBACK), and checkpointing (SAVEPOINT).' },
    ],
    keyConcepts: [
      'DDL commands commit automatically (implicit commit), which means preceding uncommitted DML transactions are also committed!',
      'DELETE is DML (logs row-by-row deletions, triggers fire, can be rolled back).',
      'TRUNCATE is DDL (deallocates entire data pages, minimal logging, faster, cannot be rolled back in many RDBMS, resets auto-increment).',
      'DROP is DDL (deletes table structure, indexes, and all data completely from system catalog).',
    ],
    example: {
      type: 'sql',
      title: 'SQL Sublanguages Comprehensive Syntax Reference',
      language: 'sql',
      code: `-- 1. DDL: Create structure
CREATE TABLE Students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    gpa DECIMAL(3, 2)
);

-- 2. DML: Insert and Update records
INSERT INTO Students (id, name, gpa) VALUES (1, 'Alice', 3.8);
UPDATE Students SET gpa = 3.9 WHERE id = 1;

-- 3. DQL: Query data
SELECT name, gpa FROM Students WHERE gpa > 3.5;

-- 4. TCL: Commit changes
COMMIT;

-- 5. DCL: Grant read permissions to role
GRANT SELECT ON Students TO analyst_role;`,
      explanation: 'Covers practical syntax across all 5 standard sublanguage classifications.',
    },
    commonInterviewQuestions: [
      {
        question: 'What is the exact difference between DELETE, TRUNCATE, and DROP?',
        answer: '1. DELETE is DML: Deletes specific rows matching a WHERE clause (or all rows if omitted). Each deleted row is logged in the transaction log, row-level delete triggers execute, and changes CAN be rolled back. 2. TRUNCATE is DDL: Fast operation that deallocates all data pages of the table, resetting table identity/auto-increment counters. Does not fire row triggers, cannot filter with WHERE, and cannot be rolled back in MySQL. 3. DROP is DDL: Completely removes both data and the table definition/schema from the database catalog.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Attempting to use a WHERE clause with TRUNCATE TABLE.',
        correction: 'TRUNCATE TABLE cannot take a WHERE clause. It always operates on the entire table data pages.',
        why: 'TRUNCATE deallocates pages at the storage level rather than scanning rows.',
      },
    ],
    quickRevision: [
      'DDL: CREATE, ALTER, DROP, TRUNCATE (Auto-committed, schema level).',
      'DML: INSERT, UPDATE, DELETE (Can be rolled back, row level).',
      'DQL: SELECT.',
      'DCL: GRANT, REVOKE.',
      'TCL: COMMIT, ROLLBACK, SAVEPOINT.',
    ],
    practiceQuestions: [
      {
        id: 'sql-sub-q1',
        question: 'Which of the following commands is a DDL command that removes all records from a table without deleting the table structure?',
        options: ['DELETE', 'TRUNCATE', 'DROP', 'REMOVE'],
        correctOptionIndex: 1,
        explanation: 'TRUNCATE is a DDL command that deallocates all pages to remove all rows while preserving the table schema.',
      },
    ],
  },

  'sql-queries-filtering': {
    topicId: 'sql-queries-filtering',
    topicName: 'SELECT, WHERE, ORDER BY, GROUP BY & HAVING',
    subjectId: 'sql',
    whatIsIt: 'The foundational data query clauses in SQL allow developers to filter rows, aggregate data across categories, apply group-level constraints, and sort results.',
    simpleExplanation: 'Imagine sorting a box of colored marbles: WHERE filters out broken marbles before doing anything else. GROUP BY sorts the remaining marbles into bowls by color. HAVING discards any bowl with fewer than 5 marbles. SELECT counts how many marbles are left in each bowl, and ORDER BY lines up the bowls from most to least.',
    technicalExplanation: 'The SQL query execution order differs sharply from its written syntax order: 1. FROM & JOINs (gather tables) → 2. WHERE (filters individual rows before aggregation) → 3. GROUP BY (collapses rows into groups) → 4. HAVING (filters groups based on aggregate conditions) → 5. SELECT & Window Functions (projects expressions) → 6. DISTINCT (removes duplicates) → 7. ORDER BY (sorts final output) → 8. LIMIT / OFFSET (paginates results). This order explains why column aliases declared in SELECT cannot be used in WHERE, but can be used in ORDER BY.',
    importantDefinitions: [
      { term: 'WHERE Clause', definition: 'Filters individual rows before grouping or aggregation occurs; cannot take aggregate functions directly.' },
      { term: 'GROUP BY Clause', definition: 'Collapses rows that have the same values in specified columns into summary rows.' },
      { term: 'HAVING Clause', definition: 'Filters groups after GROUP BY aggregation has been performed; can evaluate aggregate expressions (e.g. HAVING COUNT(*) > 5).' },
    ],
    keyConcepts: [
      'WHERE vs HAVING: WHERE filters rows BEFORE grouping. HAVING filters groups AFTER grouping.',
      'Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX() ignore NULL values (except COUNT(*)).',
      'GROUP BY Rule: Any column in the SELECT list that is not part of an aggregate function MUST appear in the GROUP BY clause.',
    ],
    example: {
      type: 'sql',
      title: 'GROUP BY and HAVING with Department Aggregates',
      language: 'sql',
      code: `-- Find departments with more than 3 employees and average salary > 60000
SELECT 
    dept_id,
    COUNT(emp_id) AS total_employees,
    AVG(salary) AS avg_salary
FROM Employees
WHERE status = 'Active'         -- Filter individual rows
GROUP BY dept_id               -- Group by department
HAVING COUNT(emp_id) > 3       -- Filter aggregate groups
   AND AVG(salary) > 60000
ORDER BY avg_salary DESC;      -- Sort final result`,
      explanation: 'Executes WHERE filtering first on active employees, groups them by department, checks group criteria via HAVING, and orders by average salary.',
    },
    commonInterviewQuestions: [
      {
        question: 'Why can you not use an aggregate function like SUM(salary) in a WHERE clause?',
        answer: 'Because of the SQL logical query processing order. The WHERE clause is evaluated row-by-row BEFORE the GROUP BY aggregation step takes place. At the time WHERE executes, groups do not yet exist, so aggregate values have not been calculated. Aggregate conditions must be placed in the HAVING clause.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using column aliases created in SELECT within the WHERE clause.',
        correction: 'Use the original column expression in the WHERE clause, or wrap in a subquery/CTE.',
        why: 'WHERE executes before SELECT, so the alias does not exist when WHERE evaluates.',
      },
    ],
    quickRevision: [
      'Execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.',
      'WHERE filters rows before aggregation; HAVING filters groups after aggregation.',
      'Aggregate functions ignore NULL values (except COUNT(*)).',
      'SELECT non-aggregates must be included in GROUP BY.',
    ],
    practiceQuestions: [
      {
        id: 'sql-fil-q1',
        question: 'Which clause in an SQL statement is evaluated FIRST by the query execution engine?',
        options: ['SELECT', 'WHERE', 'FROM', 'ORDER BY'],
        correctOptionIndex: 2,
        explanation: 'FROM (and JOIN) is evaluated first to determine the working set of data before filtering (WHERE) or projection (SELECT).',
      },
    ],
  },

  'sql-joins': {
    topicId: 'sql-joins',
    topicName: 'SQL Joins (INNER, LEFT, RIGHT, FULL, CROSS, SELF)',
    subjectId: 'sql',
    whatIsIt: 'SQL Joins combine columns from one or more tables based on a related common column between them, reconstructing relational entities.',
    simpleExplanation: 'Imagine matching student IDs on student registration cards with library cards. An INNER JOIN gives you only students who registered AND have a library card. A LEFT JOIN gives you ALL registered students, showing their library info if they have one, or NULL if they do not.',
    technicalExplanation: '1. INNER JOIN: Returns records that have matching values in both tables. 2. LEFT (OUTER) JOIN: Returns all records from left table, and matched records from right table (fills NULLs for non-matches). 3. RIGHT (OUTER) JOIN: Returns all records from right table, and matched records from left table. 4. FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table. 5. CROSS JOIN: Cartesian product of two tables (M * N rows). 6. SELF JOIN: A regular join where a table is joined with itself using table aliases (e.g. Employee table joined to itself to resolve Manager ID).',
    importantDefinitions: [
      { term: 'INNER JOIN', definition: 'Intersection of two tables based on a predicate condition.' },
      { term: 'LEFT OUTER JOIN', definition: 'All rows from the left table, supplemented with matching columns from the right table or NULL.' },
      { term: 'SELF JOIN', definition: 'Joining a table to itself using distinct aliases to model recursive relationships like employee-manager hierarchies.' },
    ],
    keyConcepts: [
      'Joining on NULL: In SQL, NULL = NULL evaluates to UNKNOWN, not TRUE. Therefore, INNER JOIN will never match rows on NULL values.',
      'Cartesian Product: A CROSS JOIN of a table with 10 rows and a table with 20 rows yields 10 * 20 = 200 rows.',
      'Self Join requires distinct table aliases (e.g. FROM Employees e JOIN Employees m ON e.manager_id = m.emp_id).',
    ],
    example: {
      type: 'sql',
      title: 'Self-Join to Find Employee and Manager Names',
      language: 'sql',
      code: `-- Find each employee name along with their manager's name
SELECT 
    e.emp_name AS Employee,
    COALESCE(m.emp_name, 'Top Executive / No Manager') AS Manager
FROM Employees e
LEFT JOIN Employees m 
    ON e.manager_id = m.emp_id;`,
      explanation: 'Uses a LEFT JOIN on the same table with aliases "e" (Employee) and "m" (Manager) so the top executive who has manager_id = NULL is still included.',
    },
    commonInterviewQuestions: [
      {
        question: 'How do you find all rows in Table A that have NO corresponding match in Table B?',
        answer: 'Use a LEFT JOIN from Table A to Table B on the foreign key, and filter with WHERE B.primary_key IS NULL. Example: SELECT A.* FROM TableA A LEFT JOIN TableB B ON A.id = B.a_id WHERE B.a_id IS NULL; Alternatively, use NOT EXISTS or NOT IN (with caution regarding NULLs).',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using "NOT IN (SELECT id FROM TableB)" when TableB contains NULL values.',
        correction: 'If the subquery in NOT IN returns even a single NULL value, the entire NOT IN expression evaluates to UNKNOWN for all rows, returning an empty result set! Always use NOT EXISTS or ensure subquery filters WHERE id IS NOT NULL.',
        why: 'In three-valued SQL logic, x NOT IN (1, NULL) evaluates to UNKNOWN.',
      },
    ],
    quickRevision: [
      'INNER: Matching rows only.',
      'LEFT: All left rows + matched right (NULL otherwise).',
      'RIGHT: All right rows + matched left.',
      'FULL: All rows from both tables.',
      'SELF JOIN: Join table with itself via aliases for hierarchical data.',
    ],
    practiceQuestions: [
      {
        id: 'sql-jn-q1',
        question: 'Table A has 5 rows and Table B has 4 rows. What is the number of rows produced by a CROSS JOIN between Table A and Table B?',
        options: ['9 rows', '20 rows', '5 rows', '1 row'],
        correctOptionIndex: 1,
        explanation: 'A CROSS JOIN produces the Cartesian product of the two tables: 5 * 4 = 20 rows.',
      },
    ],
  },
};
