import express ,{Router} from 'express';

//import { execPath, send } from 'process';
import ytdl from'ytdl-core';
const app = express();
export const router = Router();
router.use(express.json())
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath);

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
router.get('/descargar3',  async (req, res) => {
    const url = req.query.url;
    try{
    
    if (ytdl.validateURL(url)) {
        res.header('Content-Disposition', 'attachment; filename="audio.mp3"');
        const video = ytdl(url, { quality: 'highestaudio' });
        ffmpeg(video)
            .audioBitrate(128)
            .format('mp3')
            .pipe(res);
    } else {
        res.status(400).send('URL inválida');
    }
    }catch(e){
        console.log(e)
        res.status(404).send("URL invalida")
    }
})

router.get("/validar", async (req, res) => {
    const url = req.query.url;
    
    try{  if (ytdl.validateURL(url)) {
      
        res.send({valor:1})}
        else{ res.send({valor:0})}}catch(e){

        }
  
})
router.get('/descargar4',  async (req, res) => {
    const url = req.query.url;
    try{ if (ytdl.validateURL(url)) {
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(url, { quality: 'highest' }).pipe(res);
    } else {
        res.status(400).send({error:"url invalida"});
    }}catch(e){
        res.status(400).send({error:"url invalida"});
    }
   
})

router.get("/p",(req, res)=>{
    res.send({"holo":"todovien"})
})


