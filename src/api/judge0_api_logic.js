import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2358",
});

const LANGUAGE_MAPPING = {
  python: 71,
  javascript: 63,
  cpp: 54,
  java: 62
};

// Bulletproof Base64 encoders to handle tricky characters without crashing
const encodeBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
const decodeBase64 = (str) => str ? decodeURIComponent(escape(atob(str))) : "";

export const executeCode = async (LanguageName, SourceCode) => {
  try {
    const langId = LANGUAGE_MAPPING[LanguageName.toLowerCase()] || 71;

    // Notice we changed base64_encoded to TRUE
    const response = await API.post("/submissions?wait=true&base64_encoded=true", {
      source_code: encodeBase64(SourceCode), 
      language_id: langId,
      stdin: "", 
    });

    console.log("Raw Judge0 Response:", response.data);

    const { stdout, stderr, compile_output, status, time, memory } = response.data;

    // We must decode the outputs back to normal text
    return {
      stdout: decodeBase64(stdout),
      stderr: decodeBase64(stderr) || decodeBase64(compile_output) || "",
      status: status?.description || "Processing/Unknown",
      statusCode: status?.id || 0,
      time: time || "0.000",
      memory: memory || 0,
    };
  } catch (error) {
    console.error("Judge0 Execution Error:", error);
    throw error;
  }
};