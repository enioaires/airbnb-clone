'use client'
import { FC } from 'react'
import { Search as SearchIcon } from 'lucide-react'

interface SearchProps {

}

const Search: FC<SearchProps> = ({ }) => {
    return (
        <div
            className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
        >
            <div className='flex items-center justify-between'>
                <div className='text-sm font-semibold px-6'>
                    Qualquer lugar
                </div>
                <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                    Qualquer semana
                </div>
                <div className='text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3'>
                    <div className='hidden sm:block'>
                        Hóspedes?
                    </div>
                    <div className='p-2 bg-rose-500 rounded-full text-white '>
                        <SearchIcon size={14} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search