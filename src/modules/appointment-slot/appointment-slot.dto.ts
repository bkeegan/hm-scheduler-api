import { Field, Float, InputType, Int } from "@nestjs/graphql";



@InputType()
export class CreateAppointmentSlotInput {
    @Field(() => Int)
    providerId: number;
    
    @Field(() => Float)
    startTime: number;

    @Field(() => Float)
    endTime: number;
}

@InputType()
export class CreateAppointmentSlotsFromSpanInput {
    @Field(() => Int)
    providerId: number;
    
    @Field(() => Float)
    startTime: number;

    @Field(() => Float)
    endTime: number;

    @Field(() => Int, { defaultValue: 0 })
    buffer?: number;  
}

@InputType()
export class GetAvailableAppointmentSlotsInput {
    @Field(() => Float, { defaultValue: new Date().getTime() / 1000 } )
    startTime?: number;

    @Field(() => Float)
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