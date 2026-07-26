function LanguageDropdown({
  targetLanguage,
  setTargetLanguage,
  languages,
}) {
  return (
    <>
      <p>Translate To</p>

      <select
        value={targetLanguage}
        onChange={(event) =>
          setTargetLanguage(event.target.value)
        }
      >
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

export default LanguageDropdown;