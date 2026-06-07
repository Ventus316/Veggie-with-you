// src/data/Data.js

import { RESTAURANTS } from './restaurantsData';

export const ALL_DISHES = RESTAURANTS.flatMap(shop => 
  shop.recommendations.map((dish, index) => ({
    id: `${shop.id}-${index}`,
    shop: shop.name,
    name: dish.name,
    price: dish.price,
    img: dish.img
  }))
);

export const TEAM_MEMBERS = [
  { name: "王大明", role: "Project Lead", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" },
  { name: "李小華", role: "UI/UX Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "陳阿強", role: "Frontend Dev", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" },
  { name: "張小美", role: "Data Analysis", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { name: "林小宇", role: "Marketing", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop" }
];
