import { useState } from 'react'
import './index.css'

export default function Chatbot() {
    const [ messages, Setmessages ] = useState([]) 
    const [ usertext, setUserText ] = useState('') 

    
    const handleChange = (event) => {
        setUserText(event.target.value);
    }

    return (
        <>
        <div id='messages'>
            {messages}
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
                    content: `You are a bot people can talk to and vent to about life. Do not be mean just be kind and funny. If you think they need to breath. The reply / ask of the user is  ${usertext}.`,
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
            Setmessages([...messages, reply])
            } else {
            Setmessages("Sorry, I couldn't get a response. Please try again.");
            console.error("Unexpected response format:", data)
            
            }
        } catch (err) {
            Setmessages("Sorry, I couldn't get a response. Please try again.");
            console.error("Error during fetch:", err)
        }
        }
}