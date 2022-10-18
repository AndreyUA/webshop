import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  cols: number = 3;
  category: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
  }

  onShowCategory(currentCategory: string): void {
    this.category = currentCategory;
  }
}
