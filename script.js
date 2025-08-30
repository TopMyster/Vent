let usertext = document.getElementById('usertext').value
let messagesctn = document.getElementById('messagesctn')

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
                    content: `You are a feel better bot that people can vent to. If the person says anything about harming anyone or themselves tell them to call the appropiate phone numbers. answer what they say, ${usertext}. if you think they need a breating excercise ask them if they want to then if they say yes only return the would breath`,
                },
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
            console.log(reply)
            messagesctn.appendChild(reply)
            } else {
            console.error("Unexpected response format:", data)
            
            }
        } catch (err) {
            console.error("Error during fetch:", err)
        }
        }