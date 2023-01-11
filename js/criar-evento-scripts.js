const inputNome = document.querySelector('#nome');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const btnEnviar = document.querySelector('#enviar');
const BASE_URL = 'https://soundgarden-api.deta.dev/events';

btnEnviar.onclick = async (evento) => {
    evento.preventDefault();
    try {

        const novoEvento = {
            name: inputNome.value,
            poster: 'link da imagem',
            attractions: inputAtracoes.value.split(','),
            description: inputDescricao.value,
            scheduled: new Date(inputData.value).toISOString(),
            number_tickets: parseInt(inputLotacao.value)
        };

        const options = {
            method: "POST",
            body: JSON.stringify(novoEvento),
            headers: {
                "Content-Type": "application/json",
            },
        };



        const resposta = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/events`, options);
        const conteudoResposta = await resposta.json();
        console.log(conteudoResposta);

        alert("Evento cadastrado com sucesso");
        document.location.reload();
    } catch {
        alert("Erro. Verifique os campos e tente novamente");
    }
};  
