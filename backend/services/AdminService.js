const bcrypt = require("../bcrypt");
const { generateToken, generateRecoveryToken } = require("../utils");
const jwt = require("jsonwebtoken");

class AdminService {
  constructor(knex) {
    this.knex = knex;
  }
  
  async getNewUserMailSetting(credentials) {
    if (!(credentials.hasOwnProperty("email"))) {
      throw new Error("email not there");
    }
    let { email } = credentials;
    let user = await this.knex("designer").select("firstName").where({ email });
    if (!user[0]) {
      throw new Error("email incorrect");
    }
    let { firstName } = user[0];
    let token = generateToken({ email });
    let url = `${process.env.BASE_URL}/confirmRegistration/${token}`;
    let setting = {
      template: "newUser",
      message: { to: email },
      locals: { firstName, email, url },
    };
    return setting;
  }

  async getAdminList(selfID) {  // exclude self ID
    let user = await this.knex("admin").where('id', '>', 1).andWhere('id', '<>', selfID);
    for (let i = 0; i < user.length; i++) {
      delete user[i].password;
    }
    return user; // Array of admin objects
  }

  async update(values) {
    if (
      !(
        values.hasOwnProperty("id") &&
        values.hasOwnProperty("firstName") &&
        values.hasOwnProperty("lastName") &&
        values.hasOwnProperty("email") &&
        values.hasOwnProperty("currentPassword") &&
        values.hasOwnProperty("companyType") &&
        values.hasOwnProperty("jobTitle") &&
        values.hasOwnProperty("companyLocation") &&
        values.hasOwnProperty("companyWebsite")
      )
    ) {
      throw new Error("attribute missing");
    }
    try {
      const { id, currentPassword, created_at, updated_at, ...userInfo } = values;
      let fetchResult = await this.knex("designer").select("email","password").where({ id });
      if (!fetchResult[0]) {
        throw new Error("id incorrect");
      };
      let isMatch = await bcrypt.checkPassword(currentPassword, fetchResult[0].password);
      if (!isMatch) {
        throw new EvalError("password incorrect");
      };
      let attributes = { ...userInfo };
      const currentEmail = fetchResult[0].email;
      const newEmail = attributes.email;
      if ((currentEmail.startsWith(newEmail) && currentEmail.endsWith(newEmail)) === false) {
        attributes.isEmailVerified = false;
      };
      if (Boolean(values.password) === true) {
        attributes.password = await bcrypt.hashPassword(values.password);
      } else {
        delete attributes.password;
      };
      let user = await this.knex("designer").where({ id }).update(attributes, ["id"]);
      if (!user[0]) {
        throw new Error("database failure");
      };
      let updatedAttributes = await this.knex("designer").select().where({ id });
      if (!updatedAttributes[0]) {
        throw new Error("database failure");
      };
      let payload = { ...updatedAttributes[0] };
      delete payload.password;
      payload.role = 1;
      let newToken = generateToken(payload);
      return {
        token: newToken,
        ...payload,
      };
    } catch (err) {
      if (err.toString().includes("email")) {
        throw new TypeError("email already occupied");
      }
      if (err.toString().includes("password")) {
        throw new EvalError("password incorrect");
      }
      throw new Error(err.message);
    };
  }

