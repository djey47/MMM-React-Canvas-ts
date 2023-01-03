
export interface MM2Helper {
    config?: object;
    sendSocketNotification?(notif: string): void;
    socketNotificationReceived(notif: string, payload: object): void;
    start(): void;
    started?: boolean;
}
