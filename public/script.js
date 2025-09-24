async function calcularDeficit() {
  const nome = document.getElementById('alimento').value;
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const idade = parseInt(document.getElementById('idade').value);
  const sexo = document.getElementById('sexo').value;
  const nivelAtividade = document.getElementById('nivelAtividade').value;

  if (!nome || !peso || !altura || !idade) return alert('Preencha todos os campos!');

  // Buscar calorias do alimento
  const alimentoRes = await fetch('/api/alimento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });
  const alimentoData = await alimentoRes.json();
  const caloriasConsumidas = alimentoData.calorias;

  // Calcular déficit
  const deficitRes = await fetch('/api/deficit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ peso, altura, idade, sexo, nivelAtividade, caloriasConsumidas })
  });
  const deficitData = await deficitRes.json();

  document.getElementById('resultado').textContent =
    `Você consumiu ${caloriasConsumidas} kcal.\n` +
    `Seu TDEE (gasto diário) é ${deficitData.tdee} kcal.\n` +
    `Déficit calórico: ${deficitData.deficit} kcal.`;
}
