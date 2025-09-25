export default function Profile(){
return (
<section className="py-12">
<div className="mx-auto max-w-4xl px-4">
<h1 className="text-3xl font-bold">Profile</h1>
<p className="text-zinc-500 mt-1">Página do usuário com avatar, bio, stack e links.</p>
<div className="mt-6 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 p-6">
<div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
<h3 className="mt-4 text-xl font-semibold">Gabriel Gomes</h3>
<p className="text-zinc-500">Frontend • React • Tailwind</p>
</div>
</div>
</section>
)
}