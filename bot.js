const Discord = require('discord.js');
//const bot = new Discord.Client();
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
      usage: "!rlstats <Steam ID>"
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

//client secret: F5K-yAzV2C_gjbor-EOi0xFCYaT_PoVa

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
                    msg = RL_TRACKER_URL + accountId;
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
                    key: 'AIzaSyCXzsVCNuy1XSf26xynQHJwrQ8V0stEUoM'
                };
 
                if (args.size <= 1){
                    msg = INVALID_ARGS_MSG;
                }
                else{
                    var title = joinArgs(args);
                    search(title, opts, function(err, results) {
                        var res = results[0];
                        
                        const embed = new Discord.RichEmbed()
                            .setTitle(res["title"])
                            .setDescription(res["description"])
                            .setURL(res["link"]);

                        console.log({embed});

                        if(err) return console.log(err);
                        msg = {embed};    
                    });
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

bot.login('NDExNTQ1NzExMjA1OTQxMjU5.DWO9gg.KF4Ldj8Cz2a3OFU6AJa6MB9k2zM');

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

    return args.size == result['usage'].split(' ').size();
}

function sendMsg(channelID, msg){
    bot.sendMessage({
        to: channelID,
        message: msg
    });
}

function joinArgs(args){
    var combinedArgs = args.slice(1, args.length).join(" ");
    return combinedArgs;
}