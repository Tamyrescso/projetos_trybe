db.produtos.updateMany(
  {},
  { $set: { vendasPorDia: [
    NumberInt(0),
    NumberInt(0),
    NumberInt(0),
    NumberInt(0),
    NumberInt(0),
    NumberInt(0),
    NumberInt(0),
    ] } },
  { upsert: true },
);

db.produtos.updateOne(
  { nome: "Big Mac" },
  { $inc: { "vendasPorDia.3": 60 } },
);

db.produtos.updateMany(
  { tags: { $elemMatch: { $eq: "bovino" } } },
  { $inc: { "vendasPorDia.6": 120 } },
);

db.produtos.find(
  {}, 
  { nome: 1, vendasPorDia: 1, _id: 0 },
);