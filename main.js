import express,{ Router}from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { router } from './routerr.js';
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next(); 
  });
app.set("new site","polar");
app.use(express.urlencoded({
    extended:true
}))


app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, './interfas/index.html'));
  //res.sendFile('./interfas/index.html');
});
app.use("/polar",router)
// app.get('/descargar', function(req, res) {
//   const url = req.query.url; // La URL del video de YouTube viene de la consulta del usuario
//   const video = youtubedl(url,
//     ['--format=18'],
//     { cwd: __dirname });

//   res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
//   video.pipe(res);
// });
  const port = process.env.PORT ?? 3000;
app.listen(port, function() {
  console.log('Aplicación escuchando en el puerto 3000!');
});