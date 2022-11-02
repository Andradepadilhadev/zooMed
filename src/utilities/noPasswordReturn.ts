import { Users } from "../entities/users.entity";

export function noPasswordReturn(user: Partial<Users>) {
    const { password, ...rest } = user;
    return rest;
  }