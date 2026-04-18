import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AnswerSelectorCard from './components/AnswerSelectorCard'
import { questions } from './services/questions'

function randomizeQuestion(questions: any): any {
  let randomizedQuestions: any = []

  questions.forEach(() => {
    while (true) {
      let random = Math.floor(Math.random() * questions.length)
      let question = questions[random]


      if (!randomizedQuestions.includes(question)) {
        randomizedQuestions.push(question)
        break
      }
    }
  })

  return randomizedQuestions
}

function App() {
  const [uestions, setQuestions] = useState<any>(questions)
  const randomQuestionsCallback = useCallback(randomizeQuestion, uestions)
  useEffect(() => {
    setQuestions(randomQuestionsCallback(uestions))
  }, [])

  return (
    <>


      <h1 className='text-3xl font-bold text-center'>Survey del libro de Tito</h1>
      <div className='mx-5'>
        <button
          onClick={() => setQuestions(randomQuestionsCallback(uestions))}
          className='bg-linear-60 from-blue-700 to-blue-800 rounded-lg w-full text-center hover:opacity-80 transition p-3 text-lg font-bold  text-white'>Randomizar preguntas</button>
      </div>
      {uestions.map((question: any) => <AnswerSelectorCard question={question}></AnswerSelectorCard>)}


      <div className='flex flex-col gap-3'></div>
    </>
  )
}

export default App
