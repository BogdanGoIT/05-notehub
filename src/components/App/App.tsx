import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../services/noteService";

function App() {
  const { data } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  console.log(data);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}

export default App;
