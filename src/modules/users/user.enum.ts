import { registerEnumType } from '@nestjs/graphql';

enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
}

registerEnumType(UserStatusEnum, { name: 'UserStatus' });
registerEnumType(RoleEnum, { name: 'UserRole' });

export { UserStatusEnum, RoleEnum };
