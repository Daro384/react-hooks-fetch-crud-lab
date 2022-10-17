import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List")
  const [questions, setQuestions] = useState([])

  const handleSubmit = newQuestion => {
    newQuestion["id"] = questions.slice(-1)[0].id + 1
    setQuestions([...questions, newQuestion])
  }

  const handleDelete = deletedQuestionID => {
    const newQuestions = questions.filter(question => question.id !== deletedQuestionID)
    setQuestions(newQuestions)
  }

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(fetchedQuestions => setQuestions([...fetchedQuestions]))
  }, [])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
        <QuestionForm onHandleSubmit={handleSubmit}/> 
        : 
        <QuestionList onHandleDelete={handleDelete} questions={questions}/>}
    </main>
  );
}

export default App;
