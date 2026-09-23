import { TopicLearningContent } from '../../types';

export const PYTHON_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  'python-collections': {
    topicId: 'python-collections',
    topicName: 'Lists, Tuples, Sets & Dictionaries',
    subjectId: 'python',
    whatIsIt: 'Python provides four primary built-in data collections—Lists, Tuples, Sets, and Dictionaries—each designed for specific memory and operational characteristics.',
    simpleExplanation: 'A List is an expandable shopping list on a notepad (ordered, can cross off or add items). A Tuple is like your permanent birth certificate (ordered, but locked and unchangeable). A Set is a bag of unique marbles (unordered, no duplicate colors allowed). A Dictionary is a telephone directory (instant lookup of phone number by person’s name).',
    technicalExplanation: '1. List ([]): Ordered, mutable sequence of arbitrary objects. Backed by dynamic contiguous array of pointers. Appending is amortized O(1); inserting/deleting at index 0 is O(n). 2. Tuple (()): Ordered, immutable sequence. Faster than lists and uses less memory. Hashable if all internal elements are hashable, meaning tuples can serve as dictionary keys. 3. Set ({}): Unordered collection of unique, hashable elements. Implemented as an open-addressing hash table with average O(1) lookup, insertion, and deletion. 4. Dictionary ({k: v}): Unordered (insertion-ordered in Python 3.7+) mapping of unique hashable keys to arbitrary values. Average O(1) key lookups.',
    importantDefinitions: [
      { term: 'Mutable vs Immutable', definition: 'Mutable objects can be modified in-place after creation (Lists, Dicts, Sets). Immutable objects cannot be modified once instantiated (Tuples, Strings, Ints, Floats).' },
      { term: 'Hashable Object', definition: 'An object with an invariant hash value across its lifetime, allowing it to be indexed in sets and dictionary keys.' },
    ],
    keyConcepts: [
      'Lists vs Tuples: Lists are mutable and have overhead for dynamic expansion. Tuples are immutable, memory-compact, and hashable.',
      'Set uniqueness: Adding duplicate elements to a set is silently ignored. Set operations: union (|), intersection (&), difference (-).',
      'Dictionary keys must be immutable/hashable: Lists and dicts CANNOT be dict keys; tuples of primitives CAN be dict keys.',
    ],
    example: {
      type: 'code',
      title: 'Python Collections Overview and Key Properties',
      language: 'python',
      code: `# 1. List: Mutable, ordered
fruits = ["apple", "banana"]
fruits.append("cherry")      # In-place modification

# 2. Tuple: Immutable, ordered
coords = (12.97, 77.59)
# coords[0] = 13.0          # TypeError: 'tuple' object does not support item assignment

# 3. Set: Unique, unordered
unique_ids = {101, 102, 101, 103}
print(unique_ids)            # Output: {101, 102, 103}

# 4. Dictionary: Key-Value pairs
student = {"id": 1, "name": "Akhil", "skills": ["Python", "SQL"]}
print(student["name"])       # O(1) key lookup`,
      explanation: 'Demonstrates mutability, uniqueness, and indexing across the 4 fundamental built-in Python collections.',
      output: `{101, 102, 103}
Akhil`,
    },
    commonInterviewQuestions: [
      {
        question: 'Can a list be used as a dictionary key or set element in Python? Why or why not?',
        answer: 'No. Dictionary keys and set elements in Python MUST be hashable (they must implement a fixed __hash__() method that does not change over the object lifetime). Because lists are mutable, modifying a list in-place would change its logical value and invalidate its hash bucket position in the hash table, breaking dictionary lookups. Attempting to use a list as a dict key raises a TypeError: unhashable type: "list".',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Creating a single-element tuple as t = (5).',
        correction: 't = (5) evaluates to the integer 5 inside parentheses. A single-element tuple REQUIRES a trailing comma: t = (5,).',
        why: 'Parentheses without commas are treated as mathematical grouping operators.',
      },
    ],
    quickRevision: [
      'List: [ ], ordered, mutable, O(1) append, O(n) insert/delete at start.',
      'Tuple: ( ), ordered, immutable, hashable, memory-efficient.',
      'Set: { }, unique, unordered, average O(1) membership test.',
      'Dict: {k: v}, key-value mapping, keys must be hashable, O(1) lookup.',
    ],
    practiceQuestions: [
      {
        id: 'py-col-q1',
        question: 'Which of the following data types CANNOT be used as a key in a Python dictionary?',
        options: ['(1, 2, "hello")', 'frozenset([1, 2, 3])', '[10, 20, 30]', '"database_url"'],
        correctOptionIndex: 2,
        explanation: 'Lists are mutable objects and thus unhashable; using a list as a dictionary key raises a TypeError.',
      },
    ],
  },

  'python-slicing-comprehensions': {
    topicId: 'python-slicing-comprehensions',
    topicName: 'Slicing & Comprehensions',
    subjectId: 'python',
    whatIsIt: 'Slicing provides an expressive syntax to extract sub-sequences from lists, tuples, and strings, while Comprehensions offer concise, idiomatic syntax to generate new collections from iterables.',
    simpleExplanation: 'Slicing is like taking a stencil with start, stop, and step notches and laying it over a paragraph to read every second word backward or forward. Comprehension is a compact, one-sentence factory conveyor belt: "Take all even numbers from this bin, square each of them, and put them in a new box."',
    technicalExplanation: 'Slice syntax: sequence[start:stop:step]. Default start is 0, default stop is len(sequence), default step is 1. If step is negative (-1), iteration moves backward from right to left, making s[::-1] the idiomatic Python idiom for reversing a sequence. Comprehensions: [expr for item in iterable if condition]. Python also supports Dictionary Comprehensions: {k_expr: v_expr for item in iterable}, and Set Comprehensions: {expr for item in iterable}. Comprehensions are implemented in C-level bytecode loops, running significantly faster than traditional for-loops appending to empty lists.',
    importantDefinitions: [
      { term: 'Slicing [start:stop:step]', definition: 'Extracts a range of elements where start is inclusive, stop is exclusive, and step determines stride and direction.' },
      { term: 'List Comprehension', definition: 'A concise mathematical expression for constructing a new list by transforming and filtering elements from an iterable.' },
    ],
    keyConcepts: [
      'Negative indexing: -1 represents the last element, -2 second to last.',
      'Reverse shortcut: seq[::-1] reverses any sliceable sequence.',
      'Slice boundaries are safe: Slices do NOT raise IndexError when out of range; they gracefully clamp to the sequence boundaries.',
      'Comprehensions vs map/filter: Comprehensions are generally preferred in modern Python for readability.',
    ],
    example: {
      type: 'code',
      title: 'Python Slicing and List/Dict Comprehensions',
      language: 'python',
      code: `# Slicing demonstrations
nums = [10, 20, 30, 40, 50, 60, 70]
print(nums[1:5])      # [20, 30, 40, 50] (index 1 up to index 4)
print(nums[::2])       # [10, 30, 50, 70] (every 2nd item)
print(nums[::-1])      # [70, 60, 50, 40, 30, 20, 10] (reversed!)

# List comprehension: Square of even numbers
evens_squared = [x**2 for x in range(1, 10) if x % 2 == 0]
print(evens_squared)   # [4, 16, 36, 64]

# Dict comprehension: Word length mapping
words = ["python", "mca", "bca", "database"]
lengths = {w: len(w) for w in words}
print(lengths)         # {'python': 6, 'mca': 3, 'bca': 3, 'database': 8}`,
      explanation: 'Illustrates step slicing, negative reversal, and filter-transform comprehensions.',
      output: `[20, 30, 40, 50]
[10, 30, 50, 70]
[70, 60, 50, 40, 30, 20, 10]
[4, 16, 36, 64]
{'python': 6, 'mca': 3, 'bca': 3, 'database': 8}`,
    },
    commonInterviewQuestions: [
      {
        question: 'What is the output of s = "Python"; print(s[1:5:2]) and print(s[::-1])?',
        answer: 'For s = "Python": 1. s[1:5:2] starts at index 1 ("y") up to index 5 ("n", excluded), stepping by 2. It picks index 1 ("y") and index 3 ("h"), producing "yh". 2. s[::-1] traverses the string with step -1 from end to beginning, producing the reversed string "nohtyP".',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming the stop index in a slice is inclusive.',
        correction: 'The stop index in Python is strictly EXCLUSIVE. nums[0:3] extracts elements at index 0, 1, and 2 (total 3 elements).',
        why: 'Exclusive upper bounds ensure len(nums[start:stop]) == stop - start.',
      },
    ],
    quickRevision: [
      'seq[start:stop:step]; stop is exclusive.',
      'seq[::-1] reverses the sequence.',
      'Slices never throw IndexError on out-of-bound indices.',
      'Comprehensions: [expression for item in iterable if condition].',
    ],
    practiceQuestions: [
      {
        id: 'py-slc-q1',
        question: 'Given lst = [1, 2, 3, 4, 5, 6], what is the result of lst[4:1:-1]?',
        options: ['[5, 4, 3]', '[5, 4, 3, 2]', '[4, 3, 2]', '[5, 4]'],
        correctOptionIndex: 0,
        explanation: 'Index 4 is 5. Step is -1, so it steps backward: index 4 (5), index 3 (4), index 2 (3). Stop index 1 is exclusive, so index 1 (2) is not included. Result: [5, 4, 3].',
      },
    ],
  },
};
