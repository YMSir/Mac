/**
 * Created by Yes.Man on 2021/7/17 23:57.
 * @file: compile
 */

class Compile {
  constructor (el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;

    if (this.$el) {
      this.compile(this.$el);
    }

    console.log('Compile', this);
  }

  compile (node) {
    const childNodes = node.childNodes;
    console.log(childNodes);
  }
}
