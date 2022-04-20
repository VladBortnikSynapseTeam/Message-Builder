
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Action, createReducer, on } from "@ngrx/store";
import { IMessage, IMessageStore } from "src/app/model/app.model";
import { MessageActions } from "../actions/app.action";
import { initialState } from "../state/app.state";

const messageReducer = createReducer(
    initialState,
    on(MessageActions.moveMessage, (state, {x,y,id}) => {
            return{
                ...state,
                messageList: state.messageList.map(msg => msg.id == id ? {...msg, xPos: msg.xPos + x, yPos: msg.yPos + y} : msg)
            };
        }
    ),
    on(MessageActions.setTargetMessage, (state, {id})=>{
        return {
            ...state,
            targetMessage: state.messageList.map(msg => msg.id == id ? {...msg}: msg)[0]
        }
    })
)

export function MessageReducer(state: IMessageStore | undefined, action: Action) {
    return messageReducer(state, action)
}