const Discord = require('discord.js');
const client = new Discord.Client();
var logger = require('winston');
var auth = require('./auth.json');

/*client.on('ready', () => {
 
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});
*/
client.login('NDExNTQ1NzExMjA1OTQxMjU5.DV9SAQ.bGfXhcJSQOzNFYQSoGfjh');

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

//client secret: F5K-yAzV2C_gjbor-EOi0xFCYaT_PoVa

bot.on('ready', function (evt){
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    console.log("hi");
});
bot.on('message', function (user, userID, channelID, message, evt){
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
                sendMessage(channelID, printCmds(commands));
            break;

            // !jeff
            case 'jeff':
                msg = 'My name\'s Jeff!';
                sendMessage(channelID, msg);
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
                sendMessage(channelID, msg);
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
//bot.login("NDExNTQ1NzExMjA1OTQxMjU5.DV9SAQ.bGfXhcJSQOzNFYQSoGfjh")

function printCmds(cmds){
    var msg = "";
    cmds.forEach(cmd, function(element){
        var keys = Object.keys(element);
        for(var i = 0; i < keys.length(); i++){
            msg += keys[i] + ": " + cmd[keys[i]] + "\n";
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