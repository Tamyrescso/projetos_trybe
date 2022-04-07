interface Products {
  id?: number;
  name: string;
  amount: string;
  orderId?: number;
}

interface Users {
  id?: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

interface Orders {
  id: number;
  userId: number;
}

interface OrderProducts {
  userId?: number;
  products: number[];
}

interface TokenData {
  id?: number,
  username: string;
  classe?: string;
  level?: number;
  password: string;
}

interface ProductsByOrder {
  id: number;
}

interface ShowOrder {
  id?: number;
  userId?: number;
  products?: number[];
}

interface Login {
  username: string;
  password: string;
}

interface UserId {
  id: number;
}

export {
  Products,
  Users,
  Orders,
  TokenData,
  ProductsByOrder,
  ShowOrder,
  Login,
  OrderProducts,
  UserId,
};