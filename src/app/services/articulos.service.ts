import { Injectable } from '@angular/core';
import { Articulo } from '../interface/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  articulos : Articulo[] = [
    { Codigo : "1", Descripcion : "papa", Precio : 10.55},
    { Codigo : "2", Descripcion : "manzana", Precio : 12.81 },
    { Codigo : "3", Descripcion : "melon", Precio : 52.23 },
    { Codigo : "4", Descripcion : "cebolla", Precio : 17 },
    { Codigo : "5", Descripcion : "calabaza", Precio : 23 }
  ];

  constructor() { }

  returnData(){
    return this.articulos;
  }

  validacion(articulo : Articulo) : boolean{
    const busqueda = this.articulos.filter(a => a.Codigo == articulo.Codigo)
    
    if (busqueda.length != 0) {
      return true;
    }
    return false;
  }

  agregar(articulo : Articulo){
    this.articulos.push(articulo);
  }

  seleccionar (cod : string) : Articulo{
    return this.articulos.find(art => art.Codigo == cod)!;
  }

  getIndex(articulo : Articulo){
    let index = 0;
    this.articulos.forEach(art => {
      if(articulo.Codigo == art.Codigo){
        index = this.articulos.indexOf(art)
      }
    });
    return index;
  }

  modificar(articulo : Articulo){
    const index = this.getIndex(articulo);
    this.articulos[index] = { ...articulo };
  }

  eliminar(articulo : Articulo){
    const index = this.getIndex(articulo);
    this.articulos.splice(index,1);
  }
}
