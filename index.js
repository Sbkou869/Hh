const bot = new aoijs.Bot({
token: 'token_bota',
prefix: ["$getServerVar[prefix]",],
applicationCache: true,
mobile: true,
}) 

bot.onMessage()
bot.onInteractionCreate();


bot.status({
  text: "Музыка",
  type: "LISTENING",
  time: 80
});

bot.variables({
prefix: ";",
emcolor: "ff0000",
volume: "100",
reward: "",
host: "", 
ssystem: "",
player: "",
messages: "0",
msg: "", 
xp: "0",
lvl: "0",
leveling: "0",
nlvlm: "{user.mention} ты поднял свой уровень!",
economy: "on",
chan: "",
suggestchannel: "",
ccmd: "",
cdes: "",
rsystem: "",
Blacklist: "false", 
title: "",
description: "",
footer: "",
automeme: "false",
color: "ff0000",
cmd: "0",
schan: "",
smsg: "", 
sc: "",
Warn: "0",
Warnreason: "0",
Premium: "Отсутствует", 
Prem: "false",
язык: "английский",
badges: "",
giveaway:"",
rep: "0",
mute: "",
AFK: "off",
time: "",
слот1: "", 
слот2: "", 
слот3: "", 
слот4: "", 
слот5: "", 
слот6: "", 
слот7: "", 
слот8: "",
слот9: "", 
слот10: "", 
слот11: "",
слот12: "",
слот13: "", 
слот14: "", 
слот15: "", 
слот16: "", 
слот17: "", 
слот18: "", 
слот19: "", 
слот20: "",
слотЦена1: "Отсутствует",
слотЦена2: "Отсутствует",
слотЦена3: "Отсутствует",
слотЦена4: "Отсутствует",
слотЦена5: "Отсутствует",
слотЦена6: "Отсутствует",
слотЦена7: "Отсутствует",
слотЦена8: "Отсутствует",
слотЦена9: "Отсутствует",
слотЦена10: "Отсутствует",
слотЦена11: "Отсутствует",
слотЦена12: "Отсутствует",
слотЦена13: "Отсутствует",
слотЦена14: "Отсутствует",
слотЦена15: "Отсутствует",
слотЦена16: "Отсутствует",
слотЦена17: "Отсутствует",
слотЦена18: "Отсутствует",
слотЦена19: "Отсутствует",
слотЦена20: "Отсутствует",
author: "",
errorsk: "{title:❌ Ошибка}{color:92d9e6}",
errorcol: "", 
errortitle: "", 
rand: "",
col: "92d9e6",
money: "0",
bank: "0",
music: "on",
shop: "on",
moderator: "on", 
bot: "on", 
user: "on", 
ll: "on",
Developers: "on",
contest: "on", 
captcha: "off",
randomcaptcha: "",
valuta: ""
})

bot.musicStartCommand({
  channel: "$channelID",
  code: `$title[:notes: • **Песня успешно запущена!**] 
$description[Сейчас играет: [$songInfo[publisher]\\]($songInfo[publisher_url])
Длительность: $songInfo[duration] 
Плейлист: [$songInfo[title]\\]($songInfo[url])
$thumbnail[$songInfo[thumbnail]]
$footer[Заказ от $userTag[$songInfo[userID]];$userAvatar[$songInfo[userID]]]
$color[#add8e6]
`
});

bot.musicEndCommand({
channel: "$channelID",
code: `
$title[:mute: • **Выход из голосового канала!**] 
$description[**Я покинул голосовой канал так как больше песня не играет!**] 
$color[#86ed72]
`
})

bot.botJoinCommand({
  channel: "$randomChannelID",
  code: `
$title[🕑Инфо]
$description[***Привет
Спасибо что вы выбрали иммено меня!!, я отличный бот.

Узнать о всех командах,списках коммандой $getServerVar[prefix]help

Удачи тебе в использование меня!***]
$thumbnail[$userAvatar[$clientID]
$image[https://media.discordapp.net/attachments/822533019725201449/845967126259171348/4444441.png]
$color[00FF00]
`})

bot.timeoutCommand({
 
 
code: `$sendDM[$timeoutdata[userID2];you have been unbanned in $serverName[$timeoutdata[serverID]]]
$unban[$timeoutdata[userID2]]`
 
})

bot.timeoutCommand({
 
code: `$sendDM[$timeoutdata[userID];you have been unmuted in $serverName[$timeoutdata[serverID]]]
$takeRole[$timeoutdata[userID];$getServerVar[mute;$timeoutdata[serverID]]]`
 
});


bot.awaitedCommand({
  name: "awaitX",
  code: `$addReactions[❌]`
}) 

bot.awaitedCommand({
  name: "awaitX1", 
  code: `$addReactions[✔️] `
})

bot.onReactionAdd()
bot.onReactionRemove()
bot.onLeave()
bot.onJoined()
bot.onGuildJoin()
bot.onGuildLeave()
bot.onBanAdd()
bot.onInviteCreate()
bot.onChannelDelete()
bot.onChannelUpdate()
bot.onChannelCreate()
bot.onRoleUpdate()
bot.onRoleDelete()
bot.onRoleCreate()
bot.onBanRemove()
bot.onMessageUpdate()
bot.onUserUpdate()
bot.onMessageDelete()
bot.onVoiceStateUpdate()
bot.onMemberUpdate
