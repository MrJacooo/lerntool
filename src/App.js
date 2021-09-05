import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { getSentences } from "./controller"

function App() {

  //All of the Sentences in all the Languages
  const sentences = getSentences()
  const langList = [
    { display: "English", internal: "eng" },
    { display: "German", internal: "ger" },
    { display: "Spanish", internal: "span" },
    { display: "French", internal: "fr" },
    { display: "English", internal: "eng" },
  ]


  const [userInput, setUserInput] = useState("")
  const [currentSentence, setCurrentSentence] = useState({
    trans1: "Bei Andeo zu arbeiten ist eine grossartige ",
    trans2: " !",
    word: "Erfahrung",
    original: "Working at Andeo is a great experience!",
    sentenceId: 0
  })
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState("")
  const [clickMe, setClickMe] = useState("")
  const [originalLang, setOriginalLang] = useState(0)
  const [transLang, setTransLang] = useState(1)


  function checkResult() {
    setResult(currentSentence.word === userInput ? "Richtig!" : "Falsch - \"" + currentSentence.word + "\" wäre richtig gewesen")
    setShowResults(true)
  }

  //Reloads the Source Sentence according to its Language
  function reloadOriginal(val) {
    let sentence = ""
    let id = val === 1000 ? currentSentence.sentenceId : val
    let add = val === 1000 ? 1 : 0
    //Selecting the Sentence in the right Language, it is a bit complicated because of how React handles Re-Renders
    if (langList[originalLang + add].internal === "eng") sentence = sentences[id].eng;
    if (langList[originalLang + add].internal === "ger") sentence = sentences[id].ger;
    if (langList[originalLang + add].internal === "span") sentence = sentences[id].span;
    if (langList[originalLang + add].internal === "fr") sentence = sentences[id].fr;
    return { original: sentence }

  }
  //Reloads the Translate Sentence according to its Language
  function reloadTrans(val) {
    let sentence = ""
    let id = val === 1000 ? currentSentence.sentenceId : val
    let add = val === 1000 ? 1 : 0
    //Selecting the Sentence in the right Language, it is a bit complicated because of how React handles Re-Renders
    if (langList[transLang + add].internal === "eng") sentence = sentences[id].eng;
    if (langList[transLang + add].internal === "ger") sentence = sentences[id].ger;
    if (langList[transLang + add].internal === "span") sentence = sentences[id].span;
    if (langList[transLang + add].internal === "fr") sentence = sentences[id].fr;
    //Get it as an Array to extract a random word
    let inputArr = sentence.split(" ")
    let word = inputArr[Math.floor(Math.random() * inputArr.length)]
    //Check if word has a special Char at the end and then remove it so it remains in the String when we later split it
    if (["!", ",", "."].some(v => word.includes(v))) {
      word = word.slice(0, -1)
    }
    //Get the two curated Start and End Strings
    let strings = sentence.split(word)
    return { trans1: strings[0], trans2: strings[1], word: word, sentenceId: id }

  }

  //Handles Language Changes or Sentence Changes.
  function changeLang(src) {
    setClickMe("none")
    setShowResults(false)
    setUserInput("")
    //Only exists because react rendering sucks
    let nextSentenceId = 1000
    let obj1 = {}
    let obj2 = {}

    //Sentence Change
    if (src.includes("Next")) {
      nextSentenceId = Math.floor(Math.random() * sentences.length)
      obj1 = reloadOriginal(nextSentenceId)
      obj2 = reloadTrans(nextSentenceId)
    }

    //Reloads the Sentences in the right Language
    if (src.includes("Original")) {
      setOriginalLang((originalLang + 1) % 4)
      obj1 = reloadOriginal(nextSentenceId)
    }
    if (src.includes("Trans")) {
      setTransLang((transLang + 1) % 4)
      obj2 = reloadTrans(nextSentenceId)
    }
    setCurrentSentence({ ...currentSentence, ...obj1, ...obj2 })
  }


  return (
    <div className="App">
      <header >
        <h1>translate.</h1>
      </header >
      <section className="round">
        <div class="content shadow round">
          <h3>Original - <button className="invisButton" onClick={() => changeLang("Original")}>{langList[originalLang].display} <b style={{ display: `${clickMe}` }}>&lt;click</b> </button></h3>
          <p>{currentSentence.original}</p>
        </div>
        <div class="content shadow round">
          <h3>Translate - <button className="invisButton" onClick={() => changeLang("Trans")}>{langList[transLang].display} <b style={{ display: `${clickMe}` }}>&lt;click</b> </button></h3>
          <p>{currentSentence.trans1}<input value={userInput} onChange={e => setUserInput(e.target.value)} />{currentSentence.trans2}</p>
        </div>
        <div className="shadow-inv-big round content result">
          <button className="round green shadow" onClick={checkResult}>Check</button>
          <button className="round blue shadow" onClick={() => changeLang("Next")}>Next</button>
          {showResults && <div className="shadow round">
            <div>Ergebnis: {result}</div>
          </div>}
        </div>
      </section>
    </div >
  );
}

export default App;
