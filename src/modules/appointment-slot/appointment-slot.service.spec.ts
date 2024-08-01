import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentSlotService } from './appointment-slot.service';

describe('AppointmentSlotService', () => {
  let service: AppointmentSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentSlotService],
    }).compile();

    service = module.get<AppointmentSlotService>(AppointmentSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
