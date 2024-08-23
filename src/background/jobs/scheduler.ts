import { matchWatcher } from "./matchWatcher";

export const startScheduler = () => {
  console.log('Starting matchWatcher...');
  matchWatcher(); // This will run indefinitely

  console.log('Scheduler started!');
};