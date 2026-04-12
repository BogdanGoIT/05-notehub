import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: (e: string) => void;
  text: string;
}

export default function SearchBox({ text, value }: SearchBoxProps) {
  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => value(e.target.value),
    300,
  );

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
      defaultValue={text}
    />
  );
}
