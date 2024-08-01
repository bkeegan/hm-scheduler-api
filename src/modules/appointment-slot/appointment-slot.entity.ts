import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Client } from "../client/client.entity";
import { Provider } from "../provider/provider.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointment_slot') //if using a production setup - naming conventions can be handled with typeorm config options. 
@ObjectType()
export class AppointmentSlot { 

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ManyToOne(type => Provider, provider => provider.appointmentSlots)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider

    @Column({ name: 'provider_id' })
    @Field(() => Int)
    providerId: number

    @ManyToOne(type => Client, client => client.appointmentSlots, { nullable: true })
    @JoinColumn({ name: 'client_id' })
    client?: Client

    @Column({ name: 'client_id', nullable: true })
    @Field(() => Int, { nullable: true })
    clientId?: number
    
    @Column({ name: 'start_time', type: 'integer'})
    @Field()
    startTime: number
    
    @Column({ name: 'end_time', type: 'integer'})
    @Field()
    endTime: number

    @Column({ name: 'reserved_time', type: 'integer', nullable: true })
    @Field({ nullable: true })
    reservedTime?: number;

    @Column({ name: 'confirmed_time', type: 'integer', nullable: true })
    @Field({ nullable: true })
    confirmedTime?: number;

}