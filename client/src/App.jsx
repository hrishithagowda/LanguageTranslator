import { useState, useEffect } from "react";
import "./App.css";
import { languages } from "./data/languages";
import { translate } from "./services/api";
import Header from "./components/Header";
import LanguageDropdown from "./components/LanguageDropdown";
import SourceLanguageDropdown from "./components/SourceLanguageDropdown";

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("hi");
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  async function translateText() {
    if (text.trim() === "") {
      setError("Please enter some text.");
      return;
    }

    try {
      const data = await translate(
        text,
        sourceLanguage,
        targetLanguage
      );

      setTranslatedText(data.translatedText);
      setError("");
      await loadHistory();
    } catch (error) {
      console.log(error);
    }
  }

  async function loadHistory() {
    const response = await fetch(
  "https://language-translator-server.onrender.com/history"
);

    const data = await response.json();

    setHistory(data);
  }

  async function clearHistory() {
    await fetch(
  "https://language-translator-server.onrender.com/history",
  {
    method: "DELETE",
  }
);

    setHistory([]);
  }

  function swapLanguages() {
    const tempLanguage = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLanguage);

    const tempText = text;
    setText(translatedText);
    setTranslatedText(tempText);
  }

  function clearText() {
    setText("");
    setTranslatedText("");
  }

  function copyText() {
    navigator.clipboard.writeText(translatedText);
    alert("Translation copied!");
  }

  useEffect(() => {
    loadHistory();
  }, []);

  function getLanguageName(code) {
    if (code === "auto") {
      return "Auto Detect";
    }

    const language = languages.find(
      (item) => item.code === code
    );

    return language ? language.name : code;
  }

  return (
    <div className="app-container">

      <Header />

      <div className="language-section">

        <div>

          <SourceLanguageDropdown
            sourceLanguage={sourceLanguage}
            setSourceLanguage={setSourceLanguage}
            languages={languages}
          />

        </div>

        <div>

          <button
            className="swap-btn"
            onClick={swapLanguages}
          >
            ⇄ Swap
          </button>

        </div>

        <div>

          <LanguageDropdown
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
            languages={languages}
          />

        </div>

      </div>

      <h2>Enter Text</h2>

      <textarea
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <div className="button-group">

        <button
          className="translate-btn"
          onClick={translateText}
        >
          Translate
        </button>

        <button
          className="copy-btn"
          onClick={copyText}
        >
          📋 Copy
        </button>

        <button
          className="clear-btn"
          onClick={clearText}
        >
          🗑️ Clear
        </button>

      </div>

      <h2>Translated Text</h2>

      <textarea
        value={translatedText}
        readOnly
      />

      <h2>Translation History</h2>

      <button
      className="history-btn"
      onClick={clearHistory}
      >
        🗑️ Clear History
      </button>

<br />
<br />

      {history.map((item, index) => (

        <div
          key={index}
          className="history-card"
        >

          <h3>🌍 Translation</h3>

          <p>
            <strong>From:</strong>{" "}
            {getLanguageName(
              item.source_language
            )}
          </p>

          <p>
            <strong>To:</strong>{" "}
            {getLanguageName(
              item.target_language
            )}
          </p>

          <p>
            <strong>Original:</strong>{" "}
            {item.original_text}
          </p>

          <p>
            <strong>Translated:</strong>{" "}
            {item.translated_text}
          </p>

        </div>

      ))}

    </div>
  );
}

export default App;