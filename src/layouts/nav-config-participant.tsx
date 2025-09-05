import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

/**
 * Fonction utilitaire pour créer les icônes SVG de la navigation
 * @param name - Nom du fichier d'icône (sans extension)
 * @returns Composant SvgColor configuré
 */
const icon = (name: string) => (
    <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

/**
 * Collection d'icônes disponibles pour la navigation de l'espace participant
 * Utilise les icônes SVG stockées dans le dossier assets/icons/navbar/
 */
const ICONS = {
    // Icônes principales
    job: icon('ic-job'),
    blog: icon('ic-blog'),
    chat: icon('ic-chat'),
    mail: icon('ic-mail'),
    user: icon('ic-user'),
    file: icon('ic-file'),
    lock: icon('ic-lock'),
    tour: icon('ic-tour'),
    order: icon('ic-order'),
    label: icon('ic-label'),
    blank: icon('ic-blank'),
    kanban: icon('ic-kanban'),
    folder: icon('ic-folder'),
    course: icon('ic-course'),
    banking: icon('ic-banking'),
    booking: icon('ic-booking'),
    invoice: icon('ic-invoice'),
    product: icon('ic-product'),
    calendar: icon('ic-calendar'),
    disabled: icon('ic-disabled'),
    external: icon('ic-external'),
    menuItem: icon('ic-menu-item'),
    ecommerce: icon('ic-ecommerce'),
    analytics: icon('ic-analytics'),
    dashboard: icon('ic-dashboard'),
    phototheque: icon('ic-phototheque'),
    parameter: icon('ic-parameter'),
    // Icônes spécifiques au participant
    activities: icon('ic-calendar'), // Réutilisation de l'icône calendrier pour les activités
    interactions: icon('ic-chat'),   // Icône chat pour les interactions
    home: icon('ic-dashboard'),      // Icône dashboard pour l'accueil
};

// ----------------------------------------------------------------------

/**
 * Configuration de la navigation pour l'espace Participant
 * Définit la structure du menu latéral avec les trois sections principales :
 * - Accueil : Dashboard et profil du participant
 * - Activités : Gestion des activités et inscriptions
 * - Mes Interactions : Communications et interactions
 */
export const participantNavData: NavSectionProps['data'] = [
    {
        items: [
            {
                title: 'Accueil',
                path: paths.participant.root,
                icon: ICONS.home,
                info: (
                    <Label color="info" variant="inverted">
                        Dashboard
                    </Label>
                ),
            },
            {
                title: 'Activités',
                path: paths.participant.enligne.activites, // ou utilisez une logique conditionnelle
                icon: ICONS.activities,
                info: (
                    <Label color="success" variant="inverted">
                        Mes événements
                    </Label>
                ),
            },
            {
                title: 'Mes Interactions',
                path: paths.participant.enligne.mesinteractions, // ou utilisez une logique conditionnelle
                icon: ICONS.interactions,
                info: (
                    <Label color="warning" variant="inverted">
                        Communication
                    </Label>
                ),
            },
        ],
    },
];

export { ICONS };