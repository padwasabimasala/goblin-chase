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
  this.receivers = {}
  this.patterns = []

  this.id  = id || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  })

  this.message = function(message) {
    this.mailbox.push(message)
    return true
  }

  this.receive = function(pattern, callback) {
    this.patterns.push(pattern)
    this.receivers[pattern] = callback
    this.callback = callback
  }

  this.call = function() {
    var earliestMessage = this.mailbox.shift()
    console.log("message: " + earliestMessage)

    for (i = 0; i < this.patterns.length; i++){
      var pattern = this.patterns[i]
      if (pattern.test(earliestMessage) == true) {
        var callback = this.receivers[pattern]
        return callback(earliestMessage)
      }
    }
    return false
  }
}

function ActorSystem() {
  this.actorIds = []
  this.actors = {}

  this.spawn = function(actorId) {
    var actor = new Actor(actorId)
    this.actorIds.push(actorId)
    this.actors[actor.id] = actor
    return actor
  }

  this.send = function(message, actorId) {
    if (!actorId) {
      for (i = 0; i < this.actorIds.length; i++){
        var actorId = this.actorIds[i]
        this.actors[actorId].message(message)
      }
    }
    this.actors[actorId].message(message)
  }

  this.callEach = function() {
    for (i = 0; i < this.actorIds.length; i++){
      console.log("i " + i)
      var actorId = this.actorIds[i]
      console.log("calling: " + actorId)
      var actor = this.actors[actorId]
      // actor.call()
    }
  }
}
