import { Test, TestingModule } from '@nestjs/testing';
import { PrestadorServicioService } from './prestador-servicio.service';

describe('PrestadorServicioService', () => {
  let service: PrestadorServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrestadorServicioService],
    }).compile();

    service = module.get<PrestadorServicioService>(PrestadorServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
