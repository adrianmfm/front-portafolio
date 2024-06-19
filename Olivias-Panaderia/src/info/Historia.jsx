/* eslint-disable react/no-unescaped-entities */
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography, Avatar, Container, Box } from '@mui/material';
import ResponsiveAppBar from '../AppBar';

const Historia = () => {
  return (
    
    <Container maxWidth="md" sx={{ mt: 25 }}>
        <ResponsiveAppBar/>

      <Typography variant="h4" align="center" gutterBottom>
        Historia de Olivia's Panadería & Pastelería Saludable
      </Typography>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#f9c74f', color: '#fff' }}
        >
          <Box display="flex" alignItems="center">
            <Avatar alt="logo" src="/imagenes/logo-olivias.jpeg" sx={{ marginRight: '8px' }} />
            <Typography variant="h6" className="vertical-timeline-element-title">
              Fundación de Olivia's Panadería & Pastelería Saludable
            </Typography>
          </Box>
          <Box>
            <img src="/imagenes/Torta.jpeg" alt="Fundación" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
            <Typography>
              Olivia's Panadería & Pastelería Saludable es un emprendimiento familiar que se dedica a elaborar productos saludables de panadería y pastelería, creando productos para distintas alergias alimentarias, principalmente para diabéticos y celíacos.
            </Typography>
          </Box>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#f9c74f', color: '#fff' }}
        >
          <Typography variant="h6" className="vertical-timeline-element-title">
            Enfoque en la calidad y materias primas locales
          </Typography>
          <Box>
            <img src="/imagenes/fondo2.webp" alt="Materias Primas" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
            <Typography>
              El objetivo de este emprendimiento es entregar un producto que cubra las distintas problemáticas de salud utilizando materias primas de calidad a través de la compra de insumos locales.
            </Typography>
          </Box>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#f9c74f', color: '#fff' }}
        >
          <Typography variant="h6" className="vertical-timeline-element-title">
            Desarrollo de productos personalizados
          </Typography>
          <Box>
            <img src="/imagenes/Galletas.jpg" alt="Productos Personalizados" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
            <Typography>
              El proyecto busca desarrollar productos personalizados para cada dolencia de salud, donde la dueña del negocio cuenta con experiencia de varios años a nivel internacional y nacional y con una maestría en celiaquía.
            </Typography>
          </Box>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{ background: '#f9c74f', color: '#fff' }}
        >
          <Typography variant="h6" className="vertical-timeline-element-title">
            Expansión y reconocimiento
          </Typography>
          <Box>
            <img src="/imagenes/logo-olivias.jpeg" alt="Expansión" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
            <Typography>
              Olivia's Panadería & Pastelería Saludable continúa creciendo, ganando reconocimiento por la calidad de sus productos y su enfoque en las necesidades de salud de sus clientes.
            </Typography>
          </Box>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Container>
  );
};

export default Historia;
