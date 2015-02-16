import DS from 'ember-data';

var { moment } = window;

export default DS.Model.extend({
  startDate: DS.attr('date'),
  opposingClan: DS.belongsTo('clan'),

  isOngoing: function() {
    var startDate = moment(this.get('startDate'));
    var now = moment();

    return now.isAfter(startDate) && !this.get('isFinished');
  }.property('startDate', 'isFinished'),

  isFinished: function() {
    var endDate = moment(this.get('startDate')).add(2, 'days');
    var now = moment();

    return now.isAfter(endDate) || now.isSame(endDate);
  }.property('startDate')
});
