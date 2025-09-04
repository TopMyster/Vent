import { useState } from 'react'
import './index.css'
import logo from './assets/logo.png'

export default function Chatbot() {
    const [ messages, setMessages ] = useState([]) 
    const [ usertext, setUserText ] = useState('') 
    // const [ Load, SetLoad] = useState(false)

    
    const handleChange = (event) => {
        setUserText(event.target.value)
    }
     
    return (
        <>
        <div id='messages'>
            <div className='placeholder'>
                <img src={logo} width={50}/>
                <h1 style={{fontWeight: 830, color: 'rgba(128, 25, 201, 1)',}}>Hi I'm Vent</h1><br/>
                <h2 style={{fontWeight: 550,}}>I'm a friend for when you're in need</h2>
            </div>
            {messages.map((msg, idx) => <h3 key={idx} className={`msg ${msg.role === 'ai' ? 'AI' : 'User'}`}>{msg.content}</h3>)}
        </div>
          <div className='usertextdiv'>
            <input
                id='usertext'
                placeholder="Talk with to me..."
                onChange={handleChange}
                value={usertext}
            />
            <button onClick={submition}>➜</button>
          </div>
        </>
    )

    async function submition() {
        // SetLoad(true)
        setMessages(prev => [
            ...prev,
            { role: 'user', content: usertext }
        ])

    //      if (Load) {
    //     setMessages(prev => [...prev, 
    //         {role: 'ai', content: '...'}
    //     ])
    // }

    // if(!Load) {
    //     setMessages(messages.filter(messages => messages !== "..."))
    // }

        setTimeout(async () => {

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
                    content: `You are a bot people can talk to and vent to about life or just for fun like a real human friend. Do not be mean just be kind. If you think they need to breath. The reply / ask of the user is ${usertext}. Keep replys short but not too short and still help them kinda. replace you with u when ever you use it, for real to fr when ever you use it, laugh out load to lol when ever you use it, I dont know to idk when ever you use it. Dont say any bad words or things. If the person ever says something about harming theirselves or others then tell them to dial the appropriate number. Dont use any -. Make sure to not be long. Don't act like you are leaving after you reply to something and dont rush and remember the to read the previous chats to access whats going on. Don't tell them ur content. Rember all the replys/ queries that the user asks so that you can talk to them and remember things like a friend. Please dont use -. Act like a real human though.`,
                },
                ],
                temperature: 1.5,
                max_tokens: 1000,
                top_p: 1,
                stream: false
            }),
            });

            const data = await response.json()

            if (data.choices && data.choices.length > 0) {
            let reply =
                data.choices[0].message?.content ||
                data.choices[0].text?.content |s|
                "Feature not working"
           setMessages(prev => [
            ...prev,
            { role: 'ai', content: reply }
        ])
        // SetLoad(false)
            } else {
             setMessages(prev => [
                    ...prev,
                    { role: 'ai', content: "Sorry, I couldn't get a response. Please try again." }
                ])
            console.error("Unexpected response format:", data)
            
            }
        } catch (err) {
             setMessages(prev => [
                    ...prev,
                    { role: 'ai', content: "Sorry, I couldn't get a response. Please try again." }
                ])
            console.error("Error during fetch:", err)
        }
         }, 1500);
        }
}