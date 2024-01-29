import CreateDeviceForm from "@/app/components/CreateDeviceForm"

async function getLocations() {
    const endpoint = "http://127.0.0.1:8000/api/locations"
    const res = await fetch(endpoint)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function DeviceCreate() {
    const locations = await getLocations()

    return (
        <div className="flex flex-col items-center mt-2">
            <h1 className="text-4xl mb-4">Add new device</h1>

            <CreateDeviceForm locations={locations} />
        </div>
    )

}