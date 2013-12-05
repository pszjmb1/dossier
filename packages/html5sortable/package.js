/**
 * Package details for HTML5sortable by Ali Farhadi
 * See http://farhadi.ir/projects/html5sortable/
 * Packaged for Meteor.js by Jesse Blum
 */

 Package.describe({
  summary: "HTML5 Sortable is a non-jquery-ui based jQuery plugin to create sortable lists and grids using native HTML5 drag and drop API.\nSee http://farhadi.ir/projects/html5sortable/ for more detatils."
});

 Package.on_use(function(api) {
  api.use('jquery', 'client');
  api.add_files(['jquery.sortable.min.js'], 'client');
});