import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/prduct.model";
import { CartService } from "src/app/services/cart.service";

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  cols: number = 3;
  rowHeight: keyof typeof ROWS_HEIGHT = ROWS_HEIGHT[this.cols];
  category: string | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onAddToCart($event: Product): void {
    this.cartService.addToCart({
      id: $event.id,
      name: $event.title,
      price: $event.price,
      product: $event.image,
      quantity: 1,
    });
  }

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(currentCategory: string): void {
    this.category = currentCategory;
  }
}
