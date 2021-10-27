import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cidade } from '../model/Cidades';
import { Pessoa } from '../model/Pessoa';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  estados = require('../util/estados.json');

  cidades = require('../util/cidades.json');

  nomesHomem = require('../util/nomes-homem.json');

  nomesMulher = require('../util/nomes-mulher.json');

  sobrenome = require('../util/sobrenomes.json');

  gerarPessoa: FormGroup;

  cidadesEstados : Array<Cidade> = new Array<Cidade>();

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.gerarPessoa = this.formBuilder.group({
      sexo: ['', [Validators.required]],
      estado: [''],
      cidade: ['']
    });

    this.gerarPessoa.controls['estado'].valueChanges.subscribe(value => {
      this.setCidade();
    });
  }

  setCidade(){
    const estado = this.gerarPessoa.get('estado').value;
    this.cidadesEstados = [];

    this.cidades.forEach(element => {
      if(element.Estado == estado.ID){
        this.cidadesEstados.push(element as never);
      }
    });
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  gerarCpf() {
    const num1 = this.aleatorio();
    const num2 = this.aleatorio();
    const num3 = this.aleatorio();
    const dig1 = this.dig(num1, num2, num3, undefined);
    const dig2 = this.dig(num1, num2, num3, dig1);
    return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
  }

  dig(n1, n2, n3, n4) { 
    const nums = n1.split("").concat(n2.split(""), n3.split(""));
    if (n4 !== undefined){ 
      nums[9] = n4;
    }
    
    let x = 0;
    for (let i = (n4 !== undefined ? 11:10), j = 0; i >= 2; i--, j++) {
      x += parseInt(nums[j]) * i;
    }
    
    const y = x % 11;
    return y < 2 ? 0 : 11 - y; 
  }

  aleatorio() {
    const aleat = Math.floor(Math.random() * 999);
    return ("" + aleat).padStart(3, '0'); 
  }

  gerarNumeroAleatorio(max:number, min:number){
    return Math.floor(Math.random() * max) - min;
  }

  gerarJsonPessoa(){
    this.submitted = true;
    if(this.gerarPessoa.valid){
      let pessoa = new Pessoa();
      const dados = this.gerarPessoa.getRawValue();

      pessoa = {...dados};
      pessoa.sobrenome = this.sobrenome[this.gerarNumeroAleatorio(1801, 0)];
      pessoa.dataNascimento = this.randomDate(new Date(1955, 0, 1), new Date());
      pessoa.cpf = this.gerarCpf();

      if(dados.sexo == 'aleatorio'){
        this.gerarNumeroAleatorio(2, 0) == 0 ? pessoa.sexo = "masculino" : pessoa.sexo = "feminino";
      }

      if(!pessoa.cidade ){

      }

      if(!pessoa.estado){

      }
      
      if(dados.sexo == 'masculino'){
        pessoa.nome = this.nomesHomem[this.gerarNumeroAleatorio(151, 0)];
      } else {
        pessoa.nome = this.nomesMulher[this.gerarNumeroAleatorio(151, 0)];
      }

      console.log(pessoa);
      

      // this.toastr.success('Hello world!', 'Toastr fun!');

    }else{

    }

  }

}
