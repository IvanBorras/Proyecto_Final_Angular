import { Pipe, PipeTransform } from '@angular/core';
import { Series } from '../interfaces/series';

@Pipe({
  name: 'filterSeriesThema',
  standalone: true
})
export class FilterSeriesThemaPipe implements PipeTransform {

  transform(value: Series[], filtro: string): Series[] {
    if (!value || !filtro) {
      return value;
    }

    return value.filter(series => 
      series.thema.toLowerCase().includes(filtro.toLowerCase())
    );
  }
}
