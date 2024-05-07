import { useMemo, useState } from 'react';
import './App.css'
import { Answer, GEOCACHES, Geocache } from './caches'

const API_URL = "https://g4jv1458b6.execute-api.us-east-1.amazonaws.com/test/checkCosmicCodeWord";
const LS_KEY = "MAC_COSMIC_ANSWERS";
const FINAL_GCCODE = "GCAQ52A"

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

  const finalCoords = useMemo(() => {
    const finalAnswer = answers.find((ans: Answer) => ans.gcCode === FINAL_GCCODE);
    return finalAnswer?.answer;
  }, [answers]);

  return (
    <div id="main">
      <h2>MAC Cosmic Challenge</h2>
      <p>Calling all astronauts, are you ready to embark on a new mission that is sure to be out of this world? Intergalactic caches have been spotted through the Mountaineer region and beyond, and we need your help tracking them down in the Cosmic Caching Challenge! Find 20 / 23 of the following caches and input the corresponding code words to locate the bonus cache ({FINAL_GCCODE}).</p>
      {finalCoords && (
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          CONGRATS! {FINAL_GCCODE} IS AT {finalCoords}
        </p>
      )}
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
              <label
                htmlFor={cache.gcCode}
                style={{
                  color: thisAnswer?.correct ? "green" : "red",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
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
