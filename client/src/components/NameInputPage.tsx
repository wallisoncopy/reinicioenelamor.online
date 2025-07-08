import { useState } from "react";

interface NameInputPageProps {
  onSubmit: (name: string) => void;
}

export default function NameInputPage({ onSubmit }: NameInputPageProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-2xl font-bold">Qual o seu nome?</h2>
        <p className="text-gray-300">(Não será revelado a ninguém)</p>
      </div>
      
      <div className="space-y-6">
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite seu nome..."
          className="w-full bg-gray-800 border border-gray-600 rounded-xl py-4 px-6 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)] focus:border-transparent transition-all duration-300"
        />
        
        <button 
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="w-full bg-gradient-to-r from-[var(--accent-purple)] to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
