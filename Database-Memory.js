import { randomUUID } from "node:crypto"
export class DatabaseMemory {
  #suplementos = new Map()
  getById(id) {
    return this.#suplementos.get(id)
  }
  //listando suplemento
  list(search) {
        return Array.from(this.#suplementos.entries()).map((suplementoArray) => {
      // primeira posiçao
      const id = suplementoArray[0]
      // sugunda posiçao
      const data = suplementoArray[1]

    return {
        id,
        ...data,
      }
    })
      // Retornando pesquisa
      .filter(suplemento => {
        if (search) {
          return suplemento.titulo.includes(search)
        }
        return true
      })
  }
  //criando suplemento
  create(suplemento) {
    //Gerando código aleatório de ID
    const suplementoID = randomUUID()
    this.#suplementos.set(suplementoID, suplemento)
  }
  //atualizar o suplemento
  update(id, suplemento) {
    this.#suplementos.set(id, suplemento)
  }
  //apaga o suplemento
  delete(id) {
    this.#suplementos.delete(id)
  }
}