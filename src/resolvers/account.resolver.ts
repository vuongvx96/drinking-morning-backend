import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql'
import { getMongoRepository } from 'typeorm'

import {
	AccountEntity
} from '@models'

@Resolver('Account')
export class AccountResolver {
	@Query()
	async accounts(): Promise<AccountEntity[]> {
		const accounts = await getMongoRepository(AccountEntity).find({
			where: { username: { $ne: 'superadmin' } }
		})
		return accounts
	}
}
