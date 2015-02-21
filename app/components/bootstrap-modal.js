import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['modal'],
  classNameBindings: ['fade'],
  fade: false,

  title: null,
  okBtnTitle: 'Close',
  submitBtnTitle: null,
  formClass: '',
  submitBtnClass: 'btn-primary',
  disableSubmitBtn: false,

  displaySubmitBtn: Ember.computed.notEmpty('submitBtnTitle'),
  displayCloseBtn: Ember.computed.notEmpty('okBtnTitle'),

  willInsertElement: function() {
    this.$().modal().one('hidden.bs.modal', () => {
      this.sendAction('close');
    });
  },

  actions: {
    close: function() {
      this.$().modal('hide');
    },

    submit: function() {
      this.sendAction('submit');
    }
  }
});
