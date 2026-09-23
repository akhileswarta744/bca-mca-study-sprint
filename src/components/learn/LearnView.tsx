import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCode2,
  HelpCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  StickyNote,
  Code,
  Terminal,
  Check,
  Zap,
} from 'lucide-react';
import { TOPICS_META, SUBJECTS } from '../../data/subjectsData';
import { getTopicContent } from '../../data/learningContent';
import { useProgress } from '../../context/ProgressContext';
import { TopicStatus } from '../../types';

interface LearnViewProps {
  initialTopicId?: string;
  onOpenNotesWithTopic: (topicId: string, title: string) => void;
  onOpenPractice: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  initialTopicId,
  onOpenNotesWithTopic,
  onOpenPractice,
}) => {
  const { topicStatus, updateTopicStatus, saveNote } = useProgress();

  // Selected topic ID
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialTopicId || TOPICS_META[0].id
  );

  // Quick practice state
  const [selectedPracticeAnswers, setSelectedPracticeAnswers] = useState<Record<string, number>>({});
  const [showPracticeExplanations, setShowPracticeExplanations] = useState<Record<string, boolean>>({});
  const [savedNoteNotification, setSavedNoteNotification] = useState(false);
  const [statusSaveToast, setStatusSaveToast] = useState<string | null>(null);

  // Sync if prop changes
  React.useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
    }
  }, [initialTopicId]);

  const currentTopicMeta = TOPICS_META.find((t) => t.id === selectedTopicId) || TOPICS_META[0];
  const currentSubject = SUBJECTS.find((s) => s.id === currentTopicMeta.subjectId);
  const currentStatus: TopicStatus = topicStatus[currentTopicMeta.id] || 'not_started';

  const content = getTopicContent(currentTopicMeta.id);

  // Topic index for Prev/Next
  const currentIndex = TOPICS_META.findIndex((t) => t.id === currentTopicMeta.id);
  const prevTopic = currentIndex > 0 ? TOPICS_META[currentIndex - 1] : null;
  const nextTopic = currentIndex < TOPICS_META.length - 1 ? TOPICS_META[currentIndex + 1] : null;

  const handlePracticeOptionClick = (questionId: string, optionIndex: number) => {
    setSelectedPracticeAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowPracticeExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleStatusChange = (newStatus: TopicStatus) => {
    updateTopicStatus(currentTopicMeta.id, newStatus);
    const label = newStatus === 'completed' ? 'Completed ✓' : newStatus === 'in_progress' ? 'In Progress ⏳' : 'Not Started';
    setStatusSaveToast(`Progress Saved: Marked as ${label}`);
    setTimeout(() => setStatusSaveToast(null), 3000);
  };

  const handleCompleteAndNext = () => {
    updateTopicStatus(currentTopicMeta.id, 'completed');
    setStatusSaveToast('Topic marked as Completed! Saved to your progress.');
    setTimeout(() => {
      setStatusSaveToast(null);
      if (nextTopic) {
        setSelectedTopicId(nextTopic.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 600);
  };

  const handleQuickSaveNote = () => {
    if (!content) return;
    saveNote({
      subjectId: currentTopicMeta.subjectId,
      topicId: currentTopicMeta.id,
      title: `${currentTopicMeta.name} - Quick Revision Note`,
      content: `# ${currentTopicMeta.name}\n\n## What is it?\n${content.whatIsIt}\n\n## Key Concepts\n${content.keyConcepts.map((c) => `- ${c}`).join('\n')}\n\n## Quick Revision\n${content.quickRevision.map((r) => `- ${r}`).join('\n')}`,
      isPinned: false,
      tags: [currentSubject?.name || 'Computer Science', 'Revision'],
    });
    setSavedNoteNotification(true);
    setTimeout(() => setSavedNoteNotification(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Toast Alert for Status & Note Saving */}
      {(statusSaveToast || savedNoteNotification) && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/30 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-slate-950" />
          <span>{statusSaveToast || 'Saved to your personal notes!'}</span>
        </div>
      )}

      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="bg-slate-950 text-white font-bold text-sm px-3.5 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 max-w-xs md:max-w-md truncate"
            aria-label="Select study topic"
          >
            {TOPICS_META.map((t) => (
              <option key={t.id} value={t.id} className="bg-slate-900 text-slate-200">
                Day {t.dayNumber}: {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Selector Buttons & Save Note Action */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => handleStatusChange('not_started')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentStatus === 'not_started'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Not Started
            </button>
            <button
              onClick={() => handleStatusChange('in_progress')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                currentStatus === 'in_progress'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>In Progress</span>
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                currentStatus === 'completed'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              <Check className="w-3 h-3" />
              <span>Completed</span>
            </button>
          </div>

          <button
            onClick={handleQuickSaveNote}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            title="Save quick summary to your personal notes"
          >
            <StickyNote className="w-3.5 h-3.5 text-rose-400" />
            <span>{savedNoteNotification ? 'Saved to Notes!' : 'Save Note'}</span>
          </button>
        </div>
      </div>

      {/* Main Topic Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            {currentSubject?.name}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-semibold">
            Day {currentTopicMeta.dayNumber}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-semibold capitalize">
            {currentTopicMeta.difficulty} Difficulty
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-semibold">
            ~{currentTopicMeta.estimatedMinutes} mins
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
          {currentTopicMeta.name}
        </h1>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {currentTopicMeta.keywords.map((kw, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-xs text-slate-400"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {content ? (
        <div className="space-y-6">
          {/* SECTION 1: What is it? */}
          <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">
                1
              </span>
              <span>What is it?</span>
            </div>
            <p className="text-base text-slate-200 font-medium leading-relaxed">
              {content.whatIsIt}
            </p>
          </section>

          {/* SECTION 2 & 3: Simple Explanation vs Technical Depth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SECTION 2: Simple Explanation (Analogy) */}
            <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/20 border border-indigo-500/20 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">
                  2
                </span>
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Simple Explanation & Analogy</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{content.simpleExplanation}</p>
            </section>

            {/* SECTION 3: Technical Explanation */}
            <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/20 border border-cyan-500/20 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[11px]">
                  3
                </span>
                <BookOpen className="w-3.5 h-3.5" />
                <span>Technical Explanation</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{content.technicalExplanation}</p>
            </section>
          </div>

          {/* SECTION 4: Important Definitions */}
          <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">
                4
              </span>
              <span>Important Definitions & Terminology</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.importantDefinitions.map((def, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1"
                >
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="text-indigo-400">•</span> {def.term}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-3.5">{def.definition}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: Key Concepts */}
          <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">
                5
              </span>
              <span>Key Concepts & Principles</span>
            </div>
            <ul className="space-y-2.5">
              {content.keyConcepts.map((concept, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-850 text-sm text-slate-200"
                >
                  <span className="w-5 h-5 rounded-md bg-indigo-500/15 text-indigo-300 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-snug">{concept}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* SECTION 6: Practical Example (Code / SQL / Diagram / Output) */}
          <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">
                  6
                </span>
                <FileCode2 className="w-3.5 h-3.5" />
                <span>Example: {content.example.title}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 uppercase">
                {content.example.type}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{content.example.explanation}</p>

            {/* Code / SQL snippet block */}
            {content.example.code && (
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#070b12] text-xs">
                <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-slate-400 font-mono text-[11px]">
                  <span>{content.example.language || 'code'}</span>
                  <span>Syntax</span>
                </div>
                <pre className="p-4 overflow-x-auto text-emerald-300 font-mono leading-relaxed">
                  <code>{content.example.code}</code>
                </pre>
              </div>
            )}

            {/* ASCII Diagram representation */}
            {content.example.diagramAscii && (
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#070b12] text-xs">
                <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                  Visual Architecture Representation
                </div>
                <pre className="p-4 overflow-x-auto text-cyan-300 font-mono leading-tight whitespace-pre">
                  {content.example.diagramAscii}
                </pre>
              </div>
            )}

            {/* Execution Output */}
            {content.example.output && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Output / Result:
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {content.example.output}
                </pre>
              </div>
            )}
          </section>

          {/* SECTION 7: Common Interview Questions */}
          <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">
                7
              </span>
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Interview Questions</span>
            </div>
            <div className="space-y-3">
              {content.commonInterviewQuestions.map((iq, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2"
                >
                  <h4 className="text-sm font-bold text-white flex items-start gap-2">
                    <span className="text-indigo-400 font-mono font-bold shrink-0">Q{i + 1}:</span>
                    <span>{iq.question}</span>
                  </h4>
                  <div className="text-xs text-slate-300 pl-6 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-850">
                    <strong className="text-indigo-300 block mb-1">Model Answer:</strong>
                    {iq.answer}
                  </div>
                  {iq.tips && (
                    <p className="text-[11px] text-amber-300/80 pl-6 italic">Tip: {iq.tips}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: Common Mistakes */}
          <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-[11px]">
                8
              </span>
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Common Pitfalls & Mistakes</span>
            </div>
            <div className="space-y-3">
              {content.commonMistakes.map((mis, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-rose-950/15 border border-rose-500/20 space-y-1.5"
                >
                  <div className="text-xs font-bold text-rose-300 flex items-center gap-2">
                    <span>Common Trap:</span>
                    <span className="text-slate-200 font-medium">{mis.mistake}</span>
                  </div>
                  <div className="text-xs text-emerald-300 flex items-start gap-2">
                    <span className="font-bold shrink-0">Correct Concept:</span>
                    <span>{mis.correction}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    <strong>Why it happens:</strong> {mis.why}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 9: Quick Revision Recap */}
          <section className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">
                9
              </span>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>60-Second Quick Revision Recap</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {content.quickRevision.map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 10: In-Topic Practice Questions */}
          <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">
                  10
                </span>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Concept Check: Practice Questions</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                PRACTICE QUESTION
              </span>
            </div>

            <div className="space-y-4">
              {content.practiceQuestions.map((q, qIndex) => {
                const selectedOpt = selectedPracticeAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = isAnswered && selectedOpt === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white leading-snug">
                        <span className="text-indigo-400 mr-1.5">Q{qIndex + 1}.</span>
                        {q.question}
                      </h4>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0 uppercase">
                        PRACTICE QUESTION
                      </span>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selectedOpt === optIdx;
                        const isThisCorrect = optIdx === q.correctOptionIndex;

                        let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700';
                        if (isAnswered) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-semibold';
                          } else if (isThisSelected) {
                            btnStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-200 font-semibold';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handlePracticeOptionClick(q.id, optIdx)}
                            disabled={isAnswered}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && isThisCorrect && (
                              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Detailed Answer Explanation */}
                    {showPracticeExplanations[q.id] && (
                      <div
                        className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                          isCorrect
                            ? 'bg-emerald-950/20 border border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-950/20 border border-rose-500/30 text-slate-300'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          {isCorrect ? (
                            <span className="text-emerald-400">✓ Correct!</span>
                          ) : (
                            <span className="text-rose-400">✗ Incorrect.</span>
                          )}
                          <span className="text-slate-400 font-normal">
                            Correct Answer: {q.options[q.correctOptionIndex]}
                          </span>
                        </div>
                        <p className="leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Topic Completion Action Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-sm font-bold text-white">Finished revising this topic?</span>
                {currentStatus === 'completed' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    Completed ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Mark it completed to update your 16-day syllabus streak and syllabus coverage.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {currentStatus !== 'completed' ? (
                <button
                  onClick={handleCompleteAndNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Completed {nextTopic ? '& Next Topic' : ''}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-emerald-400">Saved to Progress!</span>
                  <button
                    onClick={() => handleStatusChange('in_progress')}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
                  >
                    Reopen Topic
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-indigo-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Syllabus Topic Overview</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Review key concepts, definitions, and practice questions for this topic.
          </p>
        </div>
      )}

      {/* Footer Navigation: Previous & Next Topic */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        {prevTopic ? (
          <button
            onClick={() => setSelectedTopicId(prevTopic.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous:</span>
            <span className="truncate max-w-[150px]">{prevTopic.name}</span>
          </button>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <button
            onClick={() => setSelectedTopicId(nextTopic.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all ml-auto"
          >
            <span className="hidden sm:inline">Next:</span>
            <span className="truncate max-w-[150px]">{nextTopic.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
