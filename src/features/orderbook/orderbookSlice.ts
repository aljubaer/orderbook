import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';



export type OrderbookState = {
    market: string;
    rawBids: number[][];
    bids: number[][];
    maxTotalBids: number;
    rawAsks: number[][];
    asks: number[][];
    maxTotalAsks: number;
    groupingSize: number;
  }
  
  const initialState: OrderbookState = {
    market: 'PI_XBTUSD', // PI_ETHUSD
    rawBids: [],
    bids: [],
    maxTotalBids: 0,
    rawAsks: [],
    asks: [],
    maxTotalAsks: 0,
    groupingSize: 0.5
  };

  export const orderbookSlice = createSlice({
    name: 'orderbook',
    initialState,
    reducers: {}
  });

export const selectBids = (state: RootState): number[][] => state.orderbook.bids;
export const selectAsks = (state: RootState): number[][] => state.orderbook.asks;

export default orderbookSlice.reducer;