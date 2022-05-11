import styles from "./index.module.css";

export default function Home() {

  async function onSubmit(event) {
    event.preventDefault();

    const userPrompt = document.getElementById("promptField").value;
    
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({prompttext: userPrompt, aiEngine: document.getElementById("aiengine_dropdown").value}),
    });
    const data = await response.json();

    displayNewResponse(userPrompt, data.result)
  }

  function displayNewResponse(newPrompt, newResponse) {
    const records = document.querySelector('#recordedPromptsAndResponses')

    const newRow = document.createElement('tr')
    const promptLabel = document.createElement('td')
    const promptText = document.createTextNode(newPrompt)
    const responseLabel = document.createElement('td')
    const responseText = document.createTextNode(newResponse)

    promptLabel.appendChild(promptText)
    newRow.appendChild(promptLabel)
    responseLabel.appendChild(responseText)
    newRow.appendChild(responseLabel)

    records.insertBefore(newRow, records.children[1]);
  }

  return (
    <div>
      <title>Chat with AI</title>

      <main className={styles.main}>

        <h3>Chat with AI!</h3>
        <p>Please enter a prompt here:</p>

        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            id="promptField"
            placeholder="Write a poem about a dog wearing skis"
          />
          <input type="submit" value="Submit Prompt" />
        </form>

        <label id="label_for_aiengine">choose the AI engine:</label>
        <select id="aiengine_dropdown">
          <option value="text-curie-001">Curie</option>
          <option value="text-davinci-002">Davinci</option>
        </select>
        
        <table>
          <tbody id='recordedPromptsAndResponses'>
          <tr><th>Prompt</th><th>Response</th></tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}