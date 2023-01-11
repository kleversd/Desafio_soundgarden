const BASE_URL = 'https://soundgarden-api.deta.dev/events';
const optionsEvents = {
    method: "GET",
}

const myModal = document.querySelector("#myModal");
const modalContent = document.querySelector("#modalContent");
const closeBtn = document.querySelector("#closeBtn");
const btnReserva = document.querySelector("#btnReserva");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const qtdIngressos = document.querySelector("#qtd");
let idEvento = ""

const eventoAbrirModal = (id) => {
    const botao = document.querySelector(`#btn${id}`);
    console.log(botao)
    botao.addEventListener("click", (evento)=>{
        myModal.style.display = "block";
        console.log(botao.id.slice(3));
        idEvento = botao.id.slice(3);
    });
    
}

const ListarEventos = async (limit) => {
    const resposta = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/events`, optionsEvents);
    const eventos = await resposta.json();
    return eventos.slice(0, limit);
}

ListarEventos(3).then(resp => {
    const elementoContainer = document.querySelector('.container.d-flex.justify-content-center.align-items-center');

    console.log(resp);

    elementoContainer.innerHTML = '';
    resp.forEach(conteudo => {
        elementoContainer.innerHTML += ` <article class="evento card p-5 m-3">
        <h2>${conteudo.name} - ${conteudo.scheduled}</h2>
        <h4>${conteudo.attractions}</h4>
        <p>${conteudo.description}</p>
        <a id="btn${conteudo._id}" class="btn btn-primary">reservar ingresso</a>
    </article>
        `
    
    });
    resp.forEach(conteudo =>{
        eventoAbrirModal(conteudo._id);
    });

});

closeBtn.addEventListener("click", (evento)=>{
    evento.preventDefault();
    myModal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target == myModal) {
      myModal.style.display = "none";
    }
  }
  

btnReserva.addEventListener("click", async (evento)=>{
    evento.preventDefault();
    try{
        reserva = {
            owner_name: nome.value,
            owner_email: email.value,
            number_tickets: qtdIngressos.value,
            event_id: idEvento
        };
        console.log(reserva);
        const reqOptions = {
            method: 'POST',
            body: JSON.stringify(reserva),
            headers: {
                "Content-Type": "application/json",
            }
        };

        const resposta = await fetch(`${BASE_URL}https://soundgarden-api.deta.dev/bookings`,reqOptions);
        console.log(resposta);

        alert('Ok,Reservada realizada.')
        window.location.href = "index.html"
    }catch {
        alert('Mensagem de erro: Reveja os campos e tente novamente')
    }
});