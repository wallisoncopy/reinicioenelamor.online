export default function CTASection() {
  const handlePurchase = () => {
    window.open('https://paypagamentostx3.shop/checkout-dark-6852/?add-to-cart=6852', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[var(--accent-purple)] to-pink-500 rounded-xl p-6 text-center space-y-4">
        <div className="text-2xl">🔍</div>
        <h3 className="text-xl font-bold">Descubra a verdade agora</h3>
        <p className="text-sm opacity-90">Acesso imediato ao Detetive IA</p>
        
        <button 
          onClick={handlePurchase}
          className="w-full bg-white text-purple-700 font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          🔍 Quero usar o Detetive IA agora por <span className="text-green-600">R$19,90</span>
        </button>
        
        <div className="flex items-center justify-center space-x-2 text-xs opacity-75">
          <span>🔒</span>
          <span>Pagamento 100% seguro</span>
        </div>
      </div>
    </div>
  );
}
