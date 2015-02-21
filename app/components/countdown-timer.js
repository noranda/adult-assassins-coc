import Ember from 'ember';

var { run } = Ember;
var { moment } = window;

function zeroIt(str) {
  str = `${str}`;
  if (str.length < 2) {
    str = `0${str}`;
  }

  return str;
}

export default Ember.Component.extend({
  to: null,
  clock: null,

  _initTimer: function() {
    if (this._timer) {
      run.cancel(this._timer);
      this._timer = null;
    }

    if (!Ember.isNone(this.get('to'))) {
      this._updateTimer();
    }
  }.observes('to').on('init'),

  _updateTimer: function() {
    var endDate = this.get('to');
    if (!endDate) { return; }

    var now = moment();
    var diff = moment(endDate).diff(now);
    var duration = moment.duration(diff, 'milliseconds');
    var clock = `${zeroIt(duration.hours())}:${zeroIt(duration.minutes())}:${zeroIt(duration.seconds())}`;

    this.set('clock', clock);

    this._timer = run.later(this, this._updateTimer, 1000);
  },

  willDestroyElement: function() {
    if (this._timer) {
      run.cancel(this._timer);
      this._timer = null;
    }
  }
});
