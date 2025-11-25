export interface Ingredient {  // 大文字始まりが慣習
  name: string;
  quantity: string;
}

export interface MenuItem {
  day: string;          // ← ここに移動
  title: string;
  ingredients: Ingredient[];
  cost: number;
}

export interface MenuResponse {
  menus: MenuItem[];
  shoppingList: string[];
  totalCost: number;
}