function Actor(name, cb) {
  this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
  this.name = name
  this.callback = cb
  this.messages = new Array()

  this.receive = function(message) {
    this.messages.push(message)
    return true
  }

  this.call = function() {
    return this.callback(this.messages.shift())
  }

}
