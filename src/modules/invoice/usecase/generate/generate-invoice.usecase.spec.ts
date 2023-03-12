import { GenerateInvoiceUseCase } from "./generate-invoice.usecase";
import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.usecase.dto";

const MockeRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn(),
  };
};

describe("Generate Invoice usecase unit test", () => {
  it("should generate an invoice", async () => {
    const invoiceRepository = MockeRepository();

    const generateInvoiceUseCase = new GenerateInvoiceUseCase(
      invoiceRepository
    );

    const input: GenerateInvoiceUseCaseInputDto = {
      name: "Invoice Name 1",
      document: "document 1",
      street: "Strett 1",
      city: "City 1",
      complement: "Complement 1",
      number: "10",
      state: "State 1",
      zipCode: "123",
      items: [
        { id: "1", name: "Product 1", price: 100 },
        { id: "2", name: "Product 1", price: 100 },
      ],
    };

    const output = await generateInvoiceUseCase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.total).toBe(200);
    expect(output.street).toBe(input.street);
    expect(output.items[0].id).toBe(input.items[0].id);
  });
});
