import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [currentSentence, setCurrentSentence] = useState({
    ger: <>Bei Andeo zu arbeiten ist eine grossartige <input />!</>,
    eng: "Working at Andeo is a great experience!",
    word: "Erfahrung"
  })
  const sentences = [
    {
      ger: "Bei Andeo zu arbeiten ist eine grossartige Erfahrung!",
      eng: "Working at Andeo is a great experience!"
    }
  ]

  function prepSentences() {
    let inputObj = sentences[0]
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
    let outputObj = { eng: inputObj.eng, ger: <>{strings[0]}<input />{strings[1]}</>, word: word }
    setCurrentSentence(outputObj)
  }

  return (
    <div className="App">
      <header >
        <h1>translate.</h1>

      </header >
      <section className="round">

        <div class="content shadow round">
          <h3>Original - English</h3>
          <p>Lorem ipsum dolor sit olore magna aliquyam Lorem ipsum dolor sit amet,  sed diam nonumyaliquyam</p>
        </div>
        <div class="content shadow round">
          <h3>Translate - Deutsch</h3>
          <p>{currentSentence.ger}</p>
        </div>
        <div className="shadow-inv-big round content result">
          <button className="round green shadow">Check</button>
          <button className="round blue shadow" onClick={prepSentences}>Next</button>
          <div className="shadow round">
            <div>Deine Eingabe: "Der Storch"</div>
            <div>Ergebnis: Korrekt</div>
          </div>
        </div>
      </section>
    </div >
  );
}

export default App;
