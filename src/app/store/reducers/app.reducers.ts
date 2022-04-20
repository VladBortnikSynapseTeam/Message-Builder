
import { Action, createReducer, on } from "@ngrx/store";
import { IMessageStore } from "src/app/model/app.model";
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
    )
)

export function MessageReducer(state: IMessageStore | undefined, action: Action) {
    return messageReducer(state, action)
}