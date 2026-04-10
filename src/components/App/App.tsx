import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../services/noteService";
import NoteList from "../NoteList/NoteList";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const notes = data?.notes || [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <NoteList data={notes} />
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
        {isLoading && <p>Loading data..</p>}
        {isError && <p>Error!!!!!!!!!</p>}
      </header>
    </div>
  );
}

export default App;
