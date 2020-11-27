import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'

@Entity({ name: 'accounts' })
export class AccountEntity {
	@Expose()
	@ObjectIdColumn()
	_id: string

	@Expose()
	@Column()
	username: string

	@Expose()
	@Column()
	password: string

	@Expose()
	@Column()
	createdAt: number

	@Expose()
	@Column()
	updatedAt: number

	constructor(account: Partial<AccountEntity>) {
		if (account) {
			Object.assign(
				this,
				plainToClass(AccountEntity, account, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
			this.createdAt = this.createdAt || +new Date()
			this.updatedAt = +new Date()
		}
	}
}
