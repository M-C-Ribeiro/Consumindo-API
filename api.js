// A ideia do site, foi inspirada no jogo "Termo", no qual o usuário tenta adivinhar uma palavra
// O funcionamento do site é baseado na atividade, feita em sala, "Descubra o número"

const inEnviar = document.getElementById("inEnviar"); // referência ao input Enviar
const inSortear = document.getElementById("inSortear"); // referência ao input Sortear 
const respErros = document.getElementById("outErros"); // referência ao texto de erros
const respChances = document.getElementById("outChances"); // referência ao texto de chances
const respDicas = document.getElementById("outDica"); // referência ao texto de dicas
const erros = []; // vetor para salvar os erros
const chances = 5; // contador de chances
let flag = false; // gambiarra
let sorteado; // gambiarra


async function pesquisarPersonagem(){
    const id = Math.floor(Math.random() * 20); // cada página possui 20 personagens, por isso gera-se um número aleatório para sortear o personagem
    const url = `https://rickandmortyapi.com/api/character/${id}`; // define a url com o número sorteado
    
    const dados = await fetch(url); // busca os dados na url
    const personagem = await dados.json(); // salva os dados em formato json
    
    console.log(personagem.name)
    return personagem; // retorna o valor sorteado
}


inEnviar.addEventListener("click", async (e) => {
    const chute = document.getElementById("inTexto").value; // recebe o personagem digitado pelo usuário
    if (flag == false) { // toda vez que fosse clicado no mouse, seria gerado outro personagem
        sorteado = await pesquisarPersonagem(); // recebe o personagem sorteado
        flag = true;
    } else {
        if (chute === sorteado.name) {
            respDicas.innerText = `Parabéns!! Você acertou que o personagem sorteado foi o ${sorteado.name}`; // informa ao usuário que ele acertou
            inEnviar.disabled = true; // desabilita o botão
        } else {
            
            if (erros.includes(chute)) { // verifica se o que foi digitado, já foi digitado
                alert("Esse personagem já foi tentado, tente outro");
            } else {
                erros.push(chute); // adiciona a tentativa ao vetor de erros
                const numChances = chances - erros.length; // salva a quantidade de tentativas restantes em uma variável
    
                respErros.innerText = `${erros.length} (${erros.join(", ")})`;  // plota na tela a quantidade de erros e os nomes digitados
                respChances.innerText = `${numChances}`; // plota a quantidade de tentativas restantes
    
                if (numChances === 0) { // caso não tenha mais chances, desabilita o botão e informa o personagem
                    alert("Suas chances acabaram");             
                    inEnviar.disabled = true;
                    respDicas.innerText = `Gamer Over. O personagem sorteado era: ${sorteado.name}`
                } else { // caso ainda restem chances, dá dicas sobre o personagem
                    if (numChances == 4) { 
                        respDicas.innerText = `O personagem é da raça: ${sorteado.species}\n`;
                    } else if (numChances == 3) {
                        respDicas.innerText += `O persongagem é do sexo: ${sorteado.gender}\n`
                    } else if (numChances == 2) {
                        respDicas.innerText += `O personagem está: ${sorteado.status}\n`;
                    } else if (numChances == 1) {
                        respDicas.innerText += `O personagem mora em: ${sorteado.location.name}`;
                    }
                }
            }
        }
    }    
})