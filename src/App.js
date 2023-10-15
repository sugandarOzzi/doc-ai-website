import React, { useState } from "react";
import "./App.css";
import axios from "axios";


const apiUrl = "https://api.openai.com/v1/chat/completions";
// Shafiq Key
const apiKey = "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";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

const HandleOpenAPICall = async (inputValue) => {
  const da = axios
    .post(
      apiUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You will be provided with a piece of code, and your task is to document it clearly.",
          },
          {
            role: "user",
            content: inputValue,
          },
        ],
      },
      { headers }
    )
    .then((response) => {
      console.log("Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    });
  return da;
}; 



function App() {

  const [inputValue, setInputValue] = useState("")
  const handleTaskChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = async () => {
    const data = await HandleOpenAPICall(inputValue);
    console.log(data.choices[0].message.content);
    setInputValue(data.choices[0].message.content);
  };
  return (
    <main>
      <section>
        <h1>Code Documentation</h1>
        <p> We help developer to doc your code</p>
      </section>
      <section>
        <h2>Code Documentation</h2>
        <div>
          <textarea
            value={inputValue}
            onChange={handleTaskChange}
            placeholder="Enter a new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </section>
    </main>
  );
}

export default App;