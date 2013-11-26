/**
 * Server fixture data for Dossier
 */

 if (Crises.find().count() === 0) {
   Crises.insert({
    name: 'Tsunami',
    media: [{
      resource: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/332/cache/japan-earthquake-tsunami-nuclear-unforgettable-pictures-wave_33291_600x450.jpg', order:3
    }, {
      resource:'http://i.dailymail.co.uk/i/pix/2011/03/15/article-0-0B2D7C2600000578-689_964x641.jpg', order:1
    }, {
      resource:'http://toronto.ctvnews.ca/polopoly_fs/1.1232514!/httpImage/image.jpg_gen/derivatives/landscape_960/image.jpg', order:2
    }, {
      resource: 'http://www.nce.co.uk/pictures/586xAny/8/4/1/1212841_dfg.jpg', order:0
    }]

  });

   Crises.insert({
    name: 'Explosion',
    media: [
    {
      resource: 'http://www.youtube.com/embed/XGSy3_Czz8k', order:1
    }, {
      resource: 'http://www.nce.co.uk/pictures/586xAny/8/4/1/1212841_dfg.jpg', order:2
    }, {
      resource: 'http://www.worldwildlife.org/who/index.html', order:3
    }]
  });

   Crises.insert({
    name: 'Catastrophic data loss',
    media: [{
      resource: 'http://www.codinghorror.com/blog/2009/12/our-disaster-recovery-plan.png', order:1
    }, {
      resource: 'http://ctmalaga.com.au/wp-content/uploads/2013/01/Lostdata-448x205.jpg', order:0
    }, {
      resource: 'http://www.nce.co.uk/pictures/586xAny/8/4/1/1212841_dfg.jpg', order:2
    }]
  });

   Media.insert({
    resource: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/332/cache/japan-earthquake-tsunami-nuclear-unforgettable-pictures-wave_33291_600x450.jpg',
    mediatype: 'image/jpeg'    
  });

   Media.insert({
    resource: 'http://www.youtube.com/embed/XGSy3_Czz8k',
    mediatype: 'video/fla'    
  });


   Media.insert({
    resource: 'http://i.dailymail.co.uk/i/pix/2011/03/15/article-0-0B2D7C2600000578-689_964x641.jpg',
    mediatype: 'image/jpeg'    
  });

   Media.insert({
    resource: 'http://www.youtube.com/embed/XGSy3_Czz8k',
    mediatype: 'image/jpeg'    
  });

   Media.insert({
    resource: 'http://www.nce.co.uk/pictures/586xAny/8/4/1/1212841_dfg.jpg',
    mediatype: 'image/jpeg'    
  });

   Media.insert({
    resource: 'http://www.codinghorror.com/blog/2009/12/our-disaster-recovery-plan.png',
    mediatype: 'image/jpeg'    
  });

   Media.insert({
    resource: 'http://www.worldwildlife.org/who/index.html',
    mediatype: 'html/txt'    
  });

   Media.insert({
    resource: 'http://toronto.ctvnews.ca/polopoly_fs/1.1232514!/httpImage/image.jpg_gen/derivatives/landscape_960/image.jpg',
    mediatype: 'image/jpeg'     
  });
 }
