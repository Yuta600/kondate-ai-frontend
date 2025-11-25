// src/App.tsx
import { useState } from "react";
import type { MenuResponse, MenuItem, Ingredient } from "./types/menu";
import TotalCost from "./components/TotalCost";
import MenuCard from "./components/MenuCard";

export default function App() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [postalCode, setPostalCode] = useState("");
  const [supermarket, setSupermarket] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<MenuResponse | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);


const validateInput = (): string | null => {
  if (adults + children < 1) {
    return "家族構成は一人以上必要です。";
  }

  if (postalCode.length !== 7) {
    return "郵便番号は7桁で入力してください。";
  }
  if (!/^[0-9]+$/.test(postalCode)) {
    return "郵便番号は数字のみで入力してください。";
  }

  if (!supermarket.trim()) {
    return "スーパー名を入力してください。";
  }

  if (budget === "" || budget <= 0) {
    return "予算を入力してください。";
  }

  return null;
}

  const handleSubmit = async () => {

    setError(null);

    const errorMessage = validateInput();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/menu/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          adults,
          children,
          postalCode,
          supermarketName:supermarket,
          budget
        })
      });

      // ステータスコードをチェック
      if (!response.ok) {
        throw new Error("APIエラー");
      }

      const data = await response.json();
      setResponse(data);
      console.log("受信データ:", data);
    } catch (error) {
      console.error("API Error:", error);
      setError("献立の生成に失敗しました。");
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-3xl flex-1">
            <header className="flex items-center justify-center whitespace-nowrap border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 md:px-10 py-4">
              <div className="flex items-center gap-3">
                <div className="text-primary text-3xl">
                  <span className="material-symbols-outlined">restaurant_menu</span>
                </div>
                <h1 className="text-text-light dark:text-text-dark text-xl font-bold tracking-tight">
                  AIおまかせ献立プランナー
                </h1>
              </div>
            </header>

            <main className="flex-grow px-4 sm:px-6 md:px-10 py-8 sm:py-12">
              <div className="flex flex-col gap-8">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black tracking-tighter">
                    最適な献立を提案します
                  </p>
                  <p className="text-primary mt-2 text-base sm:text-lg font-normal">
                    はじめに、あなたの家族や食生活について教えてください。
                  </p>
                </div>

                <div className="space-y-8">
                  {/* 家族構成 */}
                  <div className="space-y-4">
                    <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight">
                      家族構成（何人分？）
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-base font-medium pb-2" htmlFor="adults">
                          大人
                        </label>
                        <input
                          className="form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal"
                          id="adults"
                          type="number"
                          value={adults}
                          onChange={(e) => setAdults(Number(e.target.value))}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-base font-medium pb-2" htmlFor="children">
                          子供
                        </label>
                        <input
                          className="form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal"
                          id="children"
                          type="number"
                          value={children}
                          onChange={(e) => setChildren(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 住まいのエリア */}
                  <div className="space-y-4">
                    <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight">
                      お住まいのエリア（郵便番号）
                    </h2>
                    <input 
                      type="text"
                      className="form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal"
                      placeholder="1000001 (皇居の例)"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      pattern="[0-9]{7}"
                      maxLength={7}
                       />
                  </div>

                  {/* スーパー */}
                  <div className="space-y-4">
                    <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight">
                      よく利用するスーパー
                    </h2>
                    <input
                      className="form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal"
                      placeholder="例：〇〇スーパー、XXストア"
                      value={supermarket}
                      onChange={(e) => setSupermarket(e.target.value)}
                    />
                  </div>

                  {/* 食費 */}
                  <div className="space-y-4">
                    <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight">
                      毎月の食費の目安
                    </h2>
                    <div className="relative flex items-center w-full sm:w-1/2">
                      <span className="absolute left-4 text-gray-400">¥</span>
                      <input
                        className="form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 pl-8 pr-4 text-base font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        step={0.1}
                        placeholder="例：1.5"
                        value={budget}
                        onChange={(e) =>
                          setBudget(e.target.value ? Number(e.target.value) : "")
                        }
                      />
                      <span className="absolute right-4 text-gray-400">万円</span>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
              )}
                <div className="pt-8 text-center">
                  <button
                    className="bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-xl w-full max-w-md mx-auto text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "生成中..." : "献立を生成する"}
                  </button>
                </div>
                {response && (
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
                  <div>
                    <h2 className="text-2xl font-bold mb-4">買い物リスト</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                      <ul className="space-y-2">
                        {response.shoppingList.map((item, index) => (
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
                  <TotalCost totalCost={response.totalCost} />
                </div>
              )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
