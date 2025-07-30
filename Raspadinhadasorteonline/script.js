
/**
 * RASPEBET - PLATAFORMA DE BETTING COMPLETA
 * Sistema de raspadinha com pagamento PIX, painel de ganhadores e visual profissional
 * Desenvolvido para simular uma experiência real de betting online
 */

// Configurações do sistema
const GAME_CONFIG = {
    // Porcentagem mínima que precisa ser raspada para revelar o prêmio
    revealThreshold: 60,
    // Chave para localStorage - controle de sessão
    sessionKey: 'raspebet_session',
    // Tamanho do pincel para raspar
    brushSize: 25,
    // Timer do PIX em segundos
    pixTimer: 900, // 15 minutos
    // Preços dos jogos
    gamePrices: {
        5: { max: 1000, chances: 10 },
        10: { max: 10000, chances: 8 },
        25: { max: 50000, chances: 5 }
    }
};

// Definição dos prêmios por categoria de valor
const PRIZES_BY_VALUE = {
    5: [
        { id: 'money50', name: 'R$ 50', icon: '💵', description: 'Cinquenta reais', rarity: 'common', message: 'Parabéns! Você ganhou R$ 50!' },
        { id: 'money100', name: 'R$ 100', icon: '💰', description: 'Cem reais', rarity: 'uncommon', message: 'Excelente! R$ 100 são seus!' },
        { id: 'money500', name: 'R$ 500', icon: '💸', description: 'Quinhentos reais', rarity: 'rare', message: 'Fantástico! Você ganhou R$ 500!' },
        { id: 'money1000', name: 'R$ 1.000', icon: '🤑', description: 'Mil reais', rarity: 'super-rare', message: 'Incrível! R$ 1.000 são seus!' }
    ],
    10: [
        { id: 'money100', name: 'R$ 100', icon: '💵', description: 'Cem reais', rarity: 'common', message: 'Parabéns! Você ganhou R$ 100!' },
        { id: 'money500', name: 'R$ 500', icon: '💰', description: 'Quinhentos reais', rarity: 'uncommon', message: 'Excelente! R$ 500 são seus!' },
        { id: 'money2000', name: 'R$ 2.000', icon: '💸', description: 'Dois mil reais', rarity: 'rare', message: 'Fantástico! Você ganhou R$ 2.000!' },
        { id: 'money5000', name: 'R$ 5.000', icon: '🤑', description: 'Cinco mil reais', rarity: 'super-rare', message: 'Incrível! R$ 5.000 são seus!' },
        { id: 'money10000', name: 'R$ 10.000', icon: '💎', description: 'Dez mil reais', rarity: 'ultra-rare', message: 'JACKPOT! R$ 10.000 são seus!' }
    ],
    25: [
        { id: 'money1000', name: 'R$ 1.000', icon: '💵', description: 'Mil reais', rarity: 'common', message: 'Parabéns! Você ganhou R$ 1.000!' },
        { id: 'money5000', name: 'R$ 5.000', icon: '💰', description: 'Cinco mil reais', rarity: 'uncommon', message: 'Excelente! R$ 5.000 são seus!' },
        { id: 'motorcycle', name: 'Moto Esportiva', icon: '🏍️', description: 'Moto Honda CB 650F', rarity: 'rare', message: 'Incrível! Uma moto esportiva é sua!' },
        { id: 'car', name: 'Carro 0KM', icon: '🚗', description: 'Chevrolet Onix Plus', rarity: 'super-rare', message: 'FANTÁSTICO! Um carro 0KM te espera!' },
        { id: 'iphone', name: 'iPhone 15 Pro', icon: '📱', description: 'iPhone 15 Pro 256GB', rarity: 'super-rare', message: 'INCRÍVEL! iPhone 15 Pro é seu!' },
        { id: 'money50000', name: 'R$ 50.000', icon: '💎', description: 'Cinquenta mil reais', rarity: 'ultra-rare', message: 'JACKPOT MÁXIMO! R$ 50.000!' }
    ]
};

