import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      {/* <button onClick={() => setCurrentPage(currentPage + 1)}>
        Load more{currentPage}
      </button> */}

      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setCurrentPage} />
        )}
        {isLoading && <p>Loading data..</p>}
        {isError && <p>Error!!!!!!!!!</p>}
        {/* Кнопка створення нотатки */}
      </header>

      {data && data.notes.length > 0 && <NoteList data={data.notes} />}
    </div>
  );
}

export default App;
