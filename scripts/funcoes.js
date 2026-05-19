//Dados
var usuarios
function carregar_array_usuarios(){
    console.log("entrei no carregar array usuarios");
   usuarios = JSON.parse(localStorage.getItem("usuarios"));
   if (!usuarios)
    usuarios = [];
}
//declaracao das funcoes para poder utilizar o javascript como modulo
window.enviarComEmailJS = enviarComEmailJS;
window.realizar_login = realizar_login;
window.verificar_login_usuario = verificar_login_usuario;
window.redirecionar = redirecionar;
window.selecionar_tipo_cadastro = selecionar_tipo_cadastro;
window.selecionar_op = selecionar_op;
window.carregar_usuario_logado = carregar_usuario_logado;
window.deslogar = deslogar;
window.alternarsenha = alternarsenha;
window.salvar_usuario = salvar_usuario;
window.editar_usuario = editar_usuario;
window.carregar_nome_usuario = carregar_nome_usuario;
window.verificar_senha = verificar_senha;
window.formatar_telefone = formatar_telefone;
window.formatar_cnpj = formatar_cnpj;
window.formatar_cpf = formatar_cpf;
window.carregar_array_usuarios = carregar_array_usuarios;
window.validar_cpf = validar_cpf;
window.mascara = mascara;
window.validar_nome = validar_nome;
window.validar_email = validar_email;
window.preencherCEPAPI = preencherCEPAPI;

//elementos em tela
const dashboard_option = document.getElementById('dashboard_option_nav');
const cadpessoa = document.getElementById('pessoa');
const cadempresa = document.getElementById('empresa');
const selectpessoa = document.getElementById('selectPessoa');
const selectempresa = document.getElementById('selectEmpresa');
const triggerpessoa = selectpessoa.querySelector('.select-trigger');
const triggerempresa = selectempresa.querySelector('.select-trigger');

//variavies globais
var tipo_pessoa_cadastro = 1;
var usuario_logado = null;



//eventlisteners
window.addEventListener('click', (e) => {
    if (!selectpessoa.contains(e.target)) selectpessoa.classList.remove('open');
    if (!selectempresa.contains(e.target)) selectempresa.classList.remove('open');
});

triggerpessoa.addEventListener('click', () => {
    selectpessoa.classList.toggle('open');
});

triggerempresa.addEventListener('click', () => {
    selectempresa.classList.toggle('open');
});

//funcoes separadas
function carregar_usuario_logado()
{
    const email = localStorage.getItem("usuario_logado");
    const senha = localStorage.getItem("senha_logado");
    if (email && senha){ //clicado em lembrar de mim e logado no ssitema
        document.getElementById("email_login").value = email;
        document.getElementById("senha_login").value = descriptografar(senha, 5);
        document.getElementById("lembra_de_mim").checked = true;
    }
}

function deslogar()
{
    localStorage.removeItem("usu_logado");
    dashboard_option.style.display = "none";
    redirecionar("index.html");
}

function realizar_login(event){
    event.preventDefault()
    const dados = new FormData(event.target);
    const email = dados.get("email_login");
    const senha = dados.get("senha_login");
    const lembra_de_mim = dados.get("lembra_de_mim");
    carregar_array_usuarios();

    let usuario = BuscaUsuarioEmail(email);
    if (!usuario)
    {
        alert("Usuario nao encontrado!");
        return;
    }
    if (descriptografar(usuario.senha, 5) != senha)
    {
        alert("Senha incorreta!");
        return;
    }

    if (lembra_de_mim)
    {
        localStorage.setItem("usuario_logado", usuario.email);
        localStorage.setItem("senha_logado", criptografar(senha, 5));
    }
    else
    {
        localStorage.removeItem("usuario_logado");
        localStorage.removeItem("senha_logado");
    }
    
    usuario_logado = usuario;
    localStorage.setItem("usu_logado", JSON.stringify(usuario_logado));
    redirecionar("index.html");
}

function verificar_login_usuario(){
    let usu_logado = JSON.parse(localStorage.getItem("usu_logado"));
    if (usu_logado){
        let dashboard_link = dashboard_option.querySelector('a');
        switch(usu_logado.tipo)
        {
            case 1:
                dashboard_option.style.display = "block";
                dashboard_link.href = "dashboard_usuario.html";
                break;
            case 2:
                dashboard_option.style.display = "block";
                dashboard_link.href = "vagas-empresa.html";
                break;
        }
    }
    else
        dashboard_option.style.display = 'none';

    let btn_criar_conta = document.getElementById("btn_criar-conta");
    if (usu_logado)
        btn_criar_conta.style.display = 'none';
}

