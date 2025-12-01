import { useState } from "react";
export default function ShoppingList({ items }: { items: string[] }) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">買い物リスト</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`item-${index}`}
                checked={checkedItems[index] || false}
                onChange={(e) => {
                  const newChecked = [...checkedItems];
                  newChecked[index] = e.target.checked;
                  setCheckedItems(newChecked);
                }}
                className="w-5 h-5 rounded border-gray-300"
              />
              <label
                htmlFor={`item-${index}`}
                className={`flex-1 cursor-pointer ${
                  checkedItems[index] ? "line-through text-gray-400" : ""
                }`}
              >
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
