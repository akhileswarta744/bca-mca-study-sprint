import { TopicLearningContent } from '../../types';

export const DIGITAL_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  'df-conversions': {
    topicId: 'df-conversions',
    topicName: 'Number System Conversions & Complements',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Number system conversions form the mathematical basis of digital computers, converting numerical quantities across positional base-r notations (Binary base 2, Octal base 8, Decimal base 10, Hexadecimal base 16) and calculating complements for signed subtraction.',
    simpleExplanation: 'Just as you can write the number 12 as "twelve" (English), "XII" (Roman), or "1100" (binary), digital computers represent the exact same mathematical value in different radix systems. 1s and 2s complements allow the computer to perform subtraction using simple addition hardware.',
    technicalExplanation: "A number in base r has value: Sum(d_i * r^i). Conversions from base 10 use successive division by radix r for integers and successive multiplication by r for fractions. Direct conversion between Binary and Octal groups 3 bits (2^3 = 8); Binary and Hexadecimal groups 4 bits (2^4 = 16). Complements: For base r, (r-1)'s complement = (r^n - 1) - N (obtained by subtracting each digit from r-1; in binary, flip all 0s to 1s and 1s to 0s). r's complement = (r-1)'s complement + 1 (in binary, 2's complement = 1's complement + 1). In 2's complement arithmetic, subtraction A - B is computed as A + (2's complement of B). If an end-around carry occurs, it is simply discarded.",
    importantDefinitions: [
      { term: "Radix / Base (r)", definition: 'The total number of unique digit symbols used in a positional number system (e.g. 2 for binary, 16 for hexadecimal).' },
      { term: "2's Complement", definition: "Representation obtained by adding 1 to the 1's complement of a binary number. The standard hardware format for signed integer arithmetic." },
      { term: 'Overflow', definition: 'Occurs when the result of adding two numbers with the same sign exceeds the maximum representable magnitude, causing an incorrect sign bit.' },
    ],
    keyConcepts: [
      'Hex to Binary: Group 4 bits: e.g. 0xA5 = 1010 0101_2.',
      'Octal to Binary: Group 3 bits: e.g. 073 = 111 011_2.',
      "1's complement: Bitwise NOT (invert every bit).",
      "2's complement: Bitwise NOT + 1. (Shortcut: Copy bits from right to left until first '1' is encountered, copy that '1', then invert all remaining bits to the left).",
      "Range of n-bit signed 2's complement numbers: -2^(n-1) to +(2^(n-1) - 1). For 8 bits: -128 to +127.",
    ],
    example: {
      type: 'text',
      title: "Binary Subtraction using 2's Complement",
      explanation: 'Compute 25 - 14 using 8-bit 2s complement arithmetic.',
      output: `Convert to 8-bit binary:
+25 = 0001 1001
+14 = 0000 1110

Step 1: Find 2's complement of 14 (-14):
1's complement of 14 = 1111 0001
Add 1               = 1111 0010 (-14)

Step 2: Add (+25) and (-14):
   0001 1001   (+25)
 + 1111 0010   (-14)
 ------------
 1 0000 1011   (End carry = 1)

Step 3: In 2's complement, end carry is discarded!
Result = 0000 1011 = 8 + 2 + 1 = +11 (Correct!)`,
    },
    commonInterviewQuestions: [
      {
        question: "Why is 2's complement universally preferred over 1's complement and signed-magnitude in digital computer hardware?",
        answer: "1. Unique zero: 2's complement has only one representation for zero (00000000), whereas 1's complement and signed-magnitude have both positive zero (+0) and negative zero (-0). 2. Simpler hardware: Subtraction can be performed directly through an adder circuit without requiring an end-around carry correction step.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Adding end-around carry back to the result in 2's complement.",
        correction: "In 1's complement, end carry must be added back (end-around carry). In 2's complement, end carry is DISCARDED.",
        why: "The carry corresponds to 2^n which is congruent to 0 in modulo 2^n arithmetic.",
      },
    ],
    quickRevision: [
      'Hex = 4 bits; Octal = 3 bits.',
      "2's complement = 1's complement + 1.",
      "n-bit 2's complement range: -2^(n-1) to 2^(n-1) - 1.",
      "2's complement has a single representation for zero.",
    ],
    practiceQuestions: [
      {
        id: 'df-conv-q1',
        question: "What is the 8-bit 2's complement representation of the decimal number -18?",
        options: ['11101110', '11101101', '10010010', '11110010'],
        correctOptionIndex: 0,
        explanation: '+18 in 8 bits = 0001 0010. 1s complement = 1110 1101. Add 1 = 1110 1110. Thus, -18 is 11101110.',
      },
    ],
  },

  'df-fixed-floating': {
    topicId: 'df-fixed-floating',
    topicName: 'Fixed-Point & Floating-Point (IEEE 754)',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'IEEE 754 is the universal industry standard for binary floating-point representation in modern computer hardware, encoding real numbers across scientific ranges.',
    simpleExplanation: 'Think of scientific notation: -6.022 x 10^23. It contains a sign (-), a significand/mantissa (6.022), and an exponent (23). IEEE 754 encodes the exact same structure into binary bits: 1 Sign Bit, Biased Exponent bits, and Normalized Fraction/Mantissa bits.',
    technicalExplanation: 'Single Precision (32-bit float): 1 Sign bit (s), 8 Exponent bits (e, Bias = 127), 23 Fraction/Mantissa bits (m). Value = (-1)^s * (1.m) * 2^(e - 127). The leading 1 before the binary point is implicit (hidden bit) for normalized numbers, providing effectively 24 bits of precision. Double Precision (64-bit double): 1 Sign bit, 11 Exponent bits (Bias = 1023), 52 Fraction bits. Value = (-1)^s * (1.m) * 2^(e - 1023). Special values: If Exponent = 255 and Mantissa = 0, represents Infinity. If Exponent = 255 and Mantissa != 0, represents NaN (Not a Number). If Exponent = 0 and Mantissa = 0, represents ±0.',
    importantDefinitions: [
      { term: 'IEEE 754 Single Precision', definition: 'A 32-bit format: 1 sign bit, 8 exponent bits (bias 127), 23 fraction bits.' },
      { term: 'IEEE 754 Double Precision', definition: 'A 64-bit format: 1 sign bit, 11 exponent bits (bias 1023), 52 fraction bits.' },
      { term: 'Hidden Bit', definition: 'The normalized leading 1 before the binary point (1.xxxx) that is not stored in the fraction field, saving 1 bit.' },
      { term: 'Exponent Bias', definition: 'A constant (127 for 32-bit, 1023 for 64-bit) added to the actual exponent to allow unsigned integer comparison of signed exponents.' },
    ],
    keyConcepts: [
      'Sign Bit: 0 = Positive number; 1 = Negative number.',
      'Exponent Bias 127 (Single Precision): Actual exponent E = Stored exponent e - 127. If e = 130, actual exponent E = 130 - 127 = 3.',
      'Denormalized Numbers: When exponent bits are all 0s, implicit leading bit becomes 0 (0.m) to represent numbers very close to zero without sudden underflow.',
    ],
    example: {
      type: 'text',
      title: 'Converting -13.25 to IEEE 754 32-Bit Single Precision',
      explanation: 'Step-by-step conversion of -13.25 into binary IEEE 754 format.',
      output: `1. Sign Bit:
   Number is negative -> Sign bit s = 1.

2. Convert magnitude 13.25 to binary:
   Integer part: 13 = 1101_2
   Fractional part: 0.25 * 2 = 0.5 (0), 0.5 * 2 = 1.0 (1) -> 0.01_2
   Combined: 1101.01_2

3. Normalize:
   1101.01_2 = 1.10101_2 * 2^3
   Actual exponent E = 3.

4. Calculate Biased Exponent (8 bits):
   Stored exponent e = E + 127 = 3 + 127 = 130
   130 in binary = 1000 0010_2

5. Mantissa / Fraction (23 bits):
   Drop the implicit leading 1: 10101
   Pad with zeros to 23 bits: 10101000000000000000000

Final IEEE 754 Binary Representation:
Sign (1) | Exponent (8) | Mantissa (23)
1        | 10000010     | 10101000000000000000000
Hexadecimal: 0xC1540000`,
    },
    commonInterviewQuestions: [
      {
        question: 'Why does IEEE 754 use a biased exponent instead of 2’s complement for the exponent field?',
        answer: 'Using a biased exponent (excess-127) ensures that all stored exponent values are non-negative unsigned integers (0 to 255). This allows hardware to compare the relative magnitudes of two floating-point numbers using fast integer comparison circuits, without needing to unpack the floating-point structure.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Including the leading "1." in the stored mantissa bits.',
        correction: 'The normalized leading 1 is IMPLICIT (hidden) and is never physically written into the 23-bit fraction field.',
        why: 'Omitting the guaranteed leading 1 increases the precision of the mantissa by 1 full bit for free.',
      },
    ],
    quickRevision: [
      'Single Precision: 1 Sign, 8 Exponent (Bias 127), 23 Mantissa (Total 32 bits).',
      'Double Precision: 1 Sign, 11 Exponent (Bias 1023), 52 Mantissa (Total 64 bits).',
      'Hidden bit provides 24 bits of effective precision in single precision.',
      'Exp = 255, Mantissa = 0 indicates Infinity.',
    ],
    practiceQuestions: [
      {
        id: 'df-flt-q1',
        question: 'In IEEE 754 32-bit single-precision format, what is the bias added to the actual exponent?',
        options: ['63', '127', '128', '255'],
        correctOptionIndex: 1,
        explanation: 'The bias for single-precision IEEE 754 floating point (8-bit exponent) is 2^(8-1) - 1 = 127.',
      },
    ],
  },

  'df-logic-gates': {
    topicId: 'df-logic-gates',
    topicName: 'Logic Gates & Universal Gates (NAND, NOR)',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'Logic gates are the physical elementary building blocks of digital integrated circuits, executing elementary Boolean logic operations on binary inputs.',
    simpleExplanation: 'Just as LEGO bricks can be clicked together to build houses, cars, or spaceships, logic gates are electrical switches that take HIGH (1) or LOW (0) voltages and produce an output voltage based on Boolean rules. NAND and NOR gates are universal "master bricks" that can single-handedly replicate any other gate.',
    technicalExplanation: 'Basic Gates: AND (output 1 only if all inputs are 1), OR (output 1 if at least one input is 1), NOT (inverter). Derived Gates: XOR (output 1 when odd number of inputs are 1; modulo-2 adder), XNOR (equivalence gate). Universal Gates: NAND and NOR are called Universal Gates because any arbitrary Boolean function or digital circuit can be synthesized using exclusively NAND gates or exclusively NOR gates, without requiring any other gate type.',
    importantDefinitions: [
      { term: 'Universal Gate', definition: 'A gate that can implement any Boolean function without using any other gate type (NAND and NOR).' },
      { term: 'XOR Gate', definition: 'Exclusive-OR: Produces 1 if inputs are distinct (A XOR B = A\'B + AB\'). Evaluates parity.' },
      { term: "De Morgan's Laws", definition: '(A . B)\' = A\' + B\' and (A + B)\' = A\' . B\'.' },
    ],
    keyConcepts: [
      'NAND Gate: Output is 0 ONLY when all inputs are 1. Expression: Y = (A . B)\'.',
      'NOR Gate: Output is 1 ONLY when all inputs are 0. Expression: Y = (A + B)\'.',
      'Minimum NAND gates needed: NOT = 1, AND = 2, OR = 3, XOR = 4, XNOR = 5.',
      'Minimum NOR gates needed: NOT = 1, OR = 2, AND = 3, XNOR = 4, XOR = 5.',
    ],
    example: {
      type: 'diagram',
      title: 'Building NOT, AND, OR using NAND Gates',
      explanation: 'Universal synthesis using only 2-input NAND gates.',
      diagramAscii: `
1. NOT Gate using NAND (1 Gate):
   A ----+-----\\
         |  NAND )o----- A'
   A ----+-----/

2. AND Gate using NAND (2 Gates):
   A --------\\
          NAND )o---+-----\\
   B --------/      |  NAND )o----- (A.B)
                    +-----/

3. OR Gate using NAND (3 Gates):
   A --(NAND-as-NOT)-- A' -----\\
                                NAND )o----- A + B (by De Morgan!)
   B --(NAND-as-NOT)-- B' -----/
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'How many 2-input NAND gates are required to implement a 2-input XOR gate?',
        answer: 'Exactly 4 NAND gates. Expression: A XOR B = A(AB)\' + B(AB)\'. The first NAND gate computes (AB)\'. The second computes (A . (AB)\')\'. The third computes (B . (AB)\')\'. The fourth NAND gate combines outputs of the second and third to produce A XOR B.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Thinking XOR is a universal gate.',
        correction: 'XOR is NOT a universal gate. It cannot produce a constant 1 output or perform inversion without an auxiliary constant input.',
        why: 'Universal gates must be able to synthesize NOT, AND, and OR unconditionally.',
      },
    ],
    quickRevision: [
      'Universal gates: NAND and NOR.',
      'NAND counts: NOT=1, AND=2, OR=3, XOR=4, XNOR=5.',
      'NOR counts: NOT=1, OR=2, AND=3, XNOR=4, XOR=5.',
      'XOR is 1 when inputs differ; XNOR is 1 when inputs match.',
    ],
    practiceQuestions: [
      {
        id: 'df-gate-q1',
        question: 'What is the minimum number of 2-input NAND gates required to implement a 2-input XOR gate?',
        options: ['3', '4', '5', '6'],
        correctOptionIndex: 1,
        explanation: 'Exactly 4 two-input NAND gates are required to implement an XOR gate.',
      },
    ],
  },

  'df-k-maps': {
    topicId: 'df-k-maps',
    topicName: 'K-Map Simplification & Don’t Cares',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'A Karnaugh Map (K-Map) is a graphical method for simplifying Boolean algebra expressions up to 4 or 5 variables without needing to perform algebraic expansions or theorems.',
    simpleExplanation: 'Imagine an organized grid where adjacent squares differ by only one single bit switch (Gray code). When two or more adjacent squares both have 1s, that differing bit becomes irrelevant and can be crossed out, directly revealing the simplest possible circuit formula.',
    technicalExplanation: 'K-Maps arrange minterm squares such that adjacent cells differ by exactly 1 bit (Gray Code ordering: 00, 01, 11, 10). Groups of 1s (for Sum of Products / SOP) or 0s (for Product of Sums / POS) must be rectangular powers of 2 (1, 2, 4, 8, 16). Groups wrap around map boundaries (toroidal adjacency). Don’t Care conditions (denoted by X) represent invalid input combinations; they may be grouped with 1s if doing so enlarges a group (eliminating more literal variables), or left as 0 if they do not help.',
    importantDefinitions: [
      { term: 'Gray Code Ordering', definition: 'Binary numeral system where two successive values differ in only one bit position (00, 01, 11, 10), preventing false glitches.' },
      { term: 'Minterm (m)', definition: 'A product of all input variables where each variable appears either complemented or uncomplemented (evaluating to 1).' },
      { term: "Don't Care (X)", definition: 'An input condition that will never occur in practice or whose output has no effect on circuit correctness.' },
      { term: 'Essential Prime Implicant (EPI)', definition: 'A prime implicant group that covers at least one minterm that is not covered by any other prime implicant.' },
    ],
    keyConcepts: [
      'Cell ordering for 2 variables: 00, 01, 11, 10. Notice 11 precedes 10!',
      'Size of groups: Must be powers of 2: 1 (0 variables eliminated), 2 (1 variable eliminated), 4 (2 variables eliminated, Quad), 8 (3 variables eliminated, Octet).',
      'Edges wrap around: Top row is adjacent to bottom row; Left column is adjacent to right column; The 4 corner cells form a valid Quad.',
      'Don’t Cares (X) should be included ONLY if they increase group size; never create a group consisting entirely of Xs.',
    ],
    example: {
      type: 'text',
      title: '3-Variable K-Map Grouping Example',
      explanation: 'Simplify F(A, B, C) = Sum_m(0, 2, 4, 6) on a 3-variable K-map.',
      output: `K-Map Grid (Rows: A, Columns: BC):
       BC=00   BC=01   BC=11   BC=10
A=0   |  1  |   0   |   0   |  1  |   (m0, m2)
A=1   |  1  |   0   |   0   |  1  |   (m4, m6)

Observe:
Column BC=00 has 1s at m0 and m4.
Column BC=10 has 1s at m2 and m6.
Since column 00 and column 10 are adjacent (wrap around edges), all four 1s form a single QUAD!

Variables analysis for Quad (m0, m2, m4, m6):
- A changes from 0 to 1 -> A eliminated!
- B changes from 0 to 1 -> B eliminated!
- C remains 0 throughout -> C' preserved!

Minimal Expression: F = C'`,
    },
    commonInterviewQuestions: [
      {
        question: 'Why must K-map rows and columns be indexed using Gray Code instead of standard binary sequence (00, 01, 10, 11)?',
        answer: 'In standard binary, transitioning from 01 to 10 changes two bits simultaneously. Gray Code ensures that any two physically adjacent cells (including wrap-around edges) differ in exactly ONE variable (Hamming distance = 1). This single-bit difference is what allows algebraic reduction: xA + xA\' = x(A + A\') = x.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Grouping 3 or 6 cells together.',
        correction: 'Groups MUST strictly be powers of 2 (1, 2, 4, 8, 16). Groups of 3, 5, or 6 cells are invalid in K-maps.',
        why: 'Eliminating a variable relies on pairwise Boolean complementation (A + A = 1), which requires symmetric powers of 2.',
      },
    ],
    quickRevision: [
      'Gray code ordering: 00, 01, 11, 10.',
      'Groups must be powers of 2 (1, 2, 4, 8, 16).',
      'Wrap-around: 4 corners form a valid group of 4.',
      'Don’t cares (X) are used only to enlarge groups of 1s.',
    ],
    practiceQuestions: [
      {
        id: 'df-kmap-q1',
        question: 'In a 4-variable K-Map, a group of 8 adjacent cells (Octet) eliminates how many variables from the term?',
        options: ['1 variable', '2 variables', '3 variables', '4 variables'],
        correctOptionIndex: 2,
        explanation: 'A group of size 2^k eliminates k variables. An octet has size 8 = 2^3, which eliminates exactly 3 variables, leaving a single literal.',
      },
    ],
  },

  'df-flip-flops': {
    topicId: 'df-flip-flops',
    topicName: 'Flip-Flops (SR, JK, D, T & Master-Slave)',
    subjectId: 'digital-fundamentals',
    whatIsIt: 'A Flip-Flop is an edge-triggered sequential circuit element capable of storing 1 bit of binary memory, changing state only at the rising or falling transition of a clock signal.',
    simpleExplanation: 'Unlike a combinational circuit where output changes immediately when inputs change, a flip-flop has a memory latch. It locks in its input value only when a clock metronome ticks (edge trigger), holding that bit steady until the next tick.',
    technicalExplanation: 'Types: 1. SR Flip-Flop: Set (S=1, R=0 -> Q=1), Reset (S=0, R=1 -> Q=0), Hold (S=0, R=0 -> Q), Invalid (S=1, R=1). 2. JK Flip-Flop: Fixes SR invalid state by toggling when J=1, K=1 (Q_next = Q\'). However, when clock pulse width > propagation delay, JK suffers from Race-Around Condition. 3. Master-Slave JK: Eliminates race-around by using two cascaded flip-flops: Master latches on clock HIGH, Slave transfers to output on clock LOW. 4. D Flip-Flop (Data/Delay): Q_next = D. 5. T Flip-Flop (Toggle): Q_next = T XOR Q.',
    importantDefinitions: [
      { term: 'Race-Around Condition', definition: 'In level-triggered JK flip-flops with J=1, K=1, the output toggles uncontrollably multiple times during a single clock pulse if pulse width is longer than propagation delay.' },
      { term: 'Master-Slave Flip-Flop', definition: 'Two-stage flip-flop configuration where master responds to clock level and slave responds to inverted clock level, completely preventing race-around.' },
      { term: 'Characteristic Equation', definition: 'The Boolean expression giving the next state Q(t+1) in terms of current state Q(t) and control inputs.' },
    ],
    keyConcepts: [
      'SR Characteristic Equation: Q(t+1) = S + R\'Q (with constraint S.R = 0).',
      'JK Characteristic Equation: Q(t+1) = J.Q\' + K\'.Q.',
      'D Characteristic Equation: Q(t+1) = D.',
      'T Characteristic Equation: Q(t+1) = T.Q\' + T\'.Q = T XOR Q.',
      'Solutions to Race-Around: 1. Master-Slave JK flip-flop, 2. Edge-triggering, 3. Ensuring clock pulse width < propagation delay (difficult in practice).',
    ],
    example: {
      type: 'text',
      title: 'Flip-Flop Characteristic Truth Table Comparison',
      explanation: 'Next state behavior for SR, JK, D, and T flip-flops.',
      output: `JK Flip-Flop Truth Table:
J   K   Q(t)   Q(t+1)   Action / State
----------------------------------------
0   0    0       0      No Change (Hold)
0   0    1       1      No Change (Hold)
0   1    0       0      Reset (Q=0)
0   1    1       0      Reset (Q=0)
1   0    0       1      Set (Q=1)
1   0    1       1      Set (Q=1)
1   1    0       1      Toggle (Invert Q)
1   1    1       0      Toggle (Invert Q)

D Flip-Flop: Q(t+1) = D (Transfers input directly to output on clock)
T Flip-Flop: If T=0 -> Hold; If T=1 -> Toggle!`,
    },
    commonInterviewQuestions: [
      {
        question: 'What is the Race-Around condition in a JK flip-flop and how is it resolved?',
        answer: 'In a level-triggered JK flip-flop, when J=1 and K=1, the output toggles. If the clock pulse width (tp) is greater than the propagation delay of the flip-flop (td), the toggled output feeds back to the input during the same clock pulse, causing the output to oscillate uncontrollably between 0 and 1. At the end of the pulse, the final state is unpredictable. It is resolved by using Edge-Triggering or a Master-Slave JK configuration.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming S=1, R=1 sets both Q and Q_bar to 1 safely.',
        correction: 'In an SR latch/flip-flop, S=1, R=1 produces an invalid state where both outputs become 0 (in NOR latches) violating Q = NOT(Q_bar). When inputs drop to 00, race conditions determine the final state.',
        why: 'SR flip-flops lack feedback to handle simultaneous 1s.',
      },
    ],
    quickRevision: [
      'JK flip-flop fixes SR invalid state by toggling on J=1, K=1.',
      'Race-around condition occurs when J=1, K=1 and clock pulse > gate delay.',
      'Master-Slave JK eliminates race-around.',
      'D flip-flop: Q_next = D. T flip-flop: Q_next = T XOR Q.',
    ],
    practiceQuestions: [
      {
        id: 'df-ff-q1',
        question: 'What is the characteristic equation of a JK flip-flop?',
        options: ['Q(t+1) = J + K Q', "Q(t+1) = J Q' + K' Q", "Q(t+1) = J' Q + K Q'", 'Q(t+1) = J XOR K'],
        correctOptionIndex: 1,
        explanation: "The characteristic equation of a JK flip-flop is Q(t+1) = J Q' + K' Q.",
      },
    ],
  },
};
