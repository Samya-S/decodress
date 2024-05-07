export async function GET(request) {
    const pincodes = {
        "721302": ["Kharagpur", "West Bengal"],
        "110003": ["Delhi", "Delhi"],
        "560017": ["Bangalore", "Karnataka"],
        "400001": ["Mumbai", "Maharashtra"],
        "600001": ["Chennai", "Tamil Nadu"],
        "700001": ["Kolkata", "West Bengal"],
    }
    return Response.json(pincodes)
}