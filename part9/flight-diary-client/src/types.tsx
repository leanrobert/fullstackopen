//export type Weather = 'rainy' | 'sunny' | 'windy' | 'cloudy' | 'stormy'

//export type Visibility = 'great' | 'good'| 'poor' | 'ok'

export interface Entry {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment?: string
}

export type NewEntry = Omit<Entry, 'id'>