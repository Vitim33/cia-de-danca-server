const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.model");

const SECRET_KEY = process.env.JWT_SECRET || "minha_chave_secreta";

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

class UserService {
  async register(name, email, password, role) {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return { success: false, message: "E-mail ja cadastrado" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ name, email, password: hashedPassword, role });
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

  createToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
  }
}

module.exports = new UserService();
