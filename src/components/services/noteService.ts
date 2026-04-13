import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(page: number = 1, search: string) {
  const res = await axios.get<Note>("/notes", {
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

interface CreteNoteProps {
  title: string;
  content: string;
  tag: string;
}

// POST /notes {}

export async function createNote(newNote: CreteNoteProps) {
  const res = await axios.post<CreteNoteProps>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

// DELETE /notes/{id}

export async function deleteNote(noteId: string) {
  const res = await axios.delete<NoteTag>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
