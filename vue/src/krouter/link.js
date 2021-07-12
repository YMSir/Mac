export default {
  name: 'RouterLink',
  props: {
    to: {
      type: [ String, Object ],
      required: true
    }
  },

  render (h, context) {
    return h(
      'a',
      {
        attrs: {
          href: '#' + this.to
        }
      },
      this.$slots.default
    );
  }
};
