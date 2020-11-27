import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { getMongoRepository } from 'typeorm'
import {
	ApolloError,
	AuthenticationError,
	ForbiddenError
} from 'apollo-server-core'
import { v1 as uuidv1 } from 'uuid'

import {
	AccountEntity,
	UserEntity
} from '@models'
import { comparePassword, hashPassword } from '@utils'
import {
	LoginUserInput,
	LoginResponse,
	Account
} from '../generator/graphql.schema'
import { tradeToken } from '@auth'

@Resolver('User')
export class UserResolver {
	@Query()
	async hello(): Promise<string> {
		return uuidv1()
	}

	@Query()
	async today(): Promise<Date> {
		return new Date()
	}

	@Mutation()
	async login(@Args('input') input: LoginUserInput): Promise<LoginResponse> {
		const { username, password } = input
		const account = await getMongoRepository(AccountEntity).findOne({
			where: {
				username
			}
		})
		if (account && (await comparePassword(password, account.password))) {
			return tradeToken(account)
		}

		throw new AuthenticationError('Login failed.')
	}
}