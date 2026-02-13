import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../../../models/category.model';
import { CategoryService } from '../../../../../../services/category/category.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../../../../../models/product.model';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  protected productForm!: FormGroup;
  protected readonly categories = signal<Category[]>([]);
  protected readonly isNew = signal<boolean>(true);

  private categoryService = inject(CategoryService);

  @Input() set product(data: Product | null){
    if(data){
      this.isNew.set(false);
      this.productForm.patchValue({
        ...data
      });
    }
  }
  @Output() create = new EventEmitter<CreateProductDTO>();
  @Output() update = new EventEmitter<UpdateProductDTO>();

  constructor(
    private fb: FormBuilder
  ){
    this.initialForm();
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
      categoryId: ['', Validators.required],
      images: ['', Validators.required]
    })
  }

  get titleField(){ return this.productForm.get('title'); }
  get priceField(){ return this.productForm.get('price'); }
  get descriptionField(){ return this.productForm.get('description'); }
  get categoryField(){ return this.productForm.get('categoryId'); }
  get imageField(){ return this.productForm.get('images'); }
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
      const updaDate: UpdateProductDTO = {
        title: formData.title,
        price: formData.price
      }

      if(this.isNew()){
        this.create.emit(formData);
      }else{
        this.update.emit(updaDate);
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
