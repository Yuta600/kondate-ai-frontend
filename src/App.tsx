import { useState } from "react";
import type { MenuResponse } from "./types/menu";
import InputForm from "./components/InputForm";
import MenuResult from "./components/MenuResult";

export default function App() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [postalCode, setPostalCode] = useState("");
  const [supermarket, setSupermarket] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<MenuResponse | null>(null);

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
  };

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
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          adults,
          children,
          postalCode,
          supermarketName: supermarket,
          budget,
        }),
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
                  <span className="material-symbols-outlined">
                    restaurant_menu
                  </span>
                </div>
                <h1 className="text-text-light dark:text-text-dark text-xl font-bold tracking-tight">
                  AIおまかせ献立プランナー
                </h1>
              </div>
            </header>

            <main className="flex-grow px-4 sm:px-6 md:px-10 py-8 sm:py-12">
              <InputForm
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                supermarket={supermarket}
                setSupermarket={setSupermarket}
                budget={budget}
                setBudget={setBudget}
                error={error}
                isLoading={isLoading}
                onSubmit={handleSubmit}
              />
              {response && <MenuResult response={response} />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
