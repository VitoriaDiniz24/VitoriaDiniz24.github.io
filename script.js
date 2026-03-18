// Segunda Parte - Interatividade do site (JavaScript)
// Desenvolvido para a disciplina de Introdução à Programação Web

document.addEventListener("DOMContentLoaded", function () { //dispara quando o HTML terminou de carregar.

  // ===== Validação do formulário de login =====
  const form = document.querySelector("form"); // função do JavaScript usada para selecionar elementos do HTML.
  if (form) {
    form.addEventListener("submit", function (event) {
      const email = document.querySelector("#email").value.trim();
      const senha = document.querySelector("#senha").value.trim();

      // Campos vazios
      if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos!"); // função do JavaScript que mostra uma caixinha de aviso no navegador.
        event.preventDefault(); // impede o envio do formulário.
        return;
      }

      // Regex para e-mail válido
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido!");
    event.preventDefault();
    return;
      }

      alert("Login realizado com sucesso!");
    });
  }

    // ===== Interação com imagens =====
  const imagens = document.querySelectorAll("img"); //busca todas as tags <img> do HTML.
  imagens.forEach((img) => { //forEach significa: “para cada imagem da lista, faça...”; img representa cada imagem individual dentro desse loop.
    img.addEventListener("click", () => { //Para cada imagem, adicionamos um evento click.
      alert("Você selecionou: " + img.alt);
    });
  });



  // ===== Alternância de tema (modo claro / escuro) =====
  const temaBtn = document.getElementById("temaBtn");
  const body = document.body;

  // ----- Aplicar tema salvo -----
  const temaSalvo = localStorage.getItem("tema"); // "escuro" ou "claro"
  if (temaSalvo === "escuro") {
    body.classList.add("modo-escuro");
  }

  // ===== Troca da logo conforme o tema =====
  const logoImg = document.querySelector('img.logo'); //procura por uma imagem (<img>) que tenha a classe logo. Se a classe não existir, a logo não será trocada.

  function applyLogoForMode() {
    if (!logoImg) return; //Se não existir, sai da função.

    if (body.classList.contains("modo-escuro")) {
      logoImg.dataset.origSrc = logoImg.dataset.origSrc || logoImg.src; // graças ao dataset.origSrc, ele sabe qual era a logo original.
      // logoImg.src = logoImg.dataset.origSrc; recupera a original.
      logoImg.src = "../img/Logo-white.png"; //troca para a logo branca:
    } else { //se estiver em modo claro
      if (logoImg.dataset.origSrc) {
        logoImg.src = logoImg.dataset.origSrc;
      }
    }
    //Se foi salva a imagem original antes → a logo volta para ela.
  }

  // Aplica a verificação inicial (caso o modo escuro já esteja ativo, a logo será trocada imediatamente.)
  applyLogoForMode();
// Sem essa linha, a logo só mudaria quando você clicasse no botão de tema, não automaticamente ao carregar a página.


  // ----- Clicar no botão alterna o modo e salva -----

  if (temaBtn) {
    temaBtn.addEventListener("click", function () {
      body.classList.toggle("modo-escuro"); //representa o corpo do site, onde a classe do modo escuro será aplicada.
      //classList é um objeto especial do DOM que contém todas as classes CSS presentes no elemento.

      //O toggle() adiciona ou remove a classe modo-escuro.

      if (body.classList.contains("modo-escuro")) { //Se estiver no modo escuro
        localStorage.setItem("tema", "escuro"); //Salva "escuro" no localStorage
        temaBtn.textContent = "Modo Claro"; //O botão muda o texto para “Modo Claro”
      } else {
        localStorage.setItem("tema", "claro"); //Salva "claro" no localStorage
        temaBtn.textContent = "Modo Escuro"; //O botão muda o texto para “Modo Escuro”
      }

      applyLogoForMode(); //Aplica a troca da logo ao clicar, mantendo a logo sempre coerente com o tema.
    });
  }



  
  // MODAL DE INGREDIENTES
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("titulo-sabor");
  const modalIng = document.getElementById("ingredientes");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".sabores li").forEach((item) => {
    item.addEventListener("click", () => {
      modalTitle.textContent = item.textContent;
      modalIng.textContent = item.dataset.ingredientes;
      modal.classList.remove("hidden");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  //=============================
  // SISTEMA DO CARRINHO
  //=============================
  // Carrinho salvo na memória
  let carrinho = [];

  // Abrir modal ao clicar em um sabor
  document.querySelectorAll("[data-ingredientes]").forEach(item => {
    item.addEventListener("click", () => {
      const sabor = item.textContent.trim();
      const ingredientes = item.getAttribute("data-ingredientes");

      document.getElementById("titulo-sabor").textContent = sabor;
      document.getElementById("ingredientes").textContent = ingredientes;

      // Guarda temporariamente o produto selecionado
      document.getElementById("modal").setAttribute("data-sabor", sabor);
      document.getElementById("modal").setAttribute("data-ingredientes", ingredientes);

      document.getElementById("modal").classList.remove("hidden");
    });
  });

  // Fechar modal ao clicar fora do conteúdo
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") {
      document.getElementById("modal").classList.add("hidden");
    }
  });

  // Botão ADICIONAR dentro do modal
  document.querySelector(".add-carrinho").addEventListener("click", () => {
    const modal = document.getElementById("modal");

    const sabor = modal.getAttribute("data-sabor");
    const ingredientes = modal.getAttribute("data-ingredientes");

    // Monta o item
    const item = {
      sabor: sabor,
      ingredientes: ingredientes,
      quantidade: 1
    };

    // Verifica se já existe para aumentar quantidade
    const existente = carrinho.find(p => p.sabor === sabor);

    if (existente) {
      existente.quantidade++;
    } else {
      carrinho.push(item);
    }

    console.log("CARRINHO ATUAL:");
    console.table(carrinho);

    alert("Item adicionado ao carrinho!");

    modal.classList.add("hidden");
  });

  // script.js - contém adicionarAoCarrinho usada por todas as páginas de produto
  function adicionarAoCarrinho(nome, preco) {
    // garante que preco é número
    const precoNum = typeof preco === "string" ? parseFloat(preco.replace(",", ".")) : Number(preco);
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // opcional: permitir quantidades padrão 1
    carrinho.push({ nome, preco: Number(precoNum), quantidade: 1 });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`${nome} adicionado ao carrinho!`);
  }
})
