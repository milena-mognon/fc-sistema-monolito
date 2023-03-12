import {
  Table,
  Model,
  PrimaryKey,
  Column,
  BelongsTo,
} from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: "productsInvoice",
  timestamps: false,
})
export class ProductInvoiceModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @BelongsTo(() => InvoiceModel, { foreignKey: "invoice_id" })
  Invoice: InvoiceModel[];
}
