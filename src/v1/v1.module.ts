import { Module } from '@nestjs/common';
import { AssetsModule } from './manage/assets/assets.module';
import { SummariesModule } from './manage/summaries/summaries.module';

@Module({
    imports: [
        AssetsModule, SummariesModule
    ],
})
export class V1Module { }
