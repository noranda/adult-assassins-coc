import Ember from 'ember';

var { isEmpty } = Ember;

function saveSuccessFn(json) {
  this.get('store').pushPayload('timer', json);
  this.send('close');
}

function saveErrorFn() {
  this.set('errors', ['An error occurred when attempting to schedule war, please try again.']);
  this.set('isSaving', false);
}

export default Ember.Controller.extend({
  prepareHours: null,
  prepareMinutes: null,

  errors: [],
  isSaving: false,

  _reset: function() {
    this.setProperties({
      warHours: null,
      warMinutes: null,
      errors: [],
      isSaving: false
    });
  },

  _validate: function() {
    var errors = [];
    var prepareHours = parseInt(this.get('prepareHours'), 10);
    var prepareMinutes = parseInt(this.get('prepareMinutes'), 10);

    if (isEmpty(this.get('prepareHours'))) {
      errors.push('Hours to preparation cannot be empty.');
    } else if (isNaN(prepareHours) || prepareHours < 0) {
      errors.push('Hours must be 0 or higher');
    }

    if (isEmpty(this.get('prepareMinutes'))) {
      errors.push('Minutes to Preparation cannot be empty.');
    } else if (isNaN(prepareMinutes) || prepareMinutes < 0 || prepareMinutes > 59) {
      errors.push('Minutes must be between 0 and 59');
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
          hours: parseInt(this.get('prepareHours'), 10),
          minutes: parseInt(this.get('prepareMinutes'), 10)
        };
        //jscs:enable

        this.set('isSaving', true);

        Ember.$.ajax({
          data: {
            timer: query
          },
          dataType: 'json',
          type: 'POST',
          url: `${applicationAdapter.get('namespace')}/timers`
        }).then(saveSuccessFn.bind(this), saveErrorFn.bind(this));
      }
    }
  }
});
