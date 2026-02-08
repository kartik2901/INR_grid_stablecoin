
import localFont from "next/font/local";
import { Poppins } from 'next/font/google'

export const aileron = localFont({
    src: [
        {
            path: '../../public/fonts/Aileron-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Aileron-Heavy.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Aileron-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Aileron-Italic.woff2',
            weight: 'normal',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Aileron-Bold.woff2',
            weight: 'bold',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Aileron-UltraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Aileron-Thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Aileron-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Aileron-Regular.woff2',
            weight: 'normal',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: "--font-aileron"
})

// If loading a variable font, you don't need to specify the font weight
export const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ["400",],
    variable: "--font-poppins",
})