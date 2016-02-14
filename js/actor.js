/*
 *
 *    ActorSystem keeps an HashMap of current Actors by Id
 *
 *    var spawn = ActorSystem.spawn([actorId]) // returns actorId
 *    var send = ActorSystem.send(message, [actorId])
 *
 *    spawn registers a new actor (passing an optional id) and returns it's id
 *
 *    send delivers a message to an Actors mailbox
 *      mailbox are strings
 *
 *    var receive = Actor.receive(pattern, callback)
 *
 *    receive takes an id, a pattern, and a callback
 *      it registers the function on that Actor
 *      as a callback for mailbox matching the pattern
 *      pattern is a regex object
 *
 *    each loop ActorSytem iterates over all the actors and calls call
 *    Actor.call takes the oldest message from the mailbox and tries to match it
 *    discarding it if no match
 *
 *
 *
 */

function Actor(id) {
  this.mailbox = new Array()
  this.patterns = []
  this.receivers = {}

  // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  this.id  = id || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  })
}

Actor.prototype.message = function(message) {
  this.mailbox.push(message)
  return true
}

Actor.prototype.receive = function(pattern, callback) {
  this.patterns.push(pattern) // todo keep this uniq
  this.receivers[pattern] = callback
  this.callback = callback
  return true
}

Actor.prototype.call = function() {
  var earliestMessage = this.mailbox.shift()
  if (!earliestMessage) { return false }

  for (i = 0; i < this.patterns.length; i++){
    var pattern = this.patterns[i]
    if (pattern.test(earliestMessage) == true) {
      var callback = this.receivers[pattern]
      return callback(earliestMessage)
    }
  }
  return false
}
