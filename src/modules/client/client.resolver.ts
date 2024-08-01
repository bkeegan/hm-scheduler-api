import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { CreateClientInput } from './client.dto';

@Resolver()
export class ClientResolver {
    constructor(private clientService: ClientService) {}

    @Query(() => [Client])
    async findAllClients(): Promise<Client[]> {
        return await this.clientService.findAll();
    }

    @Mutation(() => Client) 
    async createClient(@Args('input') input: CreateClientInput) {
        return await this.clientService.create(input);
    }
}
