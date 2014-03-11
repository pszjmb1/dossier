/**
 *  Returns a resource from a Media object if it can find one.
 */
 function getResource(context){
  item = Media.findOne({resource:""+context.resource});
  if(item){
   
    return item.resource;
   
  } else{
    return null;
  }
}

/**
 * Returns the resource from the corresponding Media object to "this"
 */
 Template.medium.resource = function () {
   //alert(getResource(this));
  
  return getResource(this);
};




Template.timeline.events({
  'click input' : function (e) {
    // template data, if any, is available in 'this'
   if (typeof console !== 'undefined'){
     // console.log("Display Timeline");
     e.preventDefault();
    currentCrisis = Crises.findOne(Session.get('currentCrisisId'));
      
        timelineObj=(Media.findOne({resource: currentCrisis.dossier.media[0].resource}));
        Session.set('currentMediaItemId', this.resource);
      
  	

     
      var dataObj = {
    "timeline":
    {
       
        "headline":timelineObj.headline,
        "type":'default',
		"startDate":timelineObj.startDate,
                 "endDate":timelineObj.endDate,
		"text":timelineObj.text,
		"asset":
        {
            "media":timelineObj.resource,
             "credit":"",
            "caption":""
        },
        "date": [
            {
                "startDate":timelineObj.date[0].startDate,
                "endDate":timelineObj.date[1].endDate,
                "headline":timelineObj.date[2].headline,
                "text":timelineObj.date[3].text,
                "asset":
                {
                    "media":timelineObj.date[4].asset[0].media,
                    "credit":"",
                    "caption":""
                }
            }
 	]
      }

}
      createStoryJS({
                        type:       'timeline',
                        width:      '1000',
                        height:     '480',
                        source: dataObj
      });
    }
  }
});
          
