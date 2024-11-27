//api/scores/route.js
import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('quizotica');
    const scores = await db.collection('scores').find({}).toArray();
    return new Response(JSON.stringify(scores), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching scores:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request) {
  try {
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
  } catch (error) {
    console.error('Error saving score:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}