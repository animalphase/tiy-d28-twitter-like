export default function Post (attributes) {
  this.author = attributes.author;
  this.body = attributes.body;
  this.timePosted = new Date(attributes.timePosted);
}
