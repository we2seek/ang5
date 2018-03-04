import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [MatButtonModule, MatIconModule, MatInputModule, ReactiveFormsModule];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule { }