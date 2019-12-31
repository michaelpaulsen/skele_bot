const cmds = [ 
	{ title: "dice n", discription:"roll a n sided dice (n = 6 by default)"},
	{ title: "mcseed", discription:"display the seed for my ssp world"},
	{ title: "discord", discription:"display the link to my discord"},
	{ title: "YT", discription:"display the link to my main YT channel"},
	{ title: "manacolors", discription:"display the colors of mana"},
	{ title: "help", discription:"display this dialog"}
]
/**
*list of commands to use for the help command
*/
	const tmi = require('tmi.js');
// Define configuration options
const opts = {
  identity: {
    username: 'skeleton_craft',
    password: 'oauth:sk3um5gtdozw0vzzc91pqib8fk7xrl'
  },
  channels: [
    'skeleton_craft'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
/** 
* the required things for the twitch chat_bot 
*/

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
	const seed = "hyrule";
	console.log(msg);
  // Remove whitespace from chat message
  const commandName = msg.trim();
  const cd = "^";
  const cmd = commandName.split(cd)[1];
  // If the command is known, let's execute it
  if (commandName.includes(cd + 'dice')) {
		var max = 6 
		if(commandName.split(' ').length > 1){
			max = parseInt(commandName.split(' ')[1]);
		}
		console.log(max);
		const num = rollDice(max);
		client.say(target, `You rolled a ${num}`);
		console.log(`* Executed ${cmd} command and rolled a ${num}`);
  } 
  else if( commandName === cd + "mcseed" ) {
  client.say(target, `the seed for my ssp world is "${seed}"`);
    console.log(`* Executed  command ${cmd} `);
  }
  else if( commandName === cd + "discord"){
	 client.say(target, "My discord is : https://discord.gg/eUCdFs9")
    console.log(`* Executed  command ${cmd} `);
  }
  else if( commandName === cd + "YT"){
	 console.log(`* Executed  command ${cmd} `);
	 client.say(target, "My YT is : https://www.youtube.com/channel/UCKligdusCYH4FZjJ1CGIMKw")
	  
  }
  else if( commandName === cd + "help" ) { 
	let str = ""
	for(var x = 0; x<cmds.length;x++){
		str += cd + cmds[x]["title"] + " : "  + cmds[x]['discription'] + ";";
	}
	client.say(target, str);
	console.log(`* Executed  command ${cmd} `);
  }
  else if( commandName === cd + "manacolors" ) {
	  const colors = ['red','green','blue','black','white']
	  var str = "in magic the gathering the colors of mana are"; 
	  for(var x = 0; x< colors.length; x++){
		  str += colors[x];
		  str += " ";
	  }
	  client.say(target,str);
  }
   else if( commandName != undefined) {
	  console.log(`unkown command used: ` + commandName.split(cd)[1]);
  }
  /** possible to change to a switch staitment*/
}

// Function called when the "dice" command is issued
function rollDice (s) {
  const sides = s;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  console.log(`* chat_bot started on ` + (new Date()).toDateString());
}