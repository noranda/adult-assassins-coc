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

  isPreparing: function() {
    var startDate = moment(this.get('startDate'));
    var warStartDate = moment(startDate).add(1, 'days');
    var now = moment();

    return (now.isAfter(startDate) || now.isSame(startDate)) && now.isBefore(warStartDate);
  }.property('startDate'),

  isWarring: function() {
    var startDate = moment(this.get('startDate'));
    var warStartDate = moment(startDate).add(1, 'days');
    var endDate = moment(startDate).add(2, 'days');
    var now = moment();

    return (now.isAfter(warStartDate) || now.isSame(warStartDate)) && now.isBefore(endDate);
  }.property('startDate', 'isFinished'),

  isFinished: function() {
    var endDate = moment(this.get('startDate')).add(2, 'days');
    var now = moment();

    return now.isAfter(endDate) || now.isSame(endDate);
  }.property('startDate')
});
