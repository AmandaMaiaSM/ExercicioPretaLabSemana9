import { BookRepository } from '../../../application/repositories/book-repository'
import { Book } from '../../../domain/book';
import { BookModel } from './model';

export class Repository implements BookRepository {
  async save (book: Book): Promise<Book> {
    const newBook = new BookModel(book);
    const savedBook = await newBook.save();
    return savedBook as Book;  
  }

  async findAll (): Promise<Array<Book>> {
    const books = await BookModel.find();

    const translatedBooks = books.map(item => {
      return {
        id: item._id.toString(),
        author: item.author,
        category: item.category,
        createdAt: item.createdAt,
        isbn: item.isbn,
        publisher: item.publisher,
        status: item.status,
        title: item.title,
        cover: item.cover
      }
    }) as Array<Book>

    return translatedBooks;
  }

  async update(id: string, params: Partial<Book>): Promise<Book | null> {
    
    const updatedBook = await BookModel.findByIdAndUpdate(id, params, { new: true })

    if (updatedBook) {
      return {
        id: updatedBook._id.toString(),
        author: updatedBook.author,
        category: updatedBook.category,
        createdAt: updatedBook.createdAt,
        isbn: updatedBook.isbn,
        publisher: updatedBook.publisher,
        status: updatedBook.status,
        title: updatedBook.title,
        cover: updatedBook.cover
      } as Book;
    }

    return null
  }

  async delete(id: string): Promise<Book | null> {
    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (deletedBook) {
      return {
        id: deletedBook._id.toString(),
        author: deletedBook.author,
        category: deletedBook.category,
        createdAt: deletedBook.createdAt,
        isbn: deletedBook.isbn,
        publisher: deletedBook.publisher,
        status: deletedBook.status,
        title: deletedBook.title,
        cover: deletedBook.cover
      } as Book;
    }
    return null; 
  }

}

