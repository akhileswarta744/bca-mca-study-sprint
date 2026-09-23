import { TopicLearningContent } from '../../types';
import { TOPICS_META } from '../subjectsData';
import { OS_LEARNING_CONTENT } from './osContent';
import { DS_LEARNING_CONTENT } from './dsContent';
import { DIGITAL_LEARNING_CONTENT } from './digitalContent';
import { DBMS_LEARNING_CONTENT } from './dbmsContent';
import { SQL_LEARNING_CONTENT } from './sqlContent';
import { JAVA_LEARNING_CONTENT } from './javaContent';
import { PYTHON_LEARNING_CONTENT } from './pythonContent';
import { NETWORKS_LEARNING_CONTENT } from './networksContent';
import { SE_LEARNING_CONTENT } from './seContent';

// Extended complete 10-part lessons
import { OS_EXTENDED_CONTENT } from './osExtended';
import { DS_EXTENDED_CONTENT } from './dsExtended';
import { DIGITAL_EXTENDED_CONTENT } from './digitalExtended';
import { CORE_BCA_EXTENDED_CONTENT } from './coreBcaExtended';
import { NETWORKING_SE_REVISION_EXTENDED_CONTENT } from './networkingSeRevisionExtended';

export const ALL_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  ...OS_LEARNING_CONTENT,
  ...OS_EXTENDED_CONTENT,
  ...DS_LEARNING_CONTENT,
  ...DS_EXTENDED_CONTENT,
  ...DIGITAL_LEARNING_CONTENT,
  ...DIGITAL_EXTENDED_CONTENT,
  ...DBMS_LEARNING_CONTENT,
  ...SQL_LEARNING_CONTENT,
  ...JAVA_LEARNING_CONTENT,
  ...PYTHON_LEARNING_CONTENT,
  ...CORE_BCA_EXTENDED_CONTENT,
  ...NETWORKS_LEARNING_CONTENT,
  ...SE_LEARNING_CONTENT,
  ...NETWORKING_SE_REVISION_EXTENDED_CONTENT,
};

// Fallback generator ensures no topic will EVER show an empty or missing screen
function generateFallbackTopicContent(topicId: string): TopicLearningContent {
  const meta = TOPICS_META.find((t) => t.id === topicId) || {
    id: topicId,
    name: topicId.replace(/-/g, ' ').toUpperCase(),
    subjectId: 'operating-systems',
    keywords: ['fundamentals', 'exam preparation', 'core concept'],
    dayNumber: 1,
    difficulty: 'Medium' as const,
    estimatedMinutes: 40,
  };

  return {
    topicId: meta.id,
    topicName: meta.name,
    subjectId: meta.subjectId,
    whatIsIt: `${meta.name} is an essential BCA core computer science concept frequently tested in MCA entrance examinations and technical interviews.`,
    simpleExplanation: `Think of ${meta.name} as a fundamental building block. Mastering this concept ensures you understand how system software, data organization, and algorithms work together reliably.`,
    technicalExplanation: `${meta.name} encompasses theoretical and architectural implementations centered around: ${meta.keywords.join(', ')}. In modern computer science, this principle guarantees proper abstraction, minimal latency, and robust computational efficiency.`,
    importantDefinitions: meta.keywords.slice(0, 4).map((kw) => ({
      term: kw.charAt(0).toUpperCase() + kw.slice(1),
      definition: `A core terminology in ${meta.name} representing ${kw} within this domain.`,
    })),
    keyConcepts: [
      `Core Principle: Understanding the role of ${meta.name} in modern computer systems.`,
      `Key Invariant: ${meta.keywords[0] || 'Fundamentals'} must be preserved during all state transitions.`,
      `Asymptotic & Architectural Trade-offs: Minimizing overhead while guaranteeing correctness.`,
      `Examination High-Yield: Frequently asked in multiple choice questions and technical interviews.`,
    ],
    example: {
      type: 'text',
      title: `${meta.name} Conceptual Architecture`,
      explanation: `System walkthrough emphasizing: ${meta.keywords.join(' -> ')}`,
      code: `
================ CONCEPTUAL OVERVIEW: ${meta.name.toUpperCase()} ================
Keywords & High-Yield Scope:
- ${meta.keywords.map((k) => `* ${k}`).join('\n- ')}

Checklist for Examination:
1. Verify fundamental definition and formal operational criteria.
2. Review primary formulas, asymptotic complexities, or syntax rules.
3. Test edge cases and common interview traps before moving to the next day.
========================================================================
      `,
    },
    commonInterviewQuestions: [
      {
        question: `What is the significance of ${meta.name} in computer science fundamentals?`,
        answer: `It provides standardized structural principles for resource management, asymptotic efficiency, and scalable software design.`,
        tips: `Highlight the connection to ${meta.keywords.slice(0, 2).join(' and ')}.`,
      },
    ],
    commonMistakes: [
      {
        mistake: `Overlooking edge conditions in ${meta.name}.`,
        correction: `Always verify boundary states and formal preconditions.`,
        why: `MCA entrance exams frequently test edge scenarios and boundary behaviors.`,
      },
    ],
    quickRevision: [
      `Review key terms: ${meta.keywords.join(', ')}.`,
      `Understand foundational properties and time/space characteristics.`,
      `Ensure you practice related MCQs in the Practice Quiz cockpit.`,
    ],
    practiceQuestions: [
      {
        id: `${meta.id}-auto-q1`,
        question: `Which of the following is most closely associated with ${meta.name}?`,
        options: [
          meta.keywords[0] ? meta.keywords[0].toUpperCase() : 'Core Principle',
          'Unrelated concept',
          'Redundant buffer',
          'Static null space',
        ],
        correctOptionIndex: 0,
        explanation: `${meta.keywords[0] || 'This concept'} is a fundamental topic covered in ${meta.name}.`,
      },
    ],
  };
}

export function getTopicContent(topicId: string): TopicLearningContent {
  if (ALL_LEARNING_CONTENT[topicId]) {
    return ALL_LEARNING_CONTENT[topicId];
  }
  return generateFallbackTopicContent(topicId);
}
