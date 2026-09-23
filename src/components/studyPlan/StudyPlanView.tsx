import React, { useState } from 'react';
import {
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Check,
  FileText
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
  const [expandedDay, setExpandedDay] = useState<number>(0);
  const [selectedModuleDay, setSelectedModuleDay] = useState<number | null>(null);

  if (selectedModuleDay !== null) {
    const moduleDay = STUDY_DAYS.find(d => d.day === selectedModuleDay);
    if (moduleDay) {
      return (
        <div className="space-y-6 max-w-5xl mx-auto pb-16">
          <button 
            onClick={() => setSelectedModuleDay(null)} 
            className="text-stone-400 hover:text-white flex items-center gap-2 text-sm mb-4"
          >
            ← Back to modules
          </button>
          
          <div className="bg-[#1a1110] border border-stone-800/60 rounded-3xl p-6 md:p-8 mb-8">
             <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Day {moduleDay.day}: {moduleDay.title}</h1>
             <button 
               onClick={() => {
                 const firstTopic = moduleDay.tasks.find(t => t.topicId);
                 if (firstTopic) onOpenTopic(firstTopic.topicId!);
               }}
               className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl flex items-center gap-2 transition-colors"
             >
                Continue learning <ArrowRight className="w-4 h-4" />
             </button>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Module lessons</h3>
          <div className="border border-stone-800/60 rounded-2xl overflow-hidden bg-stone-900/40">
            {moduleDay.tasks.filter(t => t.topicId).map((task, idx) => (
              <div 
                key={task.id} 
                onClick={() => onOpenTopic(task.topicId!)} 
                className="flex items-center justify-between p-4 border-b border-stone-800/40 hover:bg-stone-800/40 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-light text-stone-600">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{task.title}</h4>
                    <p className="text-xs text-stone-400">1 lesson</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-600" />
              </div>
            ))}
            
            {/* Module Quiz section */}
            <div className="border-t border-stone-800/60 mt-2">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-red-500">Q</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Module quiz</h4>
                    <p className="text-xs text-stone-400">1 quiz</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 bg-stone-900/40 mx-4 mb-4 rounded-xl border border-stone-800/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-stone-500">Q</span>
                  <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-red-500" />
                  </span>
                  <span className="text-sm text-stone-300 font-medium">Quiz for Day {moduleDay.day}</span>
                </div>
                <button 
                  onClick={onOpenPractice} 
                  className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
                >
                  Take Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide mb-2">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>16-DAY SPRINT ROADMAP</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              16-Day Intensive Curriculum
            </h1>
            <p className="text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Strictly structured Day 1 through Day 16 covering all Core Computer section
              foundations and Additional BCA Core Revision essentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPractice}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Practice Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {STUDY_DAYS.map((dayItem) => {
          const completedCount = dayItem.tasks.filter((t) => !!dayTasksCompleted[t.id]).length;
          const percent = dayItem.tasks.length > 0 ? Math.round((completedCount / dayItem.tasks.length) * 100) : 0;
          const isExpanded = expandedDay === dayItem.day;

          return (
            <div key={dayItem.day} className="border border-stone-800/60 bg-stone-900/40 rounded-2xl overflow-hidden transition-all hover:border-stone-700">
              {/* Day Header */}
              <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpandedDay(isExpanded ? 0 : dayItem.day)}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1a1110] text-stone-400 flex items-center justify-center font-bold text-sm border border-stone-800/60 shadow-inner shrink-0">
                    {dayItem.day}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white mb-0.5">{dayItem.title}</h3>
                    <p className="text-xs text-stone-400">{dayItem.tasks.length} parts · {dayItem.tasks.length} topics · 1 quiz</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Progress bar */}
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{width: `${percent}%`}} />
                    </div>
                    <span className="text-xs text-stone-400 font-medium w-8">{percent}%</span>
                  </div>
                  
                  {/* Toggle */}
                  <div className="text-xs font-medium text-stone-400 hover:text-white transition-colors hidden sm:block">
                    {isExpanded ? '▽ Hide parts' : '▷ Show parts'}
                  </div>
                  
                  {/* Red arrow CTA */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedModuleDay(dayItem.day); }}
                    className="w-9 h-9 rounded-xl bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors shadow-md shadow-red-500/20 shrink-0"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Collapsed Topic List */}
              {isExpanded && (
                <div className="border-t border-stone-800/60 bg-stone-900/20 py-2">
                  {dayItem.tasks.map(task => {
                    const isCompleted = !!dayTasksCompleted[task.id];
                    return (
                      <div 
                        key={task.id} 
                        onClick={(e) => { e.stopPropagation(); toggleDayTask(task.id); }}
                        className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-stone-800/40 transition-colors"
                      >
                        <div className="flex items-center gap-3.5">
                          {isCompleted ? (
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/20">
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-stone-700 shrink-0" />
                          )}
                          <div>
                            <span className={`text-sm font-medium transition-colors ${isCompleted ? 'text-stone-300' : 'text-white'}`}>
                              {task.title}
                            </span>
                            <span className="text-[11px] text-stone-500 block mt-0.5">☐ 1 lesson</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="hidden sm:flex items-center gap-2">
                            <div className="w-16 h-1 bg-stone-800 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full transition-all duration-300" style={{width: isCompleted ? '100%' : '0%'}} />
                            </div>
                            <span className="text-xs text-stone-500 font-medium w-8 text-right">
                              {isCompleted ? '100%' : '0%'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
