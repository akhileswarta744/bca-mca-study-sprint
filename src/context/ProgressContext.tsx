import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppState,
  TopicStatus,
  QuizAttempt,
  UserNote,
  InterviewRating,
} from '../types';
import { TOPICS_META, SUBJECTS } from '../data/subjectsData';
import { INITIAL_NOTES } from '../data/initialNotes';

const STORAGE_KEY = 'bca_mca_study_sprint_state_v1';

interface ProgressContextType extends AppState {
  setCurrentDay: (day: number) => void;
  updateTopicStatus: (topicId: string, status: TopicStatus) => void;
  toggleDayTask: (taskId: string) => void;
  saveQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'timestamp'>) => QuizAttempt;
  addWeakTopic: (topicId: string) => void;
  removeWeakTopic: (topicId: string) => void;
  saveNote: (note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  deleteNote: (id: string) => void;
  togglePinNote: (id: string) => void;
  rateInterviewQuestion: (questionId: string, rating: InterviewRating) => void;
  resetAllProgress: () => void;
  // Computed helpers
  overallProgressPercentage: number;
  totalTopicsCompleted: number;
  totalTopicsRemaining: number;
  subjectProgress: Record<string, { completed: number; total: number; percentage: number }>;
  averageQuizScore: number;
  recentQuiz: QuizAttempt | null;
  weakTopicsList: { id: string; name: string; subjectId: string; subjectName: string }[];
}

