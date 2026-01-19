import { Component, EventEmitter, inject, Input, OnInit, Output, output, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModel } from '../../../../../../models/product.model';
import { CategoryModel } from '../../../../../../models/category.model';
import { CategoryService } from '../../../../../../services/category/category.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  protected readonly idProduct = signal<number>(0);
  protected readonly isNew = signal<boolean>(true);
  protected readonly categories = signal<CategoryModel[]>([]);

  protected productForm!: FormGroup;

  private categoryService = inject(CategoryService);

  @Input()
  set product(data: ProductModel | null){
    if (data){
      this.isNew.set(false);
      this.idProduct.set(data.id);
      this.productForm.patchValue({
        ...data,
        category: data.category.id
      });
    }
  }

  @Output() create = new EventEmitter<ProductModel>();
  @Output() update = new EventEmitter<ProductModel>();

  constructor(
    private fb: FormBuilder
  ){
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  private loadCategory(){
    this.categoryService.getAllCategory().subscribe({
      next: (resp) => {
        this.categories.set(resp);
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  private initializeForm(){
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(500)]],
      image: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      address: this.fb.array([])
    });
  }

  protected addAddressField(){
    this.addressField.push(this.createAddressField());
  }

  protected deleteAddressField(index: number){
    this.addressField.removeAt(index);
  }

  private createAddressField(){
    return this.fb.group({
      zip: ['', Validators.required],
      text: ['', Validators.required]
    })
  }

  get titleField(){ return this.productForm.get('title'); }
  get slugField(){ return this.productForm.get('slug'); }
  get priceField(){ return this.productForm.get('price'); }
  get imageField(){ return this.productForm.get('image'); }
  get categoryField(){ return this.productForm.get('category'); }
  get descriptionField(){ return this.productForm.get('description'); }
  get addressField(){ return this.productForm.get('address') as FormArray; }

  protected save(){
    if(this.productForm.valid){
      if(this.isNew()){
        this.create.emit(this.productForm.value);
      } else {
        this.update.emit(this.productForm.value);
      }
    } else {
      this.productForm.markAllAsTouched()
    }
  }
}
