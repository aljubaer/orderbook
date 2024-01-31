import { useAppSelector } from "../app/hooks";
import { Orders } from "../features/orderbook/OrderbookTypes";
import { selectBids } from "../features/orderbook/orderbookSlice";

export default function BidsTable() {

    const bids: Orders = useAppSelector(selectBids);

  return (
    <table className="border-none w-1/2">
      <thead>
        <tr className="text-table-header-color">
          <th className="border-none">Total</th>
          <th className="border-none">Size</th>
          <th className="border-none">Price</th>
        </tr>
      </thead>
      <tbody>
        {bids.map((bid, idx) => (
          <tr key={idx}>
            <td className="w-1/3 m-0 p-0">{bid[2]}</td>
            <td className="w-1/3 m-0 p-0">{bid[1]}</td>
            <td className="w-1/3 m-0 p-0 text-right text-green-700">
              {bid[0]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
