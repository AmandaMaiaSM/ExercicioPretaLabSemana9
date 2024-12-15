import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/interface";
import { Repository } from "../../src/infrastructure/database/mongo-db/book-repository";

const request = supertest(app);
const bookRepository = new Repository();

describe("Deletar Book", () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log("Conexão com MongoDB fechada");
  });

  it("Deletar um livro por um ID", async () => {
    const createBook = await request.post("/books").send({
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      isbn: "978-0201616224",
      publisher: "Addison-Wesley",
      category: "Programming",
      status: "read",
    });
  
    // Verificar a criação do livro e o ID retornado
    expect(createBook.status).toBe(201);
    console.log("Resposta da criação do livro:", createBook.body); // Log da resposta
  
    // Capture o campo "id" (ou "_id") corretamente
    /*const bookId = createBook.body.id || createBook.body._id;
    expect(bookId).toBeDefined(); // Aqui validamos que o id está presente
    P(*/
    const bookId = createBook.body._id; // Verifique se o campo está realmente aqui
    console.log("ID do livro:", bookId); //
    // Verifique se o ID foi retornado
    
    if (!bookId) {
      throw new Error("ID do livro não foi retornado na resposta.");
    }
    // Deletar o livro
    const response = await request.delete(`/books/${bookId}`); // Ajustar o endpoint se necessário
    console.log("Resposta da deleção: ", response.body);
  
    // Verificar se a resposta está correta
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Livro com ${bookId} deletado com sucesso`);
  
    // Verificar se o livro foi removido
    const allBooks = await request.get("/books");
    expect(allBooks.status).toBe(200);
    expect(allBooks.body.length).toBe(0);
  });

});