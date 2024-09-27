import { Test, TestingModule } from '@nestjs/testing';
import { EmprendedorController } from './emprendedor.controller';
import { EmprendedorService } from './emprendedor.service';

describe('EmprendedorController', () => {
  let controller: EmprendedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmprendedorController],
      providers: [EmprendedorService],
    }).compile();

    controller = module.get<EmprendedorController>(EmprendedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
