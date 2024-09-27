import { Test, TestingModule } from '@nestjs/testing';
import { EmprendedorService } from './emprendedor.service';

describe('EmprendedorService', () => {
  let service: EmprendedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmprendedorService],
    }).compile();

    service = module.get<EmprendedorService>(EmprendedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
