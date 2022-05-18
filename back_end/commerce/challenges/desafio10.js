db.produtos.find({ $and: [
  { "valoresNutricionais.3.percentual": { $gte: 30, $lte: 40 } }, 
] }, 
{ nome: 1, _id: 0 });