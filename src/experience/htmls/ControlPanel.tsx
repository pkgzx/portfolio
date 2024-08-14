import { useEffect, useRef, useState, useContext } from 'react'
import { animated, config, useSpring } from '@react-spring/web'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

import { AppContext } from '@/src/context/appContext'
import {
    aboutSectionTop,
    skillsSectionTop,
    studySectionTop,
    worksSectionTop,
    testimonialsSectionTop
} from '@/src/utilities/constants'
import { FaMoon, FaSun } from 'react-icons/fa6'

const containerLaptopHeight = 150
const containerMobileHeight = 230
const extraPaddingTop = 20

const navTab = [
    { name: 'Sobre mi', top: aboutSectionTop },
    { name: 'Proyectos', top: studySectionTop },
    { name: 'Habilidades', top: skillsSectionTop },
    { name: 'Trabajo', top: worksSectionTop },
    { name: 'Contacto', top: testimonialsSectionTop }
]

export function ControlPanel() {
    const htmlContainerRef = useRef<HTMLDivElement>(null)
    const [isPanelExpanded, setIsPanelExpanded] = useState<boolean>(window.innerWidth > 768)
    const { isLightMode, handleSetBrightness } = useContext(AppContext)

    const handleClickToggleSlider = () => {
        setIsPanelExpanded(!isPanelExpanded)
    }

    const handleClickToggleColorMode = () => {
        handleSetBrightness(isLightMode ? 0 : 100)
    }

    useEffect(() => {
        const handleSetPanelCollapsedTop = () => {
            if (htmlContainerRef.current) {
                htmlContainerRef.current.style.transform = isPanelExpanded
                    ? `translateY(-${extraPaddingTop}px)`
                    : `translateY(-${window.innerWidth <= 420 ? containerMobileHeight : containerLaptopHeight}px)`
            }
        }

        window.addEventListener('resize', handleSetPanelCollapsedTop)

        return () => {
            window.removeEventListener('resize', handleSetPanelCollapsedTop)
        }
    }, [isPanelExpanded])

    const htmlSpring = useSpring({
        transform: isPanelExpanded
            ? `translateY(-${extraPaddingTop}px)`
            : `translateY(-${window.innerWidth <= 420 ? containerMobileHeight : containerLaptopHeight}px)`,
        boxShadow: isPanelExpanded ? '' : 'none',
        config: config.stiff
    })

    return (
        <animated.section
            ref={htmlContainerRef}
            className='fixed right-[40px] top-0 z-50 grid h-[100px] w-[400px] grid-cols-7 grid-rows-2 gap-[10px] rounded-b-[12px] bg-black/40 p-[8px] pt-[28px] text-center text-white shadow-xl backdrop-blur-sm max-md:right-0 max-xs:h-[230px] max-xs:w-full max-xs:grid-rows-5'
            style={htmlSpring}
        >
            <button
                className={`col-span-1 row-span-1 flex items-center justify-center overflow-hidden rounded-full p-[4px] text-[16px] shadow-lg hover:cursor-pointer max-xs:col-span-1 ${
                    isLightMode ? 'bg-blue-700' : 'bg-yellow-500'
                }`}
                onClick={handleClickToggleColorMode}
                aria-label='Toggle color mode'
            >
                {isLightMode ? <FaMoon /> : <FaSun />}
            </button>

            <nav className='clock-blackground-sm col-span-7 row-span-1 flex items-center justify-evenly rounded-[8px]'>
                {navTab.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => document.documentElement.scrollTo({ top: tab.top, behavior: 'smooth' })}
                        className="relative translate-y-[-1px] cursor-pointer pl-[4px] pr-[4px] text-sm font-medium after:absolute after:left-1/2 after:block after:h-[3px] after:w-0 after:-translate-y-[1px] after:bg-accent after:content-[''] after:[transition:width_0.15s_ease-out,left_0.15s_ease-out] hover:after:left-0 hover:after:w-full"
                    >
                        {tab.name}
                    </button>
                ))}
            </nav>

            <button
                onClick={handleClickToggleSlider}
                className='absolute bottom-0 right-0 -translate-x-1/2 translate-y-full cursor-pointer rounded-b-[8px] bg-clock-element shadow-lg transition-colors hover:bg-black'
            >
                {isPanelExpanded ? (
                    <IoIosArrowUp
                        strokeWidth={16}
                        preserveAspectRatio='none'
                        className='ml-[6px] mr-[6px] h-[22px] w-[30px]'
                        aria-label='Hide'
                        aria-expanded={true}
                    />
                ) : (
                    <IoIosArrowDown
                        strokeWidth={16}
                        preserveAspectRatio='none'
                        className='ml-[6px] mr-[6px] h-[22px] w-[30px]'
                        aria-label='Show'
                        aria-expanded={false}
                    />
                )}
            </button>
        </animated.section>
    )
}
