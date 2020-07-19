const RssFeedEmitter = require('rss-feed-emitter');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("WEBHOOK LINK HERE");

const feeder = new RssFeedEmitter({skipFirstLoad: true});
console.log('feeder started')

feeder.add({
  url: 'https://gov.eclipse-rp.net/app.php/feed',
  refresh: 2000,
  eventName: 'eclipseFeed'
});


// this item will only be from the new items, not from old items.
feeder.on('eclipseFeed', function(item) {
    var itemCat = item["atom:category"]
    if(itemCat["@"].scheme === "https://gov.eclipse-rp.net/viewforum.php?f=707"){
        const embed = new MessageBuilder()
        .setTitle('**' + item.author + '** replied to/posted a application.')
        .setURL(item.link)
        .setColor('#a16d32')
        .setThumbnail('https://i.imgur.com/5KfmGoB.png')
        .setFooter('Recruitment Desk')
        .setTimestamp();
        hook.send(embed);
        
    }
    if(itemCat["@"].scheme === "https://gov.eclipse-rp.net/viewforum.php?f=708"){
          const embed = new MessageBuilder()
          .setTitle('**' + item.author + '** replied to/posted a reinstatment.')
          .setURL(item.link)
          .setColor('#a16d32')
          .setThumbnail('https://i.imgur.com/5KfmGoB.png')
          .setFooter('Reinstatement & Transfer Desk')
          .setTimestamp();
          hook.send(embed);
          
      }
      if(itemCat["@"].scheme === "https://gov.eclipse-rp.net/viewforum.php?f=1255"){
              const embed = new MessageBuilder()
              .setTitle('**' + item.author + '** replied to/posted a tour.')
              .setURL(item.link)
              .setColor('#a16d32')
              .setThumbnail('https://i.imgur.com/5KfmGoB.png')
              .setFooter('Public Tours')
              .setTimestamp();
              hook.send(embed);
              
          }
});
feeder.on('error', console.error);