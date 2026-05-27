import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DsaContext = createContext();

export const useDsaContext = () => useContext(DsaContext);

export const DsaContextProvider = (props) => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [dsaContent,setdsaContext] = useState({});

    
    async function getDSAContent(){
        try{
            const response = await axios.get(`${BACKEND_URL}/public/getDSAContent`);
            console.log("response is : ",response.data);
            const data = response.data;
            if(data && Object.keys(data).length > 0){
                // console.log("DSA Content fetched successfully : ",data);
                setdsaContext(data);
            }
            else{
                // console.log("No DSA Content found.");
                setdsaContext({});
            }
        }catch{
            console.error("Error fetching DSA Content.");
            setdsaContext({});
        }
    }

    useEffect(()=>{
        console.log("calling getDSAContent...");
        getDSAContent();
    },[]);

    useEffect(()=>{
        console.log("DSA Content is :",dsaContent);
    },[dsaContent]);

    return (
        <DsaContext.Provider value={{ dsaContent, setdsaContext, getDSAContent }}>
            {props.children}
        </DsaContext.Provider>
    );

}