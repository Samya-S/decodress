import pincodes from '@/data/pincodes.json'

export async function GET(request) {
    return Response.json(pincodes)
}