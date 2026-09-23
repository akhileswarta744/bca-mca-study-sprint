export type SubjectCategory = 'core-computer' | 'additional-bca-core';

export interface Subject {
  id: string;
  name: string;
  category: SubjectCategory;
  categoryLabel: string;
  description: string;
  icon: string;
  badgeColor: string;
  syllabusNote: string;
  isFromCuetSyllabus: boolean;
  topicCount: number;
}

export type TopicStatus = 'not_started' | 'in_progress' | 'completed';

export interface TopicMeta {
  id: string;
  subjectId: string;
  name: string;
  dayNumber: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  keywords: string[];
}

export interface DayTask {
  id: string;
  title: string;
  topicId?: string;
  isMandatory: boolean;
}

export interface StudyDay {
  day: number;
  title: string;
  subtitle: string;
  subjectIds: string[];
  subjectNames: string[];
  tasks: DayTask[];
  summary: string;
  learningGoals: string[];
}

export interface TopicLearningContent {
  topicId: string;
  topicName: string;
  subjectId: string;
  whatIsIt: string;
  simpleExplanation: string;
  technicalExplanation: string;
  importantDefinitions: { term: string; definition: string }[];
  keyConcepts: string[];
  example: {
    type: 'code' | 'sql' | 'diagram' | 'text';
    title: string;
    language?: string;
    code?: string;
    explanation: string;
    output?: string;
    diagramAscii?: string;
  };
  commonInterviewQuestions: {
    question: string;
    answer: string;
    tips?: string;
  }[];
  commonMistakes: {
    mistake: string;
    correction: string;
    why: string;
  }[];
  quickRevision: string[];
  practiceQuestions: {
    id: string;
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
  }[];
}

export type QuestionType = 
  | 'mcq' 
  | 'conceptual' 
  | 'code-output' 
  | 'sql' 
  | 'scenario-based' 
  | 'interview-style';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface PracticeQuestion {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  question: string;
  codeSnippet?: string;
  sqlSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  keyTakeaway: string;
}

export interface DifferenceComparison {
  conceptA: string;
  conceptB: string;
  summary: string;
  points: { aspect: string; a: string; b: string }[];
}

export interface RapidRevisionData {
  subjectId: string;
  oneLineDefinitions: { term: string; definition: string }[];
  importantDifferences: DifferenceComparison[];
  importantConcepts: { title: string; points: string[] }[];
  commonInterviewQuestions: { q: string; a: string }[];
  commonMistakes: { trap: string; fix: string }[];
  keyCommandsAndSyntax?: { label: string; code: string; note: string }[];
  quickExamples?: { title: string; code: string; note: string }[];
}

export type InterviewCategory =
  | 'bca-fundamentals'
  | 'java'
  | 'python'
  | 'dbms'
  | 'sql'
  | 'os'
  | 'ds'
  | 'networks'
  | 'software-engineering'
  | 'project';

export interface MockInterviewItem {
  id: string;
  category: InterviewCategory;
  categoryName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Easy' | 'Medium' | 'Follow-up' | 'Scenario-based';
  question: string;
  context?: string;
  modelAnswer: string;
  keyPointsToMention: string[];
  followUpQuestion?: string;
  followUpAnswer?: string;
}

export interface UserNote {
  id: string;
  subjectId: string;
  topicId?: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface QuizAttempt {
  id: string;
  timestamp: string;
  subjectId: string | 'all';
  subjectName: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  weakTopics: string[];
  questionResults: {
    questionId: string;
    topicId: string;
    topicName: string;
    subjectId: string;
    userSelected: number;
    correctOptionIndex: number;
    isCorrect: boolean;
  }[];
}

export type InterviewRating = 'mastered' | 'review' | 'struggled';

export interface AppState {
  currentDay: number;
  topicStatus: Record<string, TopicStatus>;
  dayTasksCompleted: Record<string, boolean>; // key: `${day}-${taskId}`
  quizHistory: QuizAttempt[];
  weakTopics: string[];
  userNotes: UserNote[];
  interviewRatings: Record<string, InterviewRating>;
  streak: {
    count: number;
    lastActiveDate: string;
  };
}
