import Ember from 'ember';
import Fuse from 'fuse';
import Suggest from 'suggest-addon/mixins/suggest';
import SuggestExtra from 'suggest-addon/mixins/suggest-extra';

var SuggestProxy = Ember.Object.extend({});

export default Ember.Component.extend(Suggest, SuggestExtra, {
  typeaheadId: null,
  attackersList: [],
  selectedWarPlayer: null,
  classNames: ['dropdown'],
  suggestStylesOn: 'position: absolute; display: block; margin-bottom: 5px;',

  didInsertElement: function() {
    this.set('doDebounce', this._searchAttackers);
  },

  prefilteredAttackersList: function() {
    return this.get('attackersList').filterBy('player.hasEmptyName', false);
  }.property('attackersList.length'),

  fuseAttackersList: function() {
    var list = this.get('prefilteredAttackersList');
    var finalList = [];
    var options = {
      keys: ['name'],
      caseSensitive: false,
      includeScore: false,
      shouldSort: true,
      threshold: 0.4
    };

    for (var i = 0, len = list.length; i < len; ++i) {
      finalList.push({
        content: list[i],
        name: list[i].get('player.name')
      });
    }

    return new Fuse(finalList, options);
  }.property('prefilteredAttackersList.length'),

  _searchAttackers: function() {
    var inputVal = this.get('inputVal');
    var suggestions = [];

    var fuseInstance = this.get('fuseAttackersList');
    var results = fuseInstance.search(inputVal);

    for (var i = 0, len = results.length; i < len; ++i) {
      suggestions.push(SuggestProxy.create({
        highlight: false,
        content: results[i].content
      }));
    }

    this.set('suggestions', suggestions);
    this.set('suggestStyles', this.get('suggestStylesOn'));
  },

  actions: {
    selectAttacker: function(suggestProxy) {
      this.set('selectedVal', suggestProxy.get('content.player.name'));
      this.set('selectedWarPlayer', suggestProxy.get('content'));
    }
  }
});
