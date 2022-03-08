const connection = require('./connection');

const serializeSales = (sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
  date: sale.date,
  saleId: sale.sale_id,
});

const serializeSalesById = (sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
  date: sale.date,
});

const list = async () => {
  const [sales] = await connection.execute(
    `SELECT salesP.sale_id, salesP.product_id, salesP.quantity, sales.date
    FROM StoreManager.sales_products AS salesP
    JOIN StoreManager.sales AS sales
    ON sales.id = salesP.sale_id
    ORDER BY salesP.sale_id, salesP.product_id;`,
  );

  const result = sales.map(serializeSales);
  return result;
};

const saleById = async (idSale) => {
  const query = `
    SELECT salesP.product_id, salesP.quantity, sales.date 
    FROM StoreManager.sales_products AS salesP
    JOIN StoreManager.sales AS sales
    ON sales.id = salesP.sale_id
    WHERE salesP.sale_id = ?;`;

  const [salesData] = await connection.execute(query, [idSale]);

  if (salesData.length === 0) return null;

  const result = salesData.map(serializeSalesById);

  return result;
};

const updateProductsBySale = async ({ productId, quantity, operator }) => {
  await connection.execute(
    `UPDATE StoreManager.products SET quantity = quantity ${operator} ? WHERE id = ?;`, 
    [quantity, productId],
  );
  return 'done';
};

const create = async (array) => {
  const querySale = 'INSERT INTO StoreManager.sales (date) VALUE (NOW());';
  const [saleDate] = await connection.execute(querySale);
  
  const querySaleProduct = `INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES(?, ?, ?);`;
  await array.forEach((s) => {
    connection.execute(querySaleProduct, [saleDate.insertId, s.productId, s.quantity]);
  });

  await Promise.all(array.map((itemsSold) => updateProductsBySale({
      productId: itemsSold.productId,
      quantity: itemsSold.quantity,
      operator: '-',
  })));

  return {
    id: saleDate.insertId,
    itemsSold: array,
  };
};

const update = async (array, id) => {
  const query = `UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ? WHERE sale_id = ?;`;
  const [saleData] = await connection.execute(query, [array[0].productId, array[0].quantity, id]);

  return {
    saleId: saleData.insertId,
    itemUpdated: array,
  };
};

const exclude = async (id) => {
  const salesById = await saleById(id);
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  await Promise.all(salesById.map((itemsSold) => updateProductsBySale({
    productId: itemsSold.productId,
    quantity: itemsSold.quantity,
    operator: '+',
})));
  return 'done';
};

module.exports = {
  list,
  saleById,
  create,
  update,
  exclude,
  updateProductsBySale,
};