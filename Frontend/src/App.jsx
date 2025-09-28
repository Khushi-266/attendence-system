import React from 'react'
import TeacherPanel from './Teacher/TeacherPanel'
import StudentPanel from './Student/StudentPanel'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<TeacherPanel />} />
        <Route path="/student" element={<StudentPanel />} />
      </Routes>
    </>
  )
}

export default App
