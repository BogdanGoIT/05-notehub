import css from "./NoteList.module.css";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}
interface NoteListProps {
  data: Note[];
}

export default function NoteList({ data }: NoteListProps) {
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
              <button className={css.button}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
