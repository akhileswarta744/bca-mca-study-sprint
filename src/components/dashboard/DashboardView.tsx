import React from 'react';
import {
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Target,
  ListTodo,
  Layers,
  ChevronRight,
  BarChart,
  StickyNote,
  GraduationCap,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { STUDY_DAYS } from '../../data/studyPlanData';
import { SUBJECTS, TOPICS_META } from '../../data/subjectsData';
import { NavTab } from '../layout/Sidebar';

interface DashboardViewProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenTopic: (topicId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  onOpenTopic,
}) => {
  const {
    currentDay,
    setCurrentDay,
    streak,
    overallProgressPercentage,
    totalTopicsCompleted,
    totalTopicsRemaining,
    dayTasksCompleted,
    toggleDayTask,
    recentQuiz,
    weakTopicsList,
    topicStatus,
  } = useProgress();

  const todayPlan = STUDY_DAYS.find((d) => d.day === currentDay) || STUDY_DAYS[0];

  // Calculate day tasks completion count
  const todayTasks = todayPlan.tasks;
  const completedTodayTasksCount = todayTasks.filter(
    (t) => !!dayTasksCompleted[t.id]
  ).length;
  const dayProgressPercent = Math.round(
    (completedTodayTasksCount / (todayTasks.length || 1)) * 100
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Hero Sprint Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-[#0e1628] to-[#0a0f1d] border border-indigo-500/20 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>16-DAY SPRINT ACTIVE</span>
              <span className="text-indigo-400/60">•</span>
              <span>DAY {currentDay} OF 16</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              BCA <span className="text-indigo-400">→</span> MCA Study Sprint
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
              Intensive Computer Science fundamentals revision for postgraduate readiness.
              Focusing on 9 core academic subjects with zero fluff.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                // Find first incomplete topic for today
                const firstTopic = todayTasks.find((t) => t.topicId)?.topicId;
                if (firstTopic) {
                  onOpenTopic(firstTopic);
                } else {
                  setActiveTab('plan');
                }
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Continue Studying</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className="px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-sm transition-all"
            >
              Today's Plan
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row: 4 Essential Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Current Sprint Day */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-sm relative group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Current Day</span>
            <Calendar className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">Day {currentDay}</span>
            <span className="text-xs text-slate-400 font-medium">/ 16</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo-400 font-medium truncate">
            <span>{todayPlan.title.split('—')[0]}</span>
          </div>
        </div>

        {/* Metric 2: Overall Progress */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-sm relative group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Progress</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-cyan-300">{overallProgressPercentage}%</span>
            <span className="text-xs text-slate-400">Complete</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercentage}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Topics Completed vs Remaining */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-sm relative group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Topics Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400">{totalTopicsCompleted}</span>
            <span className="text-xs text-slate-400 font-medium">done / {totalTopicsRemaining} left</span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            {TOPICS_META.length} total core topics
          </div>
        </div>

        {/* Metric 4: Study Streak */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-sm relative group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400">{streak.count}</span>
            <span className="text-xs text-slate-400">Consecutive Days</span>
          </div>
          <div className="mt-3 text-xs text-amber-300/80 font-medium flex items-center gap-1">
            <span>Keep the momentum alive!</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Focus & Tasks (Left) + Quick Actions, Weak Topics & Quiz (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (7 Cols): Today's Schedule & Action Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
              <div>
                <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">
                  Day {currentDay} Focus
                </span>
                <h2 className="text-xl font-black text-white mt-0.5">{todayPlan.title}</h2>
                <p className="text-xs text-slate-400 mt-1">{todayPlan.subtitle}</p>
              </div>

              {/* Progress pill for today's tasks */}
              <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 self-start sm:self-auto">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-200">
                  {completedTodayTasksCount}/{todayTasks.length} Tasks
                </span>
                <span className="text-xs text-emerald-400 font-extrabold">({dayProgressPercent}%)</span>
              </div>
            </div>

            {/* Today's Subjects Tag */}
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Today's Subjects
              </span>
              <div className="flex flex-wrap gap-2">
                {todayPlan.subjectNames.map((name, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold text-xs flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Today's Interactive Tasks Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Today's Tasks Checklist
              </span>
              <div className="space-y-2">
                {todayTasks.map((task) => {
                  const isChecked = !!dayTasksCompleted[task.id];
                  const topicMeta = task.topicId ? TOPICS_META.find((t) => t.id === task.topicId) : null;
                  const status = task.topicId ? topicStatus[task.topicId] : undefined;

                  return (
                    <div
                      key={task.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                        isChecked
                          ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
                          : 'bg-slate-850/60 border-slate-750 hover:border-slate-700'
                      }`}
                    >
                      <button
                        onClick={() => toggleDayTask(task.id)}
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                            : 'border-slate-600 hover:border-indigo-400 bg-slate-900'
                        }`}
                        aria-label={`Toggle task ${task.title}`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-sm font-medium leading-snug cursor-pointer ${
                              isChecked ? 'line-through text-slate-400' : 'text-slate-200'
                            }`}
                            onClick={() => toggleDayTask(task.id)}
                          >
                            {task.title}
                          </p>

                          {task.topicId && (
                            <button
                              onClick={() => onOpenTopic(task.topicId!)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all shrink-0 border border-indigo-500/30"
                            >
                              Study
                            </button>
                          )}
                        </div>

                        {topicMeta && (
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                            <span className="capitalize">{topicMeta.difficulty}</span>
                            <span>•</span>
                            <span>~{topicMeta.estimatedMinutes} mins</span>
                            {status && (
                              <>
                                <span>•</span>
                                <span
                                  className={
                                    status === 'completed'
                                      ? 'text-emerald-400 font-medium'
                                      : status === 'in_progress'
                                      ? 'text-amber-400 font-medium'
                                      : 'text-slate-400'
                                  }
                                >
                                  {status === 'completed'
                                    ? 'Completed'
                                    : status === 'in_progress'
                                    ? 'In Progress'
                                    : 'Not Started'}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Quick Actions, Recent Quiz & Weak Topics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Actions Panel */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  const firstTopic = todayTasks.find((t) => t.topicId)?.topicId;
                  if (firstTopic) onOpenTopic(firstTopic);
                  else setActiveTab('learn');
                }}
                className="p-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-indigo-500/40 text-left transition-all group"
              >
                <GraduationCap className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Continue Studying</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Jump to lesson</div>
              </button>

              <button
                onClick={() => setActiveTab('plan')}
                className="p-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-cyan-500/40 text-left transition-all group"
              >
                <Calendar className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Today's Plan</div>
                <div className="text-[11px] text-slate-400 mt-0.5">16-Day schedule</div>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className="p-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-amber-500/40 text-left transition-all group"
              >
                <Sparkles className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Practice Questions</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Take a custom quiz</div>
              </button>

              <button
                onClick={() => setActiveTab('subjects')}
                className="p-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-emerald-500/40 text-left transition-all group"
              >
                <BookOpen className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">View Subjects</div>
                <div className="text-[11px] text-slate-400 mt-0.5">9 Subject Explorer</div>
              </button>

              <button
                onClick={() => setActiveTab('progress')}
                className="p-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-violet-500/40 text-left transition-all group"
              >
                <BarChart className="w-5 h-5 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">View Progress</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Stats & charts</div>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className="p-3.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 hover:border-rose-500/40 text-left transition-all group"
              >
                <StickyNote className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Notes</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Personal notebook</div>
              </button>
            </div>
          </div>

          {/* Recent Quiz Performance Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recent Quiz Performance
              </span>
              <button
                onClick={() => setActiveTab('practice')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                Take Quiz <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentQuiz ? (
              <div className="p-4 rounded-xl bg-slate-850 border border-slate-750 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{recentQuiz.subjectName}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {recentQuiz.correctAnswers} / {recentQuiz.totalQuestions} correct •{' '}
                    {Math.round(recentQuiz.timeSpentSeconds / 60)}m spent
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-2xl font-black ${
                      recentQuiz.scorePercentage >= 80
                        ? 'text-emerald-400'
                        : recentQuiz.scorePercentage >= 60
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {recentQuiz.scorePercentage}%
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Score</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-850/60 border border-slate-800 text-center py-6">
                <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-300">No quizzes taken yet</p>
                <p className="text-xs text-slate-400 mt-1 mb-3">
                  Test your concepts with 10 to 75 question practice drills.
                </p>
                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
                >
                  Start Practice Quiz
                </button>
              </div>
            )}
          </div>

          {/* Weakest Topics Alert Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Weakest Topics
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                {weakTopicsList.length} flagged
              </span>
            </div>

            {weakTopicsList.length > 0 ? (
              <div className="space-y-2">
                {weakTopicsList.slice(0, 4).map((weak) => (
                  <div
                    key={weak.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-850/80 border border-slate-750 hover:border-slate-700 transition-all"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-slate-200 truncate">{weak.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{weak.subjectName}</p>
                    </div>
                    <button
                      onClick={() => onOpenTopic(weak.id)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0 transition-all"
                    >
                      Revise
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-3">
                No weak topics flagged! Keep taking practice drills to diagnose target areas.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
