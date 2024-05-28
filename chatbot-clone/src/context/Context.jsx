import { createContext } from "react";
import run from "../config/gemini";
import { useState } from "react";
export const Context = createContext();

const ContextProvider = (props) => {

    // input to save input data ->prompt
    const [input,setInput ] = useState("");
    // when we click on send button the input data in prompt will be saved in recentPrompt
    const [recentPrompt,setRecentPrompt] = useState("");
    // input history to stored in prevPrompts array and to be displayed in sideBar recents
    const [prevPrompts,setPrevPrompts] = useState([]);
    // when true, it'll display the result and hide cards
    const [showResult,setShowResult] = useState(false);
    // before loading data true, when data loaded false so we can display data
    const [loading,setLoading] = useState(false);
    // to display result on our webpage 
    const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) =>{
            setTimeout(function () {
                setResultData(prevResult => prevResult+nextWord);
            },75*index);
        }
    
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }
    const onSent = async (prompt) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response; 
        if(prompt !== undefined)
        {
            response = await run(prompt);
            setRecentPrompt(prompt);
        }
        else
        {
            setPrevPrompts(prevPrompt => [...prevPrompt,input]);
            setRecentPrompt(input);
            response = await run (input);
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i = 0 ; i < responseArray.length; i++)
        {
            if(i === 0 || i%2 !== 1)
            {
                newResponse += responseArray[i];
            }
            else
            {
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0 ; i < newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ");   
        }
        setLoading(false);
        setInput("");
    }


    // state and setter funcs added in this that'll be accessed in main and sidebar components 
    const contextValue = 
    {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider;