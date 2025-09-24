// lib/api.js
const axios = require('axios');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Função simulada; você pode substituir pela API real depois
async function buscarAlimento(nomeAlimento) {
  // Aqui você pode colocar a chamada real à API como FatSecret ou USDA
  const fakeData = {
    banana: 89,
    arroz: 130,
    feijao: 76,
    pizza: 266
  };
  const calorias = fakeData[nomeAlimento.toLowerCase()] || 100;
  return { nome: nomeAlimento, calorias };
}

module.exports = { buscarAlimento };