function verificar_senha(){
    let senha = document.getElementById("senha");
    let hint_senha = document.getElementById("hint_senha");
    if (senha.value.length < 8)
    {
        hint_senha.innerText = "Senha deve ter pelo menos 8 caracteres!";
        hint_senha.style.color = "red";
    }  
    else if (!senha.value.match(/[0-9]/))
    {
        hint_senha.innerText = "Senha deve ter pelo menos um numero!";
        hint_senha.style.color = "red";
        senha.value = "";
    } 
    else if (!senha.value.match(/[a-zA-Z]/))
    {
        hint_senha.innerText = "Senha deve ter pelo menos uma letra!";
        hint_senha.style.color = "red";
        senha.value = "";
    } 
    else
    {
        hint_senha.innerText = "Mínimo de 8 caracteres com letras e números";
        hint_senha.style.color = "green";
    }
}

function formatar_telefone(elemento){
    if (elemento) {
    elemento.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 6) {
        v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
        } else if (v.length > 2) {
        v = `(${v.slice(0,2)}) ${v.slice(2)}`;
        } else if (v.length > 0) {
        v = `(${v}`;
        }
        e.target.value = v;
    });
    }
} 

function formatar_cpf(elemento) {
    if (elemento) {
            var cpf = elemento.value;
            cpf = cpf.replace(/\D/g, "");
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");    
            elemento.value = cpf;
    }
}

function validar_cpf(elemento)
{
    var cpf = elemento.value;
    var ok = 1;
    var add;
    if (cpf != "") {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length != 11 ||
                cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999")
                    ok = 0;
            if (ok == 1) {
                add = 0;
                for (i = 0; i < 9; i++)
                    add += parseInt(cpf.charAt(i)) * (10 - i);
                    rev = 11 - (add % 11);
                    if (rev == 10 || rev == 11)
                    rev = 0;
                    if (rev != parseInt(cpf.charAt(9)))
                    ok = 0;
                    if (ok == 1) {
                    add = 0;
                    for (i = 0; i < 10; i++)
                        add += parseInt(cpf.charAt(i)) * (11 - i);
                    rev = 11 - (add % 11);
                    if (rev == 10 || rev == 11)
                        rev = 0;
                    if (rev != parseInt(cpf.charAt(10)))
                        ok = 0;
                    }
                }
                if (ok == 0) {
                    alert("Ops... Ocorreu um problema... CPF inválido!");
                    elemento.focus();
                    elemento.innerText = "";
                }
            }
}   

function validar_nome(elemento){
    if (elemento){
        var nomes  = elemento.value.split(" ");
        if (nomes.length < 2)
        {
            alert("Nome deve ter pelo menos 2 nomes!");
            elemento.focus();
        }
    }
}  

function validar_email(elemento){
    if (elemento){
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!regex.test(elemento.value)){
            alert("E-mail inválido!");
            elemento.focus();
            elemento.value = "";
        }
    }
}

function validar_cep(elemento){
    if (elemento){
       const regexCEP = /^[0-9]{5}-?[0-9]{3}$/;
       return regexCEP.test(elemento.value);
    }
}

function formatar_RG(elemento){
    if (elemento){
        const valor = elemento.value.replace(/\D/g, '').slice(0,9);
        if (valor.length > 12){
            v = `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5, 8)}/${v.slice(8)}`;   
        }
    }
}

function formatar_cnpj(elemento) {
    if (elemento) {
        elemento.addEventListener('input', e => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 14);
            
            if (v.length > 12) {
                v = `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5, 8)}/${v.slice(8, 12)}-${v.slice(12)}`;
            } else if (v.length > 8) {
                v = `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5, 8)}/${v.slice(8)}`;
            } else if (v.length > 5) {
                v = `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5)}`;
            } else if (v.length > 2) {
                v = `${v.slice(0, 2)}.${v.slice(2)}`;
            }
            
            e.target.value = v;
        });
    }
}

