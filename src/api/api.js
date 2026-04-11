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
  const config = getJdoodleConfig(LanguageName);

  const attemptExecution = async (clientId, clientSecret) => {
    const response = await axios.post("/jdoodle-api", {
      clientId,
      clientSecret,
      script: SourceCode,
      language: config.language,
      versionIndex: config.versionIndex,
    });
    return response.data;
  };

  try {
    // Attempt 1: Primary Keys
    let data = await attemptExecution(
      import.meta.env.VITE_JDOODLE_CLIENT_ID_1,
      import.meta.env.VITE_JDOODLE_CLIENT_SECRET_1
    );

    // If JDoodle explicitly returns a rate limit error inside the JSON
    if (data.statusCode === 429 || (data.error && data.error.toLowerCase().includes("limit"))) {
      console.warn("Primary JDoodle key limit reached! Falling back to backup key...");
      data = await attemptExecution(
        import.meta.env.VITE_JDOODLE_CLIENT_ID_2,
        import.meta.env.VITE_JDOODLE_CLIENT_SECRET_2
      );
    }

    console.log("Raw JDoodle Response:", data);

    return {
      output: data.output || "",
      statusCode: data.statusCode || 500,
      cpuTime: data.cpuTime || "0",
      memory: data.memory || "0",
      error: data.error || null
    };

  } catch (error) {
    // If we catch an axios error with a 429, it also means rate limit exceeded. Try the backup key.
    if (error.response && error.response.status === 429) {
      console.warn("Primary JDoodle key limit reached (HTTP 429)! Falling back to backup key...");
      try {
        const fallbackData = await attemptExecution(
          import.meta.env.VITE_JDOODLE_CLIENT_ID_2,
          import.meta.env.VITE_JDOODLE_CLIENT_SECRET_2
        );
        console.log("Raw Backup JDoodle Response:", fallbackData);
        return {
          output: fallbackData.output || "",
          statusCode: fallbackData.statusCode || 500,
          cpuTime: fallbackData.cpuTime || "0",
          memory: fallbackData.memory || "0",
          error: fallbackData.error || null
        };
      } catch (fallbackError) {
        console.error("Backup JDoodle Execution Error:", fallbackError);
        throw fallbackError;
      }
    }
    console.error("JDoodle Execution Error:", error);
    throw error;
  }
};