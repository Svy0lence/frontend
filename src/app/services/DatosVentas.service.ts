import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private selectedProductsSource = new BehaviorSubject<any[]>([]);
  selectedProducts$ = this.selectedProductsSource.asObservable();

  constructor() {}

  sendSelectedProducts(newProducts: any[]) {
    const currentProducts = this.selectedProductsSource.getValue();
    let updatedProducts = [...currentProducts];

    newProducts.forEach(newProduct => {
      updatedProducts.push({ ...newProduct });
    });

    this.selectedProductsSource.next(updatedProducts);

  }

  removeSelectedProduct(productId: number) {
    const currentProducts = this.selectedProductsSource.getValue();
    const updatedProducts = currentProducts.filter(product => product.id !== productId);

    this.selectedProductsSource.next(updatedProducts);
  }
  }
