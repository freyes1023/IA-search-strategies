import { Component, OnInit } from '@angular/core';
class City {
  name: string;
  x: number;
  y: number;
  distanceToFinish: number;
  totalDistance: number;
  visited: boolean;
  neighbors: City[];

  constructor(name: string, x: number, y: number, distanceToFinish: number) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.distanceToFinish = distanceToFinish;
    this.totalDistance = Infinity;
    this.visited = false;
    this.neighbors = [];
  }

  addNeighbor(city: City, distance: number) {
    this.neighbors.push(city);
    city.neighbors.push(this);
  }
}

function findShortestPath(startCity: City, finishCity: City) {
  const citiesToVisit = [startCity];

  startCity.totalDistance = 0;

  while (citiesToVisit.length > 0) {
    citiesToVisit.sort((a, b) => a.totalDistance - b.totalDistance);
    const currentCity = citiesToVisit.shift()!;
    currentCity.visited = true;

    if (currentCity === finishCity) {
      const path: string[] = [];
      let city = finishCity;

      while (city !== startCity) {
        path.unshift(city.name);
        city = city.neighbors.reduce((a, b) => {
          return b.totalDistance < a.totalDistance ? b : a;
        });
      }

      path.unshift(startCity.name);
      return path;
    }

    currentCity.neighbors.forEach((neighbor) => {
      if (!neighbor.visited) {
        const distanceToNeighbor = Math.sqrt(
          Math.pow(currentCity.x - neighbor.x, 2) +
            Math.pow(currentCity.y - neighbor.y, 2)
        );
        const totalDistance =
          currentCity.totalDistance +
          distanceToNeighbor +
          neighbor.distanceToFinish;

        if (totalDistance < neighbor.totalDistance) {
          neighbor.totalDistance = totalDistance;
        }

        if (!citiesToVisit.includes(neighbor)) {
          citiesToVisit.push(neighbor);
        }
      }
    });
  }

  return null;
}

@Component({
  selector: 'app-busqueda-estrella',
  templateUrl: './busqueda-estrella.component.html',
  styleUrls: ['./busqueda-estrella.component.scss']
})
export class BusquedaEstrellaComponent implements OnInit {

  shortestPath: string[] | null = null;

  ngOnInit() {
    // Crear las ciudades
    const cartagena = new City('Cartagena', 2, 6, 3);
const barranquilla = new City('Barranquilla', 4, 5, 2);
const santaMarta = new City('Santa Marta', 4, 4, 1);
const valledupar = new City('Valledupar', 7, 6, 4);
const bucaramanga = new City('Bucaramanga', 8, 3, 5);
const cucuta = new City('Cúcuta', 10, 1, 7);
const bogota = new City('Bogotá', 7, 1, 6);
const manizales = new City('Manizales', 5, 2, 3);
const pereira = new City('Pereira', 6, 2, 2);
const medellin = new City('Medellín', 4, 1, 0);
    
    // Crear las conexiones entre las ciudades
    cartagena.addNeighbor(barranquilla, 150);
    barranquilla.addNeighbor(santaMarta, 200);
    santaMarta.addNeighbor(valledupar, 150);
    valledupar.addNeighbor(bucaramanga, 200);
    bucaramanga.addNeighbor(cucuta, 150);
    cucuta.addNeighbor(bogota, 300);
    bogota.addNeighbor(manizales, 200);
    manizales.addNeighbor(pereira, 50);
    pereira.addNeighbor(medellin, 120);
    
    // Encontrar la ruta más corta desde Cartagena hasta Medellín
    const shortestPath = findShortestPath(cartagena, medellin);
    
    if (shortestPath !== null) {
      this.shortestPath = shortestPath
    console.log(`La ruta más corta es: ${shortestPath.join(' -> ')}`);
    } else {
    console.log('No se encontró una ruta desde la ciudad de inicio hasta la ciudad de destino.');
    }
  }

}
