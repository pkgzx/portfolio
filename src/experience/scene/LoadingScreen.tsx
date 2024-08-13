import { useContext, useEffect, useMemo, useRef } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import { LuMouse } from 'react-icons/lu'

import * as THREE from 'three'

import { AppContext } from '@/src/context/appContext'

import type { LottieRefCurrentProps } from 'lottie-react'
import Firebg from '@/src/shaders/firebg/Firebg'
import { SmokeScene } from 'react-smoke'
import { div } from 'three/examples/jsm/nodes/Nodes.js'

export function LoadingScreen() {
    const { isLoading, isStarted, setIsStarted } = useContext(AppContext)
    const lighthouseLottieRef = useRef<LottieRefCurrentProps | null>(null)
    const boatWheelLottieRef = useRef<LottieRefCurrentProps | null>(null)
    const dockLottieRef = useRef<LottieRefCurrentProps | null>(null)
    const startButtonRef = useRef<HTMLButtonElement | null>(null)
    const smokeColor = useMemo(() => new THREE.Color('white'), [])

    const handleClickStartExperience = () => {
        window.removeEventListener('wheel', handleClickStartExperience)
        window.removeEventListener('touchmove', handleClickStartExperience)
        lighthouseLottieRef.current?.playSegments([900, 2000], true)

        if (startButtonRef.current) {
            startButtonRef.current.style.opacity = '0'
        }

        setTimeout(() => {
            lighthouseLottieRef.current?.destroy()
            dockLottieRef.current?.destroy()
            boatWheelLottieRef.current?.destroy()
            setIsStarted(true)
        }, 200)
    }

    return (
        <section
            className='absolute flex h-full min-h-[600px] w-full flex-col items-center justify-center overflow-y-auto bg-[#000000] transition-opacity duration-500 ease-in'
            style={{ opacity: isStarted ? 0 : 1, pointerEvents: isStarted ? 'none' : 'all' }}
        >
            {isLoading ? (
                <h1 className='text-4xl font-extrabold text-white max-md:text-3xl max-sm:text-2xl max-xs:text-xl'>
                    Cargando <span className='text-accent'>portfolio</span>...
                </h1>
            ) : (
                <div className='h-full w-full'>
                    <div className='w-sreen flex h-screen flex-col items-center justify-center '>
                        <SmokeScene
                            smoke={{
                                color: smokeColor,
                                density: 30,
                                enableRotation: true,
                                enableTurbulence: true,
                                enableWind: true
                            }}
                            scene={{
                                background: new THREE.Color('black')
                            }}
                        />
                        <div
                            className='absolute flex h-full w-full flex-col items-center justify-center overflow-y-hidden text-[#ffffff] hover:cursor-pointer'
                            onClick={handleClickStartExperience}
                        >
                            <div className='flex items-center flex-col-reverse md:justify-center md:flex-row gap-20 md:w-full'>
                                <img src='rider.gif' alt='Logo' className='ease-in md:mb-40' />
                                <h1 className='md:mx-20 w-96 text-6xl md:text-8xl font-extrabold absolute sm:top-0 sm:mt-20 md:relative md:mb-20'>
                                    Bienvenido a Ghost Rider <span className='text-accent'>portfolio</span>
                                </h1>
                            </div>
                            <div className='absolute bottom-0'>
                                <div className=' flex flex-col items-center justify-center'>
                                    <div className='flex items-center justify-center'>
                                        <LuMouse className='h-8 w-8 animate-pulse' />
                                    </div>
                                    <p className='text-md font-bold '>Click para comenzar</p>
                                </div>
                                <div className='flex flex-col items-center justify-center text-orange-500 '>
                                    <FaAngleDown className='h-6 w-6  animate-ping ' />
                                    <FaAngleDown className='h-6 w-6  animate-ping ' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
