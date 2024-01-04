
const Footer = () => {
    return (
        <>
            <footer className="p-4 bg-gray-800 text-white shadow md:px-6 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="#" target="_blank" className="flex items-center mb-4 sm:mb-0">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png" className="mr-4 h-8" alt="Pokedeck Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Pokedeck</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
                        <li>
                            <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Acerca</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Politica de Privacidad</a>
                        </li>
                        <li>
                            <a href="#"
                                className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Licencias</a>
                        </li>
                        <li>
                            <a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">Contacto</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Franco Guevara™. All Rights Reserved.
                </span>
            </footer>
        </>
    )
}

export default Footer;