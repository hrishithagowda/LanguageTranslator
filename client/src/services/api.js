export async function translate(text,sourceLanguage,targetLanguage) {

    const response = await fetch("http://127.0.0.1:8000/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: text,
            source: sourceLanguage,
            target: targetLanguage
        })
    });

    return await response.json();
}