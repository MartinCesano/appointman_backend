import { Test, TestingModule } from '@nestjs/testing';
import { HoraController } from './hora.controller';
import { HoraService } from './hora.service';

describe('HoraController', () => {
  let controller: HoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoraController],
      providers: [HoraService],
    }).compile();

    controller = module.get<HoraController>(HoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
