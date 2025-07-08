import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import WelcomePage from "@/components/WelcomePage";
import NameInputPage from "@/components/NameInputPage";
import QuestionPage from "@/components/QuestionPage";
import ResultsPage from "@/components/ResultsPage";

export type QuizPage = 'welcome' | 'nameInput' | 'question' | 'results';
export type Answer = 'sim' | 'nao' | 'as-vezes';

export interface Question {
  emoji: string;
  text: string;
}

const questions: Question[] = [
  { emoji: '📱', text: 'Seu cônjuge começou a esconder o celular ou colocou senha recentemente?' },
  { emoji: '😔', text: 'O comportamento do seu cônjuge mudou de repente (mais frio, distante ou irritado)?' },
  { emoji: '💔', text: 'Seu cônjuge evita contato físico ou dá desculpas para o sexo?' },
  { emoji: '🚪', text: 'Seu cônjuge está saindo com mais frequência e sem explicar direito?' },
  { emoji: '🤥', text: 'Já pegou alguma mentira sobre onde seu cônjuge estava ou com quem estava?' },
  { emoji: '💄', text: 'Seu cônjuge começou a se cuidar mais do que o normal sem motivo claro?' },
  { emoji: '🛡️', text: 'Seu cônjuge fica na defensiva quando você faz perguntas simples?' },
  { emoji: '🏠', text: 'Seu cônjuge tem passado mais tempo fora de casa ou longe de você?' },
  { emoji: '👥', text: 'Seu cônjuge evita sair com você em público ou te apresentar para amigos?' },
  { emoji: '💬', text: 'As conversas com seu cônjuge ficaram mais curtas, secas ou sem emoção?' },
  { emoji: '👁️', text: 'Você sente que tem alguém estranho acompanhando suas redes sociais?' },
  { emoji: '😊', text: 'Seu cônjuge parece mais feliz longe de você do que ao seu lado?' },
  { emoji: '🌙', text: 'Seu cônjuge chegou em casa tarde várias vezes com desculpas estranhas?' },
  { emoji: '💸', text: 'Seu cônjuge começou a gastar dinheiro de forma misteriosa ou escondida?' },
  { emoji: '👔', text: 'Seu cônjuge mudou o estilo de roupa ou perfume sem motivo aparente?' },
  { emoji: '📞', text: 'Seu cônjuge recebe ligações e sai para atender em local privado?' },
  { emoji: '🚗', text: 'O carro do seu cônjuge tem cheiros diferentes ou objetos estranhos?' },
  { emoji: '💻', text: 'Seu cônjuge deletou histórico do navegador ou esconde atividades online?' },
  { emoji: '🕵️‍♂️', text: 'Gostaria de ter uma ferramenta como um hacker ético para analisar os comportamentos digitais do seu cônjuge?' }
];

export default function Quiz() {
  const [currentPage, setCurrentPage] = useState<QuizPage>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleStartQuiz = () => {
    setCurrentPage('nameInput');
  };

  const handleSubmitName = (name: string) => {
    setUserName(name);
    setCurrentPage('question');
  };

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentPage('results');
    }
  };

  const progress = currentPage === 'question' ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const showProgress = currentPage === 'question';

  return (
    <div className="min-h-screen">
      {showProgress && <ProgressBar progress={progress} />}
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          {currentPage === 'welcome' && (
            <WelcomePage onStart={handleStartQuiz} />
          )}
          
          {currentPage === 'nameInput' && (
            <NameInputPage onSubmit={handleSubmitName} />
          )}
          
          {currentPage === 'question' && (
            <QuestionPage
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
          )}
          
          {currentPage === 'results' && (
            <ResultsPage userName={userName} />
          )}
        </div>
      </div>
    </div>
  );
}
