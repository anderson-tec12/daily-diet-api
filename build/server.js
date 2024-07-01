"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var import_dotenv2 = require("dotenv");

// src/env/index.ts
var import_dotenv = require("dotenv");
var import_zod = require("zod");
var ENV_SCHEMA = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production"]).default("production"),
  DATABASE_URL: import_zod.z.string(),
  PORT: import_zod.z.number().default(21031)
});
(0, import_dotenv.config)();
var envValidator = ENV_SCHEMA.safeParse(process.env);
if (!envValidator.success) {
  console.log(`Invalid enviroment`, envValidator.error.format());
  throw new Error(`Invalid enviroment`);
}
var env = envValidator.data;

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/routes/auth.ts
var import_node_crypto = __toESM(require("crypto"));
var import_zod2 = require("zod");
function authRoutes(knex2) {
  return (app2) => __async(this, null, function* () {
    app2.post("/register", (request, reply) => __async(this, null, function* () {
      try {
        const registerUserParamsSchema = import_zod2.z.object({
          email: import_zod2.z.string(),
          password: import_zod2.z.string()
        });
        const { email, password } = registerUserParamsSchema.parse(request.body);
        yield knex2("users").insert({
          id: import_node_crypto.default.randomUUID(),
          email,
          password
        });
        return reply.status(201).send();
      } catch (err) {
        reply.status(400).send("Erro, verifique as propriedades, EMAIL e PASSWORD");
      }
    }));
    app2.post("/login", (request, reply) => __async(this, null, function* () {
      try {
        const schemaParamsLogin = import_zod2.z.object({
          email: import_zod2.z.string(),
          password: import_zod2.z.string()
        });
        const { email, password } = schemaParamsLogin.parse(request.body);
        const user = yield knex2("users").select().where({
          email,
          password
        }).first();
        if (!user) {
          throw new Error("erro");
        }
        return user;
      } catch (e) {
        return reply.status(400).send("Erro ao realizar login");
      }
    }));
  });
}

// src/database.ts
var import_knex = require("knex");
var configKnex = {
  client: "sqlite",
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
};
var knex = (0, import_knex.knex)(configKnex);

// src/routes/diets.ts
var import_zod3 = require("zod");
var import_node_crypto2 = __toESM(require("crypto"));
function dietsRoutes(knex2) {
  return (app2) => __async(this, null, function* () {
    app2.get("/all/:id", (request) => __async(this, null, function* () {
      const getRequestSchema = import_zod3.z.object({
        id: import_zod3.z.string()
      });
      const { id } = getRequestSchema.parse(request.params);
      const diets = yield knex2("meats").select().where({
        user_id: id
      });
      return {
        diets
      };
    }));
    app2.post("/:id", (request, reply) => __async(this, null, function* () {
      const getRequestSchema = import_zod3.z.object({
        id: import_zod3.z.string()
      });
      const bodyRequestSchema = import_zod3.z.object({
        name: import_zod3.z.string(),
        description: import_zod3.z.string(),
        datetime: import_zod3.z.string(),
        is_diet: import_zod3.z.string()
      });
      const { id: userId } = getRequestSchema.parse(request.params);
      const data = bodyRequestSchema.parse(request.body);
      const payload = __spreadProps(__spreadValues({}, data), {
        user_id: userId,
        id: import_node_crypto2.default.randomUUID()
      });
      yield knex2("meats").insert(payload);
      return reply.status(201).send();
    }));
    app2.put("/edit/:id", (request, reply) => __async(this, null, function* () {
      const getRequestSchema = import_zod3.z.object({
        id: import_zod3.z.string()
      });
      const bodyRequestSchema = import_zod3.z.object({
        name: import_zod3.z.string(),
        description: import_zod3.z.string(),
        datetime: import_zod3.z.string(),
        is_diet: import_zod3.z.string(),
        id: import_zod3.z.string()
      });
      const { id: userId } = getRequestSchema.parse(request.params);
      const data = bodyRequestSchema.parse(request.body);
      const payload = __spreadProps(__spreadValues({}, data), {
        user_id: userId
      });
      yield knex2("meats").where({
        id: data.id
      }).update(payload);
      return reply.status(200).send();
    }));
    app2.delete("/:id", (request, reply) => __async(this, null, function* () {
      const getRequestSchema = import_zod3.z.object({
        id: import_zod3.z.string()
      });
      const bodyRequestSchema = import_zod3.z.object({
        id: import_zod3.z.string()
      });
      const data = bodyRequestSchema.parse(request.body);
      const { id: userId } = getRequestSchema.parse(request.params);
      yield knex2("meats").where({
        id: data.id,
        user_id: userId
      }).delete();
      reply.status(200).send();
    }));
    app2.get("/resume/:id", (request) => __async(this, null, function* () {
      const getRequestSchema = import_zod3.z.object({
        id: import_zod3.z.string()
      });
      const { id } = getRequestSchema.parse(request.params);
      const diets = yield knex2("meats").select().where({
        user_id: id
      });
      const totalMeals = diets.length;
      const totalIsDiet = diets.filter((d) => d.is_diet === 1).length;
      return {
        totalMeals,
        totalIsDiet,
        totalIsNoDiet: totalMeals - totalIsDiet
      };
    }));
  });
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(authRoutes(knex), {
  prefix: "auth"
});
app.register(dietsRoutes(knex), {
  prefix: "diets"
});

// src/server.ts
app.listen({
  port: env.PORT
}).then((info) => {
  console.log("HTTP Server is running " + info);
});
