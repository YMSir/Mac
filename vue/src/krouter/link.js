/**
 * Created by Yes.Man on 2021/7/12 14:23.
 * @file: RouterLink Component
 */
export default {
  name: 'RouterLink',
  props: {
    to: {
      type: [ String, Object ],
      required: true
    }
  },

  render (h) {
    return h(
      'a',
      {
        attrs: {
          href: '/#' + this.to
        }
      },
      this.$slots.default
    );
  }
};
