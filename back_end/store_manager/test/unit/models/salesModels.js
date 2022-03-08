const sinon = require('sinon');
const { expect } = require('chai');
const DB = require('../../../models/connection');
const saleModels = require('../../../models/salesModel');

describe('SALES MODEL TESTS', () => {
  const realId = '1';
  const unexistentId = '35';
  describe('Lista os produtos', () => {
    const modelExpectedResponse =     [
      {
        "sale_id": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
      {
        "sale_id": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
      }
    ];

    const successResponseAllsales = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    const successResponseIdsale =   [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    const modelExpectedIdResponse =   [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
      }
    ];
  
    describe('Quando as vendas são listadas com sucesso', () => {
      before(() => {
        const result = [modelExpectedResponse, []];
        sinon.stub(DB, 'execute').returns(result);
      })
  
      after(() => {
        DB.execute.restore();
      });
  
      it('Retorna um array com as informações das vendas', async () => {
        const modelResponse = await saleModels.list();

        expect(modelResponse).to.be.an('array');
        expect(modelResponse).to.be.deep.equal(successResponseAllsales);
      })
    })
    describe('Quando as vendas chamadas por id é listada com sucesso', () => {
      before(() => {
        const result = [modelExpectedIdResponse, []];
        sinon.stub(DB, 'execute').resolves(result);
      })
  
      after(() => {
        DB.execute.restore();
      });

      it('Retorna um array com as vendas por id', async () => {
        const modelResponse = await saleModels.saleById(realId);

        expect(modelResponse).to.be.a('array');
        expect(modelResponse).to.be.deep.equal(successResponseIdsale);
      })
    })
    describe('Quando as vendas chamadas por id não existe', () => {
      before(() => {
        const result = [[], []];
        sinon.stub(DB, 'execute').resolves(result);
      })
  
      after(() => {
        DB.execute.restore();
      });

      it('Retorna null', async () => {
        const modelResponse = await saleModels.saleById(unexistentId);

        expect(modelResponse).to.be.null;
      })
    })
  })
  describe('Cadastra uma venda no banco de dados', () => {
    const saleData =   [
      {
        "productId": 1,
        "quantity": 3
      }
    ];
    const salesData =   [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];
  
    const executeResponse = [{ insertId: 1 }]
  
    const modelSuccessResponse =   {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    };

    const modelSuccessResponseMultiple =   {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    };
  
    describe('Quando a venda é cadastrada com sucesso', () => {
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
  
      after(() => {
        DB.execute.restore();
      });
  
      it('Retorna um objeto com as informações da venda e o ID', async () => {
        const modelResponse = await saleModels.create(saleData);
  
        expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
      })
      it('Retorna um objeto com as informações das vendas e o ID', async () => {
        const modelResponse = await saleModels.create(salesData);
  
        expect(modelResponse).to.be.deep.equal(modelSuccessResponseMultiple);
      })
    })
  })
  describe('Altera a venda no banco de dados', () => {
    const saleData = [
      {
        "productId": 1,
        "quantity": 6
      }
    ]
  
    const executeResponse = [{ insertId: 1 }]
  
    const modelSuccessResponse = {
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    }
  
    describe('Quando a venda é atualizada com sucesso', () => {
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
  
      after(() => {
        DB.execute.restore();
      });
  
      it('Retorna um objeto com as informações venda atualizada e o ID', async () => {
        const modelResponse = await saleModels.update(saleData, realId);
  
        expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
      })
    })
  })
  describe('Deleta a venda do banco de dados', () => {  
    const modelSuccessResponse = 'done';

    const saleByIdResponse = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    const modelResponse = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "product_id": 2,
        "quantity": 2
      }
    ];
  
    describe('Quando a venda é deletada com sucesso', () => {
      before(() => {
        const result = [modelResponse, []]
        sinon.stub(DB, 'execute').resolves(result);
        sinon.stub(saleModels, 'saleById').resolves(saleByIdResponse);
      })
  
      after(() => {
        DB.execute.restore();
        saleModels.saleById.restore();
      });
      it('Retorna mensagem "done"', async () => {
        const modelResponse = await saleModels.exclude(realId);
  
        expect(modelResponse).to.be.deep.equal(modelSuccessResponse);
      })
    })
  })
})