import express,{ Router}from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path"
import play from 'play-dl';

import ffmpeg from 'fluent-ffmpeg';
import ytdl from '@distube/ytdl-core';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// app.get('/descargar', function(req, res) {
//   const url = req.query.url; // La URL del video de YouTube viene de la consulta del usuario
//   const video = youtubedl(url,
//     ['--format=18'],
//     { cwd: __dirname });

//   res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
//   video.pipe(res);
// });

app.get('/download', async (req, res) => {
  const videoUrl = req.query.videoUrl;
  const output = 'video.mp4';

  if (!videoUrl) {
    return res.status(400).send('URL del video es requerida');
  }

try {
  const videoStream = ytdl(videoUrl);

  res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
  res.setHeader('Content-Type', 'video/mp4');

  req.on('close', () => {
    console.log('Solicitud abortada por el cliente');
    videoStream.destroy();
  });

  videoStream.pipe(res)
    .on('finish', () => {
      console.log('Descarga completada');
    }) .on('error', (err) => {
      console.error('Error durante la descarga:', err);
      res.status(500).send('Error durante la descarga');
    });
} catch (err) {
  console.error('Error:', err);
  res.status(500).send('Error al procesar la solicitud');
}
});

  const port = process.env.PORT ?? 4000;
app.listen(port, function() {
  console.log('Aplicación escuchando en el puerto 3000!');
});