import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/prduct.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols: number = 3;
  rowHeight: keyof typeof ROWS_HEIGHT = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Product[] | undefined = undefined;
  sort: string = "desc";
  count: number = 12;
  products$: Subscription | null = null;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.products$?.unsubscribe();
  }

  getProducts(): void {
    this.products$?.unsubscribe();

    this.products$ = this.storeService
      .getAllProducts(this.count, this.sort)
      .subscribe((products) => (this.products = products));
  }

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
