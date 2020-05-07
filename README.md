# Unpressed - Basic personal blog
Quickly create a nice looking personal blog (...at least if you have basic knowledge of nuxtjs/vuejs).

## Prerequisites
Mongodb: https://docs.mongodb.com/manual/administration/install-on-linux/

Optional:
* Redis (for session management): https://redis.io/topics/quickstart

## Core Feautures
* Posts
* Categories
* Tags
* Social sharing
* Basic sidebar widget
* Google Analytics
* XML sitemap

(todo: paging not fully implemented at the moment...will follow soon)

## How to start
## Install dependencies
```
npm install
```
## Configure
Copy the very simple sample.env to.env and update at least the following two params:
* APP_ADMIN_EMAIL
* COOKIE_SECRET

Maybe you would like to configure the main color. Just use one of tailwinds color scheme names:
(gray, red, orange, yellow, green, teal, blue, indigo, purple, pink) or define your own scheme in the tailwind-config
located under ./src/tailwind.config.js.

## Start
Then start dev server with 
```
npm run dev
```
If successful, you will be provided with direct links to frontend and backend of your blog directly in the
terminal window.
Now add log into the admin panel (with the credentials defined in your .dev file) and **immediately change your password**.

After adding a few posts, tags, you can enjoy your new nice looking blog.
# FAQ
## How to get rid of or change the sample sidebar widget
View the nuxt components under the ./src/pages directory and update the respective vue component template accordingly. These
nuxt page components are very simple.

### Example
The main index template looks as follows
```vue
<template>
  <LayoutSidebarRight>
    <PostList v-if="posts" :posts="posts"></PostList>
    <div slot="sidebar" class="w-full">
      <Widget>
        <template slot="title">Sample Widget</template>
      Some content
      </Widget>
    </div>
  </LayoutSidebarRight>
</template>
```

You can see the code representing the widget whithin the sidebar slot. Just update or delete it just as you like.
 





