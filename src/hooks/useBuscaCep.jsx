import { useEffect } from "react"

/**
 * 
 * Essa função serve para buscar as informações de um
 * endereço através de um CEP.
 * 
 * @param {string} cep 
 * @returns 
 */
async function useBuscaCep(cep, numero) {
  /**
   * PARAMETROS
   * - CEP
   * 
   * # LOGICA
   * - criar a função
   */
  let data = {}
  let error = null

  if(!!cep){
    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(res => data = res)
    .catch(error => error = error.message)
  }

  return {data, error}
}

export default useBuscaCep