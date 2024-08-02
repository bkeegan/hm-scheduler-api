import { Injectable } from '@nestjs/common';
import { AppointmentSlot } from './appointment-slot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { ConfirmReservationInput, CreateAppointmentSlotInput, CreateAppointmentSlotsFromSpanInput, ReserveAppointmentInput } from './appointment-slot.dto';

//these would be managed by some configuration system and not just constants sitting here.
const increment = 900 //15 minutes
const reserveMin = 86400  //24hrs
const reservationExpiry = 1800 //30 minutes

//this appointment-slot service is already starting to feel a bit monolithic and it contains functions that both the provider and patient exclusively use.
//I would consider possibly breaking this up (maybe appointment-slot-provider.service and appointment-slot-client.service) to keep it more managable and to better seperate the concerns

@Injectable()
export class AppointmentSlotService {
    constructor(
        @InjectRepository(AppointmentSlot) private appointmentSlotRepo: Repository<AppointmentSlot> 
    ) {}

    create(input: CreateAppointmentSlotInput) {
        return this.appointmentSlotRepo.save(input)
    }

    async createAppointmentSlotsFromSpan(input: CreateAppointmentSlotsFromSpanInput) {
        const { providerId, startTime, endTime, buffer } = input; 
        if(endTime - startTime < increment + buffer) {
            throw `Invalid timespan, please specify a time span at least ${increment + buffer} seconds`
        }

        //this feels unelegant to me... but it works. I tend to write code roughly to quickly get something that's functional and possibly refine later. 
        //I find it's better to rough stuff in and get it working before agonizing over every single line.
        //given the time constraints I decided not to make this more elegant/more efficent.
        let current = startTime;
        let results: AppointmentSlot[] = [];
        const existing = await this.findByProvider(providerId,startTime);
        while(current + increment + buffer <= endTime) {
            const end = current + increment
            
            //this will provision a new appointment if it doesn't overlap with an existing one. 
            //for instance if the provider previously said they were available between 12pm and 3pm and then later wanted to make it 9am to 4pm - it would fill in the new slots only
            //played around with using moment-range library here but it made the code more awkward, not less imo
            const overlap = existing.filter(a => (current >= a.startTime && current < a.endTime) && (a => end >= a.startTime && end < a.endTime)) 
            if(overlap.length === 0) {
                const result = await this.create({
                    providerId: providerId,
                    startTime: current,
                    endTime: end
                })
                results.push(result);
            }
            else {
                console.warn('Appointment slot overlaps with 1 or more existing appointment slots')
            }
            current += increment + buffer;
        }
        return results
    }

    findAll(): Promise<AppointmentSlot[]> {
        return this.appointmentSlotRepo.find();
    }

    findByProvider(providerId: number, startTime: number): Promise<AppointmentSlot[]> {
        return this.appointmentSlotRepo.find(
         { where: {
            providerId: providerId,
            startTime: MoreThanOrEqual(startTime)
         }}   
        );
    }

    findAfterTime(startTime: number): Promise<AppointmentSlot[]> {
        return this.appointmentSlotRepo.find(
         { where: {
            startTime: MoreThanOrEqual(startTime)
         }}   
        );
    }

    async getAvailableAppointmentSlots() {
        const now = new Date().getTime() / 1000;
        return (await this.findAfterTime(now + reserveMin))
            .filter(a => !a.reservedTime || (now - a.reservedTime > reservationExpiry && !a.confirmedTime))
            //reservedTime is null (not reserved or reserved time is 30 minutes from now (i.e. at least > 30 minutes old) and not confirmed)
    }

    reserveAppointment(reserveAppointmentInput: ReserveAppointmentInput) {
        const { appointmentSlotId, clientId } = reserveAppointmentInput;
        return this.appointmentSlotRepo.save({
            id: appointmentSlotId,
            clientId: clientId,
            reservedTime: new Date().getTime() / 1000
        })
    }

    async confirmReservation(confirmReservation: ConfirmReservationInput) {
        const now = new Date().getTime() / 1000;
        const { appointmentSlotId } = confirmReservation;
        
        const existing = await this.appointmentSlotRepo.findOne({ where: { id: appointmentSlotId } } )
          
        if(!existing.reservedTime) {
            throw `Cannot confirm appointment: ${appointmentSlotId} as it has not been reserved.`
        }

        if(existing.clientId != confirmReservation.clientId) {
            throw `Cannot confirm appointment: ${appointmentSlotId} as this is reserved by another client`
        }

        if(existing.confirmedTime) {
            throw `Cannot confirm appointment: ${appointmentSlotId} as it has already been confirmed.` 
        }

        if(now - existing.reservedTime > reservationExpiry) {
            throw `Cannot confirm appointment: ${appointmentSlotId} the reservation is expired`
        }

        return this.appointmentSlotRepo.save({
            id: appointmentSlotId,
            confirmedTime: new Date().getTime() / 1000
        })
    }

}