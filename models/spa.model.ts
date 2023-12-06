import { Dayjs } from 'dayjs';

export interface SPAModel {
  timestamp: string;
  temp_air: number;
  temp_water: number;
  id: number;
  error_message: string;
  created: string;
}
