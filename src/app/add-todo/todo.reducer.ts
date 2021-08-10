

import ActionWithPayload from "../ActionWithPayload";
import ToDo from "../todo.model";
import { ToDoState, initializeState } from "./todo.state";
import * as ToDoActions from "./todo.action";
import { Action } from "@ngrx/store";

const initialState = initializeState();

export function ToDoReducer(state: ToDoState = initialState,
    action: Action) {

    switch (action.type) {
        case ToDoActions.GET_TODO:
            return { ...state, Loaded: false, Loading: true };

        case ToDoActions.CREATE_TODO:
            return ({
                ...state,
                ToDoList: state.ToDoList.concat((action as ActionWithPayload<ToDo[]>).payload),
                Loaded: false, Loading: true
            });

        case ToDoActions.DONE_TODO:
            {
                const act_obj = (action as ActionWithPayload<ToDo[]>).payload;
                const new_state = state;
                const arr = new_state.ToDoList;
                for (let o = 0; o < arr.length; o++) {
                    if (arr[o].title === act_obj['title']) {
                        arr[o]['isCompleted'] = true;
                    }
                }
                new_state.ToDoList = arr;

                return new_state;
            }



        default:
            return state;
    }
}