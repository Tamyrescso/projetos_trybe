const sinon = require('sinon');
const { expect } = require('chai');

const salesModels = require('../../../models/salesModel');
const salesServices = require('../../../services/salesService');
const productsModels = require('../../../models/productsModel');

describe('SALES SERVICE TESTS', () => {
  const realId = '1';
  describe('Busca todas as vendas no banco de dados', () => {
    const realId = '1';
    const unexistentId = '35';
    const modelResponseAllSales =    [
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
    ]

    const modelResponseIdSale =     [
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

    const serviceResponse = {
      code: 200,
      data:     [
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
      ]};

    const serviceResponseById = {
      code: 200,
      data:     [
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
      ]};
  
    describe('Quando as vendas são listadas com sucesso', () => {
      before(() => {
        sinon.stub(salesModels, 'list').resolves(modelResponseAllSales);
      })
  
      after(() => {
        salesModels.list.restore();
      });
  
      it('Retorna um objeto com code 200 as vendas listadas', async () => {
        const response = await salesServices.list();
  
        expect(response).to.be.deep.equal(serviceResponse);
      })
    })
    describe('Quando a venda for chamada por id e é listada com sucesso', () => {
      before(() => {
        sinon.stub(salesModels, 'saleById').resolves(modelResponseIdSale);
      })
  
      after(() => {
        salesModels.saleById.restore();
      });

      it('Retorna um objeto com code 200 e as informações das vendas', async () => {
        const response = await salesServices.saleById(realId);

        expect(response).to.be.deep.equal(serviceResponseById);
      })
    })
    describe('Quando as vendas chamadas por id não existem', () => {
      before(() => {
        sinon.stub(salesModels, 'saleById').resolves(null);
      })
  
      after(() => {
        salesModels.saleById.restore();
      });

      it('Retorna um objeto com code 400 e objeto serviceResponseByIdFail', async () => {
        const response = await salesServices.saleById(unexistentId);

        expect(response).to.be.null;
      })
    })
  })
  // describe('Cadastra vendas no banco de dados', () => {
  //   const saleData = [
  //     {
  //       "productId": 1,
  //       "quantity": 2
  //     },
  //     {
  //       "productId": 2,
  //       "quantity": 5
  //     }
  //   ];
  
  //   const modelResponse =   {
  //     "id": 1,
  //     "itemsSold": [
  //       {
  //         "productId": 1,
  //         "quantity": 2
  //       },
  //       {
  //         "productId": 2,
  //         "quantity": 5
  //       }
  //     ]
  //   };
  
  //   const serviceSuccessResponse = {
  //     code: 201,
  //     data:   {
  //       "id": 1,
  //       "itemsSold": [
  //         {
  //           "productId": 1,
  //           "quantity": 2
  //         },
  //         {
  //           "productId": 2,
  //           "quantity": 5
  //         }
  //       ]
  //     },
  //   };

  //   const findProductsSuccessResponse = {
  //     "id": 1,
  //     "name": "produto A",
  //     "quantity": 10
  //   };
  
  //   describe('Quando a venda é cadastrada com sucesso', () => {
  //     before(() => {
  //       sinon.stub(salesModels, 'create').resolves(modelResponse);
  //       sinon.stub(productsModels, 'productById').resolves(findProductsSuccessResponse);
  //     })
  
  //     after(() => {
  //       salesModels.create.restore();
  //       productsModels.productById.restore();
  //     });
  
  //     it('Retorna um objeto com code 201 e data com as informações da venda', async () => {
  //       const response = await salesServices.create(saleData)
  
  //       expect(response).to.be.deep.equal(serviceSuccessResponse);
  //     })
  //   })
  // })
  describe('Atualiza uma venda no banco de dados', () => {
    const saleData =  [
      {
        "productId": 1,
        "quantity": 6
      }
    ];
  
    const modelResponse = {
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    };

    const searchResponse = [
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
  
    const serviceSuccessResponse = {
      code: 200,
      data: {
        "saleId": 1,
        "itemUpdated": [
          {
            "productId": 1,
            "quantity": 6
          }
        ]
      }
    };
    describe('Quando a venda é atualizada com sucesso', () => {
      before(() => {
        sinon.stub(salesModels, 'update').resolves(modelResponse);
        sinon.stub(salesModels, 'saleById').resolves(searchResponse);
      })
  
      after(() => {
        salesModels.update.restore();
        salesModels.saleById.restore();
      });
  
      it('Retorna um objeto com code 200 e data com as informações da venda', async () => {
        const response = await salesServices.update(saleData, realId)
  
        expect(response).to.be.deep.equal(serviceSuccessResponse);
      })
    })
  })
  describe('Deleta uma venda do banco de dados', () => {
    const modelResponse = 'done';

    const searchResponse = {
      code: 200,
      data:     [
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
    ]};
  
    const serviceSuccessResponse = {
      code: 204
    };
  
    describe('Quando a venda é deletada com sucesso', () => {
      before(() => {
        sinon.stub(salesModels, 'exclude').resolves(modelResponse);
        sinon.stub(salesModels, 'saleById').resolves(searchResponse);
      })
  
      after(() => {
        salesModels.exclude.restore();
        salesModels.saleById.restore();
      });
  
      it('Retorna um objeto com code 204', async () => {
        const response = await salesServices.exclude(realId)
  
        expect(response).to.be.deep.equal(serviceSuccessResponse);
      })
    })
  })
})