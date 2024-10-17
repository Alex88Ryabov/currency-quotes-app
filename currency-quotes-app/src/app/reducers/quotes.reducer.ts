import {createReducer, on} from "@ngrx/store";
import {getQuotes} from "../actions/qoutes.actions";
import {IState} from "../interfaces/state.interface";


export const initialQuotesState: IState = {
  quotes: []
};

export const quotesReducer = createReducer(
  initialQuotesState,
  on(getQuotes,
    (state: IState, {quotes}) => ({
      ...state,
      quotes
    }))
)
