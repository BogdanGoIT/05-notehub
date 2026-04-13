import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { fetchNotes } from "../../services/noteService";
import { useDebouncedCallback } from "use-debounce";

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

  // В2 скидання сторінки через:
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [search]);

  // 1. Створюємо дебаунс-функцію ТІЛЬКИ для setSearch
  const debouncedSearch = useDebouncedCallback(setSearch, 300);

  // 2. Створюємо звичайну функцію-обробник
  const handleSearch = (v: string) => {
    debouncedSearch(v); // Оновлюємо пошук через 300мс
    setCurrentPage(1); // Скидаємо сторінку МИТТЄВО
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: () => fetchNotes(currentPage, search),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox text={search} onSearch={handleSearch} />
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
