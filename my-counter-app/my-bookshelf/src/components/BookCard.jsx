export default function BookCard({ title, author, rating, comment }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-sm font-semibold text-amber-700">
          ★ {rating}
        </span>
      </div>

      <p className="mb-3 text-sm font-medium text-slate-600">著者: {author}</p>
      <p className="text-sm leading-6 text-slate-700">{comment}</p>
    </article>
  );
}
