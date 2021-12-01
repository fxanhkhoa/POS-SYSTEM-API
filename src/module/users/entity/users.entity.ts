import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
	@PrimaryColumn()
	email: string;

	@PrimaryColumn()
	uid: string;

	@Column({ type: 'timestamptz' })
	createdAt: Date;

	@Column({ type: 'timestamptz' })
	updatedAt: Date;

	@Column()
	createdBy: string;

	@Column()
	updatedBy: string;

	@Column({
		nullable: true,
		type: 'timestamptz'
	})
	deletedAt: Date;

	@Column({
		nullable: true
	})
	deletedBy: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	phone: string;

	@Column()
	address: string;

	@Column()
	roles: string;

	@Column()
	deleted: boolean;
}
