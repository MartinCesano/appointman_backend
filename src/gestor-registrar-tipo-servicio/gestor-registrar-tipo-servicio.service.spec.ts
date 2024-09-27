import { Test, TestingModule } from '@nestjs/testing';
import { GestorRegistrarTipoServicioService } from './gestor-registrar-tipo-servicio.service';

describe('GestorRegistrarTipoServicioService', () => {
  let service: GestorRegistrarTipoServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestorRegistrarTipoServicioService],
    }).compile();

    service = module.get<GestorRegistrarTipoServicioService>(GestorRegistrarTipoServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
