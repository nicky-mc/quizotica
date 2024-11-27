import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), "scores.json");

export async function GET(request) {
  // Read Scores from JSON file
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath);
  const scores = JSON.parse(data);
  return new Response(JSON.stringify(scores), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request) {
  const { username, category, score } = await request.json();
  if (!username || !category || score === undefined) {
    return new Response(JSON.stringify({ message: "Invalid data" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : JSON.stringify([]);
  const scores = JSON.parse(data);

  // Add the new score
  scores.push({ username, category, score, date: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));

  return new Response(JSON.stringify({ message: "Score saved" }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}