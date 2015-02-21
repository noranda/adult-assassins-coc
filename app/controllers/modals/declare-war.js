import Ember from 'ember';

var { isEmpty } = Ember;

function saveSuccessFn(json) {
  this.get('store').pushPayload('war', json);
  this.send('close');
}

function saveErrorFn() {
  this.set('errors', ['An error occurred when attempting to save the war, please try again.']);
}

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
      sizes.push({ value: i, name: `${i} vs. ${i}` });
    }
    return sizes;
  }.property(),

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
      if (this._validate()) {
        var applicationAdapter = this.container.lookup('adapter:application');

        //jscs:disable
        var query = {
          opposing_clan_name: this.get('opposingClanName'),
          opposing_clan_tag: this.get('opposingClanTag'),
          war_status: this.get('warStatus'),
          war_size: this.get('selectedWarSize'),
          hours: this.get('warHours'),
          minutes: this.get('warMinutes')
        };
        //jscs:enable

        Ember.$.ajax({
          data: {
            war: query
          },
          dataType: 'json',
          type: 'POST',
          url: `${applicationAdapter.get('namespace')}/wars`
        }).then(saveSuccessFn.bind(this), saveErrorFn.bind(this));
      }
    }
  }
});
