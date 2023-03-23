import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '../interface/Proveedor';
import { ProveedoresService } from '../services/proveedores.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-formularioproveedores',
  templateUrl: './formularioproveedores.component.html',
  styleUrls: ['./formularioproveedores.component.css']
})
export class FormularioproveedoresComponent {
  bandera : boolean = false; // bandera para comprobar el estado de la alerta
  alerta : string = '';
  status : string = '';

  @Input() proveedoresSeleccionado : Proveedor = {
    id: 0,
    codigoProveedor: '',
    razonSocial: '',
    rfc: '',
    direccion: '',
    email: ''

  }

  constructor(private proveedoresService : ProveedoresService, 
              private activatedRoute : ActivatedRoute,
              private router : Router){
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activatedRoute.params.subscribe(params =>{
      console.log(params);
      console.log(params["id"]);
      const id = params["id"];
      this.status = id == undefined ? "agregar" : "modificar";
      this.proveedoresSeleccionado = id==undefined ? this.proveedoresSeleccionado : this.proveedoresService.seleccionar(id);
    });
  }

  cerrar(){
    this.bandera = false;
  }

 /* articulos : Articulo[] = [
    { codigo : "1", descripcion : "papa", precio : 10.55},
    { codigo : "2", descripcion : "manzana", precio : 12.81 },
    { codigo : "3", descripcion : "melon", precio : 52.23 },
    { codigo : "4", descripcion : "cebolla", precio : 17 },
    { codigo : "5", descripcion : "calabaza", precio : 23 }
  ];*/


  

  // Método agregar
  agregar() {
    if (this.proveedoresSeleccionado.id == 0 || this.proveedoresSeleccionado.codigoProveedor == '' || this.proveedoresSeleccionado.razonSocial == '' || this.proveedoresSeleccionado.rfc == '' || this.proveedoresSeleccionado.direccion == '' || this.proveedoresSeleccionado.email == '')
    {
      //alert("Llene todos los campos");
      this.bandera = true;
      this.alerta = "Llene todos los campos";
      return;
    }
    /*const busqueda = this.articulos.filter(a => a.codigo == this.articulosSeleccionado.codigo)
    
    if (busqueda.length != 0) {
      // alert("No es posible que existan dos articulos con el mismo codigo");
      this.bandera = true;
      this.alerta = "No es posible que existan dos articulos con el mismo codigo";
      return;
    }*/

    if (this.proveedoresService.validacion(this.proveedoresSeleccionado)) {
      this.bandera = true;
      this.alerta = "No es posible que existan dos articulos con el mismo codigo";
      return;
    } 

    this.proveedoresService.agregar({
      ...this.proveedoresSeleccionado
    });
    this.proveedoresSeleccionado = {
      id: 0,
      codigoProveedor: '',
      razonSocial: '',
      rfc: '',
      direccion: '',
      email: ''
    }
  }

  // Método modificar
  modificar() {

    Swal.fire({
      title: '¿Estás seguro de la modificación?',
      text: "No podrás revertir la decisión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, modifica el elemento'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proveedoresService.modificar(this.proveedoresSeleccionado);
        this.router.navigate(['/proveedores']);
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }

  // Método regresar
  regresar() {
    this.router.navigate(['/proveedores']);
  }

}
