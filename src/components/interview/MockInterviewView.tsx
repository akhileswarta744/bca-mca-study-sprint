import React, { useState } from 'react';
import {
  Mic,
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Filter,
  Check,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { MOCK_INTERVIEW_DATA } from '../../data/mockInterviewData';
import { useProgress } from '../../context/ProgressContext';
import { InterviewCategory, InterviewRating } from '../../types';

export const MockInterviewView: React.FC = () => {
  const { interviewRatings, rateInterviewQuestion } = useProgress();

  const [selectedCategory, setSelectedCategory] = useState<'all' | InterviewCategory>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const categories: { id: 'all' | InterviewCategory; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'bca-fundamentals', label: 'BCA Fundamentals' },
    { id: 'java', label: 'Java' },
    { id: 'python', label: 'Python' },
    { id: 'dbms', label: 'DBMS' },
    { id: 'sql', label: 'SQL' },
    { id: 'os', label: 'Operating Systems' },
    { id: 'ds', label: 'Data Structures' },
    { id: 'networks', label: 'Computer Networks' },
    { id: 'software-engineering', label: 'Software Engineering' },
    { id: 'project', label: 'Project Questions' },
  ];

  const filteredQuestions = MOCK_INTERVIEW_DATA.filter((q) => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Readiness calculation
  const totalQuestions = MOCK_INTERVIEW_DATA.length;
  const masteredCount = Object.values(interviewRatings).filter((r) => r === 'mastered').length;
  const reviewCount = Object.values(interviewRatings).filter((r) => r === 'review').length;
  const readinessPercent = Math.round((masteredCount / totalQuestions) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
              <Mic className="w-3.5 h-3.5" />
              <span>MCA ADMISSIONS & TECHNICAL ROUNDS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Mock Technical Interview
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Real-world technical interview questions categorized across all 9 subjects,
              including architecture follow-ups and project defense scenarios.
            </p>
          </div>

          {/* Readiness Gauge */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-4 shrink-0 shadow-inner">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-lg">
              {readinessPercent}%
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Interview Readiness
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {masteredCount} Mastered • {reviewCount} Need Review
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((item, index) => {
          const isRevealed = !!revealedAnswers[item.id];
          const rating = interviewRatings[item.id];

          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-750 transition-all space-y-4 shadow-lg"
            >
              {/* Question Header & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold">
                    {item.categoryName}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-semibold">
                    {item.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      item.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : item.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {item.difficulty}
                  </span>
                </div>

                {/* Self-Rating Status Badge if rated */}
                {rating && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1 ${
                      rating === 'mastered'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : rating === 'review'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {rating === 'mastered' && <Check className="w-3 h-3" />}
                    {rating === 'review' && <AlertCircle className="w-3 h-3" />}
                    {rating === 'struggled' && <XCircle className="w-3 h-3" />}
                    {rating}
                  </span>
                )}
              </div>

              {/* Question Prompt */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {item.question}
                </h3>
                {item.context && (
                  <p className="text-xs text-slate-400 mt-1 italic">Context: {item.context}</p>
                )}
              </div>

              {/* Show Answer Action Button */}
              <div className="pt-1">
                <button
                  onClick={() => toggleReveal(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isRevealed
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                  }`}
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Answer</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show Answer</span>
                    </>
                  )}
                </button>
              </div>

              {/* Hidden Answer Content (Revealed after clicking "Show Answer") */}
              {isRevealed && (
                <div className="pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
                  {/* Model Answer */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                      Model Technical Answer
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {item.modelAnswer}
                    </p>
                  </div>

                  {/* Key Points To Mention */}
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850 space-y-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                      Key Points Interviewers Listen For:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {item.keyPointsToMention.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Follow-up question if present */}
                  {item.followUpQuestion && (
                    <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1.5 text-xs">
                      <span className="font-bold text-indigo-300 block">
                        Interviewer Follow-up: {item.followUpQuestion}
                      </span>
                      <p className="text-slate-300 leading-relaxed">{item.followUpAnswer}</p>
                    </div>
                  )}

                  {/* Self Assessment Rating Buttons */}
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Self Assessment:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => rateInterviewQuestion(item.id, 'mastered')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                          rating === 'mastered'
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-emerald-500/50'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mastered</span>
                      </button>

                      <button
                        onClick={() => rateInterviewQuestion(item.id, 'review')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                          rating === 'review'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-amber-500/50'
                        }`}
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Needs Review</span>
                      </button>

                      <button
                        onClick={() => rateInterviewQuestion(item.id, 'struggled')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                          rating === 'struggled'
                            ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-rose-500/50'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Struggled</span>
                      </button>
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
