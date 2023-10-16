import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import logo from "./logo1.svg"


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

  const [inputValue, setInputValue] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleTaskChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };
  const handleAddTask = async () => {
    setLoading(true);
    const data = await HandleOpenAPICall(inputValue);
    if (data) {
      setLoading(false);
      setContent(data.choices[0].message.content);
    }
  };
  return (
    <main>
      <section className="app">
        <div className="code-section">
          <img src={logo} alt="logo" />
          <h1>Code Documentation</h1>
          <p> We assist developer for automating code documentation</p>
          <div className="code-section-input">
            <textarea
              value={inputValue}
              onChange={handleTaskChange}
              placeholder="Enter a new task"
            />
            <div className="code-section-content" dangerouslySetInnerHTML={{ __html: content }} />
            {loading ? <button>Loading...</button> : <button onClick={handleAddTask}>Add Task</button>}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;