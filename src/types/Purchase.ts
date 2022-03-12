export interface Transaction {
  token?: string;
  appids: string[];
}

export interface TransactionStateAction {
  token: string;
}