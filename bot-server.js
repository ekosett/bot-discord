require("dotenv").config();
const Discord = require('discord.js');
const TelegramBot = require('node-telegram-bot-api')
const cron = require('cron').CronJob;

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

const idOrang = [ 
    '502768280419827712',
    '583687894112272386',
    '521585525228961793',
    '637537459206488075',
    '516287066598932496',
    '480223411352764416'
]

bot.once('ready', function() {
    console.clear();
    console.log('Logged in as %s\n', bot.user.username);

    taskCron("0 20 * * *", async function () { // cron time job asterix (menit, jam, day(month), bulan, day(week))
        bot.channels.cache.get('481721469714563074').send("!ready") // channel mabar pubg
    })
});

bot.on('message', async(msg) => {
    msg.content = msg.content.toLocaleLowerCase();
    
    let messageBadwords = BadWords(BadWordsList, msg.content);
    if(messageBadwords.length > 0){
        msg.reply(messageBadwords)
    }else if (msg.content === 'ping'){
        msg.reply('siap bos !');
    }else if (msg.content === '!ready'){
        let message = 'Yok '
        let broadcastedUser = idOrang.filter(id => id != msg.author.id)
        broadcastedUser.forEach(userId => {
            message += `<@${userId}> `
        });
        msg.channel.send(message)
        // msg.channel.send(`Yok <@502768280419827712> <@583687894112272386> <@521585525228961793> <@637537459206488075> <@516287066598932496>`)
    }else if (msg.content === "!lama"){
        msg.channel.send("Sabar cuk")
    }else if (msg.content === "!list-command"){
        let text = `List Command\n!ping = Test Bot Online Apa Gk\n!ready = Ngajak Maen`
        msg.channel.send(text);
    }
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


function taskCron(date, task) {
    const job = new cron(date, function () {
        task();
    });
    job.start();
    return job;
}