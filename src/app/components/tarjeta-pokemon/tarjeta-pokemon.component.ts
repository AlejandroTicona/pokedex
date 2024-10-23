import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Resultado } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

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
  id: string = "0";

  ngOnChanges(changes: SimpleChanges): void {
    this.extraerInformacion();
  }

  extraerInformacion() {
    if (this.data) {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      this.pokemonService.getById(this.id);
    }
  }
}
