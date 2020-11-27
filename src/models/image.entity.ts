import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'
import { ProductEntity } from './product.entity'
import { IDateTracking } from './interfaces'
import { ByUser } from '../generator/graphql.schema'

@Entity({ name: 'images' })
export class ImageEntity implements IDateTracking {
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  productId: string

  @Expose()
  @Column()
  position: number

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column()
  alt: string

  @Expose()
  @Column()
  width: number

  @Expose()
  @Column()
  height: number

  @Expose()
  @Column()
  src: string

  @Expose()
  @Column()
  createdAt: Date

  @Expose()
  @Column()
  createdBy: ByUser

  @Expose()
  @Column()
  updatedAt: Date

  @Expose()
  @Column()
  updatedBy: ByUser

  constructor(product: Partial<ProductEntity>) {
		if (product) {
			Object.assign(
				this,
				plainToClass(ProductEntity, product, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
		}
	}
}