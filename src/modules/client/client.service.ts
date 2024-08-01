import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { CreateClientInput } from './client.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) private clientRepo: Repository<Client> 
    ) {}

    create(createAppointmentSlotInput: CreateClientInput) {
        return this.clientRepo.save(createAppointmentSlotInput)
    }

    findAll(): Promise<Client[]> {
        return this.clientRepo.find();
    }
}
