function abrir() {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById('tela-cadastro').style.display = 'none';
    document.getElementById('tela-login').style.display = 'block';
}

function fechar() {
    document.getElementById('myModal').style.display = 'none';
}

function entrar() {
    let usuario = document.getElementById('user').value;
    let senha = document.getElementById('key').value;
    if (usuario.length < 3) {
        document.getElementById('painel-erro-login').innerHTML = 'E-mail é obrigatório e deve ter mais que três caracteres!'
    } else if (senha.length < 3) {
        document.getElementById('painel-erro-login').innerHTML = 'Senha é obrigatória e deve ter mais que três caracteres!'
    } else {
        axios.post('https://reqres.in/api/login', {
            email: usuario,
            password: senha,
        }).then((resposta) => {
            let token = (resposta.data.token);
            localStorage.setItem('token', token);
            fechar();
        }).catch((erro) => {
            alert("Usuário não cadastrado!")
        })
    }

}

function abrirCadastro() {
    document.getElementById('tela-login').style.display = 'none';
    document.getElementById('tela-cadastro').style.display = 'block';
}

function cadastrar() {
    let usuario = document.getElementById('cadastro-user').value;
    let senha = document.getElementById('cadastro-senha').value;
    let confSenha = document.getElementById('cadastro-confirma-senha').value;

    if (senha !== confSenha) {
        document.getElementById('painel-erro-cadastro').innerHTML = 'Senha não confere!'
    } else if (usuario.length < 3) {
        document.getElementById('painel-erro-cadastro').innerHTML = 'E-mail é obrigatório e deve ter mais que três caracteres!'
    } else if (senha.length < 3) {
        document.getElementById('painel-erro-cadastro').innerHTML = 'Senha é obrigatória e deve ter mais que três caracteres!'
    } else {
        axios.post('https://reqres.in/api/register', {
            email: usuario,
            password: senha,
        }).then((resposta) => {
            fechar();
        }).catch((erro) => {
            alert("Tente Novamente!")
        })
    }
}

function buscar() {
    let campoBusca = document.getElementById('campo-buscar').value;
    document.getElementById('lista-resultados').innerHTML = '';
    axios.get(`https://api.tvmaze.com/search/shows?q=${campoBusca}`)
        .then((resposta) => {
            let lista = resposta.data;
            console.log(lista)
            let containerLista = document.getElementById('lista-resultados');

            for (let i = 0; i < lista.length; i++) {
                let li = document.createElement('li');
                let texto = lista[i].show.name;
                li.className = 'display-col my-flex my-justify-content-between';
                containerLista.appendChild(li);
                let link = document.createElement('a');
                link.setAttribute('href', lista[i].show.officialSite);
                link.innerHTML = texto;
                link.className = 'my-link'
                li.appendChild(link);
            }
        })
}

