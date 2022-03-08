const connection = require('./connection');

const list = async () => {
  const [products] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products;',
  );
  return products;
};

const productById = async (idProduct) => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?;';
  const [productData] = await connection.execute(query, [idProduct]);
  if (productData.length === 0) return null;
  const { id, name, quantity } = productData[0];
  return {
    id,
    name,
    quantity,
  };
};

const create = async (name, quantity) => {
  const [productData] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);', [name, quantity],
);
  return {
    id: productData.insertId,
    name,
    quantity,
  };
};

const update = async (name, quantity, id) => {
  const [productData] = await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );
  return {
    id: productData.insertId,
    name,
    quantity,
  };
};

const exclude = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return 'done';
};

module.exports = {
  list,
  productById,
  create,
  update,
  exclude,
};