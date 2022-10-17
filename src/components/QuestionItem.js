import React from "react";

function QuestionItem({ question, onHandleDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"delete"
    }).then(resp => resp.json())
    .then(() => onHandleDelete(id))
  }

  const correctAnswer = (index) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH",
      headers:{"content-type":"application/json"},
      body: JSON.stringify({
        correctIndex: index,
      })
    })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={event => correctAnswer(event.target.value)}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>
        Delete Question
      </button>
    </li>
  );
}

export default QuestionItem;
