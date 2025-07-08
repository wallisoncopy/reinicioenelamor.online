interface WelcomePageProps {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="space-y-4">
        <div className="mb-6">
          <div className="mx-auto max-w-xs w-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-6xl">👨‍💼</div>
              <div className="text-4xl">💔</div>
              <div className="text-6xl">👩‍💼</div>
            </div>
            <div className="text-white font-bold text-lg">
              E DESCUBRA SE ESTÁ SENDO TRAÍDO(A)
            </div>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
          Responda 19 perguntas e descubra se está sendo traído(a) em silêncio…
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Este quiz usa inteligência comportamental para revelar a verdade por trás de atitudes suspeitas.
        </p>
      </div>
      
      <div className="space-y-4">
        <button 
          onClick={onStart}
          className="w-full bg-gradient-to-r from-[var(--accent-purple)] to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-pulse-glow"
        >
          Começar agora
        </button>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <span>🔒</span>
          <span>100% anônimo e confidencial</span>
        </div>
      </div>
    </div>
  );
}
