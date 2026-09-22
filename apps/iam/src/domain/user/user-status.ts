export type UserStatus = 'pending' | 'active' | 'suspended' | 'deleted';

const allowed: Record<UserStatus, readonly UserStatus[]> = {
  pending: ['active', 'suspended', 'deleted'],
  active: ['suspended', 'deleted'],
  suspended: ['active', 'deleted'],
  deleted: [],
};

export const UserStatus = {
  canTransition: (from: UserStatus, to: UserStatus) => allowed[from].includes(to),
};
