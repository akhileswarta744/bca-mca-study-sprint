import React, { useState } from 'react';
import {
  Zap,
  BookOpen,
  ArrowRightLeft,
  AlertTriangle,
  HelpCircle,
  Code,
  Search,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';
import { RAPID_REVISION_DATA } from '../../data/rapidRevisionData';
import { SUBJECTS } from '../../data/subjectsData';

export const RapidRevisionView: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('operating-systems');
  const [searchQuery, setSearchQuery] = useState('');

  const currentSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0];
  const revisionData = RAPID_REVISION_DATA[selectedSubjectId] || RAPID_REVISION_DATA['operating-systems'];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>HIGH-YIELD CHEAT SHEETS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Rapid Revision Center
          </h1>
          <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
            Quickly recap high-frequency one-line definitions, crucial distinction matrices, and common
            examination pitfalls across all 9 computer science subjects.
          </p>
        </div>
      </div>

      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SUBJECTS.map((sub) => {
          const isSelected = selectedSubjectId === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/25 scale-[1.02]'
                  : 'bg-stone-900/90 text-stone-400 hover:text-stone-200 border-stone-800 hover:border-stone-700'
              }`}
            >
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* Current Subject Badge & Category */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Revising:
          </span>
          <span className="text-sm font-extrabold text-white">{currentSubject.name}</span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              currentSubject.category === 'core-computer'
                ? 'bg-red-500/15 text-red-300 border border-red-500/30'
                : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
            }`}
          >
            {currentSubject.categoryLabel}
          </span>
        </div>
      </div>

      {/* 1. CRITICAL DIFFERENCES (High-Yield Comparison Tables) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-red-300 uppercase tracking-wider">
          <ArrowRightLeft className="w-4 h-4 text-red-400" />
          <span>Crucial Difference Comparisons</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {revisionData.importantDifferences.map((diff, idx) => (
            <div
              key={idx}
              className="p-5 md:p-6 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-stone-800">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span className="text-orange-300">{diff.conceptA}</span>
                  <span className="text-stone-400 text-xs font-normal">vs</span>
                  <span className="text-amber-300">{diff.conceptB}</span>
                </h3>
                <span className="text-xs text-stone-400 font-medium">{diff.summary}</span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-800 text-stone-400 font-bold uppercase tracking-wider">
                      <th className="py-2.5 pr-4 w-1/4">Aspect</th>
                      <th className="py-2.5 px-4 w-3/8 text-orange-300">{diff.conceptA}</th>
                      <th className="py-2.5 pl-4 w-3/8 text-amber-300">{diff.conceptB}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60">
                    {diff.points.map((pt, pIdx) => (
                      <tr key={pIdx} className="hover:bg-stone-800/40 transition-colors">
                        <td className="py-3 pr-4 font-semibold text-stone-300">{pt.aspect}</td>
                        <td className="py-3 px-4 text-stone-200">{pt.a}</td>
                        <td className="py-3 pl-4 text-stone-200">{pt.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ONE-LINE DEFINITIONS GRID */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-300 uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>High-Yield One-Line Definitions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {revisionData.oneLineDefinitions.map((def, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 hover:border-stone-700 transition-all space-y-1.5"
            >
              <h4 className="text-xs font-extrabold text-red-300 uppercase tracking-wider">
                {def.term}
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">{def.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. IMPORTANT CONCEPTS & COMMON MISTAKES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Important Concepts */}
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-bold text-red-300 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-red-400" />
            <span>Important Concepts & Laws</span>
          </div>

          <div className="space-y-4">
            {revisionData.importantConcepts.map((conc, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {conc.title}
                </h4>
                <ul className="space-y-1 text-xs text-stone-300">
                  {conc.points.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Common Interview Questions & Pitfalls */}
        <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-bold text-rose-300 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Common Pitfalls & Rapid Q&A</span>
          </div>

          <div className="space-y-3">
            {/* Common Mistakes */}
            {revisionData.commonMistakes.map((mis, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-rose-950/15 border border-rose-500/20 text-xs space-y-1"
              >
                <div className="font-bold text-rose-300">Trap: {mis.trap}</div>
                <div className="text-emerald-300">Fix: {mis.fix}</div>
              </div>
            ))}

            {/* Common Interview Q&A */}
            {revisionData.commonInterviewQuestions.map((qa, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 text-xs space-y-1"
              >
                <div className="font-bold text-red-300">Q: {qa.q}</div>
                <div className="text-stone-300 leading-relaxed">A: {qa.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
