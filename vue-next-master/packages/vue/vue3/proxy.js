/**
 * Created by Yes.Man on 2021/7/31 07:31.
 * @file: proxy
 */

/*-----------------*/
/*------proxy------*/
/*-----------------*/

const dinner = {
  meal: 'tacos',
  test: 'proxy'
}

const handler = {
  get (target, property, receiver) {
    // console.log(target, property)
    // return target[property]
    console.log(arguments)
    // track(target, property)
    return Reflect.get(...arguments)
  },

  set (target, property, value, receiver) {
    // console.log('set', target, property, value)
    // target[property] = value
    // return true
    console.log(arguments)
    // trigger(target, property)
    return Reflect.set(...arguments)
  }
}

// const proxy = new Proxy(dinner, handler)
const proxy = new Proxy(dinner, Reflect)
console.log(proxy.meal)
proxy.a = 'xxxx'
console.log(proxy)
