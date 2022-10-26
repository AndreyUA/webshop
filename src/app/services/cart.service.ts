import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({ items: [] });

  constructor(private snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items: CartItem[] = [...this.cart.value.items];

    const itemInCart = items.find((currentItem) => item.id === currentItem.id);

    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.snackBar.open("1 item added to cart.", "OK", { duration: 3000 });

    console.log(this.cart.value);
  }

  getTotal(items: CartItem[]): number {
    return items.reduce(
      (totalPrice, totalItemPrice) => totalPrice + totalItemPrice.quantity,
      0
    );
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this.snackBar.open("Cart is clear", "OK", {
      duration: 3000,
    });
  }
}
