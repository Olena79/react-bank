class Notification {

    static #list = []

    static #count = 1

    constructor({ type, name }) {
        this.id = Notification.#count++
        this.name = name
        this.type = type
        this.time = new Date()
    }

    static create (data) {
        const notification = new Notification(data)

        this.#list.push(notification)
        return this.#list
    }

    static getById(id) {
        return (
          this.#list.find((notification) => notification.id === Number(id)) ||
          null
        )
    }

    static getByType(type) {
        return this.#list.filter((notification) => notification.type === type)
    }
    
    static getList = () => {
        return this.#list
    }
}

module.exports = {
    Notification,
  }