import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CategoryService } from '../services/category/category.service';
import { map } from 'rxjs';

export class MyValidators {
  static validPassword(control: AbstractControl){
    const value = control.value;
    if(!containsNumber(value)){
      return { invalid_password: true };
    }
    return null;
  }

  static matchPasswords(control: AbstractControl){
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password === confirmPassword){
      return null;
    }
    return { match_passwords: true };
  }

  static rangeValidator(control: AbstractControl){
    const minNum = control.get('rangeNum.minNum')?.value;
    const maxNum = control.get('rangeNum.maxNum')?.value;

    if (minNum >= maxNum){
      return { range_invalid: true };
    }
    return null;
  }

  // static validateCategory(service: CategoryService){
  //   return (control: AbstractControl) => {
  //     const value = control.value;
  //     return service.checkCategory(value)
  //     .pipe(
  //       map((resp: any) => {
  //         const isAvailable = resp.isAvailable;
  //         if(!isAvailable){
  //           return {not_available: true}
  //         }
  //         return null
  //       })
  //     );

  //   }
  // }
}

function containsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}

function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}
