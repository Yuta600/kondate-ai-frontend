export default function TotalCost({ totalCost }: {totalCost: number }) {
    return (
        <div>
            <h2 className="text-2xl font-bold">合計金額</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
                <p className="text-3xl font-bold text-accent">
                    ¥{totalCost.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">3日分の合計</p>
            </div>
        </div>
    )
} 