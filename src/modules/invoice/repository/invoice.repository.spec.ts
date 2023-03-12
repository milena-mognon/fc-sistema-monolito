import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceRepository } from "./invoice.repository";
import { ProductInvoiceModel } from "./product-invoice.model";
import { where } from "sequelize";
import { Invoice } from "../domain/invoice.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Address } from "../domain/address.object-value";
import { Product } from "../domain/product.entity";

describe("InvoiceRepository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductInvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find an invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    await InvoiceModel.create(
      {
        id: "1",
        name: "Invoice 1",
        document: "Document 123",
        street: "Street 1",
        number: "123",
        complement: "Complemnt 123",
        city: "City 123",
        state: "State 123",
        zipCode: "123456",
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [
          {
            id: "1",
            name: "Product 1",
            price: 100,
          },
        ],
      },
      {
        include: ProductInvoiceModel,
      }
    );

    const invoice = await invoiceRepository.find("1");

    expect(invoice.id.id).toBe("1");
    expect(invoice.name).toBe("Invoice 1");
    expect(invoice.document).toBe("Document 123");
    expect(invoice.address.street).toBe("Street 1");
    expect(invoice.address.city).toBe("City 123");
    expect(invoice.address.state).toBe("State 123");
    expect(invoice.address.complement).toBe("Complemnt 123");
    expect(invoice.address.number).toBe("123");
    expect(invoice.address.zipCode).toBe("123456");
    expect(invoice.items.length).toBe(1);
  });

  it("should generate an invoice", async () => {
    const invoiceRepository = new InvoiceRepository();

    const input = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "Document 123",
      address: new Address({
        street: "Street 1",
        number: "123",
        complement: "Complemnt 123",
        city: "City 123",
        state: "State 123",
        zipCode: "123456",
      }),
      items: [
        new Product({
          id: new Id("1"),
          name: "Product 1",
          price: 100,
        }),
      ],
    });

    const invoice = await invoiceRepository.generate(input);

    await InvoiceModel.findOne({
      where: { id: "1" },
      include: ProductInvoiceModel,
    });

    expect(invoice.id.id).toBe("1");
    expect(invoice.name).toBe("Invoice 1");
    expect(invoice.document).toBe("Document 123");
    expect(invoice.address.street).toBe("Street 1");
    expect(invoice.address.city).toBe("City 123");
    expect(invoice.address.state).toBe("State 123");
    expect(invoice.address.complement).toBe("Complemnt 123");
    expect(invoice.address.number).toBe("123");
    expect(invoice.address.zipCode).toBe("123456");
    expect(invoice.items.length).toBe(1);
  });
});
