import React, { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { StudyPlanView } from './components/studyPlan/StudyPlanView';
import { SubjectsView } from './components/subjects/SubjectsView';
import { LearnView } from './components/learn/LearnView';
import { PracticeView } from './components/practice/PracticeView';
import { RapidRevisionView } from './components/rapidRevision/RapidRevisionView';
import { MockInterviewView } from './components/interview/MockInterviewView';
import { ProgressView } from './components/progress/ProgressView';
import { NotesView } from './components/notes/NotesView';

export function AppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string | undefined>(undefined);
  const [activePracticeSubject, setActivePracticeSubject] = useState<string | undefined>(undefined);

  // Jump handlers
  const handleOpenTopic = (topicId: string) => {
    setActiveTopicId(topicId);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPracticeSubject = (subjectId?: string) => {
    setActivePracticeSubject(subjectId);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-[#0f0a09] text-stone-100 overflow-hidden font-sans selection:bg-red-500/30 selection:text-red-200">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenMobileMenu={() => setIsMobileNavOpen(true)}
        />

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          {activeTab === 'dashboard' && (
            <DashboardView
              setActiveTab={setActiveTab}
              onOpenTopic={handleOpenTopic}
            />
          )}

          {activeTab === 'plan' && (
            <StudyPlanView
              onOpenTopic={handleOpenTopic}
              onOpenPractice={() => handleOpenPracticeSubject()}
            />
          )}

          {activeTab === 'subjects' && (
            <SubjectsView
              onOpenTopic={handleOpenTopic}
              onOpenPracticeSubject={handleOpenPracticeSubject}
            />
          )}

          {activeTab === 'learn' && (
            <LearnView
              initialTopicId={activeTopicId}
              onOpenNotesWithTopic={(topicId, title) => {
                setActiveTab('notes');
              }}
              onOpenPractice={() => handleOpenPracticeSubject()}
            />
          )}

          {activeTab === 'practice' && (
            <PracticeView
              initialSubjectId={activePracticeSubject}
              onOpenTopic={handleOpenTopic}
            />
          )}

          {activeTab === 'rapid-revision' && <RapidRevisionView />}

          {activeTab === 'mock-interview' && <MockInterviewView />}

          {activeTab === 'progress' && (
            <ProgressView
              onOpenTopic={handleOpenTopic}
              onOpenPractice={() => handleOpenPracticeSubject()}
            />
          )}

          {activeTab === 'notes' && <NotesView />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
