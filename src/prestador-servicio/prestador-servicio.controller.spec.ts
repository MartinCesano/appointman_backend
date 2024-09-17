import { Test, TestingModule } from '@nestjs/testing';
import { PrestadorServicioController } from './prestador-servicio.controller';
import { PrestadorServicioService } from './prestador-servicio.service';

describe('PrestadorServicioController', () => {
  let controller: PrestadorServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrestadorServicioController],
      providers: [PrestadorServicioService],
    }).compile();

    controller = module.get<PrestadorServicioController>(PrestadorServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
