import React, { useState } from 'react';
import {
  StickyNote,
  Plus,
  Search,
  Pin,
  PinOff,
  Trash2,
  Edit3,
  Check,
  X,
  Tag,
  BookOpen,
  Calendar,
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { SUBJECTS } from '../../data/subjectsData';
import { UserNote } from '../../types';

export const NotesView: React.FC = () => {
  const { userNotes, saveNote, deleteNote, togglePinNote } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [editingNote, setEditingNote] = useState<UserNote | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formSubjectId, setFormSubjectId] = useState<string>('operating-systems');
  const [formTags, setFormTags] = useState('');

  const handleStartCreate = () => {
    setEditingNote(null);
    setFormTitle('');
    setFormContent('');
    setFormSubjectId('operating-systems');
    setFormTags('');
    setIsCreatingNew(true);
  };

  const handleStartEdit = (note: UserNote) => {
    setIsCreatingNew(false);
    setEditingNote(note);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormSubjectId(note.subjectId);
    setFormTags(note.tags.join(', '));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const parsedTags = formTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    saveNote({
      id: editingNote ? editingNote.id : undefined,
      title: formTitle.trim(),
      content: formContent.trim(),
      subjectId: formSubjectId,
      isPinned: editingNote ? editingNote.isPinned : false,
      tags: parsedTags,
    });

    setIsCreatingNew(false);
    setEditingNote(null);
  };

  // Filter notes
  const filteredNotes = userNotes.filter((note) => {
    if (selectedSubjectFilter !== 'all' && note.subjectId !== selectedSubjectFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = note.title.toLowerCase().includes(q);
      const inContent = note.content.toLowerCase().includes(q);
      const inTags = note.tags.some((t) => t.toLowerCase().includes(q));
      if (!inTitle && !inContent && !inTags) return false;
    }
    return true;
  });

  // Sort: Pinned first, then by date
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold tracking-wide">
              <StickyNote className="w-3.5 h-3.5" />
              <span>PERSONAL REVISION NOTEBOOK</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Personal Study Notes
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Jot down quick formulas, code snippets, and interview tips. Fully persistent in browser storage.
            </p>
          </div>

          <button
            onClick={handleStartCreate}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Study Note</span>
          </button>
        </div>
      </div>

      {/* Editor Modal / Inline Drawer */}
      {(isCreatingNew || editingNote) && (
        <form
          onSubmit={handleSaveForm}
          className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-indigo-400" />
              <span>{editingNote ? 'Edit Study Note' : 'Create New Note'}</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreatingNew(false);
                setEditingNote(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Note Title
              </label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g., Quick formulas for Banker's Algorithm"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Subject Tag
              </label>
              <select
                value={formSubjectId}
                onChange={(e) => setFormSubjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Content (Supports Markdown notes)
            </label>
            <textarea
              required
              rows={6}
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              placeholder="Write your revision notes, formulas, or tricky points..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-750 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formTags}
              onChange={(e) => setFormTags(e.target.value)}
              placeholder="e.g. Deadlock, Banker, Safety"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => {
                setIsCreatingNew(false);
                setEditingNote(null);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
            >
              Save Note
            </button>
          </div>
        </form>
      )}

      {/* Search & Subject Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by keyword or tag..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold shrink-0">Filter:</span>
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="bg-slate-950 text-white text-xs font-semibold px-3 py-2 rounded-xl border border-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedNotes.map((note) => {
          const subject = SUBJECTS.find((s) => s.id === note.subjectId);

          return (
            <div
              key={note.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-lg relative group ${
                note.isPinned
                  ? 'bg-slate-900 border-indigo-500/40 ring-1 ring-indigo-500/20 shadow-indigo-950/20'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-750'
              }`}
            >
              <div className="space-y-3">
                {/* Note Header: Subject badge & Pin button */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-indigo-300">
                    {subject?.name || 'General'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePinNote(note.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        note.isPinned
                          ? 'text-indigo-400 bg-indigo-500/10'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title={note.isPinned ? 'Unpin Note' : 'Pin Note to Top'}
                    >
                      <Pin className={`w-3.5 h-3.5 ${note.isPinned ? 'fill-indigo-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleStartEdit(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                      title="Edit Note"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Note Title */}
                <h3 className="text-sm font-bold text-white tracking-tight leading-snug">
                  {note.title}
                </h3>

                {/* Note Content preview */}
                <div className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed line-clamp-6 bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                  {note.content}
                </div>

                {/* Tags */}
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {note.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Note Footer: Date */}
              <div className="mt-4 pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                {note.isPinned && (
                  <span className="text-indigo-400 font-semibold uppercase">Pinned</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
