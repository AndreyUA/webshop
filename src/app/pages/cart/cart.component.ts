import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { loadStripe } from "@stripe/stripe-js";

import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit, OnDestroy {
  cart$: Subscription | null = null;
  checkout$: Subscription | null = null;
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 1,
        id: 2,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 6,
        id: 3,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 1,
        id: 4,
      },
    ],
  };
  dataSource: CartItem[] = [];
  displayedColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(
    private cartService: CartService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;

    this.cart$ = this.cartService.cart.subscribe((cart: Cart) => {
      this.cart = cart;
      this.dataSource = this.cart.items;
    });
  }

  ngOnDestroy(): void {
    this.cart$?.unsubscribe();
    this.checkout$?.unsubscribe();
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onCheckout(): void {
    this.checkout$ = this.httpClient
      .post("http://localhost:8000/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (response: any) => {
        try {
          let stripe = await loadStripe(
            "pk_test_51LxbbjGuRlF5pgZEc3ShjX4b8YCUT5Srkm596wEpmkwPPVwdsfe1flp4Z2aT0P6MstQK6Q4Xs8StkJQ9Kvm8Bw1w00rRkL5FQK"
          );

          stripe?.redirectToCheckout({
            sessionId: response.id,
          });
        } catch (error) {
          console.log("error", error);
        }
      });
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onReduceQuantity(item: CartItem): void {
    this.cartService.reduceQuantity(item);
  }
}
