import { createContext, useState } from "react";
import run from "../Config/gemini";

// Create the context
export const Context = createContext();

// Rename to start with a capital letter
const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompt, setprevPrompt] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultData((prev) => prev + nextWord);
    }, 7 * index);
  };


  const newChat=()=>{
    setloading(false)
    setshowResult(false)
  }

  const onSent = async (prompt) => {
    setresultData("");
    setloading(false);
    setshowResult(true);
    let response;
    if(prompt !== undefined){
      response=await run(prompt)
      setrecentPrompt(prompt)
    }
    else{
      setprevPrompt(prev=>[...prev,input])
      setrecentPrompt(input)
      response=await run(input)

    }
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setloading(false);
    setinput("");
  };

  // onSent("what is react js")

  const contextValue = {
    prevPrompt,
    setprevPrompt,
    onSent,
    setrecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
