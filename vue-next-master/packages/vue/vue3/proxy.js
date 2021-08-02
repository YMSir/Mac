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
};

const handler = {
  get (target, property, receiver) {
    // console.log(target, property)
    // return target[property]
    console.log(arguments);
    // track(target, property)
    return Reflect.get(...arguments);
  },

  set (target, property, value, receiver) {
    // console.log('set', target, property, value)
    // target[property] = value
    // return true
    console.log(arguments);
    // trigger(target, property)
    return Reflect.set(...arguments);
  }
};

// const proxy = new Proxy(dinner, handler)
const proxy = new Proxy(dinner, Reflect);
console.log(proxy.meal);

proxy.a = 'xxx';
console.log(proxy);

const symbol = Symbol('aaa');
proxy.symbol = 'this is symbol key.';
console.log(symbol);
console.log(proxy.symbol);
console.log(proxy);

/* ========================================== track ========================================== */

const target = {};

Reflect.defineProperty(target, 'foo', {
  writable: false,
  configurable: false,
  value: 'foo'
});

const p = new Proxy(target, {
  get () {
    return 'qux';
  }
});

// console.log(p.foo);
// TypeError: 'get' on proxy: property 'foo' is a read-only

/* ========================================== 可撤销代理 ========================================== */

const o = {
  foo: 'bar'
};
const h = {
  get () {
    return 'intercepted';
  }
};

const { proxy: p1, revoke } = Proxy.revocable(o, h);

console.log(p1.foo);
console.log(o.foo);

revoke();

console.log(o.foo);
// console.log(p1.foo);
// TypeError