// Lista de ganhadores simulados para o ticker
const FAKE_WINNERS = [
    { name: 'João S.', city: 'São Paulo', prize: 'R$ 10.000', time: '2 min atrás' },
    { name: 'Maria C.', city: 'Rio de Janeiro', prize: 'iPhone 15 Pro', time: '5 min atrás' },
    { name: 'Pedro L.', city: 'Belo Horizonte', prize: 'R$ 25.000', time: '8 min atrás' },
    { name: 'Ana B.', city: 'Salvador', prize: 'Moto Esportiva', time: '12 min atrás' },
    { name: 'Carlos M.', city: 'Brasília', prize: 'R$ 5.000', time: '15 min atrás' },
    { name: 'Luciana F.', city: 'Fortaleza', prize: 'Carro 0KM', time: '18 min atrás' },
    { name: 'Rafael P.', city: 'Porto Alegre', prize: 'R$ 15.000', time: '22 min atrás' },
    { name: 'Camila R.', city: 'Recife', prize: 'R$ 8.000', time: '25 min atrás' },
    { name: 'Felipe N.', city: 'Curitiba', prize: 'iPhone 15 Pro', time: '28 min atrás' },
    { name: 'Isabella T.', city: 'Goiânia', prize: 'R$ 12.000', time: '32 min atrás' }
];

// Variáveis globais do sistema
let canvas, ctx;
let isDrawing = false;
let scratchedPercentage = 0;
let selectedGameValue = 10;
let selectedPrize = null;
let pixTimer = null;
let currentPixCode = '';

/**
 * Inicialização do sistema quando a página carrega
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Inicializando RaspeBet...');
    
    // Inicializar componentes
    initializeWinnersTicker();
    initializePaymentSystem();
    
    // Mostrar tela inicial de pagamento
    showPaymentScreen();
    
    console.log('✅ RaspeBet inicializado com sucesso!');
});

/**
 * Inicializa o ticker de ganhadores
 */
function initializeWinnersTicker() {
    const ticker = document.getElementById('winnersTicker');
    
    // Gerar HTML dos ganhadores
    let winnersHTML = '';
    FAKE_WINNERS.forEach((winner, index) => {
        winnersHTML += `
            <div class="winner-item">
                <div class="winner-avatar">${winner.name.charAt(0)}</div>
                <div class="winner-info">
                    <div class="winner-name">${winner.name} - ${winner.city}</div>
                    <div class="winner-prize">Ganhou: ${winner.prize} • ${winner.time}</div>
                </div>
            </div>
        `;
    });
    
    // Duplicar para efeito contínuo
    ticker.innerHTML = winnersHTML + winnersHTML;
    
    console.log('🏆 Ticker de ganhadores inicializado');
}

/**
 * Inicializa o sistema de pagamento
 */
function initializePaymentSystem() {
    // Event listeners para seleção de valor
    document.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            selectPaymentOption(this);
        });
    });
    
    // Selecionar opção padrão (R$ 10)
    const defaultOption = document.querySelector('[data-value="10"]');
    if (defaultOption) {
        selectPaymentOption(defaultOption);
    }
    
    console.log('💳 Sistema de pagamento inicializado');
}

/**
 * Seleciona uma opção de pagamento
 */
function selectPaymentOption(optionElement) {
    // Remove seleção anterior
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Adiciona seleção atual
    optionElement.classList.add('selected');
    
    // Armazena valor selecionado
    selectedGameValue = parseInt(optionElement.dataset.value);
    
    // Mostra área do PIX
    showPixPayment();
    
    console.log('💰 Valor selecionado: R$', selectedGameValue);
}

/**
 * Mostra a área de pagamento PIX
 */
function showPixPayment() {
    const pixPayment = document.getElementById('pixPayment');
    const pixValue = document.getElementById('pixValue');
    
    // Atualizar valor
    pixValue.textContent = selectedGameValue.toFixed(2).replace('.', ',');
    
    // Gerar código PIX simulado
    generatePixCode();
    
    // Mostrar área do PIX
    pixPayment.classList.remove('hidden');
    
    // Iniciar timer
    startPixTimer();
    
    console.log('📱 Área PIX exibida');
}

/**
 * Gera um código PIX simulado
 */
function generatePixCode() {
    // Código PIX simulado (não funcional - apenas para demonstração)
    const baseCode = '00020126580014BR.GOV.BCB.PIX013636cb5620-6f9e-4d4a-9f7b-abc123456789520400005303986540';
    const valueCode = selectedGameValue.toFixed(2);
    const merchantCode = '5802BR5925RASPEBET JOGOS ONLINE6009SAO PAULO62140510RPT';
    const timestamp = Date.now().toString().slice(-6);
    
    currentPixCode = baseCode + valueCode.length + valueCode + merchantCode + timestamp + '630445E6';
    
    document.getElementById('pixCode').value = currentPixCode;
    
    // Simular QR Code (em produção, seria gerado um QR real)
    updateQRCode();
}

