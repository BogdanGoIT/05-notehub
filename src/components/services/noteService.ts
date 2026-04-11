import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(page: number = 1) {
  const res = await axios.get<Note>("/notes", {
    params: {
      page,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
