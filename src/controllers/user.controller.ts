import { userService } from '@/services/user.service';
import { asyncHandler } from '@/middleware/errorHandler';
import { sendCreated, sendSuccess } from '@/middleware/responseHandler';

// GET /api/v1/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAll();
  sendSuccess(res, users);
});

// GET /api/v1/users/:id
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  sendSuccess(res, user);
});

// POST /api/v1/users
const createUser = asyncHandler(async (req, res) => {
  const user = await userService.create(req.body);
  sendCreated(res, user);
});

// PUT /api/v1/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userService.update(id, req.body);
  sendSuccess(res, user);
});

// DELETE /api/v1/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ok = await userService.remove(id);
  sendSuccess(res, { deleted: ok }, 'User deleted');
});

export const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default userController;
