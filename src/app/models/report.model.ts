export class Report {
  formatted_date?: string;
  summary?: string;
  precip_type?: string;
  temperature?: number;
  apparent_temperature?: number;
  humidity?: number;
  wind_speed?: number;
  wind_bear?: number;
  visibility?: number;
  loud_cover?: number;
  pressure?: number;
  daily_summary?: string;

  constructor(data?: any) {
    this.formatted_date = data?.formatted_date;
    this.summary = data?.summary;
    this.precip_type = data?.precip_type;
    this.temperature = data?.temperature
      ? parseFloat(data.temperature)
      : undefined;
    this.apparent_temperature = data?.apparent_temperature
      ? parseFloat(data.apparent_temperature)
      : undefined;
    this.humidity = data?.humidity ? parseFloat(data.humidity) : undefined;
    this.wind_speed = data?.wind_speed
      ? parseFloat(data.wind_speed)
      : undefined;
    this.wind_bear = data?.wind_bear ? parseFloat(data.wind_bear) : undefined;
    this.visibility = data?.visibility
      ? parseFloat(data.visibility)
      : undefined;
    this.loud_cover = data?.loud_cover
      ? parseFloat(data.loud_cover)
      : undefined;
    this.pressure = data?.pressure ? parseFloat(data.pressure) : undefined;
    this.daily_summary = data?.daily_summary;
  }
}
