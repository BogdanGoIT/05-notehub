import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { fetchNotes } from "../../services/noteService";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(() => {
    const savedState = localStorage.getItem("modal-state");
    if (savedState !== null) {
      return JSON.parse(savedState);
    }
    return false;
  });

  // state init > jsx > effect
  useEffect(() => {
    localStorage.setItem("modal-state", JSON.stringify(isOpenModal));
  }, [isOpenModal]);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: () => fetchNotes(currentPage, search),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (v: string) => {
    setSearch(v);
    setCurrentPage(1);
  };

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox text={search} value={handleSearch} />
        {/* Пагінація */}
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            setPage={setCurrentPage}
            page={currentPage}
          />
        )}
        {isLoading && <p>Loading data..</p>}
        {isError && <p>Error!!!!!!!!!</p>}
        {/* Кнопка створення нотатки */}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal onClose={closeModal}>
          <NoteForm onEnd={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
