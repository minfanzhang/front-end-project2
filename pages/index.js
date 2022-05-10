import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");

    const tasks = document.querySelector('#tasks')

    const tableRow = document.createElement('tr')
    const taskLabel1 = document.createElement('td')
    const taskText1 = document.createTextNode("prompt1")
    const taskLabel2 = document.createElement('td')
    const taskText2 = document.createTextNode(data.result)

    taskLabel1.appendChild(taskText1)
    tableRow.appendChild(taskLabel1)
    taskLabel2.appendChild(taskText2)
    tableRow.appendChild(taskLabel2)

    tasks.insertBefore(tableRow, tasks.children[1]);
    //tasks.appendChild(tableRow)
  }

  return (
    <div>
      <title>Chat with AI!</title>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
        <table>
          <tbody id='tasks'>
          <tr>
            <th>
              Prompt
            </th>
            <th>
              Response
            </th>
          
          </tr>

          </tbody>
        </table>
      </main>
    </div>
  );
}