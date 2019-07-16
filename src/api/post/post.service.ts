import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@app/entities';

// {
//     id: 1,
//     title: 'New Post',
//     body: 'some text 1'
// },
// {
//     id: 2,
//     title: 'Ugly Post',
//     body: 'some text 2'
// },
// {
//     id: 4,
//     title: 'Old Post',
// },

@Injectable()
export class PostService {

    protected readonly repository: Repository<Post>;

    constructor(
        @InjectRepository(Post) repository: Repository<Post>,
    ) {
        this.repository = repository;
    }

    public async list(): Promise<Post[]> {
        return await this.repository.find();
    }
}
