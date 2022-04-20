import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { IMessageStore } from "src/app/model/app.model";

export namespace MessageSelectors {
    export const state = createFeatureSelector<IMessageStore>('messages');
    export const messages = createSelector(state, (state)=> state.messageList);
    export const currentMessage = createSelector(state, (state)=> state.targetMessage);
}