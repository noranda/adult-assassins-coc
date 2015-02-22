import Ember from 'ember';

var { get } = Ember;

export default Ember.Component.extend({
  classNames: ['btn-group'],
  items: [],
  selectedItem: null,

  defaultPrompt: 'Select',
  alwaysUseDefaultPrompt: false,
  selectedPrompt: "%@1",

  itemPrompt: function() {
    var item = this.get('selectedItem');
    var name = get(item, 'name');
    if (get(name, 'string')) {
      name = get(name, 'string');
    }
    if (this.get('alwaysUseDefaultPrompt') || Ember.isNone(item)) {
      return this.get('defaultPrompt');
    }

    return (this.get('selectedPrompt') || "").fmt(name, this.get('defaultPrompt')).htmlSafe();
  }.property('defaultPrompt', 'alwaysUseDefaultPrompt', 'selectedPrompt', 'selectedItem.name'),

  itemsList: function() {
    var items = this.get('items');
    var selectedItem = this.get('selectedItem');

    var proxiedItemsList = [];
    for (var i = 0, len = items.length; i < len; ++i) {
      proxiedItemsList.push({
        selected: items[i] === selectedItem,
        content: items[i]
      });
    }

    return proxiedItemsList;
  }.property('items.[]', 'selectedItem'),

  actions: {
    selectItem: function(item) {
      this.set('selectedItem', get(item, 'content'));
    }
  }
});
