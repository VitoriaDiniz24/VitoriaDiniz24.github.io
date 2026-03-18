// --- Função para adicionar itens ao carrinho ---
function adicionarAoCarrinho(nome, preco) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({ nome, preco });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(`${nome} adicionado ao carrinho!`);
}

// --- Script para gerenciar carrinho ---
document.addEventListener("DOMContentLoaded", function () {
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");
  const btnLimpar = document.getElementById("limpar-carrinho");
  const btnFinalizar = document.getElementById("finalizar-pedido");

  // Função para carregar carrinho
  function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}`;

      const btnRemover = document.createElement("button");
      btnRemover.textContent = "Remover";
      btnRemover.classList.add("btn-remover");
      btnRemover.onclick = function () {
        removerItem(index);
      };

      li.appendChild(btnRemover);
      listaCarrinho.appendChild(li);

      total += item.preco;
    });

    totalCarrinho.textContent = total.toFixed(2).replace(".", ",");
  }

  // Função para remover item
  function removerItem(index) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
  }

  // Limpar carrinho
  if (btnLimpar) {
    btnLimpar.addEventListener("click", function () {
      localStorage.removeItem("carrinho");
      carregarCarrinho();
    });
  }

  // Finalizar pedido
  // Finalizar pedido
if (btnFinalizar) {
  btnFinalizar.addEventListener("click", function () {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    // 1. Verifica se o carrinho está vazio
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.");
      return; // Interrompe a função
    }

    // 2. Coleta a forma de pagamento selecionada
    
    // --- Funções para mostrar/esconder o campo de troco (usadas no HTML) ---
function mostrarTroco() {
    document.getElementById('campo-troco').style.display = 'block';
    document.getElementById('valorPago').focus(); // Foca no campo de valor pago
}

function esconderTroco() {
    document.getElementById('campo-troco').style.display = 'none';
    document.getElementById('valorPago').value = ''; // Limpa o valor
}
    const formaPagamentoElemento = document.querySelector('input[name="formaPagamento"]:checked');
    let formaPagamento = "Não Selecionada"; // Valor padrão

    if (formaPagamentoElemento) {
        formaPagamento = formaPagamentoElemento.value;
    }

    // 3. Monta e exibe a mensagem de resumo
    const totalElemento = document.getElementById("total-carrinho");
    const total = totalElemento ? totalElemento.textContent : "0,00";

    const resumo = `
        **Pedido Finalizado com Sucesso!**
        -----------------------------------
        Total da Compra: R$ ${total}
        Forma de Pagamento: ${formaPagamento}
        -----------------------------------
        Obrigado pela sua compra!
    `;

    alert(resumo);
    
    // 4. Limpa o carrinho após a finalização
    localStorage.removeItem("carrinho");
    carregarCarrinho();
  });
}


  // Carrega carrinho ao abrir página
  carregarCarrinho();
});
