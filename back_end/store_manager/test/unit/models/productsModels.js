const sinon = require('sinon');
const { expect } = require('chai');
const DB = require('../../../models/connection');
const productModels = require('../../../models/productsModel');

describe('PRODUCTS MODEL TESTS', () => {
  const realId = '1';
  const unexistentId = '35';
  describe('Lista os produtos', () => {
    const successResponseAllproducts =   [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ];

    const successResponseIdProduct =   {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    };
  
    describe('Quando os produtos são listados com sucesso', () => {
      before(() => {
        const result = [successResponseAllproducts, []];
        sinon.stub(DB, 'execute').resolves(result);
      })
  
      after(() => {
        DB.execute.restore();
      });
  
      it('Retorna um array com as informações dos produtos', async () => {
        const modelResponse = await productModels.list();

        expect(modelResponse).to.be.an('array');
        expect(modelResponse).to.be.deep.equal(successResponseAllproducts);
      })
    })
    describe('Quando o produto chamado por id é listado com sucesso', () => {
      before(() => {
        const result = [[successResponseIdProduct], []];
        sinon.stub(DB, 'execute').resolves(result);
      })
  
      after(() => {
        DB.execute.restore();
      });

      it('Retorna um objeto com as infomações do produto', async () => {
        const modelResponse = await productModels.productById(realId);

        expect(modelResponse).to.be.an('object');
        expect(modelResponse).to.be.deep.equal(successResponseIdProduct);
      })
    })
    describe('Quando o produto chamado por id não existe', () => {
      before(() => {
        const result = [[], []];
        sinon.stub(DB, 'execute').resolves(result);
      })
  
      after(() => {
        DB.execute.restore();
      });

      it('Retorna null', async () => {
        const modelResponse = await productModels.productById(unexistentId);

        expect(modelResponse).to.be.null;
      })
    })
  })
  describe('Cadastra produtos no banco de dados', () => {
    const productData = {
      name: 'produto',
      quantity: 100,
    };
  
    const executeResponse = [{ insertId: 1 }]
  
    const modelSuccessResponse = {
      "id": 1,
      "name": "produto", 
      "quantity": 100,
    }
  
    describe('Quando o produto é cadastrado com sucesso', () => {
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
  
      after(() => {
        DB.execute.restore();
      });
  
      it('Retorna um objeto com as informações do produto e o ID', async () => {
        const modelResponse = await productModels.create(productData.name, productData.quantity);
  
        expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
      })
    })
  })
  describe('Altera o produto no banco de dados', () => {
    const productData = {
      name: 'produto',
      quantity: 100,
    };
  
    const executeResponse = [{ insertId: 1 }]
  
    const modelSuccessResponse = {
      "id": 1,
      "name": "produto", 
      "quantity": 100,
    }
  
    describe('Quando o produto é atualizado com sucesso', () => {
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
  
      after(() => {
        DB.execute.restore();
      });
  
      it('Retorna um objeto com as informações do produto atualizado e o ID', async () => {
        const modelResponse = await productModels.update(productData.name, productData.quantity, realId);
  
        expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
      })
    })
  })
  describe('Deleta o produto do banco de dados', () => {  
    const modelSuccessResponse = 'done';
  
    describe('Quando o produto é deletado com sucesso', () => {
      before(() => {
        sinon.stub(DB, 'execute');
      })
  
      after(() => {
        DB.execute.restore();
      });
      it('Retorna mensagem "done"', async () => {
        const modelResponse = await productModels.exclude(realId);
  
        expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
      })
    })
  })
})