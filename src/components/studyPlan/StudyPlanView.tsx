import React, { useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
  Flame,
  Sparkles,
  Check,
  Target,
} from 'lucide-react';
import { STUDY_DAYS } from '../../data/studyPlanData';
import { useProgress } from '../../context/ProgressContext';
import { TOPICS_META } from '../../data/subjectsData';

interface StudyPlanViewProps {
  onOpenTopic: (topicId: string) => void;
  onOpenPractice: () => void;
}

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({
  onOpenTopic,
  onOpenPractice,
}) => {
  const { currentDay, setCurrentDay, dayTasksCompleted, toggleDayTask } = useProgress();
  const [expandedDay, setExpandedDay] = useState<number>(currentDay);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide mb-2">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>16-DAY SPRINT ROADMAP</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              16-Day Intensive Curriculum
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Strictly structured Day 1 through Day 16 covering all Core Computer section
              foundations and Additional BCA Core Revision essentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPractice}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Practice Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Days List / Accordion Timeline */}
      <div className="space-y-4">
        {STUDY_DAYS.map((dayItem) => {
          const isCurrent = dayItem.day === currentDay;
          const isExpanded = expandedDay === dayItem.day;
          const completedCount = dayItem.tasks.filter((t) => !!dayTasksCompleted[t.id]).length;
          const isFullyDone = completedCount === dayItem.tasks.length;

          return (
            <div
              key={dayItem.day}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isCurrent
                  ? 'bg-slate-900/90 border-indigo-500/50 shadow-xl shadow-indigo-950/20 ring-1 ring-indigo-500/30'
                  : isFullyDone
                  ? 'bg-slate-900/40 border-slate-800/60'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Day Header */}
              <div
                onClick={() => setExpandedDay(isExpanded ? 0 : dayItem.day)}
                className="p-5 flex items-center justify-between cursor-pointer select-none gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Day Number Badge */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black shrink-0 transition-colors ${
                      isFullyDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isCurrent
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] font-extrabold tracking-tighter uppercase leading-none text-slate-400">
                      DAY
                    </span>
                    <span className="text-lg leading-none mt-0.5">{dayItem.day}</span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base md:text-lg font-bold text-white truncate">
                        {dayItem.title}
                      </h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-extrabold uppercase">
                          Active Today
                        </span>
                      )}
                      {isFullyDone && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase flex items-center gap-1">
                          <Check className="w-3 h-3" /> Done
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{dayItem.subtitle}</p>
                  </div>
                </div>

                {/* Right controls: Task progress & expand icon */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-slate-200">
                      {completedCount} / {dayItem.tasks.length}
                    </span>
                    <span className="text-[11px] text-slate-400 block">Tasks Complete</span>
                  </div>

                  <button
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="Toggle day details"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-5 animate-fadeIn">
                  {/* Summary & Goals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Day Overview
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">{dayItem.summary}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {dayItem.subjectNames.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Key Learning Goals
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {dayItem.learningGoals.map((goal, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-indigo-400 font-bold shrink-0">•</span>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tasks Checklist */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Curriculum Tasks ({completedCount}/{dayItem.tasks.length} Completed)
                      </span>
                      {!isCurrent && (
                        <button
                          onClick={() => setCurrentDay(dayItem.day)}
                          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          Set as Current Study Day →
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {dayItem.tasks.map((task) => {
                        const isChecked = !!dayTasksCompleted[task.id];
                        const meta = task.topicId ? TOPICS_META.find((t) => t.id === task.topicId) : null;

                        return (
                          <div
                            key={task.id}
                            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                              isChecked
                                ? 'bg-slate-900/30 border-slate-800/60 opacity-80'
                                : 'bg-slate-850/70 border-slate-750 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <button
                                onClick={() => toggleDayTask(task.id)}
                                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                                  isChecked
                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                    : 'border-slate-600 hover:border-indigo-400 bg-slate-900'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5" />}
                              </button>

                              <div className="min-w-0">
                                <span
                                  onClick={() => toggleDayTask(task.id)}
                                  className={`text-sm font-medium cursor-pointer ${
                                    isChecked ? 'line-through text-slate-400' : 'text-slate-200'
                                  }`}
                                >
                                  {task.title}
                                </span>
                                {meta && (
                                  <div className="text-[11px] text-slate-400 mt-0.5">
                                    <span>~{meta.estimatedMinutes} mins</span>
                                    <span className="mx-1.5">•</span>
                                    <span className="capitalize">{meta.difficulty}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {task.topicId && (
                              <button
                                onClick={() => onOpenTopic(task.topicId!)}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all shrink-0 flex items-center gap-1"
                              >
                                <span>Study</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
