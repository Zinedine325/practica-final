import { Injectable } from '@angular/core';
import { Proveedor } from '../interface/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  proveedores : Proveedor[] = [
    { id : 1, codigoProveedor : "1111", razonSocial : "Ejemplo SA de CV", rfc : "HCSFSA213", direccion: "Las Villas, 324", email: "proveedor1@gmail.com"},
    { id : 2, codigoProveedor : "2222", razonSocial : "Ejemplo SA de CV", rfc : "HCSFSA213", direccion: "Las Villas, 324", email: "proveedor2@gmail.com"},
    { id : 3, codigoProveedor : "3333", razonSocial : "Ejemplo SA de CV", rfc : "HCSFSA213", direccion: "Las Villas, 324", email: "proveedor3@gmail.com"},
    { id : 4, codigoProveedor : "4444", razonSocial : "Ejemplo SA de CV", rfc : "HCSFSA213", direccion: "Las Villas, 324", email: "proveedor4@gmail.com"},
    { id : 5, codigoProveedor : "5555", razonSocial : "Ejemplo SA de CV", rfc : "HCSFSA213", direccion: "Las Villas, 324", email: "proveedor5@gmail.com"}
  ];

  constructor() { }

  returnData(){
    return this.proveedores;
  }

  validacion(proveedor : Proveedor) : boolean{
    const busqueda = this.proveedores.filter(p => p.id == proveedor.id)
    
    if (busqueda.length != 0) {
      return true;
    }
    return false;
  }

  agregar(proveedor : Proveedor){
    this.proveedores.push(proveedor);
  }

  seleccionar (id : number) : Proveedor{
    return this.proveedores.find(prov => prov.id == id)!;
  }

  getIndex(proveedor : Proveedor){
    let index = 0;
    this.proveedores.forEach(prov => {
      if(proveedor.id == prov.id){
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
