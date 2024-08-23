import axios from 'axios';
import { STEAM_DOTA2_KEY, STEAM_DOTA2_API_BASE_URL } from '../../config/config';

export class Dota2APIService {
  private apiKey: string;
  private baseUrl: string;
  private pollInterval: number;

  constructor(apiKey: string, baseUrl: string, pollInterval: number = 60000) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.pollInterval = pollInterval;
  }

  // Function to get match history
  async getMatchHistory(accountId: string, limit: number = 3) {
    try {
      console.log(`[${new Date().toISOString()}] Pulling latest ${limit} matches for account ${accountId}`);
      const response = await axios.get(`${this.baseUrl}/GetMatchHistory/v1/`, {
        params: {
          key: this.apiKey,
          account_id: accountId,
          matches_requested: limit,
        },
      });
      return response.data.result.matches;
    } catch (error) {
      console.error('Error fetching match history:', error);
      throw new Error('Failed to fetch match history');
    }
  }

  async *pollMatches(accountId: string): AsyncGenerator<number | undefined> {
    let lastMatchId: number | null = null;

    while (true) {
      try {
        const matches = await this.getMatchHistory(accountId);
        const latestMatchId = matches[0]?.match_id;

        if (latestMatchId && latestMatchId !== lastMatchId) {
          yield latestMatchId;
          lastMatchId = latestMatchId;
        }
      } catch (error) {
        console.error('Error in match polling:', error);
      }

      // Wait for the specified interval before polling again
      await new Promise((resolve) => setTimeout(resolve, this.pollInterval));
    }
  }

}

// Export an instance of the service using values from config
export const dota2APIService = new Dota2APIService(STEAM_DOTA2_KEY, STEAM_DOTA2_API_BASE_URL);
