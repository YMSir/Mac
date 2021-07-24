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

  /**
   * 编译解析
   * @param node
   */
  compile (node) {
    const childNodes = node.childNodes;

    childNodes.forEach(n => {
      const { nodeType, nodeValue, childNodes } = n;

      switch (nodeType) {
        case 1: // 元素
          this.compileElement(n);
          break;

        case 3: // 文本
          if (/[{]{2}(.*)[}]{2}/.test(nodeValue)) {
            this.compileText(n);
          }
          break;
      }

      // 递归解析节点
      if (childNodes.length > 0) {
        this.compile(n);
      }
    });
  }

  /**
   * 编译元素
   * @param node
   */
  compileElement (node) {
    const { attributes: attrs } = node;
    Array.from(attrs).forEach(attr => {
      // 获取指令、表达式
      const { name: attrName, value: exp } = attr;

      // v-text v-html
      if (/^v-(.+)$/g.test(attrName)) {
        const dir = RegExp.$1;
        this.update(node, exp, dir);
      }

      // @click
      if (/^@(.+)$/g.test(attrName)) {
        const event = RegExp.$1;
        const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp];

        node.addEventListener(event, () => {
          fn && fn.call(this.$vm);
        });
      }
    });
  }

  /**
   * 编译文本
   * @param node
   */
  compileText (node) {
    this.update(node, RegExp.$1.trim(), 'text');
  }

  /**
   * 更新视图
   * @param node
   * @param exp
   * @param dir
   */
  update (node, exp, dir) {
    // init
    const fn = this[dir];
    fn && fn.call(this, node, this.$vm[exp], exp);

    // update
    new Watcher(this.$vm, exp, val => {
      fn && fn.call(this, node, val, exp);
    });
  }

  /**
   * v-text
   * @param node
   * @param val
   */
  text (node, val) {
    node.textContent = val;
  }

  /**
   * v-html
   * @param node
   * @param val
   */
  html (node, val) {
    node.innerHTML = val;
  }

  /**
   * v-model
   * @param node
   * @param val
   * @param exp
   */
  model (node, val, exp) {
    node.value = val;
    node.addEventListener('input', e => {
      this.$vm[exp] = e.target.value;
    });
  }
}
