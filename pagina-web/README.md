# Cómo correr el proyecto web?
Ubicarse en el directorio del proyecto
```
npm install  
```
Incluso si hay dependencias rotas por versiones de node, se debería poder correr el servidor de desarrollo

```
npm run dev
```
Ahora el servidor de desarrollo se debería estar ejecutando en 2do plano

```
ps aux | grep vite
```

```
netstat -tlnp | grep :5173
```


Ahora el proyecto debería estar corriendo en el puerto  [http://localhost:5173](http://localhost:5173)
