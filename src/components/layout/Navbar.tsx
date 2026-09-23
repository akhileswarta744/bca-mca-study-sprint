import React from 'react';
import { Flame, Menu, Sparkles, ChevronRight, BookMarked } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { NavTab } from './Sidebar';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileMenu,
}) => {
  const { currentDay, setCurrentDay, streak } = useProgress();

  const getTabTitle = (tab: NavTab): string => {
    switch (tab) {
      case 'dashboard':
        return 'Study Sprint Cockpit';
      case 'plan':
        return '16-Day Intensive Curriculum';
      case 'subjects':
        return 'Subject Explorer';
      case 'learn':
        return 'Interactive Learning System';
      case 'practice':
        return 'Practice & Mock Testing';
      case 'rapid-revision':
        return 'Rapid Revision & Cheat Sheets';
      case 'mock-interview':
        return 'Technical Mock Interview';
      case 'progress':
        return 'Analytics & Mastery Tracker';
      case 'notes':
        return 'Personal Study Notes';
      default:
        return 'BCA → MCA Sprint';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-[#0f0a09]/90 backdrop-blur-md border-b border-stone-800/80">
      {/* Mobile Drawer Button & Current Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex text-xs font-semibold px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
            Sprint
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            {getTabTitle(activeTab)}
          </h2>
        </div>
      </div>

      {/* Right Controls: Day selector, streak, quick practice */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Day Selector Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-medium text-stone-300">
          <span className="text-stone-400 hidden sm:inline">Active:</span>
          <select
            value={currentDay}
            onChange={(e) => setCurrentDay(Number(e.target.value))}
            className="bg-transparent text-red-300 font-bold focus:outline-none cursor-pointer"
            aria-label="Select study day"
          >
            {Array.from({ length: 16 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d} className="bg-stone-900 text-stone-200">
                Day {d}
              </option>
            ))}
          </select>
        </div>

        {/* Streak Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-300">
          <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{streak.count}d</span>
        </div>

        {/* Quick Practice button */}
        <button
          onClick={() => setActiveTab('practice')}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-xs font-semibold shadow-md shadow-red-600/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Practice</span>
        </button>
      </div>
    </header>
  );
};
