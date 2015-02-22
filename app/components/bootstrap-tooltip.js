import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['title'],

  tooltipAnimation: true,
  tooltipContainer: false,
  tooltipDelay: 0,
  tooltipHtml: false,
  tooltipPlacement: 'top',
  tooltipSelector: false,
  tooltipTemplate: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  tooltipTrigger: 'hover focus',
  tooltipViewport: { selector: 'body', padding: 0 },

  _tooltip: null,

  click: function() {
    this.sendAction();
  },

  tooltipOptions: function() {
    return {
      animation: this.get('tooltipAnimation'),
      container: this.get('tooltipContainer'),
      delay: this.get('tooltipDelay'),
      html: this.get('tooltipHtml'),
      placement: this.get('tooltipPlacement'),
      selector: this.get('tooltipSelector'),
      template: this.get('tooltipTemplate'),
      trigger: this.get('tooltipTrigger'),
      viewport: this.get('tooltipViewport')
    };
  }.property(
    'tooltipAnimation',
    'tooltipContainer',
    'tooltipDelay',
    'tooltipHtml',
    'tooltipPlacement',
    'tooltipSelector',
    'tooltipTemplate',
    'tooltipTrigger',
    'tooltipViewport'
  ),

  _teardown: function() {
    if (this._tooltip) {
      this._tooltip.tooltip('destroy');
      this._tooltip = null;
    }
  },

  _updateTooltip: function() {
    this._teardown();
    this._tooltip = this.$().tooltip(this.get('tooltipOptions'));
  }.observes('tooltipOptions').on('didInsertElement'),

  willDestroyElement: function() {
    this._teardown();
  }
});
