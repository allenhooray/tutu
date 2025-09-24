import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { IdentityProvider } from '../../common/typeorm/enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['userId', 'provider'])
@Unique(['provider', 'providerUid'])
export class Identity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '身份ID' })
  id: string;

  @Column()
  @ApiProperty({ description: '用户ID' })
  userId: string;

  @ManyToOne(() => User, (user) => user.identities)
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ description: '用户' })
  user: User;

  @Column({ type: 'enum', enum: IdentityProvider })
  @ApiProperty({ description: '身份提供方' })
  provider: IdentityProvider;

  @Column({ nullable: true })
  @ApiProperty({ description: '身份提供方用户ID' })
  providerUid?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '凭证' })
  credential?: string;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;
}
