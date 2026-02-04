import { Injectable } from "@nestjs/common";
import { ObjectLiteral, Repository } from "typeorm";
import { PaginationQueryDto } from "../dto/pagination-query.dto";

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginateQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    let results = await repository.find({
      skip: (paginateQuery.page - 1) * paginateQuery.limit,
      take: paginateQuery.limit,
    });
    return results;
  }
}
