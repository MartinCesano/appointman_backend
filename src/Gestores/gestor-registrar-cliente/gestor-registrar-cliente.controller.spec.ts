import { Test, TestingModule } from '@nestjs/testing';
import { GestorRegistrarClienteController } from './gestor-registrar-cliente.controller';

describe('GestorRegistrarClienteController', () => {
  let controller: GestorRegistrarClienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestorRegistrarClienteController],
    }).compile();

    controller = module.get<GestorRegistrarClienteController>(GestorRegistrarClienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
