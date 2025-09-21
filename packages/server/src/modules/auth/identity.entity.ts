import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { IdentityProvider } from '../../common/typeorm/enums';

@Entity()
@Unique(['userId', 'provider'])
@Unique(['provider', 'providerUid'])
export class Identity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.identities)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: IdentityProvider })
  provider: IdentityProvider;

  @Column({ nullable: true })
  providerUid?: string;

  @Column({ nullable: true })
  credential?: string;

  @CreateDateColumn()
  createdAt: Date;
}