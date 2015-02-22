import Ember from 'ember';

var { isEmpty } = Ember;

function saveSuccessFn() {
  this.send('close');
}

function saveErrorFn() {
  this.set('errors', ['An error occurred when attempting to save the attack, please try again.']);
}

export default Ember.Controller.extend({
  errors: [],

  war: Ember.computed.oneWay('model.war'),
  warPlayer: Ember.computed.oneWay('model.warPlayer'),

  selectedWarPlayer: null,
  selectedScore: function(key, value) {
    if (arguments.length === 1) {
      return this.get('scores.firstObject');
    } else {
      return value;
    }
  }.property('scores'),

  scores: function() {
    var scores = [];

    scores.push({ value: null, name: 'called' });
    scores.push({ value: 0, name: Ember.String.htmlSafe('<i class="fa fa-star-o fa-fw"></i><i class="fa fa-star-o fa-fw"></i><i class="fa fa-star-o fa-fw"></i>') });
    scores.push({ value: 1, name: Ember.String.htmlSafe('<i class="fa fa-star fa-fw"></i><i class="fa fa-star-o fa-fw"></i><i class="fa fa-star-o fa-fw"></i>') });
    scores.push({ value: 2, name: Ember.String.htmlSafe('<i class="fa fa-star fa-fw"></i><i class="fa fa-star fa-fw"></i><i class="fa fa-star-o fa-fw"></i>') });
    scores.push({ value: 3, name: Ember.String.htmlSafe('<i class="fa fa-star fa-fw"></i><i class="fa fa-star fa-fw"></i><i class="fa fa-star fa-fw"></i>') });

    return scores;
  }.property(),

  modalTitle: function() {
    return `Add attacker to ${this.get('warPlayer.player.name')}`;
  }.property('warPlayer'),

  attackersList: function() {
    return this.get('war.warPlayers').filterBy('friendly', !this.get('warPlayer.friendly'));
  }.property('warPlayer', 'war'),

  _validate: function() {
    var errors = [];

    if (isEmpty(this.get('selectedWarPlayer'))) {
      errors.push('Attacker name cannot be empty.');
    }

    this.set('errors', errors);
    return errors.length === 0;
  },

  actions: {
    close: function() {
      this.send('closeModal');
    },

    submit: function() {
      if (this._validate()) {
        var attack = this.get('store').createRecord('attack-log', {
          attacker: this.get('selectedWarPlayer'),
          target: this.get('warPlayer'),
          score: this.get('selectedScore.value')
        });
        attack.save().then(saveSuccessFn.bind(this), saveErrorFn.bind(this));
      }
    }
  }
});
