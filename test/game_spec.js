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
