import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
