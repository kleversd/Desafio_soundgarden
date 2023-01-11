const BASE_URL = 'https://soundgarden-api.deta.dev/events'
const optionsEvents = {
    method: "GET",
}

const table = document.querySelector(".tbody");
const titulo = document.querySelector("#tituloEvento")

//Pegando o ID pela URL
const urlParams = new URLSearchParams(window.location.search)
const paramID = urlParams.get('id')


const mostrarEvento = async (evento) => {
    const respostaEvento = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/events${paramID}`, {
        method: "GET"
    })

    const conteudoAPI = await respostaEvento.json()

    const htmlTitulo = conteudoAPI.name
    console.log(htmlTitulo)

    titulo.innerHTML = `<h1>Reservas de ${htmlTitulo}</h1>`
}

mostrarEvento()

const listarReservas = async () => {
    const resposta = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/bookings'${paramID}`, optionsEvents);
    
    const reservas = await resposta.json();
    
    const htmlEventos = reservas.map((evento, index) => {
        const linhaHTML = `<tr>
        <th scope="row">${index + 1}</th>
        <td>${evento.owner_name}</td>
        <td>${evento.owner_email}</td>
        <td>${evento.number_tickets}</td>
        </tr>`
        return linhaHTML
    }).join('');
    
    table.innerHTML = htmlEventos
}
listarReservas()