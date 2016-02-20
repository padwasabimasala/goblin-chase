// 1 > 1
// 2 ABC

describe("Game", function () {
  it("has a canvas", function() {
    var game = new Game(512,480)
    var canvas = game.canvas
    console.log(canvas)
    expect(canvas.width).toEqual(512)
    expect(canvas.height).toEqual(480)
  })
});

describe("GameLoop", function() {
  it("runs the loop", function() {
    var setupCalled = false
    function setup() { setupCalled = true }

    gl = new GameLoop(setup, setup, setup)
    gl.start()
    expect(setupCalled).toBe(true)

  })
})

describe("GameObject", function () {
  it("takes an id and an image", function() {
    var obj = new GameObject("hero", "images/hero.png")
    expect(obj.id).toEqual("hero")
    expect(obj.image).not.toBe(undefined)
  })

  it("takes a starting location", function() {
    var obj = new GameObject("hero", "images/hero.png", 5, 10) 
    expect(obj.x).toEqual(5)
    expect(obj.y).toBe(10)
  })
});
