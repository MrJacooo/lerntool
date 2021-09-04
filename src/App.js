import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { getSentences } from "./controller"

function App() {

  const sentences = getSentences()
  const [userInput, setUserInput] = useState("")
  const [currentSentence, setCurrentSentence] = useState({
    res1: "Bei Andeo zu arbeiten ist eine grossartige ",
    res2: " !",
    eng: "Working at Andeo is a great experience!",
    word: "Erfahrung"
  })
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState("")



  function prepSentences() {
    let inputObj = sentences[Math.floor(Math.random() * sentences.length)]
    let input = inputObj.ger
    //Get it as an Array to extract a random word
    let inputArr = input.split(" ")
    let word = inputArr[Math.floor(Math.random() * inputArr.length)]
    //Check if word has a special Char at the end and then remove it so it remains in the String when we later split it
    if (["!", ",", "."].some(v => word.includes(v))) {
      word = word.slice(0, -1)
    }
    //Get the two curated Start and End Strings
    let strings = input.split(word)
    let outputObj = { eng: inputObj.eng, res1: strings[0], res2: strings[1], word: word }
    setCurrentSentence(outputObj)
    setShowResults(false)
    setUserInput("")
  }

  function checkResult() {
    setResult(currentSentence.word === userInput ? "Richtig!" : "Falsch.")
    setShowResults(true)
  }


  return (
    <div className="App">
      <header >
        <h1>translate.</h1>
      </header >
      <section className="round">
        <div class="content shadow round">
          <h3>Original - English</h3>
          <p>{currentSentence.eng}</p>
        </div>
        <div class="content shadow round">
          <h3>Translate - Deutsch</h3>
          <p>{currentSentence.res1}<input value={userInput} onChange={e => setUserInput(e.target.value)} />{currentSentence.res2}</p>
        </div>
        <div className="shadow-inv-big round content result">
          <button className="round green shadow" onClick={checkResult}>Check</button>
          <button className="round blue shadow" onClick={prepSentences}>Next</button>
          {showResults && <div className="shadow round">
            <div>Ergebnis: {result}</div>
          </div>}
        </div>
      </section>
    </div >
  );
}

export default App;
