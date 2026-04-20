# Minicore - Calculadora de Comisiones

Aplicación web que calcula la comisión de ventas de vendedores en base a un rango de fechas seleccionado.

## Demo

🔗 [Ver proyecto deployado](https://ejercicio-mvc-minicore.vercel.app/)

📹 [Ver video explicativo](https://youtu.be/LhoMpF6ENZA)

## Tecnologías utilizadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/) — frontend
- [Supabase](https://supabase.com/) — base de datos y API
- [Bootstrap](https://getbootstrap.com/) — estilos
- [Vercel](https://vercel.com/) — deploy

## Estructura de la base de datos

**vendedor** — almacena los vendedores
| columna | tipo |
|---|---|
| id | int8 |
| nombre | text |
| created_at | timestamptz |

**ventas** — almacena las ventas de cada vendedor
| columna | tipo |
|---|---|
| id | int8 |
| vendedor_id | int8 (FK → vendedor.id) |
| monto | numeric |
| fecha_venta | date |
| created_at | timestamptz |

**reglas** — define los porcentajes de comisión según monto mínimo
| columna | tipo |
|---|---|
| id | int8 |
| monto_minimo | numeric |
| porcentaje | numeric |
| created_at | timestamptz |

## Funcionalidad principal

1. Al cargar la app se obtienen los vendedores y reglas desde Supabase
2. El usuario selecciona un rango de fechas y presiona Calcular
3. Se obtienen las ventas del rango seleccionado
4. Se agrupan las ventas por vendedor y se suman los montos
5. Se aplica la regla de comisión correspondiente según el total alcanzado
6. Se muestra una tabla con el resultado por vendedor

## Cómo correr el proyecto localmente

1. Clona el repositorio

```bash
   git clone https://github.com/JohannCalva/minicore.git
   cd minicore
```

2. Instala las dependencias

```bash
   npm install
```

3. Crea un archivo `.env` en la raíz con tus credenciales de Supabase

```bash
   VITE_SUPABASE_URL=tu_url
   VITE_SUPABASE_ANON_KEY=tu_publishable_key
```

4. Ejecuta el proyecto

```bash
   npm run dev
```

## Documentación oficial

- [Documentación React](https://react.dev/)
- [Documentación Vite](https://vitejs.dev/guide/)
- [Documentación Supabase](https://supabase.com/docs)

## Autor

Johann Calva
johann.calva@udla.edu.ec
