export interface NoteTag {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface Note {
  notes: NoteTag[];
  totalPages?: number;
}
