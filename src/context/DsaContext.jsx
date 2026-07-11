import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "./AppContext";

const DsaContext = createContext();

export const useDsaContext = () => useContext(DsaContext);

export const DsaContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [dsaContent, setdsaContext] = useState({});
  let { jwtToken } = useAppContext();

  async function getDSAContent() {
    try {
      // console.log(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
      // console.log(
      //   "Expires At (IST):",
      //   expiryTime.toLocaleString("en-IN", {
      //     timeZone: "Asia/Kolkata",
      //   }),
      // );
      if (!jwtToken) {
        jwtToken = "";
      }
      // console.log("jwtToken in getDSAContent is : ", jwtToken);

      // console.log("jwt token during fetching dsa content is : ", jwtToken);
      // console.log("calling getDSAContent...");
      let response = null;

      if (jwtToken && jwtToken !== "") {
        response = await axios.get(`${BACKEND_URL}/user/getDSAContent`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
      } else {
        response = await axios.get(`${BACKEND_URL}/public/getDSAContent`);
      }

      // console.log("response DSA data  is : ",response.data);
      const data = response.data;
      if (data && Object.keys(data).length > 0) {
        console.log("DSA Content fetched successfully : ",data);
        setdsaContext(data);
      } else {
        // console.log("No DSA Content found.");
        setdsaContext({});
      }
    } catch {
      console.error("Error fetching DSA Content.");
      setdsaContext({});
    }
  }

  useEffect(() => {
    // console.log("calling getDSAContent...");
    getDSAContent();
  }, []);

  useEffect(() => {
    // console.log("DSA Content is :",dsaContent);
  }, [dsaContent]);

  return (
    <DsaContext.Provider value={{ dsaContent, setdsaContext, getDSAContent }}>
      {props.children}
    </DsaContext.Provider>
  );
};
