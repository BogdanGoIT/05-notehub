import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  totalPages?: number;
}

export interface CreateNoteProps {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes(page: number = 1, search: string) {
  const res = await axios.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

// POST /notes {}

export async function createNote(newNote: CreateNoteProps) {
  const res = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

// DELETE /notes/{id}

export async function deleteNote(noteId: string) {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
