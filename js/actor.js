/*
 *
 *    ActorSystem keeps an HashMap of current Actors by Id
 *
 *    var spawn = ActorSystem.spawn(optional actorId) // returns actorId
 *    var receive = ActorSystem.receive(actorId, pattern, callback)
 *    var send = ActorSystem.send(actorId || All, message)
 *    var ANY = WebActors.ANY;
 *
 *    spawn registers a new actor (passing an optional id) and returns it's id
 *
 *    receive takes an id, a pattern, and a callback
 *      it registers the function on that Actor
 *      as a callback for messages matching the pattern
 *      pattern is a regex object
 *
 *    send delivers a message to an Actors mailbox
 *      messages are strings
 *
 *    each loop ActorSytem iterates over all the actors and calls call
 *    Actor.call takes the oldest message from the mailbox and tries to match it
 *    discarding it if no match
 *
 *
 *
 */

function Actor(id) {
  this.messages = new Array()
  this.receivers = {}
  this.patterns = []

  this.id  = id || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  })

  this.message = function(message) {
    this.messages.push(message)
    return true
  }

  this.receive = function(pattern, callback) {
    this.patterns.push(pattern)
    this.receivers[pattern] = callback
    this.callback = callback
  }

  this.call = function() {
    var earliestMessage = this.messages.shift()

    for (i = 0; i < this.patterns.length; i++){
      var pattern = this.patterns[i]
      if (pattern.test(earliestMessage) == true) {
        var callback = this.receivers[pattern]
        return callback(earliestMessage)
        console.log("matched")
      }
    }
    return false
  }
}

function ActorSystem() {
  this.actors = {}
  this.spawn = function(actorId) {
    var actor = new Actor(actorId)
    this.actors[actor.id] = actor
    return actor
  }

  this.send = function(actorId, message) {
    this.actors[actorId + "asdf"].message(message)
  }
}
