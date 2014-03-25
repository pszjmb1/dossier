/**
 * Template helpers for Majority Report narratives
 */


 Template.narrative.rendered = function(){
    $("#radio").buttonset();
};

 Template.narrative.helpers({
  narremes: function() {
    currentCrisis = Crises.findOne(Session.get('currentCrisisId'));     
    return currentCrisis.narrative.narremes;
  }
});

Template.narrative.events({
  'click :radio': function(event, template) {
    var element = template.find('input:radio[name=narremeFunction]:checked');
     Session.set('narremeFunction', element.id);

     switch(element.id){
        case "selectNarreme":
            $("#narrativegraph").css("cursor", "default");
            break;

        case "addNarreme": 
            $("#narrativegraph").css("cursor", "pointer");
            break;

        case "removeNarreme": 
            $("#narrativegraph").css("cursor", "pointer");
            break;

        case "editNarreme": 
            $("#narrativegraph").css("cursor", "default");
            break;

        case "linkNarreme":
            $("#narrativegraph").css("cursor", "default");
            break;

        case "delinkNarreme": 
            $("#narrativegraph").css("cursor", "default");
            break;

    }
  }
});