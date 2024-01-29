'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function LocationModal(props) {
    const {device, locations} = props  // props.device
    const [selectedLocation, setSelectedLocation] = useState('')
    const router = useRouter()
    
    const closeModal = (e) => {
        e.preventDefault();
        document.getElementById('my_modal_1').close()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedLocation) { return }

        const endpoint = `http://localhost:8000/api/devices/${device.slug}/set-location/`
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({location_id: selectedLocation})
            }).then(response => response.json()).then(data => {
                router.refresh();
                document.getElementById('my_modal_1').close();
            })
    }

    return (
        <div>
            <button className="mt-4 btn btn-success"
                onClick={() => document.getElementById('my_modal_1').showModal()}>
                    Assign Location
            </button>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Change Location</h3>
                    <p className="py-2">Change the location of device {device.name} </p>
                    <form onSubmit={handleSubmit}>
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
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>

        </div>
    )
}