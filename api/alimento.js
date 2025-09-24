// api/alimento.js
import { buscarAlimento } from '../lib/api';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { nome } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome do alimento é obrigatório.' });

  try {
    const resultado = await buscarAlimento(nome);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
