<p align="center">
  <a href="https://kubide.es/" target="blank"><img src="https://kubide.es/wp-content/uploads/2016/06/logotipo-blanco-300.png" width="320" alt="Kubide Logo" /></a>
</p>

## Descripción

**McFly NestJS / Kubide-messenger**. Ejercicio con NestJS y Mongoose. Ejemplo de una API de mensajeria entre usuarios.

Documentacion generada con Postman para uso de la API
https://documenter.getpostman.com/view/15547352/UVkvKYQZ

## Acceso

La API se esta ejecutando en un container en AWS utilizando MongoDB Atlas como base de datos, puede ser accedido en la siguiente DNS pública:
```
http://ec2-34-209-140-11.us-west-2.compute.amazonaws.com
```

Para testear la API se creó una colección de Postman que podrá ser importada mediante el siguiente link:
```
https://www.getpostman.com/collections/283552b43a4195b908cc
```

Para ejecutar las llamadas de la coleccion de Postman debes crear un nuevo entorno con las siguiente variables:

1. `API_URL` con el valor `http://ec2-34-209-140-11.us-west-2.compute.amazonaws.com`
2. `token` con el valor que obtengas una vez generes uno con /auth/login  



## Acceso Local

Si decides implementar la API localmente

### Prerequisitos
- npm
- Node.js
- git
- mongoDB

### Configuración
1. Clonar el respositorio
```bash
git clone https://github.com/GermanBerdi/kubide-messenger.git
```
2. Instalar las dependencias
```bash
cd kubide-messenger
npm install
```

### Ejecutando la aplicación

```bash
# development
$ npm run start:dev
```

### Pruebas con Postman
Para ejecutar las llamadas de la coleccion de Postman debes crear un nuevo entorno con las siguiente variables:

1. `API_URL` con el valor `http://localhost:3000`
2. `token` con el valor que obtengas una vez generes uno con /auth/login  

### Observaciones del autor.

1. Cuando se obtiene la lista de todos los usuarios o la lista de usuarios activos se ocultan los password de los mismos de manera intencionada.

**Mejoras para futuras versiones**
1. Implementar mejor validaciones y control de errores con avisos que den pautas respecto del comportamiento de la API, por ejemplo que un usuario no pueda tener el campo mail vacio o que un usuario no pueda modificar su email si ese mail ya esta en uso por otro usuario. Tambien podrias recibir tu propio mensaje devuelto cuando se lo intentas enviar a un usuario inactivo

2. Implementar distinto niveles de usuario. Un usuario con privilegios de adminitrador podria cambiar datos de otros usuario o fijar el estado de otro usuario en inactivo, cambiar la clave de otro usuario, etc.

3. Las password deberian guardase encriptadas y no como texto plano en la BBDD

4. Implementacion de un logout

**Mas alla del planteo incial para esta version**
1. La funcion Delete User es inconsistente porque no borra las notificaciones del usuario, ademas habria que decidir que hacer con los mensaje recibidor por ese usuario. 

## Autor

**Germán Berdichevsky**

- [LinkedIn](https://www.linkedin.com/in/germanberdi/)
- [GitHub](https://github.com/GermanBerdi/)

## License
- [MIT licensed](LICENSE).
