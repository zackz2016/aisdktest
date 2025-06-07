'use client'

import { useState } from 'react'
import { StepCard } from '@/components/test/StepCard'
import { useTestFlow } from '@/features/test-flow/useTestFlow'



export default function TestPage() {

    const [imagePrompt, setImagePrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const { current, selectAnswer, isLast, answers } = useTestFlow()

    const handleGenerate = async () => {
        setLoading(true);
        try {
            await fetch('/api/prompt', {
                method: 'POST',
                body: JSON.stringify({
                prompt: 'Why is the sky blue?',
                }),
            }).then(response => {
                response.json().then(json => {
                setImagePrompt(json.text);
                setLoading(false);
                });
            });
            
           
        } catch (error) {
            console.error('生成提示失败:', error);
            // 可以设置一个错误状态，并在UI中显示给用户
            // setErrorState('生成猫咪提示失败，请稍后再试。');
        } 
    };


  return (
    <main className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-2xl font-bold">{current.title}</h1>
      <div className="grid grid-cols-3 gap-4 max-w-xl">
        {current.options.map(option => (
          <StepCard
            key={option.value}
            label={option.label}
            onClick={() => selectAnswer(option.value)}
          />
        ))}
      </div>

      {isLast && (
        <>
            <div className="mt-8 bg-gray-100 p-4 rounded">
            {JSON.stringify(answers, null, 2)}
            </div>

            <div className="mt-8">
                <button
                    className="bg-black text-white px-4 py-2 rounded"
                    onClick={handleGenerate}
                    disabled={loading}
                    >
                    {loading ? '生成中...' : '生成猫咪提示'}
                </button>

                {imagePrompt && (
                    <div className="mt-4 whitespace-pre-wrap p-4 bg-gray-100 rounded">
                        <h2 className="font-bold mb-2">🎯 Prompt:</h2>
                        {imagePrompt}
                    </div>
                )}
            </div>
         </>
      )}


    </main>
  )
}
