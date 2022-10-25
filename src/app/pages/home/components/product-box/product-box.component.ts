import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/prduct.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  @Input() isFullWidthMode: boolean = false;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter();

  product: Product | undefined = {
    id: 1,
    title: "Snickers",
    price: 150,
    category: "shoes",
    description: "Description",
    image: "https://via.placeholder.com/150",
  };

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
