import { Test, TestingModule } from '@nestjs/testing';
import { ReservaTurnoService } from './reserva-turno.service';

describe('ReservaTurnoService', () => {
  let service: ReservaTurnoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservaTurnoService],
    }).compile();

    service = module.get<ReservaTurnoService>(ReservaTurnoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
