import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Address } from "../../domain/address.object-value";
import { Invoice } from "../../domain/invoice.entity";
import { Product } from "../../domain/product.entity";
import { FindInvoiceUseCase } from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "document 1",
  address: new Address({
    street: "Strett 1",
    city: "City 1",
    complement: "Complement 1",
    number: "10",
    state: "State 1",
    zipCode: "123",
  }),
  items: [new Product({ id: new Id("1"), name: "teste", price: 100 })],
});

const MockeRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn(),
  };
};

describe("Find Invoice usecase unit test", () => {
  it("should find an invoice", async () => {
    const invoiceRepository = MockeRepository();

    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

    const output = await findInvoiceUseCase.execute({ id: "1" });

    expect(output.id).toBe(invoice.id.id);
    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(output.name).toBe(invoice.name);
    expect(output.document).toBe(invoice.document);
    expect(output.address.street).toBe(invoice.address.street);
    expect(output.items[0].id).toBe(invoice.items[0].id.id);
    expect(output.items[0].name).toBe(invoice.items[0].name);
    expect(output.total).toBe(
      invoice.items.reduce((acc, pv) => (acc += pv.price), 0)
    );
  });
});
