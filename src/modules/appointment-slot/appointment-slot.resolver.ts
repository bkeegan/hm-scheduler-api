import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentSlotService } from './appointment-slot.service';
import { AppointmentSlot } from './appointment-slot.entity';
import { ConfirmReservationInput, CreateAppointmentSlotInput, CreateAppointmentSlotsFromSpanInput, GetAvailableAppointmentSlotsInput, ReserveAppointmentInput } from './appointment-slot.dto';
import { MockRoles } from 'src/decorators/mock-roles.decorator';
import { UseGuards } from '@nestjs/common';
import { MockGuard } from 'src/guards/mock-guard';

@UseGuards(MockGuard)
@Resolver(() => AppointmentSlot)
export class AppointmentSlotResolver {
    constructor(private appointmentSlotService: AppointmentSlotService) {}

    @MockRoles(['admin', 'provider'])
    @Query(() => [AppointmentSlot])
    async findAllAppointSlots(): Promise<AppointmentSlot[]> {
        return await this.appointmentSlotService.findAll();
    }

    @MockRoles(['admin', 'provider'])
    @Mutation(() => AppointmentSlot) 
    async createAppointmentSlot(@Args('input') input: CreateAppointmentSlotInput): Promise<AppointmentSlot> {
        return await this.appointmentSlotService.create(input);
    }

    //this would be the call that the frontend would make to create the appointment slots. 
    //It takes in any start/end timestamp values and will provision appointment slots for 15 minutes. 
    //If it's desired that the provider could only have start and end times be on the 15 minute marks - the frontend could handle
    //ie. have dropdowns or something where the provider picks Start 8:30am, End 4:00pm and not be able to enter start: 8:47am for example
    //I wanted the backend itself to not impose a data structure that would make adjusting to future requirement changes difficult later.  
    @MockRoles(['admin', 'provider'])
    @Mutation(() => [AppointmentSlot]) 
    async createAppointmentSlotsFromSpan(@Args('input') input: CreateAppointmentSlotsFromSpanInput) {
        return await this.appointmentSlotService.createAppointmentSlotsFromSpan(input);
    }

    @MockRoles(['admin', 'client'])
    @Query(() => [AppointmentSlot])
    async getAvailableAppointmentSlots(@Args('input') input: GetAvailableAppointmentSlotsInput): Promise<AppointmentSlot[]> {
        return await this.appointmentSlotService.getAvailableAppointmentSlots(input);
    }

    @MockRoles(['admin', 'client'])
    @Mutation(() => AppointmentSlot)
    async reserveAppointment (@Args('input') input: ReserveAppointmentInput): Promise<AppointmentSlot> {
        return await this.appointmentSlotService.reserveAppointment(input);
    }

    @MockRoles(['admin', 'client'])
    @Mutation(() => AppointmentSlot)
    async confirmReservation (@Args('input') input: ConfirmReservationInput): Promise<AppointmentSlot> {
        return await this.appointmentSlotService.confirmReservation(input);
    }

}
