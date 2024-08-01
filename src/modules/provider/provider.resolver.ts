import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Provider } from './provider.entity';
import { CreateProviderInput } from './provider.dto';
import { ProviderService } from './provider.service';

import { UseGuards } from '@nestjs/common';
import { MockGuard } from '../../guards/mock-guard';
import { MockRoles } from 'src/decorators/mock-roles.decorator';

@UseGuards(MockGuard)
@Resolver(() => Provider)
export class ProviderResolver {
    constructor(private providerService: ProviderService) {}


    @MockRoles(['admin'])
    @Query(() => [Provider])
    async findAllProviders(): Promise<Provider[]> {
        return await this.providerService.findAll();
    }

    @MockRoles(['admin'])
    @Mutation(() => Provider) 
    async createProvider(@Args('input') input: CreateProviderInput) {
        return await this.providerService.create(input);
    }

}
