import { startScheduler } from './background/jobs/scheduler';
import bot from './bot/bot';

bot.launch(() => {
  console.log('Bot started!');

  startScheduler();
});

// Enable graceful stop
process.once('SIGINT', () => { 
  bot.stop('SIGINT')
  process.exit(0);
});
process.once('SIGTERM', () => { 
  bot.stop('SIGTERM')
  process.exit(0);
});