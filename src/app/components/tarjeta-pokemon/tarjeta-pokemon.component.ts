import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Resultado } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-tarjeta-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrl: './tarjeta-pokemon.component.scss'
})
export class TarjetaPokemonComponent implements OnChanges {

  constructor(private pokemonService: PokemonService) { }

  @Input() data?: Resultado;
  @Input() seleccionado: boolean = false;
  @Input() fullData?: Pokemon;
  @Output() clickeado = new EventEmitter<string>();
  id: string = "0";

  ngOnChanges(changes: SimpleChanges): void {
    this.extraerInformacion();
  }

  extraerInformacion() {
    if (this.data && this.data.url !== "") {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      return
    }
    if (this.fullData) {
      this.id = this.fullData.species.url.substring(42, this.fullData.species.url.length - 1);
      this.data = {
        name: this.fullData.species.name,
        url: ""
      }
    }
  }
}
