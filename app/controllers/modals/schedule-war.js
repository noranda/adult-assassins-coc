import Ember from 'ember';

var { isEmpty } = Ember;

export default Ember.Controller.extend({
  prepareHours: null,
  prepareMinutes: null,

  errors: [],

  _reset: function() {
    this.setProperties({
      warHours: null,
      warMinutes: null,
      errors: []
    });
  },

  _validate: function() {
    var errors = [];
    if (isEmpty(this.get('prepareHours'))) {
      errors.push('Hours to preparation cannot be empty.');
    }
    if (isEmpty(this.get('prepareMinutes'))) {
      errors.push('Minutes to Preparation cannot be empty.');
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
        // save
      }
    }
  }
});
