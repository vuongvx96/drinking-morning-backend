import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'
import { IDateTracking, PresentmentPrice } from './interfaces'
import { ByUser, InventoryPolicy, WeightUnit } from '../generator/graphql.schema'

@Entity({ name: 'productVariants' })
export class ProductVariantEntity implements IDateTracking {
  @Expose()
  @ObjectIdColumn()
  _id: string

  @Expose()
  @Column()
  productId: string

  @Expose()
  @Column()
  title: string

  @Expose()
  @Column()
  position: number

  @Expose()
  @Column()
  sku: string

  @Expose()
  @Column()
  price: number

  @Expose()
  @Column()
  compareAtPrice: string

  @Expose()
  @Column()
  fullfillmentService: string

  @Expose()
  @Column()
  inventoryManagement: string

  @Expose()
  @Column()
  inventoryPolicy: InventoryPolicy

  @Expose()
  @Column()
  inventoryQuantity: number

  @Expose()
  @Column()
  presentmentPrices: PresentmentPrice[]

  @Expose()
  @Column()
  option1: string

  @Expose()
  @Column()
  option2: string

  @Expose()
  @Column()
  option3: string

  @Expose()
  @Column()
  barcode: string

  @Expose()
  @Column()
  grams: number

  @Expose()
  @Column()
  imageId: string

  @Expose()
  @Column()
  taxable: boolean

  @Expose()
  @Column()
  weight: number

  @Expose()
  @Column({
    type: 'enum',
    enum: WeightUnit
  })
  weightUnit: WeightUnit

  @Expose()
  @Column()
  requiresShipping: boolean

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

  constructor(productVariant: Partial<ProductVariantEntity>) {
    if (productVariant) {
      Object.assign(
        this,
        plainToClass(ProductVariantEntity, productVariant, {
          excludeExtraneousValues: true,
        }),
      )
      this._id = this._id || uuid.v1()
    }
  }
}
