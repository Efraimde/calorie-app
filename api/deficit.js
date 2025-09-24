// api/deficit.js
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { peso, altura, idade, sexo, nivelAtividade, caloriasConsumidas } = req.body;

  if (!peso || !altura || !idade || !sexo || !nivelAtividade || caloriasConsumidas === undefined) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // Fórmula Mifflin-St Jeor
  let tmb = sexo === 'masculino'
    ? 10 * peso + 6.25 * altura - 5 * idade + 5
    : 10 * peso + 6.25 * altura - 5 * idade - 161;

  const fatoresAtividade = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725,
    muitoIntenso: 1.9
  };

  const tdee = tmb * (fatoresAtividade[nivelAtividade] || 1.2);
  const deficit = tdee - caloriasConsumidas;

  res.status(200).json({ tdee: Math.round(tdee), deficit: Math.round(deficit) });
}
