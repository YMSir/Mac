/**
 * Created by Yes.Man on 2021/8/23 14:58.
 * @file: effect
 */

const effectStack = [];

function effect (fn, options = {}) {
  const effect = createReactiveEffect(fn, options);
  effect();
  return effect();
}

function createReactiveEffect (fn, options) {
  const effect = function reactiveEffect (...args) {
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect);
        return fn(...args);
      } finally {
        effectStack.pop();
      }
    }
  };

  return effect;
}

const targetMap = new WeakMap();

function track (target, key) {
  const effect = effectStack[effectStack.length - 1];
  if (effect) {
    let depMap = targetMap.get(target);
    if (!depMap) {
      depMap = new Map();
      targetMap.set(target, depMap);
    }

    let deps = depMap.get(key);
    if (!deps) {
      deps = new Set();
      depMap.set(key, deps);
    }
    deps.add(effect);
  }
}

function trigger (target, key) {
  const depMap = targetMap.get(target);
  if (!depMap) return;

  const deps = depMap.get(key);
  if (deps) {
    deps.forEach(dep => dep());
  }
}

function isObject (v) {
  return v !== null && typeof v === 'object';
}

function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      console.log('get', ...arguments);
      return isObject(target[key]) ? reactive(target[key]) : Reflect.get(...arguments);
    },

    set () {
      console.log('set', ...arguments);
      return Reflect.set(...arguments);
    },

    deleteProperty () {
      console.log('delete', ...arguments);
      return Reflect.deleteProperty(...arguments);
    }
  });
}

const obj = reactive({
  foo: 'foo'
});

// console.log(obj.foo);
// obj.foo = 'bar';

effect(() => {
  console.log('effect', obj.foo);
});

obj.foo = 'baz';
