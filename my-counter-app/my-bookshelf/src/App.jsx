import BookCard from './components/BookCard';

const books = [
  {
    id: 1,
    title: '吾輩は猫である',
    author: '夏目漱石',
    rating: 4.8,
    comment: 'ユーモアと観察眼にあふれ、日常の風景が鮮やかに描かれています。',
  },
  {
    id: 2,
    title: '走れメロス',
    author: '太宰治',
    rating: 4.6,
    comment: '友情と勇気を静かに、しかし強く伝える名作です。',
  },
  {
    id: 3,
    title: 'ノルウェイの森',
    author: '村上春樹',
    rating: 4.7,
    comment: '青春の揺れと孤独の感じ方が、繊細に描かれています。',
  },
  {
    id: 4,
    title: '山月記',
    author: '中島敦',
    rating: 4.9,
    comment: '深い哲学と情感が結びつき、余韻の残る作品です。',
  },
];

function App() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            My Bookshelf
          </p>
          <h1 className="text-4xl font-bold">おすすめの本</h1>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              rating={book.rating}
              comment={book.comment}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;