
class FinanceTracker {
    constructor() {
        this.currentUser = null;
        this.transactions = [];
        this.chart = null;
        this.initializeUserSystem();
        this.initializeEventListeners();
        this.checkStoredUser();
    }

    initializeUserSystem() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userNameInput = document.getElementById('userNameInput');

        loginBtn.addEventListener('click', () => {
            const userName = userNameInput.value.trim();
            if (userName) {
                this.loginUser(userName);
            } else {
                alert('Por favor, digite seu nome!');
            }
        });

        logoutBtn.addEventListener('click', () => {
            this.logoutUser();
        });

        userNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                loginBtn.click();
            }
        });
    }

    checkStoredUser() {
        const storedUser = localStorage.getItem('currentFinanceUser');
        if (storedUser) {
            this.loginUser(storedUser);
        }
    }

    loginUser(userName) {
        this.currentUser = userName;
        localStorage.setItem('currentFinanceUser', userName);
        
        // Carregar dados do usuário
        this.loadUserTransactions();
        
        // Atualizar interface
        document.getElementById('userNameInput').style.display = 'none';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        document.getElementById('currentUser').style.display = 'inline-block';
        document.getElementById('currentUser').textContent = `Olá, ${userName}!`;
        
        this.updateDisplay();
        this.createChart();
        this.setDefaultDate();
        
        this.showSuccessMessage(`Bem-vindo, ${userName}!`);
    }

    logoutUser() {
        if (confirm('Tem certeza que deseja sair? Seus dados ficarão salvos.')) {
            this.currentUser = null;
            this.transactions = [];
            localStorage.removeItem('currentFinanceUser');
            
            // Resetar interface
            document.getElementById('userNameInput').style.display = 'inline-block';
            document.getElementById('userNameInput').value = '';
            document.getElementById('loginBtn').style.display = 'inline-block';
            document.getElementById('logoutBtn').style.display = 'none';
            document.getElementById('currentUser').style.display = 'none';
            
            this.updateDisplay();
            this.updateChart();
            
            this.showSuccessMessage('Logout realizado com sucesso!');
        }
    }

    getUserStorageKey() {
        return `financeTransactions_${this.currentUser}`;
    }

    loadUserTransactions() {
        if (!this.currentUser) {
            this.transactions = [];
            return;
        }
        
        const stored = localStorage.getItem(this.getUserStorageKey());
        this.transactions = stored ? JSON.parse(stored) : [];
    }

    saveTransactions() {
        if (!this.currentUser) return;
        localStorage.setItem(this.getUserStorageKey(), JSON.stringify(this.transactions));
    }

    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
    }

    initializeEventListeners() {
        document.getElementById('transactionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });

        document.getElementById('filterBtn').addEventListener('click', () => {
            this.filterTransactions();
        });

        document.getElementById('clearFilterBtn').addEventListener('click', () => {
            this.clearFilter();
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportToCSV();
        });
    }

    addTransaction() {
        if (!this.currentUser) {
            alert('Faça login primeiro para adicionar lançamentos!');
            return;
        }

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;
        const date = document.getElementById('date').value;

        if (!description || !amount || !type || !date) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const transaction = {
            id: Date.now(),
            description,
            amount,
            type,
            date,
            timestamp: new Date().toISOString()
        };

        this.transactions.push(transaction);
        this.saveTransactions();
        this.updateDisplay();
        this.updateChart();
        
        // Reset form
        document.getElementById('transactionForm').reset();
        this.setDefaultDate();
        
        // Success feedback
        this.showSuccessMessage('Lançamento adicionado com sucesso!');
    }

    deleteTransaction(id) {
        if (!this.currentUser) return;
        
        if (confirm('Tem certeza que deseja excluir este lançamento?')) {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveTransactions();
            this.updateDisplay();
            this.updateChart();
            this.showSuccessMessage('Lançamento excluído com sucesso!');
        }
    }

    updateDisplay() {
        this.updateSummary();
        this.updateTransactionsTable();
    }

    updateSummary() {
        if (!this.currentUser) {
            document.getElementById('totalGains').textContent = 'R$ 0,00';
            document.getElementById('totalExpenses').textContent = 'R$ 0,00';
            document.getElementById('balance').textContent = 'R$ 0,00';
            document.getElementById('monthlyProjection').textContent = 'R$ 0,00';
            document.getElementById('realProfit').textContent = 'R$ 0,00';
            return;
        }

        const gains = this.transactions
            .filter(t => t.type === 'ganho')
            .reduce((sum, t) => sum + t.amount, 0);

        const profits = this.transactions
            .filter(t => t.type === 'lucro')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = this.transactions
            .filter(t => t.type !== 'ganho' && t.type !== 'lucro')
            .reduce((sum, t) => sum + t.amount, 0);

        // Lucro real é a soma de todos os lucros + ganhos menos as despesas
        const totalIncome = gains + profits;
        const balance = totalIncome - expenses;
        const realProfit = totalIncome - expenses;
        
        // Calcular projeção mensal baseada nos dados dos últimos 30 dias
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentTransactions = this.transactions.filter(t => 
            new Date(t.date) >= thirtyDaysAgo
        );
        
        const monthlyGains = recentTransactions
            .filter(t => t.type === 'ganho')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const monthlyProfits = recentTransactions
            .filter(t => t.type === 'lucro')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const monthlyExpenses = recentTransactions
            .filter(t => t.type !== 'ganho' && t.type !== 'lucro')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const monthlyProjection = (monthlyGains + monthlyProfits) - monthlyExpenses;

        document.getElementById('totalGains').textContent = this.formatCurrency(totalIncome);
        document.getElementById('totalExpenses').textContent = this.formatCurrency(expenses);
        document.getElementById('balance').textContent = this.formatCurrency(balance);
        document.getElementById('monthlyProjection').textContent = this.formatCurrency(monthlyProjection);
        document.getElementById('realProfit').textContent = this.formatCurrency(realProfit);
    }

    updateTransactionsTable(filteredTransactions = null) {
        const tbody = document.getElementById('transactionsBody');
        const transactions = filteredTransactions || this.transactions;
        
        tbody.innerHTML = '';

        if (!this.currentUser) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="5" style="text-align: center; opacity: 0.7;">
                    Faça login para ver seus lançamentos
                </td>
            `;
            tbody.appendChild(row);
            return;
        }

        // Ordenar por data (mais recente primeiro)
        const sortedTransactions = [...transactions].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        sortedTransactions.forEach(transaction => {
            const row = document.createElement('tr');
            const isPositive = transaction.type === 'ganho' || transaction.type === 'lucro';
            
            row.innerHTML = `
                <td>${this.formatDate(transaction.date)}</td>
                <td>${transaction.description}</td>
                <td>${this.getTypeIcon(transaction.type)} ${this.getTypeName(transaction.type)}</td>
                <td class="${isPositive ? 'transaction-gain' : 'transaction-expense'}">
                    ${isPositive ? '+' : '-'} ${this.formatCurrency(transaction.amount)}
                </td>
                <td>
                    <button class="btn-delete" onclick="financeTracker.deleteTransaction(${transaction.id})">
                        🗑️ Excluir
                    </button>
                </td>
            `;
            
            tbody.appendChild(row);
        });

        if (sortedTransactions.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="5" style="text-align: center; opacity: 0.7;">
                    Nenhum lançamento encontrado
                </td>
            `;
            tbody.appendChild(row);
        }
    }

    createChart() {
        const ctx = document.getElementById('expenseChart').getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#ff4757', // Combustível
                        '#ffa502', // Manutenção
                        '#2ed573', // Pedágio
                        '#5352ed', // Alimentação
                        '#70a1ff'  // Outros
                    ],
                    borderWidth: 2,
                    borderColor: '#1a1a1a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });

        this.updateChart();
    }

    updateChart() {
        if (!this.chart || !this.currentUser) return;

        const expenseCategories = {
            'combustivel': 0,
            'manutencao': 0,
            'pedagio': 0,
            'alimentacao': 0,
            'outros': 0
        };

        this.transactions
            .filter(t => t.type !== 'ganho' && t.type !== 'lucro')
            .forEach(t => {
                expenseCategories[t.type] += t.amount;
            });

        const labels = [];
        const data = [];
        
        Object.entries(expenseCategories).forEach(([type, amount]) => {
            if (amount > 0) {
                labels.push(this.getTypeName(type));
                data.push(amount);
            }
        });

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
    }

    filterTransactions() {
        if (!this.currentUser) {
            alert('Faça login primeiro!');
            return;
        }

        const startDate = document.getElementById('filterStartDate').value;
        const endDate = document.getElementById('filterEndDate').value;

        if (!startDate && !endDate) {
            alert('Por favor, selecione pelo menos uma data para filtrar.');
            return;
        }

        let filteredTransactions = this.transactions;

        if (startDate) {
            filteredTransactions = filteredTransactions.filter(t => t.date >= startDate);
        }

        if (endDate) {
            filteredTransactions = filteredTransactions.filter(t => t.date <= endDate);
        }

        this.updateTransactionsTable(filteredTransactions);
    }

    clearFilter() {
        document.getElementById('filterStartDate').value = '';
        document.getElementById('filterEndDate').value = '';
        this.updateTransactionsTable();
    }

    exportToCSV() {
        if (!this.currentUser) {
            alert('Faça login primeiro!');
            return;
        }

        if (this.transactions.length === 0) {
            alert('Não há dados para exportar!');
            return;
        }

        const headers = ['Data', 'Descrição', 'Tipo', 'Valor'];
        const csvContent = [
            headers.join(','),
            ...this.transactions.map(t => [
                t.date,
                `"${t.description}"`,
                this.getTypeName(t.type),
                t.amount.toFixed(2).replace('.', ',')
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `controle-financeiro-${this.currentUser}-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        this.showSuccessMessage('Dados exportados com sucesso!');
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');
    }

    getTypeIcon(type) {
        const icons = {
            'ganho': '💰',
            'lucro': '💎',
            'combustivel': '⛽',
            'manutencao': '🔧',
            'pedagio': '🛣️',
            'alimentacao': '🍕',
            'outros': '📋'
        };
        return icons[type] || '📋';
    }

    getTypeName(type) {
        const names = {
            'ganho': 'Ganho',
            'lucro': 'Lucro',
            'combustivel': 'Combustível',
            'manutencao': 'Manutenção',
            'pedagio': 'Pedágio',
            'alimentacao': 'Alimentação',
            'outros': 'Outros'
        };
        return names[type] || 'Outros';
    }

    showSuccessMessage(message) {
        // Criar notificação visual
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #00d084, #00b894);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 5px 15px rgba(0, 208, 132, 0.4);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Adicionar animação de slideOut
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Inicializar a aplicação
const financeTracker = new FinanceTracker();
