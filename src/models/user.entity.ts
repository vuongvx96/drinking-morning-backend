import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { Expose, plainToClass } from 'class-transformer'
import * as uuid from 'uuid'

@Entity({ name: 'users' })
export class UserEntity {
	@Expose()
	@ObjectIdColumn()
	_id: string

	@Expose()
	@Column()
	idAccount: string

	@Expose()
	@Column()
	fullName: string

	@Expose()
	@Column()
	isActive: boolean

	@Expose()
	@Column()
	createdAt: number

	@Expose()
	@Column()
	updatedAt: number

	constructor(user: Partial<UserEntity>) {
		if (user) {
			Object.assign(
				this,
				plainToClass(UserEntity, user, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuid.v1()
			this.isActive = this.isActive !== undefined ? this.isActive : true
			this.createdAt = this.createdAt || +new Date()
			this.updatedAt = +new Date()
		}
	}
}
