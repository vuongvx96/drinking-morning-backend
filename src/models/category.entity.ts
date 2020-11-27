import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'
import { CategoryType } from '../generator/graphql.schema'

@Entity({ name: 'categories' })
export class CategoryEntity {
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column({
    type: 'enum',
    enum: CategoryType
  })
  type: CategoryType

  constructor(category: Partial<CategoryEntity>) {
		if (category) {
			Object.assign(
				this,
				plainToClass(CategoryEntity, category, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
		}
	}
}