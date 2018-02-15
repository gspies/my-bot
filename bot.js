
var rl_scraper = require('./rl_scraper.js');
const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var search = require('youtube-search');

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
    }
];

var RL_TRACKER_URL = 'https://rocketleague.tracker.network/profile/steam/';
var INVALID_ARGS_MSG = 'Invalid arguments. Type !help for more info';

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
                    var accountId = args[1];
                    var ratings = getRLData(accountId);
                    msg = ratings;
                }
                mesg.reply(msg);
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
                    key: auth.yt-token;
                };
 
                if (args.size <= 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    var title = joinArgs(args);
                    search(title, opts, function(err, results) {
                        var res = results[0];
                        var attachment = new Discord.Attachment(res["link"], title);
                        /*const embed = new Discord.RichEmbed()
                            .setTitle(res["title"])
                            .setDescription(res["description"])
                            .setURL(res["link"]);
                        */
                        console.log(attachment);

                        if(err) return console.log(err);
                        msg = attachment;    
                    });
                }
                mesg.sendFile(title, msg);

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

bot.login('auth.disc-token');

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
    console.log(args.length, result['usage'].split(' ').length);
    return args.length == result['usage'].split(' ').length - 1;
}

function joinArgs(args){
    var combinedArgs = args.slice(1, args.length).join(" ");
    return combinedArgs;
}