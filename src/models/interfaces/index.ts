import { ByUser } from '../../generator/graphql.schema'

export interface IDateTracking {
  createdAt: Date
  createdBy: ByUser
  updatedAt: Date
  updatedBy: ByUser
}

export interface IPublishTracking {
  publishedAt: Date
  publishedBy: ByUser
}

interface Price {
  currencyCode: string
  amount: string
}

export interface PresentmentPrice {
  price: Price
  compareAtPrice: Price
}
