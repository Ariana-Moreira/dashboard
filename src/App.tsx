import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function App() {
    const { data, loading, error } = useFetchData();


    return (
        <Grid container spacing={5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* Encabezado */}
            <Grid size={{ xs: 12, md: 12 }}>
                <HeaderUI />
            </Grid>

            {/* Alertas */}
            <Grid size={{ xs: 12, md: 12 }}
                container sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>

                <AlertUI description="No se prevén lluvias" />
                <AlertUI description="Índice UV alto" severity="warning" variant="filled" />

            </Grid>


            {/* Selector */}
            <Grid size={{ xs: 12, md: 3 }}>
                <SelectorUI />
            </Grid>

            {/* Indicadores */}
            <Grid container size={{ xs: 12, md: 9 }}>

                {loading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}

                <Grid size={{ xs: 12, md: 3 }}>
                    {data &&
                        (<IndicatorUI
                            title='Temperatura (2m)'
                            description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {data &&
                        (<IndicatorUI
                            title='Temperatura aparente'
                            description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {data &&
                        (<IndicatorUI
                            title='Velocidad del viento'
                            description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {data &&
                        (<IndicatorUI
                            title='Humedad relativa'
                            description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`} />)
                    }
                </Grid>

            </Grid>

            {/* Gráfico */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                {data && (
                    <ChartUI
                        title='Temperatura y viento por hora'
                        labels={data.hourly.time.map((tiempo) => tiempo.slice(11))}
                        values1={data.hourly.temperature_2m}
                        values2={data.hourly.wind_speed_10m}
                        label1={`Temperatura (${data.hourly_units.temperature_2m})`}
                        label2={`Viento (${data.hourly_units.wind_speed_10m})`} />
                )}
            </Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                {data && (
                    <TableUI
                        labels={data.hourly.time.map((tiempo) => tiempo.slice(11))}
                        values1={data.hourly.temperature_2m}
                        values2={data.hourly.wind_speed_10m}
                        header1={`Temperatura (${data.hourly_units.temperature_2m})`}
                        header2={`Viento (${data.hourly_units.wind_speed_10m})`} />
                )}
            </Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

        </Grid>
    );
}

export default App;