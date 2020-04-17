import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface TransactionBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, total: 0, outcome: 0 };
  }

  public all(): TransactionBalance {
    // TODO
    const balance = this.getBalance();
    const { transactions } = this;

    return { transactions, balance };
  }

  public getBalance(): Balance {
    // TODO
    const income = this.transactions
      .filter(transactions => transactions.type === 'income')
      .reduce((a, c) => a + c.value, 0);

    const outcome = this.transactions
      .filter(transactions => transactions.type === 'outcome')
      .reduce((a, c) => a + c.value, 0);

    const total = income - outcome;
    const balance = { income, outcome, total };
    this.balance = balance;
    return balance;
  }

  public create({ type, value, title }: TransactionDTO): Transaction {
    // TODO
    this.getBalance();
    if (value > this.balance.total && type === 'outcome') {
      throw Error('Saldo insuficiente');
    }
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
