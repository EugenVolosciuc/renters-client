export interface CronJob {
    id: number;
    title: string;
    description: string;
    action: string;
    interval: string;
    isRunning: boolean;
    nextInvocation: string | null;
}