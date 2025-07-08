import { useState } from "react";

const faqData = [
  {
    question: "É seguro usar o Detetive IA?",
    answer: "TOTALMENTE SEGURO! Usamos criptografia militar e não armazenamos NENHUM dado pessoal. Nem mesmo sabemos quem você é. Total anonimato garantido!"
  },
  {
    question: "Funciona mesmo ou é enganação?",
    answer: "FUNCIONA SIM! Nossa IA já analisou mais de 50.000 casos reais com 94% de precisão. Baseada em algoritmos forenses usados por investigadores profissionais."
  },
  {
    question: "Preciso baixar algum app?",
    answer: "NÃO! Funciona direto no seu navegador. Mais seguro e discreto - ninguém vai descobrir que você está investigando."
  },
  {
    question: "É pagamento único mesmo?",
    answer: "SIM! Apenas R$19,90 UMA VEZ SÓ. Sem pegadinhas, sem mensalidades, sem taxas extras. Acesso vitalício por menos que uma pizza!"
  },
  {
    question: "E se não funcionar comigo?",
    answer: "IMPOSSÍVEL não funcionar! Mas se por algum motivo você não ficar satisfeito, devolvemos 100% em até 30 dias. RISCO ZERO!"
  },
  {
    question: "Quanto tempo demora para ter o resultado?",
    answer: "IMEDIATO! Em menos de 5 minutos você terá o relatório completo com todas as evidências encontradas pela IA."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center">❓ Perguntas Frequentes</h3>
      
      <div className="space-y-3">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleFAQ(index)}
              className="w-full p-4 text-left font-semibold flex justify-between items-center hover:bg-gray-700 hover:bg-opacity-50 transition-colors duration-300"
            >
              <span>{faq.question}</span>
              <span 
                className={`transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 pt-0 text-gray-300 text-sm animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
