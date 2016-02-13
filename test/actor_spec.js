// 1 > 1
// 2 ABC

describe("Actor", function () {
  it("has a uuid", function() {
    var actor = new Actor("chase");
    expect(actor.uuid).not.toBe(null)
  })

  it("returns 1 for 1", function() {
    var actor = new Actor("chase");
    expect(actor.name).toEqual("chase")
  })

  it("receives a message", function() {
    var actor = new Actor("chase");
    expect(actor.receive("A message")).toEqual(true)
  })

  it("handles messages in the order their received", function() {
    var actor = new Actor("chase", function(message) {
      return message
    })
    actor.receive("first message")
    actor.receive("second message")
    expect(actor.call()).toEqual("first message")
    expect(actor.call()).toEqual("second message")
  })

});
