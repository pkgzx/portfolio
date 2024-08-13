function Firebg({ mountRef }: { mountRef: React.RefObject<HTMLDivElement> }) {
    return <div className='fix top-0 h-full w-full' id='firebg' ref={mountRef}></div>
}

export default Firebg
