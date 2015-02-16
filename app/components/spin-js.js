import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['spin-js'],

  lines: 12,
  length: 7,
  width: 5,
  radius: 10,
  rotate: 0,
  corners: 1,
  color: '#444',
  direction: 1,
  speed: 1,
  trail: 100,
  opacity: 1 / 4,
  fps: 20,
  zIndex: 2e9,
  spinnerClassName: 'spinner',
  top: '50%',
  left: '50%',
  position: 'absolute',
  hwaccel: true,
  shadow: true,
  height: 100,

  spinner: null,

  didInsertElement: function() {
    this._super.apply(this, arguments);

    var spinner = this.$().css({ height: this.get('height') });
    spinner = spinner.spin({
      lines: this.get('lines'),
      length: this.get('length'),
      width: this.get('width'),
      radius: this.get('radius'),
      rotate: this.get('rotate'),
      corners: this.get('corners'),
      color: this.get('color'),
      direction: this.get('direction'),
      speed: this.get('speed'),
      trail: this.get('trail'),
      opacity: this.get('opacity'),
      fps: this.get('fps'),
      zIndex: this.get('zIndex'),
      className: this.get('spinnerClassName'),
      top: this.get('top'),
      left: this.get('left'),
      position: this.get('position'),
      hwaccel: this.get('hwaccel')
    });

    this.set('spinner', spinner);
  },

  willDestroyElement: function() {
    this._super.apply(this, arguments);

    var spinner = this.get('spinner');

    if (!Ember.isNone(spinner)) {
      spinner.spin(false);
      this.set('spinner', null);
    }
  }
});