  async createAdmin(credentials) {
    if (
      !(
        credentials.hasOwnProperty("firstName") &&
        credentials.hasOwnProperty("lastName") &&
        credentials.hasOwnProperty("email") &&
        credentials.hasOwnProperty("password") &&
        credentials.hasOwnProperty("remarks") &&
        credentials.hasOwnProperty("isSuper")
      )
    ) {
      throw new Error("attribute missing");
    }
    const { firstName, lastName, email, remarks, isSuper } = credentials;
    let password = await bcrypt.hashPassword(credentials.password);
    try {
      let admin = await this.knex("admin").insert({
        firstName,
        lastName,
        email,
        password,
        remarks,
        isSuper,
        isDisabled: false,
      }, ['id']);
      return admin[0]; // { id: 2 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateAdminByID(credentials) {
    if (!(
      credentials.hasOwnProperty("id")
    )) {
      throw new Error("attribute missing");
    }
    const { id, currentPassword, firstName, lastName } = credentials;
    let fetchResult = await this.knex("admin").select("password").where({ id });
    if (!fetchResult[0]) {
      throw new Error("id incorrect");
    };
    let isMatch = await bcrypt.checkPassword(currentPassword, fetchResult[0].password);
    if (!isMatch) {
      throw new EvalError("password incorrect");
    };
    const password = credentials.password ? await bcrypt.hashPassword(credentials.password) : '';
    const adminInfo = { firstName, lastName, password };
    if (Boolean(firstName) === false) delete adminInfo.firstName;
    if (Boolean(lastName) === false) delete adminInfo.lastName;
    if (Boolean(password) === false) delete adminInfo.password;
    try {
      let admin = await this.knex("admin").where({ id }).update(adminInfo, ['id']);
      if (!admin[0]) {
        throw new Error("database failure");
      };
      let updatedAttributes = await this.knex("admin").select().where({ id });
      if (!updatedAttributes[0]) {
        throw new Error("database failure");
      };
      let payload = { ...updatedAttributes[0] };
      delete payload.password;
      payload.role = 0;
      let newToken = generateToken(payload);
      return {
        token: newToken,
        ...payload,
      };
    } catch (err) {
      if (err.toString().includes("password")) {
        throw new EvalError("password incorrect");
      }
      throw new Error(err.message);
    }
  }

  async manageAdminByID(credentials) {
    if (!(
      credentials.hasOwnProperty("id")
    )) {
      throw new Error("attribute missing");
    }
    const { id, firstName, lastName, remarks, isSuper, isDisabled } = credentials;
    const adminInfo = { firstName, lastName, remarks, isSuper, isDisabled };
    if (Boolean(firstName) === false) delete adminInfo.firstName;
    if (Boolean(lastName) === false) delete adminInfo.lastName;
    if (Boolean(isSuper) === false) adminInfo.isSuper = false;
    if (Boolean(isDisabled) === false) adminInfo.isDisabled = false;
    try {
      let admin = await this.knex("admin").where({ id }).update(adminInfo, ['id']);
      return admin[0]; // { id: 2 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getNewRecoveryMailSetting(credentials) {
    if (!(credentials.hasOwnProperty("email"))) {
      throw new Error("attribute missing");
    }
    const { email } = credentials;
    let designer = await this.knex("designer").select("id", "email", "firstName").where({ email });
    let admin = await this.knex("admin").select("id", "email", "firstName").where({ email });
    if (!(designer[0] || admin[0])) {
      throw new EvalError("not a member");
    }
    if (admin[0] && admin[0].id === 1) {
      throw new EvalError("first admin");
    }
    const { firstName, ...attributes } = admin[0] ? admin[0] : designer[0];
    attributes.resetPassword = true;
    attributes.role = admin[0] ? 0 : 1;
    let token = generateRecoveryToken(attributes);
    let url = `${process.env.BASE_URL}/confirmRecovery/${token}`;
    let setting = {
      template: "newRecovery",
      message: { to: email },
      locals: { firstName, email, url },
    };
    return setting;
  }

  async confirmRecovery(credentials) {
    if (!(
      credentials.hasOwnProperty("id") &&
      credentials.hasOwnProperty("email") &&
      credentials.hasOwnProperty("role") &&
      credentials.hasOwnProperty("password")
    )) {
      throw new Error("attribute missing");
    }
    const { id, email, role } = credentials;
    const password = await bcrypt.hashPassword(credentials.password);
    try {
      let payload;
      switch (role) {
        case 0:
          const admin = await this.knex("admin").select().where({ email });
          if (Boolean(admin[0]) === false) throw new Error("data unmatch");
          if (admin[0].id !== id) throw new Error("data unmatch");
          await this.knex("admin").where({ id }).update({ password });
          payload = { ...admin[0] };
          break;
        case 1:
          const designer = await this.knex("designer").select().where({ email });
          if (Boolean(designer[0]) === false) throw new Error("data unmatch");
          if (designer[0].id !== id) throw new Error("data unmatch");
          await this.knex("designer").where({ id }).update({ password });
          payload = { ...designer[0] };
          break;
        default:
          throw new Error("data unmatch");
      }
      delete payload.password;
      payload.role = role;
      let newToken = generateToken(payload);
      return {
        token: newToken,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateFederatedDesignerByID(values) {
    if (
      !(
        values.hasOwnProperty("id") &&
        values.hasOwnProperty("firstName") &&
        values.hasOwnProperty("lastName") &&
        values.hasOwnProperty("email") &&
        values.hasOwnProperty("companyType") &&
        values.hasOwnProperty("jobTitle") &&
        values.hasOwnProperty("companyLocation") &&
        values.hasOwnProperty("companyWebsite")
      )
    ) {
      throw new Error("attribute missing");
    }
    try {
      const {
        id, firstName, lastName, email, telephone,
        companyType, jobTitle, companyLocation, companyWebsite,
      } = values;
      const attributes = {
        firstName, lastName, email, telephone,
        companyType, jobTitle, companyLocation, companyWebsite,
        isInfoSupplemented: true,
      };
      let user = await this.knex("federated_designer").where({ id }).update(attributes, ["id"]);
      if (!user[0]) {
        throw new Error("database failure");
      };
      let updatedAttributes = await this.knex("federated_designer").select().where({ id });
      if (!updatedAttributes[0]) {
        throw new Error("database failure");
      };
      let payload = { ...updatedAttributes[0] };
      delete payload.password;
      payload.role = 2;
      let newToken = generateToken(payload);
      return {
        token: newToken,
        ...payload,
      };
    } catch (err) {
      throw new Error(err.message);
    };
  }
}

module.exports = AdminService;
