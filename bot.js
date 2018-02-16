
//var rl_scraper = require('./rl_scraper.js');
const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var search = require('youtube-search');
var request = require('request');
var cheerio = require('cheerio');

console.log("hello");

//valid commands
var commands = [
    { name: "help",
      description: "Displays all valid commands and usage information",
      usage: "!help"
    },
    { name: "jeff",
      description: "My name's Jeff!",
      usage: "!jeff"
    },
    { name: "rlstats",
      description: "Shows statistics from rocketleague.tracker.network when ID is given",
      usage: "!rlstats <SteamID>"
    },
    { name: "greg",
      description: "Displays :gregW: emote",
      usage: "!greg"
    },
    { name: "yt",
      description: "Searches for and provides link to youtube video specified",
      usage: "!yt <title>"
    },
    { name: "op.gg",
      description: "Provides stats from op.gg when given a username",
      usage: "!op.gg <username>"
    },
    { name: "rs",
      description: "Provides high scores from runescape API",
      usage: "!rs <username>"
    }
];

var RL_TRACKER_URL = 'https://rocketleague.tracker.network/profile/steam/';
var RS_URL = 'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=';
const INVALID_ARGS_MSG = 'Invalid arguments. Type !help for more info';
const NUM_SKILLS = 24;
var OPGG_URL = "http://na.op.gg/summoner/userName=";


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
})

bot.on('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    
});

bot.on('message', mesg => {

    console.log(mesg.content);
    var message = mesg.content;
     
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        console.log(args);
        var cmd = args[0];
        var msg;
        args = args.splice(1);
        switch(cmd) {
            
            // !help
            case 'help':
                mesg.reply("\n" + printCmds(commands));
            break;

            // !jeff
            case 'jeff':
                msg = 'My name\'s Jeff!';
                mesg.reply(msg);
                
            break;
            
            // !stats
            case 'rlstats':
                if (!validateArgs('rlstats', args)){
                    msg = INVALID_ARGS_MSG;
                }
                else {
                    var accountId = args[0];

                    var url = 'http://rltracker.pro/profiles/' + accountId + '/steam'
                    console.log(url);
                    var ratings = ["Solo: ", "Doubles: ", "Solo Standard: ", "Standard: "];
                    request(url, function (error, response, html) {
      
      
                      if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(html);
                        var count = 0;
                        console.log(error);
                        $('div.rating').each(function(i, element){
                          var a = $(this).text();
                          a = a.replace("Rating ", "");
                          if (count < 4){
                            
                            console.log(ratings[count]);
                            ratings[count++] += a;
                            console.log(a);
                          }
                          
                        });
                        mesg.reply(ratings);
                        
                      }
                    });
                }
                
            break;

             // !greg
            case 'greg':
                if (!validateArgs('greg', args)){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    const gregW = bot.emojis.find("name", "gregW");
                    msg = `${gregW}`;
                }
                mesg.reply(msg);
            break;

            // !yt
            case 'yt':
                var opts = {
                    maxResults: 1,

                    key: auth.yttoken

                };
                var embed;
                if (args.size < 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    var title = joinArgs(args);
                    search(title, opts, function(err, results) {
                        var res = results[0];
                        //var attachment = new Discord.Attachment(res["link"], title);
                        embed = new Discord.RichEmbed()
                            .setTitle(res["title"])
                            .setDescription(res["description"])
                            .setThumbnail(res["thumbnails"]["default"]["url"])
                            .setURL(res["link"]);
                        console.log(results);
                        console.log(res["thumbnails"]["default"]["url"]);
                        mesg.channel.sendEmbed(embed);

                        if(err) return console.log(err);
                        //msg = attachment.url;    
                    });
                }
                
            break;

            // !op.gg
            case 'op.gg':
 
                if (args.size <= 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    var username = joinArgs(args, "+");
                    //username = replaceSpace(username, "+");
                    var url = OPGG_URL + username;
                }
                mesg.reply(url);

            break;
            
            // !rs
            case 'rs':
                var stats = -1;
                if (args.size < 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    var username = joinArgs(args, "%20");
                    var url = RS_URL + username;
                    msg = rsStats(url);
                }
                mesg.reply(msg);

            break;
            
            // Just add any case commands if you want to..
         }     
    }
});

bot.on("presence", function(user, userID, status, game, event) {
    console.log(user + " is now: " + status);
});

bot.on("any", function(event) {
    /*console.log(rawEvent)*/ //Logs every event
});


bot.login(auth.disctoken);


function printCmds(cmds){
    var msg = "";
    
    cmds.forEach(function(element){
        var keys = Object.keys(element);
        for(var i = 0; i < keys.length; i++){
            msg += keys[i] + ": " + element[keys[i]] + "\n";
        }
        msg += "\n";
    });

    return msg;
}

function validateArgs(cmdName, args){
    //get correct object and verify number of args
    var result = commands.filter(function(cmds){
        return cmds.name == cmdName;
    })
    var result = result[0];
    
    return args.length == result['usage'].split(' ').length - 1;
}

function joinArgs(args, delim){
    var combinedArgs = args.join(" ");
    var reg = new RegExp(" ", 'g');
    combinedArgs = combinedArgs.replace(reg, delim);

    return combinedArgs;
}

/*function replaceSpace(str, delim){
    var reg = new RegExp(" ", 'g');
    str = str.replace(reg, delim);
    return str;
}*/

function rsStats(url){
    var details = [ 
        {'Rank': 0},
        {'Level': 0},
        {'XP': 0}
    ];
    var stats = [
        'Overall: ',
        'Attack: ',
        'Defense: ',
        'Strength: ',
        'Hitpoints: ' ,
        'Ranged: ' ,        
        'Prayer: ' ,
        'Magic: ' ,
        'Cooking: ' ,
        'Woodcutting: ' ,
        'Fletching: ' ,
        'Fishing: ' ,
        'Firemaking: ' ,
        'Crafting: ' ,
        'Smithing: ' ,
        'Mining: ' ,
        'Herblore: ' ,        
        'Agility: ' ,
        'Thieving: ' ,
        'Slayer: ' ,
        'Farming: ' ,
        'Runecraft: ' ,
        'Hunter: ' ,
        'Construction: '
    ];

    request(url, function (error, response, html) {
      console.log("in request");
      console.log(error);
      console.log(response); 
      if (!error && response.statusCode == 200) {
        //var $ = cheerio.load(html);
        console.log(html);
        var prettyHtml = html.split("\n");
        for (var i = 0; i < NUM_SKILLS; i++){
            var stat = prettyHtml[i].split(',');
            
            //console.log("stat",stat);
            //console.log("stats[i]",stats[i]);
            //console.log("stats[i].value[j]",stats[i].Rank);
            
            if(stat.length == 3){
                /*stats[i]["Rank"] = stat[0]; 
                stats[i]["Level"] = stat[1]; 
                stats[i]["XP"] = stat[2];
                */
                /*details["Rank"] = stat[0]; 
                details["Level"] = stat[1]; 
                details["XP"] = stat[2];*/
                stats[i] += stat[2];
            }
            else{   
                stats[i] += stat[stat.length];
            }
            console.log(stats[i]);
            
        }
        console.log(stats);
        return stats.toString();
      }
      
    });
    
}



