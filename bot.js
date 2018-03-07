
//var rl_scraper = require('./rl_scraper.js');
const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var search = require('youtube-search');
var request = require('request');
var cheerio = require('cheerio');

console.log("hello");


var RL_TRACKER_URL = 'https://rocketleague.tracker.network/profile/steam/';
var RS_URL = 'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=';
const INVALID_ARGS_MSG = 'Invalid arguments. Type !help for more info';
const NUM_SKILLS = 24;
var OPGG_URL = "http://na.op.gg/summoner/userName=";
var BUILD_URL = "http://champion.gg/champion/";

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
    },
    { name: "rlcmp",
      description: "Compares two rocket league accounts based on ranked stats",
      usage: "!rlcmp <SteamID> <SteamID>"
    },
    { name: "build",
      description: "Displays the most common build path for a given champion",
      usage: "!build <champion>"
    }
];





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
                var ratings = [
                    "Solo: ", 
                    "Doubles: ", 
                    "Solo Standard: ", 
                    "Standard: "
                ];
                if (!validateArgs('rlstats', args)){
                    msg = INVALID_ARGS_MSG;
                }
                else {
                    var accountId = args[0];

                    var url = 'http://rltracker.pro/profiles/' + accountId + '/steam'
                    console.log(url);
                    
                    request(url, function (error, response, html) {
      
      
                      if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(html);
                        var count = 0;
                        console.log(error);
                        $('div.rating').each(function(i, element){
                          var a = $(this).text();
                          a = a.replace("Rating ", "");
                          if (count < ratings.length){
                            
                            console.log(ratings[count]);
                            ratings[count++] += a;
                            console.log(a);
                          }
                          
                        });
                        mesg.reply("Stats for: " + accountID + "\n" + ratings);
                        
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
                    var title = joinArgs(args, " ");
                    
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
 
                /*if (args.size <= 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    var username = joinArgs(args, "+");
                    //username = replaceSpace(username, "+");
                    var url = OPGG_URL + username;
                }
                mesg.reply(url);
                */
            break;
            
            // !rs
            case 'rs':
                /*var stats = -1;
                if (args.size < 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    var username = joinArgs(args, "%20");
                    var url = RS_URL + username;
                    msg = rsStats(url);
                    console.log(msg);
                    mesg.reply(msg);
                }*/
                var stats = -1;

                var statNames = [
                     'Overall',
                     'Attack',
                     'Defense',
                     'Strength',
                     'Hitpoints',
                     'Ranged',        
                     'Prayer',
                     'Magic',
                     'Cooking',
                     'Woodcutting',
                     'Fletching',
                     'Fishing',
                     'Firemaking',
                     'Crafting',
                     'Smithing',
                     'Mining',
                     'Herblore',        
                     'Agility',
                     'Thieving',
                     'Slayer',
                     'Farming',
                     'Runecraft',
                     'Hunter',
                     'Construction'
                ];
                if (args.size < 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    var username = joinArgs(args, "%20");
                    var url = RS_URL + username;
                    

                    var details = [];
                    
                    var allStats = [];

                    request(url, function (error, response, html) {
                        console.log("in request");
                        console.log(error); 
                        if (!error && response.statusCode == 200) {
                            
                            var prettyHtml = html.split("\n");
                            console.log(prettyHtml);
                            for (var i = 0; i < statNames.length; i++){
                                var stat = prettyHtml[i].split(',');
                                var details2 = Object.assign({}, details);
                                if(stat.length == 3){
                                    details2['Rank'] = stat[0];
                                    details2['Level'] = stat[1];
                                    details2['XP'] = stat[2];
                                }
                                allStats[statNames[i]] = details2;
                            }
                            
                        }
                        
                        console.log(allStats);
                        console.log(printStats(allStats));

                        function printStats(allStats){
                            var msg = "";
                            for (stat in allStats){
                                console.log(stat);
                                msg += stat + "\n"
                                console.log(allStats[stat]);
                                msg += "\tRank: " + allStats[stat]['Rank'];
                                msg += "\tLevel: " + allStats[stat]['Level'];
                                msg += "\tXP: " + allStats[stat]['XP'];
                                msg += "\n";
                                
                            }
                            
                            return msg;
                        }

                        mesg.reply("I went down in your DMs");
                        mesg.author.sendMessage("Stats for: " + joinArgs(args, " ") + " \n"+ printStats(allStats) + "\n");
                    });

                    //msg = rsStats(url);
                    //console.log(msg);
                    
                }

            break;
            
            // !rlcmp
            case 'rlcmp':
 
                if (args.size != 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    //var username = joinArgs(args, "+");
                    //username = replaceSpace(username, "+");
                    //var url = OPGG_URL + username;
                }
                mesg.reply(url);
                
            break;

            // !build
            case 'build':
                console.log(args);
                if (args.size < 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    console.log("else");
                    var build = [];
                    url = BUILD_URL + args[0];
                    console.log(url);
                    request(url, function (error, response, html) {
                        console.log("in request");
                        console.log(error); 
                        if (!error && response.statusCode == 200) {
                            
                            var $ = cheerio.load(html);
                            var count = 0;
                            console.log(error);
                            $('div.build-wrapper').each(function(i, element){
                              
                              var a = $(this).attr("href");
                              console.log(a);
                              var lastIndex = a.lastIndexOf("/");
                              a = a.substr(lastIndex + 1, a.length);
                              a = a.replace("&#39;", "'");
                              //a = a.replace("Rating ", "");
                              if (count < 6){
                                
                                console.log(a);
                                build.add(a);
                                count++;
                                //ratings[count++] += a;
                                
                              }
                              
                            });
                            
                        }
                        //mesg.reply(build);
                        msg = build;
                        console.log(build);
                    });
                    
                }
                mesg.reply(msg);
                console.log(build);
            break;
            
            // !op.gg
            case 'thicc':
 
               
                mesg.reply("乇乂ㄒ尺卂 ㄒ卄丨匚 匚");
                
            break;


            // Just add any case commands if you want to..
            //TODO: RL comparison method
               
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

    console.log("args", combinedArgs);
    return combinedArgs;
}

/*function replaceSpace(str, delim){
    var reg = new RegExp(" ", 'g');
    str = str.replace(reg, delim);
    return str;
}*/

/*function rsStats(url){
    var details = [];
    
    var statNames = [
        'Overall',
        'Attack',
        'Defense',
        'Strength',
        'Hitpoints',
        'Ranged',        
        'Prayer',
        'Magic',
        'Cooking',
        'Woodcutting',
        'Fletching',
        'Fishing',
        'Firemaking',
        'Crafting',
        'Smithing',
        'Mining',
        'Herblore',        
        'Agility',
        'Thieving',
        'Slayer',
        'Farming',
        'Runecraft',
        'Hunter',
        'Construction'
    ];
    var allStats = [];

    request(url, function (error, response, html) {
        console.log("in request");
        console.log(error); 
        if (!error && response.statusCode == 200) {
            
            var prettyHtml = html.split("\n");
            //console.log(prettyHtml);
            for (var i = 0; i < statNames.length; i++){
                var stat = prettyHtml[i].split(',');
                var details2 = Object.assign({}, details);
                if(stat.length == 3){
                    details2['Rank'] = stat[0];
                    details2['Level'] = stat[1];
                    details2['XP'] = stat[2];
                }
                allStats[statNames[i]] = details2;
            }
            console.log("before return");
            return printStats(allStats);
        }
        
        //console.log(allStats);
        
        

       

    });

    function printStats(allStats){
            var msg = "";
            for (stat in allStats){
                console.log(stat);
                msg += stat + "\n"
                console.log(allStats[stat]);
                msg += "\tRank: " + allStats[stat]['Rank'];
                msg += allStats[stat]['Level'];
                msg += "\tLevel: " + allStats[stat]['Level'];
                msg += allStats[stat]['XP'];
                msg += "\tRank: " + allStats[stat]['XP'];
                msg += "\n";
                
            }
            //console.log(msg);
            return msg;
    }
    
}*/



