import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderResolver } from './provider.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/modules/client/client.module';
import { Provider } from './provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  providers: [ProviderService, ProviderResolver]
})
export class ProviderModule {}
