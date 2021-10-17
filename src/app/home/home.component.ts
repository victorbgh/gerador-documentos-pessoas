import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cidade } from '../model/Cidades';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  estados = require('../util/estados.json');

  cidades = require('../util/cidades.json');

  gerarPessoa: FormGroup;

  cidadesEstados : Array<Cidade> = new Array<Cidade>();

  teste = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.gerarPessoa = this.formBuilder.group({
      sexo: [''],
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
      if(element.Estado == estado){
        this.cidadesEstados.push(element as never);
      }
    });
    

  }

  gerarJsonPessoa(){

  }

}
