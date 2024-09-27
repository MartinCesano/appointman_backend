import { Test, TestingModule } from '@nestjs/testing';
import { GestorRegistrarTipoServicioController } from './gestor-registrar-tipo-servicio.controller';

describe('GestorRegistrarTipoServicioController', () => {
  let controller: GestorRegistrarTipoServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestorRegistrarTipoServicioController],
    }).compile();

    controller = module.get<GestorRegistrarTipoServicioController>(GestorRegistrarTipoServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