function mascara(m,t,e){
    var cursor = t.selectionStart;
    var texto = t.value;
    texto = texto.replace(/\D/g,'');
    var l = texto.length;
    var lm = m.length;
    var id;
    if(window.Event) {                  
        id = e.keyCode;
    } else if(e.which){                 
        id = e.which;
    }
    var cursorfixo=false;
    if(cursor < l)cursorfixo=true;
    var livre = false;
    if(id == 16 || id == 19 || (id >= 33 && id <= 40))livre = true;
    var ii=0;
    var mm=0;
    if(!livre){
        if(id!=8){
            t.value="";
            var j=0;
            for(var i=0;i<lm;i++){
            if(m.substr(i,1)=="#"){
                t.value+=texto.substr(j,1);
                j++;
            }else if(m.substr(i,1)!="#"){
                        t.value+=m.substr(i,1);
                    }
                    if(id!=8 && !cursorfixo)cursor++;
                    if((j)==l+1)break;
                        
            } 	
        }
    }
    if(cursorfixo && !livre)cursor--;
        t.setSelectionRange(cursor, cursor);
}

function maxId()
{
    if (usuarios)
    {
        let max = 0;
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].usu_id > max)
                max = usuarios[i].usu_id;
        }
        return max;
    }
    return 0;
    
}
function salvar_usuario(event){
    event.preventDefault()
    const dados = new FormData(event.target);
    console.log("entrei");
    carregar_array_usuarios();
    const usu_logado = JSON.parse(localStorage.getItem("usu_logado"));
    let email = dados.get("email");
    if (!email)
           email = dados.get("email_corporativo");
    let usu = BuscaUsuarioEmail(email);
    if (usu && !usu_logado)
    {   
        alert("Usuario ja cadastrado!");
    }
    else{
        if (!usu)
            usu = {};
        usu.senha = criptografar(dados.get("senha"), 5);
        usu.tipo = tipo_pessoa_cadastro;
        usu.email = email;
        if (tipo_pessoa_cadastro == 1){
            usu.nome = dados.get("nome");
            usu.cpf_cnpj = dados.get("cpf");
            usu.telefone = dados.get("telefone_pessoa");
            usu.deficiencia = dados.get("deficiencia");
            usu.dt_nascimento = dados.get("dt_nascimento");
            usu.rg = dados.get("rg");
            usu.sexo = dados.get("sexo");
            usu.estado_civil = dados.get("estado_civil");
            usu.raca = dados.get("raca");
            usu.escolaridade = dados.get("escolaridade");
        }
        else
        {
            usu.nome = dados.get("razao_social");
            usu.cpf_cnpj = dados.get("cnpj");
            usu.telefone = dados.get("telefone_empresa");
            usu.nome_responsavel = dados.get("nome_responsavel");
            usu.setor = dados.get("setor");
            usu.ie = dados.get("ie_empresa");
            usu.qtd_funcionarios = dados.get("qtd_funcionarios");
            usu.finalidade = dados.get("finalidade_empresa");
        }
        // Campos compartilhados (coringas)
        usu.cep = dados.get("cep");
        usu.rua = dados.get("rua");
        usu.bairro = dados.get("bairro");
        usu.numero = dados.get("numero_end");
        usu.cidade = dados.get("cidade");
        usu.uf = dados.get("uf");
        usu.link_web = dados.get("link_web");
        usu.valor_mensal = dados.get("valor_mensal");

        if (usu_logado)
            usuarios[usu.usu_id - 1] = usu;
        else{
            usu.usu_id = maxId() + 1;
            usuarios.push(usu);
        }
            
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usu_logado", JSON.stringify(usu));
        redirecionar("index.html");
    }
}

