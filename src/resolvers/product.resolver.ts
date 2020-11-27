import { Resolver, Query, Args } from '@nestjs/graphql'
import { getMongoRepository } from 'typeorm'
import { ProductEntity, ProductOptionEntity, ProductVariantEntity, ImageEntity } from '@models'
import { ProductPagedResult } from '../generator/graphql.schema'
import { buildFilterQuery } from './commonFunc'

const canDirectSearchFields = new Set([
  'title',
  'vendor',
  'handle',
  'productType',
  'collectionId'
])

@Resolver('Product')
export class ProductResolver {
  @Query()
  async productPagedQuery(
    @Args() { pagingInfo, status },
  ): Promise<ProductPagedResult> {
    const condition: any = {
      status: status || 'active'
    }
    Object.entries(pagingInfo?.filterModel || {}).forEach(([k, v]) => {
      if (canDirectSearchFields.has(k)) {
        condition[k] = buildFilterQuery(v)
      } else if (k === 'tags') {
        condition[k] = { $all: v }
      }
    })

    const rowCount = await getMongoRepository(ProductEntity)
      .createCursor()
      .filter(condition)
      .count(false)

    const pipelines: any[] = [
      {
        $match: condition,
      },
    ]

    pagingInfo.page = pagingInfo.page || 1
    pagingInfo.pageSize = pagingInfo.pageSize || 50
    let currentPage = pagingInfo.page || 1
    const pageCount = Math.ceil(rowCount / pagingInfo.pageSize)
    if (!pageCount) {
      return {
        currentPage: 0,
        pageSize: pagingInfo.pageSize,
        rowCount: 0,
        pageCount: 0,
        items: [],
      }
    }

    if (currentPage > pageCount) currentPage = pageCount
    else if (currentPage < 1) currentPage = 1

    if (pagingInfo?.sortModel?.length) {
      const sortPipeline = {}
      for (const e of pagingInfo.sortModel) {
        sortPipeline[e.colId] = e.sort === 'desc' ? -1 : 1
      }

      if (!Object.keys(sortPipeline).length) sortPipeline['createdAt'] = -1
      pipelines.push({
        $sort: sortPipeline,
      })
    }

    pipelines.push(
      { $skip: (currentPage - 1) * pagingInfo.pageSize },
      { $limit: pagingInfo.pageSize },
    )

    const products: ProductEntity[] = await getMongoRepository(ProductEntity)
      .aggregate(pipelines)
      .toArray()

    const productIds = products.map(item => item._id)
    const [imageHash, variantHash, optionHash] = await Promise.all([
			new Promise(async resolve => {
        const hash = {}
        const images = await getMongoRepository(ImageEntity).find({
          where: {
            productId: { $in: productIds }
          }
        })
        images.sort((a, b) => a.position - b.position)
        images.map(item => {
          if (!hash[item.productId]) {
            hash[item.productId] = [item]
          } else hash[item.productId].push(item)
        })

        resolve(hash)
      }),
      new Promise(async resolve => {
        const hash = {}
        const variants = await getMongoRepository(ProductVariantEntity).find({
          where: {
            productId: { $in: productIds }
          }
        })
        variants.sort((a, b) => a.position - b.position)
        variants.map(item => {
          if (!hash[item.productId]) {
            hash[item.productId] = [item]
          } else hash[item.productId].push(item)
        })

        resolve(hash)
      }),
      new Promise(async resolve => {
        const hash = {}
        const options = await getMongoRepository(ProductOptionEntity).find({
          where: {
            productId: { $in: productIds }
          }
        })
        options.sort((a, b) => a.position - b.position)
        options.map(item => {
          if (!hash[item.productId]) {
            hash[item.productId] = [item]
          } else hash[item.productId].push(item)
        })

        resolve(hash)
      })
    ])

    products.map(item => {
      item['images'] = imageHash[item._id] || []
      item['image'] = item['images'][0]
      item['variants'] = variantHash[item._id] || []
      item['options'] = optionHash[item._id] || []
    })

    return {
      currentPage,
      pageCount,
      pageSize: pagingInfo.pageSize,
      rowCount,
      items: products,
    }
  }
}
