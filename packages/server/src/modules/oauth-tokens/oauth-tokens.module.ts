import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthTokensService } from './oauth-tokens.service';
import { OAuthToken } from './oauth-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OAuthToken])],
  providers: [OAuthTokensService],
  exports: [OAuthTokensService],
})
export class OAuthTokensModule {}
