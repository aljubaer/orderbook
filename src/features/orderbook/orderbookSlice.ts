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

  const addTotalSums = (orders: number[][]): number[][] => {

    let currSum = 0;
    return orders.map((order: number[], idx) => {
      const size: number = order[1];
      if (typeof order[2] !== 'undefined') {
        return order;
      } else {
        if (idx === 0) currSum = size;
        else currSum += size;
        order.push(currSum);
        return order;
      }
    });
  };

  export const orderbookSlice = createSlice({
    name: 'orderbook',
    initialState,
    reducers: {
      updateBids: (state, { payload }) => {
        state.bids = addTotalSums(payload);
      },
      updateAsks: (state, { payload }) => {
        state.asks = addTotalSums(payload);
      },
      updateOrderbook: (state, { payload }) => {
        const bids = addTotalSums(payload.bids);
        const asks = addTotalSums(payload.asks);

        state.bids = bids;
        state.asks = asks;
      }
    }
  });

export const { updateOrderbook, updateBids, updateAsks } = orderbookSlice.actions;

export const selectBids = (state: RootState): number[][] => state.orderbook.bids;
export const selectAsks = (state: RootState): number[][] => state.orderbook.asks;

export default orderbookSlice.reducer;