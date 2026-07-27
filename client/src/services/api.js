export async function translate(text,sourceLanguage,targetLanguage) {

    const response = await fetch(
  "https://language-translator-server.onrender.com/translate",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      source: sourceLanguage,
      target: targetLanguage,
    }),
  }
);

    return await response.json();
}