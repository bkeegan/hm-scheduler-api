import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path';
import { AppointmentSlotModule } from './modules/appointment-slot/appointment-slot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderModule } from './modules/provider/provider.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({ 
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver
    }),
    TypeOrmModule.forRoot({ 
      type: 'sqlite',
      database: ':memory:',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    AppointmentSlotModule,
    ProviderModule,
    ClientModule]
})
export class AppModule {}
