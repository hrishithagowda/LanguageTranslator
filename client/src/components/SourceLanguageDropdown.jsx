function SourceLanguageDropdown({
  sourceLanguage,
  setSourceLanguage,
  languages,
}) {
  return (
    <>
      <p>Translate From</p>

      <select
        value={sourceLanguage}
        onChange={(event) =>
          setSourceLanguage(event.target.value)
        }
      >
        <option value="auto">Auto Detect</option>

        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
          >
            {language.name}
          </option>
        ))}
      </select>

      <br />
      <br />
    </>
  );
}

export default SourceLanguageDropdown;