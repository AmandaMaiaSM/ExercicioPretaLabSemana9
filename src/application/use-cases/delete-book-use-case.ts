import { Book } from '../../domain/book';
import { BookRepository } from '../repositories/book-repository';

export class DeleteBookUseCase {
  constructor(
    private bookRepository: BookRepository
  ) {}

  async execute(id: string): Promise<Book | null> {
    const deletedBook = await this.bookRepository.delete(id);
    if (!deletedBook) {
      return null;  // Retorna null se o livro não for encontrado
    }

    return deletedBook;  // Retorna o livro deletado
  }

}