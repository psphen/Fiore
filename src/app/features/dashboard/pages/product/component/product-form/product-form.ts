import { Component, EventEmitter, inject, Input, OnInit, Output, output, signal } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModel, ProductSaveUpda } from '../../../../../../models/product.model';
import { CategoryModel } from '../../../../../../models/category.model';
import { CategoryService } from '../../../../../../services/category/category.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  protected productForm!: FormGroup;
  protected readonly categories = signal<CategoryModel[]>([]);
  protected readonly isNew = signal<boolean>(true);

  private categoryService = inject(CategoryService);

  @Input() set product(data: ProductModel | null){
    if(data){
      this.isNew.set(false);
      this.productForm.patchValue({
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.images[0] || '',
        category: data.category.id
      });
    }
  }
  @Output() create = new EventEmitter<ProductSaveUpda>();
  @Output() update = new EventEmitter<ProductSaveUpda>();

  constructor(
    private fb: FormBuilder
  ){
    this.initialForm()
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  private loadCategory(){
    this.categoryService.getAllCategory().subscribe({
      next: (resp) => {
        this.categories.set(resp);
      }
    });
  }

  protected initialForm(){
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      address: this.fb.array([])
    });
  }

  get titleField(){ return this.productForm.get('title'); }
  get priceField(){ return this.productForm.get('price'); }
  get descriptionField(){ return this.productForm.get('description'); }
  get imageField(){ return this.productForm.get('image'); }
  get categoryField(){ return this.productForm.get('category'); }
  get addressField(){ return this.productForm.get('address') as FormArray; }

  protected addAddressField(){
    this.addressField.push(this.createAddress())
  }

  protected deleteAddressField(index: number){
    this.addressField.removeAt(index);
  }

  private createAddress(){
    return this.fb.group({
      zip: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  protected save(){
    if(this.productForm.valid){
      const formData = this.productForm.value;
      const payload: ProductSaveUpda = {
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        categoryId: Number(formData.category),
        images: [formData.image]
      };

      if(this.isNew()){
        this.create.emit(payload);
      }else{
        this.update.emit(payload);
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
