Template.timeline.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined'){
      console.log("Display Timeline");
      var dataObj = {     "timeline":     {         "headline":"Some Timeline",        "type":"default",    "text":"People say stuff",    "startDate":"2012,1,26",        "date": [            {                "startDate":"2011,12,12",         "endDate":"2012,1,27",                "headline":"Vine",                "text":"<p>Vine Test</p>",                "asset":                {                     "media":"https://vine.co/v/b55LOA1dgJU",                    "credit":"",                    "caption":"hello"                }            }        ]    } };
      createStoryJS({
                        type:       'timeline',
                        width:      '640',
                        height:     '480',
                        source: dataObj
      });
    }
  }
});