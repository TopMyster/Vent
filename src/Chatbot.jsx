import { useState } from 'react'
export default function Chatbot() {
    const [ messages, Setmessages ] = useState('')

    return (
        <>
        <div>
            {messages}
        </div>
        <h1>Hi</h1>
        <input/>
        <button onClick={submition}>send</button>
        </>
    )

    async function submition() {
  document.getElementById('result').textContent = "Loading..."
  document.getElementById('chatresult').style.display = 'block'
  let transcript = document.getElementById('usertext').value
  const txt = "My name Toope Oladunjoye. I am not currently working and I want to go to MIT for college. If they ask for my age tell them my age based on the fact that I was born May 22, 2012. My tech stack is HTML, CSS, JS, React, and Figma. My hobbies are coding, designing, running, and playing videogames. My projects are under the work tab in the navigation collum and my resume and cv are on https://toopeoladunjoye.com/assets/docs.pdf. My contacts are under the contact tab in the navigation collum. My devlog can be accessed by pressing Control + / got it but this is not the easter egg."
  let result = document.getElementById('result')
  console.log("Sending transcript:", transcript)

  try {
    const response = await fetch("/api/chat", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "user",
            content: `You are a feel better bot`,
          },
          {
            role: "user",
            content: transcript
          }
        ],
        temperature: 1,
        max_tokens: 200,
        top_p: 1,
        stream: false
      }),
    });

    const data = await response.json()

    if (data.choices && data.choices.length > 0) {
      document.getElementById('chatresult').style.display = 'block'
      const reply =
        data.choices[0].message?.content ||
        data.choices[0].text?.content ||
        "Please ask a work related question."
      result.textContent = reply
    } else {
      console.error("Unexpected response format:", data)
      result.textContent = "This feature is not working at this time"
    }
  } catch (err) {
    console.error("Error during fetch:", err)
    result.textContent = "This feature is not working at this time"
  }
}
}