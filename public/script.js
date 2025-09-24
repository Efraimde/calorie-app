let listaAlimentos = [];

async function adicionarAlimento() {
  const nome = document.getElementById('alimento').value;
  if (!nome) return alert('Digite um alimento ou líquido.');

  try {
    // Buscar calorias do alimento
    const alimentoRes = await fetch('/api/alimento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    });

    const alimentoData = await alimentoRes.json();
    if (alimentoData.error) return alert('Erro: ' + alimentoData.error);

    // Adicionar à lista
    listaAlimentos.push(alimentoData);

    // Atualizar lista na tela
    const ul = document.getElementById('lista-alimentos');
    const li = document.createElement('li');
    li.textContent = `${alimentoData.nome}: ${alimentoData.calorias} kcal`;
    ul.appendChild(li);

    document.getElementById('alimento').value = '';
  } catch (err) {
    alert('Erro ao buscar alimento: ' + err.message);
  }
}

async function calcularDeficit() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const idade = parseInt(document.getElementById('idade').value);
  const sexo = document.getElementById('sexo').value;
  const nivelAtividade = document.getElementById('nivelAtividade').value;

  if (!peso || !altura || !idade) return alert('Preencha todos os campos!');

  if (listaAlimentos.length === 0) return alert('Adicione pelo menos um alimento ou líquido.');

  // Somar calorias de todos os alimentos
  const caloriasConsumidas = listaAlimentos.reduce((total, item) => total + item.calorias, 0);

  try {
    // Calcular déficit
    const deficitRes = await fetch('/api/deficit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peso, altura, idade, sexo, nivelAtividade, caloriasConsumidas })
    });

    const deficitData = await deficitRes.json();
    if (deficitData.error) return alert('Erro: ' + deficitData.error);

    document.getElementById('resultado').textContent =
      `Calorias totais consumidas: ${caloriasConsumidas} kcal\n` +
      `Seu TDEE (gasto diário) é ${deficitData.tdee} kcal\n` +
      `Déficit calórico: ${deficitData.deficit} kcal`;
  } catch (err) {
    alert('Erro ao calcular déficit: ' + err.message);
  }
}
