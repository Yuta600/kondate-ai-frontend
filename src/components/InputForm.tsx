import type { ValidationErrors } from "../App";
export interface InputFormProps {
  adults: number;
  setAdults: (value: number) => void;
  children: number;
  setChildren: (value: number) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  supermarket: string;
  setSupermarket: (value: string) => void;
  budget: number | "";
  setBudget: (value: number | "") => void;
  errors: ValidationErrors;
  apiError: string | null;
  isLoading: boolean;
  onSubmit: () => void;
}

export default function InputForm(props: InputFormProps) {
  const {
    adults,
    setAdults,
    children,
    setChildren,
    postalCode,
    setPostalCode,
    supermarket,
    setSupermarket,
    budget,
    setBudget,
    errors,
    apiError,
    isLoading,
    onSubmit,
  } = props;

  return (
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
                className={`form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal ${errors.family ? "border-red-500" : ""}`}
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
                className={`form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal ${errors.family ? "border-red-500" : ""}`}
                id="children"
                type="number"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
              />
            </div>
          </div>
          {errors.family && (
            <div className="flex items-start gap-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-700 text-sm">{errors.family}</p>
            </div>
          )}
        </div>

        {/* 住まいのエリア */}
        <div className="space-y-4">
          <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight">
            お住まいのエリア（郵便番号）
          </h2>
          <input
            type="text"
            className={`form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal ${errors.postalCode ? "border-red-500" : ""}`}
            placeholder="1000001 (皇居の例)"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            pattern="[0-9]{7}"
            maxLength={7}
          />
          {errors.postalCode && (
            <div className="flex items-start gap-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-700 text-sm">{errors.postalCode}</p>
            </div>
          )}
        </div>

        {/* スーパー */}
        <div className="space-y-4">
          <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight">
            よく利用するスーパー
          </h2>
          <input
            className={`form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 p-4 text-base font-normal ${errors.supermarket ? "border-red-500" : ""}`}
            placeholder="例：〇〇スーパー、XXストア"
            value={supermarket}
            onChange={(e) => setSupermarket(e.target.value)}
          />
          {errors.supermarket && (
            <div className="flex items-start gap-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-700 text-sm">{errors.supermarket}</p>
            </div>
          )}
        </div>

        {/* 食費 */}
        <div className="space-y-4">
          <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight">
            毎月の食費の目安
          </h2>
          <div className="relative flex items-center w-full sm:w-1/2">
            <span className="absolute left-4 text-gray-400">¥</span>
            <input
              className={`form-input-custom flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg h-14 pl-8 pr-4 text-base font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors.budget ? "border-red-500" : ""}`}
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
          {errors.budget && (
            <div className="flex items-start gap-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-700 text-sm">{errors.budget}</p>
            </div>
          )}
        </div>
      </div>
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {apiError}
        </div>
      )}
      <div className="pt-8 text-center">
        <button
          className="bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-xl w-full max-w-md mx-auto text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "生成中..." : "献立を生成する"}
        </button>
      </div>
    </div>
  );
}
