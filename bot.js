var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

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
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !help
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: printCmds(commands)
                });
            break;

            // !jeff
            case 'jeff':
                bot.sendMessage({
                    to: channelID,
                    message: 'My name\'s Jeff!'
                });
            break;
            
            // !stats
            case 'rlstats':
                if (args.size() <= 1) {
                    bot.sendMessage({
                        to: channelID,
                        message: INVALID_ARGS_MSG 
                    });
                }
                else if (args.size() == 2) {
                    var accountId = args[1];
                    bot.sendMessage({
                    to: channelID,
                    message: RL_TRACKER_URL + accountId
                    });
                }
            break;
            
            // Just add any case commands if you want to..
         }     
    }
});

function printCmds(cmds){
    var msg = "";
    cmds.forEach(function(element) {
        var keys = Object.keys(element);
        for(var i = 0; i < keys.length(); i++){
            msg += keys[i] + ": " + cmd[keys[i]] + "\n";
        }
        msg += "\n";
    });

    return msg;
}