import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import { Orders } from "./OrderbookTypes";

export type OrderbookState = {
    bids: Orders;
    asks: Orders;
  }
  
  const initialState: OrderbookState = {
    bids: [],
    asks: [],
  };

  const addTotalSums = (orders: Orders): Orders => {

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

export const selectBids = (state: RootState): Orders => state.orderbook.bids;
export const selectAsks = (state: RootState): Orders => state.orderbook.asks;

export default orderbookSlice.reducer;