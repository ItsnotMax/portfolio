import { Module } from '@nestjs/common';
import { EssencesController } from './essences/essences.controller';
import { PostingController } from './posting/posting.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [EssencesController, PostingController],
  providers: [],
})
export class AppModule {}
