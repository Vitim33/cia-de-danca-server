const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.model");
const seedUsers = require("../data/seed-users.data");

const SECRET_KEY = process.env.JWT_SECRET || "minha_chave_secreta";

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const hashResetToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

class UserService {
  async register(name, email, password, role = "user") {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return { success: false, message: "E-mail ja cadastrado" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    const token = this.createToken(user);

    return {
      success: true,
      message: "Usuario registrado com sucesso",
      token,
      user: publicUser(user),
    };
  }

  async login(email, password) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return { success: false, message: "Credenciais invalidas" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Credenciais invalidas" };
    }

    const token = this.createToken(user);
    return {
      success: true,
      message: "Login realizado com sucesso",
      token,
      user: publicUser(user),
    };
  }

  async getCurrentUser(userId) {
    const user = await Users.findByPk(userId);
    if (!user) {
      return { success: false, message: "Usuario nao encontrado" };
    }

    return {
      success: true,
      message: "Usuario obtido com sucesso",
      user: publicUser(user),
    };
  }

  async seedDefaultUsers() {
    await Promise.all(
      seedUsers.map(async (seedUser) => {
        const existingUser = await Users.findOne({ where: { email: seedUser.email } });
        if (existingUser) {
          return;
        }

        const hashedPassword = await bcrypt.hash(seedUser.password, 10);
        await Users.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hashedPassword,
          role: seedUser.role,
        });
      })
    );
  }

  async forgotPassword(email, origin) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return {
        success: true,
        message: "Se o e-mail estiver cadastrado, enviaremos as instrucoes para redefinir a senha",
      };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = hashResetToken(resetToken);
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const baseUrl = origin || process.env.APP_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/forgot-password?token=${resetToken}`;

    return {
      success: true,
      message: "Se o e-mail estiver cadastrado, enviaremos as instrucoes para redefinir a senha",
      resetLink,
    };
  }

  async resetPassword(token, password) {
    const tokenHash = hashResetToken(token);
    const user = await Users.findOne({ where: { passwordResetToken: tokenHash } });

    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      return { success: false, message: "Token invalido ou expirado" };
    }

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    return {
      success: true,
      message: "Senha redefinida com sucesso",
    };
  }

  createToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
  }
}

module.exports = new UserService();
