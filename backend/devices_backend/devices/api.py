from django.shortcuts import get_object_or_404
from ninja_extra import NinjaExtraAPI, api_controller, route, permissions, throttle
from devices.models import Device, Location
from devices.schemas import (
    DeviceSchema,
    LocationSchema,
    DeviceCreateSchema,
    Error,
    DeviceLocationPatch,
)


app = NinjaExtraAPI()

@api_controller('/devices', tags=['Devices'], permissions=[permissions.IsAuthenticatedOrReadOnly])
class DeviceController:

    @route.get("/", response=list[DeviceSchema], permissions=[])
    @throttle
    def get_devices(self):
        return Device.objects.all()
    
    @route.post("/", response={200: DeviceSchema, 404: Error})
    def create_device(self, device: DeviceCreateSchema):
        if device.location_id:
            # we have a location ID in the body
            location_exists = Location.objects.filter(id=device.location_id).exists()
            if not location_exists:
                return 404, {"message": "Location not found"}

        device_data = device.model_dump()
        device_model = Device.objects.create(**device_data)
        return device_model

    @route.get("/{slug}/", response=DeviceSchema)
    def get_device(self, slug: str):
        device = get_object_or_404(Device, slug=slug)
        return device
    

    @route.post('/{device_slug}/set-location/', response=DeviceSchema)
    def update_device_location(self, device_slug, location: DeviceLocationPatch):
        device = get_object_or_404(Device, slug=device_slug)
        if location.location_id:
            location = get_object_or_404(Location, id=location.location_id)
            device.location = location
        else:
            device.location = None

        device.save()
        return device


@api_controller('/locations', tags=['Locations'], permissions=[])
class LocationController:
    @route.get("/", response=list[LocationSchema])
    def get_locations(self):
        return Location.objects.all()


app.register_controllers(
    DeviceController,
    LocationController
)