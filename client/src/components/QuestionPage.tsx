import { Question, Answer } from "@/pages/Quiz";

interface QuestionPageProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: Answer) => void;
}

export default function QuestionPage({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer 
}: QuestionPageProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="text-5xl mb-4">{question.emoji}</div>
        <div className="text-sm text-gray-400">
          Pergunta {questionNumber} de {totalQuestions}
        </div>
        <h2 className="text-xl font-semibold leading-relaxed">
          {question.text}
        </h2>
      </div>
      
      <div className="space-y-4">
        <button 
          onClick={() => onAnswer('sim')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
        >
          ✅ Sim
        </button>
        <button 
          onClick={() => onAnswer('nao')}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
        >
          ❌ Não
        </button>
        <button 
          onClick={() => onAnswer('as-vezes')}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
        >
          ⚠️ Às vezes
        </button>
      </div>
    </div>
  );
}
