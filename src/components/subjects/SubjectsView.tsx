import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
  Circle,
} from 'lucide-react';
import { SUBJECTS, TOPICS_META } from '../../data/subjectsData';
import { useProgress } from '../../context/ProgressContext';
import { TopicStatus, SubjectCategory } from '../../types';

interface SubjectsViewProps {
  onOpenTopic: (topicId: string) => void;
  onOpenPracticeSubject: (subjectId: string) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  onOpenTopic,
  onOpenPracticeSubject,
}) => {
  const { topicStatus, updateTopicStatus, subjectProgress } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | SubjectCategory>('all');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | TopicStatus>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return TOPICS_META.filter((topic) => {
      const subject = SUBJECTS.find((s) => s.id === topic.subjectId);
      if (!subject) return false;

      // Category filter
      if (selectedCategory !== 'all' && subject.category !== selectedCategory) {
        return false;
      }

      // Subject filter
      if (selectedSubjectId !== 'all' && topic.subjectId !== selectedSubjectId) {
        return false;
      }

      // Status filter
      const currentStatus = topicStatus[topic.id] || 'not_started';
      if (statusFilter !== 'all' && currentStatus !== statusFilter) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter !== 'all' && topic.difficulty !== difficultyFilter) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = topic.name.toLowerCase().includes(query);
        const matchesKeywords = topic.keywords.some((k) => k.toLowerCase().includes(query));
        const matchesSubject = subject.name.toLowerCase().includes(query);
        if (!matchesName && !matchesKeywords && !matchesSubject) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedSubjectId, statusFilter, difficultyFilter, topicStatus]);

  const coreComputerSubjects = SUBJECTS.filter((s) => s.category === 'core-computer');
  const additionalRevisionSubjects = SUBJECTS.filter((s) => s.category === 'additional-bca-core');

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold tracking-wide">
            <BookOpen className="w-3.5 h-3.5" />
            <span>9 ACADEMIC SUBJECTS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Complete Subject Explorer
          </h1>
          <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
            Explore and track completion across all 9 computer science subjects.
            Categorized into <strong className="text-orange-300">CORE COMPUTER</strong> and{' '}
            <strong className="text-amber-300">ADDITIONAL BCA CORE REVISION</strong>.
          </p>
        </div>
      </div>

      {/* Category Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category 1: Core Computer */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-red-950/40 border border-red-500/30 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                CORE COMPUTER
              </h2>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
              CUET PG Syllabus Computer Section
            </span>
          </div>
          <p className="text-xs text-stone-300">
            Operating Systems, Data Structures & Algorithms, Digital Fundamentals.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {coreComputerSubjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(selectedSubjectId === sub.id ? 'all' : sub.id)}
                className={`text-xs px-3 py-1 rounded-lg border font-medium transition-all ${
                  selectedSubjectId === sub.id
                    ? 'bg-red-600 text-white border-red-500 shadow-sm'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-red-400'
                }`}
              >
                {sub.name} ({subjectProgress[sub.id]?.completed || 0}/{subjectProgress[sub.id]?.total || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Category 2: Additional BCA Core Revision */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/30 border border-amber-500/30 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                ADDITIONAL BCA CORE REVISION
              </h2>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Not Part of Supplied CUET PG Syllabus
            </span>
          </div>
          <p className="text-xs text-stone-300">
            DBMS, SQL, Java, Python, Computer Networks, Software Engineering.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {additionalRevisionSubjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(selectedSubjectId === sub.id ? 'all' : sub.id)}
                className={`text-xs px-3 py-1 rounded-lg border font-medium transition-all ${
                  selectedSubjectId === sub.id
                    ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-400'
                }`}
              >
                {sub.name} ({subjectProgress[sub.id]?.completed || 0}/{subjectProgress[sub.id]?.total || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Multifilter Control Bar */}
      <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-3">
        {/* Search bar input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics by keyword (e.g. semaphore, B-Tree, normal form, TCP, pointers)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-red-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-stone-400 font-semibold mr-1">Category:</span>
            {[
              { id: 'all', label: 'All Subjects' },
              { id: 'core-computer', label: 'Core Computer' },
              { id: 'additional-bca-core', label: 'Additional Revision' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Progress Status Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-stone-400 font-semibold mr-1">Status:</span>
            {[
              { id: 'all', label: 'All Status' },
              { id: 'not_started', label: 'Not Started' },
              { id: 'in_progress', label: 'In Progress' },
              { id: 'completed', label: 'Completed' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id as any)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  statusFilter === st.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
          Showing {filteredTopics.length} of {TOPICS_META.length} Topics
        </span>
        {selectedSubjectId !== 'all' && (
          <button
            onClick={() => setSelectedSubjectId('all')}
            className="text-xs font-semibold text-red-400 hover:text-red-300"
          >
            Clear Subject Filter
          </button>
        )}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => {
          const subject = SUBJECTS.find((s) => s.id === topic.subjectId);
          const currentStatus: TopicStatus = topicStatus[topic.id] || 'not_started';

          return (
            <div
              key={topic.id}
              className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 hover:bg-stone-800/80 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-3">
                {/* Subject tag & Day Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-red-400 truncate max-w-[170px]">
                    {subject?.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] font-bold text-stone-400">
                    Day {topic.dayNumber}
                  </span>
                </div>

                {/* Topic Name */}
                <h3
                  onClick={() => onOpenTopic(topic.id)}
                  className="text-base font-bold text-white group-hover:text-red-300 transition-colors cursor-pointer leading-snug"
                >
                  {topic.name}
                </h3>

                {/* Keywords tags */}
                <div className="flex flex-wrap gap-1">
                  {topic.keywords.slice(0, 3).map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-stone-950/70 border border-stone-800 text-[10px] text-stone-400"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Status Selector & Study Link */}
              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                {/* Status Toggle Menu */}
                <select
                  value={currentStatus}
                  onChange={(e) => updateTopicStatus(topic.id, e.target.value as TopicStatus)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer transition-all ${
                    currentStatus === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : currentStatus === 'in_progress'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                  aria-label="Change topic status"
                >
                  <option value="not_started" className="bg-stone-900 text-stone-300">
                    Not Started
                  </option>
                  <option value="in_progress" className="bg-stone-900 text-amber-400">
                    In Progress
                  </option>
                  <option value="completed" className="bg-stone-900 text-emerald-400">
                    Completed
                  </option>
                </select>

                <button
                  onClick={() => onOpenTopic(topic.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 transition-all flex items-center gap-1 shrink-0"
                >
                  <span>Learn</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
