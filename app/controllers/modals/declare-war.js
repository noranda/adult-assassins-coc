import Ember from 'ember';

export default Ember.Controller.extend({
  proxiedSelectedWarSize: null,
  selectedWarSize: Ember.computed.oneWay('proxiedSelectedWarSize.value'),

  warSizes: function() {
    var sizes = [];

    for (var i = 10; i <= 50; i += 5) {
      sizes.push(`${i} vs. ${i}`);
    }

    return sizes;
  }.property(),

  proxiedWarSizes: Ember.computed.map('warSizes', function(item) {
    return { value: item, name: item };
  }),

  _reset: function() {
    this.set('proxiedSelectedWarSize', null);
  },

  actions: {
    close: function() {
      this._reset();
      this.send('closeModal');
    }
  }
});