const getInitialState = (): AppState => {
  // Default clean state
  const initialTopicStatus: Record<string, TopicStatus> = {};
  TOPICS_META.forEach((t, index) => {
    // Start Day 1 topics in progress / not started
    if (index === 0) {
      initialTopicStatus[t.id] = 'in_progress';
    } else {
      initialTopicStatus[t.id] = 'not_started';
    }
  });

  const defaultState: AppState = {
    currentDay: 1,
    topicStatus: initialTopicStatus,
    dayTasksCompleted: {},
    quizHistory: [],
    weakTopics: ['os-sync', 'ds-avl', 'dbms-normalization'],
    userNotes: INITIAL_NOTES,
    interviewRatings: {},
    streak: {
      count: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    },
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Validate structure and safely merge
      if (parsed && typeof parsed === 'object') {
        return {
          ...defaultState,
          ...parsed,
          topicStatus: {
            ...initialTopicStatus,
            ...(parsed.topicStatus || {}),
          },
          userNotes: Array.isArray(parsed.userNotes) && parsed.userNotes.length > 0
            ? parsed.userNotes
            : INITIAL_NOTES,
          quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
          weakTopics: Array.isArray(parsed.weakTopics) ? parsed.weakTopics : defaultState.weakTopics,
          dayTasksCompleted: parsed.dayTasksCompleted || {},
          interviewRatings: parsed.interviewRatings || {},
          streak: parsed.streak || defaultState.streak,
        };
      }
    }
  } catch (e) {
    console.error('Failed to load study sprint progress from localStorage', e);
  }

  return defaultState;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(getInitialState);

  // Sync state to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist progress to localStorage', e);
    }
  }, [state]);

  // Streak check on load / date change
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const last = state.streak.lastActiveDate;
    if (last !== today) {
      const lastDate = new Date(last);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        // Consecutive day
        setState((prev) => ({
          ...prev,
          streak: {
            count: prev.streak.count + 1,
            lastActiveDate: today,
          },
        }));
      } else if (diffDays > 1) {
        // Missed a day
        setState((prev) => ({
          ...prev,
          streak: {
            count: 1,
            lastActiveDate: today,
          },
        }));
      }
    }
  }, []);

  const setCurrentDay = (day: number) => {
    setState((prev) => ({ ...prev, currentDay: day }));
  };

  const updateTopicStatus = (topicId: string, status: TopicStatus) => {
    setState((prev) => {
      const updatedTopics = { ...prev.topicStatus, [topicId]: status };
      let updatedWeak = [...prev.weakTopics];
      if (status === 'completed') {
        // If completed, optionally remove from weak topics if present
        updatedWeak = updatedWeak.filter((id) => id !== topicId);
      }
      return {
        ...prev,
        topicStatus: updatedTopics,
        weakTopics: updatedWeak,
      };
    });
  };

  const toggleDayTask = (taskId: string) => {
    setState((prev) => {
      const current = !!prev.dayTasksCompleted[taskId];
      return {
        ...prev,
        dayTasksCompleted: {
          ...prev.dayTasksCompleted,
          [taskId]: !current,
        },
      };
    });
  };

  const saveQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'timestamp'>): QuizAttempt => {
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: `quiz-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    setState((prev) => {
      // Auto-tag topics with incorrect answers as weak topics
      const newlyIdentifiedWeak = attempt.questionResults
        .filter((r) => !r.isCorrect)
        .map((r) => r.topicId);

      const combinedWeak = Array.from(new Set([...prev.weakTopics, ...newlyIdentifiedWeak]));

      return {
        ...prev,
        quizHistory: [newAttempt, ...prev.quizHistory],
        weakTopics: combinedWeak,
      };
    });

    return newAttempt;
  };

  const addWeakTopic = (topicId: string) => {
    setState((prev) => ({
      ...prev,
      weakTopics: Array.from(new Set([...prev.weakTopics, topicId])),
    }));
  };

  const removeWeakTopic = (topicId: string) => {
    setState((prev) => ({
      ...prev,
      weakTopics: prev.weakTopics.filter((id) => id !== topicId),
    }));
  };

  const saveNote = (noteData: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    setState((prev) => {
      const now = new Date().toISOString();
      if (noteData.id) {
        // Update existing
        const updated = prev.userNotes.map((n) =>
          n.id === noteData.id
            ? { ...n, ...noteData, updatedAt: now }
            : n
        );
        return { ...prev, userNotes: updated };
      } else {
        // Create new
        const newNote: UserNote = {
          ...noteData,
          id: `note-${Date.now()}`,
          createdAt: now,
          updatedAt: now,
        };
        return { ...prev, userNotes: [newNote, ...prev.userNotes] };
      }
    });
  };

  const deleteNote = (id: string) => {
    setState((prev) => ({
      ...prev,
      userNotes: prev.userNotes.filter((n) => n.id !== id),
    }));
  };

  const togglePinNote = (id: string) => {
    setState((prev) => ({
      ...prev,
      userNotes: prev.userNotes.map((n) =>
        n.id === id ? { ...n, isPinned: !n.isPinned } : n
      ),
    }));
  };

  const rateInterviewQuestion = (questionId: string, rating: InterviewRating) => {
    setState((prev) => ({
      ...prev,
      interviewRatings: {
        ...prev.interviewRatings,
        [questionId]: rating,
      },
    }));
  };

  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    const initialTopicStatus: Record<string, TopicStatus> = {};
    TOPICS_META.forEach((t) => {
      initialTopicStatus[t.id] = 'not_started';
    });

    const resetState: AppState = {
      currentDay: 1,
      topicStatus: initialTopicStatus,
      dayTasksCompleted: {},
      quizHistory: [],
      weakTopics: [],
      userNotes: INITIAL_NOTES,
      interviewRatings: {},
      streak: {
        count: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
      },
    };
    setState(resetState);
  };

  // Computed Values
  const totalTopics = TOPICS_META.length;
  const completedTopicsCount = Object.values(state.topicStatus).filter((s) => s === 'completed').length;
  const overallProgressPercentage = Math.round((completedTopicsCount / totalTopics) * 100);
  const totalTopicsRemaining = totalTopics - completedTopicsCount;

  // Subject-by-subject progress breakdown
  const subjectProgress: Record<string, { completed: number; total: number; percentage: number }> = {};
  SUBJECTS.forEach((sub) => {
    const subTopics = TOPICS_META.filter((t) => t.subjectId === sub.id);
    const completed = subTopics.filter((t) => state.topicStatus[t.id] === 'completed').length;
    const total = subTopics.length;
    subjectProgress[sub.id] = {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });

  // Quiz statistics
  const averageQuizScore =
    state.quizHistory.length > 0
      ? Math.round(
          state.quizHistory.reduce((acc, q) => acc + q.scorePercentage, 0) / state.quizHistory.length
        )
      : 0;

  const recentQuiz = state.quizHistory.length > 0 ? state.quizHistory[0] : null;

  // Weak topics detailed objects
  const weakTopicsList = state.weakTopics.map((topicId) => {
    const meta = TOPICS_META.find((t) => t.id === topicId);
    const subject = meta ? SUBJECTS.find((s) => s.id === meta.subjectId) : null;
    return {
      id: topicId,
      name: meta?.name || topicId,
      subjectId: meta?.subjectId || 'operating-systems',
      subjectName: subject?.name || 'Computer Science',
    };
  });

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        setCurrentDay,
        updateTopicStatus,
        toggleDayTask,
        saveQuizAttempt,
        addWeakTopic,
        removeWeakTopic,
        saveNote,
        deleteNote,
        togglePinNote,
        rateInterviewQuestion,
        resetAllProgress,
        overallProgressPercentage,
        totalTopicsCompleted: completedTopicsCount,
        totalTopicsRemaining,
        subjectProgress,
        averageQuizScore,
        recentQuiz,
        weakTopicsList,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
