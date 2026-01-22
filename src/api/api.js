import axios from "axios";

// const API_URL = import.meta.env.VITE_PISTON_URL; 

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (Language, SourceCode) => {
  const response = await API.post("/execute", {
    language: Language[0],
    version: Language[1],
    files: [
      {
        content: SourceCode,
      },
    ],
  });
  return response.data;
};