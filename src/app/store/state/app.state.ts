import { IMessage, IMessageStore } from "src/app/model/app.model";
import { generateGuid } from "src/app/helpers/guid";

export const initialState: IMessageStore = {
    messageList: [
        {
            id: generateGuid(),
            text: ['sample Text'],
            isStartMessage: true,
            xPos: 10050,
            yPos: 9600,
            type: "message"
        },
    ],
    targetMessage: {
        id: "",
        text: [''],
        isStartMessage: false,
        xPos: 0,
        yPos: 0,
        type: "message"
    }  
} 