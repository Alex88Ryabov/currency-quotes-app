import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IState} from "../interfaces/state.interface";

export const selectQuotesState =
  createFeatureSelector<IState>('QuotesState')

export const selectAllQuotes = createSelector(
  selectQuotesState,
  (state: IState) => state.quotes
);
