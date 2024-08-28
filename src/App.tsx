import { Route, Routes } from 'react-router-dom'
import './App.css'
import QuestionList from './questions/components/QuestionList/QuestionList'
import QuestionDetails from './questions/components/QuestionDetails/QuestionDetails'

function App() {

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<QuestionList />} />
          <Route path=":questionId" element={<QuestionDetails />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
