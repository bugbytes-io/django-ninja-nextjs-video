'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function CreateDeviceForm(props) {
    const {locations} = props
    const [selectedLocation, setSelectedLocation] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        const endpoint = "http://localhost:8000/api/devices/"
        const body = {
            name: deviceName,
            location_id: selectedLocation || null
        }
        fetch(endpoint, {method: 'POST', body: JSON.stringify(body)})
            .then(response => response.json())
            .then(data => {
                router.push('/devices')
                router.refresh()
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
                <div className="label">
                    <label className="label-text">Device Name</label>
                </div>
                <input type="text" 
                    className="input input-bordered w-full max-w-xs" 
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}/>
            </div>
            <div className="form-control mb-4">
                <select className="select select-bordered"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}>

                    <option disabled value=''>Select Location</option>

                    {locations.map(location => 
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>)}

                </select>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}