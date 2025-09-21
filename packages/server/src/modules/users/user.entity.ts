import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Identity } from '../auth/identity.entity';
import { OAuthToken } from '../oauth-tokens/oauth-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  // 关联关系
  @OneToMany(() => Identity, identity => identity.user)
  identities: Identity[];

  @OneToMany(() => OAuthToken, oauthToken => oauthToken.user)
  oauthTokens: OAuthToken[];
}