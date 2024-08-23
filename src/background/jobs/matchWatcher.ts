import { dota2APIService } from "../../bot/services/api.service";

export const matchWatcher = async () => {
  const accountId = '1621497616';

  const matchPoller = dota2APIService.pollMatches(accountId);

  for await (const matchId of matchPoller) {
    if (matchId) {
      console.log(`New match detected: ${matchId}`);
      // Perform actions, such as notifying users or processing match data
    }
  }
};