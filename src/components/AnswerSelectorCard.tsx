'use client'
import { useEffect, useRef, useState, useCallback } from 'react'



export default function AnswerSelectorCard({ question }: any) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                if (observerRef.current) {
                    observerRef.current.disconnect()
                }
            }
        })
    }, [])

    useEffect(() => {
        observerRef.current = new IntersectionObserver(observerCallback, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        })

        if (cardRef.current) {
            observerRef.current.observe(cardRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [observerCallback])

    const handleAnswerClick = (index: number) => {
        setSelectedAnswer(index)
        console.log(`Seleccionaste: ${question.answers[index].content}`)
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div
                ref={cardRef}
                className={`
                    bg-gradient-to-br from-white via-blue-50/50 to-indigo-50 backdrop-blur-sm 
                    border border-blue-100/50 shadow-xl rounded-3xl p-8 md:p-12 
                    hover:shadow-2xl transition-all duration-700 hover:-translate-y-1
                    ${isVisible
                        ? 'opacity-100 translate-y-0 blur-0 scale-100'
                        : 'opacity-0 translate-y-12 blur-sm scale-95'
                    }
                `}
            >
                {/* Resto del JSX igual que antes */}
                <div className="text-center mb-10">
                    <div className={`inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 
                          text-white px-8 py-4 rounded-2xl shadow-lg mb-6
                          ${isVisible ? 'animate-[slide-in-up_0.7s_ease-out_forwards]' : ''}`}>
                        <span className="text-3xl">📖</span>
                        <h2 className="text-xl md:text-2xl font-black leading-tight">
                            {question.question}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {question.answers.map((answer, index) => (
                        <div
                            key={index}
                            onClick={() => !selectedAnswer && handleAnswerClick(index)}
                            className={`
                                group relative p-8 rounded-2xl cursor-pointer transition-all duration-300
                                hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
                                ${isVisible ? `animate-[slide-in-up_${0.3 + index * 0.1}s_ease-out_forwards]` : ''}
                                ${selectedAnswer === index
                                    ? answer.isValid
                                        ? 'bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg ring-4 ring-emerald-300 animate-pulse'
                                        : 'bg-gradient-to-r from-rose-400 to-red-500 shadow-lg ring-4 ring-red-300 animate-pulse'
                                    : 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 shadow-lg'
                                }
                            `}
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                <div className={`w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex 
                                       items-center justify-center text-2xl font-bold shadow-xl 
                                       border-4 border-white/60
                                       ${isVisible ? `animate-[bounce-in_0.6s_ease-out_forwards]` : ''}`}>
                                    {index + 1}
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-lg md:text-xl font-semibold leading-relaxed line-clamp-4 mb-6 px-4">
                                    {answer.content}
                                </p>
                                {selectedAnswer === index && (
                                    <div className="w-full h-2 bg-white/80 rounded-full mx-auto mb-4 shadow-inner">
                                        <div className="h-2 bg-white rounded-full animate-pulse" />
                                    </div>
                                )}
                            </div>

                            <div className={`
                                absolute bottom-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center
                                shadow-lg backdrop-blur-sm text-white font-bold text-lg
                                ${selectedAnswer === index
                                    ? answer.isValid ? 'bg-emerald-500/90' : 'bg-red-500/90'
                                    : 'bg-white/60 group-hover:bg-white/90'
                                }
                                ${isVisible ? 'animate-[pop-in_0.5s_ease-out_forwards]' : ''}
                            `}>
                                {selectedAnswer === index
                                    ? answer.isValid ? '✅' : '❌'
                                    : '➤'
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {selectedAnswer !== null && (
                    <div className="mt-10 pt-8 border-t-2 border-dashed border-blue-200 text-center">
                        <div className={`
                            inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-xl shadow-xl mx-auto
                            ${question.answers[selectedAnswer].isValid
                                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                                : 'bg-gradient-to-r from-orange-400 to-amber-500 text-white'
                            }
                            ${isVisible ? 'animate-[slide-in-up_0.7s_ease-out_forwards]' : ''}
                        `}>
                            {question.answers[selectedAnswer].isValid
                                ? '🎉 ¡Correcto!'
                                : `💡 La respuesta correcta era la ${question.answers.findIndex(a => a.isValid) + 1}`
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}