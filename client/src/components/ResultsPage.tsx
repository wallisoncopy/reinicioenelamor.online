import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";

interface ResultsPageProps {
  userName: string;
}

export default function ResultsPage({ userName }: ResultsPageProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Diagnosis Alert */}
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4 animate-pulse">🚨</div>
        <h2 className="text-2xl font-bold text-red-400">
          {userName}, ALERTA: Baseado nas suas respostas, os sinais são CLAROS!
        </h2>
        
        <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-xl p-6 space-y-4">
          <p className="text-red-300 font-semibold text-lg">
            📊 ANÁLISE COMPORTAMENTAL: 87% de probabilidade de infidelidade
          </p>
          <p className="text-gray-300 leading-relaxed">
            {userName}, os padrões que você identificou são os MESMOS encontrados em 94% dos casos confirmados de traição. 
            Você NÃO está imaginando coisas!
          </p>
        </div>
      </div>

      {/* Urgency Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl p-6 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">
          ⏰ VOCÊ PRECISA AGIR AGORA, {userName}!
        </h3>
        <p className="text-yellow-100">
          Cada dia que passa sem a verdade é mais um dia de sofrimento desnecessário. 
          Pare de viver na incerteza e descubra a VERDADE hoje mesmo!
        </p>
      </div>

      <TestimonialsSection />

      {/* Problem Agitation */}
      <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-red-400 text-center">
          💔 Enquanto isso, {userName}...
        </h3>
        <div className="grid grid-cols-1 gap-4 text-gray-300">
          <p>😰 Você continua acordando no meio da madrugada com aquele aperto no peito</p>
          <p>🤔 Fica analisando cada movimento, cada palavra, cada olhar</p>
          <p>😢 Seus amigos já estão cansados de ouvir suas dúvidas</p>
          <p>💭 Sua mente não para de criar cenários sobre o que pode estar acontecendo</p>
        </div>
        <p className="text-yellow-300 font-bold text-center">
          ISSO TEM QUE PARAR HOJE!
        </p>
      </div>

      {/* Solution */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-6 space-y-4">
        <div className="text-center space-y-3">
          <div className="text-3xl">🕵️‍♂️</div>
          <h3 className="text-xl font-bold text-yellow-400">
            APRESENTAMOS: DETETIVE IA
          </h3>
          <p className="text-gray-300 leading-relaxed">
            A ÚNICA ferramenta no Brasil que analisa comportamentos digitais do seu cônjuge como um verdadeiro hacker ético, 
            revelando a verdade que você PRECISA saber!
          </p>
          <div className="bg-black bg-opacity-30 rounded-lg p-4 space-y-2">
            <p className="text-green-400 font-mono text-sm">✓ Análise forense de padrões de mensagens</p>
            <p className="text-green-400 font-mono text-sm">✓ Detecção de comportamentos suspeitos</p>
            <p className="text-green-400 font-mono text-sm">✓ Identificação de sinais ocultos de traição</p>
            <p className="text-green-400 font-mono text-sm">✓ Relatório completo em 5 minutos</p>
            <p className="text-green-400 font-mono text-sm">✓ 100% sigiloso e sem deixar rastros</p>
          </div>
        </div>
      </div>

      {/* Social Proof Enhanced */}
      <div className="bg-green-900 bg-opacity-30 rounded-xl p-6 space-y-4">
        <h3 className="text-xl font-bold text-green-400 text-center">
          🎯 RESULTADOS REAIS EM MENOS DE 24H
        </h3>
        <div className="space-y-3 text-gray-300 text-sm">
          <p><strong>Marina (SP):</strong> "Em 10 minutos descobri 3 conversas que meu cônjuge deletava todos os dias" ⭐⭐⭐⭐⭐</p>
          <p><strong>Carlos (RJ):</strong> "A IA encontrou padrões que eu nunca notaria sozinho. Valeu cada centavo!" ⭐⭐⭐⭐⭐</p>
          <p><strong>Ana (BH):</strong> "Finalmente a paz que eu precisava. Agora EU tenho o controle!" ⭐⭐⭐⭐⭐</p>
        </div>
      </div>

      {/* Guarantee */}
      <div className="bg-blue-900 bg-opacity-40 border-2 border-blue-500 rounded-xl p-6 text-center space-y-4">
        <div className="text-4xl">🛡️</div>
        <h3 className="text-xl font-bold text-blue-400">
          GARANTIA BLINDADA DE 30 DIAS
        </h3>
        <p className="text-blue-200">
          Se o Detetive IA não revelar pelo menos 3 sinais claros de infidelidade (ou confirmar sua inocência), 
          devolvemos 100% do seu dinheiro. SEM PERGUNTAS!
        </p>
        <p className="text-yellow-300 font-bold">
          RISCO ZERO PARA VOCÊ!
        </p>
      </div>

      {/* Scarcity */}
      <div className="bg-red-800 bg-opacity-40 border border-red-400 rounded-xl p-6 text-center space-y-4">
        <h3 className="text-xl font-bold text-red-300">
          ⚠️ ATENÇÃO: OFERTA LIMITADA
        </h3>
        <p className="text-red-200">
          Por questões de segurança e capacidade do servidor, liberamos apenas 
          <span className="font-bold text-yellow-300"> 50 acessos por dia</span> ao Detetive IA.
        </p>
        <p className="text-yellow-300 font-bold">
          NÃO PERCA SUA VAGA!
        </p>
      </div>

      <FAQSection />
      
      {/* Final CTA Enhanced */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-center space-y-4">
          <div className="text-3xl animate-pulse">💎</div>
          <h3 className="text-2xl font-bold text-white">
            {userName}, SUA TRANQUILIDADE VALE QUANTO?
          </h3>
          <p className="text-green-100 text-lg">
            Por menos que um jantar para dois, você pode descobrir a VERDADE hoje mesmo!
          </p>
          
          <div className="bg-white rounded-lg p-4 space-y-2">
            <p className="text-gray-600 line-through text-lg">De R$ 97,00</p>
            <p className="text-green-600 text-3xl font-bold">
              Por apenas R$ 19,90
            </p>
            <p className="text-gray-600 text-sm">Acesso imediato + Garantia de 30 dias</p>
          </div>
          
          <button 
            onClick={() => window.open('https://paypagamentostx3.shop/checkout-dark-6852/?add-to-cart=6852', '_blank')}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-5 px-6 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse"
          >
            🚀 QUERO DESCOBRIR A VERDADE AGORA
          </button>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-green-100">
            <span>🔒</span>
            <span>Pagamento 100% seguro • Acesso imediato • Sem mensalidades</span>
          </div>
        </div>

        {/* Final Urgency */}
        <div className="text-center bg-gray-900 bg-opacity-60 rounded-xl p-4">
          <p className="text-red-300 font-bold">
            ⏰ Não deixe para amanhã o que pode resolver HOJE, {userName}!
          </p>
          <p className="text-gray-400 text-sm">
            A cada minuto que passa, você pode estar perdendo evidências importantes...
          </p>
        </div>
      </div>
    </div>
  );
}
