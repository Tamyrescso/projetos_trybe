const sinon = require('sinon');
const { expect } = require('chai');

const productsModels = require('../../../models/productsModel');
const productsServices = require('../../../services/productsService');

describe('PRODUCTS SERVICE TESTS', () => {
  const realId = '1';
  const unexistentId = '35';
  describe('Busca todos os produtos no banco de dados', () => {
    const modelResponseAllproducts =   [
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

    const modelResponseIdProduct =   {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    };

    const serviceResponse = {
      code: 200,
      data:   [
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
      ]
    };

    const serviceResponseById = {
      code: 200,
      data:   {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
    };
  
    describe('Quando os produtos são listados com sucesso', () => {
      before(() => {
        sinon.stub(productsModels, 'list').resolves(modelResponseAllproducts);
      })
  
      after(() => {
        productsModels.list.restore();
      });
  
      it('Retorna um objeto com code 200 os produtos listados', async () => {
        const response = await productsServices.list();
  
        expect(response).to.be.deep.equal(serviceResponse);
      })
    })
    describe('Quando o produto chamado por id é listado com sucesso', () => {
      before(() => {
        sinon.stub(productsModels, 'productById').resolves(modelResponseIdProduct);
      })
  
      after(() => {
        productsModels.productById.restore();
      });

      it('Retorna um objeto com code 200 e a informação do produto', async () => {
        const response = await productsServices.productById(realId);

        expect(response).to.be.deep.equal(serviceResponseById);
      })
    })
    describe('Quando o produto chamado por id não existe', () => {
      before(() => {
        sinon.stub(productsModels, 'productById').resolves(null);
      })
  
      after(() => {
        productsModels.productById.restore();
      });

      it('Retorna um objeto com code 400 e objeto serviceResponseByIdFail', async () => {
        const response = await productsServices.productById(unexistentId);

        expect(response).to.be.null;
      })
    })
  })
  describe('Cadastra produtos no banco de dados', () => {
    const productData = {
      name: 'produto',
      quantity: 100
    };

    const listResponse = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América",
        "quantity": 30
      }
    ];
  
    const modelResponse = {
      "id": 4,
      "name": "produto", 
      "quantity": 100
    };
  
    const serviceSuccessResponse = {
      code: 201,
      data: {
        "id": 4,
        "name": "produto", 
        "quantity": 100
      } 
    };
  
    describe('Quando o produto é cadastrado com sucesso', () => {
      before(() => {
        sinon.stub(productsModels, 'create').resolves(modelResponse);
        sinon.stub(productsModels, 'list').resolves(listResponse);
      })
  
      after(() => {
        productsModels.create.restore();
      });
  
      it('Retorna um objeto com code 201 e data com as informações do produto', async () => {
        const response = await productsServices.create(productData)
  
        expect(response).to.be.deep.equal(serviceSuccessResponse);
      })
    })
  })
  describe('Atualiza um produto no banco de dados', () => {
    const productData = {
      name: 'produto',
      quantity: 100
    };
  
    const modelResponse = {
      "id": 1,
      "name": "produto", 
      "quantity": 100
    };

    const searchResponse = {
      "id": 1,
      "name": "produto", 
      "quantity": 102
    };
  
    const serviceSuccessResponse = {
      code: 200,
      data: {
        "id": 1,
        "name": "produto", 
        "quantity": 100
      } 
    };
  
    describe('Quando o produto é atualizado com sucesso', () => {
      before(() => {
        sinon.stub(productsModels, 'update').resolves(modelResponse);
        sinon.stub(productsModels, 'productById').resolves(searchResponse);
      })
  
      after(() => {
        productsModels.update.restore();
        productsModels.productById.restore();
      });
  
      it('Retorna um objeto com code 200 e data com as informações do produto', async () => {
        const response = await productsServices.update(productData.name, productData.quantity, realId)
  
        expect(response).to.be.deep.equal(serviceSuccessResponse);
      })
    })
  })
  describe('Deleta um produto no banco de dados', () => {
    const modelResponse = 'done';

    const searchResponse = {
      "id": 1,
      "name": "produto", 
      "quantity": 102
    };
  
    const serviceSuccessResponse = {
      code: 204
    };
  
    describe('Quando o produto é deletado com sucesso', () => {
      before(() => {
        sinon.stub(productsModels, 'exclude').resolves(modelResponse);
        sinon.stub(productsModels, 'productById').resolves(searchResponse);
      })
  
      after(() => {
        productsModels.exclude.restore();
        productsModels.productById.restore();
      });
  
      it('Retorna um objeto com code 204', async () => {
        const response = await productsServices.exclude(realId)
  
        expect(response).to.be.deep.equal(serviceSuccessResponse);
      })
    })
  })
})