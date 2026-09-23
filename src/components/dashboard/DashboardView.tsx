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
  const todayTasks = todayPlan.tasks;
  const completedTodayTasksCount = todayTasks.filter(
    (t) => !!dayTasksCompleted[t.id]
  ).length;
  const dayProgressPercent = Math.round(
    (completedTodayTasksCount / (todayTasks.length || 1)) * 100
  );

  const upcomingDays = 16 - currentDay;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Row 1: Three-column hero section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left card (greeting) */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#1a1110] border border-stone-800/60 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Active learner
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-3">
              Hello AKHILESWAR,
            </h1>
            <p className="text-sm md:text-base text-stone-400 leading-relaxed font-normal">
              It's good to see you again. Keep going — every lesson moves you closer to mastery.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const firstTopic = todayTasks.find((t) => t.topicId)?.topicId;
                if (firstTopic) {
                  onOpenTopic(firstTopic);
                } else {
                  setActiveTab('plan');
                }
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Continue Learning &rarr;</span>
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className="px-5 py-3.5 rounded-2xl bg-transparent hover:bg-stone-800/50 text-stone-300 hover:text-white border border-stone-700 font-semibold text-sm transition-all"
            >
              View Schedule
            </button>
          </div>
        </div>

        {/* Center card (overall progress) */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#1a1110] border border-stone-800/60 shadow-xl flex flex-col items-center justify-center relative">
          <div className="absolute top-6 left-6 text-stone-400 text-sm font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> Overall
          </div>
          <div className="relative flex items-center justify-center mt-4">
            <svg className="w-32 h-32" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-stone-800" />
              <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-red-500 transition-all duration-1000 ease-out"
                strokeDasharray="339.292" strokeDashoffset={339.292 * (1 - (overallProgressPercentage || 0) / 100)}
                strokeLinecap="round" transform="rotate(-90 60 60)" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{overallProgressPercentage || 0}%</span>
            </div>
          </div>
          <p className="text-stone-400 text-sm mt-4 font-medium">
            {Math.min(9, Math.ceil(((overallProgressPercentage || 0) / 100) * 9))} of 9 subjects on track
          </p>
        </div>

        {/* Right card (user profile) */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#1a1110] border border-stone-800/60 shadow-xl flex flex-col space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
              A
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AKHILESWAR T A</h3>
              <div className="flex items-center gap-1.5 text-stone-400 text-xs font-medium mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Student
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#2a1f1e]/50 rounded-xl p-2 text-center">
              <div className="text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">Subjects</div>
              <div className="text-white font-bold">9</div>
            </div>
            <div className="bg-[#2a1f1e]/50 rounded-xl p-2 text-center">
              <div className="text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">Progress</div>
              <div className="text-white font-bold">{overallProgressPercentage}%</div>
            </div>
            <div className="bg-[#2a1f1e]/50 rounded-xl p-2 text-center">
              <div className="text-stone-400 text-[10px] uppercase font-bold tracking-wider mb-1">Certs</div>
              <div className="text-white font-bold">0</div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-stone-800/60">
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
              <div className="text-red-400 text-[10px] uppercase font-bold tracking-wider mb-2">Featured Subject</div>
              <div className="text-white font-bold text-sm mb-2 truncate">{todayPlan.subjectNames[0] || 'Core Subject'}</div>
              <div className="w-full bg-stone-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${dayProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Three stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Enrolled Subjects */}
        <div className="p-5 rounded-2xl bg-[#1a1110] border border-stone-800/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-stone-800/50 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-stone-300" />
          </div>
          <div>
            <div className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">Enrolled Subjects</div>
            <div className="text-2xl font-black text-white">09</div>
          </div>
        </div>

        {/* Upcoming Days */}
        <div className="p-5 rounded-2xl bg-[#1a1110] border border-stone-800/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-stone-800/50 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6 text-stone-300" />
          </div>
          <div>
            <div className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">Upcoming Days</div>
            <div className="text-2xl font-black text-white">{upcomingDays}</div>
          </div>
        </div>

        {/* Topics Completed */}
        <div className="p-5 rounded-2xl bg-[#1a1110] border border-stone-800/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-stone-800/50 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-stone-300" />
          </div>
          <div>
            <div className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-1">Topics Completed</div>
            <div className="text-2xl font-black text-white">{totalTopicsCompleted}</div>
          </div>
        </div>
      </div>

      {/* Row 3: Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (7 Cols): Today's Schedule & Action Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#1a1110] border border-stone-800/60 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800/60">
              <div>
                <span className="text-xs font-bold text-red-400 tracking-wider uppercase">
                  Day {currentDay} Focus
                </span>
                <h2 className="text-xl font-black text-white mt-0.5">{todayPlan.title}</h2>
                <p className="text-xs text-stone-400 mt-1">{todayPlan.subtitle}</p>
              </div>

              {/* Progress pill for today's tasks */}
              <div className="flex items-center gap-2 bg-[#2a1f1e]/50 px-3 py-1.5 rounded-xl border border-stone-700/60 self-start sm:self-auto">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-stone-200">
                  {completedTodayTasksCount}/{todayTasks.length} Tasks
                </span>
                <span className="text-xs text-emerald-400 font-extrabold">({dayProgressPercent}%)</span>
              </div>
            </div>

            {/* Today's Subjects Tag */}
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                Today's Subjects
              </span>
              <div className="flex flex-wrap gap-2">
                {todayPlan.subjectNames.map((name, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 font-semibold text-xs flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Today's Interactive Tasks Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
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
                          ? 'bg-[#0f0a09]/80 border-stone-800/60 opacity-80'
                          : 'bg-[#2a1f1e]/40 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <button
                        onClick={() => toggleDayTask(task.id)}
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                            : 'border-stone-600 hover:border-red-400 bg-[#1a1110]'
                        }`}
                        aria-label={`Toggle task ${task.title}`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-sm font-medium leading-snug cursor-pointer ${
                              isChecked ? 'line-through text-stone-500' : 'text-stone-200'
                            }`}
                            onClick={() => toggleDayTask(task.id)}
                          >
                            {task.title}
                          </p>

                          {task.topicId && (
                            <button
                              onClick={() => onOpenTopic(task.topicId!)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white transition-all shrink-0 border border-red-500/30"
                            >
                              Study
                            </button>
                          )}
                        </div>

                        {topicMeta && (
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-400">
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
                                      : 'text-stone-400'
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
          <div className="p-6 rounded-2xl bg-[#1a1110] border border-stone-800/60 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  const firstTopic = todayTasks.find((t) => t.topicId)?.topicId;
                  if (firstTopic) onOpenTopic(firstTopic);
                  else setActiveTab('learn');
                }}
                className="p-3.5 rounded-xl bg-[#2a1f1e]/40 hover:bg-[#2a1f1e] border border-stone-800 hover:border-red-500/40 text-left transition-all group"
              >
                <GraduationCap className="w-5 h-5 text-red-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Continue Studying</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Jump to lesson</div>
              </button>

              <button
                onClick={() => setActiveTab('plan')}
                className="p-3.5 rounded-xl bg-[#2a1f1e]/40 hover:bg-[#2a1f1e] border border-stone-800 hover:border-orange-500/40 text-left transition-all group"
              >
                <Calendar className="w-5 h-5 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Today's Plan</div>
                <div className="text-[11px] text-stone-400 mt-0.5">16-Day schedule</div>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className="p-3.5 rounded-xl bg-[#2a1f1e]/40 hover:bg-[#2a1f1e] border border-stone-800 hover:border-amber-500/40 text-left transition-all group"
              >
                <Sparkles className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Practice Questions</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Take a custom quiz</div>
              </button>

              <button
                onClick={() => setActiveTab('subjects')}
                className="p-3.5 rounded-xl bg-[#2a1f1e]/40 hover:bg-[#2a1f1e] border border-stone-800 hover:border-emerald-500/40 text-left transition-all group"
              >
                <BookOpen className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">View Subjects</div>
                <div className="text-[11px] text-stone-400 mt-0.5">9 Subject Explorer</div>
              </button>

              <button
                onClick={() => setActiveTab('progress')}
                className="p-3.5 rounded-xl bg-[#2a1f1e]/40 hover:bg-[#2a1f1e] border border-stone-800 hover:border-violet-500/40 text-left transition-all group"
              >
                <BarChart className="w-5 h-5 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">View Progress</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Stats & charts</div>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className="p-3.5 rounded-xl bg-[#2a1f1e]/40 hover:bg-[#2a1f1e] border border-stone-800 hover:border-rose-500/40 text-left transition-all group"
              >
                <StickyNote className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-white">Notes</div>
                <div className="text-[11px] text-stone-400 mt-0.5">Personal notebook</div>
              </button>
            </div>
          </div>

          {/* Recent Quiz Performance Card */}
          <div className="p-6 rounded-2xl bg-[#1a1110] border border-stone-800/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Recent Quiz Performance
              </span>
              <button
                onClick={() => setActiveTab('practice')}
                className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                Take Quiz <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentQuiz ? (
              <div className="p-4 rounded-xl bg-[#2a1f1e]/40 border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{recentQuiz.subjectName}</div>
                  <div className="text-xs text-stone-400 mt-0.5">
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
                        : 'text-red-400'
                    }`}
                  >
                    {recentQuiz.scorePercentage}%
                  </div>
                  <span className="text-[10px] text-stone-400 font-semibold uppercase">Score</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#2a1f1e]/30 border border-stone-800/60 text-center py-6">
                <Sparkles className="w-8 h-8 text-stone-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-stone-300">No quizzes taken yet</p>
                <p className="text-xs text-stone-400 mt-1 mb-3">
                  Test your concepts with 10 to 75 question practice drills.
                </p>
                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-900/20"
                >
                  Start Practice Quiz
                </button>
              </div>
            )}
          </div>

          {/* Weakest Topics Alert Card */}
          <div className="p-6 rounded-2xl bg-[#1a1110] border border-stone-800/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Weakest Topics
                </span>
              </div>
              <span className="text-[11px] font-semibold text-stone-400">
                {weakTopicsList.length} flagged
              </span>
            </div>

            {weakTopicsList.length > 0 ? (
              <div className="space-y-2">
                {weakTopicsList.slice(0, 4).map((weak) => (
                  <div
                    key={weak.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#2a1f1e]/40 border border-stone-800 hover:border-stone-700 transition-all"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-stone-200 truncate">{weak.name}</p>
                      <p className="text-[11px] text-stone-400 truncate">{weak.subjectName}</p>
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
              <p className="text-xs text-stone-400 text-center py-3">
                No weak topics flagged! Keep taking practice drills to diagnose target areas.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
