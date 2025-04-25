import { BaseEntity, Entity } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
  id: number;
  name: string;
  email: string;
}
