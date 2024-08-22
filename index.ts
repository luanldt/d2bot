import TelegramBot, { type Message } from 'node-telegram-bot-api';

const token = '7496595469:AAGxJkTxrYvx_wqo7VleO_9xDtsjWPOEO-U';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg: Message) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Respond to the '/start' command
  if (text === '/start') {
    bot.sendMessage(chatId, 'Welcome to MyFirstBot! How can I assist you today?');
  } else {
    // Echo the received message
    sendMatchFinishedMessageWithImages(chatId);
  }
});

async function sendMatchFinishedMessageWithImages(chatID: number) {
  const matchID = '1234567890';
  const matchLink = `https://www.opendota.com/matches/${matchID}`;
  const duration = '35 minutes';
  const winningTeam = 'Radiant 🟢';
  const radiantScore = 45;
  const direScore = 30;

  const radiantHeroes = [
    { name: 'Juggernaut', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/juggernaut_full.png' },
    { name: 'Crystal Maiden', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/crystal_maiden_full.png' },
    { name: 'Pudge', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/pudge_full.png' },
    { name: 'Storm Spirit', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/storm_spirit_full.png' },
    { name: 'Slark', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/slark_full.png' },
  ];

  const direHeroes = [
    { name: 'Invoker', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/invoker_full.png' },
    { name: 'Anti-Mage', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/antimage_full.png' },
    { name: 'Viper', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/viper_full.png' },
    { name: 'Bane', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/bane_full.png' },
    { name: 'Earthshaker', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/earthshaker_full.png' },
  ];

  const registeredPlayer = {
    username: 'Player789',
    hero: 'Pudge',
    kills: 12,
    deaths: 5,
    assists: 18,
  };

  const message = `
<b>Raccoon Kiri vừa hoàn thành 1 trận</b> 🎮
<b>Steam ID:</b> <a href="${matchLink}">123ậ789</a> (The Turtle)

<b>=== Kết quả trận đấu ===</b>
<b>💔 Gánh sml mà vẫn thua 🥲</b>
<b>Match ID:</b> <a href="${matchLink}">${matchID}</a>
<b>Thời gian:</b> ${duration}
<b>Radiant (40 ☠️) - Dire (20 ☠️)</b>

<b>=== Kết quả người chơi ===</b>
<b>Net worth: </b> 23031
<b>Level: </b> 23
<b>KDA:</b> 8/12/23
<b>Role:</b> Support 🧑‍⚕️
<b>LH/DN:</b> 89/02
<b>Rank hiện tại:</b> Cursader
<b>Rank trung bình trận:</b> Guadiant

<b>Radiant Team Heroes:</b>
${radiantHeroes.map(hero => `• ${hero.name}`).join('\n')}

<b>Dire Team Heroes:</b>
${direHeroes.map(hero => `• ${hero.name}`).join('\n')}

<a href="${matchLink}">View Detailed Match Stats</a>
  `;

  try {
    // Send hero images for Radiant team
    await bot.sendPhoto(chatID, "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/juggernaut_full.png", { caption: "Juggernaut" });

    // Send the match summary message
    await bot.sendMessage(chatID, message, { parse_mode: 'HTML' });

    console.log('Match finished message with images sent successfully!');
  } catch (error: any) {
    console.error('Error sending match finished message with images:', error.message);
  }
}

console.log("Bot running...")