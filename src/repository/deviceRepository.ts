export interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceRepository {
  create(device: Device): Device;
  findAll(): Device[];
  findById(id: string): Device | undefined;
  update(device: Device): void;
  delete(id: string): number;
}
