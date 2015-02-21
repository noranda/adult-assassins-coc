import Ember from 'ember';

var { isEmpty } = Ember;

export default Ember.Controller.extend({
  opposingClanName: null,
  opposingClanTag: null,
  warStatus: null,
  proxiedSelectedWarSize: null,
  selectedWarSize: Ember.computed.oneWay('proxiedSelectedWarSize.value'),
  warHours: null,
  warMinutes: null,

  preparationDay: function() {
    return this.get('warStatus') === 'preparation-day';
  }.property('warStatus'),

  warDay: function() {
    return this.get('warStatus') === 'war-day';
  }.property('warStatus'),

  errors: [],

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
    this.setProperties({
      opposingClanName: null,
      opposingClanTag: null,
      warStatus: null,
      proxiedSelectedWarSize: null,
      warHours: null,
      warMinutes: null,
      errors: []
    });
  },

  _validate: function() {
    var errors = [];

    if (isEmpty(this.get('opposingClanName'))) {
      errors.push('Opposing clan name cannot be empty.');
    }
    if (isEmpty(this.get('opposingClanTag'))) {
      errors.push('Opposing clan tag cannot be empty.');
    }
    if (isEmpty(this.get('warStatus'))) {
      errors.push('War status must be selected.');
    }
    if (isEmpty(this.get('selectedWarSize'))) {
      errors.push('Clan war size must be selected.');
    }
    if (isEmpty(this.get('warHours'))) {
      errors.push('Remaining hours of war cannot be empty.');
    }
    if (isEmpty(this.get('warMinutes'))) {
      errors.push('Remaining minutes of war cannot be empty.');
    }

    this.set('errors', errors);
    return errors.length === 0;
  },

  actions: {
    close: function() {
      this._reset();
      this.send('closeModal');
    },

    submit: function() {
      console.debug('submit was called');
      if (this._validate()) {
        // save
      }
    }
  }
});
