function Calc(base) {
  this.base = base
  this.add = function(value) {
    this.base += value
  }
}

describe("Calc",function() {
  it("has a base", function() {
    adder = new Calc(10)
    expect(adder.base).toEqual(10)
  })
  it("can add to the base", function() {
    adder = new Calc(10)
    adder.add(5)
    expect(adder.base).toEqual(15)
  })
})

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
    a[name] = value
  })
}

describe("Compose", function() {
  it("adds the properties of the second thing to the first", function() {
    var thing = {}
    var calc = new Calc(10)
    compose(thing, calc)
    expect(thing.base).toEqual(10)
    thing.add(5)
    expect(thing.base).toEqual(15)
  })
})
