import fs from 'fs';
import path from 'path';

const filePath = path.join( process.cwd(), "scores.json" );
export default function handler ( req, res ) { 
    if ( req.method === "GET" ) {
        //Read Scores from JSON file
        if(!fs.existsSync(filePath)){
            fs.writeFileSync(filePath, JSON.stringify([]));
        }
        const data = fs.readFileSync( filepath );
        const scores = JSON.parse( data );
        res.status(200).json(scores);
    } else if (req.method === "POST") {
      // Save new score to the JSON file
      const { username, category, score } = req.body;
      if (!username || !category || score === undefined) {
        return res.status(400).json({ message: "Invalid data" });
      }
  
      const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : JSON.stringify([]);
      const scores = JSON.parse(data);
  
      // Add the new score
      scores.push({ username, category, score, date: new Date().toISOString() });
      fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));
  
      res.status(201).json({ message: "Score saved" });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  }
  
  