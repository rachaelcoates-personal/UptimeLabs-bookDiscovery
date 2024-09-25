// export const dynamic = 'force-static';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.replace(/ /g, '+') || '';

  const res = await fetch('https://openlibrary.org/search.json?q='+query+'&limit=10', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}