/**
 * Atualiza o QR Code (simulado)
 */
function updateQRCode() {
    const qrImage = document.getElementById('qrCodeImage');
    
    // Em produção, aqui seria gerado um QR Code real
    // Por enquanto, mantemos um placeholder
    qrImage.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="20" height="20" fill="black"/>
        <rect x="60" y="20" width="20" height="20" fill="black"/>
        <rect x="100" y="20" width="20" height="20" fill="black"/>
        <rect x="140" y="20" width="20" height="20" fill="black"/>
        <rect x="20" y="60" width="20" height="20" fill="black"/>
        <rect x="180" y="60" width="20" height="20" fill="black"/>
        <text x="100" y="110" text-anchor="middle" font-family="Arial" font-size="12" fill="black">PIX</text>
        <text x="100" y="130" text-anchor="middle" font-family="Arial" font-size="10" fill="black">R$ ${selectedGameValue.toFixed(2)}</text>
    </svg>`;
    
    console.log('📱 QR Code atualizado');
}

/**
 * Inicia o timer do PIX
 */
function startPixTimer() {
    let timeLeft = GAME_CONFIG.pixTimer;
    const timerElement = document.getElementById('timer');
    
    pixTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(pixTimer);
            timerElement.textContent = '00:00';
            showPaymentExpired();
        }
    }, 1000);
    
    console.log('⏰ Timer PIX iniciado');
}

/**
 * Simula o pagamento (para testes)
 */
function simulatePayment() {
    console.log('🎮 Simulando pagamento...');
    
    // Parar timer
    if (pixTimer) {
        clearInterval(pixTimer);
    }
    
    // Simular delay de processamento
    document.querySelector('.status-pending span').textContent = 'Processando pagamento...';
    
    setTimeout(() => {
        document.querySelector('.status-pending span').textContent = 'Pagamento confirmado! ✅';
        document.querySelector('.status-pending').style.color = '#00ff88';
        
        setTimeout(() => {
            startGame();
        }, 2000);
    }, 3000);
}

/**
 * Copia o código PIX para a área de transferência
 */
function copyPixCode() {
    const pixCodeInput = document.getElementById('pixCode');
    
    pixCodeInput.select();
    document.execCommand('copy');
    
    // Feedback visual
    const copyBtn = document.querySelector('.copy-btn');
    const originalHTML = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyBtn.style.background = '#00ff88';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.background = '#ffd700';
    }, 2000);
    
    console.log('📋 Código PIX copiado');
}

/**
 * Inicia o jogo após pagamento confirmado
 */
function startGame() {
    console.log('🚀 Iniciando jogo com valor R$', selectedGameValue);
    
    // Selecionar prêmio baseado no valor pago
    selectedPrize = selectRandomPrize(selectedGameValue);
    console.log('🏆 Prêmio selecionado:', selectedPrize.name);
    
    // Esconder tela de pagamento e mostrar área do jogo
    hidePaymentScreen();
    showGameArea();
    
    // Configurar canvas e área do prêmio
    setupCanvas();
    setupPrizeArea();
}

/**
 * Seleciona um prêmio aleatório baseado no valor pago e raridade
 */
function selectRandomPrize(gameValue) {
    const prizes = PRIZES_BY_VALUE[gameValue];
    const rand = Math.random() * 100;
    
    // Sistema de probabilidades baseado na raridade
    if (rand < 5) {
        // 5% - Ultra raro
        return prizes.find(p => p.rarity === 'ultra-rare') || prizes[prizes.length - 1];
    } else if (rand < 15) {
        // 10% - Super raro
        return prizes.find(p => p.rarity === 'super-rare') || prizes[prizes.length - 2];
    } else if (rand < 30) {
        // 15% - Raro
        return prizes.find(p => p.rarity === 'rare') || prizes[prizes.length - 3];
    } else if (rand < 60) {
        // 30% - Incomum
        return prizes.find(p => p.rarity === 'uncommon') || prizes[1];
    } else {
        // 40% - Comum
        return prizes.find(p => p.rarity === 'common') || prizes[0];
    }
}

/**
 * Configura o canvas para o efeito scratch
 */
function setupCanvas() {
    canvas = document.getElementById('scratchCanvas');
    ctx = canvas.getContext('2d');
    
    // Configurar canvas para alta resolução
    const rect = canvas.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // Criar camada de "raspagem"
    createScratchLayer();
    
    // Configurar eventos do canvas
    setupCanvasEvents();
    
    console.log('🎨 Canvas configurado');
}

/**
 * Cria a camada que será "raspada"
 */
function createScratchLayer() {
    // Criar gradiente para a camada de raspagem
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#c0c0c0');
    gradient.addColorStop(0.5, '#silver');
    gradient.addColorStop(1, '#a0a0a0');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Adicionar textura
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Adicionar texto
    ctx.fillStyle = '#666';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('RASPE AQUI', canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '16px Arial';
    ctx.fillText('👆 Use o dedo ou mouse', canvas.width / 2, canvas.height / 2 + 20);
}

/**
 * Configura os eventos de interação do canvas
 */
function setupCanvasEvents() {
    // Eventos de mouse
    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', continueScratch);
    canvas.addEventListener('mouseup', stopScratch);
    canvas.addEventListener('mouseleave', stopScratch);
    
    // Eventos de touch para dispositivos móveis
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopScratch);
    
    console.log('👆 Eventos de scratch configurados');
}

/**
 * Manipula eventos de touch
 */
function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    if (e.type === 'touchstart') {
        startScratch({ offsetX: x, offsetY: y });
    } else if (e.type === 'touchmove') {
        continueScratch({ offsetX: x, offsetY: y });
    }
}

/**
 * Inicia o processo de raspagem
 */
function startScratch(e) {
    isDrawing = true;
    scratch(e.offsetX, e.offsetY);
}

/**
 * Continua o processo de raspagem
 */
function continueScratch(e) {
    if (!isDrawing) return;
    scratch(e.offsetX, e.offsetY);
}

/**
 * Para o processo de raspagem
 */
function stopScratch() {
    isDrawing = false;
}

/**
 * Executa o efeito de raspagem
 */
function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, GAME_CONFIG.brushSize, 0, 2 * Math.PI);
    ctx.fill();
    
    // Calcular porcentagem raspada
    calculateScratchedPercentage();
}

/**
 * Calcula a porcentagem da área raspada
 */
function calculateScratchedPercentage() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    
    let transparentPixels = 0;
    const totalPixels = pixelData.length / 4;
    
    for (let i = 3; i < pixelData.length; i += 4) {
        if (pixelData[i] === 0) {
            transparentPixels++;
        }
    }
    
    scratchedPercentage = (transparentPixels / totalPixels) * 100;
    
    // Atualizar barra de progresso
    updateProgress();
    
    // Verificar se deve revelar o prêmio
    if (scratchedPercentage >= GAME_CONFIG.revealThreshold) {
        revealPrize();
    }
}

/**
 * Atualiza a barra de progresso
 */
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.querySelector('.progress-text');
    
    const displayPercentage = Math.min(scratchedPercentage, 100);
    progressFill.style.width = displayPercentage + '%';
    
    if (scratchedPercentage < GAME_CONFIG.revealThreshold) {
        progressText.textContent = `Continue raspando... ${Math.round(displayPercentage)}%`;
    } else {
        progressText.textContent = 'Prêmio revelado! 🎉';
    }
}

/**
 * Configura a área do prêmio
 */
function setupPrizeArea() {
    const prizeContent = document.getElementById('prizeContent');
    const gameValue = document.getElementById('gameValue');
    
    gameValue.textContent = selectedGameValue.toFixed(2).replace('.', ',');
    
    prizeContent.innerHTML = `
        <span class="prize-icon">${selectedPrize.icon}</span>
        <div class="prize-name">${selectedPrize.name}</div>
        <div class="prize-description">${selectedPrize.description}</div>
    `;
    
    console.log('🎁 Área do prêmio configurada');
}

/**
 * Revela o prêmio e mostra resultado
 */
function revealPrize() {
    console.log('🎊 Revelando prêmio:', selectedPrize.name);
    
    // Adicionar efeito visual de confete
    createConfettiEffect();
    
    // Remover canvas após delay
    setTimeout(() => {
        canvas.style.display = 'none';
        
        setTimeout(() => {
            hideGameArea();
            showResultScreen();
        }, 1000);
    }, 500);
}

/**
 * Cria efeito de confete
 */
function createConfettiEffect() {
    // Criar elementos de confete temporários
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = ['#ffd700', '#ff6b35', '#00ff88', '#ff3333', '#3333ff'][Math.floor(Math.random() * 5)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animar queda
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: 0 }
        ], {
            duration: 3000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => {
            confetti.remove();
        });
    }
}

/**
 * Mostra a tela de resultado
 */
function showResultScreen() {
    const resultScreen = document.getElementById('resultScreen');
    const resultPrize = document.getElementById('resultPrize');
    const resultMessage = document.getElementById('resultMessage');
    
    resultPrize.innerHTML = `
        <span class="prize-icon">${selectedPrize.icon}</span>
        <div class="prize-name">${selectedPrize.name}</div>
    `;
    
    resultMessage.textContent = selectedPrize.message;
    
    resultScreen.classList.remove('hidden');
    
    // Adicionar novo ganhador ao ticker (simulado)
    addNewWinnerToTicker();
    
    console.log('🏆 Tela de resultado exibida');
}

/**
 * Adiciona novo ganhador ao ticker (simulado)
 */
function addNewWinnerToTicker() {
    const ticker = document.getElementById('winnersTicker');
    const newWinner = `
        <div class="winner-item">
            <div class="winner-avatar">V</div>
            <div class="winner-info">
                <div class="winner-name">Você - Sua Cidade</div>
                <div class="winner-prize">Ganhou: ${selectedPrize.name} • Agora mesmo</div>
            </div>
        </div>
    `;
    
    ticker.innerHTML = newWinner + ticker.innerHTML;
}

/**
 * Reseta o jogo para nova partida
 */
function resetForNewGame() {
    // Reset variables
    scratchedPercentage = 0;
    selectedPrize = null;
    isDrawing = false;
    
    // Limpar timer se existir
    if (pixTimer) {
        clearInterval(pixTimer);
        pixTimer = null;
    }
    
    // Mostrar tela de pagamento novamente
    hideResultScreen();
    showPaymentScreen();
    
    console.log('🔄 Jogo resetado para nova partida');
}

/**
 * Compartilha o resultado (simulado)
 */
function shareResult() {
    const shareText = `🎉 Acabei de ganhar ${selectedPrize.name} na RaspeBet! 🎰\n\nTente a sua sorte também: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'RaspeBet - Ganhei um prêmio!',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copiar para área de transferência
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Link copiado para área de transferência!');
        });
    }
    
    console.log('📤 Resultado compartilhado');
}

