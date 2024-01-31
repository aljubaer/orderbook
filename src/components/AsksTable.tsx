import { useAppSelector } from "../app/hooks";
import { Orders } from "../features/orderbook/OrderbookTypes";
import { selectAsks } from "../features/orderbook/orderbookSlice";

export default function AsksTable() {
  const asks: Orders = useAppSelector(selectAsks);

  return (
    <table className="border-none w-1/2">
      <thead>
        <tr className="text-table-header-color">
          <th className="border-none">Price</th>
          <th className="border-none">Size</th>
          <th className="border-none">Total</th>
        </tr>
      </thead>
      <tbody>
        {asks.map((ask, idx) => (
          <tr key={idx}>
            <td className="w-1/3 m-0 p-0 text-right text-red-700">{ask[0]}</td>
            <td className="w-1/3 m-0 p-0">{ask[1]}</td>
            <td className="w-1/3 m-0 p-0">{ask[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
