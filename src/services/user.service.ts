import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/utils/storage';
import { User } from '@/types';
import { NotFoundError, ConflictError, BadRequestError } from '@/utils/errors';

const getAll = async (): Promise<User[]> => {
  return (await storage.users.read()) as User[];
};

const getById = async (id: string): Promise<User> => {
  const user = await storage.users.findById(id);
  if (!user) {
    throw new NotFoundError('User');
  }
  return user as User;
};

const findByEmail = async (email: string): Promise<User | undefined> => {
  const matches = await storage.users.findMany((u) => (u as User).email === email);
  return matches[0] as User | undefined;
};

const create = async (payload: Partial<User>): Promise<User> => {
  if (!payload.email) {
    throw new BadRequestError('Email is required');
  }

  const existing = await findByEmail(payload.email as string);
  if (existing) {
    throw new ConflictError('User with this email already exists');
  }

  const id = uuidv4();
  const now = new Date().toISOString();

  const user: User = {
    id,
    username: payload.username || (payload.email as string).split('@')[0],
    email: payload.email as string,
    createdAt: now,
  };

  await storage.users.create(user);
  return user;
};

const update = async (id: string, updates: Partial<User>): Promise<User> => {
  const updated = await storage.users.update(id, {
    ...updates,
    updatedAt: new Date().toISOString(),
  } as Partial<User>);
  if (!updated) {
    throw new NotFoundError('User');
  }
  return await getById(id);
};

const remove = async (id: string): Promise<boolean> => {
  const ok = await storage.users.delete(id);
  if (!ok) {
    throw new NotFoundError('User');
  }
  return ok;
};

export const userService = {
  getAll,
  getById,
  findByEmail,
  create,
  update,
  remove,
};

export default userService;
