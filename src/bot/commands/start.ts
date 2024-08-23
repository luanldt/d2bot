import { Context, Markup } from 'telegraf';

// Define the start command handler
export const startCommand = (ctx: Context) => {
  ctx.reply(
    'Welcome to the bot! How can I assist you today?',
  );
};