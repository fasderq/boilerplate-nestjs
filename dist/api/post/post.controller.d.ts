import { PostService } from './post.service';
import { Post } from '@app/entities';
export declare class PostController {
    protected readonly service: PostService;
    constructor(service: PostService);
    list(): Promise<Post[]>;
}
//# sourceMappingURL=post.controller.d.ts.map