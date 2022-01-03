const bot = new aoijs.Bot({
token: 'token',
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

bot.command({
  name: "калькулятор",
  code: `$onlyIf[$message[1]!=;Попробуйте:  1 + 1]
$onlyIf[$message[2]!=; Попробуйте: 1 + 1]
$onlyIf[$message[3]!=; Попробуйте:  1 + 1]
$onlyIf[$message[4]==; Ошибка]
$onlyIf[$checkContains[$message[2];+;-;*;/]==true;$message[2] Это не математический символ! Попробуйте +,-,* или /!]
$argsCheck[>3;*Кхм...* Попробуйте что то наподобии 1 + 1]
$title[Калькулятор]
$description[
$color[FFF00]
Ответ:$if[$message[2]==+]
$sum[$message[1];$message[3]]
$endif
$if[$message[2]==-]
$sub[$message[1];$message[3]]
$endif
$if[$message[2]==*]
$multi[$message[1];$message[3]]
$endif
$if[$message[2]==/]
$divide[$message[1];$message[3]]
$endif]

$suppressErrors[Проверьте пробел между числами]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
});

bot.command({
    name: "avatar",
    aliases: ['av'],
    code: `
$if[$findMembers[$message;10;{position}]!=1]
$author[$userTag[$authorID];$authorAvatar]
$description[Пожалуста выберите следующие...

$findMembers[$message;10;**{position}.)** [{tag}](https://youtu.be/Qskm9MTz2V4=16)]]
$color[BLUE]
$awaitMessages[$authorID;1m;everything;avatar;$getVar[no] Cancelled]
$setUserVar[userav;$findMembers[$message;10;{id}]]
$elseIf[$findMembers[$message;10;{position}]==1]
$author[$userTag[$get[id]];$userAvatar[$get[id]]]
$image[$userAvatar[$get[id]?size=2048]]
$color[BLUE]
$addTimestamp
$let[id;$findMembers[$message;10;{id}]]
$endElseIf
$endIf
$onlyIf[$message!=;{execute:avatar2}]
$onlyIf[$findMembers[$message;10;{id}]!=;{execute:avatar2}]
`,
}, {
    type: "awaitedCommand",
    name: "avatar",
    code: `
$if[$isNumber[$message[1]]==true]
$author[$userTag[$get[id]];$userAvatar[$get[id]]]
$image[attachment://avatar.$get[if]]
$color[BLUE]
$addTimestamp
$attachment[$userAvatar[$get[id]];avatar.$get[if]]
$let[if;$replaceText[$replaceText[$stringEndsWith[$get[replace];png];true;png];false;gif]]
$let[replace;$replaceText[$userAvatar[$get[id]];webp;png]]
$let[id;$splitText[$message[1]]]
$textSplit[$getUserVar[userav];\n]
$elseIf[$toLowercase[$message[1]]==cancel]
$getVar[no] Отменен
$endElseIf
$else
$getVar[no] Отменен
$endIf
$suppressErrors[$getVar[no] Cancelled]
`,
}, {
    type: "awaitedCommand",
    name: "avatar2",
    code: `
$author[$userTag[$get[id]];$userAvatar[$get[id]]]
$image[attachment://avatar.$get[if]]
$color[BLUE]
$addTimestamp
$attachment[$userAvatar[$get[id]];avatar.$get[if]]
$let[if;$replaceText[$replaceText[$stringEndsWith[$userAvatar[$get[id]];png];true;png];false;gif]]
$let[replace;$replaceText[$userAvatar[$get[id]];webp;png]]
$let[id;$findUser[$message]]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
}) 

bot.command({
 name:"botinfo",
 aliases: ["bot"], 
 code:`
$title[О боте ($username[$clientID])]
 $color[BLUE]
$addField[‎;<t:$truncate[$divide[$dateStamp;1000]]>]
$addField[🏓 Статистика;
> Команд: $commandsCount
> Использованно команд: $getVar[cmd]
> Пользователей: $allMembersCount
> Каналов: $allChannelsCount
> Серверов: $serverCount;yes]
$addField[🥤 Информация;
> Создан: $creationDate[$clientID]
> Создатель: $userTag[$botOwnerID]
$addField[⚙️Префикс;
> $serverName — [$getServerVar[prefix]]
> RAM: $ram MB
> Использование процессора: $cpu%
> Пинг: $ping ms
> Время работы: $uptime
> Платформа: Linux;yes]
$addField[Версия;
\`1.1.3\`;no]
 $cooldown[5s;{description:Немного подождите...}{color:RED}]
$footer[$userTag;$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
}) 

bot.command({
    name: "coffee",
    code: `$title[Случайные фотографии кофе ☕]
$image[attachment://coffee.jpg]
$attachment[$jsonRequest[https://coffee.alexflipnote.dev/random.json;file;:x: API Error];coffee.jpg]
$color[$getUserVar[color]]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
}) 

bot.command({
  name: "dev",
  code: `$thumbnail[$userAvatar[853235519676874772]]
$color[00ff66]
$description[Имя: **$userTag[$botOwnerID] (<@$botOwnerID>)**
Статус: **$replaceText[$replaceText[$replaceText[$status[$botOwnerID];dnd;Онлайн!];idle;Онлайн!];offline;Оффлайн!]**
Кастом-статус: **$getCustomStatus[$botOwnerID]**
ID: **$botOwnerID**]
$author[🤖 ・ Создатель бота]
$footer[$splitText[1]#$splitText[2];$userAvatar[$clientID]]
$textSplit[$userTag[$clientID];#]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
  name: 'help',
  code: ` 
$color[$getServerVar[color]]
$thumbnail[https://images-ext-2.discordapp.net/external/BuNJAuAa1iKgs12v5LG4P-Xp7qyGpBp1RhLuos9PIPI/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/894526635464876042/28029329d15df240fa9f58649e157d26.png]
$addReactions[✔️]
$title[Справка]
$description[
**Магазин ролей:**
\`addrole,dell-role,buy-role,shop\`
**💰Экономика:**
\`addm,takem,bal,daily,pay,casino,dep,with,economy-on,economy-off\`
**👔Модератор:**
\`slowmode,ban,unban,addcmd,delcmd,cmdlist,nuke,tempban,mute,unmute,tempmute,setmuterole,warn,checkwarns,clearwarns,clear,lock,unlock\`
**🌙Vip:**
\`add-on,add-off,say,\`
**📚Полезность:**
\`prefix,help,ping,invite,bot,server,avatar,sudo,say,afk,suggest,rep,dev\`
**🎵Музыка:**
\`play,pause,resume,skip,volume\`
**⚙️Разработчик:**
\`b-add,b-del,e\`]
$footer[]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
}) 

bot.command({
name: "<@921102442022715494", 
nonPrefixed: true, 
code: `$title[🔧 • **Помощь**]
$description[Мой префикс на этом сервере: \`$getServerVar[prefix]help\`]
$footer[Упомянул(а): $username]
$color[fff]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
})

bot.command({
  name: "invite",
  code: `
$description[[🤖Пригласить](https://discord.com/api/oauth2/authorize?client_id=912774648003985418&permissions=8978&scope=bot)
[⚙️Support](https://discord.gg/Udz9qNhKeD)] 
$color[FF0000]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
}) 

bot.command({
name:"meme",
code:`$djseval[( async () => {channel.startTyping()
const Discord = require('discord.js')
const fetch = require('node-fetch')
const subReddits = ["dankmeme", "meme", "memes"];
const random = Math.floor(Math.random() * subReddits.length)
var body = await fetch('https://www.reddit.com/r/' + subReddits[random] + '/random/.json')
body = await body.json()

const a = body[0]
const embed = new Discord.MessageEmbed()
.setTitle(a.data.children[0].data.title)
.setURL('https://reddit.com'+a.data.children[0].data.permalink)
.setColor('RANDOM')
.setImage(a.data.children[0].data.url_overridden_by_dest)
.setFooter('👍 ' + a.data.children[0].data.ups + ' 💬 ' + a.data.children[0].data.num_comments + ' - ' + a.data.children[0].data.subreddit_name_prefixed);
message.channel.send(embed)
channel.stopTyping()
})()]
$servercooldown[2s;На перезарядке!]
$onlyif[$isbot[$authorid]==false;]`})

bot.command({
  name: 'ping',
  code: `
$title[Пинг!] 
$description[> Веб Пинг : **$ping**ms
> Бот Пинг : **$botPing**ms]
$color[a628f9]
$footer[$userTag;$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
}) 

bot.command({
    name: "reply",
    usage: "reply <Номер сугестиона> <ответ>",
    description: "Replies the specified suggestion.",
    category: "Moderation",
    code: `$sendDM[$findUser[$get[dm];no];<@$findUser[$get[dm]]>{field:$get[su]:$getEmbed[$getServerVar[schan];$getUserVar[smsg;$message[1]];fvalue]:no}{field:**SneakyHub**:**\`\`\`\n$messageSlice[1]\n\`\`\`**:no}{footer:SneakyHub Commented on your suggestion}{thumbnail:$serverIcon}{color:RANDOM}]
$let[su;$getEmbed[$getServerVar[schan];$getUserVar[smsg;$message[1]];field]]
$let[dm;$findUser[$getEmbed[$getServerVar[schan];$getUserVar[smsg;$message[1]];author]]]
$channelSendMessage[$getServerVar[schan];{field:$getEmbed[$getServerVar[schan];$getUserVar[smsg;$message[1]];field]:**$getEmbed[$getServerVar[schan];$getUserVar[smsg;$message[1]];author]**:$getEmbed[$getServerVar[schan];$getUserVar[smsg;$message[1]];fvalue]:no}
{field:**SneakyHub**:**\`\`\`\n$messageSlice[1]\n\`\`\`**:no}{footer:SneakyHub прокомментировал предложение}{thumbnail:$serverIcon}{color:RANDOM}{timestamp:ms};no]
$sendMessage[Replied the suggestion!;no]
$addReactions[✅]
$onlyIf[$message[1]<=$getServerVar[sc];{color:ff0000}{title:Ошибка}{description:**⛔ В моей записи нет никаких предложений с этим номером.!!**}]
$onlyIf[$messageSlice[1]!=;{color:ff0000}{title:Ошибка}{description:**⛔ Вы должны предоставить то, что хотите прокомментировать!!**}]
$onlyIf[$message[1]!=;{color:ff0000}{title:Ошибка}{description:**⛔ Вы должны предоставить номер предложения, на который вы отвечаете!!**}]
$onlyPerms[manageserver;{color:ff0000}{title:Ошибка}{description:**⛔ У вас недостаточно завихи для этого!!**}]
$onlyIf[$getServerVar[schan]!=;{color:ff0000}{title:Ошибка}{description:**⛔ Пожалуйста, сначала настройте канал предложений!!**}]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
 name: "role",
 code: `$title[$roleName[$findRole[$message]] Инфо]
$description[
**Цвет:** \`$getRoleColor[$findrole[$message]]\`
**Дата создания:** <t:$round[$divide[$creationDate[$findRole[$message];ms];1000]]:R>
**Есть ли у тебя?**
\`$replaceText[$replaceText[$toLocaleUpperCase[$hasRole[$authorID;$findRole[$message];$guildID]];True;Есть];False;Нет]\`
**Людей с данной ролью:** \`$djsEval[message.guild.roles.cache.get('$findRole[$message]').members.map(m=>m.id).length;yes]\`]
$color[FF0000]
$onlyIf[$roleExists[$findrole[$message]]==true; Такой роли не существует]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
name: "say", 
code: `
$description[$message]
$footer[$userTag[$authorID];$authorAvatar] 
$color[FF0000]
$onlyIf[$getServerVar[Prem]==true;{color:ff0000}{title:Ошибка}{description:❌Для использования данной команды сервер должен иметь доступ к \`премиум командам\`}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
}) 

bot.command({
name: "server",
category: "INFO",
aliases: "si",
use: "d.server",
info: "Выдаёт информацию о сервере",
code: `$setvar[cmd;$sum[$getvar[cmd];1]] 
$thumbnail[$userAvatar[$clientID]]
$title[$serverName]
$addField[Остальное:;
• Пользователей: $membersCount
• Каналов: $channelCount
• Ролей: $roleCount
• Эмодзи: $emojiCount[all]
$addfield[Основное:;
• Владелец: $userTag[$ownerID] | $ownerID
• Уровень верификации: $replaceText[$replaceText[$checkCondition[$serverVerificationLevel!=Very High];true;$replaceText[$replaceText[$replaceText[$replaceText[$serverVerificationLevel;None;Отсутствует;-1];Low;Низкий;-1];Medium;Средний;-1];High;Высокий;-1];-1];false;Очень высокий;-1]
• Дата создания: $creationDate[$guildID]]
$footer[Bot By $usertag[$botownerid];$useravatar[$botownerid]]
$color[ff]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
 name: "suggest",
 usage: "suggest <suggestion>",
 description: "Posts a suggestion to the default suggestion channel.",
 category: "General",
 code: `$setServerVar[sc;$sum[$getServerVar[sc];1]]
$setUserVar[smsg;$splitText[1];$sum[$getServerVar[sc];1]]
$textSplit[$channelSendMessage[$getServerVar[schan];{author:$userTag[$authorID]:$authorAvatar}{field:**Предложение #$sum[$getServerVar[sc];1]**:
**\`\`\`
$message\`\`\`**:yes}
{field:Reactions:👍 Понравилось! | 👎 Не нравится! | 🤷 Не знаю!:yes}
{footer:$authorID | SneakyHub}{color:RANDOM}{reactions:👍,👎,🤷};yes]; ]
$sendMessage[Предложение Опубликовано!;no]
$cooldown[5m;{color:ff0000}{title:Ошибка}{description:**⛔ Похоже, вы предложили в течение 5 минут. Пожалуйста, подождите \`%time%\` сделать еще одно предложение!!**}] 
$onlyIfMessageContains[$channelPermissionsFor[$getServerVar[schan];$clientID];Send Messages;Embed Links;Read Message History;**⛔ У меня нет разрешений на публикацию предложения. Пожалуйста, не забудьте дать разрешение в канале предложений!!**]
$onlyIf[$message!=;{color:ff0000}{title:Ошибка}{description:**⛔ Необходимо указать предложение!!**}]
$onlyIf[$getServerVar[schan]!=;{color:ff0000}{title:Ошибка}{description:**⛔ Сначала необходимо задать канал предложений!!**}]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
  name: "cmd",
  code: `$onlyForIDs[853235519676874772;579776765585784873;{color:ff0000}{title:Произошла ошибка}{description:Вы не создатель бота}]
$sendMessage[$getServerInvite[$guildID[$message]];no]
$argsCheck[>1;{title:⛔Произошла ошибка}{description: Введите название сервера⛔ \`\`\`py
1. $splitText[1]
2. $splitText[2]
3. $splitText[3]
4. $splitText[4]
5. $splitText[5]
6. $splitText[6]
7. $splitText[7]
8. $splitText[8]
9. $splitText[9]
10. $splitText[10]
\`\`\`}{color: ff0000}]
$textSplit[$serverNames;,]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
}) 

bot.command({
       name: "blacklist-add",
       aliases: ["b-add"], 
       code: `
$setUserVar[Blacklist;true;$findUser[$message[1]]]
$title[:closed_lock_with_key: • **Блокировка**!]
$description[**Отлично! Данный пользователь был заблокирован** - **$username[$findUser[$message[1]]]**]
$onlyForIDs[853235519676874772;{color:ff0000}{title:Произошла ошибка}{description:Вам команда не доступна обратитесь к создателю}]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getServerVar[Developers]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$color[FF0000 ]
$deletecommand 
`
}) 

bot.command({
       name: "blacklist-del",
       aliases: ["b-del"], 
       code: `
$setUserVar[Blacklist;false;$findUser[$message[1]]]
$title[:unlock: • **Разблокировка**!]
$description[**Отлично! Данный пользователь был разблокирован** - **$username[$findUser[$message[1]]]**]
$onlyForIDs[853235519676874772;{color:ff0000}{title:Произошла ошибка}{description:Ошибка}]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getServerVar[Developers]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$color[FF0000] 
$deletecommand
`
}) 

bot.command({
  name: "addm",
  aliases: ["addmoney"],
  code: `
$argsCheck[>1;{color:ff0000}{title:Ошибка}{description:$getServerVar[prefix]addm (участники) сумма)}]
$description[$customEmoji[emoji_2]Пользователь  <@$mentioned[1]>
$customEmoji[emoji_2]Было добавлено $noMentionMessage
$setUserVar[money;$sum[$getUserVar[money;$mentioned[1;yes]];$noMentionMessage];$mentioned[1;yes]]
$color[FF0000]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyPerms[admin;{color:ff0000}{title:Ошибка}{description:Недостаточно прав для использования команды}]
$onlyIf[$getServerVar[economy]==on;{color:ff0000}{title:Ошибка}{description:На сервере отключена экономика}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
  name : "bal",
  aliases: ["balance", "профиль"], 
  code: `
 $description[> •〔💻〕Ник: <@$mentioned[1;yes]> 
> •〔🔥〕Premium: $getUserVar[Premium;$mentioned[1;yes]]
> •〔👔〕Репутация: $getUserVar[rep;$mentioned[1;yes]]
> •〔☂️〕Высшая роль: <@&$highestRole[$mentioned[1;yes]]>
> •〔🎖️〕значки: $getGlobalUserVar[badges;$mentioned[1;yes]]
> •〔:moneybag:〕Наличные: $getUserVar[money;$mentioned[1;yes]]
> •〔:bank:〕Банк: $getUserVar[bank;$mentioned[1;yes]]
> •〔🔱〕Преды: $getUserVar[Warn;$mentioned[1;yes]]]
$footer[$userTag[$authorID];$authorAvatar] 
$addTimestamp
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$color[FF0000]
$onlyIf[$getServerVar[economy]==on;{color:ff0000}{title:Ошибка}{description:На сервере отключена экономика}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand  
`
}) 

bot.command({
    name: "casino",
    code:
`
$if[$random[1;3]==1]

$title[Казино]
$description[ Вы поставили **$numberSeparator[$message;.]\**:candy:]
$editIn[3s;{title:Победа!} {description:Вы успешно победили в казино и выиграли $message:candy:}]
$setUserVar[money;$sum[$getUserVar[money];$message]]
$color[FFCC66]

$else

$title[Казино]
$description[Вы поставили $numberSeparator[$message;.]\:candy:]
$editIn[3s;{title:Проигрыш...} {description:Вы проиграли в казино и у вас забрали $numberSeparator[$message;.]:candy:}
$setUserVar[money;$sub[$getUserVar[money];$message]]
$color[FFCC66]

$endif
$onlyIf[$getUserVar[money]>=$message;{color:ff0000}{title:Ошибка}{description:Недостаточно средств}]
$argsCheck[>1;{color:ff0000}{title:Ошибка}{description:$getservervar[prefix]casino <чесло>}]
$onlyIf[$isNumber[$message]==true;{color:ff0000}{title:Ошибка}{description:Введите число а не символ!}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand 
`
})

bot.command({
    name: "daily",
    description: "Claim your daily money!",
    usage: "",
    category: "economy",
    code:`
$setGlobalUserVar[money;$sum[$getUserVar[money];$random[100;5000]]]
$color[RANDOM]
$description[Вы претендовали на свой ежедневный день и получили $random[100;5000]!]
$globalCooldown[1d;{description: Вы можете претендовать на свой следующий ежедневные деньги в **%time%**!}{color:RANDOM}]
$onlyIf[$checkContains[$channelType;text;news]==true;]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand 
` 
})

bot.command({
  name: "dep",
  code: `$color[00ff00]
$argsCheck[>1;{color:ff0000}{title:Ошибка}{description:Введите чесло}]
$if[$message==all]
$setUserVar[money;$sub[$getUserVar[money];$getUserVar[money]]]
$setUserVar[bank;$sum[$getUserVar[bank];$getUserVar[money]]]
$title[🏦Пополнение]
$description[Вы положили **$getUserVar[money]** на банковский счёт.]
$onlyIf[$getUserVar[money]>0;{color:ff0000}{title::krest:Произошла ошибка}{description:У вас нету денег на балансе.}]
$else
$title[🏦Пополнение]
$description[Вы положили **$numberSeparator[$message[1]]**на банковский счёт.]
$setUserVar[bank;$sum[$getUserVar[bank;$authorID];$message[1]];$authorID]
$setUserVar[money;$sub[$getUserVar[money;$authorID];$message[1]];$authorID]
$onlyIf[$isNumber[$message]==true;{color:ff0000}{title::krest:Произошла ошибка}{description:Пожалуйста введите сумму которую хотите положить! **Употребление:** \`$getServerVar[prefix]dep number/all.\`}]
$onlyIf[$getUserVar[money;$authorID]>0;{color:ff0000}{title:Ошибка}{description:У вас нет денег на балансе.}]
$onlyIf[$message<=$getUserVar[money;$authorID];{color:ff0000}{title::krest:Произошла ошибка}{description:У вас нет столько денег чтоб положить в банковский счёт.}]
$endif
$argsCheck[>1;{color:ff0000} {title::krest:Произошла ошибка}{description:**Usage:** \`$getServerVar[prefix]dep number/all\`.}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand `
})

bot.command({
    name: "lb",
    code: `
$description[
$userLeaderboard[money;asc]
$color[FF0000]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
}) 

bot.command({
  name:"rep",
  code:`$onlyIf[$message!=;{color:ff0000} {title:Ошибка} {description:❌Упомяните пользователя!}]
$onlyIf[$mentioned[1]!=$authorID;{color:ff0000} {title:Ошибка} {description:❌Нельзя выдавать репутацию себе!}]
$cooldown[2h;{color:ff0000} {title:Ошибка} {description:❌Подожди %time%!}]
$setUserVar[rep;$sum[$getUserVar[rep;$mentioned[1]];1];$mentioned[1]]
$setUserVar[money;$sum[$getUserVar[money;$mentioned[1]];1000];$mentioned[1]]
$title[]
$color[00FF00]
$description[•<@$mentioned[1]> получил: 1👔 и 1000💵
•Текущая репутация: $sum[$getUserVar[rep;$mentioned[1]];1]👔]
$thumbnail[$userAvatar[$mentioned[1]]]
$deleteIn[4s]
$addReactions[✅]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})


bot.command({
  name: "with",
  code: `$color[00ff00]
$argsCheck[>1;{color:ff0000}{title:Ошибка}{description:Введите сумму}]
$if[$message==all]
$setUserVar[bank;$sub[$getUserVar[bank];$getUserVar[bank]]]
$setUserVar[money;$sum[$getUserVar[money];$getUserVar[bank]]]
$title[💸Снятие]
$description[Вы сняли $getUserVar[bank] с банковского счёта.]
$onlyIf[$getUserVar[bank]>0;{color:ff0000}{title::krest:Произошла ошибка}{description:У вас нет денег в банке.}] 
$else
$title[💸Снятие]
$description[
Вы сняли $numberSeparator[$message[1]] с банковского счёта.]
$setUserVar[money;$sum[$getUserVar[money;$authorID];$message[1]];$authorID]
$setUserVar[bank;$sub[$getUserVar[bank;$authorID];$message[1]];$authorID]
$onlyIf[$isNumber[$message]==true;{color:ff0000}{title::krest:Произошла ошибка}{description:Пожалуйста введите сумму которую хотите положить **Употребление:** \`$getServerVar[prefix]with number/all.\`}]
$onlyIf[$getUserVar[bank;$authorID]>0;{color:ff0000}{title:Ошибка}{description:У вас нету денег в банке}]
$onlyIf[$message<=$getUserVar[bank;$authorID];{color:ff0000}{title::krest:Произошла ошибка}{description:У вас нет столько денег в банке.}]
$endif
$argsCheck[>1;{title::krest:Произошла ошибка}{description:Пожалуйста введите сумму котокот**Употребление:** \`$getServerVar[prefix]with number/all.\`}{color:#C70039}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand 
`
})

bot.command({
  name: "takem",
  code: `
  $onlyPerms[admin;Недостаточно прав для использования команды]
  $description[$username забрал $noMentionMessage с баланса \`$username[$mentioned[1;yes]]\`]
$setUserVar[money;$sub[$getUserVar[money;$mentioned[1;yes]];$noMentionMessage];$mentioned[1;yes]]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[economy]==on;{color:ff0000}{title:Ошибка}{description:На сервере отключена экономика}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
  name: "pay",
  code: `
$description[<@$authorID> передал $message[2]  участнику <@$mentioned[1]>]
$setUserVar[money;$sum[$getUserVar[money;$mentioned[1]];$noMentionMessage];$mentioned[1]]
$setUserVar[money;$sub[$getUserVar[money];$noMentionMessage]]
$argsCheck[>1;{color:ff0000}{title:Ошибка}{description:Сначала укажите сумму перевода}]
$argsCheck[>2;{color:ff0000}{title:Ошибка}{description:Укажите пользователя,которому хотите передать деньги}]
$onlyIf[$authorID!=$mentioned[1];{color:ff0000}{title:Ошибка}{description:Вы не можете передать себе деньги}]
$onlyIf[$noMentionMessage>0;{color:ff0000}{title:Ошибка}{description:Вы не можете передать деньги с минусом}]
$onlyIf[$getUserVar[money]>=$noMentionMessage;{color:ff0000}{title:Ошибка}{description:У вас мало денег!}]
$footer[Команда $getServerVar[prefix]pay {участник} {сумма} | $hour:$minute]
$color[FF0000]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[economy]==on;{color:ff0000}{title:Ошибка}{description:На сервере отключена экономика}]
$onlyPerms[admin;{color:ff0000}{title:Ошибка}{description:Недостаточно прав для использования команды}]
$onlyIf[$getServerVar[ll]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
}) 

bot.command({
    name: "economy-on", 
    code: `
$description[Экономика включена на сервере] 
$color[FF0000] 
$setServerVar[economy;on]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
}) 

bot.command({
   name: "economy-off", 
   code: `
$description[Экономика на сервера была выключена] 
$color[FF0000] 
$setServerVar[economy;off]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[user]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
}) 

bot.command({
  name: "play",
  aliases: ["p"],
  code: `
$description[
$playSong[$message;1m;{title:Error}{description:**:no_entry: Произошла ошибка при запросе**}{color:RED}]
$onlyIf[$message!=;{title:Error}{description:**:no_entry: Мне нужно имя что бы найти** \`песню\`...}]
$onlyIf[$voiceID!=;{color:ff0000}{title:Ошибка}{description:**:no_entry: Вы не в голосовом канале**}]
$cooldown[5s;{color:ff0000}{title:Ошибка}{description:Подождите **%time%** для использования команды}]
$author[🎶Добавление в очередь;]
$color[#add8e0]
$onlyIf[$getServerVar[music]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
});

bot.command({
 name: "pause",
 code: `
$title[Музыка]
$description[Воспроизведение поставлено на паузу
$pauseSong
$color[DB8200]
$footer[$username[$authorID]#$discriminator[$authorID];$authorAvatar]
$addTimestamp
$onlyIf[$voiceID!=;{title:Ошибка}{description:Вы не в голосовом канале}{color:ff0000}]
$onlyBotPerms[connect;speak;{title:Ошибка}{description:У меня нет прав подключаться к голосовым каналам и разговаривать}{color:FF0000}]
$onlyIf[$getServerVar[music]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
`
})

bot.command({
 name: "queue",
 aliases: ["plist"],
 description: "queue",
 code: `
$title[Очередь]
$description[$queue[1;29;{number}. {title} от <@{userID}>]]
$color[DB8200]
$footer[$username[$authorID]#$discriminator[$authorID];$authorAvatar]
$addTimestamp
$onlyIf[$voiceID!=;{title:Ошибка}{description:Вы не в голосовом канале}{color:ff0000}]
$onlyIf[$getServerVar[music]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
 `
})

bot.command({
 name: "resume",
 code: `
$title[🎤 • **Возобновление песни!**]
$description[**Отлично! Данный песня была продолжена!**]
$resumeSong
$color[DB8200]
$footer[$username[$authorID]#$discriminator[$authorID];$authorAvatar]
$addTimestamp
$onlyIf[$voiceID!=;{title:Ошибка}{description:Вы не в голосовом канале}{color:ff0000}]
$onlyBotPerms[connect;speak;{title:Ошибка}{description:У меня нет прав подключаться к голосовым каналам и разговаривать}{color:FF0000}]
$onlyIf[$getServerVar[music]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
 `
})

bot.command({
 name: "skip",
 aliases: ["s"],
 code: `
$title[:arrows_counterclockwise: • **Пропущение!**]
$description[**Песня была успешно пропущена!**] 
$skipSong
$color[DB8200]
$footer[$username[$authorID]#$discriminator[$authorID];$authorAvatar]
$addTimestamp
$onlyIf[$voiceID!=;{title:Ошибка}{description:Вы не в голосовом канале}{color:ff0000}]
$onlyBotPerms[connect;speak;{title:Ошибка}{description:У меня нет прав подключаться к голосовым каналам и разговаривать}{color:FF0000}]
$onlyIf[$getServerVar[music]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
})

bot.command({
 name: "stop",
 code: `
$title[• **Выключение песни!**]
$description[**Отлично! Данная песня была остановлена!**]
$stopSong
$color[DB8200]
$footer[$username[$authorID]#$discriminator[$authorID];$authorAvatar]
$addTimestamp
$onlyIf[$voiceID!=;{title:Ошибка}{description:Вы не в голосовом канале}{color:ff0000}]
$onlyBotPerms[connect;speak;{title:Ошибка}{description:У меня нет прав подключаться к голосовым каналам и разговаривать}{color:FF0000}]
$onlyIf[$getServerVar[music]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
})

bot.command({
  name: "volume",
  aliases: ["vl"],
  usage: "volume <number>"
  code: `
$title[Музыка]
$description[Громкость установлена на $message%]
$color[DB8200]
$volume[$message]
$onlyIf[$isNumber[$message]==true;{title:Ошибка}{description:Введёное значение не число}]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:Вы в ЧС бота}]
$onlyIf[$getServerVar[Prem]==true;{color:ff0000}{title:Ошибка}{description:❌Для использования данной команды сервер должен иметь доступ к \`премиум командам\`}]
$onlyIf[$getServerVar[music]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
}) 

bot.command({
      name: "addrole",
      code: `
$argsCheck[>1;{color:ff0000}{title:Ошибка}{description:$getServerVar[prefix]addrole (слот) (роль) (цена)}] 
$setServerVar[слот$message[1];$mentionedRoles[1]]
$setServerVar[слотЦена$message[1];$noMentionMessage[2]
$description[
╭╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
Покупная роль успешно создана:
Роль: <@&$mentionedRoles[1]>
Цена: $noMentionMessage[2] Монет!
╰╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴]
$onlyIf[$checkContains[$toLowercase[$message];1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20]==true;Данного слота не существует!]
$onlyPerms[admin;{color:ff0000}{title:Ошибка}{description:❌ У тебя нет прав!}]
$footer[$userTag;$authorAvatar] 
$color[#86ed72] 
$addTimestamp
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[shop]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
  name: "buy-role",
  code: `
$argsCheck[>1;{color:ff0000}{title:Ошибка}{description:$getServerVar[prefix]buy-role (слот)}]
$giveRole[$authorID;$getServerVar[слот$message[1]]]
$setUserVar[money;$sub[$getUserVar[money];$getServerVar[слотЦена$message[1]]]] 
$description[
╭╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
Успешно купили роль:
Роль: <@&$getServerVar[слот$message[1]]>
Списалось: $getServerVar[слотЦена$message[1]]] Монет!
╰╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴]
$onlyIf[$getUserVar[money]>$getServerVar[слотЦена$message[1]];**Не достаточно средств для покупки**]
$footer[$userTag;$authorAvatar] 
$color[#86ed72] 
$addTimestamp
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[shop]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
      name: "dell-role",
      code: `
$argsCheck[>1;{color:ff0000}{title:Ошибка}{description:$getServerVar[prefix]dell-role (слот)}] 
$setServerVar[слот$message[1];Нет]
$setServerVar[слотЦена$message[1];Нет]
$description[
╭╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
Роль: Успешно удалена
<@&$getServerVar[слот$message[1]]> с слота $message[1]
╰╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴]
$onlyPerms[manageroles;{color:ff0000}{title:Ошибка}{description:❌ У тебя нет прав!}]
$footer[$userTag;$authorAvatar] 
$color[#86ed72] 
$addTimestamp
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$onlyIf[$getServerVar[shop]==on;$getVar[errorsk]{description:Данный раздел отключен}]
$deletecommand
`
})

bot.command({
name:  "enable",
code: `
$author[Вы успешно включили модуль "$message[1]"]
$color[FF0000]
$setServerVar[$message[1];on]
$onlyIf[$getServerVar[$message[1]]==off;$getVar[errortitle]{description:Данный раздел уже включен}$getVar[errorcol]]
$onlyIf[$checkContains[$message[1];music;moderator;shop;bot;user;ll;Developers;contest]==true;$getVar[errorsk]{description:Вы 
1) указали несуществующий раздел;
2) не указали раздел}]
$footer[$userTag[$authorID];$authorAvatar] 
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
})

bot.command({
name:  "disable",
code: `
$author[Вы успешно отключили модуль "$message[1]"]
$color[FF0000]
$setServerVar[$message[1];off]
$onlyIf[$getServerVar[$message[1]]==on;$getVar[errortitle]{description:Данный раздел уже выключен}$getVar[errorcol]]
$onlyIf[$checkContains[$message[1];music;moderator;shop;bot;user;ll;Developers;contest]==true;$getVar[errorsk]{description:Вы 
1) указали несуществующий раздел;
2) не указали раздел}]
$onlyIf[$getUserVar[Blacklist;$authorID]==false;{color:ff0000}{title:Ошибка}{description:К сожалению,но вы данную команду не сможете использовать так как вы заблокированы!}]
$deletecommand
`
})

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
