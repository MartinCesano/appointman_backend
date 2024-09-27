import { Test, TestingModule } from '@nestjs/testing';
import { GestorRegistrarClienteService } from './gestor-registrar-cliente.service';

describe('GestorRegistrarClienteService', () => {
  let service: GestorRegistrarClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestorRegistrarClienteService],
    }).compile();

    service = module.get<GestorRegistrarClienteService>(GestorRegistrarClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
