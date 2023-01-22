import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindAllProductsUseCase } from "./find-all-products.usecase";

const product1 = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 Description",
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Product 2 Description",
  salesPrice: 200,
});

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    find: jest.fn(),
  };
};

describe("Find All Product usecase unit test", () => {
  it("should find all products", async () => {
    const productRepository = MockRepository();

    const findAllProductUseCase = new FindAllProductsUseCase(productRepository);

    const result = await findAllProductUseCase.execute({});

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].description).toBe(product1.description);
    expect(result.products[0].salesPrice).toBe(product1.salesPrice);
    expect(result.products[1].id).toBe(product2.id.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].description).toBe(product2.description);
    expect(result.products[1].salesPrice).toBe(product2.salesPrice);
  });
});
