const userService = require("../services/user.service");

const invalidTokens = [];

class UserController {
  async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const result = await userService.register(name, email, password, role);
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      res.status(result.success ? 200 : 401).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const result = await userService.getCurrentUser(req.user.id);
      if (result.success) {
        result.token = req.token;
      }
      res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const origin = `${req.protocol}://${req.get("host")}`;
      const result = await userService.forgotPassword(email, origin);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;
      const result = await userService.resetPassword(token, password);
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    if (!req.token) {
      return res.status(400).json({ success: false, message: "Token nao encontrado" });
    }

    invalidTokens.push(req.token);
    return res.json({ success: true, message: "Logout realizado com sucesso" });
  }
}

const userController = new UserController();
module.exports = {
  userController,
  invalidTokens,
};
