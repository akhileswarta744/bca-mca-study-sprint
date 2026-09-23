# BCA → MCA 16-Day Study Sprint

An intensive, focused web application designed to help BCA graduates revise all core Computer Science fundamentals in 16 days for MCA entrance exams and postgraduate technical interviews.

---

## 🎯 Academic Scope & Subject Coverage

### 1. CORE COMPUTER (From CUET PG Syllabus Computer Section)
1. **Operating Systems**: Dual-mode kernel architecture, Processes & PCB, Threads, IPC, Concurrency, Synchronization (Semaphores & Mutex), Deadlock (Coffman conditions & Banker's algorithm), CPU scheduling, Paging, Virtual Memory, File systems.
2. **Data Structures & Algorithms**: Row/Column-major array mapping, Sparse matrices, Stacks (Infix to Postfix), Queues (Circular queue arithmetic), Heaps, Linked lists, Trees, Traversals (In/Pre/Post), BST, AVL rotations (LL, RR, LR, RL), B-Trees, B+ Trees, Disjoint sets, Graphs (BFS, DFS, Spanning trees), Sorting & Searching asymptotics.
3. **Digital Fundamentals**: Number systems & conversions, 1's, 2's, 9's, 10's complements, IEEE 754 floating-point 32/64-bit standard, Error detection codes (Hamming, Parity), Logic gates, Universal synthesis (NAND, NOR), Boolean algebra, K-Maps with Don't Cares, Adders/Subtractors, Decoders/Multiplexers, Flip-Flops (SR, JK, Master-Slave, D, T), Registers & Counters, SRAM vs DRAM.

### 2. ADDITIONAL BCA CORE REVISION *(Not part of supplied CUET PG syllabus)*
4. **DBMS**: 3-Tier architecture, Relational keys (Super, Candidate, Primary, Foreign), Referential integrity, ER modeling, Normalization (1NF to BCNF), ACID transactions, B+ Tree indexing.
5. **SQL**: DDL, DML, DQL, DCL, TCL, SELECT, WHERE vs HAVING, GROUP BY, ORDER BY, Joins (INNER, LEFT, RIGHT, FULL, CROSS, SELF), Subqueries, Aggregate functions.
6. **Java**: JVM, JRE, JDK, Bytecode, JIT, Data types, Loops, Strings immutability & String Constant Pool, Constructors, Encapsulation, Inheritance, Polymorphism (Overloading vs Overriding), Interfaces vs Abstract classes, Exception handling, Collections.
7. **Python**: Dynamic typing, Collections (Lists, Tuples, Sets, Dicts), Slicing [start:stop:step], Comprehensions, Functions (*args, **kwargs), Lambdas, OOP basics, Exception handling.
8. **Computer Networks**: OSI 7-layer vs TCP/IP 4-layer, PDUs, IP addressing (IPv4, CIDR, IPv6), TCP (3-way handshake) vs UDP, HTTP/HTTPS, DNS, DHCP, Devices & Firewalls.
9. **Software Engineering**: SDLC, Waterfall, Spiral model, Agile & Scrum, SRS requirements, Cohesion vs Coupling, Testing pyramid (Unit, Integration, System), Git basics.

> **Exclusion Notice:** No Mathematics, Thinking & Decision Making, or English language learning features are included.

---

## 🚀 Deploying to Vercel

The project is pre-configured with `vercel.json` for one-click deployment.

### Method 1: Deploy with Vercel CLI

Run this command in the project directory:

```bash
npx vercel
```

- When prompted:
  - `Set up and deploy?`: **Yes** (`y`)
  - `Which scope?`: Select your Vercel account
  - `Link to existing project?`: **No** (`n`)
  - `What's your project's name?`: `bca-mca-study-sprint`
  - `In which directory is your code located?`: `./`
  - Vercel will automatically read `vercel.json` and deploy.
- For production deployment:
  ```bash
  npx vercel --prod
  ```

---

### Method 2: Deploy with GitHub & Vercel Dashboard

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/bca-mca-study-sprint.git
   git branch -M main
   git push -u origin main
   ```
2. Go to **[vercel.com/new](https://vercel.com/new)**.
3. Import the `bca-mca-study-sprint` repository.
4. Vercel automatically detects the preset:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
