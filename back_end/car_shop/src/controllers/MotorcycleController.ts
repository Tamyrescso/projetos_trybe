import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const moto = await this.service.create(body);
      if (!moto) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in moto) {
        return res.status(400).json(moto);
      }
      return res.status(201).json(moto);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const motos = await this.service.read();
      return res.status(200).json(motos);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      const moto = await this.service.readOne(id);
      return moto
        ? res.status(200).json(moto)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<(typeof res
    ) | void> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      const { body } = req;

      const moto = await this.service.update(id, body);

      if (!moto) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in moto) return res.status(400).json(moto);

      return res.status(200).end();
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError | null>,
  ): Promise<(typeof res
    ) | void> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      const moto = await this.service.delete(id);
      return moto
        ? res.status(204).end()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleController;