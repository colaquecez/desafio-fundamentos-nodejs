import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, type, title }: TransactionDTO): Transaction {
    const transaction = this.transactionsRepository.create({
      value,
      type,
      title,
    });

    return transaction;
  }
}

export default CreateTransactionService;
