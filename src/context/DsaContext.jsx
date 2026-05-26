import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DsaContext = createContext();

export const useDsaContext = ()=> useContext(DsaContext);

export const DsaContextProvider = (props) => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [dsaContent,setdsaContext] = useState([]);

    
    async function getDSAContent(){
        try{
            const response = await axios.get(`${BACKEND_URL}/public/getDSAContent`);
            console.log("response is : ",response.data);
            const data = response.data;
            if(data.length()>0){
                setdsaContext(response.data);
            }
            else{
                setdsaContext([]);
            }
        }catch{
            setdsaContext([]);
        }
    }

    useEffect(()=>{
        getDSAContent();
    },[]);

    return (
        <DsaContext.Provider value={{ dsaContent, setdsaContext }}>
            {props.children}
        </DsaContext.Provider>
    );

}