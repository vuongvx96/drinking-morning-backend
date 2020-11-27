import { PubSub } from 'graphql-subscriptions'
import { Injectable, Logger } from '@nestjs/common'
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'
import { MemcachedCache } from 'apollo-server-cache-memcached'
import { GraphQLExtension, AuthenticationError } from 'apollo-server-core'
import { MockList } from 'graphql-tools'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'
import * as depthLimit from 'graphql-depth-limit'
import { getMongoRepository } from 'typeorm'
import * as chalk from 'chalk'

import schemaDirectives from './schemaDirectives'
import directiveResolvers from './directiveResolvers'
import { verifyToken } from '@auth'

import {
	NAME,
	NODE_ENV,
	PRIMARY_COLOR,
	END_POINT,
	FE_URL,
	GRAPHQL_DEPTH_LIMIT,
	ACCESS_TOKEN
} from '@environments'
import { AccountEntity } from '../../models'

export const pubsub = new PubSub()

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
	async createGqlOptions(): Promise<GqlModuleOptions> {
		return {
			typePaths: ['./**/*.graphql'],
			resolvers: {
				JSON: GraphQLJSON,
				JSONObject: GraphQLJSONObject
			},
			resolverValidationOptions: {
				requireResolversForResolveType: false
			},
			path: `/${END_POINT!}`,
			cors:
				NODE_ENV === 'production'
					? {
						origin: FE_URL!,
						credentials: true
					}
					: true,
			bodyParserConfig: { limit: '50mb' },
			onHealthCheck: () => {
				return new Promise((resolve, reject): void => {
					// Replace the `true` in this conditional with more specific checks!
					if (true) {
						resolve(1)
					} else {
						reject(0)
					}
				})
			},
			schemaDirectives,
			directiveResolvers,
			validationRules: [
				depthLimit(
					GRAPHQL_DEPTH_LIMIT!,
					{ ignore: [/_trusted$/, 'idontcare'] },
					depths => {
						if (depths[''] === GRAPHQL_DEPTH_LIMIT! - 1) {
							Logger.warn(
								`⚠️  You can only descend ${chalk
									.hex(PRIMARY_COLOR!)
									.bold(`${GRAPHQL_DEPTH_LIMIT!}`)} levels.`,
								'GraphQL',
								false
							)
						}
					}
				)
			],
			introspection: true,
			playground: {
				settings: {
					'editor.cursorShape': 'underline', // possible values: 'line', 'block', 'underline'
					'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
					'editor.fontSize': 14,
					'editor.reuseHeaders': true, // new tab reuses headers from last tab
					'editor.theme': 'dark', // possible values: 'dark', 'light'
					'general.betaUpdates': true,
					'queryPlan.hideQueryPlanResponse': false,
					'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
					'tracing.hideTracingResponse': false
				}
			},
			tracing: NODE_ENV !== 'production',
			cacheControl: NODE_ENV === 'production' && {
				defaultMaxAge: 5,
				stripFormattedExtensions: false,
				calculateHttpHeaders: false
			},
			context: async ({ req, res, connection }) => {
				if (connection) {
					const { currentAccount } = connection.context

					return {
						pubsub,
						currentAccount
					}
				} else {

					let currentUser
					let currentAccount

					let profiles

					const token = req.headers[ACCESS_TOKEN!] || ''

					if (token) {
						currentUser = await verifyToken(token)
						if (currentUser) {
							currentAccount = await getMongoRepository(AccountEntity).findOne({ _id: currentUser.idAccount })
							if (currentAccount) {
								currentAccount.fullName = currentUser?.fullName
								delete currentAccount.password
							}
						}
					}

					return {
						req,
						res,
						pubsub,
						currentAccount,
						profiles,
						trackErrors(errors) {
							// Track the errors
							// console.log(errors)
						}
					}
				}
			},
			formatError: ({ message, locations, path, extensions: { code } }) => {
				return {
					message,
					locations,
					path,
					code
				}
			},
			formatResponse: response => {
				return response
			},
			subscriptions: {
				path: `/${END_POINT!}`,
				keepAlive: 1000,
				onConnect: async (connectionParams, webSocket, context) => {
					NODE_ENV !== 'production' &&
						Logger.debug(`🔗  Connected to websocket`, 'GraphQL')
					let currentUser
					const token = connectionParams[ACCESS_TOKEN!]
					if (token) {
						currentUser = await verifyToken(token)
						const currentAccount = await getMongoRepository(AccountEntity).findOne({ _id: currentUser.idAccount })
						if (currentAccount) {
							currentAccount['fullName'] = currentUser?.fullName
							delete currentAccount.password
						}
						return { currentUser, currentAccount }
					}
					throw new AuthenticationError(
						'Authentication token is invalid, please try again.'
					)
				},
				onDisconnect: async (webSocket, context) => {
					NODE_ENV !== 'production' &&
						Logger.error(`❌  Disconnected to websocket`, '', 'GraphQL', false)
				}
			},
			persistedQueries: {
				cache: new MemcachedCache(
					['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
					{ retries: 10, retry: 10000 } // Options
				)
			},
			installSubscriptionHandlers: true
		}
	}
}