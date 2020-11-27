import { Resolver, Query } from '@nestjs/graphql'
import { getMongoRepository } from 'typeorm'
import { CategoryEntity } from '@models'
import { JSON } from '../generator/graphql.schema'

@Resolver('Category')
export class CategoryResolver {
  @Query()
  async categories(): Promise<CategoryEntity[]> {
    const categories = await getMongoRepository(CategoryEntity).find()
    return categories
  }

  @Query()
  async groupedCategories(): Promise<JSON> {
		const categories = await getMongoRepository(CategoryEntity).find()
		const group = categories.reduce((r, a) => {
			r[a.type] = [...r[a.type] || [], a]
			return r
		 }, {})
		 return group
	}
}
