import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export async function fetchNotes() {
  const res = await axios.get<FetchNotesResponse>("/notes", {
    params: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
