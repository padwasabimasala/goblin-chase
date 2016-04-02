function Calc(base) {
  this.base = base
  this.add = function(value) {
    this.base += value
  }
}

function eachProperty(obj, func) {
  for (p in obj) {
    if (obj.hasOwnProperty(p) == true)
      func(p, obj[p])
  }
}

describe("eachProperty", function() {
  it("calls a function for each property passing in the name and the property", function() {
    var values = []
    var foo = { name: "foo", lang: "js" }
    var collect = function(name, value) {
      values.push([name, value])
    }
    eachProperty(foo, collect)
    expect(values).toEqual([["name", "foo"], ["lang", "js"]])
  })
})

function compose(a, b) {
  eachProperty(b, function(name, value) {
    if (a[name] != undefined)
      throw "Can not compose. Property '" + name + "' already defined on " + a
    a[name] = value
  })
}

describe("Compose", function() {
  it("adds the properties of the second object to the first", function() {
    var thing = {}
    var calc = new Calc(10)
    compose(thing, calc)
    expect(thing.base).toEqual(10)
    thing.add(5)
    expect(thing.base).toEqual(15)
  })

  it("errors if a property of the second is already defined on the first", function() {
    var thing = { base: "already defined" }
    var calc = new Calc(10)
    var wrap = function() {
      compose(thing, calc)
    }
    expect(wrap).toThrow()
  })
})
