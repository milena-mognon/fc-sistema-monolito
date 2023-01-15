import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { Product } from "../domain/product.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ProductRepository } from "./product.repository";

describe("ProductRepository test", () => {
  let sequilize: Sequelize;

  beforeEach(async () => {
    sequilize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequilize.addModels([ProductModel]);
    await sequilize.sync();
  });

  afterEach(async () => {
    await sequilize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();

    const input = {
      id: new Id("1"),
      name: "Product1",
      description: "Product1 Description",
      purchasePrice: 100,
      stock: 10,
    };

    const product = new Product(input);

    await productRepository.add(product);

    const productDB = await ProductModel.findOne({
      where: {
        id: input.id.id,
      },
    });

    expect(productDB.id).toBeDefined();
    expect(productDB.name).toBe(input.name);
    expect(productDB.description).toBe(input.description);
    expect(productDB.purchasePrice).toBe(input.purchasePrice);
    expect(productDB.stock).toBe(input.stock);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    await ProductModel.create({
      id: "1",
      name: "Product1",
      description: "Product1 Description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const productDB = await productRepository.find("1");

    expect(productDB.id).toBeDefined();
    expect(productDB.name).toBe("Product1");
    expect(productDB.description).toBe("Product1 Description");
    expect(productDB.purchasePrice).toBe(100);
    expect(productDB.stock).toBe(10);
  });
});
