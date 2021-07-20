/**
 * Created by Yes.Man on 2021/7/17 23:57.
 * @file: compile
 * 编译模板，初始化视图，收集依赖(更新函数、watcher创建)
 */

class Compile {
  constructor (el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;

    if (this.$el) {
      this.compile(this.$el);
    }
  }

  compile (node) {
    const childNodes = node.childNodes;
    console.log(childNodes);

    childNodes.forEach(n => {
      const { nodeType, nodeValue, childNodes, textContent } = n;
      if (nodeType === 3 && /[{]{2}(.*)[}]{2}/.test(nodeValue)) {
        console.log(nodeValue, RegExp.$1);
        n.nodeValue = this.$vm[RegExp.$1.trim()];
      } else if (nodeType === 1) {
        console.log(nodeValue);
      }

      if (childNodes.length > 0) {
        this.compile(n);
      }
    });
  }
}
