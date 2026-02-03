import { CreatePostDto } from "../dtos/create-post.dto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Post } from "../post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class PostsService {
  constructor(
    /*
     * Injecting Users Service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Method to create a new post
   */
  public async create(createPostDto: CreatePostDto) {
    // Create the post
    // !old
    // let post = this.postsRepository.create({
    //   ...createPostDto,
    // });

    let post = this.postsRepository.create({
      ...createPostDto,
      metaOptions: createPostDto.metaOptions
        ? this.metaOptionsRepository.create(createPostDto.metaOptions)
        : undefined,
    });

    return await this.postsRepository.save(post);
  }

  /**
   * Method to find all posts
   */
  public async findAll(userId: string) {
    // find all posts
    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return posts;
  }

  /**
   * Method to delete a post from the database
   */
  public async delete(id: number) {
    // Find the post from the database
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
