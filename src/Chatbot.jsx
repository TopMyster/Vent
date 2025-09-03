import { useState } from 'react'
import './index.css'

export default function Chatbot() {
    const [ messages, Setmessages ] = useState([]) 
    const [ usertext, setUserText ] = useState('') 

    
    const handleChange = (event) => {
        setUserText(event.target.value)
    }

    return (
        <>
        <div id='messages'>
            {messages.map((msg, idx) => <h3 key={idx} className={`msg ${msg.role === 'ai' ? 'AI' : 'User'}`}>{msg.content}</h3>)}
        </div>
          <div className='usertextdiv'>
            <input
                id='usertext'
                placeholder="Type your message..."
                onChange={handleChange}
                value={usertext}
            />
            <button onClick={submition}>➜</button>
          </div>
        </>
    )

    async function submition() {
        Setmessages(prev => [
            ...prev,
            { role: 'user', content: usertext }
        ])

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
                    content: `You are a bot people can talk to and vent to about life or just for fun. Do not be mean just be kind. If you think they need to breath. The reply / ask of the user is  ${usertext}. Keep replys short but helpful. Use abbreviations but only You to u, for real to fr, laugh out load to lol, I dont know to idk, good night to gn, Whats good to wsg. Dont say any bad words or things. If the person ever says something about harming theirselves or others then tell them to dial the appropriate number.`,
                },
                ],
                temperature: 1,
                max_tokens: 500,
                top_p: 1,
                stream: false
            }),
            });

            const data = await response.json()

            if (data.choices && data.choices.length > 0) {
            const reply =
                data.choices[0].message?.content ||
                data.choices[0].text?.content ||
                "Feature not working"
           Setmessages(prev => [
            ...prev,
            { role: 'ai', content: reply }
        ])
            } else {
             Setmessages(prev => [
                    ...prev,
                    { role: 'ai', content: "Sorry, I couldn't get a response. Please try again." }
                ])
            console.error("Unexpected response format:", data)
            
            }
        } catch (err) {
             Setmessages(prev => [
                    ...prev,
                    { role: 'ai', content: "Sorry, I couldn't get a response. Please try again." }
                ])
            console.error("Error during fetch:", err)
        }
        }
}