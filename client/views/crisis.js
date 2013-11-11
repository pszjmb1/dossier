/**
 * Template helpers for Dossier crisis
 */

Template.crisis.name = function () {
  return this.name;
};

Template.crisis.name_class = function () {
  return this.name ? '' : 'empty';
};

Template.crisis.editing = function () {
  //return Session.equals('editing_crisisname', this._id);
  return false;
};