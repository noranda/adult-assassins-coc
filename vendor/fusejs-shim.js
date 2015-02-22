(function() {
/* globals define, Fuse */

  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';

      return values;
    });
  }

  generateModule('fuse', { 'default': Fuse });
})();
