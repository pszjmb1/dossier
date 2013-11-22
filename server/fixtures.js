/**
 * Server fixture data for Dossier
 */

if (Crises.find().count() === 0) {
   Crises.insert({
    name: 'Tsunami',
    media: ['http://images.nationalgeographic.com/wpf/media-live/photos/000/332/cache/japan-earthquake-tsunami-nuclear-unforgettable-pictures-wave_33291_600x450.jpg']
  });

 Crises.insert({
    name: 'Explosion',
    media: ['http://www.youtube.com/embed/XGSy3_Czz8k', 'http://www.nce.co.uk/pictures/586xAny/8/4/1/1212841_dfg.jpg','http://www.worldwildlife.org/who/index.html']
  });

  Crises.insert({
    name: 'Catastrophic data loss',
    media: ['http://www.codinghorror.com/blog/2009/12/our-disaster-recovery-plan.png', 'http://ctmalaga.com.au/wp-content/uploads/2013/01/Lostdata-448x205.jpg','http://www.nce.co.uk/pictures/586xAny/8/4/1/1212841_dfg.jpg']
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
}
