import { Injectable } from '@nestjs/common';
import { IdentityProvider, User } from 'generated/prisma';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * 根据用户 ID 查找用户
   */
  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * 根据唯一键查找用户
   * @param uniqueKey 用户名、邮箱或手机号
   * @returns
   */
  async findUserByAnyUniqueKey(uniqueKey: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { email: uniqueKey },
          { phone: uniqueKey },
          { username: uniqueKey },
        ],
      },
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
    provider: IdentityProvider;
    userId?: string;
    providerUid?: string;
  }) {
    if (!userId && !providerUid) {
      return null;
    }
    if (userId) {
      return this.prisma.identity.findUnique({
        where: {
          userId_provider: {
            userId,
            provider,
          },
        },
      });
    }
    if (providerUid) {
      return this.prisma.identity.findUnique({
        where: {
          provider_providerUid: {
            provider,
            providerUid,
          },
        },
      });
    }
  }

  /**
   * 根据 [userId, provider] 或 [provider, providerUid] 查找 User
   */
  async findUserByIdentity(props: {
    provider: IdentityProvider;
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
    provider: IdentityProvider;
    userId: string;
  }) {
    return this.prisma.identity.create({
      data: {
        provider,
        userId,
      },
    });
  }

  async createUser(userInfo: Omit<User, 'id' | 'createdAt'>) {
    return this.prisma.user.create({ data: userInfo });
  }
}
