export interface Ingredient {
  name: string;
  quantity: string;
}

export interface MenuItem {
  day: string;
  title: string;
  ingredients: Ingredient[];
  cost: number;
}

export interface MenuResponse {
  menus: MenuItem[];
  shoppingList: string[];
  totalCost: number;
}
