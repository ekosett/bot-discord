require("dotenv").config();
const Discord = require('discord.js');
const TelegramBot = require('node-telegram-bot-api')

var bot = new Discord.Client();
let token = process.env.CLIENT_TOKEN
const bot_telegram_token = process.env.BOT_TELEGRAM_TOKEN
const bot_telegram = new TelegramBot(bot_telegram_token, { polling : true} )

const BadWordsList = [ 
  'anjing',
  'goblok',
  'jancuk',
  'babi',
  'tolol',
  'bangsat',
  'bajingan',
  'kampang',
  'memek',
  'kontol',
  'asu' ]

//   console.log(BadWords(BadWordsList, "bot baik"));
//   let messageBadwords = BadWords(BadWordsList, 'memek');
//   console.log(messageBadwords)
//   if(messageBadwords.length > 0){
//      console.log(messageBadwords)
//    }
const idOrang = [ 
    '502768280419827712',
    '583687894112272386',
    '521585525228961793',
    '637537459206488075',
    '516287066598932496'
]

bot.once('ready', function() {
    console.clear();
    console.log('Logged in as %s\n', bot.user.username);
    
});

bot.on('message', async(msg) => {
    msg.content = msg.content.toLocaleLowerCase();
    
    let messageBadwords = BadWords(BadWordsList, msg.content);
    if(messageBadwords.length > 0){
        msg.reply(messageBadwords)
    }else if (msg.content === 'ping'){
        msg.reply('siap bos !');
    }else if (msg.content === '!join'){
        console.log(msg.member.user.id)
        console.log(msg.member.user.username)
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
        }
    }else if (msg.content === '!leave'){
        const connection = await msg.member.voice.channel.leave();
    }else if (msg.content === '!ready'){
        msg.channel.send(`Yok <@502768280419827712> <@583687894112272386> <@521585525228961793> <@637537459206488075> <@516287066598932496>`)
        // const channel = bot.channels.cache.get('761069146737737763')
        // console.log("START DARI SNI")
        // const cans = bot.channels.cache.get('481721469714563074');
        // console.log(cans.members)
        // msg.channel.members.each(user => console.log(user))
        // console.log(bot.guilds.cache.get('481721469714563072').members.cache)
        // console.log(msg.member.user)
        // channel.send();
    }
  });

bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});



bot.on('messageReactionAdd', async(reaction, user) => {
    let msg = reaction.message,
      emoji = reaction.emoji;
    const person = user.id;
    console.log(person)
    // if (emoji.name == '🍉' && user.id != "711388151960043582") {
    //   message.channel.send("HI")
    //   user.id.voice.setChannel("712142435794550894");
    // }
});

bot.login(token);

function BadWords(_badWordList, _msg){
    let msg = _msg || undefined;
    let cocok = false;
    if (_badWordList !== undefined) {
        let badwordRegex = new RegExp("bot ("  + _badWordList.join('|') + ")", "g");
        msg = msg.replace(badwordRegex, function (match) {
            cocok = true;
            let text = '';
            for (let i = 0; i < match.length; i++) {
                text += match[i];
            }
            return text;
        })

        msg = msg.replace("bot " , "")
    }
    if(!cocok) return ''
    return "Lu yang " + msg
}


bot_telegram.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userChatId = msg.from.id
    const userName = msg.from.username

    // send a message to the chat acknowledging receipt of their message
    if(msg.text == "/my_chat_id") bot_telegram.sendMessage(chatId, `Chat id ${userName} : ${userChatId}`);
    
  });