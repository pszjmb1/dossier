/**
 * Server fixture data for Majority Report
 */

 /**
  * Convinience function for inserting provenance records into DB and returning their IDs
  */
  function insertProv(){
    return Provenance.insert({
            "entity": { // Map of entities by entities' IDs
          },
          "activity": { // Map of activities by IDs
          },
          "agent": { // Map of agents by IDs
          },
         // <relationName>: { // A map of relations of type relationName by their IDs
         // },
          //...
          "bundle": { // Map of named bundles by IDs
          }
        } );
  }

  if (Crises.find().count() === 0) {
  //Death of Ian Tomlinso (IT) is the canonical example. The other examples are currently left for posterity until system updates taking in the IT structure are completed. Todo: remove or convert the others.
  Crises.insert({
    name: 'Death of Ian Tomlinson',
    dossier:{
      media: [{
        resource: 'http://timestreams.org/wp-content/uploads/2013/12/CR_027316.jpg', order:0
      },{
        resource: 'http://timestreams.org/wp-content/uploads/2013/12/Ian-Tomlinson-at-7.08pm-o-001.jpg', order:1
      },{
        resource: 'http://timestreams.org/wp-content/uploads/2013/12/Ian_Tomlinson_as_he_fell_2.jpg', order:2
      },{
        resource: 'http://timestreams.org/wp-content/uploads/2013/12/Ian_Tomlinson_38926c.jpg', order:3
      },{
        resource: 'http://timestreams.org/wp-content/uploads/2013/12/ian-Tomlinson3.jpg', order:4
      }]  
    },
    provenance:insertProv(),
      // Based on ideas from http://www4.ncsu.edu/~abaikad/narreme-proposal-compressed.pdf
      //Note this allows us to capture the narrative (fabula), but not the syuzhet
      narrative:{
        axes:{},
        narremes: [{
          id:"nar_1",
          title:"There once was a man named Ian Tomlinson.",
          axis_states:[{axis:null, level:null}],
          media:[],
          attributes:[] // using denormalised version for convinience
        },{
          id:"nar_2",
          title:"Ian Tomlinson was struck over the head by a police officer.",
          axis_states:[{axis:null, level:null}],
          media:[],
          attributes:[] // using denormalised version for convinience
        }],
        relations: [{
          narreme1:"nar_1", narreme2:"nar_2", type: "temporal", parameters:[], media:[]
        },{
          narreme1:null, narreme2:null, type: "causal", parameters:[], media:[]
        },{
          narreme1:null, narreme2:null, type: "intentional", parameters:[], media:[]
        }],
        provenance:insertProv()
      }
    });


  Media.insert({
    resource: 'http://timestreams.org/wp-content/uploads/2013/12/CR_027316.jpg',
    mediatype: 'image/jpeg',
    provenance:insertProv(),
      attributes:[{shortdesc:'Once upon a time there was a man named Ian Tomlinson.'},{author:'Joe Bloggs'},{time:'12:42pm GMT'}] // using denormalised version for convinience
    });

  Media.insert({
    resource: 'http://timestreams.org/wp-content/uploads/2013/12/Ian-Tomlinson-at-7.08pm-o-001.jpg',
    mediatype: 'image/jpeg',
    provenance:insertProv(),
      attributes:[] // using denormalised version for convinience    
    });

  Media.insert({
    resource: 'http://timestreams.org/wp-content/uploads/2013/12/Ian_Tomlinson_as_he_fell_2.jpg',
    mediatype: 'image/jpeg',
    provenance:insertProv(),
      attributes:[] // using denormalised version for convinience    
    });

  Media.insert({
    resource: 'http://timestreams.org/wp-content/uploads/2013/12/Ian_Tomlinson_38926c.jpg',
    mediatype: 'image/jpeg',
    provenance:insertProv(),
      attributes:[] // using denormalised version for convinience   
    });

  Media.insert({
    resource: 'http://timestreams.org/wp-content/uploads/2013/12/ian-Tomlinson3.jpg',
    mediatype: 'image/jpeg',
    provenance:insertProv(),
      attributes:[] // using denormalised version for convinience     
    });


  HORZ_MAJREP_Properties.insert({
    userId:'Default',
    //mapapiKey: '...',
    //Origin of map = Horizon ;)
    mapOriginLat:52.95195397175029,
    mapOriginLon:-1.1837467644363642,
    mapOriginLevel:13,
    mapStyle: 997, //CloudMade's "Fresh" design
    mapAttribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    mapProvider: 'CloudMade'
  });
}
