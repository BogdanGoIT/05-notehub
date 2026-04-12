import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Make HTTP Request", search);
  }, [search]);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: () => fetchNotes(currentPage, search),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox text={search} value={setSearch} />
        {/* Пагінація */}
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setCurrentPage} />
        )}
        {isLoading && <p>Loading data..</p>}
        {isError && <p>Error!!!!!!!!!</p>}
        {/* Кнопка створення нотатки */}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList data={data.notes} />}
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <NoteForm onEnd={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
