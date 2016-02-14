function ActorSystem() {
  this.actors = {}
}

ActorSystem.prototype.spawn = function(actorId) {
    var actor = new Actor(actorId)
    this.actors[actor.id] = actor
    return actor
  }

ActorSystem.prototype.send = function(message, actorId) {
  console.log("start send")

  if (!actorId) {
    for (var actorId in this.actors) {
      if (this.actors.hasOwnProperty(actorId)) {
        console.log(actorId + " gets messsage " + message)
        var actor = this.actors[actorId]
        this.actors[actorId].message(message)
        console.log(actorId + ".mailbox " + actor.mailbox)
      }
    }
    return true
  }
  this.actors[actorId].message(message)
  return true
}

ActorSystem.prototype.callEach = function() {
  for (var actorId in this.actors) {
    if (this.actors.hasOwnProperty(actorId)) {
      this.actors[actorId].call()
    }
  }
}
