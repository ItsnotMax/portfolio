import { Test, TestingModule } from '@nestjs/testing';
import { EssencesController } from './essences.controller';

describe('EssencesController', () => {
  let controller: EssencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EssencesController],
    }).compile();

    controller = module.get<EssencesController>(EssencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
