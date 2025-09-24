let listaAlimentos = [];

// Função para buscar uma imagem básica do alimento
function obterImagem(nome) {
  const imgMap = {
    "maçã": "https://img.icons8.com/color/48/apple.png",
    "banana": "https://img.icons8.com/color/48/banana.png",
    "leite": "https://img.icons8.com/color/48/milk-bottle.png",
    "suco": "https://img.icons8.com/color/48/orange-juice.png",
    "pão": "https://img.icons8.com/color/48/bread.png",
    "arroz": "https://img.icons8.com/color/48/rice-bowl.png",
    "refrigerante": "https://img.icons8.com/color/48/soda.png",
    "café": "https://img.icons8.com/color/48/coffee.png"
  };
  return imgMap[nome.toLowerCase()] || "https://img.icons8.com/color/48/meal.png";
}

// Adicionar alimento à lista
async function adicionarAlimento() {
  const nome = document.getElementById('alimento').value;
  if (!nome) return alert('Digite um alimento ou líquido.');

  try {
    const alimentoRes = await fetch('/api/alimento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    });

    const alimentoData = await alimentoRes.json();
    if (alimentoData.error) return alert('Erro: ' + alimentoData.error);

    listaAlimentos.push(alimentoData);
    atualizarLista();
    document.getElementById('alimento').value = '';
  } catch (err) {
    alert('Erro ao buscar alimento: ' + err.message);
  }
}

// Atualizar lista na tela com botão remover e imagem
function atualizarLista() {
  const ul = document.getElementById('lista-alimentos');
  ul.innerHTML = '';

  listaAlimentos.forEach((item, index) => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = obterImagem(item.nome);
    img.alt = item.nome;

    const span = document.createElement('span');
    span.textContent = `${item.nome}: ${item.calorias} kcal`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.onclick = () => {
      listaAlimentos.splice(index, 1);
      atualizarLista();
    };

    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(btnRemover);
    ul.appendChild(li);
  });
}

// Calcular déficit com alimentos adicionados
async function calcularDeficit() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const idade = parseInt(document.getElementById('idade').value);
  const sexo = document.getElementById('sexo').value;
  const nivelAtividade = document.getElementById('nivelAtividade').value;

  if (!peso || !altura || !idade) return alert('Preencha todos os campos!');
  if (listaAlimentos.length === 0) return alert('Adicione pelo menos um alimento ou líquido.');

  const caloriasConsumidas = listaAlimentos.reduce((total, item) => tot
