// 1 > 1
// 2 ABC

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
    actor.receive(cb)
    expect(actor.callback).toEqual(cb)
  })

  it("calls the callback with the message", function() {
    var actor = new Actor()
    var cb = function(message) { return message }
    actor.receive(cb)
    actor.message("the message")
    expect(actor.call()).toEqual("the message")
  })

  // it("receives a callback for a message", function() {
  //   var actor = new Actor()
  //   actor.receive(function(message) {
  //     return message
  //   })
  //   actor.message("the message")
  //   expect(actor.call()).toEqual("the message")
  // })
  //



  //
  // it("handles messages in the order their received", function() {
  //   var actor = new Actor("chase", function(message) {
  //     return message
  //   })
  //   actor.receive("first message")
  //   actor.receive("second message")
  //   expect(actor.call()).toEqual("first message")
  //   expect(actor.call()).toEqual("second message")
  // })

});

describe("ActorSystem", function () {
  // it("returns new actors", function() {
  //   var $ = new ActorSystem()
  //   var actor = $.createActor("phil")
  //   expect(actor.name).toEqual("phil")
  // })

  // it("sends an actor a message", function() {
  //   var $ = new ActorSystem()
  //   var actor = $.createActor("phil", function(message){
  //     return message
  //   })
  //   $.send(actor.uuid, "the message")
  //   expect(actor.call()).toEqual("the message")
  // })

});
