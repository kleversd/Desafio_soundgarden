const inputNome = document.querySelector('#nome')
const inputBanner = document.querySelector('#banner')
const inputAtracoes = document.querySelector('#atracoes')
const inputDescricao = document.querySelector('#descricao')
const inputData = document.querySelector('#data')
const inputLotacao = document.querySelector('#lotacao')
const btnEnviar = document.querySelector('#enviar')

const BASE_URL = 'https://soundgarden-api.deta.dev/events'

//Botão da página de Gerenciamento
const btnExcluir = document.querySelector('#btn-excluir')

//Pegando o ID pela URL
const urlParams = new URLSearchParams(window.location.search)
const paramID = urlParams.get('id')
//console.log(paramID)

const mostrarEvento = async (evento) =>{
    const respostaEvento = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/events${paramID}`,{
    method: "GET"
    })

    const conteudoAPI = await respostaEvento.json()
    // console.log(conteudoAPI)

    inputNome.value = conteudoAPI.name
    inputBanner.value = conteudoAPI.poster
    inputAtracoes.value = conteudoAPI.attractions
    inputDescricao.value = conteudoAPI.description
    inputData.value = conteudoAPI.scheduled
    inputLotacao.value = conteudoAPI.number_tickets
    
}

mostrarEvento()

btnExcluir.onclick = async (evento) => {
    evento.preventDefault()
    try {

        const options = {
            method: "DELETE"
        };

        const resposta = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/events${paramID}`, options)
        console.log(resposta)

        alert("Evento deletado com sucesso..")
    } catch {
        alert("Mensagem de erro. Verifique os campos e tente novamente")
    }

    window.location.href = "admin.html"
}