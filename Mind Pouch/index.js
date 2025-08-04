const listaDeCompras = document.getElementById("lista-de-compras");
const botaoAdicionar = document.getElementById("adicionar-item");
const botaoRemover = document.getElementById("remover-item");
const inputItem = document.getElementById("input-item");

const coresClasses = ["item-cor-0", "item-cor-1", "item-cor-2", "item-cor-3"];
let corIndex = 0;

function adicionarItem() {
  const texto = inputItem.value.trim();
  if (texto === "") return;

  const li = document.createElement("li");
  li.classList.add(coresClasses[corIndex]);

  corIndex = (corIndex + 1) % coresClasses.length;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const titulo = document.createElement("strong");
  titulo.textContent = texto;

  // Checkbox risca o texto adicionando classe
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      titulo.classList.add("riscado");
    } else {
      titulo.classList.remove("riscado");
    }
  });

  const data = document.createElement("p");
  const agora = new Date();
  const opcoes = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  data.textContent = agora.toLocaleDateString("pt-BR", opcoes);
  data.classList.add("texto-data");

  li.appendChild(checkbox);
  li.appendChild(titulo);
  li.appendChild(document.createElement("br"));
  li.appendChild(data);

  listaDeCompras.appendChild(li);
  inputItem.value = "";
  atualizarEstadoDaLixeira(); // Atualiza botão após adicionar item
}

// Event delegation para clique nos itens da lista
listaDeCompras.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;

  const tag = event.target.tagName.toLowerCase();
  if (["input", "strong", "p", "br"].includes(tag)) return;

  li.classList.toggle("selecionado-para-remover");
  atualizarEstadoDaLixeira();
});

botaoAdicionar.addEventListener("click", adicionarItem);

inputItem.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    adicionarItem();
  }
});

botaoRemover.addEventListener("click", () => {
  const selecionados = document.querySelectorAll(".selecionado-para-remover");
  selecionados.forEach(item => item.remove());
  atualizarEstadoDaLixeira();
});

function atualizarEstadoDaLixeira() {
  const selecionados = document.querySelectorAll(".selecionado-para-remover");
  if (selecionados.length > 0) {
    botaoRemover.classList.add("ativo-para-remover");
  } else {
    botaoRemover.classList.remove("ativo-para-remover");
  }
}
