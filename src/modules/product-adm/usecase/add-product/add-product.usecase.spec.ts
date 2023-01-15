import { AddProductInputDTO } from "./add-product.dto";
import { AddProductUseCase } from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Product usecase unit teste", () => {
  it("should add a product", async () => {
    const productRepository = MockRepository();

    const usecase = new AddProductUseCase(productRepository);

    const input: AddProductInputDTO = {
      name: "Product1",
      description: "Product1 Description",
      purchasePrice: 100,
      stock: 10,
    };

    const output = await usecase.execute(input);

    expect(productRepository.add).toHaveBeenCalled();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.description).toBe(input.description);
    expect(output.purchasePrice).toBe(input.purchasePrice);
    expect(output.stock).toBe(input.stock);
  });
});
