const bcrypt = require("../bcrypt");
const { generateToken } = require("../utils");

class AuthService {
  constructor(knex) {
    this.knex = knex;
  }

  async isCommonMember(credentials) {
    if (!credentials.hasOwnProperty("email")) {
      throw new Error("email missing");
    }
    let { email } = credentials;
    let user = await this.knex("designer").select().where({ email });
    let answer = { isMember: Boolean(user[0]) };
    if (user[0]) {
      answer.isEmailVerified = user[0].isEmailVerified;
    }
    return answer; // { isMember: true, isEmailVerified: true }
  }
  
  async designerVerify(credentials) {
    if (
      !(
        credentials.hasOwnProperty("email") &&
        credentials.hasOwnProperty("password")
      )
    ) {
      throw new ReferenceError("designer email and password not there");
    }
    let { email, password } = credentials;
    let user = await this.knex("designer").select().where({ email });
    if (!user[0]) {
      throw new RangeError("designer email incorrect");
    }
    let isMatch = await bcrypt.checkPassword(password, user[0].password);
    if (!isMatch) {
      throw new EvalError("designer password incorrect");
    }
    let { isEmailVerified } = user[0];
    if (!isEmailVerified) {
      throw new TypeError("email not verified");
    }
    let payload = { ...user[0] };
    delete payload.password;
    payload.role = 1;
    let newToken = generateToken(payload);
    return {
      token: newToken,
    };
  }

  async federatedDesignerVerify(credentials) {
    if (
      !(
        credentials.hasOwnProperty("provider") &&
        credentials.hasOwnProperty("provider_id")
      )
    ) {
      throw new ReferenceError("provider or provider id not there");
    }
    let { provider, provider_id } = credentials;
    let payload = {};
    try {
      let fetchResult = await this.knex("federated_designer").select().where({ provider, provider_id });
      if (!fetchResult[0]) {
        const postResult = await this.knex("federated_designer").insert(credentials, ['id']);
        const { id } = postResult[0];
        payload = { ...credentials, id };
      } else {
        payload = { ...fetchResult[0] };
      }
    } catch (err) {
      throw new RangeError("database failure");
    };
    delete payload.password;
    payload.role = 2;
    let newToken = generateToken(payload);
    return {
      token: newToken,
    };
  }
  
  async adminVerify(credentials) {
    if (
      !(
        credentials.hasOwnProperty("email") &&
        credentials.hasOwnProperty("password")
      )
    ) {
      throw new ReferenceError("admin email and password not there");
    }
    let { email, password } = credentials;
    let user = await this.knex("admin").select().where({ email });
    if (!user[0]) {
      throw new RangeError("admin email incorrect");
    }
    if (user[0].isDisabled) {
      throw new SyntaxError("admin account disabled");
    }
    let isMatch = await bcrypt.checkPassword(password, user[0].password);
    if (!isMatch) {
      throw new EvalError("admin password incorrect");
    }
    let payload = { ...user[0] };
    delete payload.password;
    payload.role = 0;
    let newToken = generateToken(payload);
    return {
      token: newToken,
    };
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

  async matchFederatedDesigner(credentials) {
    if (
      !(
        credentials.hasOwnProperty("provider") &&
        credentials.hasOwnProperty("provider_id")
      )
    ) {
      throw new Error("attribute missing");
    }
    let { provider, provider_id } = credentials;
    let user = await this.knex("federated_designer").select().where({ provider, provider_id });
    if (!user[0]) {
      throw new Error("provider id not found");
    }
    let payload = { ...user[0] };
    delete payload.password;
    payload.role = 2;
    return payload;
  }

  async matchDesignerByEmail(email) {
    if (!email) {
      throw new Error("Email missing");
    }
    let user = await this.knex("designer").select().where({ email });
    if (!user[0]) {
      throw new Error("Email not found");
    }
    let payload = { ...user[0] };
    delete payload.password;
    payload.role = 1;
    return payload;
  }

  async matchAdminByEmail(email) {
    if (!email) {
      throw new Error("Email missing");
    }
    let user = await this.knex("admin").select().where({ email });
    if (!user[0]) {
      throw new Error("Email not found");
    }
    if (user[0].isDisabled) {
      throw new Error("Account disabled");
    }
    let payload = { ...user[0] };
    delete payload.password;
    payload.role = 0;
    return payload;
  }
}

module.exports = AuthService;
