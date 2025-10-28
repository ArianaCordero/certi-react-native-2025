import { Ionicons } from '@expo/vector-icons';
export const STEPS = [
    {
        key: 'map',
        title: 'Mapa',
        subtitle: 'Explora el mapa para encontrar tiendas cercanas y descubrir ofertas especiales.',
        image: <Ionicons name="map-outline" size={64} color="#f9738f" />,
        backgroundColor: '#fff'
    },
    {
        key: 'stores',
        title: 'Tiendas',
        subtitle: 'Navega por una lista de tiendas participantes y consulta sus detalles.',
        image: <Ionicons name="storefront-outline" size={64} color="#f9738f" />,
        backgroundColor: '#fff'
    },
    {
        key: 'favorites',
        title: 'Favoritos',
        subtitle: 'Guarda tus tiendas favoritas y accede a ellas fácilmente.',
        image: <Ionicons name="heart-outline" size={64} color="#f9738f" />,     
        backgroundColor: '#fff'
    },
    {
        key: 'profile',
        title: 'Perfil',
        subtitle: 'Gestiona tu perfil y preferencias de usuario.',
        image: <Ionicons name="person-outline" size={64} color="#f9738f" />,
        backgroundColor: '#fff'
    },
]