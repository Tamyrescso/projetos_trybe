import { expect } from "chai";
import CarModel from "../../../models/CarModel";
import Sinon from "sinon";
import { Model } from 'mongoose';

const carModel = new CarModel();

describe('Sucesso no model', () => {
  describe('Read retorna lista de carros', () => {
    const mockCar = [
      {
        "_id": "62968617dae9e3313b6edcc4",
        "model": "Uno da Escada",
        "year": 1963,
        "color": "red",
        "buyValue": 3500,
        "doorsQty": 2,
        "seatsQty": 2
      }
    ];

    before(() => {
      Sinon.stub(Model, 'find').resolves(mockCar)
    });

    after(() => {
      (Model.find as Sinon.SinonStub).restore();
    })

    it('Se retorna a lista de carros corretamente', async () => {
      const result = await carModel.read();
      expect(result).to.be.deep.equal(mockCar);
    })
  })
  describe('ReadOne retorna carro especificado por id', () => {
    const mockCar = {
      "_id": "62968617dae9e3313b6edcc4",
      "model": "Uno da Escada",
      "year": 1963,
      "color": "red",
      "buyValue": 3500,
      "doorsQty": 2,
      "seatsQty": 2
    };

    before(() => {
      Sinon.stub(Model, 'findOne').resolves(mockCar)
    });

    after(() => {
      (Model.findOne as Sinon.SinonStub).restore();
    })

    it('Se retorna as informações do carro corretamente', async () => {
      const result = await carModel.readOne('62968617dae9e3313b6edcc4');
      expect(result).to.be.deep.equal(mockCar);
    })
  })
  describe('Delete retorna carro especificado por id', () => {
    const mockCar = {
      "_id": "62968617dae9e3313b6edcc4",
      "model": "Uno da Escada",
      "year": 1963,
      "color": "red",
      "buyValue": 3500,
      "doorsQty": 2,
      "seatsQty": 2
    };

    before(() => {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(mockCar)
    });

    after(() => {
      (Model.findByIdAndDelete as Sinon.SinonStub).restore();
    })

    it('Se deleta o carro e retorna as informações corretamente', async () => {
      const result = await carModel.delete('62968617dae9e3313b6edcc4');
      expect(result).to.be.deep.equal(mockCar);
    })
  })
  describe('Create retorna carro criado', () => {
    const mockCar = {
      "model": "Ferrari Maranello",
      "year": 1963,
      "color": "red",
      "buyValue": 3500000,
      "doorsQty": 2,
      "seatsQty": 2,
      "_id": "629aea0f5b2fa0e25ac9f3ad"
    }

    before(() => {
      Sinon.stub(Model, 'create').resolves(mockCar)
    });

    after(() => {
      (Model.create as Sinon.SinonStub).restore();
    })

    it('Se cria o carro e retorna as informações corretamente', async () => {
      const result = await carModel.create(
        {
          "model": "Ferrari Maranello",
          "year": 1963,
          "color": "red",
          "buyValue": 3500000,
          "seatsQty": 2,
          "doorsQty": 2
        }
        );
      expect(result).to.be.deep.equal(mockCar);
    })
  })
  describe('Update retorna carro atualizado', () => {
    const mockCar = {
      "model": "Ferrari Maranello",
      "year": 1963,
      "color": "blue",
      "buyValue": 3500000,
      "doorsQty": 2,
      "seatsQty": 2,
      "_id": "629aea0f5b2fa0e25ac9f3ad"
    }

    before(() => {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(mockCar)
    });

    after(() => {
      (Model.findByIdAndUpdate as Sinon.SinonStub).restore();
    })

    it('Se atualiza o carro e retorna as informações corretamente', async () => {
      const result = await carModel.update(
        "629aea0f5b2fa0e25ac9f3ad",
        {
          "model": "Ferrari Maranello",
          "year": 1963,
          "color": "blue",
          "buyValue": 3500000,
          "seatsQty": 2,
          "doorsQty": 2
        }
        );
      expect(result).to.be.deep.equal(mockCar);
    })
  })
})