import React, { useState } from 'react';
import './App.css';

function App() {
  const [lyricsInput, setLyricsInput] = useState('');
  const [lyricsOutput, setLyricsOutput] = useState('');

  const handleSectionClick = () => {
    const paragraphs = lyricsInput.split('\n\n');
    let sectionedLyrics = '';
    let sectionCounter = 1;
    const ignoreWords = ['bridge', 'chorus'];

    paragraphs.forEach(paragraph => {
      const lines = paragraph.split('\n').filter(line => {
        const lowerLine = line.toLowerCase();
        return !ignoreWords.includes(lowerLine) && !/^verse \d+$/i.test(lowerLine);
      });

      for (let i = 0; i < lines.length; i += 2) {
        if (i < lines.length) sectionedLyrics += lines[i] + '\n';
        if (i + 1 < lines.length) sectionedLyrics += lines[i + 1] + '\n';
        sectionedLyrics += `[V${sectionCounter}]\n`;
        sectionCounter++;
      }
      sectionedLyrics += '\n'; // Add a new line between paragraphs
    });

    setLyricsOutput(sectionedLyrics.trim());
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(lyricsOutput)
      .then(() => alert('Lyrics copied to clipboard!'))
      .catch(err => alert('Failed to copy lyrics: ', err));
  };

  return (
    <div className="container">
      <h1>Lyrix</h1>
      <div className="textareas">
        <textarea 
          id="lyricsInput" 
          placeholder="Paste your lyrics here..."
          value={lyricsInput}
          onChange={(e) => setLyricsInput(e.target.value)}
        ></textarea>
        <textarea 
          id="lyricsOutput" 
          placeholder="Sectioned lyrics will appear here..."
          value={lyricsOutput}
          readOnly
        ></textarea>
      </div>
      <div>
        <button id="sectionButton" onClick={handleSectionClick}>Section</button>
        <button id="copyButton" onClick={handleCopyClick}>Copy to Clipboard</button>
      </div>
      <footer>
        <p>Lyrix v1.0</p>
        <p>Powered by Tim Apps</p>
      </footer>
    </div>
  );
}

export default App;
