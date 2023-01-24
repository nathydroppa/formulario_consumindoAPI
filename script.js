async function buscaEndereco(cep) { //async await reduz o uso de Then e torna o código menor //
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try{ //utilizando o try ao fazer a requisição pra API se houver algum erro, ele já captura e mostra na tela usando o catch
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`) //fetch fez a requisição da informação
        var consultaCEPConvertida = await consultaCEP.json(); // converte o resultado da requisição em json
        if(consultaCEPConvertida.erro) { //Se houver um erro de CEP inválido modificamos a mensagem exibida 
            throw Error('CEP inválido')
        }
        //Auto complete dos campos de endereço do formulário a partir do CEP informado//
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = consultaCEPConvertida.localidade; //usamos o nome que aparece no console log p/ cada tipo de retorno//
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;


        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch(erro) {
            mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>` //mensagem de erro no navegador//
            console.log(erro);
    }
}

var cep = document.getElementById('cep');
// procuramos o id do campo de CEP no html
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
/*colocamos nesse elemento um eventlister p/ que quando o usuário clicar fora do campo do CEP irá chamar
a função buscaEndereço e passar o CEP digitado para ela criar a requisição*/

// Só usamos a palavra await antes do fetch quando utilizamos o async



/*
let ceps = ['01001000','01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
Promise.all nos ajuda a fazer várias requisições ao mesmo tempo. Digitamos dois CEP's na let CEPs e a 
let conjuntoCeps pegou esses valores passou pra dentro da função buscaEndereço fazer as requisições e o 
Promise.all pegou essas requisições e suas respostas foram transformadas em um array*/


/*Aprendendo o uso de then, catch e finally (código assincrono)

.then(resposta => resposta.json()) // o then pegou a resposta dessa requisição e converteu em json
.then(r => {
    if(r.erro) { //caso a resposta da requisição apresente erro, irá imprimir na tela a mensagem de erro
        throw Error('Esse CEP não existe')
    }else
    console.log(r)})  //o then pegou a conversão feita anteriormente e imprimiu no console caso o CEP digitado esteja certo
.catch(erro => console.log(erro)) //usamos o catch para pegar erro quando essa requisição for rejeitada e imprime na tela
.finally(mensagem => console.log('Processamento concluído')); */

/*O async/await apesar de ser uma opção mais "legível" ao .then() é importante frisar que não são 
logicamente equivalentes: o async/await faz o processamento de forma sequencial, Promises com .then() 
são processadas em paralelo, o que faz com que este método seja mais rápido. O async/await simplifica a 
escrita e a interpretação do código, mas não é tão flexível e só funciona com uma Promise por vez.*/