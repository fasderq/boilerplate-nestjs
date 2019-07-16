import {
    Controller,
    Get,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from '@app/entities';

@Controller('post')
export class PostController {

    protected readonly service: PostService;

    constructor(service: PostService) {
        this.service = service;
    }

    @Get()
    public async list(): Promise<Post[]> {
        return await this.service.list()
    }
}