import { Test, TestingModule } from '@nestjs/testing';
import { ReservaTurnoController } from './reserva-turno.controller';
import { ReservaTurnoService } from './reserva-turno.service';

describe('ReservaTurnoController', () => {
  let controller: ReservaTurnoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservaTurnoController],
      providers: [ReservaTurnoService],
    }).compile();

    controller = module.get<ReservaTurnoController>(ReservaTurnoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
