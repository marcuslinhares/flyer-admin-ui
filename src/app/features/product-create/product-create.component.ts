import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';  
import { ToastModule } from 'primeng/toast';  
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadEvent } from 'primeng/fileupload';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    FileUploadModule,
    MessageModule, 
    CommonModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    ToastModule, 
    InputTextModule, 
    InputNumberModule, 
    TextareaModule, 
    CardModule
  ],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  providers: [MessageService]
})
export class ProductCreateComponent {
  productForm: FormGroup;
  imageError: string | null = null;
  selectedFile: File | null = null;
  previewImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.productForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      preco: ['', [Validators.required, Validators.min(1)]],
    });
  }


  onFileSelected(event: FileSelectEvent) {
    const fileInput = event.files[0]; // Acessando o arquivo selecionado diretamente
    if (fileInput) {
      // Validar tipo e tamanho da imagem
      if (!fileInput.type.startsWith('image/')) {
        this.imageError = 'O arquivo deve ser uma imagem.';
        this.selectedFile = null;
        return;
      }
      if (fileInput.size > 5 * 1024 * 1024) {
        this.imageError = 'A imagem deve ter no máximo 5MB.';
        this.selectedFile = null;
        return;
      }

      this.selectedFile = fileInput;
      this.imageError = null;

      // Criar uma URL para pré-visualização
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;  // Armazena a imagem para pré-visualização
      };
      reader.readAsDataURL(fileInput);  // Lê a imagem como uma URL base64
    }
  }

  async createProduct() {
    if (this.productForm.invalid || !this.selectedFile) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos corretamente e selecione uma imagem.' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nome', this.productForm.value.nome);
      formData.append('descricao', this.productForm.value.descricao);
      formData.append('preco', this.productForm.value.preco);
      formData.append('imagem', this.selectedFile); 

      await this.productService.createProduct(formData);
      this.messageService.add({ severity: 'success', summary: 'Produto criado', detail: 'Produto criado com sucesso!' });
      this.router.navigate(['/produtos']);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar produto. Tente novamente.' });
    }
  }
}
