// features/test-flow/useTestFlow.ts
import { useState } from 'react'
import { testQuestions } from './questions'

export function useTestFlow() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const current = testQuestions[step]
  const isLast = step === testQuestions.length - 1

  const selectAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [current.id]: value,
    }))
    if (!isLast) setStep(prev => prev + 1)
  }

  return { current, step, isLast, answers, selectAnswer }
}
