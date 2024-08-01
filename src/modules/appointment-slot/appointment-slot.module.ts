import { Module } from '@nestjs/common';
import { AppointmentSlotService } from './appointment-slot.service';
import { AppointmentSlotResolver } from './appointment-slot.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentSlot } from './appointment-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentSlot])],
  providers: [AppointmentSlotService, AppointmentSlotResolver]
})
export class AppointmentSlotModule {}
