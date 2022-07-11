import { expect } from "chai";
import CarModel from "../../../models/CarModel";
import CarService from "../../../services/CarService";
import Service from "../../../services";
import Sinon from "sinon";
import { Car } from "../../../interfaces/CarInterface";

const carModel = new CarModel();
const carService = new CarService(carModel);

describe('Sucesso no service', () => {
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
      Sinon.stub(carModel, 'read').resolves(mockCar)
    });

    after(() => {
      (carModel.read as Sinon.SinonStub).restore();
    })

    it('Se retorna a lista de carros corretamente', async () => {
      const result = await carService.read();
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
      Sinon.stub(carModel, 'readOne').resolves(mockCar)
    });

    after(() => {
      (carModel.readOne as Sinon.SinonStub).restore();
    })

    it('Se retorna as informações do carro corretamente', async () => {
      const result = await carService.readOne('62968617dae9e3313b6edcc4');
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
      Sinon.stub(carModel, 'delete').resolves(mockCar)
    });

    after(() => {
      (carModel.delete as Sinon.SinonStub).restore();
    })

    it('Se deleta o carro e retorna as informações corretamente', async () => {
      const result = await carService.delete('62968617dae9e3313b6edcc4');
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
      Sinon.stub(carModel, 'create').resolves(mockCar)
    });

    after(() => {
      (carModel.create as Sinon.SinonStub).restore();
    })

    it('Se cria o carro e retorna as informações corretamente', async () => {
      const result = await carService.create(
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
      Sinon.stub(carModel, 'update').resolves(mockCar)
    });

    after(() => {
      (carModel.update as Sinon.SinonStub).restore();
    })

    it('Se atualiza o carro e retorna as informações corretamente', async () => {
      const result = await carService.update(
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
});

describe('Falha no service', () => {
  it('Erro ao tentar criar um carro com info incorretas', async () => {
    const result = await carService.create(
      {
        "model": "Fe",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 2
      }
      );
    expect(result).to.have.a.property('error');
  })
  it('Erro ao tentar atualizar um carro com info incorretas', async () => {
    const result = await carService.update(
      "4edd40c86762e0fb12000003",
      {
        "model": "Ferrari Maranello",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 1
      }
      );
    expect(result).to.have.a.property('error');
  })
})

describe('Testa classe abstrata', () => {
  class example extends Service<Car> {
    constructor(model = new CarModel()) {
      super(model);
    }
  };

  const mockCreateCar = {
    "model": "Ferrari Maranello",
    "year": 1963,
    "color": "blue",
    "buyValue": 3500000,
    "doorsQty": 2,
    "seatsQty": 2,
    "_id": "629aea0f5b2fa0e25ac9f3ad"
  };

  const mockUpdateCar = {
    "model": "Ferrari Maranello",
    "year": 1963,
    "color": "blue",
    "buyValue": 3500000,
    "doorsQty": 2,
    "seatsQty": 2,
    "_id": "629aea0f5b2fa0e25ac9f3ad"
  };

  before(() => {
    Sinon.stub(carModel, 'create').resolves(mockCreateCar);
    Sinon.stub(carModel, 'update').resolves(mockUpdateCar);
  });

  after(() => {
    (carModel.create as Sinon.SinonStub).restore();
    (carModel.update as Sinon.SinonStub).restore();
  })

  const mockClass = new example(carModel);

  it('Se cria o carro e retorna as info corretas', async () => {
    const result = await mockClass.create(
      {
        "model": "Fe",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 2
      }
      );
    expect(result).to.be.deep.equal(mockCreateCar);
  })
  it('Se atualiza o carro e retorna as info corretas', async () => {
    const result = await mockClass.update(
      "4edd40c86762e0fb12000003",
      {
        "model": "Ferrari Maranello",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 1
      }
      );
    expect(result).to.be.deep.equal(mockUpdateCar);
  })
})