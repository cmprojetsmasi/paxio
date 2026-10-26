import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40, textAlign: 'center' }}>
      <h1 style={{ fontSize: 48 }}>📚 PaXio</h1>
      <h2>Achetez. Payez. Accédez.</h2>
      <p style={{ color: '#555', marginTop: 20 }}>
        La premiere plateforme de livres numeriques en RDC.
      </p>
      <div style={{ marginTop: 40 }}>
        <Link href="/livres">
          <button style={{ padding: '15px 30px', background: '#000', color: '#fff', borderRadius: 10, fontSize: 18, border: 'none' }}>
            Explorer les livres
          </button>
        </Link>
      </div>
    </div>
  );
}
