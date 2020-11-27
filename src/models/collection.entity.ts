import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'
import { CollectionSortOrder } from './enums'
import { ByUser, PublishedScope } from '../generator/graphql.schema'
import { IDateTracking, IPublishTracking } from './interfaces'

@Entity({ name: 'collections' })
export class CollectionEntity implements IDateTracking, IPublishTracking {
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  handle: string

  @Expose()
  @Column()
  bodyHtml: string

  @Expose()
  @Column()
  title: string

  @Expose()
  @Column({
    type: 'enum',
    enum: CollectionSortOrder
  })
  sortOrder: CollectionSortOrder

  @Expose()
  @Column({
    type: 'enum',
    enum: PublishedScope
  })
  publishedScope: PublishedScope

  @Expose()
  @Column()
  templateSuffix: string

  @Expose()
  @Column()
  imageId: string

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

  constructor(collection: Partial<CollectionEntity>) {
		if (collection) {
			Object.assign(
				this,
				plainToClass(CollectionEntity, collection, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
		}
	}
}