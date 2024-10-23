import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FotoPokemonComponent } from '../../components/foto-pokemon/foto-pokemon.component';
import { TarjetaPokemonComponent } from '../../components/tarjeta-pokemon/tarjeta-pokemon.component';
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FotoPokemonComponent, TarjetaPokemonComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private pokemon: PokemonService) { }

  @ViewChild('tarjetas') tarjetasElement!: ElementRef;

  listaPokemons: Resultado[] = [];

  pagina: number = 1;
  cargando: boolean = false;

  ngOnInit(): void {
    this.cargarLista();
  }

  async cargarLista() {
    this.cargando = true;
    this.listaPokemons = [...this.listaPokemons, ...await this.pokemon.getByPage(this.pagina)];
    this.cargando = false;
    this.pagina++;
  }

  onScroll(e: any) {
    if (
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      )
      === e.srcElement.scrollHeight) {
      this.cargarLista()
    }
  }
}
