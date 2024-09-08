import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Pipe({
  name: 'filterMoviesThema',
  standalone: true
})
export class FilterMoviesThemaPipe implements PipeTransform {

  transform(value: Movie[], filtro: string): Movie[] {
    if (!value || !filtro) {
      return value;
    }

    return value.filter(movie => 
      movie.thema.toLowerCase().includes(filtro.toLowerCase())
    );
  }

}
