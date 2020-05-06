require('dotenv').config()

const expressSession = require('express-session');
const redis = require('redis')
let RedisStore = require('connect-redis')(expressSession)
let redisClient = redis.createClient()
let MongoStore = require('connect-mongo')(expressSession)

const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NuxtApp } = require('@keystonejs/app-nuxt');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PageSchema = require('./lists/Page');
const UserSchema = require('./lists/User');
const PostSchema = require('./lists/Post');
const TagSchema = require('./lists/Tag');
const CategorySchema = require('./lists/Category');

const DefaultAuthStrategy = require('./auth/Default.js');
const UserSeeder = require('./lists/seed/User');

const nuxtConfig = require('./config/nuxtConfig')
const adapterConfig = { mongoUri: 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, url: 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME };

const keystone = new Keystone({
  name: process.env.APP_NAME,
  cookieSecret: process.env.COOKIE_SECRET,
  sessionStore: process.env.SESSION_CLIENT === 'redis' ? new RedisStore({ client: redisClient }) : new MongoStore(adapterConfig),
  adapter: new Adapter(adapterConfig),
  queryLimits: {
    maxTotalResults: 1000
  },
  onConnect: async keystone => {
    try {
      await keystone.createItems(UserSeeder);
    } catch (e) {
      console.log('can not seed user a second time');
    }
  }
});

keystone.createList('Page', PageSchema);
keystone.createList('User', UserSchema);
keystone.createList('Post', PostSchema);
keystone.createList('Tag', TagSchema);
keystone.createList('Category', CategorySchema);

const authStrategy = keystone.createAuthStrategy(DefaultAuthStrategy);

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({authStrategy}),
    new NuxtApp(nuxtConfig)
  ],
  configureExpress: app => {
    app.set('trust proxy', true);
  },
};
