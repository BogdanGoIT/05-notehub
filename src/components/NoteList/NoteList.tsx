import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoteTag } from "../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../services/noteService";

interface NoteListProps {
  data: NoteTag[];
}

export default function NoteList({ data }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотаток */}
      {data?.map((note) => {
        return (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                className={css.button}
                onClick={() => mutation.mutate(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
