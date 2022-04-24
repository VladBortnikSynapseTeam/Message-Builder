import { Action, createReducer, on } from "@ngrx/store";
import { generateGuid } from "src/app/helpers/guid";
import { IMessage, IMessageStore, IRandomize } from "src/app/model/app.model";
import { MessageActions } from "../actions/app.action";
import { initialState } from "../state/app.state";

const messageReducer = createReducer(
    initialState,
    on(MessageActions.moveMessage, (state, {x,y,id}) => {
            return{
                ...state,
                messageList: state.messageList.map(msg => msg.id == id ? {...msg, xPos: msg.xPos + x, yPos: msg.yPos + y} : msg)
            };
    }),
    on(MessageActions.moveRandomize, (state, {x,y,id}) => {
        return{
            ...state,
            randomizeList: state.randomizeList.map(rnd => rnd.id == id ? {...rnd, xPos: rnd.xPos + x, yPos: rnd.yPos + y} : rnd)
        };
    }),
    on(MessageActions.setTargetMessage, (state, {id})=>{
        return {
            ...state,
            targetMessage: state.messageList.map(msg => msg.id == id ? {...msg}: msg)[0]
        }
    }),
    on(MessageActions.deleteMessage, (state, {id})=> {
        return {
            ...state,
            messageList: state.messageList.filter(msg => msg.id !== id)
        }
    }),
    on(MessageActions.deleteRandomizer, (state, {id})=> {
        return {
            ...state,
            randomizeList: state.randomizeList.filter(msg => msg.id !== id)
        }
    }),
    on(MessageActions.addMessage, (state)=>{
        let newMessage: IMessage = {
            id: generateGuid(),
            text: [],
            isStartMessage: false,
            xPos: 10050,
            yPos: 9600
        }
        return {
            ...state,
            messageList: [...state.messageList, newMessage]
        }
    }),
    on(MessageActions.addRandomize, (state)=> {
        let newRandomize: IRandomize = {
            id: generateGuid(),
            AElement: "",
            BElement: "",
            xPos: 10000,
            yPos: 9600
        }
        return{
            ...state,
            randomizeList: [...state.randomizeList, newRandomize]
        }
    })
)

export function MessageReducer(state: IMessageStore | undefined, action: Action) {
    return messageReducer(state, action)
}