function editar_usuario(){
    const usu_logado = JSON.parse(localStorage.getItem("usu_logado"));
    if (usu_logado){
        let nome, cpf, telefone, email, deficiencia, nome_responsavel, setor, senha;
        senha = document.getElementById("senha");
        if (usu_logado.tipo == 1)
        {
            nome = document.getElementById("nome");
            cpf = document.getElementById("cpf");
            telefone = document.getElementById("telefone_pessoa");
            deficiencia = document.getElementById("deficiencia_input");
            email = document.getElementById("email");
            deficiencia.value = usu_logado.deficiencia;
            const item = document.querySelector(`.custom-options li[data-value="${usu_logado.deficiencia}"]`);
            if (item) {
                triggerpessoa.querySelector('span').innerText = item.innerText;
            }
            // Campos adicionais de Pessoa Física
            document.getElementById("dt_nascimento").value = usu_logado.dt_nascimento || "";
            document.getElementById("rg").value = usu_logado.rg || "";
            document.getElementById("sexo").value = usu_logado.sexo || "";
            document.getElementById("estado_civil").value = usu_logado.estado_civil || "";
            document.getElementById("raca").value = usu_logado.raca || "";
            document.getElementById("escolaridade").value = usu_logado.escolaridade || "";
        }
        else{
            nome = document.getElementById("razao_social");
            cpf = document.getElementById("cnpj");
            telefone = document.getElementById("telefone_empresa");
            setor = document.getElementById("setor");
            email = document.getElementById("email_corporativo");
            nome_responsavel = document.getElementById("nome_responsavel");
            setor.value = usu_logado.setor;
            nome_responsavel.value = usu_logado.nome_responsavel;
            const item = document.querySelector(`.custom-options li[data-value="${usu_logado.setor}"]`);
            if (item) {
                triggerempresa.querySelector('span').innerText = item.innerText;
            }
            // Campos adicionais de Empresa
            document.getElementById("ie_empresa").value = usu_logado.ie || "";
            document.getElementById("qtd_funcionarios").value = usu_logado.qtd_funcionarios || "";
            document.getElementById("finalidade_empresa").value = usu_logado.finalidade || "";
        }
        // Campos compartilhados (coringas)
        document.getElementById("cep").value = usu_logado.cep || "";
        document.getElementById("rua").value = usu_logado.rua || "";
        document.getElementById("bairro").value = usu_logado.bairro || "";
        document.getElementById("numero_end").value = usu_logado.numero || "";
        document.getElementById("cidade").value = usu_logado.cidade || "";
        document.getElementById("uf").value = usu_logado.uf || "";
        document.getElementById("link_web").value = usu_logado.link_web || "";
        document.getElementById("valor_mensal").value = usu_logado.valor_mensal || "";

        nome.value = usu_logado.nome;
        cpf.value = usu_logado.cpf_cnpj;
        telefone.value = usu_logado.telefone;
        email.value = usu_logado.email;
        senha.value = usu_logado.senha;
        selecionar_tipo_cadastro(usu_logado.tipo);
        const titulo_cadastro = document.getElementById("titulo_cadastro");
        titulo_cadastro.innerText = "Editar";
        const botao_cadastrar = document.getElementById("btn_cadastrar");
        botao_cadastrar.innerText = "Salvar Informações";
        const ja_tem_conta = document.getElementById("ja_tem_conta");
        ja_tem_conta.style.display = "none";
    }else  
        selecionar_tipo_cadastro(1);
}

function carregar_nome_usuario(){
    const div_nao_logado = document.getElementById("cabec_padrao");
    const div_logado = document.getElementById("div_logado");
    const usu_logado = JSON.parse(localStorage.getItem("usu_logado"));
    if (usu_logado){
        const nome_usuario = document.getElementById("nome_usuario");
        nome_usuario.innerText = "Olá, " + usu_logado.nome.split(" ")[0];
        div_nao_logado.style.display = "none";
        div_logado.style.display = "flex";
    }else{
        div_nao_logado.style.display = "flex";
        div_logado.style.display = "none";
    }
}

function alternarsenha(elemento){
    const pai = elemento.parentElement;
    const senha = pai.querySelector("input");
    const mostrar_senha = pai.querySelector("button");
    if (senha.type == "password"){
        senha.type = "text";
        mostrar_senha.innerHTML = "<i class='fa fa-eye-slash'></i>";
    }else{
        senha.type = "password";
        mostrar_senha.innerHTML = "<i class='fa fa-eye'></i>";
    }
}

function redirecionar(pagina){
    window.location.href = pagina;
}

function selecionar_tipo_cadastro(tipo){
    const btn_pessoa = document.getElementById("btn_pessoa");
    const btn_empresa = document.getElementById("btn_empresa");
    const label_link = document.getElementById("label_link_web");
    const label_valor = document.getElementById("label_valor_mensal");
    const input_link = document.getElementById("link_web");
    if(tipo == 1){
        btn_pessoa.classList.add("active");
        btn_empresa.classList.remove("active");
        tipo_pessoa_cadastro = 1;
        cadpessoa.style.display = "block";
        cadempresa.style.display = "none";
        const inputs_empresa = cadempresa.querySelectorAll('input');
        inputs_empresa.forEach(input => {
            input.required = false;
        });
        // Trocar labels dos coringas para Pessoa
        label_link.innerText = "Rede Social";
        label_valor.innerText = "Renda Mensal";
        input_link.placeholder = "https://linkedin.com/in/seu-perfil";
    }else{
        btn_pessoa.classList.remove("active");
        btn_empresa.classList.add("active");
        tipo_pessoa_cadastro = 2;
        cadpessoa.style.display = "none";
        cadempresa.style.display = "block";
        const inputs_pessoa = cadpessoa.querySelectorAll('input');
        inputs_pessoa.forEach(input => {
            input.required = false;
        });
        // Trocar labels dos coringas para Empresa
        label_link.innerText = "Site";
        label_valor.innerText = "Faturamento Mensal";
        input_link.placeholder = "https://www.suaempresa.com.br";
    }
}

