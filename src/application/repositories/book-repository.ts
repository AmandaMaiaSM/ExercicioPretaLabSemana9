import { Book } from '../../domain/book';

export interface BookRepository {
 save(book: Book): Promise<Book>;
 findAll(): Promise<Array<Book>>;
 update(id: string, params: Partial<Book>): Promise<Book | null>;
 delete(id: string): Promise< Book | null>;
}