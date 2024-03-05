class Confirm {
  static #list = []

  constructor(code, data) {
    this.code = code
    this.data = data
  }

  static generateCode = () => Math.floor(Math.random() * 900000) + 100000

  static create = (data) => {
    const confirmationCode = this.generateCode();
    this.#list.push(new Confirm(confirmationCode, data))

    setTimeout(() => {
      this.delete(confirmationCode)
    }, 24 * 60 * 60 * 1000) // 24 години у мілісекундах

    return confirmationCode;
  }

  static delete = (code) => {
    const length = this.#list

    this.#list = this.#list.filter(
      (item) => item.code !== code,
    )

    return length > this.#list.length
  }

  static getData = (confirmationCode) => {
    const obj = this.#list.find(
      (item) => item.code === confirmationCode,
    )

    return obj ? obj.data : null
  }

  static getCodeByData = (data) => {
    const confirmObject = this.#list.find((item) => JSON.stringify(item.data) === JSON.stringify(data));
    return confirmObject ? confirmObject.code : null;
  }
}

module.exports = {
  Confirm,
}
