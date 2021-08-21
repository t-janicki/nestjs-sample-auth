import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  getCommentsByPostId(postId: string) {
    return this.createQueryBuilder('comment')
      .innerJoinAndSelect('comment.post', 'post')
      .where('post.id = :postId', {
        postId: postId,
      })
      .getMany();
  }
}
