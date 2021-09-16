require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("../bcrypt");
const { generateToken } = require("../utils");

class RegService {
  constructor(knex) {
    this.knex = knex;
  }

  async matchDesignerByEmail(email) {
    if (!email) {
      throw new Error("email missing");
    }
    let user = await this.knex("designer").select().where({ email });
    if (!user[0]) {
      throw new Error("email not found");
    }
    let payload = { ...user[0] };
    delete payload.password;
    return payload;
  }
    
  async matchDesignerByID(id) {
    if (!id) {
      throw new Error("ID missing");
    }
    let user = await this.knex("designer").select().where({ id });
    if (!user[0]) {
      throw new Error("ID not found");
    }
    let payload = { ...user[0] };
    delete payload.password;
    return payload;
  }

  async isMember(credentials) {
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

  async create(values) {
    if (
      !(
        values.hasOwnProperty("firstName") &&
        values.hasOwnProperty("lastName") &&
        values.hasOwnProperty("email") &&
        values.hasOwnProperty("password") &&
        values.hasOwnProperty("companyType") &&
        values.hasOwnProperty("jobTitle") &&
        values.hasOwnProperty("companyLocation") &&
        values.hasOwnProperty("companyWebsite")
      )
    ) {
      throw new Error("attribute missing");
    }
    try {
      let password = await bcrypt.hashPassword(values.password);
      let isEmailVerified = false;
      let attributes = { ...values, password, isEmailVerified };
      let user = await this.knex("designer").insert(attributes, ["id"]);
      if (!user[0]) {
        throw new Error("database failure");
      }
      return user[0]; // { id: 1 }
    } catch (err) {
      throw new Error(err.message);
    };
  }

  async getNewUserMailSetting(credentials) {
    if (
      !(
      credentials.hasOwnProperty("firstName") &&
      credentials.hasOwnProperty("email")
      )
    ) {
      throw new Error("attribute missing");
    }
    let { firstName, email } = credentials;
    let token = generateToken({ email });
    let url = `${process.env.BASE_URL}/confirmRegistration/${token}`;
    let setting = {
      template: "newUser",
      message: { to: email },
      locals: { firstName, email, url },
    };
    return setting;
  }

  async getNewSubscriptionMailSetting(credentials) {
    if (!(credentials.hasOwnProperty("email"))) {
      throw new Error("attribute missing");
    }
    let { email } = credentials;
    let token = generateToken({ email });
    let url = `${process.env.BASE_URL}/confirmSubscription/${token}`;
    let setting = {
      template: "newSubscription",
      message: { to: email },
      locals: { email, url },
    };
    return setting;
  }

  async confirmRegistration(token) {
    if (!token) {
      throw new Error("token missing");
    }
    try {
      let decoded = jwt.verify(token, process.env.JWTSECRET);
      let { email } = decoded;
      if (!email) {
        throw new Error("email missing");
      }
      let user = await this.knex("designer")
        .where({ email })
        .update({ isEmailVerified: true }, ["id"]);
      if (!user[0]) {
        throw new Error("email not exist");
      }
      return user[0]; // { id: 1 }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async confirmSubscription(token) {
    if (!token) {
      throw new Error("token missing");
    }
    let decoded = jwt.verify(token, process.env.JWTSECRET);
    let { email } = decoded;
    if (!email) {
      throw new Error("email missing");
    }
    try {
      let res = await this.knex("subscription").insert({ email }, ["id"]);
      if (!res[0]) {
        throw new Error("no subscription made");
      }
      return res[0]; // { id: 1 }
    } catch (err) {
      let res = await this.knex("subscription").select("id").where({ email });
      if (!res[0]) {
        throw new Error("no subscription made");
      }
      return res[0]; // { id: 1 }
    }
  }

  async subscribe(credentials) {
    if (!credentials.hasOwnProperty("email")) {
      throw new Error("email missing");
    }
    let { email } = credentials;
    try {
      let subscription = await this.knex("subscription").insert({ email }, ["id"]);
      if (!subscription[0]) {
        throw new Error("no subscription made");
      }
      return subscription[0]; // { id: 1 }
    } catch (err) {
      let subscription = await this.knex("subscription").select("id").where({ email });
      if (!subscription[0]) {
        throw new Error("no subscription made");
      }
      return subscription[0]; // { id: 1 }
    }
  }

  async subscribeUpdate(credentials) {
    if (
      !(
        credentials.hasOwnProperty("currentEmail") &&
        credentials.hasOwnProperty("newEmail")
      )) {
      throw new Error("attributes missing");
    }
    let { currentEmail, newEmail } = credentials;
    try {
      let subscription = await this.knex("subscription")
        .where({ email: currentEmail })
        .update({ email: newEmail }, ["id"]);
      if (!subscription[0]) {
        return {};
      }
      return subscription[0]; // { id: 1 }
    } catch (err) {
      return {};
    }
  }

  async unsubscribe(credentials) {
    if (!credentials.hasOwnProperty("email")) {
      throw new Error("email missing");
    }
    let { email } = credentials;
    let subscription = await this.knex("subscription")
      .where({ email })
      .del(["id"]);
    if (!subscription[0]) {
      throw new Error("no subscription found");
    }
    return subscription[0]; // { id: 1 }
  }

  async firstAdmin() {
    let password = await bcrypt.hashPassword(process.env.ADMIN_PASSWORD);
    try {
      let admin = await this.knex("admin").insert({
        id: 1,
        firstName: "Admin",
        lastName: "Matterbase",
        email: process.env.ADMIN_EMAIL,
        password,
        remarks: "First Admin",
        isSuper: true,
        isDisabled: false,
      }, ['id']);
      return admin[0]; // { id: 1 }
    } catch (err) {
      throw new Error("already created");
    }
  }
}

module.exports = RegService;
