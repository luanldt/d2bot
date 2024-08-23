import { Telegraf } from 'telegraf';
import { startCommand } from './commands/start';
import { loggerMiddleware } from './middlewares/logger';
import { BOT_TOKEN } from '../config/config';

const bot = new Telegraf(BOT_TOKEN);

bot.use(loggerMiddleware);

bot.start(startCommand);

export default bot;
