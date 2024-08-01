import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentSlotResolver } from './appointment-slot.resolver';

describe('AppointmentSlotResolver', () => {
  let resolver: AppointmentSlotResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentSlotResolver],
    }).compile();

    resolver = module.get<AppointmentSlotResolver>(AppointmentSlotResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
