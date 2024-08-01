import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AppointmentSlot } from "../appointment-slot/appointment-slot.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('client') //if using a production setup - naming conventions can be handled with typeorm config options. 
@ObjectType()
export class Client { 

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    firstName: string;
    
    @Column()
    @Field()
    lastName: string

    @OneToMany(type => AppointmentSlot, appointmentSlot => appointmentSlot.id)
    appointmentSlots?: AppointmentSlot[];

}