function selecionar_op(opcao){
    if (tipo_pessoa_cadastro == 1){
        triggerpessoa.querySelector('span').innerText = opcao.innerText;
        let inputHidden = document.getElementById('deficiencia_input');
        inputHidden.value = opcao.getAttribute('data-value');
        selectpessoa.classList.remove('open');
        
    }else{
        triggerempresa.querySelector('span').innerText = opcao.innerText;
        let inputHidden = document.getElementById('setor_input');
        inputHidden.value = opcao.getAttribute('data-value');
        selectempresa.classList.remove('open');
    }
}

function BuscaUsuarioEmail(email){
    if (usuarios)
    {
        let i = 0;
        while(i< usuarios.length && usuarios[i].email != email){
            i++;
        }
        if(i< usuarios.length){
            return usuarios[i];
        }
        return null;
    }
}

async function preencherCEPAPI(campo){
    let cep = campo.value;
    if (validar_cep(campo))
    {
        cep = cep.replace("-","");
        let url = "https://viacep.com.br/ws/"+cep+"/json/"
        const resposta = await fetch(url);
        const dados = await resposta.json();
        if (!dados.erro){
            document.getElementById("rua").value = dados.logradouro;
            document.getElementById("bairro").value = dados.bairro;
            document.getElementById("cidade").value = dados.localidade;
            document.getElementById("uf").value = dados.uf;
        }
    }
    else{
        alert("CEP inválido!");
        campo.focus();
    }
    
}


async function enviarComEmailJS(tipo) {
    let templateID;
    let parametros;
    if (tipo == 1)
    {
        const form_contato = document.getElementById("contactForm");
        const nome  = form_contato.elements.nome.value;
        const email = form_contato.elements.email.value;
        const telefone = form_contato.elements.telefone.value;
        const assunto = form_contato.elements.assunto.value;
        const mensagem = form_contato.elements.mensagem.value;
        if (nome == "" || email == "" || telefone == "" || assunto == "" || mensagem == "")
        {
            alert("Preencha todos os campos!");
            return;
        }
        templateID = "template_0uu9h63";
        parametros = {
            email_destino: "arthur.orosco@unoeste.edu.br", 
            name: nome,
            email_usuario: email,
            telefone_usuario: telefone,
            assunto_mensagem: assunto,
            mensagem_corpo: mensagem
        };
    }
    else{
        const email = document.getElementById('email_login').value;
        if (email == "" || !(email.includes("@") && email.includes(".")))
        {
            alert("Preencha o campo de e-mail corretamente!");
            return;
        }
        let usuario = BuscaUsuarioEmail(email)
        if (!usuario)
        {
            alert("Usuario nao encontrado!");
            return;
        }
        templateID = "template_4r6ln9p";
        parametros = {
            email_destino: usuario.email, 
            name: "Incluir+",
            email: "arthur.orosco@unoeste.edu.br",
            nome_usuario: usuario.nome,
            senha_usuario: descriptografar(usuario.senha,5)
        };
    }

    const { iniciarEmail } = await import("./enviaremail.js");
    iniciarEmail();
    const serviceID = "service_phtbalr";

    try {
        const res = await emailjs.send(serviceID, templateID, parametros);
        console.log("Sucesso!", res.status, res.text);
        alert("E-mail enviado!");
    } catch (err) {
        console.error("Erro ao enviar:", err);
    }
    
}

function criptografar(senha, chave) {
    let resultado = "";
    for (let i = 0; i < senha.length; i++) {
        let charCode = senha.charCodeAt(i) + chave; 
        resultado += String.fromCharCode(charCode);
    }
    return resultado;
}

function descriptografar(senhaCripto, chave) {
    let resultado = "";
    for (let i = 0; i < senhaCripto.length; i++) {
        let charCode = senhaCripto.charCodeAt(i) - chave; 
        resultado += String.fromCharCode(charCode);
    }
    console.log(resultado);
    return resultado;
}

//chamada de funcoes padrao ao carregar a tela
//verificar_login_usuario();
//carregar_array_usuarios();
//carregar_nome_usuario();
export {usuario_logado}