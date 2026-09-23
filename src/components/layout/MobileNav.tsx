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
  X,
  Flame,
} from 'lucide-react';
import { NavTab } from './Sidebar';
import { useProgress } from '../../context/ProgressContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) => {
  const { streak, currentDay, overallProgressPercentage } = useProgress();

  const navItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'plan', label: '16-Day Plan', icon: CalendarDays },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'learn', label: 'Learn', icon: GraduationCap },
    { id: 'practice', label: 'Practice', icon: Sparkles },
    { id: 'rapid-revision', label: 'Rapid Revision', icon: Zap },
    { id: 'mock-interview', label: 'Mock Interview', icon: Mic },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'notes', label: 'Notes', icon: StickyNote },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-[#0c121e] border-r border-slate-800 p-5 flex flex-col h-full z-10 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
              Σ
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">BCA → MCA Sprint</h2>
              <p className="text-[10px] text-slate-400">16-Day Intensive Prep</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats in Mobile Drawer */}
        <div className="py-3 my-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <div className="flex justify-between items-center text-amber-400 font-bold mb-1.5">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              {streak.count} Day Streak
            </span>
            <span className="text-slate-400">Day {currentDay}/16</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: `${overallProgressPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Completion: <strong className="text-white">{overallProgressPercentage}%</strong>
          </p>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1 overflow-y-auto mt-2 pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
