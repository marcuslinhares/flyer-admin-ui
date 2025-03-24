export interface Product{
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  created?: string;
  updated?: string;
}

export interface ProductCreate{
  nome: string;
  descricao: string;
  preco: number;
  posicao: number;
}