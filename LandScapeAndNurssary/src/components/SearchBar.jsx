import { Search } from 'lucide-react'

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-emerald-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-14 pr-6 py-5 bg-white border border-nature-100 rounded-[2rem] text-primary-950 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all font-bold text-lg shadow-sm"
        placeholder="What green companion are you looking for?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
