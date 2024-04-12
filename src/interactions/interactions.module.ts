import { Module } from '@nestjs/common';
import { InteractionsController } from './interactions.controller';
import { CommandsModule } from 'src/commands/command.module';

@Module({
  imports: [CommandsModule],
  controllers: [InteractionsController]
})
export class InteractionsModule {}
