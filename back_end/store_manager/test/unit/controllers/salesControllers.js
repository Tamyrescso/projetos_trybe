const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesService');
const salesControllers = require('../../../controllers/salesController');

describe('SALES CONTROLLERS TESTS', () => {
  const request = {params: '1'};
  const response = {};
  let next = () => {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns()
    next = sinon.stub().returns();
  })

  describe('Lista as vendas', () => {
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
        sinon.stub(salesServices, 'list').resolves(serviceResponse);
      });

      after(() => {
        salesServices.list.restore();
      });


      it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
        await salesControllers.list(request, response, next)

        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
        await salesControllers.list(request, response, next)

        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })
    })
    describe('Quando as vendas buscadas por id são listadas com sucesso', () => {
      before(() => {
        sinon.stub(salesServices, 'saleById').resolves(serviceResponseById);
      });

      after(() => {
        salesServices.saleById.restore();
      });
      it('Chama o response.status com o valor da propriedade "code" do serviceResponseById', async () =>{
        await salesControllers.saleById(request, response, next)

        expect(response.status.calledWith(serviceResponseById.code)).to.be.true;
      })

      it('Chama o response.json com o valor da propriedade "data" do serviceResponseById ', async () =>{
        await salesControllers.saleById(request, response, next)

        expect(response.json.calledWith(serviceResponseById.data)).to.be.true;
      })
    })
    describe('Quando as vendas buscadas por id não são encontradas', () => {
      before(() => {
        sinon.stub(salesServices, 'saleById').resolves(null);
      });

      after(() => {
        salesServices.saleById.restore();
      });
      it('Chama o response.status com o valor 404', async () =>{
        await salesControllers.saleById(request, response, next)

        expect(response.status.calledWith(404)).to.be.true;
      })

      it('Chama o response.json com o valor "message: Sale not found"', async () =>{
        await salesControllers.saleById(request, response, next)

        expect(response.json.calledWith({ message: "Sale not found" })).to.be.true;
      })
    })
  })
  describe('Cadastra as vendas no banco de dados', () => {
    const serviceResponse = {
      code: 201,
      data:   {
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
      },
    };
    describe('Quando as vendas são cadastradas com sucesso', () => {
      before(() => {
        sinon.stub(salesServices, 'create').resolves(serviceResponse);
      });

      after(() => {
        salesServices.create.restore();
      });

      it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
        request.body = [
          {
            "productId": 1,
            "quantity": 2
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ];
        await salesControllers.create(request, response, next)

        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
        request.body = [
          {
            "productId": 1,
            "quantity": 2
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ];
        await salesControllers.create(request, response, next)

        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })
    })
  })
  describe('Atualiza a venda no banco de dados', () => {
    const serviceResponse =   {
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
        sinon.stub(salesServices, 'update').resolves(serviceResponse);
      });

      after(() => {
        salesServices.update.restore();
      });

      it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
        request.body =   [
          {
            "productId": 1,
            "quantity": 6
          }
        ];
        request.params = '1';
        await salesControllers.update(request, response, next)

        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
        request.body =   [
          {
            "productId": 1,
            "quantity": 6
          }
        ];
        request.params = '1';
        await salesControllers.update(request, response, next)

        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })
    })
  })
  describe('Deleta venda do banco de dados', () => {
    const serviceResponse =   {
      code: 204,
    };
    describe('Quando a venda é deletada com sucesso', () => {
      before(() => {
        sinon.stub(salesServices, 'exclude').resolves(serviceResponse);
      });

      after(() => {
        salesServices.exclude.restore();
      });

      it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
        request.params = '1';
        await salesControllers.exclude(request, response, next)

        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })
    })
  })
})