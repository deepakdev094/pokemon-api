import PokemonTable from "./components/PokemonTable";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center bg-indigo-100 font-[sans-serif]">
      <div className="container mx-auto h-screen p-4">
        <h1 className="heading">Pokémon Data Table</h1>
        <PokemonTable />
      </div>
    </main>
  );
}
