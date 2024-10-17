import {createAction, props} from "@ngrx/store";
import {Rate} from "../interfaces/rate.interface";

export const getQuotes = createAction(
  '[Quotes Page] Get Quotes',

  props<{quotes: Rate[]}>()
);
