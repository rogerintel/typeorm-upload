import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Category from './Category';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column('decimal')
  value: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category_id: string;

  @ManyToOne(() => Category, category => category.transaction, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(title: string, type: 'income' | 'outcome', value: number) {
    this.title = title;
    this.type = type;
    this.value = value;
  }
}

export default Transaction;
