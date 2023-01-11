const inputNome = document.querySelector('#nome')
const inputBanner = document.querySelector('#banner')
const inputAtracoes = document.querySelector('#atracoes')
const inputDescricao = document.querySelector('#descricao')
const inputData = document.querySelector('#data')
const inputLotacao = document.querySelector('#lotacao')
const btnEnviar = document.querySelector('#enviar')

const BASE_URL = 'https://soundgarden-api.deta.dev/events'

//Botão da página de Gerenciamento
const btnEditar = document.querySelector('#editar')

//Pegando o ID pela URL
const urlParams = new URLSearchParams(window.location.search)
const paramID = urlParams.get('id')
//console.log(paramID)

const mostrarEvento = async (evento) =>{
    const respostaEvento = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/events${paramID}`,{
    method: "GET"
    })

    const conteudoAPI = await respostaEvento.json()
    console.log(conteudoAPI)

    inputNome.value = conteudoAPI.name
    inputBanner.value = conteudoAPI.poster
    inputAtracoes.value = conteudoAPI.attractions
    inputDescricao.value = conteudoAPI.description
    inputData.value = conteudoAPI.scheduled
    inputLotacao.value = conteudoAPI.number_tickets
    
}

mostrarEvento()

btnEnviar.onclick = async (evento) => {
    evento.preventDefault()
    try {

        const modEvento = {
            name: inputNome.value,
            poster: 'link da imagem',
            attractions: inputAtracoes.value.split(','),
            description: inputDescricao.value,
            scheduled: new Date(inputData.value).toISOString(),
            number_tickets: parseInt(inputLotacao.value)
        };

        const options = {
            method: "PUT",
            body: JSON.stringify(modEvento),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const resposta = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/events${paramID}`, options)
        console.log(resposta)
        const conteudoResposta = await resposta.json()
        //console.log(conteudoResposta);

        alert("Evento modificado com sucesso")
        window.location.href = "admin.html"
        
    } catch {
        alert("Erro. Verifique os campos e tente novamente")
    }
    
}