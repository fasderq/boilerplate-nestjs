import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@app/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [
        PostController,
    ],
    providers: [
        PostService,
    ],
    exports: [
        PostService,
    ]
})
export class PostModule { }
