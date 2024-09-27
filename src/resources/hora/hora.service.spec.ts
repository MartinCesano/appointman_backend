import { Test, TestingModule } from '@nestjs/testing';
import { HoraService } from './hora.service';

describe('HoraService', () => {
  let service: HoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoraService],
    }).compile();

    service = module.get<HoraService>(HoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
