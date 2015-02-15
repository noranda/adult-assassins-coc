`import Ember from 'ember'`

###
This view is a hack around {{#link-to}} only supporting <a> tags
{{#link-to}} can be passed a `tagName` attribute to change it to other
tags, however it creates invalid HTML: <li href="...">...</li>

This view fixes that behavior by being a wrapped around {{#link-to}}:

  {{#view 'active-item-link'}}
    {{#link-to 'index'}}...{{/link-to}}
  {{/view}}

It works by using childViews.firstObject (which will be the {{#link-to}} view),
and monitors that object for its `active` state to change. When it does, the
active state on this view changes to match it, returning HTML like this:

<li class="active">
  <a href="/" class="active">...</a>
</li>
###
ActiveItemLinkView = Ember.View.extend(
  tagName: 'li'
  classNameBindings: ['active']

  active: (->
    @get('childViews.firstObject.active')
  ).property('childViews.firstObject.active')
)

`export default ActiveItemLinkView`
