import { useState, useRef } from "react";
import "../App.css";
import puter from "@heyputer/puter.js";

function PuterJsComp() {
  const textBoxInputRef = useRef(null);
  const [puterResponse, setPuterResponse] = useState();
  const [puterStatus, setPuterStatus] = useState();


  const samplePuterFunction = () => {
    // console.log("Button clicked! ");
    setPuterStatus("Sent to AI ChatBot...")
    setPuterResponse();
    if (textBoxInputRef?.current?.value) {
      puter.ai
        .chat(textBoxInputRef?.current?.value)
        .then((response) => {
          // puter.print(response);
          console.log("AI Response:", response);
          setPuterResponse(response);
          setPuterStatus();
        })
        .catch((error) => {
          console.error("AI Error:", error);
          setPuterStatus(`Error: ${error.message || error}`);
        });
    } else {
      alert("Please enter some input in the text area.");
    }

    if (textBoxInputRef.current) {
      // Access the DOM element and set its value to an empty string
      textBoxInputRef.current.value = '';
      textBoxInputRef.current.focus(); // Optional: set focus back to the textarea
    }
  };

  return (
    <>
      <textarea
        ref={textBoxInputRef}
        rows={10}
        cols={50}
        placeholder="Puter.js Input will appear here..."
        maxLength={100}
      ></textarea>
      <br />
      <button onClick={samplePuterFunction}>Chat with AI</button>
      {puterStatus?<div><em>{puterStatus}</em></div>:null}
      {/* <div>{puterResponse}</div> */}
      {/* Check if the response is an object or a string and display accordingly */}
      {typeof puterResponse === "object" && puterResponse !== null ? (
        <>          
          <h5>PuterJS Response_message_content</h5>
          {puterResponse?.message?.content}
          <br/>
          <h6>PuterJS Full JSON Response Object</h6>
          <pre>{JSON.stringify(puterResponse, null, 2)}</pre>{" "}
        </>
      ) : (
        <p>{puterResponse}</p>
      )}

      <hr />
    </>
  );
}

export default PuterJsComp;
