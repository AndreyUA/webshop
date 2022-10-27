import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/prduct.model";

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(
    limit: number = 12,
    sort: string = "desc",
    category?: string
  ): Observable<Product[]> {
    if (!category) {
      return this.httpClient.get<Product[]>(
        `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`
      );
    }

    return this.httpClient.get<Product[]>(
      `${STORE_BASE_URL}/products/category/${category}?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
}
