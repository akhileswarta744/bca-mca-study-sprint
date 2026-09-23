import { TopicLearningContent } from '../../types';

export const JAVA_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  'java-fundamentals-jvm': {
    topicId: 'java-fundamentals-jvm',
    topicName: 'Java Architecture: JVM, JRE, JDK & Bytecode',
    subjectId: 'java',
    whatIsIt: 'Java is a high-level, class-based, object-oriented programming language designed around the philosophy: "Write Once, Run Anywhere" (WORA), enabled by the Java Virtual Machine (JVM).',
    simpleExplanation: 'Imagine an author writing a book in musical notes (Java source code .java). A translator translates the notes into sheet music (Bytecode .class). An orchestra anywhere in the world (whether running on Windows, macOS, or Linux) with a trained conductor (the JVM) can read that exact same sheet music and play the symphony perfectly without rewriting the notes for each country.',
    technicalExplanation: 'The Java compiler (javac) compiles .java source files into architecture-neutral Bytecode (.class files). The JVM (Java Virtual Machine) loads bytecode using ClassLoaders, verifies bytecode safety, and executes it via the Execution Engine using an Interpreter and JIT (Just-In-Time) Compiler. The JIT compiler monitors hot spots (frequently executed loops/methods) and compiles them directly into native machine code for high performance. JRE = JVM + Core Class Libraries. JDK = JRE + Development Tools (javac, jdb, jar).',
    importantDefinitions: [
      { term: 'JVM (Java Virtual Machine)', definition: 'An abstract virtual computing machine that provides the runtime environment in which Java bytecode can be executed.' },
      { term: 'JRE (Java Runtime Environment)', definition: 'The software package that bundles the JVM along with core class libraries (rt.jar) needed to RUN compiled Java programs.' },
      { term: 'JDK (Java Development Kit)', definition: 'The complete software development environment containing JRE plus development tools (javac compiler, debugger) needed to DEVELOP Java software.' },
      { term: 'JIT Compiler', definition: 'Just-In-Time compiler within the JVM that compiles frequently executed bytecode loops into native machine instructions at runtime.' },
    ],
    keyConcepts: [
      'Bytecode (.class) is platform-independent; the JVM is platform-dependent (there is a separate JVM executable for Windows, Linux, macOS).',
      'JVM Memory Areas: Method Area / Metaspace (class metadata, static variables), Heap (all object instances, shared among all threads), Stack (one per thread, activation records and local variables), PC Register, Native Method Stack.',
      'Automatic Garbage Collection (GC): Daemon thread running in JVM that cleans up unreachable heap objects (via mark-and-sweep or generational GC).',
    ],
    example: {
      type: 'code',
      title: 'Java Compilation and Execution Command Sequence',
      language: 'bash',
      code: `# Step 1: Compile source code into platform-independent bytecode
javac Main.java      # Produces Main.class

# Step 2: Execute bytecode on the platform-specific JVM
java Main            # JVM loads, verifies, and runs bytecode

# Step 3: Inspect compiled bytecode using Java disassembler
javap -c Main        # Displays disassembled JVM bytecode instructions`,
      explanation: 'Shows how javac produces .class bytecode and the java command starts the JVM to execute that bytecode.',
    },
    commonInterviewQuestions: [
      {
        question: 'Why is Java platform-independent while C++ is platform-dependent?',
        answer: 'C++ compiles source code directly into native OS-specific machine instructions (.exe or ELF binary) that bind directly to a specific CPU architecture. Java compiles source code into intermediate bytecode (.class) for an abstract virtual processor (the JVM). Any computer with a JVM installed can interpret and execute that same bytecode, making Java code write-once-run-anywhere.',
      },
      {
        question: 'What is the difference between JDK, JRE, and JVM?',
        answer: 'JVM is the runtime engine that executes bytecode. JRE is the package containing the JVM plus standard Java core libraries (needed to run apps). JDK is the superset containing JRE plus development and compilation tools like javac and jdb (needed to write and compile apps). JDK = JRE + Tools; JRE = JVM + Libraries.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming the JVM itself is platform-independent.',
        correction: 'Java BYTECODE is platform-independent, but the JVM implementation is strictly PLATFORM-DEPENDENT.',
        why: 'The JVM must interface with the underlying OS kernel and physical hardware CPU.',
      },
    ],
    quickRevision: [
      'JDK = JRE + Dev Tools (javac).',
      'JRE = JVM + Core Class Libraries.',
      'JVM executes bytecode; JIT compiles hotspots to native machine code.',
      'Heap stores objects; Stack stores thread method frames and primitives.',
    ],
    practiceQuestions: [
      {
        id: 'java-jvm-q1',
        question: 'Which component of the JVM is responsible for converting frequently executed bytecode chunks into native machine code at runtime?',
        options: ['Class Loader', 'Bytecode Verifier', 'Just-In-Time (JIT) Compiler', 'Garbage Collector'],
        correctOptionIndex: 2,
        explanation: 'The JIT compiler analyzes running bytecode, identifies performance hot spots, and compiles them directly into native machine code.',
      },
    ],
  },

  'java-strings-methods': {
    topicId: 'java-strings-methods',
    topicName: 'Strings: Immutability, String Constant Pool & equals() vs ==',
    subjectId: 'java',
    whatIsIt: 'In Java, String is a reference object representing an immutable sequence of characters, managed with a specialized caching memory zone called the String Constant Pool (SCP).',
    simpleExplanation: 'Imagine an artist carving a statue out of granite. Once carved, you cannot alter the statue; if you want a change, you must carve a brand new statue from scratch. That is String immutability. If two people ask for an identical statue of a cat, the museum just points both people to the same single cat statue in the gallery (String Constant Pool) to avoid wasting granite.',
    technicalExplanation: 'Strings in Java are immutable: once instantiated, their internal char/byte array values cannot be altered. String literal declarations (e.g. String s = "abc") store references in the String Constant Pool located inside the JVM Heap. If another literal "abc" is declared, the JVM reuses the existing instance. Instantiating via new (e.g. String s = new String("abc")) forces the creation of a new distinct object on the non-pool heap. The == operator checks reference memory address equality, while .equals() compares the actual character contents.',
    importantDefinitions: [
      { term: 'Immutability', definition: 'The property that once an object is created, its internal state cannot be changed.' },
      { term: 'String Constant Pool (SCP)', definition: 'A specialized cache area within JVM heap memory that stores unique string literals to conserve memory.' },
      { term: 'StringBuilder vs StringBuffer', definition: 'Mutable sequences of characters. StringBuilder is unsynchronized and faster (single-threaded). StringBuffer is synchronized and thread-safe.' },
    ],
    keyConcepts: [
      '== operator compares memory addresses (reference identity).',
      '.equals() compares character sequences for value equality.',
      'String concatenation in loops creates excessive intermediate garbage objects. Use StringBuilder for heavy concatenations.',
      'intern() method explicitly puts a heap string into the String Constant Pool.',
    ],
    example: {
      type: 'code',
      title: 'String Pool and Equality Demonstration in Java',
      language: 'java',
      code: `public class StringDemo {
    public static void main(String[] args) {
        String s1 = "Java";               // Lives in String Constant Pool
        String s2 = "Java";               // Reuses existing literal from Pool
        String s3 = new String("Java");   // Created in normal Heap memory

        // Reference comparison (==)
        System.out.println(s1 == s2);      // TRUE (both point to same SCP object)
        System.out.println(s1 == s3);      // FALSE (distinct memory addresses)

        // Content comparison (.equals)
        System.out.println(s1.equals(s3)); // TRUE (same character sequence)

        // String modification creates NEW object
        s1 = s1 + " MCA";                  // s1 now points to new string "Java MCA"
        System.out.println(s1);            // "Java MCA"
    }
}`,
      explanation: 'Illustrates how literal reuse in SCP differs from explicit heap allocation with new, and contrasts == with .equals().',
      output: `true
false
true
Java MCA`,
    },
    commonInterviewQuestions: [
      {
        question: 'Why are Strings immutable in Java?',
        answer: '1. Security: Strings are widely used to store sensitive data like network connections, database URLs, and file paths. If mutable, a malicious thread could alter a parameter after security validation. 2. Thread Safety: Immutable objects are inherently thread-safe; multiple threads can share them without synchronization. 3. String Constant Pool caching: Reusing literals in the pool is only safe because no reference can mutate the shared string.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using s1 == s2 to compare user input strings.',
        correction: 'Always use s1.equals(s2) or s1.equalsIgnoreCase(s2) to compare string values in Java.',
        why: '== compares memory references, which will return false for different heap objects containing the exact same characters.',
      },
    ],
    quickRevision: [
      'Strings are immutable; modification produces a new object.',
      'String literals reside in the String Constant Pool (SCP).',
      '== compares references; .equals() compares character values.',
      'StringBuilder is mutable and fast; StringBuffer is mutable and thread-safe.',
    ],
    practiceQuestions: [
      {
        id: 'java-str-q1',
        question: 'How many objects are created in memory by the statement: String s = new String("Hello"); (assuming "Hello" is not already in the pool)?',
        options: ['1 object', '2 objects', '3 objects', '0 objects'],
        correctOptionIndex: 1,
        explanation: 'Two objects are created: one literal object in the String Constant Pool, and one distinct object on the regular Heap created by the "new" keyword.',
      },
    ],
  },

  'java-polymorphism': {
    topicId: 'java-polymorphism',
    topicName: 'Polymorphism: Overloading vs Overriding',
    subjectId: 'java',
    whatIsIt: 'Polymorphism ("many forms") is an OOP core pillar that enables a single interface or method name to execute different behaviors depending on parameters (compile-time) or the runtime object type (dynamic runtime dispatch).',
    simpleExplanation: 'Consider the word "speak". If you ask a human to speak, they talk. If you ask a dog to speak, it barks. If you ask a cat to speak, it meows. The same command produces different behaviors depending on who is receiving it (Method Overriding). Alternatively, your phone camera taking a photo with 0 taps (auto) vs holding the button (burst mode) is Method Overloading.',
    technicalExplanation: '1. Compile-Time Polymorphism (Static Binding / Method Overloading): Multiple methods in the SAME class share the same method name but have DIFFERENT parameter lists (differing in number, type, or order of parameters). Return type alone cannot differentiate overloaded methods. Resolved at compile-time. 2. Runtime Polymorphism (Dynamic Method Dispatch / Method Overriding): A subclass provides a specific implementation of a method already defined in its superclass, having the EXACT SAME method signature and return type (or covariant return type). Resolved at runtime using the Virtual Method Table (vtable) based on the actual object instance on the heap.',
    importantDefinitions: [
      { term: 'Method Overloading', definition: 'Methods in the same class sharing the same name with distinct parameter lists, resolved at compile-time.' },
      { term: 'Method Overriding', definition: 'A subclass redefining a superclass method with identical signature, resolved dynamically at runtime.' },
      { term: 'Dynamic Method Dispatch', definition: 'The mechanism by which a call to an overridden method is resolved at runtime rather than compile-time.' },
    ],
    keyConcepts: [
      'Rules for Overriding: Method signature must match exactly. Access modifier cannot be more restrictive. Return type must be same or covariant (subclass).',
      'Cannot override: private methods, static methods (static method redefining is called Method Hiding), or final methods.',
      '@Override annotation: Informs the compiler of intentional overriding and flags syntax mistakes at compile-time.',
    ],
    example: {
      type: 'code',
      title: 'Dynamic Method Dispatch in Java',
      language: 'java',
      code: `class Animal {
    void makeSound() {
        System.out.println("Generic animal sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks: Woof Woof!");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat meows: Meow!");
    }
}

public class PolyDemo {
    public static void main(String[] args) {
        // Superclass reference holding Subclass objects
        Animal a1 = new Dog();
        Animal a2 = new Cat();

        // Runtime dynamic dispatch
        a1.makeSound(); // Output: Dog barks: Woof Woof!
        a2.makeSound(); // Output: Cat meows: Meow!
    }
}`,
      explanation: 'Shows superclass reference Animal invoking overridden methods on Dog and Cat instances determined at runtime.',
      output: `Dog barks: Woof Woof!
Cat meows: Meow!`,
    },
    commonInterviewQuestions: [
      {
        question: 'Can we overload a method by changing only its return type in Java?',
        answer: 'No. Changing only the return type without altering parameter types or count results in a compilation error. The compiler determines method resolution based on method name and parameter types. If two methods differ only in return type, a call like "calculate(5);" is completely ambiguous.',
      },
      {
        question: 'Can static methods be overridden in Java?',
        answer: 'No, static methods cannot be overridden. If a subclass declares a static method with the same signature as a static method in the superclass, it is called Method Hiding, not overriding. Static method calls are resolved at compile-time based on the reference type, not at runtime.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Trying to override a method with a more restrictive access modifier (e.g. public in parent, protected in child).',
        correction: 'An overriding method can maintain the same access level or provide MORE access, but NEVER LESS access.',
        why: 'Violating this breaks the Liskov Substitution Principle, where a subclass must be usable wherever its superclass is expected.',
      },
    ],
    quickRevision: [
      'Overloading = Same class, same name, different parameters (Compile-time).',
      'Overriding = Parent & Child classes, same name, same signature (Runtime).',
      'Static, private, and final methods cannot be overridden.',
      'Dynamic method dispatch resolves methods using actual heap object.',
    ],
    practiceQuestions: [
      {
        id: 'java-poly-q1',
        question: 'Which of the following methods CANNOT be overridden in a Java subclass?',
        options: ['public void compute()', 'protected int getVal()', 'public static void display()', 'void process()'],
        correctOptionIndex: 2,
        explanation: 'Static methods belong to the class rather than an object instance and are bound at compile time; they cannot be overridden (redefining them is method hiding).',
      },
    ],
  },
};
