/**
 * Created by Yes.Man on 2021/8/1 16:52.
 * @file: reactive
 */

function reactive (obj) {
  return new Proxy(obj, {
    ...Reflect,

    get () {
      const v = Reflect.get(...arguments)
      console.log('get', v)
      if (typeof v === 'object' && v !== null) {
        return reactive(v)
      } else {
        return v
      }
    },

    // set () {
    //   console.log('set', arguments)
    //   return Reflect.set(...arguments)
    // },
    //
    // deleteProperty () {
    //   console.log('delete', arguments)
    //   return Reflect.deleteProperty(...arguments)
    // }
  })
}

const obj = reactive({
  bar: 'bar',
  x: {
    y: 'yyy'
  }
})

// console.log(obj.bar)
// obj.bar = 'bar-bar'
//
// obj.foo = 'foo'
// console.log(obj)
//
// delete obj.bar
// console.log(obj)

obj.a = {
  b: 'xxx'
}
console.log(obj.a.b)
// console.log(obj.x.y)
