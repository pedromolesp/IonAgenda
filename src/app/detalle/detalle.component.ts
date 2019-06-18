import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactosService } from '../contactos.service';
import { Contacto } from '../modelo/contacto';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  contacto: Contacto;
  id: string;

  constructor(private api: ContactosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.contacto = {
      id: this.id,
      nombre: null,
      telefono: null,
      imagen: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-contact-512.png'
    }
    //  console.log(this.contacto.id);
    this.api.getContacto(this.id).subscribe(
      (contacto) => {
        this.contacto.id = this.id;
        //console.log('asignación en subscribe' + this.contacto.id);
        this.contacto.nombre = contacto.get('nombre');
        this.contacto.telefono = contacto.get('telefono');
        this.contacto.imagen = contacto.get('imagen');
      }
    );
  }
  eliminarContacto() {
    //console.log(this.contacto.id);
    this.api.borrarContacto(this.contacto);
    this.router.navigate(['tabs/tab1']);

  }
  navegarEditar() {
    this.router.navigate(['editar/' + this.id]);

  }
  navegarLista() {
    this.router.navigate(['tabs/tab1']);

  }
}
