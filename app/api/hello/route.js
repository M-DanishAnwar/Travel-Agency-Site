export async function GET(request) {
  return new Response(JSON.stringify({ message: "Welcome to Voyage3D API" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}