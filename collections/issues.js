

/**
* Server side function called by client to update Issues.
*/
Meteor.methods({
        majreport:function(majreportAttribs) {
                
                if (!majreportAttribs.media)
                        throw new Meteor.Error(422, 'Please fill in the media Url.');
                if (!majreportAttribs.mediatype)
                        throw new Meteor.Error(422, 'Please choose the media type.');
                
                
        }
});
