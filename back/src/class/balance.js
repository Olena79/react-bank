class Balance {
    constructor(transactions) {
        if (!Array.isArray(transactions)) {
            transactions = [transactions];
        }
        this.transactions = transactions;
        this.balance = this.calculateBalance().toFixed(2);
    }

    calculateBalance() {
        return this.transactions.reduce((acc, transaction) => {
            if (transaction.type === 'increment') {
                return acc + Number(transaction.sum);
            } else if (transaction.type === 'decrement') {
                return acc - Number(transaction.sum);
            }
            return acc;
        }, 0);
    }

    getBalance() {
        if(this.balance <= 0) {
            this.balance = 0;
        }
        return this.balance;
    }
}

module.exports = { Balance };
