import axios from "axios";

// Map your frontend language names to JDoodle's specific formats
const getJdoodleConfig = (lang) => {
  const normalizedLang = lang.toLowerCase();
  switch (normalizedLang) {
    case "python":
    case "python3":
      return { language: "python3", versionIndex: "3" };
    case "cpp":
    case "c++":
      return { language: "cpp", versionIndex: "5" };
    case "java":
      return { language: "java", versionIndex: "4" };
    case "javascript":
    case "js":
      return { language: "nodejs", versionIndex: "4" };
    default:
      // Fallback
      return { language: "nodejs", versionIndex: "4" };
  }
};

export const executeCode = async (LanguageName, SourceCode) => {
  try {
    const config = getJdoodleConfig(LanguageName);

    // Make the POST request directly to JDoodle's public API
    const response = await axios.post("/jdoodle-api", {
      clientId: import.meta.env.VITE_JDOODLE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_JDOODLE_CLIENT_SECRET,
      script: SourceCode,
      language: config.language,
      versionIndex: config.versionIndex,
    });

    console.log("Raw JDoodle Response:", response.data);

    // JDoodle returns { output, statusCode, memory, cpuTime, error }
    // We return it exactly as-is so our useTestRunner hook can read it easily
    return {
      output: response.data.output || "",
      statusCode: response.data.statusCode || 500,
      cpuTime: response.data.cpuTime || "0",
      memory: response.data.memory || "0",
      error: response.data.error || null
    };

  } catch (error) {
    console.error("JDoodle Execution Error:", error);
    throw error;
  }
};