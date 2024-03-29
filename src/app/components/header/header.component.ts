import { Component, Input, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  @Input()
  get cart(): Cart {
    return this.#cart;
  }

  set cart(cart: Cart) {
    this.#cart = cart;

    this.itemsQuantity = cart.items.reduce(
      (totalQuantity, currentQuantity) =>
        totalQuantity + currentQuantity.quantity,
      0
    );
  }

  #cart: Cart = {
    items: [],
  };
  itemsQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
