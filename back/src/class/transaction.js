class Transaction {

    static #list = []

    static #count = 1

    constructor({ sum, type, paymentSystem, transType  }) {
        this.id = Transaction.#count++
        this.sum = this.sum = Number(sum).toFixed(2);
        this.type = type
        this.paymentSystem = paymentSystem
        this.transType = transType
        this.time = this.getTime()
        this.date = this.getDate()
    }

    static create (data) {
        const transaction = new Transaction(data)

        this.#list.push(transaction)
        return this.#list
    }

    static getById(id) {
        return (
          this.#list.find((transaction) => transaction.id === Number(id)) ||
          null
        )
    }

    static getByType(type) {
        return this.#list.filter((transaction) => transaction.type === type);
    }

    static getByPaymentSystem(paymentSystem) {
        return this.#list.filter(
          (transaction) => transaction.paymentSystem === paymentSystem
        );
    }

    getTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    getDate() {
        const now = new Date();
        const day = now.getDate();
        const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(now);
        return `${day} ${month} `;
    }
    
    static getList = () => this.#list
}

module.exports = {
    Transaction,
  }