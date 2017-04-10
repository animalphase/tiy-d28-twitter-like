export default function Post (attributes) {
  this.authorId =           attributes.authorId;
  this.authorUserName =     attributes.authorUserName;
  this.authorDisplayName =  attributes.authorDisplayName || '';
  this.authorAvatar =       attributes.authorAvatar || '';
  this.body =               attributes.body;
  this.timePosted =         new Date(attributes.timePosted);
}
