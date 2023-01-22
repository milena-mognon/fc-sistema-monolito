import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { Product } from "../domain/product.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe("Store Catalog facade unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 Description",
      salesPrice: 10,
    });

    const facade = StoreCatalogFacadeFactory.create();

    const result = await facade.find({ id: "1" });

    expect(result.id).toBe("1");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Product 1 Description");
    expect(result.salesPrice).toBe(10);
  });

  it("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 Description",
      salesPrice: 10,
    });
    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Product 2 Description",
      salesPrice: 20,
    });

    const facade = StoreCatalogFacadeFactory.create();

    const result = await facade.findAll({});

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe("1");
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[0].description).toBe("Product 1 Description");
    expect(result.products[0].salesPrice).toBe(10);
    expect(result.products[1].id).toBe("2");
    expect(result.products[1].name).toBe("Product 2");
    expect(result.products[1].description).toBe("Product 2 Description");
    expect(result.products[1].salesPrice).toBe(20);
  });
});
