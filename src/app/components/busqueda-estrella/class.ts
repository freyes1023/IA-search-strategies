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
  
  // Crear las ciudades
  const cartagena = new City('Cartagena', 0, 0, 415);
  const barranquilla = new City('Barranquilla', 150, 0, 380);
  const santaMarta = new City('Santa Marta', 250, 50, 260);
  const valledupar = new City('Valledupar', 300, 100, 180);
  const bucaramanga = new City('Bucaramanga', 400, 200, 210);
  const cucuta = new City('Cúcuta', 450, 250, 310);
  const bogota = new City('Bogotá', 500, 300, 255);
  const manizales = new City('Manizales', 600, 300, 175);
  const pereira = new City('Pereira', 650, 350, 125);
  const medellin = new City('Medellín', 700, 400, 0);
  
  // Crear las conexiones entre las ciudades
  cartagena.addNeighbor(barranquilla, 150);
  barranquilla.addNeighbor(santaMarta, 200);
  santaMarta.addNeighbor(valledupar, 150);
  valledupar.addNeighbor(bucaramanga, 200);
  bucaramanga.addNeighbor(cucuta, 140);
  cucuta.addNeighbor(bogota, 480);
  bogota.addNeighbor(manizales, 190);
  manizales.addNeighbor(pereira, 40);
  pereira.addNeighbor(medellin, 180);
  
  // Encontrar el camino más corto
  const shortestPath = findShortestPath(cartagena, medellin);
  
  if (shortestPath) {
  console.log('El camino más corto es: ' + shortestPath.join(' -> '));
  } else {
  console.log('No se encontró un camino posible.');
  }
  /* class City {
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
        city = city.neighbors.reduce((a, b) => a.totalDistance < b.totalDistance ? a : b);
      }

      path.unshift(startCity.name);
      return path;
    }

    currentCity.neighbors.forEach((neighbor) => {
      if (!neighbor.visited) {
        const tentativeTotalDistance = currentCity.totalDistance + 1;
        if (tentativeTotalDistance < neighbor.totalDistance) {
          neighbor.totalDistance = tentativeTotalDistance;
          citiesToVisit.push(neighbor);
        }
      }
    });
  }

  return null;
}

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

cartagena.addNeighbor(barranquilla, 1);
barranquilla.addNeighbor(santaMarta, 1);
santaMarta.addNeighbor(valledupar, 3);
valledupar.addNeighbor(bogota, 4);
bogota.addNeighbor(manizales, 1);
bogota.addNeighbor(pereira, 1);
manizales.addNeighbor(pereira, 1);
pereira.addNeighbor(bucaramanga, 3);
bucaramanga.addNeighbor(cucuta, 4);
cucuta.addNeighbor(medellin
 */