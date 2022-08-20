import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  // to set all the options fetched to select
  const [Options, setOptions] = useState([])

  // to save the language it is to be translated to 
  const [translateTo, setTranslateTo] = useState("")

  // to save the input data in the textarea
  const [inputData, setInputData] = useState("")

  // to display the data recieved from the api
  const [displayData, setDisplayData] = useState("")

  // to fetch all the languages avalaible in the api
  const getLanguages = () => {
    axios.get("https://libretranslate.com/languages",
      { headers: { "accept": "application/json" } }
    )
      .then(res => {
        console.log(res.data);
        setOptions(res.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getLanguages()
  }, [])

  const translateToHandler = (e) => {
    setTranslateTo(e.target.value)
  }

  const inputHandler = (e) => {
    setInputData(e.target.value)
  }

  const submitHandler = () => {

    // as the data was urlencoded so in axios documentary it says to use this
    const params = new URLSearchParams();
    params.append('q', inputData);
    params.append('source', "en");
    params.append('target', translateTo);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post("https://libretranslate.de/translate",
      params,
      {
        headers: {
          "accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
      .then(res => {
        console.log(res.data)
        setDisplayData(res.data.translatedText)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="App">

      <div className="translate">

        <h1>Enter Text to Translate</h1>

        <select name="from" className='from'>
          <option value="en">English</option>
        </select>

        <textarea onInput={inputHandler} name="translateText" id="translateText" cols="30" rows="10"></textarea>

        <button onClick={submitHandler} className='btn'>Translate</button>

      </div>

      <div className="translated">

        <h1>Translated Text</h1>

        <select onInput={translateToHandler} name="to" className='to'>
          {Options.map(lang => (
            <option key={lang.code} className='opt' value={lang.code}>{lang.name}</option>
          ))}
        </select>

        <div className="display">
          {displayData}
        </div>

      </div>

    </div >
  );
}

export default App;