/**
 * Funções de controle de telas
 */
function showPaymentScreen() {
    document.getElementById('paymentScreen').classList.remove('hidden');
}

function hidePaymentScreen() {
    document.getElementById('paymentScreen').classList.add('hidden');
}

function showGameArea() {
    document.getElementById('gameArea').classList.remove('hidden');
}

function hideGameArea() {
    document.getElementById('gameArea').classList.add('hidden');
}

function hideResultScreen() {
    document.getElementById('resultScreen').classList.add('hidden');
}

function showPaymentExpired() {
    alert('⏰ Tempo para pagamento expirado! Gere um novo código PIX.');
    resetForNewGame();
}

/**
 * Disponibilizar funções globalmente
 */
window.copyPixCode = copyPixCode;
window.simulatePayment = simulatePayment;
window.resetForNewGame = resetForNewGame;
window.shareResult = shareResult;

// Estatísticas em tempo real (simuladas)
function updateLiveStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    // Simular atualizações das estatísticas
    setInterval(() => {
        // Valor pago hoje (incrementar aleatoriamente)
        const currentValue = parseFloat(stats[0].textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
        const newValue = currentValue + Math.random() * 1000;
        stats[0].textContent = 'R$ ' + newValue.toLocaleString('pt-BR');
        
        // Ganhadores hoje
        const currentWinners = parseInt(stats[1].textContent.replace('.', ''));
        stats[1].textContent = (currentWinners + Math.floor(Math.random() * 3)).toLocaleString('pt-BR');
        
        // Jogadores online (flutuar)
        const baseOnline = 12000;
        const variation = Math.floor(Math.random() * 2000);
        stats[2].textContent = (baseOnline + variation).toLocaleString('pt-BR');
    }, 30000); // Atualizar a cada 30 segundos
}

// Inicializar atualizações das estatísticas
document.addEventListener('DOMContentLoaded', updateLiveStats);

console.log('🎯 Sistema RaspeBet carregado com sucesso!');
console.log('💡 Dica: Use o botão "Simular Pagamento" para testar o jogo');
