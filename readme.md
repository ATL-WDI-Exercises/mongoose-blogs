# Mongoose Blogs

This is a simple example of defining 3 Mongoose models as follows:

* User model
* BlogEntry model that has a many-to-one association to the User model.
* Comment model that has a many-to-one association to the User model and a many-to-one association to the BlogEntry model.

All associations are linked (no embedded documents).

## Steps to Test the Code

```bash
git clone https://github.com/ATL-WDI-Exercises/mongoose-blogs.git
cd mongoose-blogs
npm install
node app.js
```
