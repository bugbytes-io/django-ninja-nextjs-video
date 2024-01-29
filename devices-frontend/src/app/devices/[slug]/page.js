import LocationModal from "@/app/components/LocationModal"

async function getDevice(slug) {
    const endpoint = `http://127.0.0.1:8000/api/devices/${slug}`
    const res = await fetch(endpoint, {cache: 'no-store'})

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getLocations() {
    const endpoint = "http://127.0.0.1:8000/api/locations"
    const res = await fetch(endpoint)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Device({params}) {
    const [device, locations] = await Promise.all([getDevice(params.slug), getLocations()])
    
    return (
        <div className="flex flex-col items-center mt-2">
            
            <h1 className="text-4xl">Device: {params.slug}</h1>
            
            <div className="mt-6 border-top">
                <p className="text-xl">{device.id} - {device.name}</p>
                
                <div className="mt-3">
                    { device.location ? 
                        <p>Current Location: <span className="font-bold">{device.location.name}</span></p>
                    :
                        <p>Device has no location!</p> 
                    }

                    <LocationModal locations={locations} device={device} />
                    
                </div>
            </div>
        </div> 
    )
}