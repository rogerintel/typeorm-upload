// import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    category,
    value,
  }: Request): Promise<Transaction> {
    let transaction = new Transaction(title, type, value);
    const repositoryCategory = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    let category_id;
    const categoryBd = await repositoryCategory.findOne({
      where: { title: category },
    });
    if (!categoryBd) {
      const category2 = repositoryCategory.create({ title: category });
      await repositoryCategory.save(category2);
      category_id = category2.id;
    } else {
      category_id = categoryBd.id;
    }
    transaction.category_id = category_id;
    transaction = transactionsRepository.create(transaction);

    await transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
