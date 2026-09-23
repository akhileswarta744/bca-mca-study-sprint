import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Flame,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BookOpen,
  ArrowRight,
  Trash2,
  Award,
  Layers,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { SUBJECTS, TOPICS_META } from '../../data/subjectsData';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface ProgressViewProps {
  onOpenTopic: (topicId: string) => void;
  onOpenPractice: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  onOpenTopic,
  onOpenPractice,
}) => {
  const {
    overallProgressPercentage,
    totalTopicsCompleted,
    totalTopicsRemaining,
    subjectProgress,
    streak,
    quizHistory,
    averageQuizScore,
    weakTopicsList,
    removeWeakTopic,
    resetAllProgress,
    topicStatus,
  } = useProgress();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Identify strong topics (completed and high quiz score)
  const strongTopics = TOPICS_META.filter(
    (t) => topicStatus[t.id] === 'completed' && !weakTopicsList.some((w) => w.id === t.id)
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold tracking-wide">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>PROGRESS & ANALYTICS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Study Sprint Progress
            </h1>
            <p className="text-sm text-stone-300 max-xl leading-relaxed">
              Real-time completion metrics, quiz accuracy, revision diagnostics, and subject-by-subject
              coverage analysis.
            </p>
          </div>

          {/* Reset All Progress Button */}
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Progress</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Overall Completion */}
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Overall Completion</span>
            <Target className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-black text-white">{overallProgressPercentage}%</div>
          <p className="text-xs text-stone-400">
            {totalTopicsCompleted} of {TOPICS_META.length} topics mastered
          </p>
        </div>

        {/* KPI 2: Quiz Accuracy */}
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Quiz Accuracy</span>
            <Award className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-black text-red-300">{averageQuizScore}%</div>
          <p className="text-xs text-stone-400">Across {quizHistory.length} quiz sessions</p>
        </div>

        {/* KPI 3: Study Streak */}
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-400">{streak.count} Days</div>
          <p className="text-xs text-stone-400">Daily study habit maintained</p>
        </div>

        {/* KPI 4: Weak Topics Count */}
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Target Weak Topics</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400">{weakTopicsList.length}</div>
          <p className="text-xs text-stone-400">Identified for reinforcement</p>
        </div>
      </div>

      {/* TOPICS I NEED TO REVISE (Prompt requirement) */}
      <div className="p-6 md:p-8 rounded-3xl bg-stone-900/80 border border-amber-500/20 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Topics I Need to Revise</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Dynamically aggregated from missed quiz questions and topics marked for reinforcement.
            </p>
          </div>

          {weakTopicsList.length > 0 && (
            <button
              onClick={onOpenPractice}
              className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Weak Topics Quiz</span>
            </button>
          )}
        </div>

        {weakTopicsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {weakTopicsList.map((weak) => (
              <div
                key={weak.id}
                className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-stone-700 flex items-center justify-between gap-3 transition-all"
              >
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-stone-200 truncate">{weak.name}</h4>
                  <p className="text-[11px] text-stone-400 truncate">{weak.subjectName}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenTopic(weak.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 transition-all"
                  >
                    Revise
                  </button>
                  <button
                    onClick={() => removeWeakTopic(weak.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-400 hover:bg-stone-800 transition-colors"
                    title="Mark resolved"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-stone-950/40 border border-stone-800/80 text-center py-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">All Clear!</h4>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              You currently have no flagged weak topics. Practice more quizzes to test edge cases!
            </p>
          </div>
        )}
      </div>

      {/* SUBJECT COMPLETION BREAKDOWN (Chart & Progress Bars) */}
      <div className="p-6 md:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-xl space-y-6">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-400" />
            <span>Subject-by-Subject Completion Analysis</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Breakdown across Core Computer and Additional BCA Core Revision categories.
          </p>
        </div>

        <div className="space-y-4">
          {SUBJECTS.map((sub) => {
            const prog = subjectProgress[sub.id] || { completed: 0, total: 1, percentage: 0 };
            return (
              <div key={sub.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{sub.name}</span>
                    <span className="text-[10px] text-stone-400 uppercase font-medium">
                      ({sub.category === 'core-computer' ? 'Core' : 'Additional'})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400">
                      {prog.completed} / {prog.total} Topics
                    </span>
                    <span className="font-bold text-red-300 w-10 text-right">
                      {prog.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-950 rounded-full h-2.5 overflow-hidden border border-stone-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sub.category === 'core-computer'
                        ? 'bg-gradient-to-r from-red-500 to-orange-400'
                        : 'bg-gradient-to-r from-orange-500 to-amber-400'
                    }`}
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT QUIZ HISTORY LOG */}
      <div className="p-6 md:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-xl space-y-4">
        <h2 className="text-lg font-black text-white">Quiz Performance History</h2>
        {quizHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider font-bold">
                  <th className="py-2.5 pr-4">Subject</th>
                  <th className="py-2.5 px-4">Score</th>
                  <th className="py-2.5 px-4">Correct / Total</th>
                  <th className="py-2.5 px-4">Time Spent</th>
                  <th className="py-2.5 pl-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {quizHistory.map((q) => (
                  <tr key={q.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 pr-4 font-bold text-white">{q.subjectName}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-black ${
                          q.scorePercentage >= 80
                            ? 'text-emerald-400'
                            : q.scorePercentage >= 60
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {q.scorePercentage}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-300">
                      {q.correctAnswers} / {q.totalQuestions}
                    </td>
                    <td className="py-3 px-4 text-stone-400">
                      {Math.round(q.timeSpentSeconds / 60)} min {q.timeSpentSeconds % 60}s
                    </td>
                    <td className="py-3 pl-4 text-stone-400">
                      {new Date(q.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-stone-400 text-center py-4">
            No quiz attempts recorded yet. Attempt a practice quiz to generate performance history.
          </p>
        )}
      </div>

      {/* Confirmation Dialog for Reset All Progress */}
      <ConfirmationModal
        isOpen={isResetModalOpen}
        title="Reset All Study Progress?"
        message="Are you sure you want to reset all your study progress? This will erase completed topics, task marks, quiz scores, and reset your streak back to Day 1. This action cannot be undone."
        confirmText="Yes, Reset Everything"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={() => {
          resetAllProgress();
          setIsResetModalOpen(false);
        }}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
};
