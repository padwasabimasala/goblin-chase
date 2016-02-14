describe("ActorSystem", function () {
  it("spawns new actors", function() {
    var sys = new ActorSystem()
    var actor = sys.spawn("hero")
    expect(actor.id).toEqual("hero")
  })

  it("sends a message to an actor", function() {
    // Todo don't look at internals
    var sys = new ActorSystem()
    var hero = sys.spawn("hero")
    sys.send("I am the hero", hero.id)
    expect(hero.mailbox).toEqual(["I am the hero"])
    sys.send("I am still the hero", hero.id)
    expect(hero.mailbox).toEqual(["I am the hero", "I am still the hero"])
  })

  it("sends a message to all actors", function() {
    var sys = new ActorSystem()
    var hero = sys.spawn("hero")
    var goblin = sys.spawn("goblin")
    var messages = []

    hero.receive(/.*/, function(message) {
      messages.push("hero got message: " + message)
    })

    goblin.receive(/.*/, function(message) {
      messages.push("goblin got message: " + message)
    })

    sys.send("Fight!")
    hero.call()
    goblin.call()

    expect(messages).toEqual(["hero got message: Fight!", "goblin got message: Fight!"])
  })

  it("calls each actor", function() {
    var sys = new ActorSystem()
    var hero = sys.spawn("hero")
    var goblin = sys.spawn("goblin")
    var messages = []

    hero.receive(/.*/, function(message) {
      messages.push("hero got message: " + message)
    })

    goblin.receive(/.*/, function(message) {
      messages.push("goblin got message: " + message)
    })

    sys.send("Fight!")
    sys.callEach()
    expect(messages).toEqual(["hero got message: Fight!", "goblin got message: Fight!"])
    sys.send("wins", hero.id)
    sys.callEach()
    expect(messages).toEqual(["hero got message: Fight!", "goblin got message: Fight!", "hero got message: wins"])
    sys.callEach()
    expect(messages).toEqual(["hero got message: Fight!", "goblin got message: Fight!", "hero got message: wins"])

  })

});


