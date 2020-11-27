import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'

@Entity({ name: 'productOptions' })
export class ProductOptionEntity {
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  productId: string

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column()
  position: number

  @Expose()
  @Column()
  values: string[]

  constructor(productOption: Partial<ProductOptionEntity>) {
		if (productOption) {
			Object.assign(
				this,
				plainToClass(ProductOptionEntity, productOption, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
		}
	}
}