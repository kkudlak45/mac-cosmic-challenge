import { useState } from 'react';
import './App.css'
import { Answer, GEOCACHES, Geocache } from './caches'

const API_URL = "https://g4jv1458b6.execute-api.us-east-1.amazonaws.com/test/checkCosmicCodeWord";
const LS_KEY = "MAC_COSMIC_ANSWERS";

export default function App() {
  const answersString = localStorage.getItem(LS_KEY);
  const [answers, setAnswers] = useState(answersString ? JSON.parse(answersString) : []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const answers: Answer[] = Object.values(e.target)
      .filter((obj) => obj.nodeName === "INPUT")
      .map((inputObj) => {
        return {
          gcCode: inputObj.id,
          answer: inputObj.value,
          correct: false, // API should populate this
        }
      });
    
    fetch(API_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((response) => response.json())
      .then((json) => {
        setAnswers(json);
        window.localStorage.setItem(LS_KEY, JSON.stringify(json));
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <h2>MAC Cosmic Challenge</h2>
      <form onSubmit={onSubmit}>
        {GEOCACHES.map((cache: Geocache) => {
          const thisAnswer = answers?.find((answer: Answer) => answer.gcCode === cache.gcCode);
          return (
            <div
              key={cache.gcCode}            
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
                marginBottom: "4px"
              }}
            >
              <label style={{ color: thisAnswer?.correct ? "green" : "red" }} htmlFor={cache.gcCode}>
                {`${cache.gcCode} - ${cache.name}`}
              </label>
              <input type="text" id={cache.gcCode} defaultValue={thisAnswer?.answer}/>
            </div>
          )
        })}
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  )
}
