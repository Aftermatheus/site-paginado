let selectedSinais = []; // Lista para armazenar os sinais clínicos selecionados
let isTyping = false; // Variável para controlar se o usuário está digitando
let selectedSinalClicked = false; // Variável para controlar se um sinal foi selecionado e a barra de pesquisa foi clicada

// Event listener para fechar a lista de resultados quando clicar fora dela
document.addEventListener('click', function(event) {
    const listaResultados = document.getElementById('lista-de-resultados');
    const searchBar = document.getElementById('searchbar');

    if (!listaResultados.contains(event.target) && event.target !== searchBar) {
        listaResultados.style.display = 'none';
    }
});

function search() {
    let input = removeAccents(document.getElementById('searchbar').value.toLowerCase());
    let x = document.getElementsByClassName('sinais');

    if (input === '' && !isTyping && !selectedSinalClicked) {
        document.getElementById('lista-de-resultados').style.display = 'none';
        for (let i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
    } else {
        document.getElementById('lista-de-resultados').style.display = 'block';
        for (let i = 0; i < x.length; i++) {
            let textWithoutAccents = removeAccents(x[i].innerHTML.toLowerCase());
            if (!textWithoutAccents.includes(input)) {
                x[i].style.display = "none";
            } else {
                x[i].style.display = "list-item";
            }
        }
    }

    selectedSinalClicked = false;
}

function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}   

// Função para lidar com a seleção de sinais clínicos
function selectSinal(sinal) {
    let index = selectedSinais.indexOf(sinal);
    if (index === -1) {
        selectedSinais.push(sinal); // Adiciona se não estiver presente
    } else {
        selectedSinais.splice(index, 1); // Remove se estiver presente
    }

    document.getElementById('searchbar').value = '';
    
    document.getElementById('lista-de-resultados').style.display = 'none';
    
    let x = document.getElementsByClassName('sinais');
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "list-item";
    }
    
    displaySelectedSinais();

    selectedSinalClicked = true;
}

// Função para exibir os sinais clínicos selecionados em caixas com botão de exclusão
function displaySelectedSinais() {
    let selectedSinaisContainer = document.getElementById('selected-sinais');
    selectedSinaisContainer.innerHTML = ''; 

    selectedSinais.forEach(function(sinal) {
        let sinalBox = document.createElement('div');
        sinalBox.classList.add('selected-sinal-box');

        let sinalText = document.createElement('span');
        sinalText.textContent = sinal;
        sinalBox.appendChild(sinalText);

        let closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', function() {
            removeSelectedSinal(sinal);
        });
        sinalBox.appendChild(closeButton);

        selectedSinaisContainer.appendChild(sinalBox);
    });
}

// Função para remover um sinal clínico selecionado
function removeSelectedSinal(sinal) {
    let index = selectedSinais.indexOf(sinal);
    if (index !== -1) {
        selectedSinais.splice(index, 1);
        displaySelectedSinais(); 
    }
}

// Event listener para controlar se o usuário está digitando
document.getElementById('searchbar').addEventListener('input', function() {
    isTyping = true;
    if (document.getElementById('searchbar').value === '') {
        document.getElementById('lista-de-resultados').style.display = 'none';
    }
});

// Event listener para controlar quando o usuário parou de digitar
document.getElementById('searchbar').addEventListener('blur', function() {
    isTyping = false;
});
