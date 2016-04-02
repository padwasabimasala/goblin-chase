function Object() {

}

function Calc(base) {
  this.base = base
  this.add = function(value) {
    this.base += value
  }
}

describe("Object", function() {
  obj = new Object()
})

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
  it("adds the properties of the second object to the first", function() {
    var object = new Object()
    var calc = new Calc(10)
    compose(object, calc)
    expect(object.base).toEqual(10)
    object.add(5)
    expect(object.base).toEqual(15)
  })
})
