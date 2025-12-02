import type { MenuResponse } from "../types/menu";
import MenuCard from "./MenuCard";
import ShoppingList from "./ShoppingList";
import TotalCost from "./TotalCost";
export default function MenuResult({ response }: { response: MenuResponse }) {
  return (
    <div className="mt-12 space-y-8">
      {/* 献立一覧 */}
      <div>
        <h2 className="text-2xl font-bold mb-6">3日分の献立</h2>
        <div className="space-y-6">
          {response.menus.map((menu, index) => (
            <MenuCard key={index} menu={menu} />
          ))}
        </div>
      </div>

      {/* 買い物リスト */}
      <ShoppingList items={response.shoppingList} />

      {/* 合計金額 */}
      <TotalCost totalCost={response.totalCost} />
    </div>
  );
}
