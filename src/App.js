import './App.css';
import { ReactTransliterate } from 'react-transliterate';
import { useState } from 'react';

function App() {

  const [text, setText] = useState("");

  return (
    <div className="App">
      <h1>Type in the below Box</h1>
      <ReactTransliterate
        className='INPUT'
        value={text}
        onChangeText={(text) => {
          setText(text);
        }}
        lang="hi"
      />

    </div >
  );
}

export default App;
