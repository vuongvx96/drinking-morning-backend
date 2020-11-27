import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'
import { IDateTracking, IPublishTracking } from './interfaces'
import { ByUser, PublishedScope, Status } from '../generator/graphql.schema'

@Entity({ name: 'products' })
export class ProductEntity implements IDateTracking, IPublishTracking {
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  title: string

  @Expose()
  @Column()
  bodyHtml: string

  @Expose()
  @Column()
  vendor: string

  @Expose()
  @Column()
  handle: string

  @Expose()
  @Column()
  templateSuffix: string

  @Expose()
  @Column({
    type: 'enum',
    enum: PublishedScope
  })
  publishedScope: PublishedScope

  @Expose()
  @Column()
  tags: string[]

  @Expose()
  @Column()
  status: Status

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

  @Expose()
  @Column()
  publishedAt: Date

  @Expose()
  @Column()
  publishedBy: ByUser

  constructor(product: Partial<ProductEntity>) {
		if (product) {
			Object.assign(
				this,
				plainToClass(ProductEntity, product, {
					excludeExtraneousValues: true
				})
			)
      this._id = this._id || uuid.v1()
      this.createdAt = this.createdAt || new Date()
			this.updatedAt = new Date()
		}
	}
}