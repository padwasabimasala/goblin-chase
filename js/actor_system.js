function ActorSystem() {
  this.actors = {}
}

ActorSystem.prototype.spawn = function(actorId) {
    var actor = new Actor(actorId)
    this.actors[actor.id] = actor
    return actor
  }

ActorSystem.prototype.send = function(message, actorId) {

  if (!actorId) {
    for (var actorId in this.actors) {
      if (this.actors.hasOwnProperty(actorId)) {
        var actor = this.actors[actorId]
        this.actors[actorId].message(message)
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
