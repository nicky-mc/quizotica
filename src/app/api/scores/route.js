import clientPromise from '../../../../lib/mongoDb';

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('quizotica');
  const scores = await db.collection('scores').find({}).toArray();
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
    return new Response(JSON.stringify({ message: 'Invalid data' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const client = await clientPromise;
  const db = client.db('quizotica');
  const result = await db.collection('scores').insertOne({
    username,
    category,
    score,
    date: new Date().toISOString(),
  });

  return new Response(JSON.stringify({ message: 'Score saved' }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}