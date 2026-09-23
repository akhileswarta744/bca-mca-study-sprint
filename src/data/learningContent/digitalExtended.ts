import { TopicLearningContent } from '../../types';

export const DIGITAL_EXTENDED_CONTENT: Record<string, TopicLearningContent> = {
  'df-data-types': {
    topicId: 'df-data-types',
    topicName: 'Data Types & Number Systems',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Number Systems provide positional mathematical notations using discrete radices (bases) to represent quantities, characters, and numeric data types in digital computers.',
    simpleExplanation: 'Humans have 10 fingers, so we naturally count in Base-10 (Decimal 0 to 9). Electronic switches inside computers can only be OFF (0) or ON (1), so computers naturally count in Base-2 (Binary). To make long strings of 1s and 0s readable for computer scientists, we group them into Base-8 (Octal) or Base-16 (Hexadecimal).',
    technicalExplanation: 'A positional number system represents a number N in base r as the sum of digits multiplied by powers of the radix: N = sum(d_i * r^i). The four primary number systems in computing are: 1) Binary (base 2: digits {0, 1}), 2) Octal (base 8: digits {0..7}, each digit represents 3 binary bits), 3) Decimal (base 10: digits {0..9}), and 4) Hexadecimal (base 16: digits {0..9, A..F}, where A=10, B=11, C=12, D=13, E=14, F=15; each digit represents 4 binary bits). Data types at hardware level include unsigned integers, signed integers, BCD (Binary Coded Decimal), and ASCII/Unicode characters.',
    importantDefinitions: [
      { term: 'Radix (Base)', definition: 'The total number of unique digits or symbols available in a positional number system.' },
      { term: 'Bit (Binary Digit)', definition: 'The smallest fundamental unit of digital information, representing either a 0 or a 1.' },
      { term: 'Nibble', definition: 'A group of 4 binary bits, exactly represented by 1 hexadecimal digit.' },
      { term: 'Byte', definition: 'A group of 8 binary bits, representing numbers from 0 to 255 (unsigned) or -128 to +127 (signed).' },
      { term: 'BCD (Binary Coded Decimal)', definition: 'An encoding where each decimal digit (0-9) is individually represented by its 4-bit binary equivalent.' }
    ],
    keyConcepts: [
      'Bit grouping: 1 Octal digit = 3 bits (2^3 = 8); 1 Hexadecimal digit = 4 bits (2^4 = 16).',
      'Positional weighting: Value = d_n * r^n + ... + d_1 * r^1 + d_0 * r^0 + d_-1 * r^-1 + ...',
      'ASCII is a 7-bit character encoding (128 characters); Extended ASCII is 8-bit (256 characters).',
      'BCD invalid states: 4-bit combinations from 1010 (10) to 1111 (15) are strictly illegal in BCD.'
    ],
    example: {
      type: 'text',
      title: 'Hexadecimal to Binary to Octal Conversion',
      explanation: 'Convert Hex 2F.8 to Binary and Octal',
      code: `
Hexadecimal: 2 F . 8

Step 1: Convert each hex digit to 4-bit binary:
2 = 0010
F = 1111
8 = 1000
Binary representation: 00101111.1000_2

Step 2: Group into 3 bits (from binary point outward) for Octal:
Whole part:  000  101  111 -> 0 5 7
Fraction:    100          -> 4
Octal representation: 57.4_8
      `
    },
    commonInterviewQuestions: [
      {
        question: 'Why are hexadecimal numbers preferred over binary in low-level programming and memory dumps?',
        answer: 'Hexadecimal is vastly more compact and human-readable while maintaining a direct 1-to-1 power-of-two mapping: exactly 4 binary bits map to 1 hex digit. For example, 11111111 is concisely written as FF, reducing transcription errors.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Grouping fractional bits from right to left instead of left to right from the radix point.',
        correction: 'Integer parts are grouped leftward from the decimal point; fractional parts MUST be grouped rightward from the decimal point, padding with trailing zeroes if needed.',
        why: 'Padding trailing fractional zeroes does not alter numeric value (0.1_2 = 0.100_2), whereas padding leading fractional zeroes shifts the radix weights.'
      }
    ],
    quickRevision: [
      'Radices: Binary (2), Octal (8), Decimal (10), Hexadecimal (16).',
      '1 Hex digit = 4 bits (1 nibble); 1 Octal digit = 3 bits.',
      '1 Byte = 8 bits; Word = CPU architecture width (16, 32, or 64 bits).',
      'BCD encodes each decimal digit into 4 bits (1010 to 1111 are invalid).'
    ],
    practiceQuestions: [
      {
        id: 'df-dt-pq1',
        question: 'How many binary bits are directly represented by a single hexadecimal digit?',
        options: ['2', '3', '4', '8'],
        correctOptionIndex: 2,
        explanation: 'Because 2^4 = 16, exactly 4 binary bits correspond to 1 hexadecimal digit.'
      }
    ]
  },

  'df-complements': {
    topicId: 'df-complements',
    topicName: "1's, 2's, 9's & 10's Complements",
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Complements are mathematical systems used in digital computers to simplify arithmetic subtraction into addition and to represent signed negative numbers.',
    simpleExplanation: 'Building separate mechanical circuits for subtraction and addition is expensive and slow. Complements are a mathematical trick that lets you do subtraction using only your existing adder circuit: A - B is computed as A + (-B), where -B is represented in complement form.',
    technicalExplanation: 'For any base r number of n digits, there are two complements: 1) Radix Complement (r’s complement): r^n - N; 2) Diminished Radix Complement ((r-1)’s complement): (r^n - 1) - N. In binary (r = 2): 1’s complement is obtained by simply inverting all bits (0 -> 1, 1 -> 0); 2’s complement is obtained by taking the 1’s complement and adding 1 (2’s Comp = 1’s Comp + 1). In decimal (r = 10): 9’s complement is subtracting each digit from 9; 10’s complement is 9’s complement + 1. Subtraction with 2’s complement: Add A + 2’s complement of B. If carry is generated, discard it (result is positive); if no carry, take 2’s complement of sum and prefix a minus sign.',
    importantDefinitions: [
      { term: "1's Complement", definition: 'The diminished radix complement in binary, formed by inverting every bit (bitwise NOT).' },
      { term: "2's Complement", definition: "The radix complement in binary, formed by adding 1 to the 1's complement. Standard signed number format in modern CPUs." },
      { term: "End-Around Carry", definition: "In 1's complement subtraction, if an end carry appears from the MSB, it must be looped back and added to the LSB." },
      { term: 'Overflow', definition: 'Condition occurring when the result of adding two numbers of identical sign exceeds the representable range of the n-bit register.' }
    ],
    keyConcepts: [
      "Range of n-bit numbers: Unsigned: 0 to 2^n - 1; 2's Complement signed: -2^(n-1) to +2^(n-1) - 1.",
      "Zero representation: 1's complement has two zeroes (+0: 0000, -0: 1111); 2's complement has a UNIQUE zero (0000).",
      "Shortcut for 2's complement: Leave all bits unchanged from right to left up to and including the first '1', then invert all remaining bits to the left.",
      "Overflow rule: Adding two positives yields negative OR adding two negatives yields positive. Formula: V = C_in XOR C_out of MSB."
    ],
    example: {
      type: 'text',
      title: "Binary Subtraction Using 2's Complement",
      explanation: 'Subtract (7) - (4) in 4-bit binary: 0111 - 0100',
      code: `
A = 7  = 0111
B = 4  = 0100

Step 1: Find 2's complement of B (0100):
   1's complement of 0100 = 1011
   Add 1:                   1011 + 1 = 1100 (-4 in 2's comp)

Step 2: Add A and 2's complement of B:
     0111 (7)
   + 1100 (-4)
   -------
   1 0011

Step 3: Handle carry:
   End carry = 1 (Generated!).
   Discard end carry -> Result is positive: 0011_2 = +3!
      `
    },
    commonInterviewQuestions: [
      {
        question: "Why do modern processors use 2's complement instead of 1's complement for signed integer representation?",
        answer: "1's complement has two major flaws: 1) It has two representations for zero (+0 and -0), wasting a bit pattern and complicating equality checks. 2) Subtraction requires an extra 'end-around carry' addition cycle. 2's complement provides a single unique zero, an extra negative number (-2^(n-1)), and uses standard adder hardware without end-around carry."
      }
    ],
    commonMistakes: [
      {
        mistake: "Adding end-around carry in 2's complement subtraction.",
        correction: "In 2's complement subtraction, discard the end carry; in 1's complement subtraction, add the end carry to the LSB.",
        why: "2's complement incorporates the +1 offset mathematically in advance."
      }
    ],
    quickRevision: [
      "2's Complement = 1's Complement + 1.",
      "Range of n-bit 2's complement: -2^(n-1) to +2^(n-1) - 1.",
      "Unique zero representation in 2's complement (no -0).",
      "Overflow occurs iff carry into MSB != carry out of MSB."
    ],
    practiceQuestions: [
      {
        id: 'df-comp-pq1',
        question: "What is the 8-bit 2's complement representation of decimal -18?",
        options: ['11101110', '11101101', '10010010', '00010010'],
        correctOptionIndex: 0,
        explanation: '+18 in 8-bit binary is 00010010. 1\'s complement is 11101101. Add 1 -> 11101110.'
      }
    ]
  },

  'df-error-codes': {
    topicId: 'df-error-codes',
    topicName: 'Error Detection & Correction Codes (Parity, Hamming)',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Error detection and correction codes append redundant bits to digital data to detect and correct bit flips caused by electrical noise, transmission channels, or cosmic rays.',
    simpleExplanation: 'Imagine sending an important letter. If you add a checksum number at the bottom saying "Total letters in this word is 5", the receiver can easily spot if a letter vanished (Error Detection). If you send enough extra structured clues, the receiver can not only spot which letter is wrong, but automatically fix it without asking you to resend (Error Correction).',
    technicalExplanation: '1) Parity Bit: Appends 1 bit to ensure the total number of 1s in the codeword is either always even (Even Parity) or always odd (Odd Parity). Can detect any odd number of bit errors (single bit flip), but CANNOT correct errors or detect even numbers of errors (e.g., 2 flipped bits). 2) Hamming Code: A linear error-correcting code developed by Richard Hamming. Redundant parity bits (r) are placed at bit positions that are powers of 2 (1, 2, 4, 8, ...). For m data bits, the number of parity bits r must satisfy the Hamming Rule: 2^r >= m + r + 1. 3) Hamming Distance (d): The number of bit positions in which two codewords differ. To detect up to d errors, minimum distance must be d + 1. To correct up to t errors, minimum distance must be 2t + 1.',
    importantDefinitions: [
      { term: 'Hamming Distance', definition: 'The number of corresponding bit positions where two binary codewords of equal length differ (computed via XOR).' },
      { term: 'Hamming Rule', definition: 'The fundamental inequality 2^r >= m + r + 1 determining the minimum number of parity bits r needed for m data bits.' },
      { term: 'Parity Bit', definition: 'A redundant bit added to a binary code vector to make the total number of 1-bits either even or odd.' },
      { term: 'Syndrome Word', definition: 'The binary vector formed by evaluating all parity equations; if syndrome is non-zero, its integer value indicates the exact erroneous bit position.' }
    ],
    keyConcepts: [
      'Minimum Hamming Distance Theorems: To detect e errors: d_min >= e + 1; To correct t errors: d_min >= 2t + 1.',
      'Parity bit positions in Hamming code: Indices 1, 2, 4, 8, 16, 2^k.',
      'Even parity equation: p_k is set such that XOR of all bits it monitors equals 0.',
      'Single-Error Correcting, Double-Error Detecting (SECDED): Adds an overall parity bit to standard Hamming code.'
    ],
    example: {
      type: 'text',
      title: 'Hamming (7, 4) Code Layout',
      explanation: 'Transmitting 4 data bits (D7, D6, D5, D3) with 3 parity bits (P4, P2, P1)',
      code: `
Bit Positions:  7    6    5    4    3    2    1
Bit Identity:  D7   D6   D5   P4   D3   P2   P1

Parity Bit Responsibilities (Binary position breakdown):
P1 (pos 1 = 001_2): monitors bits with LSB 1 -> pos 1, 3, 5, 7  (P1, D3, D5, D7)
P2 (pos 2 = 010_2): monitors bits with 2nd bit 1 -> pos 2, 3, 6, 7 (P2, D3, D6, D7)
P4 (pos 4 = 100_2): monitors bits with 3rd bit 1 -> pos 4, 5, 6, 7 (P4, D5, D6, D7)

Receiver checks syndrome: S = (S4 S2 S1)_2
If S = 000 -> No error.
If S = 110 (decimal 6) -> Bit 6 is inverted! Invert bit 6 to correct it!
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What is the minimum Hamming distance required to detect 3-bit errors and correct 1-bit errors?',
        answer: 'To detect e errors: d_min >= e + 1 = 3 + 1 = 4. To correct t errors: d_min >= 2t + 1 = 2(1) + 1 = 3. To satisfy both conditions simultaneously, the minimum Hamming distance required is d_min = 4.'
      },
      {
        question: 'How many parity bits are required to transmit 8 data bits using a single-error-correcting Hamming code?',
        answer: 'Use the Hamming rule: 2^r >= m + r + 1 with m = 8.\nFor r = 3: 2^3 = 8 >= 8 + 3 + 1 = 12 (False).\nFor r = 4: 2^4 = 16 >= 8 + 4 + 1 = 13 (True!).\nTherefore, exactly 4 parity bits are required, creating a 12-bit codeword (Hamming 12, 8).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming standard parity can correct single-bit errors.',
        correction: 'A single parity bit can only DETECT an odd number of errors; it cannot locate where the error occurred, so it cannot correct it.',
        why: 'Locating the flipped bit requires log2(N) bits of syndrome information.'
      }
    ],
    quickRevision: [
      'Parity bit: Detects 1-bit flip, cannot correct.',
      'Hamming rule: 2^r >= m + r + 1.',
      'Hamming distance: Detects d_min - 1 errors; Corrects (d_min - 1) / 2 errors.',
      'Syndrome value directly points to the erroneous bit index.'
    ],
    practiceQuestions: [
      {
        id: 'df-ec-pq1',
        question: 'To correct up to 2-bit errors in a communication channel, what is the minimum Hamming distance required between codewords?',
        options: ['2', '3', '4', '5'],
        correctOptionIndex: 3,
        explanation: 'Formula for error correction: d_min >= 2t + 1. For t = 2 errors: d_min >= 2(2) + 1 = 5.'
      }
    ]
  },

  'df-computer-arithmetic': {
    topicId: 'df-computer-arithmetic',
    topicName: 'Computer Arithmetic & Booths Algorithm',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Computer Arithmetic comprises hardware algorithms executed by the ALU for binary multiplication and division, most notably Booth’s Multiplication Algorithm for signed numbers in 2’s complement.',
    simpleExplanation: 'Multiplying large binary numbers with paper-and-pencil involves multiplying by every single 1 and adding rows of partial products. If you have a long run of 1s (like 0111110), Booth’s algorithm realizes that adding seven times is equivalent to simply doing (Add 1 at the end and Subtract 1 at the beginning), drastically cutting down computation steps.',
    technicalExplanation: 'Booth’s Algorithm multiplies two signed binary integers in 2’s complement representation by examining pairs of adjacent multiplier bits (Q_0 and Q_-1). In each cycle: 1) If Q_0 Q_-1 = 10, A = A - M (subtract multiplicand); 2) If Q_0 Q_-1 = 01, A = A + M (add multiplicand); 3) If Q_0 Q_-1 = 00 or 11, do nothing (no arithmetic operation). Then, perform an Arithmetic Right Shift (ARS) on the combined register [A, Q, Q_-1], preserving the sign bit of A. Repeat for n cycles (where n is the bit width of the multiplier).',
    importantDefinitions: [
      { term: "Booth's Algorithm", definition: "A hardware algorithm that multiplies two signed 2's complement integers using recoding of multiplier bit transitions." },
      { term: 'Arithmetic Right Shift (ARS)', definition: 'A shift operation where all bits shift right by 1, and the MSB (sign bit) retains its original value to preserve sign.' },
      { term: 'Restoring Division', definition: 'A binary division algorithm that subtracts the divisor from the partial remainder and adds it back (restores) if the difference is negative.' },
      { term: 'Non-Restoring Division', definition: 'A division algorithm avoiding the restore addition cycle by adding or subtracting in subsequent steps based on the remainder sign.' }
    ],
    keyConcepts: [
      'Booth’s recoding principle: Replaces runs of consecutive 1s with an addition at the lowest-order bit and a subtraction at the highest-order bit.',
      'Best Case for Booth’s: Long runs of 1s or 0s (e.g., 00011110 has only two operations: subtract and add).',
      'Worst Case for Booth’s: Alternating 01010101 (requires addition or subtraction in every single step).',
      'Register Setup: Accumulator A initialized to 0, Q stores multiplier, Q_-1 initialized to 0, M stores multiplicand.'
    ],
    example: {
      type: 'text',
      title: "Booth's Algorithm Step Table",
      explanation: 'Multiply M = +3 (0011) by Q = -4 (1100)',
      code: `
M = 0011 (+3), -M = 1101 (-3)
Q = 1100 (-4), Q_-1 = 0, A = 0000. Count = 4.

Step 1: Q_0 Q_-1 = 00 -> No op.
        ARS [A, Q, Q_-1] -> A = 0000, Q = 0110, Q_-1 = 0. Count = 3.

Step 2: Q_0 Q_-1 = 00 -> No op.
        ARS [A, Q, Q_-1] -> A = 0000, Q = 0011, Q_-1 = 0. Count = 2.

Step 3: Q_0 Q_-1 = 10 -> A = A - M = 0000 + 1101 = 1101.
        ARS [A, Q, Q_-1] -> A = 1110, Q = 1001, Q_-1 = 1. Count = 1.

Step 4: Q_0 Q_-1 = 11 -> No op.
        ARS [A, Q, Q_-1] -> A = 1111, Q = 0100, Q_-1 = 1. Count = 0.

Final Result [A, Q]: 1111 0100 (in 8-bit 2's complement).
Value: -128 + 64 + 32 + 16 + 4 = -12. (Correct! 3 * -4 = -12)
      `
    },
    commonInterviewQuestions: [
      {
        question: "When does Booth's algorithm achieve its worst-case performance?",
        answer: 'Booth’s algorithm performs worst when the multiplier consists of alternating 0s and 1s (such as 01010101 or 10101010). In this case, an arithmetic addition or subtraction must be performed in every single clock cycle, maximizing execution latency.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using logical right shift instead of arithmetic right shift during Booth’s algorithm.',
        correction: 'Always perform an ARITHMETIC right shift (ARS), copying the sign bit (MSB of A).',
        why: 'Logical right shift inserts 0 into the MSB, which corrupts negative numbers in 2’s complement.'
      }
    ],
    quickRevision: [
      '10 -> Subtract M (A = A - M).',
      '01 -> Add M (A = A + M).',
      '00 or 11 -> No arithmetic operation.',
      'Shift: Always Arithmetic Right Shift (preserves sign bit).',
      'Fast for blocks of 1s; worst case for alternating 01010101.'
    ],
    practiceQuestions: [
      {
        id: 'df-arith-pq1',
        question: "In Booth's multiplication algorithm, what action is taken when the current bits (Q_0, Q_-1) are (0, 1)?",
        options: ['Subtract multiplicand M from A and shift', 'Add multiplicand M to A and shift', 'Multiply A by M', 'No arithmetic operation, shift only'],
        correctOptionIndex: 1,
        explanation: "When transition is (0, 1), the algorithm performs A = A + M followed by Arithmetic Right Shift."
      }
    ]
  },

  'df-boolean-algebra': {
    topicId: 'df-boolean-algebra',
    topicName: 'Boolean Algebra Laws & De Morgans Theorems',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Boolean Algebra is a branch of mathematical logic operating on two-valued truth variables ({0, 1}), governing algebraic simplification of digital circuits via axiomatic laws and De Morgan’s theorems.',
    simpleExplanation: 'Simplifying a digital circuit using Boolean algebra is like simplifying a fraction in math. Fewer components in an equation mean fewer physical microchips, less battery power consumed, and faster clock speeds for your computer.',
    technicalExplanation: 'Boolean algebra evaluates expressions using three primary operations: AND (conjunction: A . B), OR (disjunction: A + B), and NOT (negation: A’). Fundamental Laws: 1) Identity: A + 0 = A, A . 1 = A; 2) Null/Dominance: A + 1 = 1, A . 0 = 0; 3) Idempotent: A + A = A, A . A = A; 4) Complementarity: A + A’ = 1, A . A’ = 0; 5) Involution: (A’)’ = A; 6) Distributive: A + BC = (A + B)(A + C); 7) Consensus Theorem: AB + A’C + BC = AB + A’C; 8) De Morgan’s Laws: (A + B)’ = A’ . B’ and (A . B)’ = A’ + B’. Principle of Duality: Any valid Boolean relation remains valid if AND and OR operators are interchanged, and 0 and 1 are interchanged.',
    importantDefinitions: [
      { term: "De Morgan's First Law", definition: 'The complement of a sum is equal to the product of the complements: (A + B)’ = A’ . B’.' },
      { term: "De Morgan's Second Law", definition: 'The complement of a product is equal to the sum of the complements: (A . B)’ = A’ + B’.' },
      { term: 'Principle of Duality', definition: 'A Boolean identity remains true if operators AND and OR are swapped and identity elements 0 and 1 are swapped.' },
      { term: 'Consensus Theorem', definition: 'In the expression AB + A’C + BC, the term BC is redundant and can be eliminated: AB + A’C + BC = AB + A’C.' }
    ],
    keyConcepts: [
      'Second Distributive Law (extremely useful): A + BC = (A + B)(A + C).',
      'Absorption Laws: A + AB = A; A(A + B) = A; A + A’B = A + B.',
      'Consensus Theorem identification: Look for three variables (A, B, C) where one appears complemented (A and A’); the term without A (BC) is redundant.',
      'SOP vs POS: Sum of Products (OR of AND terms) vs Product of Sums (AND of OR terms).'
    ],
    example: {
      type: 'text',
      title: 'Boolean Expression Minimization Using Consensus & Distributive Laws',
      explanation: 'Simplify: F = AB + A’C + BC',
      code: `
Original Expression: F = AB + A'C + BC

Step 1: Multiply redundant term BC by (A + A'):
   F = AB + A'C + BC(A + A')
   F = AB + A'C + ABC + A'BC

Step 2: Factor common terms:
   F = AB(1 + C) + A'C(1 + B)

Step 3: Apply Null Law (1 + X = 1):
   F = AB(1) + A'C(1)
   F = AB + A'C  (Simplified! BC is completely eliminated)
      `
    },
    commonInterviewQuestions: [
      {
        question: 'State the dual of the Boolean expression: A + A’B = A + B',
        answer: 'To find the dual, swap OR (+) with AND (.) and swap 1 with 0:\nOriginal: A + A’B = A + B\nDual: A . (A’ + B) = A . B'
      },
      {
        question: 'What is the Consensus Theorem and how is it used to simplify logic?',
        answer: 'The Consensus Theorem states that for three variables, AB + A’C + BC = AB + A’C. It eliminates the redundant term BC because whenever BC is true, either B is true while A is true (making AB true) or C is true while A is false (making A’C true), rendering BC logically superfluous.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Confusing the Complement of an expression with the Dual of an expression.',
        correction: 'Dual swaps operators (+ and .) and constants (0 and 1) but keeps variables unchanged. Complement negates every individual variable as well.',
        why: 'Dual of A + B is A . B; Complement of A + B is A’ . B’.'
      }
    ],
    quickRevision: [
      '(A + B)’ = A’B’; (AB)’ = A’ + B’ (De Morgan).',
      'A + BC = (A + B)(A + C) (Distributive law).',
      'AB + A’C + BC = AB + A’C (Consensus).',
      'A + A’B = A + B (Absorption).'
    ],
    practiceQuestions: [
      {
        id: 'df-bool-pq1',
        question: 'What is the simplified form of the Boolean expression: A + A’B ?',
        options: ['A', 'B', 'A + B', 'AB'],
        correctOptionIndex: 2,
        explanation: 'Using distributive law: A + A’B = (A + A’)(A + B) = (1)(A + B) = A + B.'
      }
    ]
  },

  'df-combinational': {
    topicId: 'df-combinational',
    topicName: 'Combinational Circuits: Adders & Subtractors',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Combinational logic circuits are time-independent digital circuits whose output at any instant depends strictly on the current combination of inputs, with zero memory elements or feedback loops.',
    simpleExplanation: 'A combinational circuit is like a simple calculator: you press 5 + 3, and it instantly shows 8. It has no memory of what you calculated yesterday or 5 seconds ago—the output is purely determined by whatever voltage is present right now on the input pins.',
    technicalExplanation: 'The primary combinational arithmetic building blocks are: 1) Half Adder: Adds 2 single-bit inputs (A, B). Sum S = A XOR B; Carry C = A AND B. 2) Full Adder: Adds 3 single-bit inputs (A, B, and Cin). Sum S = A XOR B XOR Cin; Carry Cout = AB + Cin(A XOR B). A Full Adder can be constructed using two Half Adders and one OR gate. 3) Ripple Carry Adder (RCA): Chains n Full Adders in series; propagation delay is O(n) as carry ripples through all stages. 4) Carry Lookahead Adder (CLA): Eliminates carry ripple delay by generating carry signals in parallel using Carry Generate (G_i = A_i B_i) and Carry Propagate (P_i = A_i XOR B_i).',
    importantDefinitions: [
      { term: 'Half Adder', definition: 'A combinational circuit that adds two 1-bit binary digits, producing Sum = A XOR B and Carry = AB.' },
      { term: 'Full Adder', definition: 'A combinational circuit that adds three 1-bit binary digits (two operands and one carry-in), producing Sum and Carry-out.' },
      { term: 'Ripple Carry Adder', definition: 'An n-bit parallel adder where the carry output of each full adder is connected to the carry input of the next stage.' },
      { term: 'Carry Lookahead Adder (CLA)', definition: 'A high-speed parallel adder calculating carry bits ahead of time using Generate and Propagate logic, achieving O(1) delay.' }
    ],
    keyConcepts: [
      'Half Adder equations: S = A XOR B, C = A . B. (Requires 5 NAND gates).',
      'Full Adder equations: S = A XOR B XOR Cin, Cout = AB + BCin + ACin. (Requires 2 Half Adders + 1 OR gate, or 9 NAND gates).',
      'Subtractor equivalence: Half Subtractor: Difference D = A XOR B, Borrow = A’B.',
      'Full Subtractor: Difference D = A XOR B XOR Bin, Borrow = A’B + Bin(A XOR B)’.'
    ],
    example: {
      type: 'diagram',
      title: 'Full Adder Constructed from Two Half Adders',
      explanation: 'Standard block diagram of a Full Adder',
      diagramAscii: `
  A ----+
        |
        +--[ HA 1 ]-- Sum1 ---+
        |                     |
  B ----+                     +--[ HA 2 ]------ SUM = A ^ B ^ Cin
                              |
  Cin ------------------------+
                Carry1 ----+
                           |
                           +---[ OR Gate ]----- C_OUT = AB + Cin(A ^ B)
                           |
                Carry2 ----+
      `
    },
    commonInterviewQuestions: [
      {
        question: 'How many 2-input NAND gates are required to construct a Half Adder and a Full Adder?',
        answer: 'A Half Adder requires exactly 5 NAND gates (4 for XOR, 1 for AND). A Full Adder requires exactly 9 NAND gates.'
      },
      {
        question: 'Why is a Carry Lookahead Adder (CLA) faster than a Ripple Carry Adder (RCA)?',
        answer: 'In an RCA, each adder must wait for the carry to ripple sequentially from the previous adder stage, creating a propagation delay proportional to N (O(N)). In a CLA, carry bits are generated in parallel using boolean logic (Generate Gi = AiBi, Propagate Pi = Ai XOR Bi), making carry calculation independent of N (O(1) gate delays).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Writing the Full Adder carry equation as Cout = AB + Cin.',
        correction: 'The correct Cout expression is Cout = AB + Cin(A XOR B) or Cout = AB + BCin + ACin.',
        why: 'Carry occurs if ANY two or more of the three inputs (A, B, Cin) are 1.'
      }
    ],
    quickRevision: [
      'Half Adder: S = A ^ B, C = AB (5 NAND gates).',
      'Full Adder: S = A ^ B ^ Cin, Cout = AB + Cin(A ^ B).',
      'Full Adder = 2 Half Adders + 1 OR gate.',
      'Carry Lookahead Adder resolves RCA carry ripple delay.'
    ],
    practiceQuestions: [
      {
        id: 'df-comb-pq1',
        question: 'How many Half Adders and OR gates are needed to construct a 1-bit Full Adder?',
        options: ['1 Half Adder and 2 OR gates', '2 Half Adders and 1 OR gate', '3 Half Adders and 0 OR gates', '2 Half Adders and 2 OR gates'],
        correctOptionIndex: 1,
        explanation: 'A 1-bit Full Adder is constructed using exactly 2 Half Adders and 1 OR gate to combine the carry outputs.'
      }
    ]
  },

  'df-decoders-mux': {
    topicId: 'df-decoders-mux',
    topicName: 'Decoders, Encoders, Multiplexers (MUX) & Demux',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Decoders, Encoders, Multiplexers, and Demultiplexers are MSI (Medium Scale Integration) combinational routing circuits used for data selection, address decoding, and universal boolean function implementation.',
    simpleExplanation: 'A Multiplexer (MUX) is like a railroad track switcher: multiple train tracks merge into one, and a control lever (select lines) decides which single train gets onto the main track. A Demultiplexer does the reverse. A Decoder is like a hotel room card scanner: you input a 3-digit room number, and it unlocks that one specific door out of 8.',
    technicalExplanation: '1) Multiplexer (MUX / Data Selector): Has 2^n data input lines, n select lines, and 1 output line. Boolean equation for 2-to-1 MUX: Y = S’I0 + SI1. 4-to-1 MUX: Y = S1’S0’I0 + S1’S0 I1 + S1 S0’I2 + S1 S0 I3. Any boolean function of n variables can be implemented directly using a 2^(n-1)-to-1 MUX. 2) Demultiplexer (DEMUX): Has 1 input, n select lines, and 2^n output lines. 3) Decoder: Has n inputs and 2^n outputs; activates the specific output line corresponding to the binary value of the inputs (acts as a minterm generator). 4) Encoder: Has 2^n inputs and n outputs (reverse of decoder); Priority Encoders resolve multiple active inputs by encoding only the highest-priority input.',
    importantDefinitions: [
      { term: 'Multiplexer (MUX)', definition: 'A combinational circuit that selects binary information from one of 2^n input lines and directs it to a single output line based on n select lines.' },
      { term: 'Demultiplexer (DEMUX)', definition: 'A circuit that receives information on a single line and transmits it on one of 2^n possible output lines.' },
      { term: 'Decoder', definition: 'A combinational circuit that converts binary information from n input lines to a maximum of 2^n unique output lines.' },
      { term: 'Priority Encoder', definition: 'An encoder circuit where if two or more inputs are active simultaneously, the output code corresponds to the input with the highest designated priority.' }
    ],
    keyConcepts: [
      'Relationship: A Decoder with an Enable input functions identically to a Demultiplexer (Enable = Data input).',
      'Universal Function Implementation: A 2^n-to-1 MUX can implement any n-variable boolean function with NO external gates.',
      'Using (n-1) select lines: A 2^(n-1)-to-1 MUX can implement any n-variable function by connecting the remaining variable (or its complement, 0, or 1) to data inputs.',
      'Active-Low vs Active-High: Decoders frequently use active-low outputs with an active-low enable input (e.g., 74LS138).'
    ],
    example: {
      type: 'text',
      title: 'Implementing XOR Gate Using 2-to-1 Multiplexer',
      explanation: 'XOR truth table: A ^ B. Using B as select line S.',
      code: `
Truth Table:
A  B | Y
0  0 | 0  (When B=0, Y = A)
0  1 | 1  (When B=1, Y = A')
1  0 | 1  (When B=0, Y = A)
1  1 | 0  (When B=1, Y = A')

2-to-1 MUX:
Select line: S = B
Input I_0 = A
Input I_1 = A'

Output: Y = S' I_0 + S I_1 = B' A + B A' = A XOR B!
      `
    },
    commonInterviewQuestions: [
      {
        question: 'How can you implement any 3-variable Boolean function using a 4-to-1 Multiplexer?',
        answer: 'Assign two variables (e.g., A and B) to the two select lines (S1, S0). For each of the 4 combinations of AB, determine the value of the output function in terms of the third variable C (it will be 0, 1, C, or C’). Connect these four expressions to the corresponding data inputs I0, I1, I2, I3.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Confusing the number of select lines: thinking 8-to-1 MUX has 8 select lines.',
        correction: 'A 2^n-to-1 MUX has 2^n data lines and only n select lines.',
        why: '8 = 2^3, so an 8-to-1 MUX requires exactly 3 select lines.'
      }
    ],
    quickRevision: [
      'MUX: 2^n inputs, n select lines, 1 output.',
      'DEMUX: 1 input, n select lines, 2^n outputs.',
      'Decoder + Enable = Demultiplexer.',
      '2^n-to-1 MUX implements any n-variable logic function.'
    ],
    practiceQuestions: [
      {
        id: 'df-mux-pq1',
        question: 'How many select lines are required for a 16-to-1 Multiplexer?',
        options: ['2', '4', '8', '16'],
        correctOptionIndex: 1,
        explanation: 'For a MUX with 2^n inputs, n select lines are required. Since 16 = 2^4, exactly 4 select lines are needed.'
      }
    ]
  },

  'df-registers-counters': {
    topicId: 'df-registers-counters',
    topicName: 'Registers & Counters (Synchronous vs Asynchronous)',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Registers and Counters are sequential circuits built from cascaded flip-flops: Registers store multi-bit binary words, and Counters step through a predetermined sequence of binary states on clock transitions.',
    simpleExplanation: 'A Register is like a row of light switches that remember their positions. A Counter is like a digital pedometer: every time you take a step (clock pulse), it ticks up by one (0, 1, 2, 3...). In a Synchronous counter, all digits flip together instantly; in a Ripple counter, each digit waits for the previous one to knock it over like falling dominoes.',
    technicalExplanation: 'Shift Registers transfer binary data serially or in parallel across 4 configurations: 1) SISO (Serial-In Serial-Out: takes N clock cycles to load and N to retrieve), 2) SIPO (Serial-In Parallel-Out), 3) PISO (Parallel-In Serial-Out), and 4) PIPO (Parallel-In Parallel-Out: fastest, takes 1 clock cycle to load/retrieve). Counters: 1) Asynchronous (Ripple) Counter: Clock input is applied only to the first flip-flop; each subsequent flip-flop is clocked by the output of the preceding one. Suffers from cumulative propagation delay (t_delay = n * t_pd). 2) Synchronous Counter: Clock input is connected simultaneously in parallel to all flip-flops, eliminating ripple delay. 3) Ring Counter: Circulates a single 1 through n flip-flops (MOD-n states); 4) Johnson (Twisted Ring) Counter: Inverted output of last flip-flop feeds back to first (MOD-2n states).',
    importantDefinitions: [
      { term: 'Shift Register', definition: 'A cascade of flip-flops sharing a clock that moves binary data one position to the left or right per clock pulse.' },
      { term: 'Ripple (Asynchronous) Counter', definition: 'A counter where each flip-flop is triggered by the transition of the previous flip-flop rather than a common clock.' },
      { term: 'Synchronous Counter', definition: 'A counter where all flip-flops are triggered simultaneously by a common external clock pulse.' },
      { term: 'MOD-N Counter', definition: 'A counter that cycles through N distinct binary states (0 to N - 1) before repeating its sequence.' },
      { term: 'Johnson Counter', definition: 'An n-stage shift register with inverted feedback having 2n distinct states without requiring decode logic.' }
    ],
    keyConcepts: [
      'Number of flip-flops required: An n flip-flop counter has 2^n possible states (MOD-2^n). To count up to decimal N, 2^n >= N.',
      'Frequency Division: A single T or toggle JK flip-flop divides input clock frequency by 2 (f_out = f_in / 2). An n-stage counter divides by 2^n.',
      'Ring Counter vs Johnson Counter: An n-flip-flop Ring counter has n states; an n-flip-flop Johnson counter has 2n states.',
      'Ripple Counter Delay limitation: For proper operation, Clock Period T_clk >= n * t_pd, limiting maximum operating frequency.'
    ],
    example: {
      type: 'text',
      title: 'MOD-10 (Decade) Ripple Counter Operation',
      explanation: 'Uses 4 flip-flops (2^4 = 16 states) with a NAND reset gate at state 10 (1010_2)',
      code: `
Flip-flops: Q3, Q2, Q1, Q0.
Counts: 0000 (0) -> 0001 (1) -> ... -> 1001 (9)
When count hits 1010 (10):
- Connect Q3 and Q1 to inputs of a 2-input NAND gate.
- Connect output of NAND gate to active-low CLEAR pins of all flip-flops.
- At 1010, NAND outputs 0 -> instantly resets all flip-flops to 0000!
- States: 10 distinct states (0 to 9), MOD-10 decade counter.
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What is the fundamental operational difference between synchronous and asynchronous counters?',
        answer: 'In an asynchronous (ripple) counter, the external clock triggers only the first flip-flop; subsequent flip-flops are triggered by the outputs of preceding stages, causing cumulative propagation delay that limits speed. In a synchronous counter, the clock is connected to every flip-flop simultaneously in parallel, so all flip-flops toggle at the exact same instant.'
      },
      {
        question: 'How many states does a 4-bit Ring counter have versus a 4-bit Johnson counter?',
        answer: 'A 4-bit Ring counter has n = 4 states (1000 -> 0100 -> 0010 -> 0001). A 4-bit Johnson (twisted-ring) counter has 2n = 2 * 4 = 8 states.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming a 4-bit counter can count up to decimal 16.',
        correction: 'A 4-bit binary counter has 16 states, but counts from 0 to 15.',
        why: 'Zero is the first state, so the maximum number representable is 2^n - 1 = 15.'
      }
    ],
    quickRevision: [
      'PIPO is fastest shift register (1 clock cycle).',
      'Asynchronous: Ripple delay accumulates (n * t_pd).',
      'Synchronous: All flip-flops clocked simultaneously.',
      'Flip-flop frequency divider: f_out = f_in / 2.',
      'Ring Counter: n states; Johnson Counter: 2n states.'
    ],
    practiceQuestions: [
      {
        id: 'df-reg-pq1',
        question: 'How many flip-flops are required to design a MOD-12 counter?',
        options: ['3', '4', '6', '12'],
        correctOptionIndex: 1,
        explanation: 'We need 2^n >= 12. For n = 3, 2^3 = 8 (insufficient). For n = 4, 2^4 = 16 >= 12. Therefore, 4 flip-flops are required.'
      }
    ]
  },

  'df-memory-unit': {
    topicId: 'df-memory-unit',
    topicName: 'Memory Units (RAM, ROM, SRAM, DRAM)',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Memory Units are arrays of semiconductor storage cells organized into addressable words, categorized into volatile Random Access Memory (SRAM, DRAM) and non-volatile Read-Only Memory (ROM, PROM, EPROM, Flash).',
    simpleExplanation: 'RAM is the computer’s short-term desk space: fast and large, but everything disappears when you turn off the lights (power loss). SRAM is a super-fast luxury notepad (cache), DRAM is a budget paper notebook that fades unless you keep tracing over it (refresh cycles), and ROM is a stone tablet etched with permanent startup instructions.',
    technicalExplanation: 'Memory is structured as 2^k words of m bits each, requiring k address lines and m data lines. 1) SRAM (Static RAM): Each cell uses a 6-transistor (6T) flip-flop circuit; retains data as long as power is applied; very fast access (~1-10 ns), used in CPU L1/L2/L3 cache; expensive and lower density. 2) DRAM (Dynamic RAM): Each cell uses 1 transistor and 1 capacitor (1T-1C); stores charge in capacitor; leaks charge over time and requires periodic refresh cycles (~every 64ms); higher density and lower cost, used in main system RAM. 3) ROM: Mask ROM (hardwired), PROM (fuse-blown once), EPROM (erased via ultraviolet light), EEPROM (erased electrically byte-by-byte), Flash Memory (erased electrically block-by-block, used in SSDs and USB drives).',
    importantDefinitions: [
      { term: 'Static RAM (SRAM)', definition: 'Volatile semiconductor memory using flip-flops (typically 6 transistors) per cell with no refresh cycle required.' },
      { term: 'Dynamic RAM (DRAM)', definition: 'Volatile memory storing each bit in a capacitor and single transistor, requiring continuous periodic refresh cycles.' },
      { term: 'Refresh Cycle', definition: 'The periodic reading and rewriting of charge in DRAM storage capacitors before leakage leads to data corruption.' },
      { term: 'Flash Memory', definition: 'A non-volatile storage medium based on floating-gate transistors, erasable and reprogrammable in blocks.' }
    ],
    keyConcepts: [
      'Address line formula: A memory of capacity 2^k x m bits requires k address lines and m data lines.',
      'SRAM vs DRAM: SRAM is faster and cache-oriented (6T); DRAM is dense, cheap, and capacitor-based (1T-1C).',
      'Memory expansion: Horizontal expansion increases word size (data lines); Vertical expansion increases capacity (address lines via decoder).',
      'ROM types: PROM (one-time programmable), EPROM (UV light erase), EEPROM (byte-level electric erase), Flash (block-level erase).'
    ],
    example: {
      type: 'text',
      title: 'Memory Capacity & Address Line Calculation',
      explanation: 'Calculate address lines and total bits for a 4K x 16 memory unit',
      code: `
Capacity: 4K words of 16 bits each.

1. Word count: 4K = 4 * 1024 = 4096 words.
2. Address lines needed:
   4096 = 2^12 -> Exactly 12 address lines (A0 to A11).
3. Data lines:
   Each word is 16 bits -> Exactly 16 data lines (D0 to D15).
4. Total storage capacity:
   4096 * 16 = 65,536 bits = 64 Kilobits = 8 Kilobytes.
      `
    },
    commonInterviewQuestions: [
      {
        question: 'Why does DRAM require periodic refreshing while SRAM does not?',
        answer: 'DRAM stores each binary bit as an electrical charge across a microscopic capacitor. Because real capacitors leak charge over time, the charge must be periodically read and rewritten (refreshed) every few milliseconds. SRAM stores bits using cross-coupled inverter flip-flop latches, which maintain state continuously as long as power is supplied without charge loss.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming 1K in digital memory is equal to 1,000.',
        correction: 'In computer memory, 1K = 2^10 = 1024 words.',
        why: 'Digital addressing relies on binary powers of 2.'
      }
    ],
    quickRevision: [
      'Capacity: 2^k words requires k address lines.',
      'SRAM: 6T flip-flop, fast, cache, no refresh.',
      'DRAM: 1T-1C, capacitor, dense, main memory, needs refresh.',
      'Flash: Non-volatile, block-erasable, SSDs.'
    ],
    practiceQuestions: [
      {
        id: 'df-mem-pq1',
        question: 'How many address lines are required to uniquely address a memory chip with a capacity of 64K words?',
        options: ['8', '14', '16', '64'],
        correctOptionIndex: 2,
        explanation: '64K = 64 * 1024 = 65,536 = 2^16. Therefore, 16 address lines are required.'
      }
    ]
  }
};
