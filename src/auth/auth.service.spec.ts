import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { Provider } from '../../constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: Provider.PRISMA_SERVICE, useValue: {} },
        { provide: Provider.JWT_STRATEGY, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
