import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateAppointmentSlotInput {
    @Field(() => Int)
    providerId: number;
    
    @Field(() => Int)
    startTime: number;

    @Field(() => Int)
    endTime: number;
}

@InputType()
export class CreateAppointmentSlotsFromSpanInput {
    @Field(() => Int)
    providerId: number;
    
    @Field(() => Int)
    startTime: number;

    @Field(() => Int)
    endTime: number;

    @Field(() => Int, { defaultValue: 0 })
    buffer?: number;  
}

@InputType()
export class GetAvailableAppointmentSlotsInput {
    @Field(() => Int)
    endTime: number;
}

@InputType()
export class ReserveAppointmentInput {
    @Field(() => Int)
    appointmentSlotId: number; 

    @Field(() => Int)
    clientId: number; 
}

@InputType()
export class ConfirmReservationInput {
    @Field(() => Int)
    clientId: number;

    @Field(() => Int)
    appointmentSlotId: number; 
}