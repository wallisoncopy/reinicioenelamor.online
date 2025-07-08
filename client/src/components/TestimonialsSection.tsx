const testimonials = [
  {
    name: "Amanda C., SP",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b442?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    text: "Eu só queria paz… O Detetive IA me mostrou o que meu cônjuge escondia."
  },
  {
    name: "Ricardo M., RJ", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    text: "Achei que era coisa da minha cabeça. Descobri que não era."
  },
  {
    name: "Júlia F., BH",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", 
    text: "Simples, rápido e sigiloso. Vale cada centavo."
  }
];

export default function TestimonialsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">💬 O que nossos usuários dizem:</h3>
      
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-gray-800 bg-opacity-50 rounded-xl p-5 space-y-3">
          <div className="flex items-center space-x-3">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              className="w-12 h-12 rounded-full border-2 border-[var(--accent-purple)]" 
            />
            <div>
              <div className="font-semibold text-sm">{testimonial.name}</div>
              <div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="text-gray-300 text-sm italic">"{testimonial.text}"</p>
        </div>
      ))}
    </div>
  );
}
