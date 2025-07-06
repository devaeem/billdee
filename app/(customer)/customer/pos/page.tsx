"use client";

import OrderLine from "./components/OrderLine";
import FoodiesMenu from "./components/FoodiesMenu";
import MenuItems from "./components/MenuItems";
import OrderSummary from "./components/OrderSummary";

export default function POSPage() {
  return (
    <div className="min-h-screen  dark:from-gray-900 dark:to-gray-800">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 ">
        {/* Main Content Area */}
        <div className="xl:col-span-9 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <OrderLine />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <FoodiesMenu />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <MenuItems />
          </div>
        </div>

        {/* Order Summary Sidebar - Fixed and Full Height */}
        <div className="xl:col-span-3">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
