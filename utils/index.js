import { NextResponse } from 'next/server';

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export function createInternalResponse({ data = null, error = null }) {
  return { data, error };
}

export function createExternalResponse({ data, error }) {
  if (error) return new NextResponse(JSON.stringify({ error }), { status: 200 });
  return new NextResponse(JSON.stringify({ data }), { status: 200 });
}

export async function createRequest({ endpoint, method = 'get', body, headers }) {
  const methods = {
    'get': 'GET',
    'post': 'POST',
    'put': 'PUT',
    'delete': 'DELETE'
  };

  const url = NEXT_PUBLIC_API_BASE_URL + endpoint;
  const reqObj = { method: methods[method] };
  if (body) reqObj.body = JSON.stringify(body);
  if (headers) reqObj.headers = generateHeadersObject(headers, method);

  return await fetch(url, reqObj);
}