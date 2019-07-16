import { Repository } from 'typeorm';
import { Post } from '@app/entities';
export declare class PostService {
    protected readonly repository: Repository<Post>;
    constructor(repository: Repository<Post>);
    list(): Promise<Post[]>;
}
//# sourceMappingURL=post.service.d.ts.map