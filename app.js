let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let User = require('./models/user');
let BlogEntry = require('./models/blog-entry');
let Comment = require('./models/comment');

mongoose.connect('mongodb://localhost/blogs');

var db = mongoose.connection;
db.on('connected', function() {
  console.log('Mongoose connected to ' + db.host + ':' + db.port + '/' + db.name);
});

function quit() {
  console.log('Goodbye.');
  mongoose.disconnect();
}

Comment.remove({})
.then(function() {
  return BlogEntry.remove({});
})
.then(function() {
  return User.remove({});
})
.then(function() {
  let mike = new User( { name: 'Mike'} );
  let susan = new User( { name: 'Susan'} );
  return User.create( [mike, susan] );
})
.then(function(savedUsers) {
  user1 = savedUsers[0];
  user2 = savedUsers[1];
  console.log('just saved users:', user1, user2);
  let blogEntry1 = new BlogEntry( {
    title: 'Monday',
    text: 'Happy',
    user: user1
  });
  let blogEntry2 = new BlogEntry( {
    title: 'Tuesday',
    text: 'Sad',
    user: user2
  });
  return BlogEntry.create([blogEntry1, blogEntry2]);
})
.then(function(savedBlogEntries) {
  console.log('savedBlogEntries:', savedBlogEntries);
  return Promise.all( [ User.find(), BlogEntry.find() ] );
})
.then(function(results) {
  let users = results[0];
  let entries = results[1];

  // create some comments and return a promise
  let comment1 = new Comment( {
    text: 'Yeah!!!',
    user: users[1],
    blogEntry: entries[0]
  });
  let comment2 = new Comment( {
    text: 'So sorry!!!',
    user: users[0],
    blogEntry: entries[1]
  });
  console.log('about to save comments:', comment1, comment2);
  return Comment.create([comment1, comment2]);
})
.then(function(savedComments) {
  console.log('savedComments:', savedComments);
  return Comment.find({}).populate('user blogEntry');
})
.then(function(allComments) {
  console.log('allComments:', allComments);
  allComments.forEach(function(comment) {
    console.log('User ' + comment.user.name +
       ' created a comment for blog entry ' + comment.blogEntry.title +
       ' with the text ' + comment.text);
  });
  quit();
})
.catch(function(err) {
  console.log('ERROR:', err);
  quit();
});
