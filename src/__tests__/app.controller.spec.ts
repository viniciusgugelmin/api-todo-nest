import { Test, TestingModule } from '@nestjs/testing';

import { AppController, AppService } from '../App';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "API TODO - NestJS"', () => {
      expect(appController.getHealth()).toBe('API TODO - NestJS');
    });
  });
});
