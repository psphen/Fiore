import { Component, inject, OnInit, signal, Input, output, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryModel } from '../../../../../../models/category.model';

@Component({
  selector: 'app-category-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm implements OnInit {
  protected categoryForm!: FormGroup;
  protected readonly selectImage = signal<File | null>(null);
  protected readonly imagePreview = signal<string>('');
  protected readonly idCategory = signal<string>('');
  protected readonly isNew = signal<boolean>(true);

  @Input()
  set category(data: CategoryModel | null) {
    if (data){
      this.isNew.set(false);
      this.categoryForm.patchValue(data);
    }
  }

  @Output() create = new EventEmitter<CategoryModel>();
  @Output() update = new EventEmitter<CategoryModel>();

  constructor(
    private fb: FormBuilder,
  ){
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  private initializeForm(){
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  get nameField(){ return this.categoryForm.get('name'); }
  get slugField(){ return this.categoryForm.get('slug'); }
  get imageField(){ return this.categoryForm.get('image'); }

  protected onImageSubmit(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]){
      this.selectImage.set(input.files[0]);

      this.categoryForm.patchValue({
        image: 'file-selected'
      });

      const reader = new FileReader;
      reader.onload = (e) => {
        this.imagePreview.set(e.target?.result as string);
      }

      const file = this.selectImage();
      if(file){
        reader.readAsDataURL(file);
      }
    }
  }

  protected save(){
    if(this.categoryForm.valid){
      if(this.isNew()){
        this.create.emit(this.categoryForm.value);
      } else {
        this.update.emit(this.categoryForm.value);
      }
    } else {
      this.categoryForm.markAllAsDirty();
    }
  }
}
