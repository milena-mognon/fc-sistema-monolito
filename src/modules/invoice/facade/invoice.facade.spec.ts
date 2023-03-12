import { Sequelize } from "sequelize-typescript";
import { ProductInvoiceModel } from "../repository/product-invoice.model";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceFacadeFactory } from "../factory/invoice.factory";

describe("Invoice Facade test", () => {
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
    const facade = InvoiceFacadeFactory.create();

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

    const invoice = await facade.find({ id: "1" });

    expect(invoice.id).toBe("1");
    expect(invoice.name).toBe("Invoice 1");
    expect(invoice.document).toBe("Document 123");
    expect(invoice.address.street).toBe("Street 1");
    expect(invoice.items[0].id).toBe("1");
    expect(invoice.items[0].name).toBe("Product 1");
    expect(invoice.total).toBe(
      invoice.items.reduce((acc, pv) => (acc += pv.price), 0)
    );
  });
});
