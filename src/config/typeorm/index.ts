import { Injectable, Logger } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { getMetadataArgsStorage } from 'typeorm'
import { MONGO_NAME } from '@environments'
import config from '../../config.orm'
// import { logger } from '../../common'
@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		const options = {
			...config,
			type: 'mongodb',
			database: MONGO_NAME,
			entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
			// migrations: ['src/modules/**/migration/*.ts'],
			// subscribers: ['src/modules/**/subscriber/*.ts'],
			// cli: {
			// 	entitiesDir: 'src/modules/**/entity',
			// 	migrationsDir: 'src/modules/**/migration',
			// 	subscribersDir: 'src/modules/**/subscriber'
			// },
			ssl: true,
			synchronize: true,
			autoLoadEntities: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			keepConnectionAlive: true,
			logging: true
		}
		return options
	}
}
