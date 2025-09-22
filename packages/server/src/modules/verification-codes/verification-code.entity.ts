import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { VerificationCodeProvider } from '../../common/typeorm/enums';

@Entity()
@Unique(['provider', 'target', 'code'])
export class VerificationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: VerificationCodeProvider })
  provider: VerificationCodeProvider;

  @Column()
  target: string;

  @Column()
  code: string;

  @Column()
  expiresAt: Date;
}
