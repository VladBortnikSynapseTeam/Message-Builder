export interface IMessage{
    id: string;
    text: string[];
    isStartMessage: boolean;
    xPos: number;
    yPos: number;
    type: "message" | "randomizer"
}

export interface IMessageStore{
    messageList: IMessage[];
    targetMessage: IMessage;
}