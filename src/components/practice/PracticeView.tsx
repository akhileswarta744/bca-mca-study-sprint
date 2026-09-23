import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  ArrowRight,
  Filter,
  BarChart,
  Award,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRACTICE_QUESTIONS } from '../../data/practiceQuestionsData';
import { SUBJECTS, TOPICS_META } from '../../data/subjectsData';
import { useProgress } from '../../context/ProgressContext';
import { PracticeQuestion, QuestionDifficulty, QuestionType } from '../../types';

interface PracticeViewProps {
  initialSubjectId?: string;
  onOpenTopic: (topicId: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  initialSubjectId,
  onOpenTopic,
}) => {
  const { saveQuizAttempt, weakTopics } = useProgress();

  // Quiz Configuration State
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | QuestionDifficulty>('all');
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(10);
  const [onlyWeakTopics, setOnlyWeakTopics] = useState<boolean>(false);

  // Active Quiz State
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState(0);

  // Timer effect
  useEffect(() => {
    let timer: any;
    if (isQuizActive && !isQuizCompleted) {
      timer = setInterval(() => {
        setTimeElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizActive, isQuizCompleted]);

  // Start new quiz session
  const startQuiz = () => {
    let pool = [...PRACTICE_QUESTIONS];

    // Filter by subject
    if (selectedSubjectId !== 'all') {
      pool = pool.filter((q) => q.subjectId === selectedSubjectId);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      pool = pool.filter((q) => q.difficulty === selectedDifficulty);
    }

    // Filter by weak topics if toggled
    if (onlyWeakTopics && weakTopics.length > 0) {
      pool = pool.filter((q) => weakTopics.includes(q.topicId));
    }

    // Shuffle pool
    const shuffled = pool.sort(() => Math.random() - 0.5);

    // Limit count (if fewer questions in bank, take all available or replicate/expand)
    const selected = shuffled.slice(0, Math.min(questionCountLimit, shuffled.length));

    // Fallback if pool empty
    if (selected.length === 0) {
      alert('No questions match your current filters. Resetting to all subjects.');
      setSelectedSubjectId('all');
      setSelectedDifficulty('all');
      setOnlyWeakTopics(false);
      return;
    }

    setActiveQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setRevealedAnswers({});
    setTimeElapsedSeconds(0);
    setIsQuizActive(true);
    setIsQuizCompleted(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (revealedAnswers[questionId]) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: true }));
  };

  const currentQ = activeQuestions[currentQuestionIndex];
  const isCurrentAnswered = currentQ ? revealedAnswers[currentQ.id] : false;

  const handleNext = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsQuizCompleted(true);
    setIsQuizActive(false);

    // Calculate score
    let correctCount = 0;
    const questionResults = activeQuestions.map((q) => {
      const userSelected = selectedAnswers[q.id] ?? -1;
      const isCorrect = userSelected === q.correctOptionIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        topicId: q.topicId,
        topicName: q.topicName,
        subjectId: q.subjectId,
        userSelected,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
      };
    });

    const scorePercentage = Math.round((correctCount / (activeQuestions.length || 1)) * 100);

    const subjectObj = SUBJECTS.find((s) => s.id === selectedSubjectId);
    const subjectName = subjectObj ? subjectObj.name : 'Full Spectrum Mock';

    const weakInThisQuiz = questionResults.filter((r) => !r.isCorrect).map((r) => r.topicId);

    // Save to Progress context
    saveQuizAttempt({
      subjectId: selectedSubjectId,
      subjectName,
      totalQuestions: activeQuestions.length,
      correctAnswers: correctCount,
      scorePercentage,
      timeSpentSeconds: timeElapsedSeconds,
      weakTopics: Array.from(new Set(weakInThisQuiz)),
      questionResults,
    });

    // Celebratory confetti if scored >= 70%
    if (scorePercentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* 1. QUIZ CONFIGURATION SCREEN */}
      {!isQuizActive && !isQuizCompleted && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRACTICE & MOCK TESTING</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Practice Questions Engine
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Configure customized practice sessions with real-time feedback, detailed explanations,
                and automatic weak-topic diagnostic tracking.
              </p>
              <div className="pt-1">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-500/30">
                  NOTICE: All items are PRACTICE QUESTIONS created for BCA → MCA revision.
                </span>
              </div>
            </div>
          </div>

          {/* Config Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-indigo-400" />
              <span>Configure Your Practice Session</span>
            </h2>

            {/* Question Count Selector (10, 25, 50, 75) */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Number of Questions
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[10, 25, 50, 75].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCountLimit(cnt)}
                    className={`py-3 px-4 rounded-xl font-black text-sm border transition-all flex flex-col items-center ${
                      questionCountLimit === cnt
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30 scale-[1.02]'
                        : 'bg-slate-850 text-slate-300 border-slate-750 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">{cnt}</span>
                    <span className="text-[10px] font-normal opacity-80 uppercase">Questions</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Subject Scope
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full bg-slate-950 text-white text-sm font-semibold px-4 py-3 rounded-xl border border-slate-750 focus:outline-none focus:border-indigo-500"
                aria-label="Select subject for practice"
              >
                <option value="all">All 9 Subjects (Full MCA Mock Mix)</option>
                <optgroup label="CORE COMPUTER">
                  {SUBJECTS.filter((s) => s.category === 'core-computer').map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="ADDITIONAL BCA CORE REVISION">
                  {SUBJECTS.filter((s) => s.category === 'additional-bca-core').map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Difficulty Level
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff as any)}
                    className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all capitalize ${
                      selectedDifficulty === diff
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : 'bg-slate-850 text-slate-400 border-slate-750 hover:text-white'
                    }`}
                  >
                    {diff === 'all' ? 'All Levels' : diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Weak Topics Only Toggle */}
            {weakTopics.length > 0 && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <input
                  type="checkbox"
                  id="weak-toggle"
                  checked={onlyWeakTopics}
                  onChange={(e) => setOnlyWeakTopics(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700"
                />
                <label
                  htmlFor="weak-toggle"
                  className="text-xs font-medium text-amber-300 cursor-pointer"
                >
                  Target Weak Topics Drill (focus on your {weakTopics.length} previously missed topics)
                </label>
              </div>
            )}

            {/* Start Button */}
            <button
              onClick={startQuiz}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01]"
            >
              Start Practice Session ({questionCountLimit} Questions) →
            </button>
          </div>
        </div>
      )}

      {/* 2. ACTIVE QUIZ SESSION SCREEN */}
      {isQuizActive && currentQ && (
        <div className="space-y-6">
          {/* Quiz Top Bar */}
          <div className="p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                Question {currentQuestionIndex + 1} of {activeQuestions.length}
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 font-medium">
                {currentQ.subjectName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>{formatTime(timeElapsedSeconds)}</span>
              </div>
              <button
                onClick={finishQuiz}
                className="text-xs text-slate-400 hover:text-rose-400 font-medium transition-colors"
              >
                Quit Quiz
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6">
            {/* Badges: PRACTICE QUESTION label + Type + Difficulty */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                  PRACTICE QUESTION
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                  {currentQ.type}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  currentQ.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : currentQ.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {currentQ.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </h3>

            {/* Optional Code snippet */}
            {currentQ.codeSnippet && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                <pre>{currentQ.codeSnippet}</pre>
              </div>
            )}

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isCorrect = idx === currentQ.correctOptionIndex;

                let btnClass = 'bg-slate-850 hover:bg-slate-800 border-slate-750 text-slate-200';
                if (isCurrentAnswered) {
                  if (isCorrect) {
                    btnClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnClass = 'bg-rose-500/20 border-rose-500/50 text-rose-200 font-bold';
                  } else {
                    btnClass = 'bg-slate-900 border-slate-850 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    disabled={isCurrentAnswered}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm ${btnClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-750 flex items-center justify-center font-bold text-xs text-slate-300 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isCurrentAnswered && isCorrect && (
                      <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isCurrentAnswered && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer & Explanation Reveal */}
            {isCurrentAnswered && (
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {selectedAnswers[currentQ.id] === currentQ.correctOptionIndex ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Incorrect.
                    </span>
                  )}
                  <span className="text-slate-400 text-xs font-normal">
                    (Correct Option: {String.fromCharCode(65 + currentQ.correctOptionIndex)})
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    Key Takeaway: <strong className="text-indigo-300">{currentQ.keyTakeaway}</strong>
                  </span>
                  <button
                    onClick={() => onOpenTopic(currentQ.topicId)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Review Topic →
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Next Button */}
            <div className="pt-4 flex items-center justify-end">
              <button
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                  isCurrentAnswered
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>
                  {currentQuestionIndex < activeQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. POST-QUIZ RESULTS SCREEN */}
      {isQuizCompleted && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Quiz Completed
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Performance Scorecard</h2>
          </div>

          {/* Score metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-2xl font-black text-indigo-400">
                {
                  Object.entries(selectedAnswers).filter(
                    ([qId, sel]) =>
                      sel === activeQuestions.find((q) => q.id === qId)?.correctOptionIndex
                  ).length
                }{' '}
                / {activeQuestions.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 uppercase font-semibold">Correct</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-2xl font-black text-cyan-400">
                {Math.round(
                  (Object.entries(selectedAnswers).filter(
                    ([qId, sel]) =>
                      sel === activeQuestions.find((q) => q.id === qId)?.correctOptionIndex
                  ).length /
                    (activeQuestions.length || 1)) *
                    100
                )}
                %
              </div>
              <div className="text-[11px] text-slate-400 mt-1 uppercase font-semibold">Accuracy</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-2xl font-black text-amber-400">{formatTime(timeElapsedSeconds)}</div>
              <div className="text-[11px] text-slate-400 mt-1 uppercase font-semibold">Time Spent</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">
                {Math.round(timeElapsedSeconds / (activeQuestions.length || 1))}s
              </div>
              <div className="text-[11px] text-slate-400 mt-1 uppercase font-semibold">Per Question</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={startQuiz}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Practice Quiz</span>
            </button>
            <button
              onClick={() => {
                setIsQuizCompleted(false);
                setIsQuizActive(false);
              }}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              Configure New Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
