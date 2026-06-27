import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TrickContext = createContext();
export const useTrickContext = () => useContext(TrickContext)  
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const TrickContextProvider = ({children}) => {
    const [notebook,setNotebook] = useState({html:"",savedAt:null});

    const value = {
        notebook,
        setNotebook
    }

    async function loadNoteBook(){
        try{
            const result = await axios.get(`${BACKEND_URL}/trick/get`);
            const data = result.data;
            setNotebook({
                html:data.html,
                savedAt:data.updated_at
            });
            console.log("htmlNotes is : ",result.data);
            
        }
        catch(e){
            console.log("error : "+e);
            setNotebook("");
        }
    }

    
    useEffect(()=>{
        loadNoteBook();
        console.log("loadNoteBook() loaded...");
    },[]);

    return (
        <TrickContext.Provider value={value}>
            {children}
        </TrickContext.Provider>
    )


}