import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory: EventEmitter<string> = new EventEmitter();
  categories: string[] | null = null;
  categories$: Subscription | null = null;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categories$ = this.storeService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  ngOnDestroy(): void {
    this.categories$?.unsubscribe();
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
