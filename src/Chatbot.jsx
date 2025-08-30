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
            const reply =
                data.choices[0].message?.content ||
                data.choices[0].text?.content ||
                "Please ask a work related question."
            Setmessages(reply)
            console.log(reply)
            } else {
            console.error("Unexpected response format:", data)
            
            }
        } catch (err) {
            console.error("Error during fetch:", err)
        }
        }
}