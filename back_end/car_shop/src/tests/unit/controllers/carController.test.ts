import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon from 'sinon';
import CarController from '../../../controllers/CarController';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';

const mockCar = {
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "doorsQty": 2,
  "seatsQty": 2,
  "_id": "629aea0f5b2fa0e25ac9f3ad"
}

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

describe('Sucesso no controller', () => {
  after(() => {
    (carService.read as Sinon.SinonStub).restore();
    (carService.readOne as Sinon.SinonStub).restore();
    (carService.create as Sinon.SinonStub).restore();
    (carService.update as Sinon.SinonStub).restore();
    (carService.delete as Sinon.SinonStub).restore();
  })
  it('Testa Create', async () => {
    const req = {
      body: {
        "model": "Ferrari Maranello",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "doorsQty": 2,
        "seatsQty": 2,
      },
    } as unknown as Request;

    const res = {
      status: () => {},
      json: () => {},
    } as unknown as Response;

    Sinon.stub(res, 'status').returns(res);
    Sinon.stub(res, 'json').returns(res);
    Sinon.stub(carService, 'create').resolves({ ...mockCar })

    await carController.create(req, res);

    expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as Sinon.SinonStub).calledWith(mockCar))
      .to.be.true;
  })
  it('Testa Read', async () => {
    const req = { } as unknown as Request;
    const res = {
      status: () => {},
      json: () => {},
    } as unknown as Response;

    Sinon.stub(res, 'status').returns(res);
    Sinon.stub(res, 'json').returns(res);
    Sinon.stub(carService, 'read').resolves([mockCar])

    await carController.read(req, res);

    expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as Sinon.SinonStub).calledWith([mockCar]))
      .to.be.true;
  })
  it('Testa ReadOne', async () => {
    const req = {
      params: { id: "629aea0f5b2fa0e25ac9f3ad"}
    } as unknown as Request;
    const res = {
      status: () => {},
      json: () => {},
    } as unknown as Response;

    Sinon.stub(res, 'status').returns(res);
    Sinon.stub(res, 'json').returns(res);
    Sinon.stub(carService, 'readOne').resolves(mockCar)

    await carController.readOne(req, res);

    expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as Sinon.SinonStub).calledWith(mockCar))
      .to.be.true;
  })
  it('Testa Delete', async () => {
    const req = {
      params: { id: "629aea0f5b2fa0e25ac9f3ad"}
    } as unknown as Request;
    const res = {
      status: () => {},
      json: () => {},
    } as unknown as Response;

    Sinon.stub(res, 'status').returns(res);
    Sinon.stub(res, 'json').returns(res);
    Sinon.stub(carService, 'delete').resolves(mockCar)

    await carController.delete(req, res);

    expect((res.status as Sinon.SinonStub).calledWith(204)).to.be.true;
  })
  it('Testa Update', async () => {
    const req = {
      params: { id: "629aea0f5b2fa0e25ac9f3ad"},
      body: {
        "model": "Ferrari Maranello",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "doorsQty": 2,
        "seatsQty": 2,
      },
    } as unknown as Request;
    const res = {
      status: () => {},
      json: () => {},
    } as unknown as Response;

    Sinon.stub(res, 'status').returns(res);
    Sinon.stub(res, 'json').returns(res);
    Sinon.stub(carService, 'update').resolves(mockCar)

    await carController.update(req, res);

    expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
  })
})


describe('Falha no controller', () => {
  describe('Erro de id diferente de 24 caracteres', () => {
    it('Erro ao tentar achar um carro com id menor que 24', async () => {
      const req = {
        params: { id: "629aea"}
      } as unknown as Request;
      const res = {
        status: () => {},
        json: () => {},
      } as unknown as Response;
  
      Sinon.stub(res, 'status').returns(res);
      Sinon.stub(res, 'json').returns(res);
  
      await carController.readOne(req, res);
  
      expect((res.status as Sinon.SinonStub).calledWith(400)).to.be.true;
    })
    it('Erro ao tentar deletar um carro com id menor que 24', async () => {
      const req = {
        params: { id: "629aea"}
      } as unknown as Request;
      const res = {
        status: () => {},
        json: () => {},
      } as unknown as Response;
  
      Sinon.stub(res, 'status').returns(res);
      Sinon.stub(res, 'json').returns(res);
  
      await carController.delete(req, res);
  
      expect((res.status as Sinon.SinonStub).calledWith(400)).to.be.true;
    })
    it('Erro ao tentar atualizar um carro com id menor que 24', async () => {
      const req = {
        params: { id: "629aea"},
        body: {
          "model": "Ferrari Maranello",
          "year": 1963,
          "color": "red",
          "buyValue": 3500000,
          "doorsQty": 2,
          "seatsQty": 2,
        },
      } as unknown as Request;
      const res = {
        status: () => {},
        json: () => {},
      } as unknown as Response;
  
      Sinon.stub(res, 'status').returns(res);
      Sinon.stub(res, 'json').returns(res);
  
      await carController.update(req, res);
  
      expect((res.status as Sinon.SinonStub).calledWith(400)).to.be.true;
    })
  })
  describe('Erro ao interagir com carro que não existe', () => {
    it('Erro ao tentar deletar um carro que não existe', async () => {
      const req = {
        params: { id: "89dgsteryat56sdfaregv76x"}
      } as unknown as Request;
      const res = {
        status: () => {},
        json: () => {},
      } as unknown as Response;
  
      Sinon.stub(res, 'status').returns(res);
      Sinon.stub(res, 'json').returns(res);
      Sinon.stub(carService, 'delete').resolves(null);
  
      await carController.delete(req, res);
  
      expect((res.status as Sinon.SinonStub).calledWith(404)).to.be.true;
    })
    it('Erro ao tentar atualizar um carro que não existe', async () => {
      const req = {
        params: { id: "89dgsteryat56sdfaregv76s"},
        body: {
          "model": "Ferrari Maranello",
          "year": 1963,
          "color": "red",
          "buyValue": 3500000,
          "doorsQty": 2,
          "seatsQty": 2,
        },
      } as unknown as Request;
      const res = {
        status: () => {},
        json: () => {},
      } as unknown as Response;
  
      Sinon.stub(res, 'status').returns(res);
      Sinon.stub(res, 'json').returns(res);
      Sinon.stub(carService, 'update').resolves(null);
  
      await carController.update(req, res);
  
      expect((res.status as Sinon.SinonStub).calledWith(404)).to.be.true;
    })
  })
  it('Erro ao tentar criar um carro com info incorretas', async () => {
    const req = {
      body: {
        "model": "Fe",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 2
      },
    } as unknown as Request;
    const res = {
      status: () => {},
      json: () => {},
    } as unknown as Response;

    Sinon.stub(res, 'status').returns(res);
    Sinon.stub(res, 'json').returns(res);
    Sinon.stub(carService, 'create').resolves({ error: 'Error' });

    await carController.create(req, res);

    expect((res.status as Sinon.SinonStub).calledWith(400)).to.be.true;
  })
})