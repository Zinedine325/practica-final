import { Injectable } from '@angular/core';
import { Proveedor } from '../interface/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  proveedores : Proveedor[] = [
    { Id : 1, CodigoProveedor : "1111", RazonSocial : "Ejemplo SA de CV", Rfc : "HCSFSA213", Direccion: "Las Villas, 324", Email: "proveedor1@gmail.com"},
    { Id : 2, CodigoProveedor : "2222", RazonSocial : "Ejemplo SA de CV", Rfc : "HCSFSA213", Direccion: "Las Villas, 324", Email: "proveedor2@gmail.com"},
    { Id : 3, CodigoProveedor : "3333", RazonSocial : "Ejemplo SA de CV", Rfc : "HCSFSA213", Direccion: "Las Villas, 324", Email: "proveedor3@gmail.com"},
    { Id : 4, CodigoProveedor : "4444", RazonSocial : "Ejemplo SA de CV", Rfc : "HCSFSA213", Direccion: "Las Villas, 324", Email: "proveedor4@gmail.com"},
    { Id : 5, CodigoProveedor : "5555", RazonSocial : "Ejemplo SA de CV", Rfc : "HCSFSA213", Direccion: "Las Villas, 324", Email: "proveedor5@gmail.com"}
  ];

  constructor() { }

  returnData(){
    return this.proveedores;
  }

  validacion(proveedor : Proveedor) : boolean{
    const busqueda = this.proveedores.filter(p => p.Id == proveedor.Id)
    
    if (busqueda.length != 0) {
      return true;
    }
    return false;
  }

  agregar(proveedor : Proveedor){
    this.proveedores.push(proveedor);
  }

  seleccionar (id : number) : Proveedor{
    return this.proveedores.find(prov => prov.Id == id)!;
  }

  getIndex(proveedor : Proveedor){
    let index = 0;
    this.proveedores.forEach(prov => {
      if(proveedor.Id == prov.Id){
        index = this.proveedores.indexOf(prov)
      }
    });
    return index;
  }

  modificar(proveedor : Proveedor){
    const index = this.getIndex(proveedor);
    this.proveedores[index] = { ...proveedor };
  }

  eliminar(proveedor : Proveedor){
    const index = this.getIndex(proveedor);
    this.proveedores.splice(index,1);
  }

}
