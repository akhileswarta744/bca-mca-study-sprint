import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  GraduationCap,
  Sparkles,
  Zap,
  Mic,
  BarChart3,
  StickyNote,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export type NavTab =
  | 'dashboard'
  | 'plan'
  | 'subjects'
  | 'learn'
  | 'practice'
  | 'rapid-revision'
  | 'mock-interview'
  | 'progress'
  | 'notes';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { streak, overallProgressPercentage, currentDay } = useProgress();

  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'plan', label: '16-Day Plan', icon: CalendarDays, badge: `Day ${currentDay}` },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'learn', label: 'Learn', icon: GraduationCap },
    { id: 'practice', label: 'Practice', icon: Sparkles },
    { id: 'rapid-revision', label: 'Rapid Revision', icon: Zap },
    { id: 'mock-interview', label: 'Mock Interview', icon: Mic },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'notes', label: 'Notes', icon: StickyNote },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#130e0d] border-r border-stone-800/80 p-4 shrink-0 select-none">
      {/* Brand Header */}
      <div className="px-3 py-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-orange-400 flex items-center justify-center shadow-lg shadow-red-500/20 text-white font-black text-lg">
            Σ
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight leading-none">
              BCA <span className="text-red-400">→</span> MCA
            </h1>
            <p className="text-[11px] font-semibold text-stone-400 mt-1 uppercase tracking-wider">
              16-Day Study Sprint
            </p>
          </div>
        </div>
      </div>

      {/* Streak & Overall Progress Pill */}
      <div className="mx-2 mb-5 p-3 rounded-xl bg-stone-900/90 border border-stone-800 shadow-inner">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-1.5 font-bold text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
            {streak.count} Day Streak
          </span>
          <span className="text-stone-400 font-medium">Day {currentDay}/16</span>
        </div>
        <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-500 to-orange-400 h-full transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(overallProgressPercentage, 4)}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-stone-400 font-medium mt-1.5">
          <span>Sprint Completion</span>
          <span className="text-red-300 font-bold">{overallProgressPercentage}%</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-red-600/15 text-red-300 border border-red-500/30 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-red-400' : 'text-stone-400 group-hover:text-stone-200'
                  }`}
                />
                <span className={isActive ? 'font-semibold text-white' : ''}>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-red-500 text-white'
                      : 'bg-stone-800 text-stone-400 group-hover:bg-stone-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Target Focus Notice */}
      <div className="mt-4 pt-3 border-t border-stone-800/80 px-2 text-[11px] text-stone-400">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Core CS Scope Active</span>
        </div>
        <p className="leading-snug text-stone-400">
          9 Subjects: 3 Core Computer + 6 Additional BCA Core Revision.
        </p>
      </div>
    </aside>
  );
};
