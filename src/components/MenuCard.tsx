import type { MenuItem } from "../types/menu";

export default function MenuCard({menu}: {menu: MenuItem}) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            {/* 曜日とタイトル */}
            <div className="mb-4">
            <span className="text-primary font-bold text-lg">{menu.day}</span>
            <h3 className="text-xl font-bold mt-2">{menu.title}</h3>
            </div>

            {/* 材料リスト */}
            <div className="mb-4">
            <h4 className="font-bold mb-2">材料:</h4>
            <ul className="space-y-1 text-sm">
                {menu.ingredients.map((ingredient, idx) => (
                <li key={idx}>
                    {ingredient.name} - {ingredient.quantity}
                </li>
                ))}
            </ul>
            </div>

            {/* 費用 */}
            <div className="text-right">
            <span className="text-lg font-bold text-accent">
                ¥{menu.cost.toLocaleString()}
            </span>
            </div>
        </div>
    )
}