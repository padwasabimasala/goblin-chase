describe("Actor", function () {
  it("get a default id", function() {
    var actor = new Actor();
    expect(actor.id).not.toBe(null)
    expect(actor.id).not.toBe(undefined)
  })

  it("accepts an id", function() {
    var actor = new Actor("theID");
    expect(actor.id).toBe("theID")
  })

  it("accepts a message", function() {
    var actor = new Actor()
    console.log(actor.id)
    expect(actor.message("the message")).toEqual(true)
  })

  it("receives a callback for a message", function() {
    var actor = new Actor()
    var cb = function(message) {}
    actor.receive(/.*/, cb)
    expect(actor.callback).toEqual(cb)
  })

  it("calls the callback with the message", function() {
    var actor = new Actor()
    actor.receive(/.*/, function(message) { return message })
    actor.message("the message")
    expect(actor.call()).toEqual("the message")
  })

  it("receives messages in the order their given", function() {
    var actor = new Actor()
    actor.receive(/.*/, function(message) { return message })
    actor.message("first message")
    actor.message("second message")
    expect(actor.call()).toEqual("first message")
    expect(actor.call()).toEqual("second message")
  })

  it("responds to message with the matching receiver", function() {
    var actor = new Actor()
    actor.receive(/second/, function(message) { return "second " + message })
    actor.receive(/first/, function(message) { return "first " + message })
    actor.message("first message")
    actor.message("second message")
    actor.message("third message")
    actor.message("not the second message")
    expect(actor.call()).toEqual("first first message")
    expect(actor.call()).toEqual("second second message")
    expect(actor.call()).toEqual(false)
    expect(actor.call()).toEqual("second not the second message")
  })
});

describe("ActorSystem", function () {
  it("spawns new actors", function() {
    var $ = new ActorSystem()
    var actor = $.spawn("hero")
    actor.receive(/.*/, function(message) { return "actor " + message })
    actor.message("trying the ActorSystem")
    expect(actor.id).toEqual("hero")
    expect(actor.call()).toEqual("actor trying the ActorSystem")
  })

  it("sends a message to an actor", function() {
    var $ = new ActorSystem()
    var actor = $.spawn("hero")
    actor.receive(/.*/, function(message) { return "hero: " + message })
    $.send(actor.id, "I am the hero")
    expect(actor.call()).toEqual("hero: I am the hero")
  })
});
