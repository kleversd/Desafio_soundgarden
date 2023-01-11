const BASE_URL ='https://soundgarden-api.deta.dev/events'
const optionsEvents = {
    method: "GET",
}

const table = document.querySelector(".table");

const ListarEventos = async () => {

    const resposta = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/events`, optionsEvents);
    

    const eventos = await resposta.json();
    
    
    const htmlEventos = eventos.map((evento, index)=> {
        const dataEvento = new Date(evento.scheduled);
        const linhaHTML = `<tr class="linha-evento">
        <th scope="row">${index+1}</th>
        <td>${dataEvento.toLocaleDateString('en-GB')} <br> ${dataEvento.toLocaleTimeString('en-GB').slice(0,-3)}</td>
        <td>${evento.name}</td>
        <td>${evento.description}</td>
        <td>
            <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
            <a id="editar" href="editar-evento.html?id=${evento._id}" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html?id=${evento._id}" class="btn btn-danger">excluir</a>
        </td>
        </tr>`;
        return linhaHTML
    });
    
    return htmlEventos;
}

const eventos = ListarEventos()
    .then((resp)=>{
        console.log(resp);
        table.innerHTML += resp.slice(0,10);
    })
