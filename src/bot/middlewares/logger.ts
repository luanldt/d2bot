import { Context } from 'telegraf';

// Logger middleware
export const loggerMiddleware = async (ctx: Context, next) => {
  // Log incoming message details
  const user = ctx.from ? `${ctx.from.first_name} ${ctx.from.last_name || ''}` : 'Unknown User';
  const message = ctx.message?.text || ctx.updateType;

  console.log(`[${Date.now()}] Message from ${user}: ${message}`);

  try {
    await next(); // Proceed to the next middleware/handler
  } catch (err) {
    console.error(`[${Date.now()}] Error processing update:`, err);
  }
};