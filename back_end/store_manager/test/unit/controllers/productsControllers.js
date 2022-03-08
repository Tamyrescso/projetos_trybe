const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsService');
const productsControllers = require('../../../controllers/productsController');

describe('PRODUCTS CONTROLLERS TESTS', () => {
  const request = {};
  const response = {};
  let next = () => {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns()
    next = sinon.stub().returns();
  })
  describe('Lista os produtos', () => {
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
        sinon.stub(productsServices, 'list').resolves(serviceResponse);
      });

      after(() => {
        productsServices.list.restore();
      });


      it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
        await productsControllers.list(request, response, next)

        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
        await productsControllers.list(request, response, next)

        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })
    })
    describe('Quando o produto buscado por id é listado com sucesso', () => {
      before(() => {
        sinon.stub(productsServices, 'productById').resolves(serviceResponseById);
      });

      after(() => {
        productsServices.productById.restore();
      });
      it('Chama o response.status com o valor da propriedade "code" do serviceResponseById', async () =>{
        request.params = '1';
        await productsControllers.productById(request, response, next)

        expect(response.status.calledWith(serviceResponseById.code)).to.be.true;
      })

      it('Chama o response.json com o valor da propriedade "data" do serviceResponseById ', async () =>{
        request.params = '1';
        await productsControllers.productById(request, response, next)

        expect(response.json.calledWith(serviceResponseById.data)).to.be.true;
      })
    })
    describe('Quando o produto buscado por id não é encontrado', () => {
      before(() => {
        sinon.stub(productsServices, 'productById').resolves(null);
      });

      after(() => {
        productsServices.productById.restore();
      });
      it('Chama o response.status com o valor 404', async () =>{
        await productsControllers.productById(request, response, next)

        expect(response.status.calledWith(404)).to.be.true;
      })

      it('Chama o response.json com o valor "message: Product not found"', async () =>{
        await productsControllers.productById(request, response, next)

        expect(response.json.calledWith({ message: "Product not found" })).to.be.true;
      })
    })
  })
  describe('Cadastra produtos no banco de dados', () => {
    const serviceResponse =   {
      code: 201,
      data: {
        id: 1,
        name: "produto",
        quantity: 10
      },
    };
    describe('Quando os produtos são cadastrados com sucesso', () => {
      before(() => {
        sinon.stub(productsServices, 'create').resolves(serviceResponse);
      });

      after(() => {
        productsServices.create.restore();
      });

      it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
        request.body = { name: 'produto', quantidade: 10 };
        await productsControllers.create(request, response, next)

        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
        request.body = { name: 'produto', quantidade: 10 };
        await productsControllers.create(request, response, next)

        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })
    })
  })
  describe('Atualiza produto no banco de dados', () => {
    const serviceResponse =   {
      code: 200,
      data: {
        id: 1,
        name: "produto",
        quantity: 12
      },
    };
    describe('Quando o produto é atualizado com sucesso', () => {
      before(() => {
        sinon.stub(productsServices, 'update').resolves(serviceResponse);
      });

      after(() => {
        productsServices.update.restore();
      });

      it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
        request.body = { name: 'produto', quantidade: 10 };
        request.params = '1';
        await productsControllers.update(request, response, next)

        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Chama o response.json com o valor da propriedade "data" do serviceResponse ', async () =>{
        request.body = { name: 'produto', quantidade: 10 };
        request.params = '1';
        await productsControllers.update(request, response, next)

        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })
    })
  })
  describe('Deleta produto no banco de dados', () => {
    const serviceResponse =   {
      code: 204,
    };
    describe('Quando o produto é deletado com sucesso', () => {
      before(() => {
        sinon.stub(productsServices, 'exclude').resolves(serviceResponse);
      });

      after(() => {
        productsServices.exclude.restore();
      });

      it('Chama o response.status com o valor da propriedade "code" do serviceResponse', async () =>{
        request.params = '1';
        await productsControllers.exclude(request, response, next)

        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })
    })
  })
})