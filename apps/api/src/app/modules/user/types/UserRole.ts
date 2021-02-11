import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  user = 'user',
  mod = 'mod',
  admin = 'admin',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
