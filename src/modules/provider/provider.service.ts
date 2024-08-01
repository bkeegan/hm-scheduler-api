import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderInput } from './provider.dto';

@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(Provider) private providerRepo: Repository<Provider> 
    ) {}

    create(createAppointmentSlotInput: CreateProviderInput) {
        return this.providerRepo.save(createAppointmentSlotInput)
    }

    findAll(): Promise<Provider[]> {
        return this.providerRepo.find();
    }
}
