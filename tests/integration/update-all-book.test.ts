import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/interface";

const request = supertest(app);

describe("Atualizar todos os livros", () => {
  beforeEach(async () => {
    // Conectar ao banco de dados
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Inserir livros de teste no banco
    await request.post("/books").send({
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      publisher: "Prentice Hall",
      category: "Programming",
      status: "unread",
    });

    await request.post("/books").send({
      title: "Refactoring",
      author: "Martin Fowler",
      isbn: "978-0201485677",
      publisher: "Addison-Wesley",
      category: "Programming",
      status: "unread",
    });
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
  });
  
  it("Deve atualizar todos os livros com sucesso", async () => {
    const update = {
      status: "read", // Atualizar o status para "read"
    };

    const response = await request.put("/books").send(update);

    // Verificar se a atualização foi bem-sucedida
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Todos os livros foram atualizados com sucesso.");

    // Verificar se os livros foram atualizados no banco
    const allBooks = await request.get("/books");
    expect(allBooks.status).toBe(200);

    allBooks.body.forEach((book: any) => {
      expect(book.status).toBe("read");
    });
  });
});
