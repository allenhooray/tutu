import { Injectable } from '@nestjs/common';
import {
  OAuthProvider,
  VerificationCodeProvider,
  IdentityProvider,
  User,
} from 'generated/prisma';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findUserByAnyUniqueKey(loginKey: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: loginKey }, { phone: loginKey }, { username: loginKey }],
      },
    });
  }

  async findIdentity({
    provider,
    userId,
  }: {
    provider: IdentityProvider;
    userId: string;
  }) {
    return this.prisma.identity.findUnique({
      where: {
        userId_provider: {
          userId,
          provider,
        },
      },
    });
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
