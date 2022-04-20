import { createAction, props } from "@ngrx/store";

export namespace MessageActions {
    export const showMessages = createAction("SHOW_MESSAGE");
    export const moveMessage = createAction("MOVE_MESSAGE",props<{x:number,y:number,id:string}>());
}