import { useState } from 'react'
export default function Chatbot() {
    const [ messages, Setmessages ] = useState('')
    function msg() {
        Setmessages('hi')
    }
    return (
        <>
        <div>
            {messages}
        </div>
        <h1>Hi</h1>
        <button onClick={msg}>hi</button>
        </>
    )
}