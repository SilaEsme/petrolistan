import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Girişi | Petrolistan',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>
}) {
  const { error, from } = await searchParams

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09121E] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-[#0D1B2A] rounded-xl shadow-sm border border-gray-200 dark:border-white/10 w-full max-w-sm p-8">
        <div className="mb-6">
          <span className="text-xs font-medium text-[#0C447C] dark:text-blue-400 uppercase tracking-wider">
            Petrolistan
          </span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-1">Admin Girişi</h1>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm px-4 py-3">
            Şifre hatalı, tekrar deneyin.
          </div>
        )}

        <form action="/api/admin/login" method="POST" className="flex flex-col gap-4">
          <input type="hidden" name="from" value={from ?? '/admin/keys'} />
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 dark:border-white/20 rounded-lg text-sm bg-white dark:bg-[#09121E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0C447C]/40 dark:focus:ring-blue-500/40"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0C447C] hover:bg-[#042C53] text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  )
}
