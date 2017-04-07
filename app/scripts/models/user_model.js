export default function User (attributes) {
  this.userName = attributes.userName;
  this.displayName = attributes.displayName || "No Name Given";
  this.bio = '';
  this.avatar = attributes.avatar;
}
