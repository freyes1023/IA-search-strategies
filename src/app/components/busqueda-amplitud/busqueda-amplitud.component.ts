import { Component } from '@angular/core';
/* 
class Nodo {
  constructor(public datos: any, public padre: Nodo, public valorArista: number) {
    this.hijos = [];
  }

  hijos: Nodo[];

  agregarHijo(datos: any, valorArista: number): Nodo {
    const nodo = new Nodo(datos, this, valorArista);
    this.hijos.push(nodo);
    return nodo;
  }
}

class ArbolBusqueda {
  constructor(public raiz: Nodo) {}

  buscar(solucion: any): Nodo {
    let nodosPorBuscar: Nodo[] = [this.raiz];
    while (nodosPorBuscar.length > 0) {
      const nodoActual = nodosPorBuscar.shift();
      if (nodoActual.datos.esSolucion(solucion)) {
        return nodoActual;
      }
      const hijos = nodoActual.datos.generarHijos();
      hijos.forEach(hijo => {
        const valorArista = hijo.valorArista;
        delete hijo.valorArista; // Eliminar el valor de la arista para evitar un ciclo infinito en la serialización a JSON
        const nodoHijo = nodoActual.agregarHijo(hijo, valorArista);
        nodosPorBuscar.push(nodoHijo);
      });
    }
    return null;
  }
}

class DatosBusqueda {
  constructor(public valor: number) {}

  esSolucion(solucion: number): boolean {
    return this.valor === solucion;
  }

  generarHijos(): any[] {
    // Generar los nodos hijos aquí
    return [
      { valor: 2, valorArista: 1 },
      { valor: 3, valorArista: 2 },
      { valor: 4, valorArista: 3 }
    ];
  }
}
 */
@Component({
  selector: 'app-busqueda-amplitud',
  templateUrl: './busqueda-amplitud.component.html',
  styleUrls: ['./busqueda-amplitud.component.scss']
})
export class BusquedaAmplitudComponent {
/*   raiz: DatosBusqueda = new DatosBusqueda(1);
  arbol: ArbolBusqueda = new ArbolBusqueda(new Nodo(this.raiz, null, 0));
  solucion = 4;
  nodoSolucion: Nodo 

  buscar() {
    this.nodoSolucion = this.arbol.buscar(this.solucion);
  } */
}
