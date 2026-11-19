import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,wind_speed_10m&timezone=America%2FGuayaquil&forecast_days=1';

interface FetchDataOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function useFetchData(): FetchDataOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const respuesta = await fetch(API_URL);
                if (!respuesta.ok) {
                    throw new Error(`Error ${respuesta.status} al consultar Open-Meteo`);
                }
                const json: OpenMeteoResponse = await respuesta.json();
                setData(json);
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        };

        obtenerDatos();
    }, []);

    return { data, loading, error };
}