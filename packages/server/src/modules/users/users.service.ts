import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Identity } from '../auth/identity.entity';
import { IdentityProvider as AuthIdentityProvider } from '../../common/typeorm/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Identity)
    private identityRepository: Repository<Identity>,
  ) {}

  /**
   * 根据用户 ID 查找用户
   */
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * 根据唯一键查找用户
   * @param uniqueKey 用户名、邮箱或手机号
   * @returns
   */
  async findUserByAnyUniqueKey(uniqueKey: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: [
        { email: uniqueKey },
        { phone: uniqueKey },
        { username: uniqueKey },
      ],
    });
  }

  /**
   * 根据 [userId, provider] 或 [provider, providerUid] 查找用户的 Identity
   */
  async findIdentity({
    provider,
    userId,
    providerUid,
  }: {
    provider: AuthIdentityProvider;
    userId?: string;
    providerUid?: string;
  }): Promise<Identity | null> {
    if (!userId && !providerUid) {
      return null;
    }
    if (userId) {
      return this.identityRepository.findOneBy({
        userId,
        provider,
      });
    }
    if (providerUid) {
      return this.identityRepository.findOneBy({
        provider,
        providerUid,
      });
    }
    return null;
  }

  /**
   * 根据 [userId, provider] 或 [provider, providerUid] 查找 User
   */
  async findUserByIdentity(props: {
    provider: AuthIdentityProvider;
    userId?: string;
    providerUid?: string;
  }): Promise<User | null> {
    const identity = await this.findIdentity(props);
    if (identity) {
      return this.findById(identity.userId);
    }
    return null;
  }

  async createIdentity({
    provider,
    userId,
  }: {
    provider: AuthIdentityProvider;
    userId: string;
  }): Promise<Identity> {
    const identity = this.identityRepository.create({
      provider,
      userId,
    });
    return this.identityRepository.save(identity);
  }

  async createUser(userInfo: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user = this.userRepository.create(userInfo);
    return this.userRepository.save(user);
  }
}
